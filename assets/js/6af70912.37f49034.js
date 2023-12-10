"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[9584],{3905:(t,e,a)=>{a.d(e,{Zo:()=>d,kt:()=>c});var n=a(67294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var s=n.createContext({}),p=function(t){var e=n.useContext(s),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},d=function(t){var e=p(t.components);return n.createElement(s.Provider,{value:e},t.children)},m="mdxType",u={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},b=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,s=t.parentName,d=o(t,["components","mdxType","originalType","parentName"]),m=p(a),b=r,c=m["".concat(s,".").concat(b)]||m[b]||u[b]||l;return a?n.createElement(c,i(i({ref:e},d),{},{components:a})):n.createElement(c,i({ref:e},d))}));function c(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=b;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o[m]="string"==typeof t?t:r,i[1]=o;for(var p=2;p<l;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}b.displayName="MDXCreateElement"},5211:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var n=a(87462),r=(a(67294),a(3905));const l={title:"175. Combine Two Tables",slug:"175-combine-two-tables",description:"Write a solution to report the first name, last name, city, and state of each person in the `Person` table. If the address of a `personId` is not present in the `Address` table, report null instead.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},i="175. Combine Two Tables",o={unversionedId:"leetcode/database/Combine Two Tables",id:"leetcode/database/Combine Two Tables",title:"175. Combine Two Tables",description:"Write a solution to report the first name, last name, city, and state of each person in the `Person` table. If the address of a `personId` is not present in the `Address` table, report null instead.",source:"@site/docs/04-leetcode/database/175. Combine Two Tables.mdx",sourceDirName:"04-leetcode/database",slug:"/leetcode/database/175-combine-two-tables",permalink:"/docs/leetcode/database/175-combine-two-tables",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/database/175. Combine Two Tables.mdx",tags:[{label:"leetcode",permalink:"/docs/tags/leetcode"},{label:"database",permalink:"/docs/tags/database"}],version:"current",sidebarPosition:1,frontMatter:{title:"175. Combine Two Tables",slug:"175-combine-two-tables",description:"Write a solution to report the first name, last name, city, and state of each person in the `Person` table. If the address of a `personId` is not present in the `Address` table, report null instead.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"Database",permalink:"/docs/category/database"},next:{title:"176. Second Highest Salary",permalink:"/docs/leetcode/database/176-second-highest-salary"}},s={},p=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}],d={toc:p},m="wrapper";function u(t){let{components:e,...a}=t;return(0,r.kt)(m,(0,n.Z)({},d,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"175-combine-two-tables"},"175. Combine Two Tables"),(0,r.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n"},"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"),(0,r.kt)("p",null,"Chi ti\u1ebft: ",(0,r.kt)("a",{parentName:"p",href:"https://leetcode.com/problems/combine-two-tables"},"https://leetcode.com/problems/combine-two-tables")),(0,r.kt)("p",null,"Table: ",(0,r.kt)("inlineCode",{parentName:"p"},"Person")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Column Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"personId"),(0,r.kt)("td",{parentName:"tr",align:null},"int")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"lastName"),(0,r.kt)("td",{parentName:"tr",align:null},"varchar")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"firstName"),(0,r.kt)("td",{parentName:"tr",align:null},"varchar")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"personId")," is the primary key (column with unique values) for this table."),(0,r.kt)("li",{parentName:"ul"},"This table contains information about the ID of some persons and their first and last names.")),(0,r.kt)("p",null,"Table: ",(0,r.kt)("inlineCode",{parentName:"p"},"Address")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Column Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"addressId"),(0,r.kt)("td",{parentName:"tr",align:null},"int")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"personId"),(0,r.kt)("td",{parentName:"tr",align:null},"int")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"city"),(0,r.kt)("td",{parentName:"tr",align:null},"varchar")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"state"),(0,r.kt)("td",{parentName:"tr",align:null},"varchar")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"addressId")," is the primary key (column with unique values) for this table."),(0,r.kt)("li",{parentName:"ul"},"Each row of this table contains information about the city and state of one person with ID = PersonId.")),(0,r.kt)("admonition",{title:"Y\xeau c\u1ea7u",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Write a solution to report the first name, last name, city, and state of each person in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Person")," table. If the address of a ",(0,r.kt)("inlineCode",{parentName:"p"},"personId")," is not present in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Address")," table, report null instead. "),(0,r.kt)("p",{parentName:"admonition"},"Return the result table in any order. The result format is in the following example.")),(0,r.kt)("p",null,"Example 1:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Input:\n",(0,r.kt)("inlineCode",{parentName:"li"},"Person")," table:")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"personId"),(0,r.kt)("th",{parentName:"tr",align:null},"lastName"),(0,r.kt)("th",{parentName:"tr",align:null},"firstName"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"Wang"),(0,r.kt)("td",{parentName:"tr",align:null},"Allen")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"Alice"),(0,r.kt)("td",{parentName:"tr",align:null},"Bob")))),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Address")," table:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"addressId"),(0,r.kt)("th",{parentName:"tr",align:null},"personId"),(0,r.kt)("th",{parentName:"tr",align:null},"city"),(0,r.kt)("th",{parentName:"tr",align:null},"state"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"New York City"),(0,r.kt)("td",{parentName:"tr",align:null},"New York")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"Leetcode"),(0,r.kt)("td",{parentName:"tr",align:null},"California")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Output: ")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"firstName"),(0,r.kt)("th",{parentName:"tr",align:null},"lastName"),(0,r.kt)("th",{parentName:"tr",align:null},"city"),(0,r.kt)("th",{parentName:"tr",align:null},"state"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Allen"),(0,r.kt)("td",{parentName:"tr",align:null},"Wang"),(0,r.kt)("td",{parentName:"tr",align:null},"Null"),(0,r.kt)("td",{parentName:"tr",align:null},"Null")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Bob"),(0,r.kt)("td",{parentName:"tr",align:null},"Alice"),(0,r.kt)("td",{parentName:"tr",align:null},"New York City"),(0,r.kt)("td",{parentName:"tr",align:null},"New York")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Explanation:\nThere is no address in the address table for the personId = 1 so we return null in their city and state.\naddressId = 1 contains information about the address of personId = 2.")),(0,r.kt)("h2",{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n"},"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n    p.firstName, \n    p.lastName, \n    a.city, \n    a.state\nFROM \n    Person p LEFT JOIN Address a \n    ON p.personId = a.personId;\n")),(0,r.kt)("p",null,"Tham kh\u1ea3o: ",(0,r.kt)("a",{parentName:"p",href:"https://leetcode.com/submissions/detail/1039116460/"},"https://leetcode.com/submissions/detail/1039116460/")))}u.isMDXComponent=!0}}]);