# Library_Management_System

## Approach
<p>In building the Library Management System , I have used Express.js for the backend framework and MongoDB as a database. For authentication , I have used JWT tokens for authentication . Routing and API endpoints are handled by express and organized the code into different sections for better readability and  implemented middlewares to handle common tasks like token verification and  checking roles for furthur usage and security puposes . Hashed password for better security .</p>

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
