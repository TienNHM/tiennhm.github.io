"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[9065],{43017:(n,s,i)=>{i.r(s),i.d(s,{assets:()=>h,contentTitle:()=>e,default:()=>o,frontMatter:()=>r,metadata:()=>l,toc:()=>a});var t=i(74848),c=i(28453);const r={title:"16. Transactions - ACID",slug:"16-transactions-acid",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 Transactions trong SQL, c\xe1ch s\u1eed d\u1ee5ng v\xe0 \u0111\u1ea3m b\u1ea3o t\xednh nh\u1ea5t qu\xe1n d\u1eef li\u1ec7u v\u1edbi ACID.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:16,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},e=void 0,l={id:"database/learn-sql-in-30-days/Transactions - ACID",title:"16. Transactions - ACID",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 Transactions trong SQL, c\xe1ch s\u1eed d\u1ee5ng v\xe0 \u0111\u1ea3m b\u1ea3o t\xednh nh\u1ea5t qu\xe1n d\u1eef li\u1ec7u v\u1edbi ACID.",source:"@site/docs/06-database/learn-sql-in-30-days/16. Transactions - ACID.md",sourceDirName:"06-database/learn-sql-in-30-days",slug:"/database/learn-sql-in-30-days/16-transactions-acid",permalink:"/docs/database/learn-sql-in-30-days/16-transactions-acid",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/06-database/learn-sql-in-30-days/16. Transactions - ACID.md",tags:[{inline:!0,label:"database",permalink:"/docs/tags/database"},{inline:!0,label:"sql",permalink:"/docs/tags/sql"},{inline:!0,label:"learn-sql",permalink:"/docs/tags/learn-sql"},{inline:!0,label:"roadmap",permalink:"/docs/tags/roadmap"},{inline:!0,label:"dbms",permalink:"/docs/tags/dbms"}],version:"current",lastUpdatedAt:1740555314e3,sidebarPosition:16,frontMatter:{title:"16. Transactions - ACID",slug:"16-transactions-acid",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 Transactions trong SQL, c\xe1ch s\u1eed d\u1ee5ng v\xe0 \u0111\u1ea3m b\u1ea3o t\xednh nh\u1ea5t qu\xe1n d\u1eef li\u1ec7u v\u1edbi ACID.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:16,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"15. Index",permalink:"/docs/database/learn-sql-in-30-days/15-index"},next:{title:"17. Stored Procedures & Functions",permalink:"/docs/database/learn-sql-in-30-days/17-stored-procedures-functions"}},h={},a=[{value:"<strong>1\ufe0f\u20e3 Transactions l\xe0 g\xec?</strong>",id:"1\ufe0f\u20e3-transactions-l\xe0-g\xec",level:2},{value:"<strong>2\ufe0f\u20e3 T\xednh ch\u1ea5t ACID c\u1ee7a Transactions</strong>",id:"2\ufe0f\u20e3-t\xednh-ch\u1ea5t-acid-c\u1ee7a-transactions",level:2},{value:"<strong>3\ufe0f\u20e3 C\xe1ch s\u1eed d\u1ee5ng Transactions trong SQL</strong>",id:"3\ufe0f\u20e3-c\xe1ch-s\u1eed-d\u1ee5ng-transactions-trong-sql",level:2},{value:"<strong>\ud83d\udd39 L\u1ec7nh c\u01a1 b\u1ea3n</strong>",id:"-l\u1ec7nh-c\u01a1-b\u1ea3n",level:3},{value:"<strong>\ud83d\udd39 X\u1eed l\xfd l\u1ed7i v\u1edbi ROLLBACK</strong>",id:"-x\u1eed-l\xfd-l\u1ed7i-v\u1edbi-rollback",level:3},{value:"<strong>4\ufe0f\u20e3 M\xf4 ph\u1ecfng giao d\u1ecbch ng\xe2n h\xe0ng</strong> \ud83c\udfe6",id:"4\ufe0f\u20e3-m\xf4-ph\u1ecfng-giao-d\u1ecbch-ng\xe2n-h\xe0ng-",level:2},{value:"<strong>\ud83d\udccc B\u1ea3ng <code>accounts</code></strong>",id:"-b\u1ea3ng-accounts",level:3},{value:"<strong>\ud83d\udd39 Th\xeam d\u1eef li\u1ec7u m\u1eabu</strong>",id:"-th\xeam-d\u1eef-li\u1ec7u-m\u1eabu",level:3},{value:"<strong>\ud83d\udd39 M\xf4 ph\u1ecfng chuy\u1ec3n 200 t\u1eeb Alice \u2192 Bob</strong>",id:"-m\xf4-ph\u1ecfng-chuy\u1ec3n-200-t\u1eeb-alice--bob",level:3},{value:"<strong>\ud83d\udd39 Ki\u1ec3m tra k\u1ebft qu\u1ea3</strong>",id:"-ki\u1ec3m-tra-k\u1ebft-qu\u1ea3",level:3},{value:"<strong>5\ufe0f\u20e3 Ki\u1ec3m so\xe1t m\u1ee9c \u0111\u1ed9 Isolation trong Transactions</strong>",id:"5\ufe0f\u20e3-ki\u1ec3m-so\xe1t-m\u1ee9c-\u0111\u1ed9-isolation-trong-transactions",level:2},{value:"<strong>6\ufe0f\u20e3 B\xe0i t\u1eadp th\u1ef1c h\xe0nh \ud83c\udfaf</strong>",id:"6\ufe0f\u20e3-b\xe0i-t\u1eadp-th\u1ef1c-h\xe0nh-",level:2},{value:"<strong>\u2705 B\xe0i 1: Chuy\u1ec3n ti\u1ec1n gi\u1eefa hai t\xe0i kho\u1ea3n</strong>",id:"-b\xe0i-1-chuy\u1ec3n-ti\u1ec1n-gi\u1eefa-hai-t\xe0i-kho\u1ea3n",level:3},{value:"<strong>\u2705 B\xe0i 2: M\xf4 ph\u1ecfng \u0111\u1eb7t h\xe0ng</strong>",id:"-b\xe0i-2-m\xf4-ph\u1ecfng-\u0111\u1eb7t-h\xe0ng",level:3},{value:"<strong>\u2705 B\xe0i 3: Ki\u1ec3m tra hi\u1ec7u su\u1ea5t Transaction</strong>",id:"-b\xe0i-3-ki\u1ec3m-tra-hi\u1ec7u-su\u1ea5t-transaction",level:3},{value:"<strong>\ud83c\udfaf T\xf3m t\u1eaft b\xe0i h\u1ecdc Ng\xe0y 16</strong>",id:"-t\xf3m-t\u1eaft-b\xe0i-h\u1ecdc-ng\xe0y-16",level:2}];function d(n){const s={a:"a",blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,c.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsx)(s.p,{children:"M\u1ee5c ti\xeau b\xe0i h\u1ecdc: Gi\u1edbi thi\u1ec7u v\u1ec1 Transactions trong SQL, c\xe1ch s\u1eed d\u1ee5ng v\xe0 \u0111\u1ea3m b\u1ea3o t\xednh nh\u1ea5t qu\xe1n d\u1eef li\u1ec7u v\u1edbi ACID."}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"1\ufe0f\u20e3-transactions-l\xe0-g\xec",children:(0,t.jsx)(s.strong,{children:"1\ufe0f\u20e3 Transactions l\xe0 g\xec?"})}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Transaction (Giao d\u1ecbch)"})," trong SQL l\xe0 m\u1ed9t t\u1eadp h\u1ee3p c\xe1c l\u1ec7nh SQL \u0111\u01b0\u1ee3c th\u1ef1c hi\u1ec7n nh\u01b0 ",(0,t.jsx)(s.strong,{children:"m\u1ed9t \u0111\u01a1n v\u1ecb c\xf4ng vi\u1ec7c"}),"."]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"N\u1ebfu t\u1ea5t c\u1ea3 l\u1ec7nh th\xe0nh c\xf4ng"}),", thay \u0111\u1ed5i s\u1ebd \u0111\u01b0\u1ee3c l\u01b0u (",(0,t.jsx)(s.strong,{children:"COMMIT"}),")."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"N\u1ebfu c\xf3 l\u1ed7i x\u1ea3y ra"}),", t\u1ea5t c\u1ea3 thay \u0111\u1ed5i s\u1ebd b\u1ecb h\u1ee7y (",(0,t.jsx)(s.strong,{children:"ROLLBACK"}),")."]}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udca1 ",(0,t.jsx)(s.strong,{children:"V\xed d\u1ee5 th\u1ef1c t\u1ebf:"})]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Chuy\u1ec3n ti\u1ec1n gi\u1eefa 2 t\xe0i kho\u1ea3n (",(0,t.jsx)(s.strong,{children:"r\xfat ti\u1ec1n t\u1eeb A, c\u1ed9ng ti\u1ec1n v\xe0o B"}),")."]}),"\n",(0,t.jsxs)(s.li,{children:["\u0110\u1eb7t v\xe9 m\xe1y bay (",(0,t.jsx)(s.strong,{children:"tr\u1eeb ch\u1ed7 tr\u1ed1ng, t\u1ea1o booking, c\u1eadp nh\u1eadt l\u1ecbch tr\xecnh"}),")."]}),"\n",(0,t.jsxs)(s.li,{children:["\u0110\u1eb7t h\xe0ng (",(0,t.jsx)(s.strong,{children:"tr\u1eeb kho, t\u1ea1o \u0111\u01a1n, ghi l\u1ecbch s\u1eed giao d\u1ecbch"}),")."]}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"2\ufe0f\u20e3-t\xednh-ch\u1ea5t-acid-c\u1ee7a-transactions",children:(0,t.jsx)(s.strong,{children:"2\ufe0f\u20e3 T\xednh ch\u1ea5t ACID c\u1ee7a Transactions"})}),"\n",(0,t.jsxs)(s.p,{children:["Transactions ph\u1ea3i tu\xe2n th\u1ee7 ",(0,t.jsx)(s.strong,{children:"ACID"})," \u0111\u1ec3 \u0111\u1ea3m b\u1ea3o t\xednh to\xe0n v\u1eb9n d\u1eef li\u1ec7u."]}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:(0,t.jsx)(s.strong,{children:"T\xednh ch\u1ea5t"})}),(0,t.jsx)(s.th,{children:(0,t.jsx)(s.strong,{children:"\xdd ngh\u0129a"})})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.strong,{children:"Atomicity"})," (T\xednh nguy\xean t\u1eed)"]}),(0,t.jsxs)(s.td,{children:["To\xe0n b\u1ed9 transaction ",(0,t.jsx)(s.strong,{children:"th\xe0nh c\xf4ng ho\u1eb7c th\u1ea5t b\u1ea1i ho\xe0n to\xe0n"}),"."]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.strong,{children:"Consistency"})," (T\xednh nh\u1ea5t qu\xe1n)"]}),(0,t.jsxs)(s.td,{children:["Database ",(0,t.jsx)(s.strong,{children:"kh\xf4ng r\u01a1i v\xe0o tr\u1ea1ng th\xe1i l\u1ed7i"})," d\xf9 c\xf3 l\u1ed7i x\u1ea3y ra."]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.strong,{children:"Isolation"})," (T\xednh \u0111\u1ed9c l\u1eadp)"]}),(0,t.jsxs)(s.td,{children:["Transactions ch\u1ea1y song song ",(0,t.jsx)(s.strong,{children:"kh\xf4ng l\xe0m \u1ea3nh h\u01b0\u1edfng l\u1eabn nhau"}),"."]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsxs)(s.td,{children:[(0,t.jsx)(s.strong,{children:"Durability"})," (T\xednh b\u1ec1n v\u1eefng)"]}),(0,t.jsxs)(s.td,{children:["Sau khi ",(0,t.jsx)(s.code,{children:"COMMIT"}),", d\u1eef li\u1ec7u s\u1ebd ",(0,t.jsx)(s.strong,{children:"\u0111\u01b0\u1ee3c l\u01b0u v\u0129nh vi\u1ec5n"}),"."]})]})]})]}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udca1 ",(0,t.jsx)(s.strong,{children:"V\xed d\u1ee5 minh h\u1ecda:"})]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["N\u1ebfu b\u1ea1n r\xfat 500K t\u1eeb ATM nh\u01b0ng m\xe1y b\u1ecb l\u1ed7i ",(0,t.jsx)(s.strong,{children:"sau khi tr\u1eeb ti\u1ec1n t\xe0i kho\u1ea3n"}),", h\u1ec7 th\u1ed1ng ph\u1ea3i ",(0,t.jsx)(s.code,{children:"ROLLBACK"})," \u0111\u1ec3 b\u1ea1n kh\xf4ng m\u1ea5t ti\u1ec1n."]}),"\n"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"3\ufe0f\u20e3-c\xe1ch-s\u1eed-d\u1ee5ng-transactions-trong-sql",children:(0,t.jsx)(s.strong,{children:"3\ufe0f\u20e3 C\xe1ch s\u1eed d\u1ee5ng Transactions trong SQL"})}),"\n",(0,t.jsx)(s.h3,{id:"-l\u1ec7nh-c\u01a1-b\u1ea3n",children:(0,t.jsx)(s.strong,{children:"\ud83d\udd39 L\u1ec7nh c\u01a1 b\u1ea3n"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"BEGIN;  -- B\u1eaft \u0111\u1ea7u transaction\nUPDATE accounts SET balance = balance - 500 WHERE id = 1; -- Tr\u1eeb ti\u1ec1n t\xe0i kho\u1ea3n A\nUPDATE accounts SET balance = balance + 500 WHERE id = 2; -- C\u1ed9ng ti\u1ec1n t\xe0i kho\u1ea3n B\nCOMMIT; -- X\xe1c nh\u1eadn giao d\u1ecbch\n"})}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udc49 N\u1ebfu t\u1ea5t c\u1ea3 l\u1ec7nh th\xe0nh c\xf4ng, ",(0,t.jsx)(s.code,{children:"COMMIT"})," s\u1ebd l\u01b0u thay \u0111\u1ed5i v\u0129nh vi\u1ec5n."]}),"\n",(0,t.jsx)(s.h3,{id:"-x\u1eed-l\xfd-l\u1ed7i-v\u1edbi-rollback",children:(0,t.jsx)(s.strong,{children:"\ud83d\udd39 X\u1eed l\xfd l\u1ed7i v\u1edbi ROLLBACK"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"BEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\n\n-- Gi\u1ea3 s\u1eed c\xf3 l\u1ed7i x\u1ea3y ra khi c\u1ed9ng ti\u1ec1n v\xe0o t\xe0i kho\u1ea3n B\nUPDATE accounts SET balance = balance + 500 WHERE id = 99999; -- ID kh\xf4ng t\u1ed3n t\u1ea1i!\n\nROLLBACK; -- H\u1ee7y to\xe0n b\u1ed9 giao d\u1ecbch n\u1ebfu c\xf3 l\u1ed7i\n"})}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udc49 N\u1ebfu c\xf3 l\u1ed7i, ",(0,t.jsx)(s.code,{children:"ROLLBACK"})," s\u1ebd ",(0,t.jsx)(s.strong,{children:"kh\xf4i ph\u1ee5c d\u1eef li\u1ec7u v\u1ec1 tr\u1ea1ng th\xe1i ban \u0111\u1ea7u"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsxs)(s.h2,{id:"4\ufe0f\u20e3-m\xf4-ph\u1ecfng-giao-d\u1ecbch-ng\xe2n-h\xe0ng-",children:[(0,t.jsx)(s.strong,{children:"4\ufe0f\u20e3 M\xf4 ph\u1ecfng giao d\u1ecbch ng\xe2n h\xe0ng"})," \ud83c\udfe6"]}),"\n",(0,t.jsx)(s.h3,{id:"-b\u1ea3ng-accounts",children:(0,t.jsxs)(s.strong,{children:["\ud83d\udccc B\u1ea3ng ",(0,t.jsx)(s.code,{children:"accounts"})]})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"CREATE TABLE accounts (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100),\n    balance DECIMAL(10,2) NOT NULL\n);\n"})}),"\n",(0,t.jsx)(s.h3,{id:"-th\xeam-d\u1eef-li\u1ec7u-m\u1eabu",children:(0,t.jsx)(s.strong,{children:"\ud83d\udd39 Th\xeam d\u1eef li\u1ec7u m\u1eabu"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"INSERT INTO accounts (name, balance) VALUES ('Alice', 1000), ('Bob', 500);\n"})}),"\n",(0,t.jsx)(s.h3,{id:"-m\xf4-ph\u1ecfng-chuy\u1ec3n-200-t\u1eeb-alice--bob",children:(0,t.jsx)(s.strong,{children:"\ud83d\udd39 M\xf4 ph\u1ecfng chuy\u1ec3n 200 t\u1eeb Alice \u2192 Bob"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"BEGIN;\n\nUPDATE accounts SET balance = balance - 200 WHERE name = 'Alice';\n\nUPDATE accounts SET balance = balance + 200 WHERE name = 'Bob';\n\nCOMMIT;\n"})}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udc49 N\u1ebfu m\u1ecdi th\u1ee9 ",(0,t.jsx)(s.strong,{children:"\u0111\xfang"}),", ",(0,t.jsx)(s.code,{children:"COMMIT"})," s\u1ebd l\u01b0u thay \u0111\u1ed5i.",(0,t.jsx)(s.br,{}),"\n","\ud83d\udc49 N\u1ebfu c\xf3 l\u1ed7i (v\xed d\u1ee5: t\xe0i kho\u1ea3n kh\xf4ng t\u1ed3n t\u1ea1i), ",(0,t.jsxs)(s.strong,{children:["ch\xfang ta c\u1ea7n ",(0,t.jsx)(s.code,{children:"ROLLBACK"})]}),"."]}),"\n",(0,t.jsx)(s.h3,{id:"-ki\u1ec3m-tra-k\u1ebft-qu\u1ea3",children:(0,t.jsx)(s.strong,{children:"\ud83d\udd39 Ki\u1ec3m tra k\u1ebft qu\u1ea3"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"SELECT * FROM accounts;\n"})}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"5\ufe0f\u20e3-ki\u1ec3m-so\xe1t-m\u1ee9c-\u0111\u1ed9-isolation-trong-transactions",children:(0,t.jsx)(s.strong,{children:"5\ufe0f\u20e3 Ki\u1ec3m so\xe1t m\u1ee9c \u0111\u1ed9 Isolation trong Transactions"})}),"\n",(0,t.jsxs)(s.p,{children:["SQL h\u1ed7 tr\u1ee3 nhi\u1ec1u m\u1ee9c \u0111\u1ed9 ",(0,t.jsx)(s.strong,{children:"Isolation"})," \u0111\u1ec3 ki\u1ec3m so\xe1t \u0111\u1ed9 an to\xe0n c\u1ee7a Transactions."]}),"\n",(0,t.jsxs)(s.table,{children:[(0,t.jsx)(s.thead,{children:(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.th,{children:(0,t.jsx)(s.strong,{children:"M\u1ee9c Isolation"})}),(0,t.jsx)(s.th,{children:(0,t.jsx)(s.strong,{children:"Nguy c\u01a1 l\u1ed7i"})})]})}),(0,t.jsxs)(s.tbody,{children:[(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.strong,{children:"READ UNCOMMITTED"})}),(0,t.jsxs)(s.td,{children:["C\xf3 th\u1ec3 \u0111\u1ecdc d\u1eef li\u1ec7u ch\u01b0a ",(0,t.jsx)(s.code,{children:"COMMIT"})," (kh\xf4ng an to\xe0n)."]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.strong,{children:"READ COMMITTED"})}),(0,t.jsxs)(s.td,{children:["Ch\u1ec9 \u0111\u1ecdc d\u1eef li\u1ec7u \u0111\xe3 ",(0,t.jsx)(s.code,{children:"COMMIT"})," (m\u1eb7c \u0111\u1ecbnh trong nhi\u1ec1u h\u1ec7 qu\u1ea3n tr\u1ecb CSDL)."]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.strong,{children:"REPEATABLE READ"})}),(0,t.jsxs)(s.td,{children:["C\xf9ng m\u1ed9t ",(0,t.jsx)(s.code,{children:"SELECT"})," trong transaction ",(0,t.jsx)(s.strong,{children:"lu\xf4n tr\u1ea3 v\u1ec1 c\xf9ng m\u1ed9t k\u1ebft qu\u1ea3"}),"."]})]}),(0,t.jsxs)(s.tr,{children:[(0,t.jsx)(s.td,{children:(0,t.jsx)(s.strong,{children:"SERIALIZABLE"})}),(0,t.jsx)(s.td,{children:"C\u1ef1c k\u1ef3 ch\u1eb7t ch\u1ebd, ng\u0103n m\u1ecdi transaction kh\xe1c can thi\u1ec7p."})]})]})]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"V\xed d\u1ee5:"})}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\nBEGIN;\n-- C\xe1c c\xe2u l\u1ec7nh SQL \u1edf m\u1ee9c Isolation cao nh\u1ea5t\nCOMMIT;\n"})}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"6\ufe0f\u20e3-b\xe0i-t\u1eadp-th\u1ef1c-h\xe0nh-",children:(0,t.jsx)(s.strong,{children:"6\ufe0f\u20e3 B\xe0i t\u1eadp th\u1ef1c h\xe0nh \ud83c\udfaf"})}),"\n",(0,t.jsx)(s.h3,{id:"-b\xe0i-1-chuy\u1ec3n-ti\u1ec1n-gi\u1eefa-hai-t\xe0i-kho\u1ea3n",children:(0,t.jsx)(s.strong,{children:"\u2705 B\xe0i 1: Chuy\u1ec3n ti\u1ec1n gi\u1eefa hai t\xe0i kho\u1ea3n"})}),"\n",(0,t.jsxs)(s.p,{children:["Vi\u1ebft transaction chuy\u1ec3n 300 t\u1eeb ",(0,t.jsx)(s.strong,{children:"Bob \u2192 Alice"}),". N\u1ebfu t\xe0i kho\u1ea3n kh\xf4ng \u0111\u1ee7 ti\u1ec1n, ",(0,t.jsx)(s.code,{children:"ROLLBACK"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udca1 ",(0,t.jsx)(s.strong,{children:"G\u1ee3i \xfd l\u1eddi gi\u1ea3i:"})]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Ki\u1ec3m tra s\u1ed1 d\u01b0 tr\u01b0\u1edbc khi tr\u1eeb ti\u1ec1n."}),"\n",(0,t.jsxs)(s.li,{children:["N\u1ebfu s\u1ed1 d\u01b0 ",(0,t.jsx)(s.strong,{children:"kh\xf4ng \u0111\u1ee7"}),", g\u1ecdi ",(0,t.jsx)(s.code,{children:"ROLLBACK"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:["N\u1ebfu h\u1ee3p l\u1ec7, c\u1eadp nh\u1eadt s\u1ed1 d\u01b0 v\xe0 ",(0,t.jsx)(s.code,{children:"COMMIT"}),"."]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"BEGIN;\n-- Ki\u1ec3m tra s\u1ed1 d\u01b0\nSELECT balance INTO @bob_balance FROM accounts WHERE name = 'Bob';\n\nIF @bob_balance < 300 THEN\n    ROLLBACK;\nELSE\n    UPDATE accounts SET balance = balance - 300 WHERE name = 'Bob';\n    UPDATE accounts SET balance = balance + 300 WHERE name = 'Alice';\n    COMMIT;\nEND IF;\n"})}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h3,{id:"-b\xe0i-2-m\xf4-ph\u1ecfng-\u0111\u1eb7t-h\xe0ng",children:(0,t.jsx)(s.strong,{children:"\u2705 B\xe0i 2: M\xf4 ph\u1ecfng \u0111\u1eb7t h\xe0ng"})}),"\n",(0,t.jsxs)(s.p,{children:["Gi\u1ea3 s\u1eed ch\xfang ta c\xf3 b\u1ea3ng ",(0,t.jsx)(s.code,{children:"products (id, name, stock)"})," v\xe0 ",(0,t.jsx)(s.code,{children:"orders (id, product_id, quantity)"}),".",(0,t.jsx)(s.br,{}),"\n","Vi\u1ebft transaction \u0111\u1ec3:"]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Tr\u1eeb ",(0,t.jsx)(s.code,{children:"stock"})," c\u1ee7a s\u1ea3n ph\u1ea9m."]}),"\n",(0,t.jsxs)(s.li,{children:["T\u1ea1o b\u1ea3n ghi trong b\u1ea3ng ",(0,t.jsx)(s.code,{children:"orders"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:["N\u1ebfu c\xf3 l\u1ed7i, ",(0,t.jsx)(s.code,{children:"ROLLBACK"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udca1 ",(0,t.jsx)(s.strong,{children:"G\u1ee3i \xfd l\u1eddi gi\u1ea3i:"})]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"BEGIN;\n\n-- Ki\u1ec3m tra s\u1ea3n ph\u1ea9m c\xf2n h\xe0ng kh\xf4ng\nSELECT stock INTO @stock FROM products WHERE id = 1;\n\nIF @stock < 1 THEN\n    ROLLBACK;\nELSE\n    -- Tr\u1eeb stock\n    UPDATE products SET stock = stock - 1 WHERE id = 1;\n\n    -- T\u1ea1o \u0111\u01a1n h\xe0ng\n    INSERT INTO orders (product_id, quantity) VALUES (1, 1);\n\n    COMMIT;\nEND IF;\n"})}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h3,{id:"-b\xe0i-3-ki\u1ec3m-tra-hi\u1ec7u-su\u1ea5t-transaction",children:(0,t.jsx)(s.strong,{children:"\u2705 B\xe0i 3: Ki\u1ec3m tra hi\u1ec7u su\u1ea5t Transaction"})}),"\n",(0,t.jsxs)(s.p,{children:["D\xf9ng ",(0,t.jsx)(s.code,{children:"EXPLAIN ANALYZE"})," \u0111\u1ec3 ki\u1ec3m tra hi\u1ec7u su\u1ea5t truy v\u1ea5n khi d\xf9ng transaction."]}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udca1 ",(0,t.jsx)(s.strong,{children:"G\u1ee3i \xfd l\u1eddi gi\u1ea3i:"})]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-sql",children:"EXPLAIN ANALYZE \nBEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;\n"})}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udc49 K\u1ebft qu\u1ea3 gi\xfap x\xe1c \u0111\u1ecbnh c\xf3 c\u1ea7n th\xeam ",(0,t.jsx)(s.strong,{children:"INDEX"})," \u0111\u1ec3 t\u1ed1i \u01b0u kh\xf4ng."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h2,{id:"-t\xf3m-t\u1eaft-b\xe0i-h\u1ecdc-ng\xe0y-16",children:(0,t.jsx)(s.strong,{children:"\ud83c\udfaf T\xf3m t\u1eaft b\xe0i h\u1ecdc Ng\xe0y 16"})}),"\n",(0,t.jsxs)(s.p,{children:["\u2705 ",(0,t.jsx)(s.strong,{children:"Transactions"})," gi\xfap \u0111\u1ea3m b\u1ea3o t\u1ea5t c\u1ea3 c\xe1c l\u1ec7nh ",(0,t.jsx)(s.strong,{children:"th\xe0nh c\xf4ng ho\u1eb7c b\u1ecb h\u1ee7y to\xe0n b\u1ed9"}),".",(0,t.jsx)(s.br,{}),"\n","\u2705 ",(0,t.jsx)(s.strong,{children:"ACID"})," \u0111\u1ea3m b\u1ea3o d\u1eef li\u1ec7u kh\xf4ng b\u1ecb l\u1ed7i khi c\xf3 nhi\u1ec1u giao d\u1ecbch \u0111\u1ed3ng th\u1eddi.",(0,t.jsx)(s.br,{}),"\n","\u2705 D\xf9ng ",(0,t.jsx)(s.code,{children:"COMMIT"})," \u0111\u1ec3 l\u01b0u, ",(0,t.jsx)(s.code,{children:"ROLLBACK"})," \u0111\u1ec3 h\u1ee7y n\u1ebfu c\xf3 l\u1ed7i.",(0,t.jsx)(s.br,{}),"\n","\u2705 ",(0,t.jsx)(s.strong,{children:"Th\u1ef1c h\xe0nh:"})," Chuy\u1ec3n ti\u1ec1n, \u0111\u1eb7t h\xe0ng, ki\u1ec3m so\xe1t m\u1ee9c \u0111\u1ed9 Isolation."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\ude80 ",(0,t.jsx)(s.strong,{children:"Ng\xe0y mai:"})," ",(0,t.jsx)(s.a,{href:"/docs/database/learn-sql-in-30-days/17-stored-procedures-functions",children:"Stored Procedures & Functions"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:["\ud83d\udccc ",(0,t.jsx)(s.strong,{children:"L\u1ed9 tr\xecnh:"})," ",(0,t.jsx)(s.a,{href:"/docs/database/learn-sql-in-30-days/30-day-sql-learning-roadmap",children:"H\u1ecdc SQL trong 30 ng\xe0y"}),"."]})]})}function o(n={}){const{wrapper:s}={...(0,c.R)(),...n.components};return s?(0,t.jsx)(s,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}},28453:(n,s,i)=>{i.d(s,{R:()=>e,x:()=>l});var t=i(96540);const c={},r=t.createContext(c);function e(n){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof n?n(s):{...s,...n}}),[s,n])}function l(n){let s;return s=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:e(n.components),t.createElement(r.Provider,{value:s},n.children)}}}]);