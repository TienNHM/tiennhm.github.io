"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[5278],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>k});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var d=r.createContext({}),m=function(e){var t=r.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},s=function(e){var t=m(e.components);return r.createElement(d.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,d=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=m(a),c=n,k=u["".concat(d,".").concat(c)]||u[c]||p[c]||l;return a?r.createElement(k,o(o({ref:t},s),{},{components:a})):r.createElement(k,o({ref:t},s))}));function k(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,o=new Array(l);o[0]=c;var i={};for(var d in t)hasOwnProperty.call(t,d)&&(i[d]=t[d]);i.originalType=e,i[u]="string"==typeof e?e:n,o[1]=i;for(var m=2;m<l;m++)o[m]=a[m];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}c.displayName="MDXCreateElement"},14764:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>m});var r=a(87462),n=(a(67294),a(3905));const l={title:"183. Customers Who Never Order",slug:"183-customers-who-never-order",description:"Write a solution to find all customers who never order anything.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},o="183. Customers Who Never Order",i={unversionedId:"leetcode/database/Customers Who Never Order",id:"leetcode/database/Customers Who Never Order",title:"183. Customers Who Never Order",description:"Write a solution to find all customers who never order anything.",source:"@site/docs/leetcode/database/183. Customers Who Never Order.mdx",sourceDirName:"leetcode/database",slug:"/leetcode/database/183-customers-who-never-order",permalink:"/en/docs/leetcode/database/183-customers-who-never-order",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/leetcode/database/183. Customers Who Never Order.mdx",tags:[{label:"leetcode",permalink:"/en/docs/tags/leetcode"},{label:"database",permalink:"/en/docs/tags/database"}],version:"current",sidebarPosition:1,frontMatter:{title:"183. Customers Who Never Order",slug:"183-customers-who-never-order",description:"Write a solution to find all customers who never order anything.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"182. Duplicate Emails",permalink:"/en/docs/leetcode/database/182-duplicate-emails"},next:{title:"196. Delete Duplicate Emails",permalink:"/en/docs/leetcode/database/196-delete-duplicate-emails"}},d={},m=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}],s={toc:m},u="wrapper";function p(e){let{components:t,...a}=e;return(0,n.kt)(u,(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"183-customers-who-never-order"},"183. Customers Who Never Order"),(0,n.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n"},"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"),(0,n.kt)("p",null,"Chi ti\u1ebft: ",(0,n.kt)("a",{parentName:"p",href:"https://leetcode.com/problems/customers-who-never-order/"},"https://leetcode.com/problems/customers-who-never-order/")),(0,n.kt)("p",null,"Table: ",(0,n.kt)("inlineCode",{parentName:"p"},"Customers")),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Column Name"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"id"),(0,n.kt)("td",{parentName:"tr",align:null},"int")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"name"),(0,n.kt)("td",{parentName:"tr",align:null},"varchar")))),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"id")," is the primary key (column with unique values) for this table."),(0,n.kt)("li",{parentName:"ul"},"Each row of this table indicates the ID and name of a customer.")),(0,n.kt)("p",null,"Table: ",(0,n.kt)("inlineCode",{parentName:"p"},"Orders")),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Column Name"),(0,n.kt)("th",{parentName:"tr",align:null},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"id"),(0,n.kt)("td",{parentName:"tr",align:null},"int")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"customerId"),(0,n.kt)("td",{parentName:"tr",align:null},"int")))),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"id")," is the primary key (column with unique values) for this table."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"customerId")," is a foreign key (reference columns) of the ID from the ",(0,n.kt)("inlineCode",{parentName:"li"},"Customers")," table."),(0,n.kt)("li",{parentName:"ul"},"Each row of this table indicates the ID of an order and the ID of the customer who ordered it.")),(0,n.kt)("admonition",{title:"Y\xeau c\u1ea7u",type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"Write a solution to find all customers who never order anything. "),(0,n.kt)("p",{parentName:"admonition"},"Return the result table in any order. The result format is in the following example.")),(0,n.kt)("p",null,"Example 1:"),(0,n.kt)("p",null,"Input: ",(0,n.kt)("inlineCode",{parentName:"p"},"Customers")," table:"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"id"),(0,n.kt)("th",{parentName:"tr",align:null},"name"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1"),(0,n.kt)("td",{parentName:"tr",align:null},"Joe")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"2"),(0,n.kt)("td",{parentName:"tr",align:null},"Henry")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"3"),(0,n.kt)("td",{parentName:"tr",align:null},"Sam")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"4"),(0,n.kt)("td",{parentName:"tr",align:null},"Max")))),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Orders")," table:"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"id"),(0,n.kt)("th",{parentName:"tr",align:null},"customerId"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"1"),(0,n.kt)("td",{parentName:"tr",align:null},"3")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"2"),(0,n.kt)("td",{parentName:"tr",align:null},"1")))),(0,n.kt)("p",null,"Output: "),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Customers"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Henry")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"Max")))),(0,n.kt)("h2",{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n"},"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT name Customers\nFROM Customers\nWHERE id NOT IN (SELECT customerId FROM Orders);\n")),(0,n.kt)("p",null,"Tham kh\u1ea3o: ",(0,n.kt)("a",{parentName:"p",href:"https://leetcode.com/submissions/detail/1039107765/"},"https://leetcode.com/submissions/detail/1039107765/")))}p.isMDXComponent=!0}}]);