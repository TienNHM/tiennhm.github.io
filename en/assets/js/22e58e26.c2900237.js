"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[1656],{4137:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>b});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function g(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),s=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):g(g({},n),e)),t},l=function(e){var n=s(e.components);return r.createElement(c.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),d=s(t),p=i,b=d["".concat(c,".").concat(p)]||d[p]||u[p]||o;return t?r.createElement(b,g(g({ref:n},l),{},{components:t})):r.createElement(b,g({ref:n},l))}));function b(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,g=new Array(o);g[0]=p;var a={};for(var c in n)hasOwnProperty.call(n,c)&&(a[c]=n[c]);a.originalType=e,a[d]="string"==typeof e?e:i,g[1]=a;for(var s=2;s<o;s++)g[s]=t[s];return r.createElement.apply(null,g)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},3498:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>g,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>s});var r=t(7462),i=(t(7294),t(4137));const o={title:"DOS Debug",description:"H\u01b0\u1edbng d\u1eabn s\u1eed d\u1ee5ng l\u1ec7nh DEBUG trong DOS \u0111\u1ec3 debug ch\u01b0\u01a1ng tr\xecnh \u0111\u01a1n gi\u1ea3n.",sidebar_position:1,tags:["os","dos","debug","assembly","ascii"],keywords:["operating system","os","dos","debug","assembly","ascii","h\u1ec7 \u0111i\u1ec1u h\xe0nh","l\u1ec7nh debug","h\u1ee3p ng\u1eef","b\u1ea3ng m\xe3 ascii"]},g="DOS Debug",a={unversionedId:"operating-system/dos-debug",id:"operating-system/dos-debug",title:"DOS Debug",description:"H\u01b0\u1edbng d\u1eabn s\u1eed d\u1ee5ng l\u1ec7nh DEBUG trong DOS \u0111\u1ec3 debug ch\u01b0\u01a1ng tr\xecnh \u0111\u01a1n gi\u1ea3n.",source:"@site/docs/operating-system/01.dos-debug.md",sourceDirName:"operating-system",slug:"/operating-system/dos-debug",permalink:"/en/docs/operating-system/dos-debug",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/operating-system/01.dos-debug.md",tags:[{label:"os",permalink:"/en/docs/tags/os"},{label:"dos",permalink:"/en/docs/tags/dos"},{label:"debug",permalink:"/en/docs/tags/debug"},{label:"assembly",permalink:"/en/docs/tags/assembly"},{label:"ascii",permalink:"/en/docs/tags/ascii"}],version:"current",sidebarPosition:1,frontMatter:{title:"DOS Debug",description:"H\u01b0\u1edbng d\u1eabn s\u1eed d\u1ee5ng l\u1ec7nh DEBUG trong DOS \u0111\u1ec3 debug ch\u01b0\u01a1ng tr\xecnh \u0111\u01a1n gi\u1ea3n.",sidebar_position:1,tags:["os","dos","debug","assembly","ascii"],keywords:["operating system","os","dos","debug","assembly","ascii","h\u1ec7 \u0111i\u1ec1u h\xe0nh","l\u1ec7nh debug","h\u1ee3p ng\u1eef","b\u1ea3ng m\xe3 ascii"]},sidebar:"tutorialSidebar",previous:{title:"H\u1ec7 \u0111i\u1ec1u h\xe0nh",permalink:"/en/docs/category/h\u1ec7-\u0111i\u1ec1u-h\xe0nh"},next:{title:"Thu\u1eadt to\xe1n thay trang",permalink:"/en/docs/operating-system/page-replacement-algorithms"}},c={},s=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"H\u01b0\u1edbng d\u1eabn Debug trong DOS",id:"h\u01b0\u1edbng-d\u1eabn-debug-trong-dos",level:2},{value:"H\u01b0\u1edbng d\u1eabn in b\u1ea3ng m\xe3 ASCII b\u1eb1ng h\u1ee3p ng\u1eef",id:"h\u01b0\u1edbng-d\u1eabn-in-b\u1ea3ng-m\xe3-ascii-b\u1eb1ng-h\u1ee3p-ng\u1eef",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],l={toc:s},d="wrapper";function u(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"dos-debug"},"DOS Debug"),(0,i.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u"},"Gi\u1edbi thi\u1ec7u"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1c b\u1ea1n s\u1eed d\u1ee5ng l\u1ec7nh ",(0,i.kt)("inlineCode",{parentName:"p"},"DEBUG")," trong DOS. \u0110\xe2y l\xe0 m\u1ed9t c\xf4ng c\u1ee5 debug r\u1ea5t \u0111\u01a1n gi\u1ea3n, nh\u01b0ng n\xf3 r\u1ea5t h\u1eefu \xedch \u0111\u1ec3 debug c\xe1c ch\u01b0\u01a1ng tr\xecnh \u0111\u01a1n gi\u1ea3n. N\xf3 c\u0169ng r\u1ea5t h\u1eefu \xedch \u0111\u1ec3 h\u1ecdc c\xe1ch m\xe1y t\xednh ho\u1ea1t \u0111\u1ed9ng \u1edf m\u1ee9c low level."),(0,i.kt)("h2",{id:"h\u01b0\u1edbng-d\u1eabn-debug-trong-dos"},"H\u01b0\u1edbng d\u1eabn Debug trong DOS"),(0,i.kt)("p",null,"T\u1ed5ng h\u1ee3p c\xe1c l\u1ec7nh c\u01a1 b\u1ea3n trong DEBUG v\xe0 h\u01b0\u1edbng d\u1eabn debug ch\u01b0\u01a1ng tr\xecnh \u0111\u01a1n gi\u1ea3n."),(0,i.kt)("iframe",{class:"video",src:"https://www.youtube.com/embed/m4hBjXFn-tk",title:"H\u01b0\u1edbng d\u1eabn Debug trong DOS",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,i.kt)("h2",{id:"h\u01b0\u1edbng-d\u1eabn-in-b\u1ea3ng-m\xe3-ascii-b\u1eb1ng-h\u1ee3p-ng\u1eef"},"H\u01b0\u1edbng d\u1eabn in b\u1ea3ng m\xe3 ASCII b\u1eb1ng h\u1ee3p ng\u1eef"),(0,i.kt)("p",null,"Trong video n\xe0y, m\xecnh s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1c b\u1ea1n in ra b\u1ea3ng m\xe3 ASCII b\u1eb1ng h\u1ee3p ng\u1eef. \u0110\xe2y l\xe0 m\u1ed9t b\xe0i t\u1eadp r\u1ea5t hay \u0111\u1ec3 c\xe1c b\u1ea1n luy\u1ec7n t\u1eadp h\u1ee3p ng\u1eef."),(0,i.kt)("iframe",{class:"video",src:"https://www.youtube.com/embed/ckXx1eLZ6U4",title:"H\u01b0\u1edbng d\u1eabn in b\u1ea3ng m\xe3 ASCII b\u1eb1ng h\u1ee3p ng\u1eef",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,i.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 h\u01b0\u1edbng d\u1eabn c\xe1c b\u1ea1n debug ch\u01b0\u01a1ng tr\xecnh \u0111\u01a1n gi\u1ea3n b\u1eb1ng DEBUG. Ngo\xe0i ra, m\xecnh c\u0169ng h\u01b0\u1edbng d\u1eabn c\xe1c b\u1ea1n in ra b\u1ea3ng m\xe3 ASCII b\u1eb1ng h\u1ee3p ng\u1eef. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,i.kt)("a",{parentName:"p",href:"https://www.youtube.com/TienNguyen09"},"k\xeanh Youtube")," c\u1ee7a m\xecnh.")))}u.isMDXComponent=!0}}]);