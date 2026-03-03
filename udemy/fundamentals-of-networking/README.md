# fundamentals-of-networking

## Section 2: Fundamentals of Networking

- Client - Server Architecture
- OSI Model (Open Systems Interconection model)
  - Layer 7 - Application - HTTP/FTP/gRPC
  - Layer 6 - Presentation - Encoding, Serialization
  - Layer 5 - Session - Connection establishment, TLS
  - Layer 4 - Transport - UDP/TCP
  - Layer 3 - Network - IP
  - Layer 2 - Data link - Frames, Mac address, Ethernet
  - Layer 1 - Physical - Electric signals, fiber or radio waves

## Section 3: Internet Protocols (IP)

- The IP building blocks
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
- IP packet
  - data section can go up to 65536
  - Fundamental unit of data in IP networks
  - Contains header (source/destination IP, protocol, TTL) and payload (actual data)
  - Typically limited by network MTU (Maximum Transmission Unit), often 1500 bytes for Ethernet
