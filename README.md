# CIS 550 Final Project - No Game, No Life
### Letian Chu, Ziyang Luo, Weicong Dai and Junyong Zhao
### Eniac Username: letianc, weicongd, luoziy and junyong

### Files Structures:
```
.
├── ./client
│   ├── ./client/node_modules
│   ├── ./client/package.json
│   ├── ./client/package-lock.json
│   ├── ./client/public                 // materials
│   ├── ./client/src                    // client side js code
│   └── ./client/yarn.lock
├── ./data                              // data set and cleaning
│   ├── ./data/data_process_zjy.ipynb
│   ├── ./data/dataset_clean.ipynb
│   ├── ./data/data_set.zip
│   └── ./data/table_clean_base_on_new_Game.ipynb
├── ./README.md
└── ./server                            // server side code
    ├── ./server/db-config.js
    ├── ./server/index.js
    ├── ./server/node_modules
    ├── ./server/package.json
    ├── ./server/package-lock.json
    └── ./server/routes.js
```
### Dependency and Packages
1. This application first need all the default package defined in the ```package-lock.json``` files. Simply type ```npm install``` under the ```/client``` and ```/server``` folders will install all the packages.
2. Besides, this project also requries packages listed below (for the front end), **PLEASE RUN ALL THE COMMANDS BELOW BEFORE STARTING THE APPLICATION (under ```/client```) !!!**
```
    npm install --save react-google-login-component
    npm install --save store
    npm install --save axios
    npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
    npm install --save styled-components
```

### Build Instructions
1. Before building the application, please make sure all the required packages and dependencies are installed correctly! Please follow the instructions of this file!
2. Simply run ```npm start``` under the ```/client``` and ```/server``` folder will start the application, please contact at least one of the group member to assure the back end database is available.

### Code Description and Layout
1. All front end relavent code are under the ```/client/src/component``` folders, website images and style files like ```.css``` file could be found under ```/client/src/style``` and ```/client/src/public``` folder.
2. All back end related code could be found under the ```/server``` folders.
3. All the dataset and code on cleaning, populating database could be found under ```/data```.

### Extra Credits
1. Our project implemented user login/register function, user info will be stored on the back end database.
2. Our project allows user to login with social media account, like Google account.
3. Our projcet used third-party APIs of the IGDB database to enrich the comparision application
