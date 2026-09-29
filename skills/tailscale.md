---
description: Tailscale mesh VPN — use when the user mentions tailscale, tailnet, exit node, subnet router, MagicDNS, DERP, or funnel, or wants Tailscale set up or debugged.
---

# Tailscale

Mesh VPN built on WireGuard. Devices (laptops, phones, servers, VMs, containers) join one private overlay network called a **tailnet** and reach each other directly regardless of physical network. Control plane (Tailscale's coordination server) only exchanges keys/endpoints/policies; data plane is peer-to-peer WireGuard, end-to-end encrypted. NAT hole-punching via STUN; traffic falls back to encrypted DERP relays only when direct connection fails.

## Feature selection

Pick by what needs to reach what:

| Goal | Feature |
|---|---|
| Tailnet device → another tailnet device | Nothing extra — just install and `tailscale up` on both |
| Tailnet → devices on a physical LAN that can't run Tailscale (printers, IoT, appliances) | **Subnet router**: `tailscale up --advertise-routes=192.168.1.0/24` on one always-on machine; approve routes in admin console |
| All of a device's traffic out through another device (coffee-shop laptop → home network) | **Exit node**: `tailscale up --advertise-exit-node` on the exit machine; `tailscale up --exit-node=<name>` on the client |
| Public internet → a service inside the tailnet | **Funnel**: `tailscale serve --bg --https=443 http://localhost:3000` + `tailscale funnel 443 on` (TLS certs included, traffic via Tailscale relay) |
| Tailnet device → a local service, shared over HTTPS within the tailnet | **Serve** (private sibling of Funnel) |
| Device-to-device file transfer | **Taildrop**: `tailscale file cp ./f.txt <device>: ` |
| SSH without managing host keys | **Tailscale SSH**: `tailscale up --ssh` on the server, then `ssh <machine>` from any tailnet device; ACLs govern access |

Rule of thumb: subnet router for *reaching a LAN*, exit node for *routing my traffic*, funnel for *exposing to the world*.

## Setup

```bash
# macOS
brew install --cask tailscale        # or App Store

# Linux / Debian / Ubuntu
curl -fsSL https://tailscale.com/install.sh | sh

sudo tailscale up                    # prints login URL; SSO (Google/GitHub/MS/Apple)
```

Free Personal plan: 3 users, 100 devices. All devices logging into the same account join the same tailnet.

## Key commands

```bash
tailscale status            # peers, IPs, online/offline, connection type (direct/relay)
tailscale ip -4             # this device's tailnet IP (100.x.y.z)
tailscale ping <peer>       # connectivity + latency; shows "via DERP" if relaying
tailscale netcheck          # NAT type, UDP blocking, DERP latency report
tailscale dns status        # MagicDNS state
tailscale whois <ip>        # which tailnet identity owns a 100.x address
tailscale up --reset        # discard all flags and re-apply defaults
```

MagicDNS names: `<hostname>.<tailnet>.ts.net`, or just the hostname when MagicDNS is on.

## Troubleshooting connectivity

Run in order:

1. `tailscale status` — is the peer listed and not offline? Expired nodes show a "key expired" note.
2. `tailscale ping <peer>` — works but `tailscale status` says offline → stale state, reconnect. Fails entirely → ACL or login problem.
3. `tailscale netcheck` — "UDP: false" or hard NAT on both ends explains relay-only traffic.
4. `tailscale ping` succeeds via DERP but slow → NAT hole-punch failing; direct connection never establishes. Works, but performance is relay-bound.
5. Still failing → `tailscale up` again to re-authenticate, or `tailscale down && tailscale up`.

ACLs: check the tailnet's ACL policy in the admin console — default allows all intra-tailnet traffic, but a custom ACL silently blocks by omission.

## Gotchas

- **Key expiry**: device keys expire (default ~180 days) and the node drops offline until re-auth. Headless servers hit this hardest. Fix: disable expiry for that machine in the admin console, or use `tailscale up --authkey` with a pre-auth key on servers.
- **Control plane dependency**: if Tailscale's coordination service is unreachable, *new* connections can't be established (existing WireGuard sessions usually keep flowing). Fully offline/air-gapped environments need Headscale (open-source self-hosted control server) or can't use Tailscale.
- **100-device cap** on the free plan; `tailscale logout` removes the device from the tailnet.
- **Docker/containers**: each container needs `TS_STATE_DIR` persisted or it re-registers as a new device on restart, burning the device cap.
- **Subnet router + exit node conflict**: a machine acting as subnet router needs IP forwarding enabled (`net.ipv4.ip_forward=1`).
- **Funnel vs serve**: Funnel exposes to the internet — never point it at something unauthenticated.

## Headscale (self-hosted control plane)

For users who won't route key/endpoint metadata through Tailscale's cloud. Headscale implements the coordination API; official clients connect with `tailscale up --login-server=<url>`. Data plane and client stay identical. Trade-off: you operate the server.
