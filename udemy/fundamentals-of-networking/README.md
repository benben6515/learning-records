# fundamentals-of-networking

> 相關：[學 Networking 的最佳方式（資安導向）](../../others/notes/networking-learning-path.tw.md)、[網路基礎觀念](../../others/notes/networking-fundamentals.tw.md)

## Section 2: Fundamentals of Networking

- Client - Server Architecture
- OSI Model (Open Systems Interconnection model)
  - Layer 7 - Application - HTTP/FTP/gRPC
  - Layer 6 - Presentation - Encoding, Serialization
  - Layer 5 - Session - Connection establishment, TLS
  - Layer 4 - Transport - UDP/TCP
  - Layer 3 - Network - IP
  - Layer 2 - Data link - Frames, Mac address, Ethernet
  - Layer 1 - Physical - Electric signals, fiber or radio waves

## Section 3: Internet Protocols (IP)

The IP building blocks

- IP address
  - Layer 3 property
  - 4 bytes in IPv4, 32 bits
  - ex: 192.168.254.0/24
    - the first 24 bits are the network part, the last 8 bits are the host part
- Subnet Mask
  - A 32-bit number that divides an IP address into network and host portions
  - Binary mask where 1s represent network bits and 0s represent host bits
  - Used to determine if two IP addresses are on the same local network
- the "192.168.0.2" want to talk to "192.168.1.2"
  - IP routing
  - Different subnets (192.168.0.x vs 192.168.1.x), so packet goes to default gateway/router
  - Router checks its routing table and forwards packet to destination network
  - Process repeats at each router hop until reaching the destination

IP packet

- data section can go up to 65536
- Fundamental unit of data in IP networks
- Contains header (source/destination IP, protocol, TTL) and payload (actual data)
- Typically limited by network MTU (Maximum Transmission Unit), often 1500 bytes for Ethernet

ICMP, PING, TraceRoute

- ICMP (Internet Control Message Protocol)
  - Layer 3 (IP Layer) protocol used for diagnostics and error reporting
  - Does not carry application data — only control messages
  - Used by routers and hosts to communicate network issues (e.g., destination unreachable, time exceeded)
- PING
  - Uses ICMP Echo Request (type 8) and Echo Reply (type 0) messages
  - Tests reachability of a host and measures round-trip time (RTT)
  - Can be blocked by firewalls that filter ICMP traffic
- TraceRoute
  - Uses ICMP with incrementally increasing TTL (Time To Live) values
  - Each router along the path decrements TTL by 1; when TTL hits 0, the router sends back an ICMP Time Exceeded (type 11) message
  - Maps the route packets take to reach a destination, showing each hop's IP and latency

ARP (Address Resolution Protocol)

- ARP is table mapping IP -> MAC address
- Operates at Layer 2 (Data Link Layer), bridges Layer 3 (IP) to Layer 2 (MAC)
- When a device knows the destination IP but not the MAC address, it broadcasts an ARP Request to all devices on the local network
- The device with the matching IP replies with an ARP Response (unicast) containing its MAC address
- ARP table (cache) stores learned IP-to-MAC mappings to avoid repeated broadcasts
  - Entries have a TTL and expire after a timeout period
  - Can be viewed with `arp -a` or `ip neigh` on Linux
- ARP is only used within the same local network (same subnet); for cross-subnet communication, ARP resolves the router's MAC address (default gateway) instead of the final destination
- ARP is stateless and has no authentication, making it vulnerable to ARP spoofing/poisoning attacks

TCPDUMP (capturing IP, ARP, ICMP and IP Packets)

- tcpdump is a command-line packet sniffer that captures and displays network traffic passing through a network interface
- Operates at Layer 2 (Data Link Layer) by putting the NIC into promiscuous mode to see all frames on the wire
- Requires root/sudo privileges to run
- Basic syntax: `tcpdump [options] [expression]`
- Common options:
  - `-i <interface>` — specify which network interface to capture on (e.g., `en0`, `eth0`, `any`)
  - `-n` — don't resolve hostnames (show raw IPs, faster)
  - `-nn` — don't resolve hostnames or port names
  - `-v`, `-vv`, `-vvv` — increase verbosity of output
  - `-c <count>` — capture only N packets then stop
  - `-w <file>` — write raw packets to a file (pcap format) for later analysis with Wireshark
  - `-r <file>` — read packets from a pcap file
- Capture filters (BPF - Berkeley Packet Filter syntax):
  - `tcpdump arp` — capture only ARP packets (ARP requests/replies)
  - `tcpdump icmp` — capture only ICMP packets (ping, traceroute)
  - `tcpdump ip` — capture only IPv4 packets
  - `tcpdump tcp` — capture only TCP packets
  - `tcpdump udp` — capture only UDP packets
  - `tcpdump port 80` — capture traffic on port 80 (HTTP)
  - `tcpdump host 192.168.1.1` — capture traffic to/from a specific IP
  - `tcpdump src 192.168.1.1` — capture traffic from a specific source IP
  - `tcpdump dst 192.168.1.1` — capture traffic to a specific destination IP
  - `tcpdump net 192.168.1.0/24` — capture traffic for an entire subnet
  - Combine filters: `tcpdump 'arp or icmp'`, `tcpdump 'tcp port 80 and host 10.0.0.1'`
- Output format shows: timestamp, source IP.port > destination IP.port, flags, sequence numbers, window size, etc.
- Useful for debugging network issues, verifying ARP resolution, analyzing ICMP behavior, and inspecting packet headers
