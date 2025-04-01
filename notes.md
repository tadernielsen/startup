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

Promise state
- pending - Currently running asynchronously
- fulfilled - Completed successfully
- rejected - Failed to complete

Handlers
- .then - only called if successful
- .catch - only called if failled
- .finally - calls no matter what

Async/Await
- Async - function that indicates promise returned
- Await - .then but with better(ish) syntax

Rule for using Await:
Top level module function or called from an async function

Remember that async will auto-generate a promise if not explicitly returned

### Making Service Requests
We have always been making service requests
Using JavaScript, we can call other services

__Requesting a Resource__
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
- 2xx - Success
  - 200 Success, 204 No content
- 3xx - Success, but not correct
  - 301/302 redirects, 304 not modified
- 4xx - User error
  - 400 bad request, 404 not found
  - 403 forbidden, 429 Too many requests
- 5xx - Server error
  - 500 Server error, 503 not available

### Web Services

__Service Design__

Service Endpoints for Simon
- Create account
- Login
- Logout
- Get user
- Get scores
- Save scores

Leverage Standards
- Transfer Protocols - HTTP, HTTPS, UDP
- HTTP verbs - GET, PUT, POST, DELETE
- MIME types - application/json, image/png
- HTTP headers - cache, accept, cors
- Data format - JSON, YAML

Endpoint design
- Grammatical - Noun/resource based
- Readable - /store/provo/order/28502
- Simple - Single responsibility principle
- Documented - Open API

__Express__

Simple, yet powerful

- express: construction and default functionality
- app: service application
- req: request boject
- res: response object
- router: adding child routing (Don't have to do that)

app.use(express.static('public')): Easy way to get files

Middleware
- Can be changed
- The middle man in the express app

## Authentication

Authentication - Verifies that a user is who they claim to be
Authorization - Gives user parmission to access site

Authentication Protocols
- OAuth
- SAML
- CAS (The one BYU uses)
- OIDC

Single sign on (SSO)
- Auth0
- Google
- Facebook
- Duo
- AWS

Custom Authentication
- Store user credentials (and make sure it's secure)
- Verify credentials
- Restrict access

Bcrypt
Salt, hash, and compare

__Cookies__
Response:
Set-Cookie: token=x83efhs; Secure; HttpOnly; SameSite=Strict
Next Request: Cookie: token=x83efhs

### Project Notes

__ENDPOINTS:__
- Third Party API
- Login
- Developer Login
- Logout
- Create Account
- Get Account Info
- Devlog Post Data
- Game Post Data
- Announcement Data
- Image Data?

__Other Notes__
- Check login program for login creation help

## Database

### Storage services
Multer: Program that adds middleware to allow images to be uploaded

__AWS S3__
- Massive capacity
- Only pay for what you use
- Automatic backups
- Versioned
- Performant
- Good security model

### Data Services

__Service & Specialty__
MySQL - Relational queries
Redis - Memory cached objects
ElasticSearch - Ranked free text
MongoDB - JSON objects
DynamoDB - Key value pairs
Neo4J - Graph based data
InfluxDB - Time series data

__MongoDB:__ Collection of schema free JSON

### Project Database
__Endpoints__
- Auth
  - Get User
  - Get User by Token
  - Add User
  - Update User
- Dev Auth  
  - Get Developer
  - Get Developer by Token
  - Update Developer
  - (Does not have add, injects developer into database beforehand)
- Devlog
  - Add new post
  - Get all posts
  - Get post by ID
  - Update post
    - Likes
  - Remove post
- Games
  - Add new game
  - Get all games
  - Get game by ID
  - Update game
    - Likes
    - Favorites
  - Remove Game
- Announcement
  - Update Announcement
  - Get Announcement

## WebSocket
Not WebSockets, just WebSocket

__HTTP__:
- Great for client initiated request
- Doesn't allow bidirectional messages

__WebSocket__:
- Upgrade of HTTP
- Either side can send data at any time
- Efficient
- Widespread support

__Useful Advice__: if you have idea, don't just build it from scratch, look at what is already made and build off of it.

## Other things

### TypeScript
The top two programming languages (Python and JavaScript) don't have typing.

- Interface
- Union
- Enum
- Type coercion

__Frontend or Backend first:__
Start both pretty simple, then work to put more functionality in it

### Performance
Even tiny delays in page load time can be disastrous for you bottom line.
Just a one-second delay leads to:
- 11% fewer page views
- 16% Decrease in consimer satisfaction
- 7% lost in conversions

How to make application faster
- Optimize for real usage (Cache, bandwidth, cpu, storage)
- Optimize based on data
- Prioritize bottlenecks
- Look at download size
- Compress, reduce, minify
- Lazy load
- Use psychology (to make it look like progress is happening)

### Security

__Breaches__
- Brazilian meatpacking JBS ransomware: $4.4 million
- Solarwinds APT $25 million
- Amazon DDOS attack (1 hour) $75 million
- Sony Entertainment breach $171 million
- VA unencrypted data $500 million
- AWS, Yahoo, CNN, Dell DDOS Mafiaboy $1 billion

Cybercrime costs [will reach] $10.5 trillion USD annually by 2025 - Cybercrime Magazine

__How to fight__
Open Worldwide Application Security Project (OWASP 10)
1. Broken Access Control
  - Least privilege access violation
  - URL bypass control
    - /payment/:accountid
  - Resource path allows access
    - ../../etc/password
2. Cryptographic Failures
  - Not encrypting at rest or transit
  - Weak cryptography (SHA1, MD5)
  - Misused cryptography (no salt, wrong params)
3. Injection
  - User supplied data is not sanitized
  - User supplied data programmatically executed
4. Insecure Design
  - Not aware of best practices
  - Unlimited trial accounts
  - Customer data not segmented
  - Single layer defense
    - Always remember to sacrifice security last so you can have a company the next day
    - Layers of security doesn't stop hackers, it just slows them down so you can shut it down
5. Security Misconfiguration
  - Development info exposed
  - Using default configurations
  - Unnecessary features installed
  - System not hardened
6. Vulnerable Components
  - Unnecessary/unused packages imported
  - Untrusted/verified sources
  - Out of date software
  - Not tracking vulnerability bulletins
  - Package version not locked
7. ID and Auth Failures
  - Credential stuffing (compremized list)
  - Brute force attacks (guessing)
  - Permitting weak passwords
  - Weak credential recovery
  - Credentials in URL
  - Not expiring auth tokens
8. Software Integrity Failures
  - Unverified CDN usage
  - Unverified packages (npm install)
  - Unverified updates
  - Insecure CD/CI platforms
9. Logging Failure
  - Not logging critical requests
  - Not monitoring system performance
  - Logs not audited, automatic or manual
  - Logs not stored centrally
  - No real-time response
10. Server Side Request Forgery
  - PUT /user/image?url=""
  - http://localhost/users/_search?pretty <- Redis query to dump all users

__Put on your white hat__
- Discover the system
- Get behind the wall of trust
- Use exposed info
- Exploit unexpected usage
- Exploit misdirection
- Exploit lazy
- Exploit trust

__Security Minded__
- System and customer segmentation
- Multi-layered security
- Security and penetration testing
- Secure real time logging and metrics
- Action playbooks