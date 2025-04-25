# 📚 Library Corner API

## 📌 Purpose of the Application / 应用目的

This application is a RESTful API for managing a book collection. It allows users to perform CRUD operations on books, filter by different fields, and implement authentication and authorization.

该应用是一个用于管理图书收藏的 RESTful API，用户可以对图书进行增删改查操作，支持多种字段过滤，并实现身份验证与权限管理。

---

## 📡 API Endpoints / 接口列表

| Method | Endpoint                 | Description (EN / 中文描述)                         |
|--------|--------------------------|----------------------------------------------------|
| GET    | /api/books               | Get all books / 获取所有图书                        |
| GET    | /api/books/:id           | Get book by ID / 根据 ID 获取图书                  |
| POST   | /api/books               | Add a new book / 添加新图书                         |
| PUT    | /api/books/:id           | Update a book by ID / 更新指定 ID 的图书           |
| DELETE | /api/books/:id           | Delete a book by ID / 删除指定 ID 的图书           |
| GET    | /api/users               | Get all users / 获取所有用户                        |
| GET    | /api/users/:id           | Get user by ID / 根据 ID 获取用户                  |
| POST   | /api/users               | Create a new user / 创建新用户                      |
| PUT    | /api/users/:id           | Update a user by ID / 更新指定 ID 的用户           |
| DELETE | /api/users/:id           | Delete a user by ID / 删除指定 ID 的用户           |
| GET    | /api/categories          | Get all categories / 获取所有分类                   |
| GET    | /api/categories/:id      | Get category by ID / 根据 ID 获取分类              |
| POST   | /api/categories          | Add a new category / 添加新分类                     |
| PUT    | /api/categories/:id      | Update a category by ID / 更新指定 ID 的分类       |
| DELETE | /api/categories/:id      | Delete a category by ID / 删除指定 ID 的分类       |
| GET    | /api/borrows             | Get all borrow records / 获取所有借阅记录           |
| GET    | /api/borrows/:id         | Get borrow record by ID / 根据 ID 获取借阅记录     |
| POST   | /api/borrows             | Create a new borrow record / 创建借阅记录          |
| PUT    | /api/borrows/back/:id    | Return the book by borrow ID / 归还指定借阅id的图书|
| DELETE | /api/borrows/:id         | Delete a borrow record / 删除指定 ID 的借阅记录    |
| POST   | /api/login               | Login user / 用户登录                              |

## 🌱 How to Contribute / 如何贡献代码

1. Fork the repository / 分叉（Fork）本项目。
2. Create a new branch / 创建一个新分支：`git checkout -b feature-xyz`
3. Make your changes / 编写或修改代码。
4. Commit your changes / 提交更改：`git commit -m "Add new feature"`
5. Push to the branch / 推送分支：`git push origin feature-xyz`
6. Open a Pull Request / 提交 Pull Request。

欢迎提交 issues、优化代码、修复 bug 和添加文档！💖

---

## ✨ Features / 功能列表

- 📖 **Book Management 图书管理**
  - CRUD operations for books / 图书的增删改查操作
  - Search and filter by title, author, etc. / 支持按标题、作者等字段搜索与过滤

- 👤 **User Management 用户管理**
  - Manage user accounts / 管理用户账户信息
  - Role-based permissions / 基于角色的权限控制

- 🗂️ **Category Management 分类管理**
  - Organize books by categories / 按分类组织图书
  - Full CRUD support / 完整的增删改查支持

- 📚 **Borrow Management 借阅管理**
  - Track borrow records / 跟踪图书借阅记录
  - Manage borrow status and due dates / 管理借阅状态和归还期限

- 🔐 **Authentication & Authorization 用户认证与授权**
  - JWT-based login and creation / 基于 JWT 的登录与注册
  - Middleware to protect routes / 路由保护中间件

- 🔍 **Advanced Features 高级功能**
  - Filtering, pagination, and sorting / 过滤、分页与排序
  - Input validation / 输入验证

- 🛡️ **Security 安全特性**
  - Password hashing with bcrypt / 使用 bcrypt 对用户密码加密
  - HTTP security headers via Helmet / 使用 Helmet 设置 HTTP 安全头
  - CORS configuration for cross-origin requests / 配置 CORS 控制跨域访问

- 📈 **Rate Limiting 接口速率限制**
  - Request rate limiting with express-rate-limit / 使用 express-rate-limit 限制请求频率

---

## 📦 Dependencies and Installation / 依赖与安装方式

### Dependencies / 主要依赖

- Node.js
- Express.js
- MongoDB & Mongoose
- jsonwebtoken
- dotenv
- express-validator
- morgan
- bcrypt
- cors
- helmet
- express-jwt
- express-rate-limit

### Application Architecture / 应用架构
```
.
├── API-collection.json       
├── package-lock.json         
├── package.json           
├── README.md                 
├── server.js              
└── src                       
    ├── constant.js           
    ├── controllers/         
    │   ├── bookController.js
    │   ├── borrowController.js
    │   ├── catrgoryController.js
    │   └── userController.js
    ├── middleware/           
    │   ├── checkRole.js
    │   └── validateMongoId.js
    ├── models/               
    │   ├── bookModel.js
    │   ├── borrowModel.js
    │   ├── categoryModel.js
    │   └── userModel.js
    └── routes/              
        ├── book.js
        ├── borrow.js
        ├── category.js
        ├── login.js
        ├── logout.js
        └── user.js
```

### Installation / 安装步骤

```bash
git clone https://github.com/Zwy0v0/book-api-server
cd book-api-server
npm install
npm start 
