
# 🎯 Recruitment Website Backend

This is the backend for a recruitment platform that allows **students** to apply for jobs and **companies** to manage job listings and recruitment processes.

---

## 🚀 **Tech Stack**
- **Node.js**: Backend runtime
- **ReactJS**: Frontend Library
- **Express.js**: Server framework
- **MongoDB**: Database to store users and jobs
- **JWT**: Authentication and Authorization
- **Bcrypt**: Password encryption

---

## 📦 **Project Setup**

### 1. Clone the Repository
```bash
git clone https://github.com/asasmit/Recruitment-website.git
```

### 2. Navigate to the Project Directory
```bash
cd Recruitment-website/server
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create a `.env` File
Add the following environment variables in a `.env` file:
```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=asmittt
PORT=5000
```

---

## ▶️ **Run the Application**

### 1. Start the Backend Server
```bash
npm run start
```
OR for development with nodemon:
```bash
npm run dev
```

---

## 🔒 **Authentication and Authorization**
- **/signup/:role**: Sign up as `student` or `company`
- **/login**: Login for existing users
- **JWT Token**: Secure token to authorize API requests

---

## 📚 **API Routes**

### 🧑‍💼 **User Routes**

| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| POST   | `/signup/:role`   | Sign up as company/student    |
| POST   | `/login`          | Login and get JWT token       |
| GET    | `/profile`        | Get user profile              |
| PATCH  | `/profile`        | Update user profile           |

---

### 💼 **Job Routes**

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | `/jobs`               | Get all jobs                        |
| POST   | `/jobs`               | Create a new job (Company only)     |
| GET    | `/jobs/:id`           | Get a specific job                  |
| PATCH  | `/jobs/:id/apply`     | Apply to a job (Student only)       |
| DELETE | `/jobs/:id`           | Delete a job (Company only)         |

---

## 🧪 **API Testing with Postman & Newman**

### 1. Run Tests Locally
```bash
newman run job-api-tests.json
```

### 2. Generate HTML Report
```bash
npm install -g newman-reporter-html
newman run job-api-tests.json -r html --reporter-html-export report.html
```

---

## 📝 **Test Collection**
- The Postman collection file (`job-api-tests.json`) is included in the root directory.
- Import it into Postman to test all available endpoints.

---

## 🌐 **Deployment Instructions**

1. Create a production `.env` file.
2. Deploy to a cloud platform (e.g., AWS, Heroku, or Render).
3. Run the application:
```bash
node server.js
```

---

## 🤝 **Contributing**

1. Fork the repository.
2. Create a feature branch.
```bash
git checkout -b feature-name
```
3. Commit your changes.
```bash
git commit -m "Add new feature"
```
4. Push to your branch.
```bash
git push origin feature-name
```
5. Create a pull request.

---

# 📊 Newman Test Report

This is the generated test report for the project APIs using **Newman**.

---

## 📝 **Collection Overview**

- **Collection Name:** My-collection
- **Description:** This is a collection to tell my project APIs.
- **Time of Execution:** Fri Mar 28 2025 05:16:01 GMT+0530 (India Standard Time)
- **Exported with:** Newman v6.2.1

---

## 📈 **Summary**

| Metric              | Value |
|---------------------|-------|
| Iterations          | 1     |
| Requests            | 8     |
| Prerequest Scripts  | 9     |
| Test Scripts        | 16    |
| Assertions          | 32    |

---

## ✅ **Test Results**

- **Total Tests Passed:** 32/32
- **Total Tests Failed:** 0/32
- **Total Run Duration:** 1465ms
- **Total Data Received:** 1.25KB (approx)
- **Average Response Time:** 91ms

---

## 📧 **Contact**
For any queries, please contact:

- **Asmit Dixit**
- Email: [asasmit51@gmail.com](mailto:asasmit51@gmail.com)
- GitHub: [asasmit](https://github.com/asasmit)

---

## 🎉 **Happy Coding!**
