"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[2525],{3905:(t,e,a)=>{a.d(e,{Zo:()=>u,kt:()=>c});var n=a(67294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var p=n.createContext({}),s=function(t){var e=n.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},u=function(t){var e=s(t.components);return n.createElement(p.Provider,{value:e},t.children)},d="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},h=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),d=s(a),h=r,c=d["".concat(p,".").concat(h)]||d[h]||m[h]||l;return a?n.createElement(c,i(i({ref:e},u),{},{components:a})):n.createElement(c,i({ref:e},u))}));function c(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=h;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o[d]="string"==typeof t?t:r,i[1]=o;for(var s=2;s<l;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},30:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var n=a(87462),r=(a(67294),a(3905));const l={title:"177. Nth Highest Salary",slug:"177-nth-highest-salary",description:"Solution cho problem 177. Nth Highest Salary c\u1ee7a LeetCode",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"]},i="177. Nth Highest Salary",o={unversionedId:"leetcode/database/Nth Highest Salary",id:"leetcode/database/Nth Highest Salary",title:"177. Nth Highest Salary",description:"Solution cho problem 177. Nth Highest Salary c\u1ee7a LeetCode",source:"@site/docs/leetcode/database/177. Nth Highest Salary.mdx",sourceDirName:"leetcode/database",slug:"/leetcode/database/177-nth-highest-salary",permalink:"/docs/leetcode/database/177-nth-highest-salary",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/leetcode/database/177. Nth Highest Salary.mdx",tags:[{label:"leetcode",permalink:"/docs/tags/leetcode"},{label:"database",permalink:"/docs/tags/database"}],version:"current",sidebarPosition:1,frontMatter:{title:"177. Nth Highest Salary",slug:"177-nth-highest-salary",description:"Solution cho problem 177. Nth Highest Salary c\u1ee7a LeetCode",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"]},sidebar:"tutorialSidebar",previous:{title:"176. Second Highest Salary",permalink:"/docs/leetcode/database/176-second-highest-salary"},next:{title:"178. Rank Scores",permalink:"/docs/leetcode/database/178-rank-scores"}},p={},s=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}],u={toc:s},d="wrapper";function m(t){let{components:e,...a}=t;return(0,r.kt)(d,(0,n.Z)({},u,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"177-nth-highest-salary"},"177. Nth Highest Salary"),(0,r.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n"},"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"),(0,r.kt)("p",null,"Chi ti\u1ebft: ",(0,r.kt)("a",{parentName:"p",href:"https://leetcode.com/problems/nth-highest-salary/"},"https://leetcode.com/problems/nth-highest-salary/")),(0,r.kt)("p",null,"Table: ",(0,r.kt)("inlineCode",{parentName:"p"},"Employee")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Column Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"id"),(0,r.kt)("td",{parentName:"tr",align:null},"int")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"salary"),(0,r.kt)("td",{parentName:"tr",align:null},"int")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"id")," is the primary key (column with unique values) for this table."),(0,r.kt)("li",{parentName:"ul"},"Each row of this table contains information about the salary of an employee.")),(0,r.kt)("admonition",{title:"Y\xeau c\u1ea7u",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Write a solution to find the nth highest salary from the ",(0,r.kt)("inlineCode",{parentName:"p"},"Employee")," table. If there is no nth highest salary, return ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),". The result format is in the following example.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 1:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Input: ",(0,r.kt)("inlineCode",{parentName:"li"},"Employee")," table:")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"id"),(0,r.kt)("th",{parentName:"tr",align:null},"salary"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"100")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"200")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"300")))),(0,r.kt)("p",null,"n = 2"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Output: ")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"getNthHighestSalary(2)"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"200")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 2:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Input: ",(0,r.kt)("inlineCode",{parentName:"li"},"Employee")," table:")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"id"),(0,r.kt)("th",{parentName:"tr",align:null},"salary"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"100")))),(0,r.kt)("p",null,"n = 2"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Output: ")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"getNthHighestSalary(2)"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"null")))),(0,r.kt)("h2",{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n"},"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\nBEGIN\n    DECLARE offset INT;\n    SET offset = N - 1;\n    RETURN (\n        SELECT DISTINCT(salary)\n        FROM Employee\n        ORDER BY salary DESC\n        LIMIT 1 OFFSET offset\n    );\nEND\n")),(0,r.kt)("p",null,"Tham kh\u1ea3o: ",(0,r.kt)("a",{parentName:"p",href:"https://leetcode.com/submissions/detail/1038477455/"},"https://leetcode.com/submissions/detail/1038477455/")))}m.isMDXComponent=!0}}]);