"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[6332],{45094:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>i,contentTitle:()=>d,default:()=>o,frontMatter:()=>r,metadata:()=>l,toc:()=>h});var c=s(74848),t=s(28453);const r={title:"06. INSERT - UPDATE - DELETE",slug:"06-insert-update-delete",description:"H\u1ecdc c\xe1ch Ch\u1ec9nh s\u1eeda (th\xeam, c\u1eadp nh\u1eadt v\xe0 x\xf3a) d\u1eef li\u1ec7u trong SQL. T\xecm hi\u1ec3u c\xe1ch th\u1ef1c hi\u1ec7n c\xe1c thao t\xe1c CRUD (Create, Read, Update, Delete) tr\xean b\u1ea3ng.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:6,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},d="\ud83d\udd25 6: INSERT - UPDATE - DELETE",l={id:"database/learn-sql-in-30-days/INSERT - UPDATE - DELETE",title:"06. INSERT - UPDATE - DELETE",description:"H\u1ecdc c\xe1ch Ch\u1ec9nh s\u1eeda (th\xeam, c\u1eadp nh\u1eadt v\xe0 x\xf3a) d\u1eef li\u1ec7u trong SQL. T\xecm hi\u1ec3u c\xe1ch th\u1ef1c hi\u1ec7n c\xe1c thao t\xe1c CRUD (Create, Read, Update, Delete) tr\xean b\u1ea3ng.",source:"@site/docs/06-database/learn-sql-in-30-days/06. INSERT - UPDATE - DELETE.md",sourceDirName:"06-database/learn-sql-in-30-days",slug:"/database/learn-sql-in-30-days/06-insert-update-delete",permalink:"/en/docs/database/learn-sql-in-30-days/06-insert-update-delete",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/06-database/learn-sql-in-30-days/06. INSERT - UPDATE - DELETE.md",tags:[{inline:!0,label:"database",permalink:"/en/docs/tags/database"},{inline:!0,label:"sql",permalink:"/en/docs/tags/sql"},{inline:!0,label:"learn-sql",permalink:"/en/docs/tags/learn-sql"},{inline:!0,label:"roadmap",permalink:"/en/docs/tags/roadmap"},{inline:!0,label:"dbms",permalink:"/en/docs/tags/dbms"}],version:"current",lastUpdatedAt:1741879447e3,sidebarPosition:6,frontMatter:{title:"06. INSERT - UPDATE - DELETE",slug:"06-insert-update-delete",description:"H\u1ecdc c\xe1ch Ch\u1ec9nh s\u1eeda (th\xeam, c\u1eadp nh\u1eadt v\xe0 x\xf3a) d\u1eef li\u1ec7u trong SQL. T\xecm hi\u1ec3u c\xe1ch th\u1ef1c hi\u1ec7n c\xe1c thao t\xe1c CRUD (Create, Read, Update, Delete) tr\xean b\u1ea3ng.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:6,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"05. To\xe1n t\u1eed, Bi\u1ec3u th\u1ee9c",permalink:"/en/docs/database/learn-sql-in-30-days/05-operators-and-expressions"},next:{title:"07. Review 1",permalink:"/en/docs/database/learn-sql-in-30-days/07-review-1"}},i={},h=[{value:"<strong>1\ufe0f\u20e3 <code>INSERT INTO</code> \u2013 Ch\xe8n d\u1eef li\u1ec7u m\u1edbi</strong>",id:"1\ufe0f\u20e3-insert-into--ch\xe8n-d\u1eef-li\u1ec7u-m\u1edbi",level:2},{value:"<strong>\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n</strong>",id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n",level:3},{value:"<strong>2\ufe0f\u20e3 <code>UPDATE</code> \u2013 C\u1eadp nh\u1eadt d\u1eef li\u1ec7u</strong>",id:"2\ufe0f\u20e3-update--c\u1eadp-nh\u1eadt-d\u1eef-li\u1ec7u",level:2},{value:"<strong>\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n</strong>",id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n-1",level:3},{value:"<strong>3\ufe0f\u20e3 <code>DELETE</code> \u2013 X\xf3a d\u1eef li\u1ec7u</strong>",id:"3\ufe0f\u20e3-delete--x\xf3a-d\u1eef-li\u1ec7u",level:2},{value:"<strong>\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n</strong>",id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n-2",level:3},{value:"<strong>4\ufe0f\u20e3 So s\xe1nh <code>DELETE</code> v\xe0 <code>TRUNCATE</code></strong>",id:"4\ufe0f\u20e3-so-s\xe1nh-delete-v\xe0-truncate",level:2},{value:"<strong>5\ufe0f\u20e3 Th\u1ef1c h\xe0nh</strong>",id:"5\ufe0f\u20e3-th\u1ef1c-h\xe0nh",level:2},{value:"\ud83d\udccc <strong>Quick Quiz</strong>",id:"-quick-quiz",level:2},{value:"\u2705 <strong>T\xf3m t\u1eaft Ng\xe0y 6</strong>",id:"-t\xf3m-t\u1eaft-ng\xe0y-6",level:4}];function a(n){const e={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...n.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(e.h1,{id:"-6-insert---update---delete",children:["\ud83d\udd25 ",(0,c.jsx)(e.strong,{children:"6: INSERT - UPDATE - DELETE"})]}),"\n",(0,c.jsxs)(e.blockquote,{children:["\n",(0,c.jsxs)(e.p,{children:[(0,c.jsx)(e.strong,{children:"M\u1ee5c ti\xeau b\xe0i h\u1ecdc:"})," H\u1ecdc c\xe1ch ",(0,c.jsx)(e.strong,{children:"th\xeam, c\u1eadp nh\u1eadt v\xe0 x\xf3a"})," d\u1eef li\u1ec7u trong SQL b\u1eb1ng c\xe1ch s\u1eed d\u1ee5ng c\xe1c c\xe2u l\u1ec7nh ",(0,c.jsx)(e.strong,{children:(0,c.jsx)(e.code,{children:"INSERT INTO"})}),", ",(0,c.jsx)(e.strong,{children:(0,c.jsx)(e.code,{children:"UPDATE"})}),", v\xe0 ",(0,c.jsx)(e.strong,{children:(0,c.jsx)(e.code,{children:"DELETE"})}),". Hi\u1ec3u r\xf5 c\xe1ch th\u1ef1c hi\u1ec7n c\xe1c thao t\xe1c CRUD (",(0,c.jsx)(e.em,{children:"Create, Read, Update, Delete"}),") tr\xean b\u1ea3ng d\u1eef li\u1ec7u."]}),"\n"]}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h2,{id:"1\ufe0f\u20e3-insert-into--ch\xe8n-d\u1eef-li\u1ec7u-m\u1edbi",children:(0,c.jsxs)(e.strong,{children:["1\ufe0f\u20e3 ",(0,c.jsx)(e.code,{children:"INSERT INTO"})," \u2013 Ch\xe8n d\u1eef li\u1ec7u m\u1edbi"]})}),"\n",(0,c.jsxs)(e.p,{children:["L\u1ec7nh ",(0,c.jsx)(e.code,{children:"INSERT INTO"})," \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 ",(0,c.jsx)(e.strong,{children:"th\xeam d\u1eef li\u1ec7u m\u1edbi"})," v\xe0o m\u1ed9t b\u1ea3ng trong c\u01a1 s\u1edf d\u1eef li\u1ec7u."]}),"\n",(0,c.jsx)(e.h3,{id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n",children:(0,c.jsx)(e.strong,{children:"\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n"})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"INSERT INTO table_name (column1, column2, ...) \nVALUES (value1, value2, ...);\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsxs)(e.strong,{children:["V\xed d\u1ee5: Th\xeam m\u1ed9t s\u1ea3n ph\u1ea9m m\u1edbi v\xe0o b\u1ea3ng ",(0,c.jsx)(e.code,{children:"Products"})]})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"INSERT INTO Products (Name, Category, Price, StockQuantity)\nVALUES ('MacBook Pro', 'Laptop', 45000000, 10);\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsxs)(e.strong,{children:["V\xed d\u1ee5: Th\xeam nhi\u1ec1u d\xf2ng d\u1eef li\u1ec7u c\xf9ng l\xfac v\xe0o b\u1ea3ng ",(0,c.jsx)(e.code,{children:"Customers"})]})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"INSERT INTO Customers (Name, Email, City)\nVALUES \n  ('Nguy\u1ec5n V\u0103n A', 'nguyenvana@example.com', 'H\xe0 N\u1ed9i'),\n  ('Tr\u1ea7n Th\u1ecb B', 'tranthib@example.com', 'TP.HCM'),\n  ('L\xea V\u0103n C', 'levanc@example.com', '\u0110\xe0 N\u1eb5ng');\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"L\u01b0u \xfd:"})]}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:["N\u1ebfu b\u1ea3ng c\xf3 ",(0,c.jsxs)(e.strong,{children:["c\u1ed9t t\u1ef1 \u0111\u1ed9ng t\u0103ng (",(0,c.jsx)(e.code,{children:"AUTO_INCREMENT"}),")"]}),", kh\xf4ng c\u1ea7n ch\xe8n gi\xe1 tr\u1ecb v\xe0o c\u1ed9t \u0111\xf3."]}),"\n",(0,c.jsxs)(e.li,{children:["C\u1ea7n nh\u1eadp \u0111\xfang ",(0,c.jsx)(e.strong,{children:"s\u1ed1 l\u01b0\u1ee3ng c\u1ed9t"})," t\u01b0\u01a1ng \u1ee9ng v\u1edbi gi\xe1 tr\u1ecb \u0111\u01b0\u1ee3c ch\xe8n."]}),"\n"]}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h2,{id:"2\ufe0f\u20e3-update--c\u1eadp-nh\u1eadt-d\u1eef-li\u1ec7u",children:(0,c.jsxs)(e.strong,{children:["2\ufe0f\u20e3 ",(0,c.jsx)(e.code,{children:"UPDATE"})," \u2013 C\u1eadp nh\u1eadt d\u1eef li\u1ec7u"]})}),"\n",(0,c.jsxs)(e.p,{children:["L\u1ec7nh ",(0,c.jsx)(e.code,{children:"UPDATE"})," gi\xfap c\u1eadp nh\u1eadt gi\xe1 tr\u1ecb c\u1ee7a m\u1ed9t ho\u1eb7c nhi\u1ec1u d\xf2ng trong b\u1ea3ng."]}),"\n",(0,c.jsx)(e.h3,{id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n-1",children:(0,c.jsx)(e.strong,{children:"\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n"})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"UPDATE table_name \nSET column1 = value1, column2 = value2 \nWHERE condition;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:'V\xed d\u1ee5: C\u1eadp nh\u1eadt gi\xe1 c\u1ee7a s\u1ea3n ph\u1ea9m "MacBook Pro"'})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"UPDATE Products \nSET Price = 42000000 \nWHERE Name = 'MacBook Pro';\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5: T\u0103ng gi\xe1 t\u1ea5t c\u1ea3 s\u1ea3n ph\u1ea9m thu\u1ed9c danh m\u1ee5c 'Laptop' th\xeam 10%"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"UPDATE Products \nSET Price = Price * 1.1 \nWHERE Category = 'Laptop';\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsxs)(e.strong,{children:["V\xed d\u1ee5: C\u1eadp nh\u1eadt th\xe0nh ph\u1ed1 c\u1ee7a kh\xe1ch h\xe0ng c\xf3 ",(0,c.jsx)(e.code,{children:"ID = 5"})]})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"UPDATE Customers \nSET City = 'H\u1ea3i Ph\xf2ng' \nWHERE ID = 5;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"L\u01b0u \xfd quan tr\u1ecdng:"})]}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsxs)(e.strong,{children:["Lu\xf4n s\u1eed d\u1ee5ng ",(0,c.jsx)(e.code,{children:"WHERE"})]})," \u0111\u1ec3 tr\xe1nh c\u1eadp nh\u1eadt to\xe0n b\u1ed9 d\u1eef li\u1ec7u trong b\u1ea3ng."]}),"\n",(0,c.jsxs)(e.li,{children:["N\u1ebfu b\u1ecf ",(0,c.jsx)(e.code,{children:"WHERE"}),", ",(0,c.jsx)(e.strong,{children:"t\u1ea5t c\u1ea3 c\xe1c d\xf2ng d\u1eef li\u1ec7u s\u1ebd b\u1ecb c\u1eadp nh\u1eadt!"})]}),"\n"]}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h2,{id:"3\ufe0f\u20e3-delete--x\xf3a-d\u1eef-li\u1ec7u",children:(0,c.jsxs)(e.strong,{children:["3\ufe0f\u20e3 ",(0,c.jsx)(e.code,{children:"DELETE"})," \u2013 X\xf3a d\u1eef li\u1ec7u"]})}),"\n",(0,c.jsxs)(e.p,{children:["L\u1ec7nh ",(0,c.jsx)(e.code,{children:"DELETE"})," gi\xfap x\xf3a m\u1ed9t ho\u1eb7c nhi\u1ec1u d\xf2ng d\u1eef li\u1ec7u kh\u1ecfi b\u1ea3ng."]}),"\n",(0,c.jsx)(e.h3,{id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n-2",children:(0,c.jsx)(e.strong,{children:"\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n"})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"DELETE FROM table_name \nWHERE condition;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:'V\xed d\u1ee5: X\xf3a s\u1ea3n ph\u1ea9m c\xf3 t\xean "MacBook Pro"'})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"DELETE FROM Products \nWHERE Name = 'MacBook Pro';\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:'V\xed d\u1ee5: X\xf3a t\u1ea5t c\u1ea3 kh\xe1ch h\xe0ng \u0111\u1ebfn t\u1eeb "H\xe0 N\u1ed9i"'})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"DELETE FROM Customers \nWHERE City = 'H\xe0 N\u1ed9i';\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsxs)(e.strong,{children:["V\xed d\u1ee5: X\xf3a c\xe1c s\u1ea3n ph\u1ea9m h\u1ebft h\xe0ng (",(0,c.jsx)(e.code,{children:"StockQuantity = 0"}),")"]})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"DELETE FROM Products \nWHERE StockQuantity = 0;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"L\u01b0u \xfd quan tr\u1ecdng:"})]}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:(0,c.jsxs)(e.strong,{children:["Lu\xf4n d\xf9ng ",(0,c.jsx)(e.code,{children:"WHERE"})," \u0111\u1ec3 tr\xe1nh x\xf3a to\xe0n b\u1ed9 d\u1eef li\u1ec7u."]})}),"\n",(0,c.jsxs)(e.li,{children:["N\u1ebfu ch\u1ea1y ",(0,c.jsx)(e.strong,{children:(0,c.jsx)(e.code,{children:"DELETE FROM table_name;"})})," m\xe0 kh\xf4ng c\xf3 ",(0,c.jsx)(e.code,{children:"WHERE"}),", ",(0,c.jsx)(e.strong,{children:"to\xe0n b\u1ed9 b\u1ea3ng s\u1ebd b\u1ecb x\xf3a d\u1eef li\u1ec7u!"})]}),"\n",(0,c.jsxs)(e.li,{children:["N\u1ebfu mu\u1ed1n ",(0,c.jsx)(e.strong,{children:"x\xf3a to\xe0n b\u1ed9 d\u1eef li\u1ec7u nh\u01b0ng v\u1eabn gi\u1eef c\u1ea5u tr\xfac b\u1ea3ng"}),", d\xf9ng ",(0,c.jsx)(e.strong,{children:(0,c.jsx)(e.code,{children:"TRUNCATE TABLE table_name;"})}),"."]}),"\n"]}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h2,{id:"4\ufe0f\u20e3-so-s\xe1nh-delete-v\xe0-truncate",children:(0,c.jsxs)(e.strong,{children:["4\ufe0f\u20e3 So s\xe1nh ",(0,c.jsx)(e.code,{children:"DELETE"})," v\xe0 ",(0,c.jsx)(e.code,{children:"TRUNCATE"})]})}),"\n",(0,c.jsxs)(e.table,{children:[(0,c.jsx)(e.thead,{children:(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.th,{children:"Ph\u01b0\u01a1ng th\u1ee9c"}),(0,c.jsx)(e.th,{children:"M\xf4 t\u1ea3"}),(0,c.jsx)(e.th,{children:"C\xf3 th\u1ec3 ho\xe0n t\xe1c kh\xf4ng?"}),(0,c.jsx)(e.th,{children:"\u1ea2nh h\u01b0\u1edfng \u0111\u1ebfn AUTO_INCREMENT"})]})}),(0,c.jsxs)(e.tbody,{children:[(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.strong,{children:"DELETE"})}),(0,c.jsx)(e.td,{children:"X\xf3a t\u1eebng d\xf2ng m\u1ed9t theo \u0111i\u1ec1u ki\u1ec7n"}),(0,c.jsxs)(e.td,{children:["\u2705 C\xf3 (n\u1ebfu c\xf3 ",(0,c.jsx)(e.code,{children:"ROLLBACK"}),")"]}),(0,c.jsx)(e.td,{children:"\u274c Kh\xf4ng thay \u0111\u1ed5i"})]}),(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.strong,{children:"TRUNCATE"})}),(0,c.jsx)(e.td,{children:"X\xf3a to\xe0n b\u1ed9 d\u1eef li\u1ec7u trong b\u1ea3ng"}),(0,c.jsx)(e.td,{children:"\u274c Kh\xf4ng th\u1ec3 ho\xe0n t\xe1c"}),(0,c.jsx)(e.td,{children:"\u2705 Reset AUTO_INCREMENT"})]})]})]}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udcd6 ",(0,c.jsx)(e.strong,{children:"Tham kh\u1ea3o:"})]}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:(0,c.jsx)(e.a,{href:"https://dev.mysql.com/doc/refman/en/delete.html",children:"MySQL DELETE Statement"})}),"\n",(0,c.jsx)(e.li,{children:(0,c.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/sql-delete.html",children:"PostgreSQL DELETE Documentation"})}),"\n"]}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h2,{id:"5\ufe0f\u20e3-th\u1ef1c-h\xe0nh",children:(0,c.jsx)(e.strong,{children:"5\ufe0f\u20e3 Th\u1ef1c h\xe0nh"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 1:"})," Th\xeam m\u1ed9t kh\xe1ch h\xe0ng m\u1edbi v\xe0o b\u1ea3ng ",(0,c.jsx)(e.code,{children:"Customers"}),"."]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"INSERT INTO Customers (Name, Email, City) \nVALUES ('Ph\u1ea1m Minh D', 'phamminhd@example.com', 'H\u1ea3i Ph\xf2ng');\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 2:"})," C\u1eadp nh\u1eadt s\u1ed1 l\u01b0\u1ee3ng t\u1ed3n kho c\u1ee7a s\u1ea3n ph\u1ea9m c\xf3 ",(0,c.jsx)(e.code,{children:"ID = 10"})," th\xe0nh ",(0,c.jsx)(e.code,{children:"50"}),"."]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"UPDATE Products \nSET StockQuantity = 50 \nWHERE ID = 10;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 3:"}),' Gi\u1ea3m gi\xe1 5% cho t\u1ea5t c\u1ea3 s\u1ea3n ph\u1ea9m thu\u1ed9c danh m\u1ee5c "\u0110i\u1ec7n tho\u1ea1i".']}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"UPDATE Products \nSET Price = Price * 0.95 \nWHERE Category = '\u0110i\u1ec7n tho\u1ea1i';\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 4:"})," X\xf3a kh\xe1ch h\xe0ng c\xf3 ",(0,c.jsx)(e.code,{children:"Email = 'tranthib@example.com'"}),"."]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"DELETE FROM Customers \nWHERE Email = 'tranthib@example.com';\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 5:"})," X\xf3a t\u1ea5t c\u1ea3 s\u1ea3n ph\u1ea9m c\xf3 gi\xe1 d\u01b0\u1edbi 100,000 VN\u0110."]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"DELETE FROM Products \nWHERE Price < 100000;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udcd6 ",(0,c.jsx)(e.strong,{children:"Tham kh\u1ea3o:"})]}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:(0,c.jsx)(e.a,{href:"https://dev.mysql.com/doc/refman/en/update.html",children:"MySQL UPDATE Statement"})}),"\n",(0,c.jsx)(e.li,{children:(0,c.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/sql-update.html",children:"PostgreSQL UPDATE Documentation"})}),"\n"]}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsxs)(e.h2,{id:"-quick-quiz",children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"Quick Quiz"})]}),"\n",(0,c.jsxs)(e.ol,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsxs)(e.strong,{children:["L\u1ec7nh ",(0,c.jsx)(e.code,{children:"INSERT INTO"})," c\xf3 th\u1ec3 th\xeam nhi\u1ec1u d\xf2ng c\xf9ng l\xfac kh\xf4ng?"]})," N\u1ebfu c\xf3, c\xfa ph\xe1p l\xe0 g\xec?"]}),"\n",(0,c.jsx)(e.li,{children:(0,c.jsxs)(e.strong,{children:["L\xe0m sao \u0111\u1ec3 t\u0103ng gi\xe1 t\u1ea5t c\u1ea3 s\u1ea3n ph\u1ea9m trong b\u1ea3ng ",(0,c.jsx)(e.code,{children:"Products"})," l\xean 10%?"]})}),"\n",(0,c.jsx)(e.li,{children:(0,c.jsxs)(e.strong,{children:["S\u1ef1 kh\xe1c bi\u1ec7t gi\u1eefa ",(0,c.jsx)(e.code,{children:"DELETE"})," v\xe0 ",(0,c.jsx)(e.code,{children:"TRUNCATE"})," l\xe0 g\xec?"]})}),"\n",(0,c.jsx)(e.li,{children:(0,c.jsxs)(e.strong,{children:["\u0110i\u1ec1u g\xec x\u1ea3y ra n\u1ebfu ch\u1ea1y ",(0,c.jsx)(e.code,{children:"DELETE FROM Products;"})," m\xe0 kh\xf4ng c\xf3 ",(0,c.jsx)(e.code,{children:"WHERE"}),"?"]})}),"\n"]}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsxs)(e.h4,{id:"-t\xf3m-t\u1eaft-ng\xe0y-6",children:["\u2705 ",(0,c.jsx)(e.strong,{children:"T\xf3m t\u1eaft Ng\xe0y 6"})]}),"\n",(0,c.jsxs)(e.p,{children:["\u2714\ufe0f ",(0,c.jsx)(e.code,{children:"INSERT INTO"})," \u0111\u1ec3 th\xeam d\u1eef li\u1ec7u m\u1edbi v\xe0o b\u1ea3ng.",(0,c.jsx)(e.br,{}),"\n","\u2714\ufe0f ",(0,c.jsx)(e.code,{children:"UPDATE"})," \u0111\u1ec3 c\u1eadp nh\u1eadt th\xf4ng tin c\u1ee7a m\u1ed9t ho\u1eb7c nhi\u1ec1u b\u1ea3n ghi.",(0,c.jsx)(e.br,{}),"\n","\u2714\ufe0f ",(0,c.jsx)(e.code,{children:"DELETE"})," \u0111\u1ec3 x\xf3a d\u1eef li\u1ec7u, c\u1ea7n c\u1ea9n th\u1eadn v\u1edbi ",(0,c.jsx)(e.code,{children:"WHERE"}),".",(0,c.jsx)(e.br,{}),"\n","\u2714\ufe0f ",(0,c.jsx)(e.code,{children:"TRUNCATE TABLE"})," x\xf3a to\xe0n b\u1ed9 d\u1eef li\u1ec7u trong b\u1ea3ng m\xe0 kh\xf4ng th\u1ec3 ho\xe0n t\xe1c."]}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\ude80 ",(0,c.jsx)(e.strong,{children:"Ti\u1ebfp theo:"})," ",(0,c.jsx)(e.a,{href:"/en/docs/database/learn-sql-in-30-days/07-review-1",children:"Ki\u1ec3m tra ki\u1ebfn th\u1ee9c - B\xe0i t\u1eadp t\u1ed5ng h\u1ee3p tu\u1ea7n 1"}),"."]}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"L\u1ed9 tr\xecnh:"})," ",(0,c.jsx)(e.a,{href:"/en/docs/database/learn-sql-in-30-days/30-day-sql-learning-roadmap",children:"H\u1ecdc SQL trong 30 ng\xe0y"})]})]})}function o(n={}){const{wrapper:e}={...(0,t.R)(),...n.components};return e?(0,c.jsx)(e,{...n,children:(0,c.jsx)(a,{...n})}):a(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>d,x:()=>l});var c=s(96540);const t={},r=c.createContext(t);function d(n){const e=c.useContext(r);return c.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:d(n.components),c.createElement(r.Provider,{value:e},n.children)}}}]);