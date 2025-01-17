# CS 260 Notes

[My startup](https://tn-games.com)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Markdown Documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Voter Example](https://github.com/webprogramming260/startup-example/blob/main/README.md)

## AWS Notes

- Startup Stack: React, Caddy2, NodeJS, mongoDB
- Keep in mind when you are developing for the frontend or the backend
- nslookup: find website ip adress

### Layers
- Application (HTTPS)
- Transport (TCP/UDP)
- Internet (IP)
- Link (Fiber, hardware)

### DNS record types
- A/AAAA: Address. Specific IP address
- CNAME: Canonical Name. Alias
- NS Name Server. Authority for queries and proof of ownership
- TEXT: Metadata. Used for policies and verification
- SOA: Start of Authority. Propagation information

### Leasing a domain name
1-10 years, renew required. $3 - $100,000+

- ICANN: Internet Corp for Assigned Names and Numbers
  - Registrar: Orders for leasing domain
    - Registry: Authoritative DNS records
      - Regestrant: You

### How to regester Domain and create server
- Go to regestered domains on AWS website
- ![Rent a server:](https://github.com/webprogramming260/.github/blob/main/profile/webServers/amazonWebServicesEc2/amazonWebServicesEc2.md)
  - Remember to put in this: ami-018f3a022e128a6b2 and rent server in virginia
  - Make sure to save key pair somewhere safe

### Services
- Caddy helps host multiple services in your application
- Configure Caddy with your domain name and then tell caddy to restart

### Deliverable AWS
1. Setup AWS account
2. Create EC2 instance
3. Lease a domain
4. Update Caddy
5. Submit URL

## HTML Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
