"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[9103],{45741:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>d,default:()=>c,frontMatter:()=>l,metadata:()=>r,toc:()=>h});var s=n(74848),i=n(28453);const l={title:"176. Second Highest Salary",slug:"176-second-highest-salary",description:"Write a solution to find the second highest salary from the `Employee` table. If there is no second highest salary, return `null` (return `None` in Pandas).",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},d="176. Second Highest Salary",r={id:"leetcode/database/Second Highest Salary",title:"176. Second Highest Salary",description:"Write a solution to find the second highest salary from the `Employee` table. If there is no second highest salary, return `null` (return `None` in Pandas).",source:"@site/docs/04-leetcode/database/176. Second Highest Salary.mdx",sourceDirName:"04-leetcode/database",slug:"/leetcode/database/176-second-highest-salary",permalink:"/docs/leetcode/database/176-second-highest-salary",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/database/176. Second Highest Salary.mdx",tags:[{inline:!0,label:"leetcode",permalink:"/docs/tags/leetcode"},{inline:!0,label:"database",permalink:"/docs/tags/database"}],version:"current",lastUpdatedAt:1732381601e3,sidebarPosition:1,frontMatter:{title:"176. Second Highest Salary",slug:"176-second-highest-salary",description:"Write a solution to find the second highest salary from the `Employee` table. If there is no second highest salary, return `null` (return `None` in Pandas).",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"175. Combine Two Tables",permalink:"/docs/leetcode/database/175-combine-two-tables"},next:{title:"177. Nth Highest Salary",permalink:"/docs/leetcode/database/177-nth-highest-salary"}},a={},h=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}];function o(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"176-second-highest-salary",children:"176. Second Highest Salary"}),"\n",(0,s.jsx)(t.h2,{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",children:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"}),"\n",(0,s.jsxs)(t.p,{children:["Chi ti\u1ebft: ",(0,s.jsx)(t.a,{href:"https://leetcode.com/problems/second-highest-salary/",children:"https://leetcode.com/problems/second-highest-salary/"})]}),"\n",(0,s.jsxs)(t.p,{children:["Table: ",(0,s.jsx)(t.code,{children:"Employee"})]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Column Name"}),(0,s.jsx)(t.th,{children:"Type"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"id"}),(0,s.jsx)(t.td,{children:"int"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"salary"}),(0,s.jsx)(t.td,{children:"int"})]})]})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"id"})," is the primary key (column with unique values) for this table."]}),"\n",(0,s.jsx)(t.li,{children:"Each row of this table contains information about the salary of an employee."}),"\n"]}),"\n",(0,s.jsxs)(t.admonition,{title:"Y\xeau c\u1ea7u",type:"tip",children:[(0,s.jsxs)(t.p,{children:["Write a solution to find the second highest salary from the ",(0,s.jsx)(t.code,{children:"Employee"})," table. If there is no second highest salary, return ",(0,s.jsx)(t.code,{children:"null"})," (return ",(0,s.jsx)(t.code,{children:"None"})," in Pandas)."]}),(0,s.jsx)(t.p,{children:"The result format is in the following example."})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Example 1:"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Input: ",(0,s.jsx)(t.code,{children:"Employee"})," table:"]}),"\n"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"id"}),(0,s.jsx)(t.th,{children:"salary"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"1"}),(0,s.jsx)(t.td,{children:"100"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"2"}),(0,s.jsx)(t.td,{children:"200"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"3"}),(0,s.jsx)(t.td,{children:"300"})]})]})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Output:"}),"\n"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{children:"SecondHighestSalary"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{children:"200"})})})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Example 2:"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Input: ",(0,s.jsx)(t.code,{children:"Employee"})," table:"]}),"\n"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"id"}),(0,s.jsx)(t.th,{children:"salary"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"1"}),(0,s.jsx)(t.td,{children:"100"})]})})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Output:"}),"\n"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{children:"SecondHighestSalary"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{children:"null"})})})]}),"\n",(0,s.jsx)(t.h2,{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",children:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"SELECT (\n    SELECT DISTINCT(salary) \n    FROM Employee \n    ORDER BY salary DESC \n    LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Tham kh\u1ea3o: ",(0,s.jsx)(t.a,{href:"https://leetcode.com/submissions/detail/1038480623/",children:"https://leetcode.com/submissions/detail/1038480623/"})]})]})}function c(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>d,x:()=>r});var s=n(96540);const i={},l=s.createContext(i);function d(e){const t=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(l.Provider,{value:t},e.children)}}}]);