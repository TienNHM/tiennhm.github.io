"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[8858],{70134:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>l,contentTitle:()=>t,default:()=>a,frontMatter:()=>r,metadata:()=>i,toc:()=>h});var c=s(74848),d=s(28453);const r={title:"03. SELECT, WHERE",slug:"03-select-where",description:"Gi\u1edbi thi\u1ec7u c\xe1ch s\u1eed d\u1ee5ng SELECT v\xe0 WHERE trong SQL. H\u1ecdc c\xe1ch truy v\u1ea5n d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng, l\u1ecdc d\u1eef li\u1ec7u v\u1edbi \u0111i\u1ec1u ki\u1ec7n WHERE.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:3,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},t=void 0,i={id:"database/learn-sql-in-30-days/SELECT - WHERE",title:"03. SELECT, WHERE",description:"Gi\u1edbi thi\u1ec7u c\xe1ch s\u1eed d\u1ee5ng SELECT v\xe0 WHERE trong SQL. H\u1ecdc c\xe1ch truy v\u1ea5n d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng, l\u1ecdc d\u1eef li\u1ec7u v\u1edbi \u0111i\u1ec1u ki\u1ec7n WHERE.",source:"@site/docs/06-database/learn-sql-in-30-days/03. SELECT - WHERE.md",sourceDirName:"06-database/learn-sql-in-30-days",slug:"/database/learn-sql-in-30-days/03-select-where",permalink:"/docs/database/learn-sql-in-30-days/03-select-where",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/06-database/learn-sql-in-30-days/03. SELECT - WHERE.md",tags:[{inline:!0,label:"database",permalink:"/docs/tags/database"},{inline:!0,label:"sql",permalink:"/docs/tags/sql"},{inline:!0,label:"learn-sql",permalink:"/docs/tags/learn-sql"},{inline:!0,label:"roadmap",permalink:"/docs/tags/roadmap"},{inline:!0,label:"dbms",permalink:"/docs/tags/dbms"}],version:"current",lastUpdatedAt:1740497267e3,sidebarPosition:3,frontMatter:{title:"03. SELECT, WHERE",slug:"03-select-where",description:"Gi\u1edbi thi\u1ec7u c\xe1ch s\u1eed d\u1ee5ng SELECT v\xe0 WHERE trong SQL. H\u1ecdc c\xe1ch truy v\u1ea5n d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng, l\u1ecdc d\u1eef li\u1ec7u v\u1edbi \u0111i\u1ec1u ki\u1ec7n WHERE.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:3,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"02. C\u1ea5u tr\xfac b\u1ea3ng v\xe0 ki\u1ec3u d\u1eef li\u1ec7u",permalink:"/docs/database/learn-sql-in-30-days/02-table-structure-and-data-types"},next:{title:"04. ORDER BY, LIMIT",permalink:"/docs/database/learn-sql-in-30-days/04-order-by-limit"}},l={},h=[{value:"<strong>1\ufe0f\u20e3 <code>SELECT</code> \u2013 Truy v\u1ea5n d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng</strong>",id:"1\ufe0f\u20e3-select--truy-v\u1ea5n-d\u1eef-li\u1ec7u-t\u1eeb-b\u1ea3ng",level:2},{value:"<strong>\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n</strong>",id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n",level:3},{value:"<strong>2\ufe0f\u20e3 B\u1ed9 l\u1ecdc <code>WHERE</code> \u2013 L\u1ecdc d\u1eef li\u1ec7u theo \u0111i\u1ec1u ki\u1ec7n</strong>",id:"2\ufe0f\u20e3-b\u1ed9-l\u1ecdc-where--l\u1ecdc-d\u1eef-li\u1ec7u-theo-\u0111i\u1ec1u-ki\u1ec7n",level:2},{value:"<strong>\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n</strong>",id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n-1",level:3},{value:"<strong>3\ufe0f\u20e3 C\xe1c to\xe1n t\u1eed trong <code>WHERE</code></strong>",id:"3\ufe0f\u20e3-c\xe1c-to\xe1n-t\u1eed-trong-where",level:2},{value:"<strong>\ud83d\udd39 To\xe1n t\u1eed so s\xe1nh</strong>",id:"-to\xe1n-t\u1eed-so-s\xe1nh",level:3},{value:"<strong>\ud83d\udd39 To\xe1n t\u1eed <code>LIKE</code> \u2013 T\xecm ki\u1ebfm m\u1eabu chu\u1ed7i</strong>",id:"-to\xe1n-t\u1eed-like--t\xecm-ki\u1ebfm-m\u1eabu-chu\u1ed7i",level:3},{value:"<strong>\ud83d\udd39 To\xe1n t\u1eed <code>BETWEEN</code> \u2013 L\u1ecdc trong kho\u1ea3ng</strong>",id:"-to\xe1n-t\u1eed-between--l\u1ecdc-trong-kho\u1ea3ng",level:3},{value:"<strong>\ud83d\udd39 To\xe1n t\u1eed <code>IN</code> \u2013 L\u1ecdc nhi\u1ec1u gi\xe1 tr\u1ecb c\u1ee5 th\u1ec3</strong>",id:"-to\xe1n-t\u1eed-in--l\u1ecdc-nhi\u1ec1u-gi\xe1-tr\u1ecb-c\u1ee5-th\u1ec3",level:3},{value:"<strong>\ud83d\udd39 To\xe1n t\u1eed <code>AND</code> &amp; <code>OR</code> \u2013 K\u1ebft h\u1ee3p nhi\u1ec1u \u0111i\u1ec1u ki\u1ec7n</strong>",id:"-to\xe1n-t\u1eed-and--or--k\u1ebft-h\u1ee3p-nhi\u1ec1u-\u0111i\u1ec1u-ki\u1ec7n",level:3},{value:"<strong>4\ufe0f\u20e3 Th\u1ef1c h\xe0nh: L\u1ecdc d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng <code>Products</code></strong>",id:"4\ufe0f\u20e3-th\u1ef1c-h\xe0nh-l\u1ecdc-d\u1eef-li\u1ec7u-t\u1eeb-b\u1ea3ng-products",level:2}];function o(n){const e={a:"a",blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.R)(),...n.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(e.blockquote,{children:["\n",(0,c.jsx)(e.p,{children:"M\u1ee5c ti\xeau b\xe0i h\u1ecdc: T\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng SELECT v\xe0 WHERE trong SQL. H\u1ecdc c\xe1ch truy v\u1ea5n d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng, l\u1ecdc d\u1eef li\u1ec7u v\u1edbi \u0111i\u1ec1u ki\u1ec7n WHERE."}),"\n"]}),"\n",(0,c.jsx)(e.h2,{id:"1\ufe0f\u20e3-select--truy-v\u1ea5n-d\u1eef-li\u1ec7u-t\u1eeb-b\u1ea3ng",children:(0,c.jsxs)(e.strong,{children:["1\ufe0f\u20e3 ",(0,c.jsx)(e.code,{children:"SELECT"})," \u2013 Truy v\u1ea5n d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng"]})}),"\n",(0,c.jsxs)(e.p,{children:["L\u1ec7nh ",(0,c.jsx)(e.code,{children:"SELECT"})," gi\xfap truy v\u1ea5n d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng trong c\u01a1 s\u1edf d\u1eef li\u1ec7u."]}),"\n",(0,c.jsx)(e.h3,{id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n",children:(0,c.jsx)(e.strong,{children:"\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n"})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT column1, column2 \nFROM table_name;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsxs)(e.strong,{children:["V\xed d\u1ee5: L\u1ea5y danh s\xe1ch t\u1ea5t c\u1ea3 s\u1ea3n ph\u1ea9m t\u1eeb b\u1ea3ng ",(0,c.jsx)(e.code,{children:"Products"})]})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsxs)(e.strong,{children:["V\xed d\u1ee5: Ch\u1ec9 l\u1ea5y ",(0,c.jsx)(e.code,{children:"ProductID"}),", ",(0,c.jsx)(e.code,{children:"Name"})," v\xe0 ",(0,c.jsx)(e.code,{children:"Price"})]})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT \n    ProductID, \n    Name, \n    Price \nFROM Products;\n"})}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h2,{id:"2\ufe0f\u20e3-b\u1ed9-l\u1ecdc-where--l\u1ecdc-d\u1eef-li\u1ec7u-theo-\u0111i\u1ec1u-ki\u1ec7n",children:(0,c.jsxs)(e.strong,{children:["2\ufe0f\u20e3 B\u1ed9 l\u1ecdc ",(0,c.jsx)(e.code,{children:"WHERE"})," \u2013 L\u1ecdc d\u1eef li\u1ec7u theo \u0111i\u1ec1u ki\u1ec7n"]})}),"\n",(0,c.jsxs)(e.p,{children:["L\u1ec7nh ",(0,c.jsx)(e.code,{children:"WHERE"})," gi\xfap l\u1ecdc d\u1eef li\u1ec7u d\u1ef1a tr\xean \u0111i\u1ec1u ki\u1ec7n c\u1ee5 th\u1ec3."]}),"\n",(0,c.jsx)(e.h3,{id:"-c\xfa-ph\xe1p-c\u01a1-b\u1ea3n-1",children:(0,c.jsx)(e.strong,{children:"\ud83d\udd39 C\xfa ph\xe1p c\u01a1 b\u1ea3n"})}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT column1, column2 \nFROM table_name \nWHERE condition;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5: L\u1ea5y s\u1ea3n ph\u1ea9m c\xf3 gi\xe1 l\u1edbn h\u01a1n 100.000"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE Price > 100000;\n"})}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h2,{id:"3\ufe0f\u20e3-c\xe1c-to\xe1n-t\u1eed-trong-where",children:(0,c.jsxs)(e.strong,{children:["3\ufe0f\u20e3 C\xe1c to\xe1n t\u1eed trong ",(0,c.jsx)(e.code,{children:"WHERE"})]})}),"\n",(0,c.jsx)(e.h3,{id:"-to\xe1n-t\u1eed-so-s\xe1nh",children:(0,c.jsx)(e.strong,{children:"\ud83d\udd39 To\xe1n t\u1eed so s\xe1nh"})}),"\n",(0,c.jsxs)(e.table,{children:[(0,c.jsx)(e.thead,{children:(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.th,{children:"To\xe1n t\u1eed"}),(0,c.jsx)(e.th,{children:"\xdd ngh\u0129a"})]})}),(0,c.jsxs)(e.tbody,{children:[(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.code,{children:"="})}),(0,c.jsx)(e.td,{children:"B\u1eb1ng"})]}),(0,c.jsxs)(e.tr,{children:[(0,c.jsxs)(e.td,{children:[(0,c.jsx)(e.code,{children:"!="})," ho\u1eb7c ",(0,c.jsx)(e.code,{children:"<>"})]}),(0,c.jsx)(e.td,{children:"Kh\xe1c"})]}),(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.code,{children:">"})}),(0,c.jsx)(e.td,{children:"L\u1edbn h\u01a1n"})]}),(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.code,{children:"<"})}),(0,c.jsx)(e.td,{children:"Nh\u1ecf h\u01a1n"})]}),(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.code,{children:">="})}),(0,c.jsx)(e.td,{children:"L\u1edbn h\u01a1n ho\u1eb7c b\u1eb1ng"})]}),(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.code,{children:"<="})}),(0,c.jsx)(e.td,{children:"Nh\u1ecf h\u01a1n ho\u1eb7c b\u1eb1ng"})]})]})]}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5:"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * FROM Products WHERE StockQuantity <= 10; -- L\u1ea5y s\u1ea3n ph\u1ea9m c\xf3 s\u1ed1 l\u01b0\u1ee3ng <= 10\n"})}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h3,{id:"-to\xe1n-t\u1eed-like--t\xecm-ki\u1ebfm-m\u1eabu-chu\u1ed7i",children:(0,c.jsxs)(e.strong,{children:["\ud83d\udd39 To\xe1n t\u1eed ",(0,c.jsx)(e.code,{children:"LIKE"})," \u2013 T\xecm ki\u1ebfm m\u1eabu chu\u1ed7i"]})}),"\n",(0,c.jsxs)(e.table,{children:[(0,c.jsx)(e.thead,{children:(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.th,{children:"K\xfd t\u1ef1"}),(0,c.jsx)(e.th,{children:"\xdd ngh\u0129a"})]})}),(0,c.jsxs)(e.tbody,{children:[(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.code,{children:"%"})}),(0,c.jsxs)(e.td,{children:["\u0110\u1ea1i di\u1ec7n cho ",(0,c.jsx)(e.strong,{children:"b\u1ea5t k\u1ef3 chu\u1ed7i k\xfd t\u1ef1 n\xe0o"})]})]}),(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:(0,c.jsx)(e.code,{children:"_"})}),(0,c.jsxs)(e.td,{children:["\u0110\u1ea1i di\u1ec7n cho ",(0,c.jsx)(e.strong,{children:"m\u1ed9t k\xfd t\u1ef1 b\u1ea5t k\u1ef3"})]})]})]})]}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5:"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:'SELECT * FROM Products WHERE Name LIKE \'Samsung%\'; -- B\u1eaft \u0111\u1ea7u b\u1eb1ng "Samsung"\nSELECT * FROM Products WHERE Name LIKE \'%iPhone%\'; -- Ch\u1ee9a t\u1eeb "iPhone"\nSELECT * FROM Products WHERE Name LIKE \'MacBook_Pro\'; -- "MacBook Pro" ho\u1eb7c "MacBook-Pro"\n'})}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h3,{id:"-to\xe1n-t\u1eed-between--l\u1ecdc-trong-kho\u1ea3ng",children:(0,c.jsxs)(e.strong,{children:["\ud83d\udd39 To\xe1n t\u1eed ",(0,c.jsx)(e.code,{children:"BETWEEN"})," \u2013 L\u1ecdc trong kho\u1ea3ng"]})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5: L\u1ecdc s\u1ea3n ph\u1ea9m c\xf3 gi\xe1 t\u1eeb 100k \u0111\u1ebfn 500k"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE Price BETWEEN 100000 AND 500000;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5: L\u1ecdc s\u1ea3n ph\u1ea9m t\u1ea1o trong kho\u1ea3ng th\u1eddi gian c\u1ee5 th\u1ec3"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE CreatedAt BETWEEN '2024-01-01' AND '2024-02-23';\n"})}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h3,{id:"-to\xe1n-t\u1eed-in--l\u1ecdc-nhi\u1ec1u-gi\xe1-tr\u1ecb-c\u1ee5-th\u1ec3",children:(0,c.jsxs)(e.strong,{children:["\ud83d\udd39 To\xe1n t\u1eed ",(0,c.jsx)(e.code,{children:"IN"})," \u2013 L\u1ecdc nhi\u1ec1u gi\xe1 tr\u1ecb c\u1ee5 th\u1ec3"]})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5: L\u1ea5y s\u1ea3n ph\u1ea9m c\xf3 ID l\xe0 1, 3 ho\u1eb7c 5"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE ProductID IN (1, 3, 5);\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsxs)(e.strong,{children:["V\xed d\u1ee5: L\u1ecdc s\u1ea3n ph\u1ea9m thu\u1ed9c danh m\u1ee5c ",(0,c.jsx)(e.code,{children:"\u0110i\u1ec7n tho\u1ea1i"}),", ",(0,c.jsx)(e.code,{children:"Laptop"})]})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE Category IN ('\u0110i\u1ec7n tho\u1ea1i', 'Laptop');\n"})}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h3,{id:"-to\xe1n-t\u1eed-and--or--k\u1ebft-h\u1ee3p-nhi\u1ec1u-\u0111i\u1ec1u-ki\u1ec7n",children:(0,c.jsxs)(e.strong,{children:["\ud83d\udd39 To\xe1n t\u1eed ",(0,c.jsx)(e.code,{children:"AND"})," & ",(0,c.jsx)(e.code,{children:"OR"})," \u2013 K\u1ebft h\u1ee3p nhi\u1ec1u \u0111i\u1ec1u ki\u1ec7n"]})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5: L\u1ea5y s\u1ea3n ph\u1ea9m c\xf3 gi\xe1 t\u1eeb 100k \u0111\u1ebfn 500k v\xe0 c\xf2n h\xe0ng"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE \n    Price BETWEEN 100000 AND 500000 \n    AND StockQuantity > 0;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"V\xed d\u1ee5: L\u1ecdc s\u1ea3n ph\u1ea9m c\xf3 gi\xe1 d\u01b0\u1edbi 100k ho\u1eb7c h\u1ebft h\xe0ng"})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE \n    Price < 100000 \n    OR StockQuantity = 0;\n"})}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsx)(e.h2,{id:"4\ufe0f\u20e3-th\u1ef1c-h\xe0nh-l\u1ecdc-d\u1eef-li\u1ec7u-t\u1eeb-b\u1ea3ng-products",children:(0,c.jsxs)(e.strong,{children:["4\ufe0f\u20e3 Th\u1ef1c h\xe0nh: L\u1ecdc d\u1eef li\u1ec7u t\u1eeb b\u1ea3ng ",(0,c.jsx)(e.code,{children:"Products"})]})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 1:"})," L\u1ea5y t\u1ea5t c\u1ea3 s\u1ea3n ph\u1ea9m c\xf3 gi\xe1 tr\xean 500.000."]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE Price > 500000;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 2:"}),' L\u1ecdc s\u1ea3n ph\u1ea9m c\xf3 t\xean ch\u1ee9a t\u1eeb "iPhone".']}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE Name LIKE '%iPhone%';\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 3:"})," T\xecm s\u1ea3n ph\u1ea9m c\xf3 s\u1ed1 l\u01b0\u1ee3ng trong kho t\u1eeb 5 \u0111\u1ebfn 20."]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE StockQuantity BETWEEN 5 AND 20;\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 4:"}),' L\u1ecdc s\u1ea3n ph\u1ea9m thu\u1ed9c danh m\u1ee5c "Laptop" ho\u1eb7c "Tablet".']}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE Category IN ('Laptop', 'Tablet');\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udc49 ",(0,c.jsx)(e.strong,{children:"B\xe0i t\u1eadp 5:"}),' T\xecm s\u1ea3n ph\u1ea9m c\xf3 gi\xe1 tr\xean 1 tri\u1ec7u nh\u01b0ng kh\xf4ng ph\u1ea3i l\xe0 "Laptop".']}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM Products \nWHERE \n    Price > 1000000 \n    AND Category != 'Laptop';\n"})}),"\n",(0,c.jsx)(e.hr,{}),"\n",(0,c.jsxs)(e.p,{children:["\u2705 ",(0,c.jsx)(e.strong,{children:"T\xf3m t\u1eaft Ng\xe0y 3:"}),(0,c.jsx)(e.br,{}),"\n","\u2714\ufe0f S\u1eed d\u1ee5ng ",(0,c.jsx)(e.code,{children:"SELECT"})," \u0111\u1ec3 truy v\u1ea5n d\u1eef li\u1ec7u.",(0,c.jsx)(e.br,{}),"\n","\u2714\ufe0f S\u1eed d\u1ee5ng ",(0,c.jsx)(e.code,{children:"WHERE"})," \u0111\u1ec3 l\u1ecdc d\u1eef li\u1ec7u theo \u0111i\u1ec1u ki\u1ec7n.",(0,c.jsx)(e.br,{}),"\n","\u2714\ufe0f Th\u1ef1c h\xe0nh v\u1edbi c\xe1c to\xe1n t\u1eed ",(0,c.jsx)(e.code,{children:"=, !=, >, <, LIKE, BETWEEN, IN"}),"."]}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\ude80 ",(0,c.jsx)(e.strong,{children:"Ng\xe0y mai:"})," H\u1ecdc v\u1ec1 ",(0,c.jsx)(e.a,{href:"/docs/database/learn-sql-in-30-days/04-order-by-limit",children:"C\xe2u l\u1ec7nh ORDER BY & LIMIT \u0111\u1ec3 s\u1eafp x\u1ebfp v\xe0 gi\u1edbi h\u1ea1n k\u1ebft qu\u1ea3"}),"!"]}),"\n",(0,c.jsxs)(e.p,{children:["\ud83d\udccc ",(0,c.jsx)(e.strong,{children:"L\u1ed9 tr\xecnh:"})," ",(0,c.jsx)(e.a,{href:"/docs/database/learn-sql-in-30-days/30-day-sql-learning-roadmap",children:"H\u1ecdc SQL trong 30 ng\xe0y"})]})]})}function a(n={}){const{wrapper:e}={...(0,d.R)(),...n.components};return e?(0,c.jsx)(e,{...n,children:(0,c.jsx)(o,{...n})}):o(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>t,x:()=>i});var c=s(96540);const d={},r=c.createContext(d);function t(n){const e=c.useContext(r);return c.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:t(n.components),c.createElement(r.Provider,{value:e},n.children)}}}]);