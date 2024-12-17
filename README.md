# Library_Management_System
 
<h2>Overview</h2>

<p>The Library Management System (LMS) is designed to efficiently manage library operations, such as book management, user registration, authentication, and transaction tracking. </p>

<h2>Backend Framework (Express.js)</h2>

<p>The backend of the system is built using Express.js, a robust web framework for Node.js. Express facilitates the creation of RESTful API endpoints to handle user requests such as retrieving books, adding new books, and managing user data. </p>

<h2>Database (MongoDB) </h2>

<p>The system uses MongoDB, a NoSQL database, to store and manage data. MongoDB’s flexible documented structure allows for easy storage and retrieval of data </p>

<h2>Authentication </h2>

<p>To ensure secure access to the system, JWT (JSON Web Tokens) are used for user authentication. JWT tokens are issued after a user successfully logs in, and the token is sent with each subsequent request through headers to validate the user's identity. </p>

<h2>Password Security </h2>

<p>To protect user data, particularly passwords, the system employs password hashing using  bcrypt module. This ensures , sensitive information like user passwords remains secure. The password is hashed before being stored, and during login, the hashed password is compared to the entered password for authentication.</p>


## Instructions 
<p>First clone the repository

```shell
git clone https://github.com/Lavakumar1807/Library_Management_System.git
```
<p>Install dependencies</p>

```shell
npm i express mongoose jsonwebtoken bcrypt nodemon
```

<p>To start the server run this command on terminal</p>

```shell
npm start
```
<details>
  <summary>Available Books</summary>

  ```shell
  /books
  ```
  
 ![availablebooks.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/available%20books.png)
</details>

<details>
  <summary>Book Borrow</summary>

  ```shell
  /reader/books/borrow
  ```
  
 ![bookborrow.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/book%20borrow.png)
</details>

<details>
  <summary>Book Deletion</summary>

  ```shell
  /books/delete/:id
  ```
  
 ![bookdeletion.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/book%20deletion.png)
</details>

<details>
  <summary>Book Return</summary>

  ```shell
  /reader/books/return
  ```
  
 ![bookreturn.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/book%20return.png)
</details>

<details>
  <summary>Book Updation</summary>

  ```shell
  /books/update/:id
  ```
  
 ![bookupdate.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/book%20updation.png)
</details>

<details>
  <summary>Create New Book</summary>

  ```shell
  /books/create
  ```
  
 ![createbook.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/create%20book.png)
</details>

<details>
  <summary>Author Books</summary>

  ```shell
  /books/author/:id
  ```
  
 ![authorbooks.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/get%20author%20books.png)
</details>

<details>
  <summary>Reader Borrowed Books</summary>

  ```shell
  /reader/books/:id
  ```
  
 ![readerborrowedbooks.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/reader%20borrowed%20books.png)
</details>

<details>
  <summary>Reader Profile Creation</summary>

  ```shell
  /reader/profile
  ```
  
 ![readerprofile.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/reader%20profile%20creation.png)
</details>

<details>
  <summary>Token Validation</summary>

  ```shell
  /users/session/validate
  ```
  
 ![tokenvalidation.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/token%20validation.png)
</details>

<details>
  <summary>User Deletion</summary>

  ```shell
  /users/delete/:id
  ```
  
 ![userdeletion.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/user%20deletion.png)
</details>


<details>
  <summary>User Login</summary>

  ```shell
  /users/login
  ```
  
 ![userlogin.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/user%20login.png)
</details>


<details>
  <summary>User Signup</summary>

  ```shell
  /users/signup
  ```
  
 ![usersignup.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/user%20signup.png)
</details>


<details>
  <summary>User Updation</summary>

  ```shell
  /users/update/:id
  ```
  
 ![userupdation.png](https://github.com/Lavakumar1807/Library_Management_System/blob/main/Screenshots/user%20updation.png)
</details>
