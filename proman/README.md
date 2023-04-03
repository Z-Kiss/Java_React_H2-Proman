# **Proman**

Trello like List making Application to help Agile work style.

### **Built With**

#### ***Backend***
    -Java
    -Spring Boot

#### ***Frontend***
    -React
    -Bootstrap


### **Getting Started**

For starting the Application simply run the _StartApplication.sh_

This will run the Backend and the Frontend at the same time.


### **Prerequisites**


    -npm
    -npm install npm@latest -g

### **Implemented Features**

#### **Create Components**

##### _**Create Board**_

![img.png](readmePictures\img.png)

    -You can create a Board for create Columns that later help storing the same type of Cards 

##### _**Create Column**_

![img_1.png](readmePictures\img_1.png)

    -Within the Board you can create Column for storing previously mentioned Cards

##### _**Create Card**_

![img_2.png](readmePictures\img_2.png)


    -Within the Column you can add a Card

#### **Drag and Drop**

##### _**Drag and Drop Columns**_

    -With the Drag and Drop you can change position of the Columns or Cards. 
    This change only happening on the Frontend if the sent PUT Requet responses were Ok.
    

![img_5.png](readmePictures\img_5.png)

    -You can DnD Columns. Depending on wich side of the Column you Drop (left or right),
    the Column will be, before or after the target Column.

![img_4.png](readmePictures\img_4.png)

##### _**Drag and Drop Cards**_

![img_6.png](readmePictures\img_6.png)
    
    -You can DnD Cards. Depending on wicht side of the Card you Drop (top or under),
    the card will be, over or under the target Card. 

![img_7.png](readmePictures\img_7.png)

##### _**Drag and Drop Cards from one Column to another Column**_

![img_8.png](readmePictures\img_8.png)

    -You can DnD Cards from one Column to another. 

![img_9.png](readmePictures\img_9.png)

### ***Features to Implement***

    - Rename Board, Column, Card
    - Delete Board, Column, Card
    - Spring Security






