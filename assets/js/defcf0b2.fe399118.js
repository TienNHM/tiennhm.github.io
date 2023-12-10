"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[8616],{3905:(t,e,r)=>{r.d(e,{Zo:()=>h,kt:()=>p});var n=r(67294);function i(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){i(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}var l=n.createContext({}),c=function(t){var e=n.useContext(l),r=e;return t&&(r="function"==typeof t?t(e):a(a({},e),t)),r},h=function(t){var e=c(t.components);return n.createElement(l.Provider,{value:e},t.children)},u="mdxType",g={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var r=t.components,i=t.mdxType,o=t.originalType,l=t.parentName,h=s(t,["components","mdxType","originalType","parentName"]),u=c(r),m=i,p=u["".concat(l,".").concat(m)]||u[m]||g[m]||o;return r?n.createElement(p,a(a({ref:e},h),{},{components:r})):n.createElement(p,a({ref:e},h))}));function p(t,e){var r=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var o=r.length,a=new Array(o);a[0]=m;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=t,s[u]="string"==typeof t?t:i,a[1]=s;for(var c=2;c<o;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},70673:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>g,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(87462),i=(r(67294),r(3905));const o={title:"Gi\u1ea3i thu\u1eadt Banker",slug:"bankers-algorithm",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm) \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 ph\xe2n b\u1ed5 t\xe0i nguy\xean cho c\xe1c ti\u1ebfn tr\xecnh (process) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",image:"https://img.youtube.com/vi/FIUtUyFx2XU/0.jpg",sidebar_position:4,tags:["operating-system","os","bankers-algorithm","algorithm","banker"],keywords:["operating system","os","bankers algorithm","algorithm","banker"],enableComments:!0,draft:!1},a="Gi\u1ea3i thu\u1eadt Banker",s={unversionedId:"operating-system/os-bankers-algorithm",id:"operating-system/os-bankers-algorithm",title:"Gi\u1ea3i thu\u1eadt Banker",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm) \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 ph\xe2n b\u1ed5 t\xe0i nguy\xean cho c\xe1c ti\u1ebfn tr\xecnh (process) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",source:"@site/docs/01-operating-system/04.os-bankers-algorithm.md",sourceDirName:"01-operating-system",slug:"/operating-system/bankers-algorithm",permalink:"/docs/operating-system/bankers-algorithm",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/01-operating-system/04.os-bankers-algorithm.md",tags:[{label:"operating-system",permalink:"/docs/tags/operating-system"},{label:"os",permalink:"/docs/tags/os"},{label:"bankers-algorithm",permalink:"/docs/tags/bankers-algorithm"},{label:"algorithm",permalink:"/docs/tags/algorithm"},{label:"banker",permalink:"/docs/tags/banker"}],version:"current",sidebarPosition:4,frontMatter:{title:"Gi\u1ea3i thu\u1eadt Banker",slug:"bankers-algorithm",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm) \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 ph\xe2n b\u1ed5 t\xe0i nguy\xean cho c\xe1c ti\u1ebfn tr\xecnh (process) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",image:"https://img.youtube.com/vi/FIUtUyFx2XU/0.jpg",sidebar_position:4,tags:["operating-system","os","bankers-algorithm","algorithm","banker"],keywords:["operating system","os","bankers algorithm","algorithm","banker"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh",permalink:"/docs/operating-system/process-scheduling-algorithms"},next:{title:"B\u1ea3o m\u1eadt web",permalink:"/docs/category/b\u1ea3o-m\u1eadt-web"}},l={},c=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"Gi\u1ea3i thu\u1eadt Banker",id:"gi\u1ea3i-thu\u1eadt-banker-1",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],h={toc:c},u="wrapper";function g(t){let{components:e,...r}=t;return(0,i.kt)(u,(0,n.Z)({},h,r,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"gi\u1ea3i-thu\u1eadt-banker"},"Gi\u1ea3i thu\u1eadt Banker"),(0,i.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u"},"Gi\u1edbi thi\u1ec7u"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u v\u1ec1 gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh. Gi\u1ea3i thu\u1eadt n\xe0y \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 ph\xe2n b\u1ed5 t\xe0i nguy\xean cho c\xe1c ti\u1ebfn tr\xecnh (process) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh."),(0,i.kt)("h2",{id:"gi\u1ea3i-thu\u1eadt-banker-1"},"Gi\u1ea3i thu\u1eadt Banker"),(0,i.kt)("iframe",{class:"video",src:"https://www.youtube.com/embed/FIUtUyFx2XU",title:"Gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm)",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,i.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u v\u1ec1 gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,i.kt)("a",{parentName:"p",href:"https://www.youtube.com/TienNguyen09"},"k\xeanh Youtube")," c\u1ee7a m\xecnh.")))}g.isMDXComponent=!0}}]);