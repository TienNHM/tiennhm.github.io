"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[7064],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>h});var n=a(67294);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=s(a),c=l,h=m["".concat(p,".").concat(c)]||m[c]||u[c]||r;return a?n.createElement(h,i(i({ref:t},d),{},{components:a})):n.createElement(h,i({ref:t},d))}));function h(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=a.length,i=new Array(r);i[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[m]="string"==typeof e?e:l,i[1]=o;for(var s=2;s<r;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},54021:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var n=a(87462),l=(a(67294),a(3905));const r={title:"196. Delete Duplicate Emails",slug:"196-delete-duplicate-emails",description:"Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id. After running your script, the answer shown is the `Person` table. The driver will first compile and run your piece of code and then show the `Person` table. The final order of the `Person` table does not matter.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},i="196. Delete Duplicate Emails",o={unversionedId:"leetcode/database/Delete Duplicate Emails",id:"leetcode/database/Delete Duplicate Emails",title:"196. Delete Duplicate Emails",description:"Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id. After running your script, the answer shown is the `Person` table. The driver will first compile and run your piece of code and then show the `Person` table. The final order of the `Person` table does not matter.",source:"@site/docs/04-leetcode/database/196. Delete Duplicate Emails.mdx",sourceDirName:"04-leetcode/database",slug:"/leetcode/database/196-delete-duplicate-emails",permalink:"/docs/leetcode/database/196-delete-duplicate-emails",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/database/196. Delete Duplicate Emails.mdx",tags:[{label:"leetcode",permalink:"/docs/tags/leetcode"},{label:"database",permalink:"/docs/tags/database"}],version:"current",sidebarPosition:1,frontMatter:{title:"196. Delete Duplicate Emails",slug:"196-delete-duplicate-emails",description:"Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id. After running your script, the answer shown is the `Person` table. The driver will first compile and run your piece of code and then show the `Person` table. The final order of the `Person` table does not matter.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"183. Customers Who Never Order",permalink:"/docs/leetcode/database/183-customers-who-never-order"},next:{title:"197. Rising Temperature",permalink:"/docs/leetcode/database/197-rising-temperature"}},p={},s=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}],d={toc:s},m="wrapper";function u(e){let{components:t,...a}=e;return(0,l.kt)(m,(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"196-delete-duplicate-emails"},"196. Delete Duplicate Emails"),(0,l.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n"},"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"),(0,l.kt)("p",null,"Chi ti\u1ebft: ",(0,l.kt)("a",{parentName:"p",href:"https://leetcode.com/problems/delete-duplicate-emails/"},"https://leetcode.com/problems/delete-duplicate-emails/")),(0,l.kt)("p",null,"Table: ",(0,l.kt)("inlineCode",{parentName:"p"},"Person")),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Column Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"id"),(0,l.kt)("td",{parentName:"tr",align:null},"int")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"email"),(0,l.kt)("td",{parentName:"tr",align:null},"varchar")))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"id")," is the primary key (column with unique values) for this table."),(0,l.kt)("li",{parentName:"ul"},"Each row of this table contains an email. The emails will not contain uppercase letters.")),(0,l.kt)("admonition",{title:"Y\xeau c\u1ea7u",type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"Write a solution to delete all duplicate emails, keeping only one unique email with the smallest id. "),(0,l.kt)("p",{parentName:"admonition"},"After running your script, the answer shown is the ",(0,l.kt)("inlineCode",{parentName:"p"},"Person")," table. The driver will first compile and run your piece of code and then show the ",(0,l.kt)("inlineCode",{parentName:"p"},"Person")," table. The final order of the ",(0,l.kt)("inlineCode",{parentName:"p"},"Person")," table does not matter. "),(0,l.kt)("p",{parentName:"admonition"},"The result format is in the following example.")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Example 1:")),(0,l.kt)("p",null,"Input: ",(0,l.kt)("inlineCode",{parentName:"p"},"Person")," table:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"id"),(0,l.kt)("th",{parentName:"tr",align:null},"email"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"john@example.com"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"bob@example.com"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"3"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"john@example.com"))))),(0,l.kt)("p",null,"Output: "),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"id"),(0,l.kt)("th",{parentName:"tr",align:null},"email"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"john@example.com"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"bob@example.com"))))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Explanation: ",(0,l.kt)("inlineCode",{parentName:"li"},"john@example.com")," is repeated two times. We keep the row with the smallest Id = 1.")),(0,l.kt)("h2",{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n"},"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"DELETE FROM Person\nWHERE id NOT IN (\n    SELECT id\n    FROM (\n        SELECT MIN(p.id) as id FROM Person p\n        GROUP BY p.email\n    ) AS c\n);\n")),(0,l.kt)("p",null,"Tham kh\u1ea3o: ",(0,l.kt)("a",{parentName:"p",href:"https://leetcode.com/submissions/detail/1039208682/"},"https://leetcode.com/submissions/detail/1039208682/")))}u.isMDXComponent=!0}}]);