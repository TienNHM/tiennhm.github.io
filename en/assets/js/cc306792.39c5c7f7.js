"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[2208],{92158:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>d,contentTitle:()=>c,default:()=>a,frontMatter:()=>t,metadata:()=>h,toc:()=>l});var i=s(74848),r=s(28453);const t={title:"29. Recursive Queries & Window Functions",slug:"29-recursive-queries-window-functions",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 Recursive Queries v\xe0 Window Functions trong SQL, c\xe1ch vi\u1ebft truy v\u1ea5n \u0111\u1ec7 quy, \u1ee9ng d\u1ee5ng th\u1ef1c t\u1ebf, c\xe1ch s\u1eed d\u1ee5ng Window Functions \u0111\u1ec3 ph\xe2n t\xedch d\u1eef li\u1ec7u, x\u1ebfp h\u1ea1ng, l\u1ecdc d\u1eef li\u1ec7u theo th\u1eddi gian.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:29,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},c="\ud83d\udccc Ng\xe0y 29: Recursive Queries & Window Functions",h={id:"database/learn-sql-in-30-days/Recursive Queries - Window Functions",title:"29. Recursive Queries & Window Functions",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 Recursive Queries v\xe0 Window Functions trong SQL, c\xe1ch vi\u1ebft truy v\u1ea5n \u0111\u1ec7 quy, \u1ee9ng d\u1ee5ng th\u1ef1c t\u1ebf, c\xe1ch s\u1eed d\u1ee5ng Window Functions \u0111\u1ec3 ph\xe2n t\xedch d\u1eef li\u1ec7u, x\u1ebfp h\u1ea1ng, l\u1ecdc d\u1eef li\u1ec7u theo th\u1eddi gian.",source:"@site/docs/06-database/learn-sql-in-30-days/29. Recursive Queries - Window Functions.md",sourceDirName:"06-database/learn-sql-in-30-days",slug:"/database/learn-sql-in-30-days/29-recursive-queries-window-functions",permalink:"/en/docs/database/learn-sql-in-30-days/29-recursive-queries-window-functions",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/06-database/learn-sql-in-30-days/29. Recursive Queries - Window Functions.md",tags:[{inline:!0,label:"database",permalink:"/en/docs/tags/database"},{inline:!0,label:"sql",permalink:"/en/docs/tags/sql"},{inline:!0,label:"learn-sql",permalink:"/en/docs/tags/learn-sql"},{inline:!0,label:"roadmap",permalink:"/en/docs/tags/roadmap"},{inline:!0,label:"dbms",permalink:"/en/docs/tags/dbms"}],version:"current",lastUpdatedAt:1741855241e3,sidebarPosition:29,frontMatter:{title:"29. Recursive Queries & Window Functions",slug:"29-recursive-queries-window-functions",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 Recursive Queries v\xe0 Window Functions trong SQL, c\xe1ch vi\u1ebft truy v\u1ea5n \u0111\u1ec7 quy, \u1ee9ng d\u1ee5ng th\u1ef1c t\u1ebf, c\xe1ch s\u1eed d\u1ee5ng Window Functions \u0111\u1ec3 ph\xe2n t\xedch d\u1eef li\u1ec7u, x\u1ebfp h\u1ea1ng, l\u1ecdc d\u1eef li\u1ec7u theo th\u1eddi gian.",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:29,tags:["database","sql","learn-sql","roadmap","dbms"],keywords:["database","sql","learn-sql","roadmap","dbms"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"28. SQL query optimization",permalink:"/en/docs/database/learn-sql-in-30-days/28-sql-query-optimization"},next:{title:"30. Database security",permalink:"/en/docs/database/learn-sql-in-30-days/30-database-security"}},d={},l=[{value:"<strong>1\ufe0f\u20e3 Gi\u1edbi Thi\u1ec7u</strong>",id:"1\ufe0f\u20e3-gi\u1edbi-thi\u1ec7u",level:2},{value:"<strong>2\ufe0f\u20e3 Recursive Queries (<code>WITH RECURSIVE</code>)</strong>",id:"2\ufe0f\u20e3-recursive-queries-with-recursive",level:2},{value:"\u2705 <strong>2.1. Recursive Queries l\xe0 g\xec?</strong>",id:"-21-recursive-queries-l\xe0-g\xec",level:3},{value:"\u2705 <strong>2.2. C\xe1ch Vi\u1ebft Recursive Queries</strong>",id:"-22-c\xe1ch-vi\u1ebft-recursive-queries",level:3},{value:"\u2705 <strong>2.3. B\xe0i To\xe1n \u0110\u01b0\u1eddng \u0110i Ng\u1eafn Nh\u1ea5t (Shortest Path Problem)</strong>",id:"-23-b\xe0i-to\xe1n-\u0111\u01b0\u1eddng-\u0111i-ng\u1eafn-nh\u1ea5t-shortest-path-problem",level:3},{value:"<strong>3\ufe0f\u20e3 Window Functions (<code>RANK()</code>, <code>DENSE_RANK()</code>, <code>ROW_NUMBER()</code>)</strong>",id:"3\ufe0f\u20e3-window-functions-rank-dense_rank-row_number",level:2},{value:"\u2705 <strong>3.1. Window Functions L\xe0 G\xec?</strong>",id:"-31-window-functions-l\xe0-g\xec",level:3},{value:"\u2705 <strong>3.2. Ph\xe2n Bi\u1ec7t <code>RANK()</code>, <code>DENSE_RANK()</code>, <code>ROW_NUMBER()</code></strong>",id:"-32-ph\xe2n-bi\u1ec7t-rank-dense_rank-row_number",level:3},{value:"\u2705 <strong>3.3. \u1ee8ng D\u1ee5ng <code>LEAD()</code>, <code>LAG()</code> \u0110\u1ec3 L\u1ea5y Gi\xe1 Tr\u1ecb Tr\u01b0\u1edbc/Sau</strong>",id:"-33-\u1ee9ng-d\u1ee5ng-lead-lag-\u0111\u1ec3-l\u1ea5y-gi\xe1-tr\u1ecb-tr\u01b0\u1edbcsau",level:3},{value:"<strong>4\ufe0f\u20e3 B\xe0i T\u1eadp Th\u1ef1c H\xe0nh &amp; G\u1ee3i \xdd \u0110\xe1p \xc1n</strong>",id:"4\ufe0f\u20e3-b\xe0i-t\u1eadp-th\u1ef1c-h\xe0nh--g\u1ee3i-\xfd-\u0111\xe1p-\xe1n",level:2},{value:"\ud83d\udd39 <strong>B\xe0i 1: Truy v\u1ea5n \u0111\u1ec7 quy t\xecm c\u1ea5p b\u1eadc nh\xe2n vi\xean</strong>",id:"-b\xe0i-1-truy-v\u1ea5n-\u0111\u1ec7-quy-t\xecm-c\u1ea5p-b\u1eadc-nh\xe2n-vi\xean",level:3},{value:"\ud83d\udd39 <strong>B\xe0i 2: X\u1ebfp h\u1ea1ng doanh s\u1ed1 nh\xe2n vi\xean theo b\u1ed9 ph\u1eadn</strong>",id:"-b\xe0i-2-x\u1ebfp-h\u1ea1ng-doanh-s\u1ed1-nh\xe2n-vi\xean-theo-b\u1ed9-ph\u1eadn",level:3},{value:"\ud83d\udccc <strong>T\xf3m t\u1eaft b\xe0i h\u1ecdc</strong>",id:"-t\xf3m-t\u1eaft-b\xe0i-h\u1ecdc",level:4}];function o(n){const e={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(e.h1,{id:"-ng\xe0y-29-recursive-queries--window-functions",children:["\ud83d\udccc ",(0,i.jsx)(e.strong,{children:"Ng\xe0y 29: Recursive Queries & Window Functions"})]}),"\n",(0,i.jsx)(e.h2,{id:"1\ufe0f\u20e3-gi\u1edbi-thi\u1ec7u",children:(0,i.jsx)(e.strong,{children:"1\ufe0f\u20e3 Gi\u1edbi Thi\u1ec7u"})}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"Recursive Queries"})," (",(0,i.jsx)(e.code,{children:"WITH RECURSIVE"}),") gi\xfap x\u1eed l\xfd d\u1eef li\u1ec7u \u0111\u1ec7 quy, th\u01b0\u1eddng d\xf9ng \u0111\u1ec3 ",(0,i.jsx)(e.strong,{children:"x\u1eed l\xfd c\xe2y th\u01b0 m\u1ee5c, c\u1ea5u tr\xfac t\u1ed5 ch\u1ee9c, chu\u1ed7i truy xu\u1ea5t d\u1eef li\u1ec7u"}),".",(0,i.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"Window Functions"})," (",(0,i.jsx)(e.code,{children:"RANK()"}),", ",(0,i.jsx)(e.code,{children:"DENSE_RANK()"}),", ",(0,i.jsx)(e.code,{children:"ROW_NUMBER()"}),") h\u1ed7 tr\u1ee3 ph\xe2n t\xedch d\u1eef li\u1ec7u ",(0,i.jsx)(e.strong,{children:"m\xe0 kh\xf4ng l\xe0m thay \u0111\u1ed5i s\u1ed1 l\u01b0\u1ee3ng d\xf2ng"}),", th\u01b0\u1eddng d\xf9ng \u0111\u1ec3 ",(0,i.jsx)(e.strong,{children:"t\u1ea1o x\u1ebfp h\u1ea1ng, nh\xf3m theo th\u1eddi gian, t\xecm gi\xe1 tr\u1ecb tr\u01b0\u1edbc/sau"}),"."]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,i.jsx)(e.strong,{children:"M\u1ee5c ti\xeau:"}),(0,i.jsx)(e.br,{}),"\n","\u2714 Hi\u1ec3u c\xe1ch ",(0,i.jsx)(e.strong,{children:"vi\u1ebft truy v\u1ea5n \u0111\u1ec7 quy"})," trong SQL.",(0,i.jsx)(e.br,{}),"\n","\u2714 Bi\u1ebft c\xe1ch ",(0,i.jsx)(e.strong,{children:"d\xf9ng Window Functions"})," \u0111\u1ec3 l\xe0m b\xe1o c\xe1o, ph\xe2n t\xedch d\u1eef li\u1ec7u.",(0,i.jsx)(e.br,{}),"\n","\u2714 \u1ee8ng d\u1ee5ng v\xe0o ",(0,i.jsx)(e.strong,{children:"th\u1ef1c t\u1ebf v\u1edbi b\xe1o c\xe1o doanh s\u1ed1, ph\xe2n t\xedch ng\u01b0\u1eddi d\xf9ng"}),"."]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsx)(e.h2,{id:"2\ufe0f\u20e3-recursive-queries-with-recursive",children:(0,i.jsxs)(e.strong,{children:["2\ufe0f\u20e3 Recursive Queries (",(0,i.jsx)(e.code,{children:"WITH RECURSIVE"}),")"]})}),"\n",(0,i.jsxs)(e.h3,{id:"-21-recursive-queries-l\xe0-g\xec",children:["\u2705 ",(0,i.jsx)(e.strong,{children:"2.1. Recursive Queries l\xe0 g\xec?"})]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udd39 Recursive Queries l\xe0 truy v\u1ea5n ",(0,i.jsx)(e.strong,{children:"t\u1ef1 g\u1ecdi l\u1ea1i ch\xednh n\xf3"}),", gi\xfap x\u1eed l\xfd d\u1eef li\u1ec7u c\xf3 c\u1ea5u tr\xfac c\xe2y ho\u1eb7c chu\u1ed7i \u0111\u1ec7 quy.",(0,i.jsx)(e.br,{}),"\n","\ud83d\udd39 \u1ee8ng d\u1ee5ng ph\u1ed5 bi\u1ebfn:"]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"C\xe2y th\u01b0 m\u1ee5c (File System)"}),"."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"C\u1ea5u tr\xfac t\u1ed5 ch\u1ee9c (Org Chart)"}),"."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Chu\u1ed7i Markov, ph\xe2n t\xedch truy xu\u1ea5t d\u1eef li\u1ec7u"}),"."]}),"\n"]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsxs)(e.h3,{id:"-22-c\xe1ch-vi\u1ebft-recursive-queries",children:["\u2705 ",(0,i.jsx)(e.strong,{children:"2.2. C\xe1ch Vi\u1ebft Recursive Queries"})]}),"\n",(0,i.jsx)(e.p,{children:"C\xfa ph\xe1p c\u01a1 b\u1ea3n:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"WITH RECURSIVE RecursiveCTE AS (\n    -- Truy v\u1ea5n g\u1ed1c (Initial Query)\n    SELECT ...\n    UNION ALL\n    -- Truy v\u1ea5n \u0111\u1ec7 quy (Recursive Query)\n    SELECT ... FROM RecursiveCTE WHERE ...\n)\nSELECT * FROM RecursiveCTE;\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,i.jsx)(e.strong,{children:"V\xed d\u1ee5:"})," T\xecm c\u1ea5p b\u1eadc nh\xe2n vi\xean trong c\xf4ng ty"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"WITH RECURSIVE EmployeeHierarchy AS (\n    -- Nh\xe2n vi\xean c\u1ea5p cao nh\u1ea5t (CEO)\n    SELECT EmployeeID, ManagerID, FullName, 1 AS Level\n    FROM Employees\n    WHERE ManagerID IS NULL\n    \n    UNION ALL\n\n    -- Nh\xe2n vi\xean c\u1ea5p d\u01b0\u1edbi\n    SELECT e.EmployeeID, e.ManagerID, e.FullName, eh.Level + 1\n    FROM Employees e\n    JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID\n)\nSELECT * FROM EmployeeHierarchy ORDER BY Level;\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"Gi\u1ea3i th\xedch:"}),(0,i.jsx)(e.br,{}),"\n","\u2714 B\u01b0\u1edbc 1: Ch\u1ecdn CEO (ManagerID = NULL).",(0,i.jsx)(e.br,{}),"\n","\u2714 B\u01b0\u1edbc 2: T\xecm c\xe1c nh\xe2n vi\xean b\xe1o c\xe1o cho CEO.",(0,i.jsx)(e.br,{}),"\n","\u2714 B\u01b0\u1edbc 3: Ti\u1ebfp t\u1ee5c t\xecm nh\xe2n vi\xean c\u1ea5p d\u01b0\u1edbi.",(0,i.jsx)(e.br,{}),"\n","\u2714 K\u1ebft qu\u1ea3 hi\u1ec3n th\u1ecb th\u1ee9 b\u1eadc nh\xe2n vi\xean."]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsxs)(e.h3,{id:"-23-b\xe0i-to\xe1n-\u0111\u01b0\u1eddng-\u0111i-ng\u1eafn-nh\u1ea5t-shortest-path-problem",children:["\u2705 ",(0,i.jsx)(e.strong,{children:"2.3. B\xe0i To\xe1n \u0110\u01b0\u1eddng \u0110i Ng\u1eafn Nh\u1ea5t (Shortest Path Problem)"})]}),"\n",(0,i.jsxs)(e.p,{children:["Recursive Queries c\u0169ng c\xf3 th\u1ec3 d\xf9ng \u0111\u1ec3 t\xecm ",(0,i.jsx)(e.strong,{children:"\u0111\u01b0\u1eddng \u0111i ng\u1eafn nh\u1ea5t"})," trong \u0111\u1ed3 th\u1ecb."]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,i.jsx)(e.strong,{children:"V\xed d\u1ee5:"})," T\xecm \u0111\u01b0\u1eddng t\u1eeb \u0111i\u1ec3m A \u0111\u1ebfn B trong b\u1ea3ng ",(0,i.jsx)(e.code,{children:"Routes"})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"WITH RECURSIVE ShortestPath AS (\n    SELECT StartPoint, EndPoint, Distance FROM Routes WHERE StartPoint = 'A'\n    \n    UNION ALL\n\n    SELECT r.StartPoint, r.EndPoint, sp.Distance + r.Distance\n    FROM Routes r\n    JOIN ShortestPath sp ON r.StartPoint = sp.EndPoint\n)\nSELECT * FROM ShortestPath WHERE EndPoint = 'B' ORDER BY Distance LIMIT 1;\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"\u1ee8ng d\u1ee5ng th\u1ef1c t\u1ebf:"}),(0,i.jsx)(e.br,{}),"\n","\u2714 T\xecm \u0111\u01b0\u1eddng \u0111i trong ",(0,i.jsx)(e.strong,{children:"b\u1ea3n \u0111\u1ed3 GPS"}),".",(0,i.jsx)(e.br,{}),"\n","\u2714 X\u1eed l\xfd ",(0,i.jsx)(e.strong,{children:"\u0111\u1ed3 th\u1ecb quan h\u1ec7 ng\u01b0\u1eddi d\xf9ng"}),"."]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsx)(e.h2,{id:"3\ufe0f\u20e3-window-functions-rank-dense_rank-row_number",children:(0,i.jsxs)(e.strong,{children:["3\ufe0f\u20e3 Window Functions (",(0,i.jsx)(e.code,{children:"RANK()"}),", ",(0,i.jsx)(e.code,{children:"DENSE_RANK()"}),", ",(0,i.jsx)(e.code,{children:"ROW_NUMBER()"}),")"]})}),"\n",(0,i.jsxs)(e.h3,{id:"-31-window-functions-l\xe0-g\xec",children:["\u2705 ",(0,i.jsx)(e.strong,{children:"3.1. Window Functions L\xe0 G\xec?"})]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udd39 Window Functions gi\xfap ",(0,i.jsx)(e.strong,{children:"t\u1ea1o ch\u1ec9 m\u1ee5c, x\u1ebfp h\u1ea1ng, ph\xe2n t\xedch d\u1eef li\u1ec7u theo nh\xf3m"})," m\xe0 kh\xf4ng l\xe0m thay \u0111\u1ed5i s\u1ed1 l\u01b0\u1ee3ng d\xf2ng.",(0,i.jsx)(e.br,{}),"\n","\ud83d\udd39 \u1ee8ng d\u1ee5ng ph\u1ed5 bi\u1ebfn:",(0,i.jsx)(e.br,{}),"\n","\u2714 ",(0,i.jsx)(e.strong,{children:"X\u1ebfp h\u1ea1ng h\u1ecdc sinh, doanh s\u1ed1 b\xe1n h\xe0ng"}),".",(0,i.jsx)(e.br,{}),"\n","\u2714 ",(0,i.jsx)(e.strong,{children:"Ph\xe2n t\xedch h\xe0nh vi kh\xe1ch h\xe0ng"}),".",(0,i.jsx)(e.br,{}),"\n","\u2714 ",(0,i.jsx)(e.strong,{children:"L\u1ecdc d\u1eef li\u1ec7u theo th\u1eddi gian (gi\xe1 tr\u1ecb tr\u01b0\u1edbc/sau)"}),"."]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsxs)(e.h3,{id:"-32-ph\xe2n-bi\u1ec7t-rank-dense_rank-row_number",children:["\u2705 ",(0,i.jsxs)(e.strong,{children:["3.2. Ph\xe2n Bi\u1ec7t ",(0,i.jsx)(e.code,{children:"RANK()"}),", ",(0,i.jsx)(e.code,{children:"DENSE_RANK()"}),", ",(0,i.jsx)(e.code,{children:"ROW_NUMBER()"})]})]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,i.jsx)(e.strong,{children:"V\xed d\u1ee5:"})," X\u1ebfp h\u1ea1ng doanh s\u1ed1 nh\xe2n vi\xean"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT EmployeeID, FullName, Department, SalesAmount,\n       RANK() OVER (PARTITION BY Department ORDER BY SalesAmount DESC) AS Rank,\n       DENSE_RANK() OVER (PARTITION BY Department ORDER BY SalesAmount DESC) AS DenseRank,\n       ROW_NUMBER() OVER (PARTITION BY Department ORDER BY SalesAmount DESC) AS RowNum\nFROM Employees;\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"So s\xe1nh k\u1ebft qu\u1ea3:"})]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Employee"}),(0,i.jsx)(e.th,{children:"Sales"}),(0,i.jsx)(e.th,{children:"RANK()"}),(0,i.jsx)(e.th,{children:"DENSE_RANK()"}),(0,i.jsx)(e.th,{children:"ROW_NUMBER()"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"A"}),(0,i.jsx)(e.td,{children:"1000"}),(0,i.jsx)(e.td,{children:"1"}),(0,i.jsx)(e.td,{children:"1"}),(0,i.jsx)(e.td,{children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"B"}),(0,i.jsx)(e.td,{children:"1000"}),(0,i.jsx)(e.td,{children:"1"}),(0,i.jsx)(e.td,{children:"1"}),(0,i.jsx)(e.td,{children:"2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"C"}),(0,i.jsx)(e.td,{children:"900"}),(0,i.jsx)(e.td,{children:"3"}),(0,i.jsx)(e.td,{children:"2"}),(0,i.jsx)(e.td,{children:"3"})]})]})]}),"\n",(0,i.jsxs)(e.p,{children:["\u2714 ",(0,i.jsx)(e.code,{children:"RANK()"}),": N\u1ebfu c\xf3 gi\xe1 tr\u1ecb tr\xf9ng, s\u1ebd b\u1ecf qua s\u1ed1 th\u1ee9 t\u1ef1 ti\u1ebfp theo.",(0,i.jsx)(e.br,{}),"\n","\u2714 ",(0,i.jsx)(e.code,{children:"DENSE_RANK()"}),": Kh\xf4ng b\u1ecf qua s\u1ed1 th\u1ee9 t\u1ef1, gi\xe1 tr\u1ecb tr\xf9ng s\u1ebd c\xf9ng h\u1ea1ng.",(0,i.jsx)(e.br,{}),"\n","\u2714 ",(0,i.jsx)(e.code,{children:"ROW_NUMBER()"}),": Kh\xf4ng tr\xf9ng l\u1eb7p s\u1ed1 th\u1ee9 t\u1ef1."]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsxs)(e.h3,{id:"-33-\u1ee9ng-d\u1ee5ng-lead-lag-\u0111\u1ec3-l\u1ea5y-gi\xe1-tr\u1ecb-tr\u01b0\u1edbcsau",children:["\u2705 ",(0,i.jsxs)(e.strong,{children:["3.3. \u1ee8ng D\u1ee5ng ",(0,i.jsx)(e.code,{children:"LEAD()"}),", ",(0,i.jsx)(e.code,{children:"LAG()"})," \u0110\u1ec3 L\u1ea5y Gi\xe1 Tr\u1ecb Tr\u01b0\u1edbc/Sau"]})]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,i.jsx)(e.strong,{children:"V\xed d\u1ee5:"})," So s\xe1nh doanh s\u1ed1 th\xe1ng hi\u1ec7n t\u1ea1i v\u1edbi th\xe1ng tr\u01b0\u1edbc"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT EmployeeID, FullName, SalesMonth, SalesAmount,\n       LAG(SalesAmount, 1) OVER (PARTITION BY EmployeeID ORDER BY SalesMonth) AS PreviousMonth,\n       LEAD(SalesAmount, 1) OVER (PARTITION BY EmployeeID ORDER BY SalesMonth) AS NextMonth\nFROM Sales;\n"})}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"\u1ee8ng d\u1ee5ng th\u1ef1c t\u1ebf:"}),(0,i.jsx)(e.br,{}),"\n","\u2714 So s\xe1nh ",(0,i.jsx)(e.strong,{children:"gi\xe1 ch\u1ee9ng kho\xe1n theo ng\xe0y"}),".",(0,i.jsx)(e.br,{}),"\n","\u2714 Xem ",(0,i.jsx)(e.strong,{children:"kh\xe1ch h\xe0ng c\xf3 t\u0103ng/gi\u1ea3m chi ti\xeau"}),"."]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsx)(e.h2,{id:"4\ufe0f\u20e3-b\xe0i-t\u1eadp-th\u1ef1c-h\xe0nh--g\u1ee3i-\xfd-\u0111\xe1p-\xe1n",children:(0,i.jsx)(e.strong,{children:"4\ufe0f\u20e3 B\xe0i T\u1eadp Th\u1ef1c H\xe0nh & G\u1ee3i \xdd \u0110\xe1p \xc1n"})}),"\n",(0,i.jsxs)(e.h3,{id:"-b\xe0i-1-truy-v\u1ea5n-\u0111\u1ec7-quy-t\xecm-c\u1ea5p-b\u1eadc-nh\xe2n-vi\xean",children:["\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"B\xe0i 1: Truy v\u1ea5n \u0111\u1ec7 quy t\xecm c\u1ea5p b\u1eadc nh\xe2n vi\xean"})]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udccc ",(0,i.jsx)(e.strong,{children:"Y\xeau c\u1ea7u:"}),(0,i.jsx)(e.br,{}),"\n","\u2714 Vi\u1ebft truy v\u1ea5n l\u1ea5y danh s\xe1ch nh\xe2n vi\xean theo c\u1ea5p b\u1eadc trong c\xf4ng ty.",(0,i.jsx)(e.br,{}),"\n","\u2714 CEO (c\u1ea5p 1) \u2192 Tr\u01b0\u1edfng ph\xf2ng (c\u1ea5p 2) \u2192 Nh\xe2n vi\xean (c\u1ea5p 3)."]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udcdd ",(0,i.jsx)(e.strong,{children:"G\u1ee3i \xfd \u0111\xe1p \xe1n:"})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"WITH RECURSIVE EmployeeHierarchy AS (\n    SELECT EmployeeID, FullName, ManagerID, 1 AS Level FROM Employees WHERE ManagerID IS NULL\n    UNION ALL\n    SELECT e.EmployeeID, e.FullName, e.ManagerID, eh.Level + 1\n    FROM Employees e\n    JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID\n)\nSELECT * FROM EmployeeHierarchy ORDER BY Level;\n"})}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsxs)(e.h3,{id:"-b\xe0i-2-x\u1ebfp-h\u1ea1ng-doanh-s\u1ed1-nh\xe2n-vi\xean-theo-b\u1ed9-ph\u1eadn",children:["\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"B\xe0i 2: X\u1ebfp h\u1ea1ng doanh s\u1ed1 nh\xe2n vi\xean theo b\u1ed9 ph\u1eadn"})]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udccc ",(0,i.jsx)(e.strong,{children:"Y\xeau c\u1ea7u:"}),(0,i.jsx)(e.br,{}),"\n","\u2714 Vi\u1ebft truy v\u1ea5n x\u1ebfp h\u1ea1ng doanh s\u1ed1 nh\xe2n vi\xean theo ph\xf2ng ban b\u1eb1ng ",(0,i.jsx)(e.code,{children:"RANK()"}),", ",(0,i.jsx)(e.code,{children:"DENSE_RANK()"}),"."]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udcdd ",(0,i.jsx)(e.strong,{children:"G\u1ee3i \xfd \u0111\xe1p \xe1n:"})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT EmployeeID, FullName, Department, SalesAmount,\n       RANK() OVER (PARTITION BY Department ORDER BY SalesAmount DESC) AS Rank\nFROM Employees;\n"})}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsxs)(e.h4,{id:"-t\xf3m-t\u1eaft-b\xe0i-h\u1ecdc",children:["\ud83d\udccc ",(0,i.jsx)(e.strong,{children:"T\xf3m t\u1eaft b\xe0i h\u1ecdc"})]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udd39 ",(0,i.jsxs)(e.strong,{children:["Recursive Queries (",(0,i.jsx)(e.code,{children:"WITH RECURSIVE"}),")"]})," gi\xfap x\u1eed l\xfd c\xe2y th\u01b0 m\u1ee5c, t\u1ed5 ch\u1ee9c nh\xe2n s\u1ef1.",(0,i.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,i.jsxs)(e.strong,{children:["Window Functions (",(0,i.jsx)(e.code,{children:"RANK()"}),", ",(0,i.jsx)(e.code,{children:"ROW_NUMBER()"}),", ",(0,i.jsx)(e.code,{children:"LEAD()"}),")"]})," h\u1ed7 tr\u1ee3 ph\xe2n t\xedch d\u1eef li\u1ec7u m\u1ea1nh m\u1ebd.",(0,i.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,i.jsx)(e.strong,{children:"\u1ee8ng d\u1ee5ng v\xe0o th\u1ef1c t\u1ebf: b\xe1o c\xe1o doanh s\u1ed1, ph\xe2n t\xedch kh\xe1ch h\xe0ng, truy v\u1ea5n \u0111\u1ec7 quy."})]}),"\n",(0,i.jsx)(e.hr,{}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\ude80 ",(0,i.jsx)(e.strong,{children:"Ti\u1ebfp theo:"})," ",(0,i.jsx)(e.a,{href:"/en/docs/database/learn-sql-in-30-days/30-database-security",children:"Database security"}),"."]}),"\n",(0,i.jsxs)(e.p,{children:["\ud83d\udccc ",(0,i.jsx)(e.strong,{children:"L\u1ed9 tr\xecnh:"})," ",(0,i.jsx)(e.a,{href:"/en/docs/database/learn-sql-in-30-days/30-day-sql-learning-roadmap",children:"H\u1ecdc SQL trong 30 ng\xe0y"}),"."]})]})}function a(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(o,{...n})}):o(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>c,x:()=>h});var i=s(96540);const r={},t=i.createContext(r);function c(n){const e=i.useContext(t);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function h(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),i.createElement(t.Provider,{value:e},n.children)}}}]);