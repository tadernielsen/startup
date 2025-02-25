# CS 260 Notes

[My startup](https://startup.tn-games.com)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Markdown Documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Voter Example](https://github.com/webprogramming260/startup-example/blob/main/README.md)
- [Bootstrap](https://getbootstrap.com/)

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

### My Startup

Application data: Username, Game and Devlog post boxes, developer buttons, geek joke 
Authentication: Username and password page
Database data: game data, devlog post data
WebSocket data: likes, favorites, downloads, new posts

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

### Responsive design
- Meta - defines metadata for css
- Float - renders the position of the text to respond to the window resizing
- Display
  - none - doesn't render
  - block - allocates full line
  - inline - renders multiple in one line
  - flex - renders children in a flexable way
  - grid - represent children as a grid
- Flex - makes children flexable
- Media queries - overrides styles when requirements are met

### CSS Frameworks
- You pull in someone's code so you can use it for your own CSS
- Most common framework: [Bootstrap](https://getbootstrap.com/)
- All you have to do is reference it in the header and set the class
- Code is open source

## JavaScript

### History
- 1995: Eich invents Java
- 1997: JavaScript becomes ECMAScript
- 2009: ES5: strice, JSON, array iteration
- 2015-xx: ES6, let, default params, async, rest/spread, destructure, module, class, template literals

- Inspired by Scheme
- Interpreted language
- Dunamically typed
- Not related to Java

Console.log - Outputs to terminal window

### Node.js
Run the JavaScript outside the browser
Lets you run in the terminal using node

*History*
- 2009: Node.js released
- 2010: NPM released
- 2011: Dahl moves to Joyent
  - Windows version released
  - Widespread adoption. LinkedIn, Uber, ...
- 2015: Node.js/Open.js Foundation
- Deno (ES modules, TypeScript, security, ...)

Node - JavaScript runtime
NPM - Node package manager

*Node Package Manager*
- Access to massive library of packages
- Install project packages
- Manage package versions
- Configure execution of project

### Debugging
- Use run debugger in VSCode

## React

### Web Frameworks
- Simplify common patterns
- Provide common components
- Improve performance
- Increase device coverage

### JSX

Uses Babel to translate JSX to JavaScript and then the browser renders it into HTML
Can run Babel in CodePen by changing the JS Preprocessor settings

### Components

- Define: const Hello
- Use: root.render(<Hello />);
- Provide: <Hello phrase="cs260" />
- Destructuring: [color, setColor]
- Update: setColor(color === "red" ? "green" : "red");

### Router
Lets you have one HTML page and just change one component of it (such as the body)

- Router Component: <BrowserRouter>
- Routing links: <NavLink to="">
- Map route to components:  <Route path="" element={} />

### Toolchain
How do I compile JSX myself?
Vite - Frontend build tool

## Service

Browser rendering is single threaded
Everything must be asynchronous (Happening at the same time)

### Promise
"I promise to call you back"
Built in the JavaScript library

_Promise state_
- pending - Currently running asynchronously
- fulfilled - Completed successfully
- rejected - Failed to complete

_Handlers_
- .then - only called if successful
- .catch - only called if failled
- .finally - calls no matter what

_Async/Await_
- Async - function that indicates promise returned
- Await - .then but with better(ish) syntax

Rule for using Await:
Top level module function or called from an async function

Remember that async will auto-generate a promise if not explicitly returned

### Making Service Requests
We have always been making service requests
Using JavaScript, we can call other services

_Requesting a Resource_
Everything is a Resource

Uniform Resource Locator
- Scheme: https://
- Domain: byu.edu
- Port: :443
- Path: /api/city
- Parameters: ?q=pro
- Anchor: #3

Port: The address for a certain area of a website

Ports
- 20: File transfer protocol for data transfers
- 22: Secure Shell for connecting to remote devices
- 25: Simple mail transfer for sending emails
- 53: Domain name system for looking up IP adresses
- 80: Hypertext transfer protocol for web requests
- 123: Network time protocol for managing requests
- 443: HTTPS for sucure websites

HTTP Methods
GET: Get a resource
POST: Create a resource
PUT: Update a resource
DELETE: Delete a resouce
OPTIONS: Information about resource

Status Codes
- 2xx - Sucess
  - 200 Sucess, 204 No content
- 3xx - Sucess, but not correct
  - 301/302 redirects, 304 not modified
- 4xx - User error
  - 400 bad request, 404 not found
  - 403 forbidden, 429 Too many requests
- 5xx - Server error
  - 500 Server error, 503 not available
