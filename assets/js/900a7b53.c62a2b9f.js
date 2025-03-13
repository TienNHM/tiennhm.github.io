"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[5458],{63886:(n,s,e)=>{e.r(s),e.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var r=e(74848),t=e(28453);const i={title:"23. SQL connect apps",slug:"23-sql-connect-apps",description:"H\u01b0\u1edbng d\u1eabn k\u1ebft n\u1ed1i SQL v\u1edbi \u1ee9ng d\u1ee5ng v\xe0 th\u1ef1c h\xe0nh t\u1ea1o API CRUD \u0111\u01a1n gi\u1ea3n.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:23,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},c=void 0,o={id:"database/learn-sql-in-30-days/SQL connect apps",title:"23. SQL connect apps",description:"H\u01b0\u1edbng d\u1eabn k\u1ebft n\u1ed1i SQL v\u1edbi \u1ee9ng d\u1ee5ng v\xe0 th\u1ef1c h\xe0nh t\u1ea1o API CRUD \u0111\u01a1n gi\u1ea3n.",source:"@site/docs/06-database/learn-sql-in-30-days/23. SQL connect apps.md",sourceDirName:"06-database/learn-sql-in-30-days",slug:"/database/learn-sql-in-30-days/23-sql-connect-apps",permalink:"/docs/database/learn-sql-in-30-days/23-sql-connect-apps",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/06-database/learn-sql-in-30-days/23. SQL connect apps.md",tags:[{inline:!0,label:"database",permalink:"/docs/tags/database"},{inline:!0,label:"sql",permalink:"/docs/tags/sql"},{inline:!0,label:"learn-sql",permalink:"/docs/tags/learn-sql"},{inline:!0,label:"roadmap",permalink:"/docs/tags/roadmap"},{inline:!0,label:"dbms",permalink:"/docs/tags/dbms"}],version:"current",lastUpdatedAt:1741855241e3,sidebarPosition:23,frontMatter:{title:"23. SQL connect apps",slug:"23-sql-connect-apps",description:"H\u01b0\u1edbng d\u1eabn k\u1ebft n\u1ed1i SQL v\u1edbi \u1ee9ng d\u1ee5ng v\xe0 th\u1ef1c h\xe0nh t\u1ea1o API CRUD \u0111\u01a1n gi\u1ea3n.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:23,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"22. SQL Json practice",permalink:"/docs/database/learn-sql-in-30-days/22-sql-json-practice"},next:{title:"24. Import - Export data",permalink:"/docs/database/learn-sql-in-30-days/24-import-export-data"}},l={},d=[{value:"<strong>1\ufe0f\u20e3 L\xfd thuy\u1ebft</strong>:",id:"1\ufe0f\u20e3-l\xfd-thuy\u1ebft",level:2},{value:"<strong>\ud83d\udd39 C\xe1ch k\u1ebft n\u1ed1i SQL v\u1edbi \u1ee9ng d\u1ee5ng</strong>",id:"-c\xe1ch-k\u1ebft-n\u1ed1i-sql-v\u1edbi-\u1ee9ng-d\u1ee5ng",level:3},{value:"<strong>2\ufe0f\u20e3 Th\u1ef1c h\xe0nh: Vi\u1ebft API CRUD \u0111\u01a1n gi\u1ea3n</strong>",id:"2\ufe0f\u20e3-th\u1ef1c-h\xe0nh-vi\u1ebft-api-crud-\u0111\u01a1n-gi\u1ea3n",level:2},{value:"<strong>\ud83d\udee0 Y\xeau c\u1ea7u:</strong>",id:"-y\xeau-c\u1ea7u",level:3},{value:"<strong>3\ufe0f\u20e3 G\u1ee3i \xfd l\u1eddi gi\u1ea3i</strong>",id:"3\ufe0f\u20e3-g\u1ee3i-\xfd-l\u1eddi-gi\u1ea3i",level:2},{value:"<strong>\ud83d\udd39 Vi\u1ebft API CRUD v\u1edbi Node.js + Express + MySQL</strong>",id:"-vi\u1ebft-api-crud-v\u1edbi-nodejs--express--mysql",level:3},{value:"\ud83d\udccc <strong>T\xf3m t\u1eaft b\xe0i h\u1ecdc</strong>",id:"-t\xf3m-t\u1eaft-b\xe0i-h\u1ecdc",level:4}];function a(n){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsx)(s.p,{children:"M\u1ee5c ti\xeau b\xe0i h\u1ecdc: H\u1ecdc c\xe1ch k\u1ebft n\u1ed1i SQL v\u1edbi \u1ee9ng d\u1ee5ng v\xe0 th\u1ef1c h\xe0nh t\u1ea1o API CRUD \u0111\u01a1n gi\u1ea3n."}),"\n"]}),"\n",(0,r.jsxs)(s.h2,{id:"1\ufe0f\u20e3-l\xfd-thuy\u1ebft",children:[(0,r.jsx)(s.strong,{children:"1\ufe0f\u20e3 L\xfd thuy\u1ebft"}),":"]}),"\n",(0,r.jsx)(s.h3,{id:"-c\xe1ch-k\u1ebft-n\u1ed1i-sql-v\u1edbi-\u1ee9ng-d\u1ee5ng",children:(0,r.jsx)(s.strong,{children:"\ud83d\udd39 C\xe1ch k\u1ebft n\u1ed1i SQL v\u1edbi \u1ee9ng d\u1ee5ng"})}),"\n",(0,r.jsx)(s.p,{children:"SQL c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c k\u1ebft n\u1ed1i v\u1edbi nhi\u1ec1u ng\xf4n ng\u1eef l\u1eadp tr\xecnh \u0111\u1ec3 truy v\u1ea5n, c\u1eadp nh\u1eadt v\xe0 qu\u1ea3n l\xfd d\u1eef li\u1ec7u. M\u1ed9t s\u1ed1 th\u01b0 vi\u1ec7n ph\u1ed5 bi\u1ebfn:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Python"}),": ",(0,r.jsx)(s.code,{children:"sqlite3"})," (SQLite), ",(0,r.jsx)(s.code,{children:"psycopg2"})," (PostgreSQL), ",(0,r.jsx)(s.code,{children:"mysql-connector-python"})," (MySQL)"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Node.js"}),": ",(0,r.jsx)(s.code,{children:"mysql2"}),", ",(0,r.jsx)(s.code,{children:"pg"}),", ",(0,r.jsx)(s.code,{children:"sequelize"})," (ORM)"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"C#"}),": ",(0,r.jsx)(s.code,{children:"System.Data.SqlClient"}),", ",(0,r.jsx)(s.code,{children:"Dapper"}),", ",(0,r.jsx)(s.code,{children:"Entity Framework Core"})]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"D\u01b0\u1edbi \u0111\xe2y l\xe0 c\xe1ch thi\u1ebft l\u1eadp k\u1ebft n\u1ed1i c\u01a1 b\u1ea3n v\u1edbi SQL trong t\u1eebng ng\xf4n ng\u1eef:"}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udd39 ",(0,r.jsx)(s.strong,{children:"Python (MySQL & PostgreSQL)"})]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-python",children:'import mysql.connector\n\nconn = mysql.connector.connect(\n    host="localhost",\n    user="root",\n    password="password",\n    database="shop"\n)\ncursor = conn.cursor()\ncursor.execute("SELECT * FROM products")\nrows = cursor.fetchall()\nfor row in rows:\n    print(row)\nconn.close()\n'})}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udd39 ",(0,r.jsx)(s.strong,{children:"Node.js (MySQL & PostgreSQL)"})]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-javascript",children:"const mysql = require('mysql2');\n\nconst connection = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: 'password',\n  database: 'shop'\n});\n\nconnection.query('SELECT * FROM products', (error, results) => {\n  if (error) throw error;\n  console.log(results);\n});\n\nconnection.end();\n"})}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udd39 ",(0,r.jsx)(s.strong,{children:"C# (SQL Server v\u1edbi Dapper)"})]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-csharp",children:'using System;\nusing System.Data.SqlClient;\nusing Dapper;\n\nclass Program\n{\n    static void Main()\n    {\n        using var connection = new SqlConnection("Server=localhost;Database=shop;User Id=sa;Password=yourpassword;");\n        var products = connection.Query("SELECT * FROM Products");\n        foreach (var product in products)\n            Console.WriteLine(product);\n    }\n}\n'})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"2\ufe0f\u20e3-th\u1ef1c-h\xe0nh-vi\u1ebft-api-crud-\u0111\u01a1n-gi\u1ea3n",children:(0,r.jsx)(s.strong,{children:"2\ufe0f\u20e3 Th\u1ef1c h\xe0nh: Vi\u1ebft API CRUD \u0111\u01a1n gi\u1ea3n"})}),"\n",(0,r.jsx)(s.h3,{id:"-y\xeau-c\u1ea7u",children:(0,r.jsx)(s.strong,{children:"\ud83d\udee0 Y\xeau c\u1ea7u:"})}),"\n",(0,r.jsxs)(s.p,{children:["Vi\u1ebft API RESTful \u0111\u1ec3 qu\u1ea3n l\xfd s\u1ea3n ph\u1ea9m trong b\u1ea3ng ",(0,r.jsx)(s.code,{children:"products"})," v\u1edbi 4 ch\u1ee9c n\u0103ng ch\xednh:"]}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Create"}),": Th\xeam s\u1ea3n ph\u1ea9m m\u1edbi"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Read"}),": L\u1ea5y danh s\xe1ch s\u1ea3n ph\u1ea9m"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Update"}),": C\u1eadp nh\u1eadt th\xf4ng tin s\u1ea3n ph\u1ea9m"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Delete"}),": X\xf3a s\u1ea3n ph\u1ea9m"]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udccc ",(0,r.jsxs)(s.strong,{children:["C\u1ea5u tr\xfac b\u1ea3ng ",(0,r.jsx)(s.code,{children:"products"})]}),":"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sql",children:"CREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(255) NOT NULL,\n    price DECIMAL(10,2) NOT NULL,\n    stock INT NOT NULL\n);\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h2,{id:"3\ufe0f\u20e3-g\u1ee3i-\xfd-l\u1eddi-gi\u1ea3i",children:(0,r.jsx)(s.strong,{children:"3\ufe0f\u20e3 G\u1ee3i \xfd l\u1eddi gi\u1ea3i"})}),"\n",(0,r.jsx)(s.h3,{id:"-vi\u1ebft-api-crud-v\u1edbi-nodejs--express--mysql",children:(0,r.jsx)(s.strong,{children:"\ud83d\udd39 Vi\u1ebft API CRUD v\u1edbi Node.js + Express + MySQL"})}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udccc ",(0,r.jsx)(s.strong,{children:"C\xe0i \u0111\u1eb7t th\u01b0 vi\u1ec7n"})]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"npm init -y\nnpm install express mysql2 body-parser\n"})}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udccc ",(0,r.jsxs)(s.strong,{children:["T\u1ea1o file ",(0,r.jsx)(s.code,{children:"server.js"})," v\xe0 vi\u1ebft API"]})]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-javascript",children:"const express = require('express');\nconst mysql = require('mysql2');\nconst bodyParser = require('body-parser');\n\nconst app = express();\napp.use(bodyParser.json());\n\nconst db = mysql.createConnection({\n    host: 'localhost',\n    user: 'root',\n    password: 'password',\n    database: 'shop'\n});\n\ndb.connect(err => {\n    if (err) throw err;\n    console.log('Connected to database');\n});\n\n// CREATE\napp.post('/products', (req, res) => {\n    const { name, price, stock } = req.body;\n    db.query('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [name, price, stock], (err, result) => {\n        if (err) throw err;\n        res.send({ message: 'Product added', id: result.insertId });\n    });\n});\n\n// READ\napp.get('/products', (req, res) => {\n    db.query('SELECT * FROM products', (err, results) => {\n        if (err) throw err;\n        res.json(results);\n    });\n});\n\n// UPDATE\napp.put('/products/:id', (req, res) => {\n    const { name, price, stock } = req.body;\n    db.query('UPDATE products SET name=?, price=?, stock=? WHERE id=?', [name, price, stock, req.params.id], (err) => {\n        if (err) throw err;\n        res.send({ message: 'Product updated' });\n    });\n});\n\n// DELETE\napp.delete('/products/:id', (req, res) => {\n    db.query('DELETE FROM products WHERE id=?', [req.params.id], (err) => {\n        if (err) throw err;\n        res.send({ message: 'Product deleted' });\n    });\n});\n\napp.listen(3000, () => {\n    console.log('Server is running on port 3000');\n});\n"})}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udccc ",(0,r.jsx)(s.strong,{children:"Ch\u1ea1y server"})]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"node server.js\n"})}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udccc ",(0,r.jsx)(s.strong,{children:"G\u1ecdi API ki\u1ec3m tra"})]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:'// Th\xeam s\u1ea3n ph\u1ea9m\ncurl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d \'{"name":"Laptop","price":1000,"stock":10}\'\n\n// L\u1ea5y danh s\xe1ch s\u1ea3n ph\u1ea9m\ncurl -X GET http://localhost:3000/products\n\n// C\u1eadp nh\u1eadt s\u1ea3n ph\u1ea9m\ncurl -X PUT http://localhost:3000/products/1 -H "Content-Type: application/json" -d \'{"name":"Laptop Pro","price":1200,"stock":8}\'\n\n// X\xf3a s\u1ea3n ph\u1ea9m\ncurl -X DELETE http://localhost:3000/products/1\n'})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsxs)(s.h4,{id:"-t\xf3m-t\u1eaft-b\xe0i-h\u1ecdc",children:["\ud83d\udccc ",(0,r.jsx)(s.strong,{children:"T\xf3m t\u1eaft b\xe0i h\u1ecdc"})]}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"K\u1ebft n\u1ed1i SQL v\u1edbi \u1ee9ng d\u1ee5ng"})," gi\xfap truy v\u1ea5n v\xe0 thao t\xe1c d\u1eef li\u1ec7u t\u1eeb m\xe3 ngu\u1ed3n."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"S\u1eed d\u1ee5ng th\u01b0 vi\u1ec7n ph\xf9 h\u1ee3p"})," t\xf9y v\xe0o ng\xf4n ng\u1eef l\u1eadp tr\xecnh (Python, Node.js, C#)."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"API CRUD gi\xfap qu\u1ea3n l\xfd d\u1eef li\u1ec7u"})," th\xf4ng qua HTTP requests (",(0,r.jsx)(s.code,{children:"POST"}),", ",(0,r.jsx)(s.code,{children:"GET"}),", ",(0,r.jsx)(s.code,{children:"PUT"}),", ",(0,r.jsx)(s.code,{children:"DELETE"}),")."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Th\u1ef1c h\xe0nh t\u1ed1t v\u1edbi database th\u1eadt"})," gi\xfap t\u0103ng t\u1ed1c \u0111\u1ed9 l\xe0m vi\u1ec7c v\u1edbi SQL trong c\xe1c \u1ee9ng d\u1ee5ng th\u1ef1c t\u1ebf."]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\ude80 ",(0,r.jsx)(s.strong,{children:"Ti\u1ebfp theo:"})," ",(0,r.jsx)(s.a,{href:"/docs/database/learn-sql-in-30-days/24-import-export-data",children:"Nh\u1eadp & Xu\u1ea5t d\u1eef li\u1ec7u CSV, Excel"})]}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udccc ",(0,r.jsx)(s.strong,{children:"L\u1ed9 tr\xecnh:"})," ",(0,r.jsx)(s.a,{href:"/docs/database/learn-sql-in-30-days/30-day-sql-learning-roadmap",children:"H\u1ecdc SQL trong 30 ng\xe0y"}),"."]})]})}function h(n={}){const{wrapper:s}={...(0,t.R)(),...n.components};return s?(0,r.jsx)(s,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}},28453:(n,s,e)=>{e.d(s,{R:()=>c,x:()=>o});var r=e(96540);const t={},i=r.createContext(t);function c(n){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof n?n(s):{...s,...n}}),[s,n])}function o(n){let s;return s=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:c(n.components),r.createElement(i.Provider,{value:s},n.children)}}}]);