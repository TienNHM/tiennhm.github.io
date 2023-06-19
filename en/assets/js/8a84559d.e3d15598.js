"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[7623],{4137:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>g});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},l=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(r),m=i,g=p["".concat(s,".").concat(m)]||p[m]||h[m]||o;return r?n.createElement(g,a(a({ref:t},l),{},{components:r})):n.createElement(g,a({ref:t},l))}));function g(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[p]="string"==typeof e?e:i,a[1]=c;for(var u=2;u<o;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3042:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var n=r(7462),i=(r(7294),r(4137));const o={sidebar_position:4},a="Gi\u1ea3i thu\u1eadt Banker",c={unversionedId:"operating-system/os-bankers-algorithm",id:"operating-system/os-bankers-algorithm",title:"Gi\u1ea3i thu\u1eadt Banker",description:"Gi\u1edbi thi\u1ec7u",source:"@site/docs/operating-system/04.os-bankers-algorithm.md",sourceDirName:"operating-system",slug:"/operating-system/os-bankers-algorithm",permalink:"/en/docs/operating-system/os-bankers-algorithm",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/operating-system/04.os-bankers-algorithm.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh",permalink:"/en/docs/operating-system/os-process-scheduling-algorithms"}},s={},u=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"Gi\u1ea3i thu\u1eadt Banker",id:"gi\u1ea3i-thu\u1eadt-banker-1",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],l={toc:u},p="wrapper";function h(e){let{components:t,...r}=e;return(0,i.kt)(p,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"gi\u1ea3i-thu\u1eadt-banker"},"Gi\u1ea3i thu\u1eadt Banker"),(0,i.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u"},"Gi\u1edbi thi\u1ec7u"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u v\u1ec1 gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh. Gi\u1ea3i thu\u1eadt n\xe0y \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 ph\xe2n b\u1ed5 t\xe0i nguy\xean cho c\xe1c ti\u1ebfn tr\xecnh (process) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh."),(0,i.kt)("h2",{id:"gi\u1ea3i-thu\u1eadt-banker-1"},"Gi\u1ea3i thu\u1eadt Banker"),(0,i.kt)("iframe",{class:"video",src:"https://www.youtube.com/embed/FIUtUyFx2XU",title:"Gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm)",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,i.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u v\u1ec1 gi\u1ea3i thu\u1eadt Banker (Banker's Algorithm) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,i.kt)("a",{parentName:"p",href:"https://www.youtube.com/TienNguyen09"},"k\xeanh Youtube")," c\u1ee7a m\xecnh.")))}h.isMDXComponent=!0}}]);