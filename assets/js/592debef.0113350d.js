"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[1473],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>b});var n=a(67294);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var p=n.createContext({}),m=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=m(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=m(a),c=l,b=d["".concat(p,".").concat(c)]||d[c]||u[c]||r;return a?n.createElement(b,i(i({ref:t},s),{},{components:a})):n.createElement(b,i({ref:t},s))}));function b(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=a.length,i=new Array(r);i[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[d]="string"==typeof e?e:l,i[1]=o;for(var m=2;m<r;m++)i[m]=a[m];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},19650:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>m});var n=a(87462),l=(a(67294),a(3905));const r={title:"182. Duplicate Emails",slug:"182-duplicate-emails",description:"Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not `NULL`.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},i="182. Duplicate Emails",o={unversionedId:"leetcode/database/Duplicate Emails",id:"leetcode/database/Duplicate Emails",title:"182. Duplicate Emails",description:"Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not `NULL`.",source:"@site/docs/04-leetcode/database/182. Duplicate Emails.mdx",sourceDirName:"04-leetcode/database",slug:"/leetcode/database/182-duplicate-emails",permalink:"/docs/leetcode/database/182-duplicate-emails",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/database/182. Duplicate Emails.mdx",tags:[{label:"leetcode",permalink:"/docs/tags/leetcode"},{label:"database",permalink:"/docs/tags/database"}],version:"current",sidebarPosition:1,frontMatter:{title:"182. Duplicate Emails",slug:"182-duplicate-emails",description:"Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not `NULL`.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"181. Employees Earning More Than Their Managers",permalink:"/docs/leetcode/database/181-employees-earning-more-than-their-managers"},next:{title:"183. Customers Who Never Order",permalink:"/docs/leetcode/database/183-customers-who-never-order"}},p={},m=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}],s={toc:m},d="wrapper";function u(e){let{components:t,...a}=e;return(0,l.kt)(d,(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"182-duplicate-emails"},"182. Duplicate Emails"),(0,l.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n"},"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"),(0,l.kt)("p",null,"Chi ti\u1ebft: ",(0,l.kt)("a",{parentName:"p",href:"https://leetcode.com/problems/duplicate-emails"},"https://leetcode.com/problems/duplicate-emails")),(0,l.kt)("p",null,"Table: ",(0,l.kt)("inlineCode",{parentName:"p"},"Person")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Column Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"id"),(0,l.kt)("td",{parentName:"tr",align:null},"int")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"email"),(0,l.kt)("td",{parentName:"tr",align:null},"varchar")))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"id")," is the primary key (column with unique values) for this table."),(0,l.kt)("li",{parentName:"ul"},"Each row of this table contains an email. The emails will not contain uppercase letters.")),(0,l.kt)("admonition",{title:"Y\xeau c\u1ea7u",type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not ",(0,l.kt)("inlineCode",{parentName:"p"},"NULL"),". "),(0,l.kt)("p",{parentName:"admonition"},"Return the result table in any order. The result format is in the following example.")),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Example 1:")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Input: ",(0,l.kt)("inlineCode",{parentName:"li"},"Person")," table:")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"id"),(0,l.kt)("th",{parentName:"tr",align:null},"email"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"a@b.com"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"c@d.com"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"3"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"a@b.com"))))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Output: ")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Email"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"a@b.com"))))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Explanation: ",(0,l.kt)("inlineCode",{parentName:"li"},"a@b.com")," is repeated two times.")),(0,l.kt)("h2",{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n"},"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT email \nFROM Person \nGROUP BY email \nHAVING COUNT(id) > 1;\n")),(0,l.kt)("p",null,"Tham kh\u1ea3o: ",(0,l.kt)("a",{parentName:"p",href:"https://leetcode.com/submissions/detail/1039091405/"},"https://leetcode.com/submissions/detail/1039091405/")))}u.isMDXComponent=!0}}]);