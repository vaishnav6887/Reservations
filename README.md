# Reservations
Node APP to build API for Hotel Reservation web site

Server side :

Node project is in root directory i.e. '\Reservations'

To run Node project, perform following steps.

Step 1 : In command prompt,   move to \Reservations (root directory).

Step 2 : Run command : "npm install". This will ensure all the packages need for this app is installed.

Step 3 : Run command : "npm run dev". This will start the application.

Step 4 : Once the step 3 executes, the message "Database Connected!" and "Server is listen port : 8080" will be logged to the console. Now you can access our Node app using URL : http://localhost:8080
User will see a static html page which is not pretty.

**********************************************************************************************************************************************************

Setting up and running UI app.

I have built React APP to demonstrate the API calls and render the content in user friendly UI. 
To setup and run the react app. Following step needs to be performed.

Step 1 : In a seperate command prompt window, move to '\Reservations\Reservation.Web\client' folder. This folder is the root dir of the react app.

Step 2 : Run command : "npm install". This will ensure all the packages related to the react app which are registered in the package.json will be downloaded and installed for the application.

Step 3 : Run command : "npm start dev". This will start the application 

Step 4 : Once the step 3 is completely executed the application will automatically open in browser with URL http://localhost:3000 . If it doesn't open automatically then manually type in the url and load the app. 

**********************************************************************************************************************************************************
Mongo DB:
I have created Collections in my free mLab cloud hosted MongoDB using Azure. The connection url to it is in the app.js

**********************************************************************************************************************************************************
Installed Prettier :
Following command in the root directory will make file formated. 

Node Project: (in '\Reservations' as a root folder)
prettier --print-width 80 --semi --single-quote --trailing-comma es5 --write --tab-width 3 */*.js *.js 

Web Project: (in '\Reservations\Reservation.Web\client' as a root folder)
prettier --print-width 80 --semi --single-quote --trailing-comma es5 --write --tab-width 3 src/**/*.js 

**********************************************************************************************************************************************************

Test CASES:

To execute test cases open a seperate shell window and move to '\Reservations' and execute following command

$> npm test