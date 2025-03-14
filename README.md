# TN-Games (Game Development Website)

[My Notes](notes.md)

This application serves as both a developer log and a place where I can feature games I have created. People can go on the application and read the devlogs and download games that I have created and released onto their computer. The site can also double as a portfolio where I can send employers to look at my works.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Whenever I am making a game or some other project, it would be nice to have somewhere to put it for people to easily see it. This application is designed to be a hub for games that I create and release onto the internet. It is also designed to have a devlog where I can write about stuff that I am doing and also announce games on. Users will be able to log into the website and read the devlogs and like both posts or games. They will also be able to go to the games page and install my games (or redirect to a website where they can install it). I will also be able to log in to the site and be able to add new posts or create a new page for a game.

### Design

Website Design sketches (Subject to change)

![Home Page Design](Images/Devsite%20Design%20Home.PNG)
![Devlog Page Design](Images/Devsite%20Design%20Devlog.PNG)
![Games Page Design](Images/Devsite%20Design%20Games.PNG)
![Login](Images/Devsite%20Design%20Login.PNG)

Sequence Diagram on how the website interacts with its users

```mermaid
sequenceDiagram
    actor Developer
    actor Jared
    actor Samuel
    actor Website
    Developer->>Website: Add Game/Devlog Post
    Website-->>Jared: View Game/Devlog Post
    Website-->>Samuel: View Game/Devlog Post
    Jared->>Website: Like Game/Devlog Post
    Samuel->>Website: Like Game/Devlog Post
    Website-->>Jared: Download Game
    Website-->>Samuel: Download Game
    Website-->>Developer: Number of Game Downloads or Post Likes
```

### Key features

- ***Home Page*** where users can see the latest announcement and redirect to other pages
- ***Devlog Page*** where users can view and like posts that I release
- ***Game Page*** where users can view, favorite, and install games
- Both **Game** and **Devlog** pages have the ability to show the amount of likes/favorites on each post
- Secure ***User Login Page*** for users
- Seprate, secure ***Developer Login Page*** so I can login with the ability to add posts
- Ability for me (The developer) to create new devlog posts and game pages without having to mess with the code

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - The basic structure for the website. Uses 5 HTML pages. Pages are, Home, Devlog, Games, User Login, and Developer Login. Uses Hyperlinks to connect all of the pages together.
- **CSS** - Create the style for the website. Such as where all the boxes goes and the size of images.
- **React** - Provides login, post, applying likes/favorites, display likes/favorites, game install, and backend endpoint calls. Reacts to user actions on site.
- **Service** - Backend service with endpoints for:
    - retrieving game files
    - retrieving post info
    - submitting likes or favorites
    - submitting new posts or games
    - displaying a random geek joke from https://perl.is/random
- **DB/Login** - Stores game files and post data, devlog post data, and likes/favorites in database. Also stores user and developer data securely in the database. Users must be authenticated to like or favorite posts, but not to install games.
- **WebSocket** - Posts are brodcast to other users when submitted by the Developer. Likes and favorites are also brodcasted when a user presses the button

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://startup.tn-games.com).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created four HTML Pages, `index.html` (Home page), `devlog.html`, `games.html`, and `login.html`.
- [x] **Proper HTML element usage** - I used HTML tags such as HEADER, BODY, NAV, MAIN, etc. to help create my website.
- [x] **Links** - I created links between all of my pages.
- [x] **Text** - Most of my pages have text such as the home page or the devlog page in order to give the user informaton about the page.
- [x] **3rd party API placeholder** - `index.html` has a place on the footer to display a geek joke.
- [x] **Images** - Image is on every page.
- [x] **Login placeholder** - Placeholder for authentication is on the `login.html` page. Links to the page also double as a username display.
- [x] **DB data placeholder** - Game post is on `games.html` and Devlog post is on `devlog.html`.
- [x] **WebSocket placeholder** - The posts have buttons on them for like, favorite, and downloads that will be updated in real time. New posts are also updated in real time.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I used the CSS file `main.css` to style the basic page style. Specific styling are in the `home.css`, `devlog.css`, `games.css`, and `login.css` files.
- [x] **Navigation elements** - Used Bootstrap to style the navigation buttons.
- [x] **Responsive to window resizing** - All pages respond to window resizing using `display:flex;` and other flex features.
- [x] **Application elements** - Used flex to align everything in the correct place.
- [x] **Application text content** - The main text are in `Courier New`, but there are several other fonts and sizes for different text.
- [x] **Application images** - Resized images to fit with the rest of the page.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I installed vite and bundled my application with it
- [x] **Components** - All HTML pages have been converted to React components.
    - **Login**: Reworked HTML and CSS to work with the react page, scrapped login's header and footer to stay consistent with the rest of the site. All buttons route to home page.
    - **Devlog & Games**: Reworked HTML and CSS in order to work with React. Placeholders for devlogs/games and their buttons.
    - **Home**: Reworked CSS but left HTML alone. Footer with Geek Joke placeholder is now on all pages.
- [x] **Router** - Routing between `Home`, `DevLog`, `Games`, and `Login` components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - Everything on the startup is functional. The features include:
 - **Login/Create** Users can create accounts to be able to interact with the posts on the `devlog` and `game` pages. The username is saved to `LocalStorage`.
 - **Developer Login** Developer can log in using the Developer button to be able to activate "Developer mode" and create (or delete) posts or edit the announcements. (No password is required at the moment, so anyone can access this mode).
 - **Announcement** On the `Home` Page, The Developer can change the announcement and it can be viewed by the users. The announcement is saved to `LocalStorage`.
 - **Devlog Posts** Developer can create a new post using the `add post` button and add a title and description. Users can press the like button to like the individual posts. Total likes are displayed next to the button. Post are saved to `LocalStorage`.
 - **Game Posts** Developer can create a new Game and add a title, description, and download URL. Users can both like and favorite individual posts. They can also click the download to be redirected to another page. Total likes are also displayed. Images are currently not avalable due to LocalStorage limitations. Game Posts are saved to `LocalStorage`.
 - **TN Image** When the image is clicked, it creates a glitch effect and changes the image.
 - **Geek Joke API** API placeholder functionality mocked out. Currently displays "Epic Geek Joke" 
- [x] **Hooks** - I used both `useState` and `useEffect` for multiple different parts of the startup

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Express installed and port is defaulted on 4000.
- [x] **Static middleware for frontend** - Added `express.static('public');` for the frontend in `service/index.js`.
- [x] **Calls to third party endpoints** - Calls `https://perl.is/random` for a random quote in `app.jsx`, gets the quote and displays it at the bottom of the page.
- [x] **Backend service endpoints** - Endpoints in `service/index.js` for `auth`, `devlog`, `games`, and `announcements`.
- [x] **Frontend calls service endpoints** - All mocked functionallity replaced with calls to the service.
- [x] **Supports registration, login, logout, and restricted endpoint** - Fully supports authentication. Restricts access to liking and favoriting posts if user is not logged in. Also restricts access to developer tools if user is not a developer.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
