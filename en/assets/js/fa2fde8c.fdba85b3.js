"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[7077],{41515:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>h,contentTitle:()=>l,default:()=>o,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var d=n(74848),t=n(28453);const i={title:"607. Sales Person",slug:"607-sales-person",description:"Write a solution to find the names of all the salespersons who did not have any orders related to the company with the name `RED`.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},l="607. Sales Person",r={id:"leetcode/database/Sales Person",title:"607. Sales Person",description:"Write a solution to find the names of all the salespersons who did not have any orders related to the company with the name `RED`.",source:"@site/docs/04-leetcode/database/607. Sales Person.mdx",sourceDirName:"04-leetcode/database",slug:"/leetcode/database/607-sales-person",permalink:"/en/docs/leetcode/database/607-sales-person",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/database/607. Sales Person.mdx",tags:[{inline:!0,label:"leetcode",permalink:"/en/docs/tags/leetcode"},{inline:!0,label:"database",permalink:"/en/docs/tags/database"}],version:"current",lastUpdatedAt:1719026687e3,sidebarPosition:1,frontMatter:{title:"607. Sales Person",slug:"607-sales-person",description:"Write a solution to find the names of all the salespersons who did not have any orders related to the company with the name `RED`.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"511. Game Play Analysis I",permalink:"/en/docs/leetcode/database/511-game-play-analysis-i"},next:{title:"Dynamic Programming",permalink:"/en/docs/category/dynamic-programming"}},h={},c=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Table <code>SalesPerson</code>",id:"table-salesperson",level:3},{value:"Table <code>Company</code>",id:"table-company",level:3},{value:"Table <code>Orders</code>",id:"table-orders",level:3},{value:"Y\xeau c\u1ea7u",id:"y\xeau-c\u1ea7u",level:3},{value:"V\xed d\u1ee5",id:"v\xed-d\u1ee5",level:2},{value:"Input",id:"input",level:3},{value:"Output:",id:"output",level:3},{value:"Explanation:",id:"explanation",level:3},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}];function a(e){const s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.h1,{id:"607-sales-person",children:"607. Sales Person"}),"\n",(0,d.jsx)(s.h2,{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",children:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"}),"\n",(0,d.jsxs)(s.p,{children:["Chi ti\u1ebft: ",(0,d.jsx)(s.a,{href:"https://leetcode.com/problems/sales-person/",children:"https://leetcode.com/problems/sales-person/"})]}),"\n",(0,d.jsxs)(s.h3,{id:"table-salesperson",children:["Table ",(0,d.jsx)(s.code,{children:"SalesPerson"})]}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.th,{children:"Column Name"}),(0,d.jsx)(s.th,{children:"Type"})]})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"sales_id"}),(0,d.jsx)(s.td,{children:"int"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"name"}),(0,d.jsx)(s.td,{children:"varchar"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"salary"}),(0,d.jsx)(s.td,{children:"int"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"commission_rate"}),(0,d.jsx)(s.td,{children:"int"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"hire_date"}),(0,d.jsx)(s.td,{children:"date"})]})]})]}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsxs)(s.li,{children:[(0,d.jsx)(s.code,{children:"sales_id"})," is the primary key (column with unique values) for this table."]}),"\n",(0,d.jsx)(s.li,{children:"Each row of this table indicates the name and the ID of a salesperson alongside their salary, commission rate, and hire date."}),"\n"]}),"\n",(0,d.jsxs)(s.h3,{id:"table-company",children:["Table ",(0,d.jsx)(s.code,{children:"Company"})]}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.th,{children:"Column Name"}),(0,d.jsx)(s.th,{children:"Type"})]})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"com_id"}),(0,d.jsx)(s.td,{children:"int"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"name"}),(0,d.jsx)(s.td,{children:"varchar"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"city"}),(0,d.jsx)(s.td,{children:"varchar"})]})]})]}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsxs)(s.li,{children:[(0,d.jsx)(s.code,{children:"com_id"})," is the primary key (column with unique values) for this table."]}),"\n",(0,d.jsx)(s.li,{children:"Each row of this table indicates the name and the ID of a company and the city in which the company is located."}),"\n"]}),"\n",(0,d.jsxs)(s.h3,{id:"table-orders",children:["Table ",(0,d.jsx)(s.code,{children:"Orders"})]}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.th,{children:"Column Name"}),(0,d.jsx)(s.th,{children:"Type"})]})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"order_id"}),(0,d.jsx)(s.td,{children:"int"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"order_date"}),(0,d.jsx)(s.td,{children:"date"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"com_id"}),(0,d.jsx)(s.td,{children:"int"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"sales_id"}),(0,d.jsx)(s.td,{children:"int"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"amount"}),(0,d.jsx)(s.td,{children:"int"})]})]})]}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsxs)(s.li,{children:[(0,d.jsx)(s.code,{children:"order_id"})," is the primary key (column with unique values) for this table."]}),"\n",(0,d.jsxs)(s.li,{children:[(0,d.jsx)(s.code,{children:"com_id"})," is a foreign key (reference column) to com_id from the Company table."]}),"\n",(0,d.jsxs)(s.li,{children:[(0,d.jsx)(s.code,{children:"sales_id"})," is a foreign key (reference column) to sales_id from the SalesPerson table."]}),"\n",(0,d.jsx)(s.li,{children:"Each row of this table contains information about one order. This includes the ID of the company, the ID of the salesperson, the date of the order, and the amount paid."}),"\n"]}),"\n",(0,d.jsx)(s.h3,{id:"y\xeau-c\u1ea7u",children:"Y\xeau c\u1ea7u"}),"\n",(0,d.jsxs)(s.admonition,{title:"Y\xeau c\u1ea7u",type:"tip",children:[(0,d.jsxs)(s.p,{children:["Write a solution to find the names of all the salespersons who did not have any orders related to the company with the name ",(0,d.jsx)(s.code,{children:"RED"}),"."]}),(0,d.jsx)(s.p,{children:"Return the result table in any order. The result format is in the following example."})]}),"\n",(0,d.jsx)(s.h2,{id:"v\xed-d\u1ee5",children:"V\xed d\u1ee5"}),"\n",(0,d.jsx)(s.h3,{id:"input",children:"Input"}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsxs)(s.li,{children:[(0,d.jsx)(s.code,{children:"SalesPerson"})," table:"]}),"\n"]}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.th,{children:"sales_id"}),(0,d.jsx)(s.th,{children:"name"}),(0,d.jsx)(s.th,{children:"salary"}),(0,d.jsx)(s.th,{children:"commission_rate"}),(0,d.jsx)(s.th,{children:"hire_date"})]})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"1"}),(0,d.jsx)(s.td,{children:"John"}),(0,d.jsx)(s.td,{children:"100000"}),(0,d.jsx)(s.td,{children:"6"}),(0,d.jsx)(s.td,{children:"4/1/2006"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"2"}),(0,d.jsx)(s.td,{children:"Amy"}),(0,d.jsx)(s.td,{children:"12000"}),(0,d.jsx)(s.td,{children:"5"}),(0,d.jsx)(s.td,{children:"5/1/2010"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"3"}),(0,d.jsx)(s.td,{children:"Mark"}),(0,d.jsx)(s.td,{children:"65000"}),(0,d.jsx)(s.td,{children:"12"}),(0,d.jsx)(s.td,{children:"12/25/2008"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"4"}),(0,d.jsx)(s.td,{children:"Pam"}),(0,d.jsx)(s.td,{children:"25000"}),(0,d.jsx)(s.td,{children:"25"}),(0,d.jsx)(s.td,{children:"1/1/2005"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"5"}),(0,d.jsx)(s.td,{children:"Alex"}),(0,d.jsx)(s.td,{children:"5000"}),(0,d.jsx)(s.td,{children:"10"}),(0,d.jsx)(s.td,{children:"2/3/2007"})]})]})]}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsxs)(s.li,{children:[(0,d.jsx)(s.code,{children:"Company"})," table:"]}),"\n"]}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.th,{children:"com_id"}),(0,d.jsx)(s.th,{children:"name"}),(0,d.jsx)(s.th,{children:"city"})]})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"1"}),(0,d.jsx)(s.td,{children:"RED"}),(0,d.jsx)(s.td,{children:"Boston"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"2"}),(0,d.jsx)(s.td,{children:"ORANGE"}),(0,d.jsx)(s.td,{children:"New York"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"3"}),(0,d.jsx)(s.td,{children:"YELLOW"}),(0,d.jsx)(s.td,{children:"Boston"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"4"}),(0,d.jsx)(s.td,{children:"GREEN"}),(0,d.jsx)(s.td,{children:"Austin"})]})]})]}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsxs)(s.li,{children:[(0,d.jsx)(s.code,{children:"Orders"})," table:"]}),"\n"]}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.th,{children:"order_id"}),(0,d.jsx)(s.th,{children:"order_date"}),(0,d.jsx)(s.th,{children:"com_id"}),(0,d.jsx)(s.th,{children:"sales_id"}),(0,d.jsx)(s.th,{children:"amount"})]})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"1"}),(0,d.jsx)(s.td,{children:"1/1/2014"}),(0,d.jsx)(s.td,{children:"3"}),(0,d.jsx)(s.td,{children:"4"}),(0,d.jsx)(s.td,{children:"10000"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"2"}),(0,d.jsx)(s.td,{children:"2/1/2014"}),(0,d.jsx)(s.td,{children:"4"}),(0,d.jsx)(s.td,{children:"5"}),(0,d.jsx)(s.td,{children:"5000"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"3"}),(0,d.jsx)(s.td,{children:"3/1/2014"}),(0,d.jsx)(s.td,{children:"1"}),(0,d.jsx)(s.td,{children:"1"}),(0,d.jsx)(s.td,{children:"50000"})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"4"}),(0,d.jsx)(s.td,{children:"4/1/2014"}),(0,d.jsx)(s.td,{children:"1"}),(0,d.jsx)(s.td,{children:"4"}),(0,d.jsx)(s.td,{children:"25000"})]})]})]}),"\n",(0,d.jsx)(s.h3,{id:"output",children:"Output:"}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsx)(s.tr,{children:(0,d.jsx)(s.th,{children:"name"})})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsx)(s.tr,{children:(0,d.jsx)(s.td,{children:"Amy"})}),(0,d.jsx)(s.tr,{children:(0,d.jsx)(s.td,{children:"Mark"})}),(0,d.jsx)(s.tr,{children:(0,d.jsx)(s.td,{children:"Alex"})})]})]}),"\n",(0,d.jsx)(s.h3,{id:"explanation",children:"Explanation:"}),"\n",(0,d.jsxs)(s.p,{children:["According to orders 3 and 4 in the Orders table, it is easy to tell that only salesperson John and Pam have sales to company ",(0,d.jsx)(s.code,{children:"RED"}),", so we report all the other names in the table salesperson."]}),"\n",(0,d.jsx)(s.h2,{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",children:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"}),"\n",(0,d.jsx)(s.pre,{children:(0,d.jsx)(s.code,{className:"language-sql",children:"SELECT sp.name\nFROM SalesPerson sp\nWHERE sp.sales_id NOT IN (\n    SELECT o.sales_id\n    FROM Orders o INNER JOIN Company c ON o.com_id = c.com_id\n    WHERE c.name = 'RED'\n);\n"})}),"\n",(0,d.jsxs)(s.p,{children:["Tham kh\u1ea3o: ",(0,d.jsx)(s.a,{href:"https://leetcode.com/submissions/detail/1056143690/",children:"https://leetcode.com/submissions/detail/1056143690/"})]})]})}function o(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,d.jsx)(s,{...e,children:(0,d.jsx)(a,{...e})}):a(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>r});var d=n(96540);const t={},i=d.createContext(t);function l(e){const s=d.useContext(i);return d.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),d.createElement(i.Provider,{value:s},e.children)}}}]);