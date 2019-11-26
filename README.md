###How to set up the app for the first time
##Client - frontend

0. Make sure you have node installed on your computer. https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/
1. cd into ./client directory
1. run "npm install" to install all dependencies
1. run "npm start" to check if the front end is configuered correctly
1. cd out into the parent directory

##Server

1. cd into ./server directory
2. run "pipenv shell' to start a virtual env.
3. run "pipenv install --ignore-pipfile" to install dependencies that the server needs
4. run python ./app.py to make sure that the server is installed properly
5. cd out into the parent directory

##Full Stack App

1. Run "npm install" to install dependencies needed for the full stack app scripts
2. Run "npm run dev" to start both the server and front end at the same time

###How to run the app when developping

1. cd into parent directory
2.

To run server only -> "npm run server"
To run front-end only -> "npm run client"
To run both -> "npm run dev"
