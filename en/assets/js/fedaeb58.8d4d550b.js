"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[8323],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>h});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),d=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=d(a),c=r,h=m["".concat(s,".").concat(c)]||m[c]||u[c]||l;return a?n.createElement(h,i(i({ref:t},p),{},{components:a})):n.createElement(h,i({ref:t},p))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[m]="string"==typeof e?e:r,i[1]=o;for(var d=2;d<l;d++)i[d]=a[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},52314:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var n=a(87462),r=(a(67294),a(3905));const l={title:"176. Second Highest Salary",slug:"176-second-highest-salary",description:"Write a solution to find the second highest salary from the `Employee` table. If there is no second highest salary, return `null` (return `None` in Pandas).",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},i="176. Second Highest Salary",o={unversionedId:"leetcode/database/Second Highest Salary",id:"leetcode/database/Second Highest Salary",title:"176. Second Highest Salary",description:"Write a solution to find the second highest salary from the `Employee` table. If there is no second highest salary, return `null` (return `None` in Pandas).",source:"@site/docs/04-leetcode/database/176. Second Highest Salary.mdx",sourceDirName:"04-leetcode/database",slug:"/leetcode/database/176-second-highest-salary",permalink:"/en/docs/leetcode/database/176-second-highest-salary",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/database/176. Second Highest Salary.mdx",tags:[{label:"leetcode",permalink:"/en/docs/tags/leetcode"},{label:"database",permalink:"/en/docs/tags/database"}],version:"current",lastUpdatedAt:1705822708,formattedLastUpdatedAt:"Jan 21, 2024",sidebarPosition:1,frontMatter:{title:"176. Second Highest Salary",slug:"176-second-highest-salary",description:"Write a solution to find the second highest salary from the `Employee` table. If there is no second highest salary, return `null` (return `None` in Pandas).",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"175. Combine Two Tables",permalink:"/en/docs/leetcode/database/175-combine-two-tables"},next:{title:"177. Nth Highest Salary",permalink:"/en/docs/leetcode/database/177-nth-highest-salary"}},s={},d=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}],p={toc:d},m="wrapper";function u(e){let{components:t,...a}=e;return(0,r.kt)(m,(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"176-second-highest-salary"},"176. Second Highest Salary"),(0,r.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n"},"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"),(0,r.kt)("p",null,"Chi ti\u1ebft: ",(0,r.kt)("a",{parentName:"p",href:"https://leetcode.com/problems/second-highest-salary/"},"https://leetcode.com/problems/second-highest-salary/")),(0,r.kt)("p",null,"Table: ",(0,r.kt)("inlineCode",{parentName:"p"},"Employee")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Column Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"id"),(0,r.kt)("td",{parentName:"tr",align:null},"int")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"salary"),(0,r.kt)("td",{parentName:"tr",align:null},"int")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"id")," is the primary key (column with unique values) for this table."),(0,r.kt)("li",{parentName:"ul"},"Each row of this table contains information about the salary of an employee.")),(0,r.kt)("admonition",{title:"Y\xeau c\u1ea7u",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Write a solution to find the second highest salary from the ",(0,r.kt)("inlineCode",{parentName:"p"},"Employee")," table. If there is no second highest salary, return ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," (return ",(0,r.kt)("inlineCode",{parentName:"p"},"None")," in Pandas). "),(0,r.kt)("p",{parentName:"admonition"},"The result format is in the following example.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 1:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Input: ",(0,r.kt)("inlineCode",{parentName:"li"},"Employee")," table:")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"id"),(0,r.kt)("th",{parentName:"tr",align:null},"salary"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"100")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"200")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"300")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Output: ")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"SecondHighestSalary"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"200")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 2:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Input: ",(0,r.kt)("inlineCode",{parentName:"li"},"Employee")," table:")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"id"),(0,r.kt)("th",{parentName:"tr",align:null},"salary"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"100")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Output: ")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"SecondHighestSalary"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"null")))),(0,r.kt)("h2",{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n"},"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT (\n    SELECT DISTINCT(salary) \n    FROM Employee \n    ORDER BY salary DESC \n    LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;\n")),(0,r.kt)("p",null,"Tham kh\u1ea3o: ",(0,r.kt)("a",{parentName:"p",href:"https://leetcode.com/submissions/detail/1038480623/"},"https://leetcode.com/submissions/detail/1038480623/")))}u.isMDXComponent=!0}}]);