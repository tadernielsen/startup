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

- Hyper Text Markup Language
- Frontend
- The structural language of the web (No styling is done with html)

### Base parts of HTML
- DOCTYPE: The current html verion (HTML5)
- lang: language
- head: used as metadata and holds the title
- body: where everything is rendered

Create a tree data structure to visulize how the computer sees it

### How to render the page
- Browser - about:blank (devtools)
- VSCode - Live Server

### Link References
- Absolute: Uses a website to find the attribute value
- Relative: Uses the local files to find the attribute value

### Elements
- html: page container
- head: header info
- title: page title
- body: entire content body
- header: header content
- main: main content
- footer: footer of main content
- section: a section of main content
- div: A block division of content
- span: inline span of content
- h<1-9>: Text heading
- p: paragraph
- table
- ol, ul: ordered/unordered list
- a: Anchor to a hyperlink
- img: Graphical image reference

There are different unicodes for certain characters

### CodePen

- inline elements can go into block elements without splitting them
- [HTML Elements](https://github.com/webprogramming260/.github/blob/main/profile/html/structure/structure.md)
- [HTML Input Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [HTML Media Elements](https://github.com/webprogramming260/.github/blob/main/profile/html/media/media.md)
- svg and canvas contains code to let you create images in your website
- [SVG Documentation](https://developer.mozilla.org/en-US/docs/Web/SVG)

### Simon Notes

Application data: SVG Graphic Buttons, user name, insparational quote
Authentication: Account creation and login
Database data: High scores of all players
WebSocket data: Updates every time another user creates or ends a game. 

## CSS Notes

Cascading Style Sheets

Could do style inline, but you should do it in a serpeate file (or in the style element)

### Parts

- selector
- decloration block
- rule
- property
- value
- decleration

Can use href to reference to an external stylesheet

HTML calls the most recent CSS (Precedence)

### Selectors
- Element
- ID
- Class
- Element class

### Declorations
- background-color
- border
- color
- display
- font
- margin
- padding