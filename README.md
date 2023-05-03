# **Proman**

Trello like List making Application to help Agile work style. Currently in Development phase, I continiously working on it.

## **Toughts on the project**

The idea and the name of the project came from one of the teamwork project that we did in CodeCool FullStack Developer course.
My goal was with this project to learn more about React, and how to use CSS framework.

### **Built With**

#### ***Backend***
    -Java
    -Spring Boot

#### ***Frontend***
    -React
    -Javascript
    -Bootstrap


### **Prerequisites**

Java Development Kit
How to install: https://www.oracle.com/java/technologies/downloads/

Maven
How to innstall: https://maven.apache.org/install.html

Node.js
How to install: https://nodejs.org/en/download


### **Getting Started**

Before you start, you need to install the dependencies.

For install dependencies of Backend:

- Use this command from the _backend_ directory.

    mvn dependency:copy-dependencies
    
For install dependencies of Frontend:

- Use this command from the _frontend_ directory.

    npm install

For starting the Application simply run the _StartApplication.sh_

This will run the Backend and the Frontend at the same time.



### **Implemented Features**


#### **Create Components**


##### _**Create Board**_

    -You can create a Board for create Columns that later help storing the same type of Cards 

##### _**Create Column**_

    -Within the Board you can create Column for storing previously mentioned Cards

##### _**Create Card**_

    -Within the Column you can add a Card

#### **Drag and Drop**


    -With the Drag and Drop you can change position of the Columns or Cards. 
    This change only happening on the Frontend if the sent PUT Requet responses were Ok.

##### _**Drag and Drop Columns**_

    -You can DnD Columns. Depending on wich side of the Column you Drop (left or right),
    the Column will be, before or after the target Column.

##### _**Drag and Drop Cards**_
    
    -You can DnD Cards. Depending on wicht side of the Card you Drop (top or under),
    the card will be, over or under the target Card. 

##### _**Drag and Drop Cards from one Column to another Column**_

    -You can DnD Cards from one Column to another. 
    
    
#### **Delete Board, Column, Cards**

    - You can Delete any Boards, Columns and Cards by clicking to the Icon.
    This change only happening on the Frontend if the sent DELETE Request response were OK.
    
### **Future plans**

    - deploy application
    - further implement Card Detailed information where you can write a more detailed description about the task
    - create a better system for showing Errors, such as:
        not logged in when User want to create Board
        password/email mismatch
        already existing Username, Email
        etc...
    - implement Rename Board, Column, Card
    - restrict Guest actions:
        restrict Guest to delete any board, and handle Guest Boards delete either by time or with different approach
        restrict Rename any component that not made by current logged in Guest
    - implement Search bar functionality:
        I think it will be usefull if you have more boards as a User or as Guest you can search in those already created
    - implement User page:
        where the User can create a personal profile page
    - further implement Admin role:
        be able to delete Users or content
   
