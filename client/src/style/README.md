# CIS 550 Final Project - No Game, No Life
### Letian Chu, Weicong Dai, Ziyang Luo and Junyong Zhao
### PennKey: letianc, weicongd, luoziy and junyong
### Files Structures:
```
.
├── ./client
│   ├── ./client/node_modules
│   ├── ./client/package.json
│   ├── ./client/package-lock.json
│   ├── ./client/public
│   ├── ./client/src                    // client side code
│   └── ./client/yarn.lock
├── ./README.md
└── ./server                            // server side code
    ├── ./server/db-config.js
    ├── ./server/index.js
    ├── ./server/node_modules
    ├── ./server/package.json
    ├── ./server/package-lock.json
    └── ./server/routes.js
```
### Extra Credits
1. Our project implemented user register/login function, the user data is also stored in the database
2. Our user could also login from social media account, like Google authentication.
3. Our projcet used third-party API of the IGDB database on the game comparision page.

### Project Dependency
1. This project requries node modules. To install them type ```npm install``` under both the ```/client``` and the ```/server``` directory will install the first part of packages.
2. There are other packages required for this project, INSTALL THESE BEFORE YOU RUN
```
npm install --save react-google-login-component
npm install --save store
npm install --sace axios
npm install --save @fortawesome/fontawesome-svg-core  @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
npm install --save styled-components
```

### Building Instructions
After installed all the dependencies, type ```npm start``` under both the ```/client``` and the ```/server``` directory will start the application. Please contact at least one of our team member to assure the backend database is open for using

### Code Description and Layout
1. All the front end related code is under the ```/client``` folder, where all the javascript are under ```/client/src/components``` and the style componets such as ```.css``` files are under ```/client/src/style```.
2. All the back end related code is under the ```/server``` folder, where the routes