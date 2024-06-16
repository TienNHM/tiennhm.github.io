"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[3887],{17356:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>r,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>d,toc:()=>c});var s=i(74848),n=i(28453);const l={title:"182. Duplicate Emails",slug:"182-duplicate-emails",description:"Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not `NULL`.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},a="182. Duplicate Emails",d={id:"leetcode/database/Duplicate Emails",title:"182. Duplicate Emails",description:"Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not `NULL`.",source:"@site/docs/04-leetcode/database/182. Duplicate Emails.mdx",sourceDirName:"04-leetcode/database",slug:"/leetcode/database/182-duplicate-emails",permalink:"/en/docs/leetcode/database/182-duplicate-emails",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/database/182. Duplicate Emails.mdx",tags:[{inline:!0,label:"leetcode",permalink:"/en/docs/tags/leetcode"},{inline:!0,label:"database",permalink:"/en/docs/tags/database"}],version:"current",lastUpdatedAt:171852689e4,sidebarPosition:1,frontMatter:{title:"182. Duplicate Emails",slug:"182-duplicate-emails",description:"Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not `NULL`.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"181. Employees Earning More Than Their Managers",permalink:"/en/docs/leetcode/database/181-employees-earning-more-than-their-managers"},next:{title:"183. Customers Who Never Order",permalink:"/en/docs/leetcode/database/183-customers-who-never-order"}},r={},c=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}];function o(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"182-duplicate-emails",children:"182. Duplicate Emails"}),"\n",(0,s.jsx)(t.h2,{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",children:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"}),"\n",(0,s.jsxs)(t.p,{children:["Chi ti\u1ebft: ",(0,s.jsx)(t.a,{href:"https://leetcode.com/problems/duplicate-emails",children:"https://leetcode.com/problems/duplicate-emails"})]}),"\n",(0,s.jsxs)(t.p,{children:["Table: ",(0,s.jsx)(t.code,{children:"Person"})]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Column Name"}),(0,s.jsx)(t.th,{children:"Type"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"id"}),(0,s.jsx)(t.td,{children:"int"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"email"}),(0,s.jsx)(t.td,{children:"varchar"})]})]})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"id"})," is the primary key (column with unique values) for this table."]}),"\n",(0,s.jsx)(t.li,{children:"Each row of this table contains an email. The emails will not contain uppercase letters."}),"\n"]}),"\n",(0,s.jsxs)(t.admonition,{title:"Y\xeau c\u1ea7u",type:"tip",children:[(0,s.jsxs)(t.p,{children:["Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not ",(0,s.jsx)(t.code,{children:"NULL"}),"."]}),(0,s.jsx)(t.p,{children:"Return the result table in any order. The result format is in the following example."})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Example 1:"})}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Input: ",(0,s.jsx)(t.code,{children:"Person"})," table:"]}),"\n"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"id"}),(0,s.jsx)(t.th,{children:"email"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"1"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"a@b.com"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"2"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"c@d.com"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"3"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"a@b.com"})})]})]})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Output:"}),"\n"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{children:"Email"})})}),(0,s.jsx)(t.tbody,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"a@b.com"})})})})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Explanation: ",(0,s.jsx)(t.code,{children:"a@b.com"})," is repeated two times."]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",children:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"SELECT email \nFROM Person \nGROUP BY email \nHAVING COUNT(id) > 1;\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Tham kh\u1ea3o: ",(0,s.jsx)(t.a,{href:"https://leetcode.com/submissions/detail/1039091405/",children:"https://leetcode.com/submissions/detail/1039091405/"})]})]})}function h(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>a,x:()=>d});var s=i(96540);const n={},l=s.createContext(n);function a(e){const t=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),s.createElement(l.Provider,{value:t},e.children)}}}]);