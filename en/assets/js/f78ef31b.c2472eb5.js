"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[5928],{3905:(n,e,t)=>{t.d(e,{Zo:()=>o,kt:()=>g});var a=t(67294);function i(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function h(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function l(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?h(Object(t),!0).forEach((function(e){i(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):h(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function r(n,e){if(null==n)return{};var t,a,i=function(n,e){if(null==n)return{};var t,a,i={},h=Object.keys(n);for(a=0;a<h.length;a++)t=h[a],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(n);for(a=0;a<h.length;a++)t=h[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var c=a.createContext({}),p=function(n){var e=a.useContext(c),t=e;return n&&(t="function"==typeof n?n(e):l(l({},e),n)),t},o=function(n){var e=p(n.components);return a.createElement(c.Provider,{value:e},n.children)},s="mdxType",u={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(n,e){var t=n.components,i=n.mdxType,h=n.originalType,c=n.parentName,o=r(n,["components","mdxType","originalType","parentName"]),s=p(t),d=i,g=s["".concat(c,".").concat(d)]||s[d]||u[d]||h;return t?a.createElement(g,l(l({ref:e},o),{},{components:t})):a.createElement(g,l({ref:e},o))}));function g(n,e){var t=arguments,i=e&&e.mdxType;if("string"==typeof n||i){var h=t.length,l=new Array(h);l[0]=d;var r={};for(var c in e)hasOwnProperty.call(e,c)&&(r[c]=e[c]);r.originalType=n,r[s]="string"==typeof n?n:i,l[1]=r;for(var p=2;p<h;p++)l[p]=t[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},34523:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>h,metadata:()=>r,toc:()=>p});var a=t(87462),i=(t(67294),t(3905));const h={slug:"unsigned-integer-representation",title:"Bi\u1ec3u di\u1ec5n s\u1ed1 nguy\xean d\u01b0\u01a1ng trong c\xe1c h\u1ec7 s\u1ed1",description:"Bi\u1ec3u di\u1ec5n s\u1ed1 nguy\xean d\u01b0\u01a1ng trong h\u1ec7 th\u1eadp ph\xe2n, h\u1ec7 nh\u1ecb ph\xe2n v\xe0 h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n",image:"https://upload.wikimedia.org/wikipedia/commons/4/49/Hexadecimal_digit.png",authors:["tiennhm"],tags:["number-system","data-representation","CAAL","unsigned-integer","binary","hexadecimal","decimal"],keywords:["number-system","data-representation","CAAL","unsigned-integer","binary","hexadecimal","decimal"],enableComments:!0,draft:!1},l=void 0,r={permalink:"/en/blog/unsigned-integer-representation",editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/blog/2024/2024-01-20-data-representation-computer-arithmetic/01.Unsigned-integer-representation.md",source:"@site/blog/2024/2024-01-20-data-representation-computer-arithmetic/01.Unsigned-integer-representation.md",title:"Bi\u1ec3u di\u1ec5n s\u1ed1 nguy\xean d\u01b0\u01a1ng trong c\xe1c h\u1ec7 s\u1ed1",description:"Bi\u1ec3u di\u1ec5n s\u1ed1 nguy\xean d\u01b0\u01a1ng trong h\u1ec7 th\u1eadp ph\xe2n, h\u1ec7 nh\u1ecb ph\xe2n v\xe0 h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n",date:"2024-01-20T00:00:00.000Z",formattedDate:"January 20, 2024",tags:[{label:"number-system",permalink:"/en/blog/tags/number-system"},{label:"data-representation",permalink:"/en/blog/tags/data-representation"},{label:"CAAL",permalink:"/en/blog/tags/caal"},{label:"unsigned-integer",permalink:"/en/blog/tags/unsigned-integer"},{label:"binary",permalink:"/en/blog/tags/binary"},{label:"hexadecimal",permalink:"/en/blog/tags/hexadecimal"},{label:"decimal",permalink:"/en/blog/tags/decimal"}],readingTime:5.915,hasTruncateMarker:!0,authors:[{name:"Nguy\u1ec5n Hu\u1ef3nh Minh Ti\u1ebfn",title:"Middle Fullstack Developer @ Utop.vn",url:"https://github.com/TienNHM",imageURL:"https://github.com/TienNHM.png",key:"tiennhm"}],frontMatter:{slug:"unsigned-integer-representation",title:"Bi\u1ec3u di\u1ec5n s\u1ed1 nguy\xean d\u01b0\u01a1ng trong c\xe1c h\u1ec7 s\u1ed1",description:"Bi\u1ec3u di\u1ec5n s\u1ed1 nguy\xean d\u01b0\u01a1ng trong h\u1ec7 th\u1eadp ph\xe2n, h\u1ec7 nh\u1ecb ph\xe2n v\xe0 h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n",image:"https://upload.wikimedia.org/wikipedia/commons/4/49/Hexadecimal_digit.png",authors:["tiennhm"],tags:["number-system","data-representation","CAAL","unsigned-integer","binary","hexadecimal","decimal"],keywords:["number-system","data-representation","CAAL","unsigned-integer","binary","hexadecimal","decimal"],enableComments:!0,draft:!1},prevItem:{title:"L\xfd thuy\u1ebft h\u1ec7 th\u1ed1ng s\u1ed1 trong m\xe1y t\xednh",permalink:"/en/blog/data-representation"},nextItem:{title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t Apache Zeppelin tr\xean Windows",permalink:"/en/blog/install-zeppelin-on-windows"}},c={authorsImageUrls:[void 0]},p=[{value:"L\xfd thuy\u1ebft",id:"l\xfd-thuy\u1ebft",level:2},{value:"1. C\xe1c h\u1ec7 s\u1ed1 \u0111\u1ebfm th\u01b0\u1eddng s\u1eed d\u1ee5ng trong m\xe1y t\xednh",id:"1-c\xe1c-h\u1ec7-s\u1ed1-\u0111\u1ebfm-th\u01b0\u1eddng-s\u1eed-d\u1ee5ng-trong-m\xe1y-t\xednh",level:3},{value:"2. Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng sang h\u1ec7 th\u1eadp ph\xe2n",id:"2-chuy\u1ec3n-\u0111\u1ed5i-s\u1ed1-nguy\xean-d\u01b0\u01a1ng-sang-h\u1ec7-th\u1eadp-ph\xe2n",level:3},{value:"3. Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng t\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang c\xe1c h\u1ec7 kh\xe1c",id:"3-chuy\u1ec3n-\u0111\u1ed5i-s\u1ed1-nguy\xean-d\u01b0\u01a1ng-t\u1eeb-h\u1ec7-th\u1eadp-ph\xe2n-sang-c\xe1c-h\u1ec7-kh\xe1c",level:3},{value:"3.1. T\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang h\u1ec7 nh\u1ecb ph\xe2n",id:"31-t\u1eeb-h\u1ec7-th\u1eadp-ph\xe2n-sang-h\u1ec7-nh\u1ecb-ph\xe2n",level:4},{value:"3.2. T\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n",id:"32-t\u1eeb-h\u1ec7-th\u1eadp-ph\xe2n-sang-h\u1ec7-th\u1eadp-l\u1ee5c-ph\xe2n",level:4},{value:"3.3. T\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang h\u1ec7 b\xe1t ph\xe2n",id:"33-t\u1eeb-h\u1ec7-th\u1eadp-ph\xe2n-sang-h\u1ec7-b\xe1t-ph\xe2n",level:4},{value:"4. Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng gi\u1eefa h\u1ec7 nh\u1ecb ph\xe2n, h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n v\xe0 h\u1ec7 b\xe1t ph\xe2n",id:"4-chuy\u1ec3n-\u0111\u1ed5i-s\u1ed1-nguy\xean-d\u01b0\u01a1ng-gi\u1eefa-h\u1ec7-nh\u1ecb-ph\xe2n-h\u1ec7-th\u1eadp-l\u1ee5c-ph\xe2n-v\xe0-h\u1ec7-b\xe1t-ph\xe2n",level:3},{value:"C\xe1c c\xf4ng c\u1ee5 h\u1ed7 tr\u1ee3 chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng gi\u1eefa c\xe1c h\u1ec7 s\u1ed1",id:"c\xe1c-c\xf4ng-c\u1ee5-h\u1ed7-tr\u1ee3-chuy\u1ec3n-\u0111\u1ed5i-s\u1ed1-nguy\xean-d\u01b0\u01a1ng-gi\u1eefa-c\xe1c-h\u1ec7-s\u1ed1",level:2},{value:"1. Calculator (Windows)",id:"1-calculator-windows",level:3},{value:"2. RapidTables (Online)",id:"2-rapidtables-online",level:3},{value:"B\xe0i t\u1eadp",id:"b\xe0i-t\u1eadp",level:2},{value:"1. Write each of the following decimal numbers in binary:",id:"1-write-each-of-the-following-decimal-numbers-in-binary",level:4},{value:"2. Write each of the following binary numbers in decimal:",id:"2-write-each-of-the-following-binary-numbers-in-decimal",level:4},{value:"3. Write each of the following binary numbers in hexadecimal:",id:"3-write-each-of-the-following-binary-numbers-in-hexadecimal",level:4},{value:"4. Write each of the following hexadecimal numbers in binary:",id:"4-write-each-of-the-following-hexadecimal-numbers-in-binary",level:4},{value:"5. Write each of the following hexadecimal numbers in decimal:",id:"5-write-each-of-the-following-hexadecimal-numbers-in-decimal",level:4}],o={toc:p},s="wrapper";function u(n){let{components:e,...t}=n;return(0,i.kt)(s,(0,a.Z)({},o,t,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",{align:"right"},(0,i.kt)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Funsigned-integer-representation&label=\u26aaViews&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u v\u1ec1 c\xe1ch bi\u1ec3u di\u1ec5n s\u1ed1 nguy\xean d\u01b0\u01a1ng trong c\xe1c h\u1ec7 s\u1ed1: h\u1ec7 th\u1eadp ph\xe2n, h\u1ec7 nh\u1ecb ph\xe2n v\xe0 h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n."),(0,i.kt)("h2",{id:"l\xfd-thuy\u1ebft"},"L\xfd thuy\u1ebft"),(0,i.kt)("h3",{id:"1-c\xe1c-h\u1ec7-s\u1ed1-\u0111\u1ebfm-th\u01b0\u1eddng-s\u1eed-d\u1ee5ng-trong-m\xe1y-t\xednh"},"1. C\xe1c h\u1ec7 s\u1ed1 \u0111\u1ebfm th\u01b0\u1eddng s\u1eed d\u1ee5ng trong m\xe1y t\xednh"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"C\u01a1 s\u1ed1 c\u1ee7a m\u1ed9t h\u1ec7: l\xe0 s\u1ed1 ch\u1eef s\u1ed1 \u0111\u01b0\u1ee3c d\xf9ng \u0111\u1ec3 bi\u1ec3u di\u1ec5n c\xe1c gi\xe1 tr\u1ecb."),(0,i.kt)("li",{parentName:"ul"},"C\xe1c h\u1ec7 c\u01a1 b\u1ea3n:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"H\u1ec7 nh\u1ecb ph\xe2n (B) hay h\u1ec7 c\u01a1 s\u1ed1 2: d\xf9ng 2 ch\u1eef s\u1ed1 0,1 \u0111\u1ec3 bi\u1ec3u di\u1ec5n t\u1ea5t c\u1ea3 c\xe1c gi\xe1 tr\u1ecb.",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"V\xed d\u1ee5: 1001",(0,i.kt)("sub",null,"2")," = 1001B"))),(0,i.kt)("li",{parentName:"ul"},"H\u1ec7 b\xe1t ph\xe2n (O) hay h\u1ec7 c\u01a1 s\u1ed1 8: d\xf9ng 8 ch\u1eef s\u1ed1 t\u1eeb 0-7 \u0111\u1ec3 bi\u1ec3u di\u1ec5n t\u1ea5t c\u1ea3 c\xe1c gi\xe1 tr\u1ecb.",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"V\xed d\u1ee5: 762",(0,i.kt)("sub",null,"8")," = 762O"))),(0,i.kt)("li",{parentName:"ul"},"H\u1ec7 th\u1eadp ph\xe2n (D) hay h\u1ec7 c\u01a1 s\u1ed1 10: d\xf9ng 10 ch\u1eef s\u1ed1 t\u1eeb 0-9 \u0111\u1ec3 bi\u1ec3u di\u1ec5n t\u1ea5t c\u1ea3 c\xe1c gi\xe1 tr\u1ecb.",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"V\xed d\u1ee5: 1981",(0,i.kt)("sub",null,"10")," = 1981D = 1981"))),(0,i.kt)("li",{parentName:"ul"},"H\u1ec7 th\u1eadp l\u1ee5c ph\xe2n (H) hay h\u1ec7 c\u01a1 s\u1ed1 16: D\xf9ng 16 ch\u1eef - s\u1ed1: 10 s\u1ed1 0,1,2,3,4,5,6,7,8,9 v\xe0 6 ch\u1eef c\xe1i A,B,C,D,E,F \u0111\u1ec3 bi\u1ec3u di\u1ec5n t\u1ea5t c\u1ea3 c\xe1c s\u1ed1.",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"V\xed d\u1ee5: 1B5E",(0,i.kt)("sub",null,"16")," = 1B5EH")))))),(0,i.kt)("h3",{id:"2-chuy\u1ec3n-\u0111\u1ed5i-s\u1ed1-nguy\xean-d\u01b0\u01a1ng-sang-h\u1ec7-th\u1eadp-ph\xe2n"},"2. Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng sang h\u1ec7 th\u1eadp ph\xe2n"),(0,i.kt)("p",{align:"center"},(0,i.kt)("img",{src:"https://res.cloudinary.com/df3zf2d1g/image/upload/v1702198414/docs/caal/01-data-representation-computer-arithmetic/C1-Number-systems-convert-to-decimal_xfbzdr.webp",loading:"lazy",decoding:"async",alt:"convert-to-decimal"})),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"V\xed d\u1ee5:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 1001",(0,i.kt)("sub",null,"2")," sang h\u1ec7 th\u1eadp ph\xe2n:",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"1001",(0,i.kt)("sub",null,"2")," = 1 \xd7 2",(0,i.kt)("sup",null,"3")," + 0 \xd7 2",(0,i.kt)("sup",null,"2")," + 0 \xd7 2",(0,i.kt)("sup",null,"1")," + 1 \xd7 2",(0,i.kt)("sup",null,"0")," = 1 \xd7 8 + 0 \xd7 4 + 0 \xd7 2 + 1 \xd7 1 = 9"))),(0,i.kt)("li",{parentName:"ul"},"Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 1E4A",(0,i.kt)("sub",null,"16")," sang h\u1ec7 th\u1eadp ph\xe2n:",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"1E4A",(0,i.kt)("sub",null,"16")," = 1 \xd7 16",(0,i.kt)("sup",null,"3")," + 14 \xd7 16",(0,i.kt)("sup",null,"2")," + 4 \xd7 16",(0,i.kt)("sup",null,"1")," + 10 \xd7 16",(0,i.kt)("sup",null,"0")," = 7754")))),(0,i.kt)("h3",{id:"3-chuy\u1ec3n-\u0111\u1ed5i-s\u1ed1-nguy\xean-d\u01b0\u01a1ng-t\u1eeb-h\u1ec7-th\u1eadp-ph\xe2n-sang-c\xe1c-h\u1ec7-kh\xe1c"},"3. Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng t\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang c\xe1c h\u1ec7 kh\xe1c"),(0,i.kt)("h4",{id:"31-t\u1eeb-h\u1ec7-th\u1eadp-ph\xe2n-sang-h\u1ec7-nh\u1ecb-ph\xe2n"},"3.1. T\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang h\u1ec7 nh\u1ecb ph\xe2n"),(0,i.kt)("p",null,"\u0110\u1ec3 chuy\u1ec3n \u0111\u1ed5i m\u1ed9t s\u1ed1 nguy\xean d\u01b0\u01a1ng t\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang h\u1ec7 nh\u1ecb ph\xe2n:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Ta th\u1ef1c hi\u1ec7n ph\xe9p chia cho 2, \u0111\u01b0\u1ee3c ph\u1ea7n k\u1ebft qu\u1ea3 ",(0,i.kt)("inlineCode",{parentName:"li"},"m")," v\xe0 ph\u1ea7n d\u01b0 ",(0,i.kt)("inlineCode",{parentName:"li"},"r")," (1 ho\u1eb7c 0)."),(0,i.kt)("li",{parentName:"ul"},"Ti\u1ebfp t\u1ef1c th\u1ef1c hi\u1ec7n ph\xe9p chia ph\u1ea7n k\u1ebft qu\u1ea3 ",(0,i.kt)("inlineCode",{parentName:"li"},"m")," cho 2, cho \u0111\u1ebfn khi k\u1ebft qu\u1ea3 ",(0,i.kt)("inlineCode",{parentName:"li"},"m = 0")," th\xec d\u1eebng."),(0,i.kt)("li",{parentName:"ul"},"Khi \u0111\xf3, gi\xe1 tr\u1ecb nh\u1ecb ph\xe2n c\u1ea7n t\xecm ch\xednh l\xe0 vi\u1ec7c vi\u1ebft l\u1ea7n l\u01b0\u1ee3t ph\u1ea7n d\u01b0 ",(0,i.kt)("inlineCode",{parentName:"li"},"r")," t\u1eeb d\u01b0\u1edbi l\xean.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"}," V\xed d\u1ee5:")),(0,i.kt)("p",{align:"center"},(0,i.kt)("img",{src:"https://res.cloudinary.com/df3zf2d1g/image/upload/v1702200158/docs/caal/01-data-representation-computer-arithmetic/C1-Number-systems-dec2bin_ylfq9g.webp",loading:"lazy",decoding:"async",alt:"dec2bin"})),(0,i.kt)("h4",{id:"32-t\u1eeb-h\u1ec7-th\u1eadp-ph\xe2n-sang-h\u1ec7-th\u1eadp-l\u1ee5c-ph\xe2n"},"3.2. T\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n"),(0,i.kt)("p",{align:"center"},(0,i.kt)("img",{src:"https://res.cloudinary.com/df3zf2d1g/image/upload/v1702200909/docs/caal/01-data-representation-computer-arithmetic/C1-Number-systems-dec2hexpng_kjh3au.webp",loading:"lazy",decoding:"async",alt:"dec2hex"})),(0,i.kt)("h4",{id:"33-t\u1eeb-h\u1ec7-th\u1eadp-ph\xe2n-sang-h\u1ec7-b\xe1t-ph\xe2n"},"3.3. T\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang h\u1ec7 b\xe1t ph\xe2n"),(0,i.kt)("p",null,"Vi\u1ec7c chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng t\u1eeb h\u1ec7 th\u1eadp ph\xe2n sang h\u1ec7 b\xe1t ph\xe2n l\xe0 t\u01b0\u01a1ng t\u1ef1 nh\u01b0 vi\u1ec7c chuy\u1ec3n \u0111\u1ed5i t\u1eeb th\u1eadp ph\xe2n sang nh\u1ecb ph\xe2n/ th\u1eadp l\u1ee5c ph\xe2n, ch\u1ec9 kh\xe1c \u1edf \u0111\xe2y l\xe0 ta th\u1ef1c hi\u1ec7n ph\xe9p chia cho 8."),(0,i.kt)("h3",{id:"4-chuy\u1ec3n-\u0111\u1ed5i-s\u1ed1-nguy\xean-d\u01b0\u01a1ng-gi\u1eefa-h\u1ec7-nh\u1ecb-ph\xe2n-h\u1ec7-th\u1eadp-l\u1ee5c-ph\xe2n-v\xe0-h\u1ec7-b\xe1t-ph\xe2n"},"4. Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng gi\u1eefa h\u1ec7 nh\u1ecb ph\xe2n, h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n v\xe0 h\u1ec7 b\xe1t ph\xe2n"),(0,i.kt)("p",{align:"center"},(0,i.kt)("img",{src:"https://res.cloudinary.com/df3zf2d1g/image/upload/v1702192054/docs/caal/01-data-representation-computer-arithmetic/C1-Number-systems-06_dp3s7c.webp",loading:"lazy",decoding:"async",alt:"6"})),(0,i.kt)("p",{align:"center"},(0,i.kt)("img",{src:"https://res.cloudinary.com/df3zf2d1g/image/upload/v1702192054/docs/caal/01-data-representation-computer-arithmetic/C1-Number-systems-07_ts1oot.webp",loading:"lazy",decoding:"async",alt:"7"})),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"}," V\xed d\u1ee5:")," Chuy\u1ec3n \u0111\u1ed5i s\u1ed1 1011111011111110",(0,i.kt)("sub",null,"2")," sang h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n (H) v\xe0 h\u1ec7 b\xe1t ph\xe2n (O)."),(0,i.kt)("p",{align:"center"},(0,i.kt)("img",{src:"https://res.cloudinary.com/df3zf2d1g/image/upload/v1702201384/docs/caal/01-data-representation-computer-arithmetic/C1-Number-systems-bin2oct2hex_dbezc6.webp",loading:"lazy",decoding:"async",alt:"bin2oct2hex"})),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"V\u1eady: 1011111011111110",(0,i.kt)("sub",null,"2")," = BEFE",(0,i.kt)("sub",null,"16")," = 137376",(0,i.kt)("sub",null,"8"))),(0,i.kt)("h2",{id:"c\xe1c-c\xf4ng-c\u1ee5-h\u1ed7-tr\u1ee3-chuy\u1ec3n-\u0111\u1ed5i-s\u1ed1-nguy\xean-d\u01b0\u01a1ng-gi\u1eefa-c\xe1c-h\u1ec7-s\u1ed1"},"C\xe1c c\xf4ng c\u1ee5 h\u1ed7 tr\u1ee3 chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng gi\u1eefa c\xe1c h\u1ec7 s\u1ed1"),(0,i.kt)("h3",{id:"1-calculator-windows"},"1. Calculator (Windows)"),(0,i.kt)("p",null,"\u0110\u1ec3 th\u1ef1c hi\u1ec7n chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng gi\u1eefa c\xe1c h\u1ec7 s\u1ed1, b\u1ea1n l\xe0m theo c\xe1c b\u01b0\u1edbc sau:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"B\u01b0\u1edbc 1: M\u1edf ",(0,i.kt)("inlineCode",{parentName:"li"},"Calculator")," tr\xean m\xe1y t\xednh."),(0,i.kt)("li",{parentName:"ul"},"B\u01b0\u1edbc 2: Ch\u1ecdn ",(0,i.kt)("inlineCode",{parentName:"li"},"View")," > ",(0,i.kt)("inlineCode",{parentName:"li"},"Programmer")," ho\u1eb7c nh\u1ea5n t\u1ed5 h\u1ee3p ph\xedm ",(0,i.kt)("inlineCode",{parentName:"li"},"Alt + 3"),"."),(0,i.kt)("li",{parentName:"ul"},"B\u01b0\u1edbc 3: Nh\u1eadp s\u1ed1 c\u1ea7n chuy\u1ec3n \u0111\u1ed5i v\xe0o \xf4 ",(0,i.kt)("inlineCode",{parentName:"li"},"Dec")," (h\u1ec7 th\u1eadp ph\xe2n)."),(0,i.kt)("li",{parentName:"ul"},"B\u01b0\u1edbc 4: Ch\u1ecdn h\u1ec7 s\u1ed1 c\u1ea7n chuy\u1ec3n \u0111\u1ed5i \u1edf c\xe1c \xf4 ",(0,i.kt)("inlineCode",{parentName:"li"},"Bin")," (h\u1ec7 nh\u1ecb ph\xe2n), ",(0,i.kt)("inlineCode",{parentName:"li"},"Oct")," (h\u1ec7 b\xe1t ph\xe2n) v\xe0 ",(0,i.kt)("inlineCode",{parentName:"li"},"Hex")," (h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n).")),(0,i.kt)("p",null,"L\u01b0u \xfd: Khi nh\u1eadp s\u1ed1 v\xe0o \xf4 ",(0,i.kt)("inlineCode",{parentName:"p"},"Dec"),", b\u1ea1n ch\u1ec9 \u0111\u01b0\u1ee3c nh\u1eadp c\xe1c ch\u1eef s\u1ed1 t\u1eeb 0-9. N\u1ebfu mu\u1ed1n nh\u1eadp \u0111\u1ea7u v\xe0o l\xe0 s\u1ed1 \u1edf c\xe1c h\u1ec7 kh\xe1c, b\u1ea1n c\u1ea7n ch\u1ecdn l\u1ea1i h\u1ec7 s\u1ed1 tr\u01b0\u1edbc khi nh\u1eadp."),(0,i.kt)("div",{className:"row"},(0,i.kt)("div",{className:"col",style:{display:"flex",justifyContent:"center",flexDirection:"column"}},(0,i.kt)("img",{src:"https://res.cloudinary.com/df3zf2d1g/image/upload/v1702201865/docs/caal/01-data-representation-computer-arithmetic/Calculator-01_vr079k.webp",loading:"lazy",decoding:"async",alt:"Calculator-01"}),(0,i.kt)("h4",{style:{padding:"20px"}},"H\xecnh 1. Ch\u1ecdn `View > Programmer`.")),(0,i.kt)("div",{className:"col",style:{display:"flex",justifyContent:"center",flexDirection:"column"}},(0,i.kt)("img",{src:"https://res.cloudinary.com/df3zf2d1g/image/upload/v1702201865/docs/caal/01-data-representation-computer-arithmetic/Calculator-02_jzmxts.webp",loading:"lazy",decoding:"async",alt:"Calculator-02"}),(0,i.kt)("h4",{style:{padding:"20px"}},"H\xecnh 2. Ch\u1ecdn h\u1ec7 s\u1ed1 tr\u01b0\u1edbc khi nh\u1eadp d\u1eef li\u1ec7u."))),(0,i.kt)("h3",{id:"2-rapidtables-online"},"2. RapidTables (Online)"),(0,i.kt)("p",null,"B\u1ea1n c\xf3 th\u1ec3 s\u1eed d\u1ee5ng trang web ",(0,i.kt)("a",{parentName:"p",href:"https://www.rapidtables.com/convert/number/index.html"},"RapidTables")," \u0111\u1ec3 chuy\u1ec3n \u0111\u1ed5i s\u1ed1 nguy\xean d\u01b0\u01a1ng gi\u1eefa c\xe1c h\u1ec7 s\u1ed1."),(0,i.kt)("img",{src:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.rapidtables.com/opengraph/",loading:"lazy",decoding:"async"}),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Ngo\xe0i ra b\u1ea1n c\xf2n c\xf3 th\u1ec3 s\u1eed d\u1ee5ng c\xe1c trang web sau:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.binaryhexconverter.com/"},"BinaryHexConverter")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://binaryhexconverter.com/decimal-to-hex-converter"},"BinaryHex")),(0,i.kt)("li",{parentName:"ul"},"...")),(0,i.kt)("h2",{id:"b\xe0i-t\u1eadp"},"B\xe0i t\u1eadp"),(0,i.kt)("h4",{id:"1-write-each-of-the-following-decimal-numbers-in-binary"},"1. Write each of the following decimal numbers in binary:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Chuy\u1ec3n c\xe1c s\u1ed1 th\u1eadp ph\xe2n (h\u1ec7 10) sang nh\u1ecb ph\xe2n (h\u1ec7 2)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"a. 2    => 0000 0010            g. 15   => 0000 1111\nb. 7    => 0000 0111            h. 16   => 0001 0000\nc. 5    => 0000 0101            i. 20   => 0001 0100\nd. 8    => 0000 1000            j. 27   => 0001 1011\ne. 9    => 0000 1001            k. 32   => 0010 0000\nf. 12   => 0000 1100            l. 64   => 0100 0000\n")),(0,i.kt)("h4",{id:"2-write-each-of-the-following-binary-numbers-in-decimal"},"2. Write each of the following binary numbers in decimal:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Chuy\u1ec3n c\xe1c s\u1ed1 nh\u1ecb ph\xe2n (h\u1ec7 2) sang th\u1eadp ph\xe2n (h\u1ec7 10)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"a. 00000101 => 5                g.00110000 => 48\nb. 00001111 => 15               h.00100111 => 39\nc. 00010000 => 16               i.01000000 => 64\nd. 00010110 => 22               j.01100011 => 99\ne. 00001011 => 11               k.10100000 => 160\nf. 00011100 => 28               l.10101010 => 170\n")),(0,i.kt)("h4",{id:"3-write-each-of-the-following-binary-numbers-in-hexadecimal"},"3. Write each of the following binary numbers in hexadecimal:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Chuy\u1ec3n c\xe1c s\u1ed1 h\u1ec7 nh\u1ecb ph\xe2n (h\u1ec7 2) sang h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n (h\u1ec7 16)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"a. 00000101 => 0005h    g.00110000 => 0030h\nb. 00001111 => 000Fh    h.00100111 => 0027h\nc. 00010000 => 0010h    i.01001000 => 0048h\nd. 00010110 => 0016h    j.01100011 => 0063h\ne. 00001011 => 000Bh    k.10100000 => 00A0h\nf. 00011100 => 001Ch    l.10101011 => 00ABh\n")),(0,i.kt)("h4",{id:"4-write-each-of-the-following-hexadecimal-numbers-in-binary"},"4. Write each of the following hexadecimal numbers in binary:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Chuy\u1ec3n c\xe1c s\u1ed1 h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n (h\u1ec7 16) sang h\u1ec7 nh\u1ecb ph\xe2n (h\u1ec7 2)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"a. 0005h    => 0000 0101    g. 0030h    => 0011 0000\nb. 000Fh    => 0101 1111    h. 0027h    => 0010 0111\nc. 0010h    => 0001 0000    i. 0048h    => 0100 1000\nd. 0016h    => 0001 0110    j. 0063h    => 0110 0011\ne. 000Bh    => 0000 1011    k. A064h    => 1010 0000 0110 0100\nf. 001Ch    => 0001 1100    l. ABDEh    => 1010 1011 1101 1110\n")),(0,i.kt)("h4",{id:"5-write-each-of-the-following-hexadecimal-numbers-in-decimal"},"5. Write each of the following hexadecimal numbers in decimal:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Chuy\u1ec3n c\xe1c s\u1ed1 h\u1ec7 th\u1eadp l\u1ee5c ph\xe2n (h\u1ec7 16) sang th\u1eadp ph\xe2n (h\u1ec7 10)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"a. 00D5h => 213         g. 0B30h => 2864\nb. 002Fh => 47          h. 06DFh => 1759\nc. 0110h => 272         i. 1AB6h => 6838\nd. 0216h => 534         j. 0A63h => 2659\ne. 004Bh => 75          k. 02A0h => 672\nf. 041Ch => 1052        l. 1FABh => 8107\n")))}u.isMDXComponent=!0}}]);