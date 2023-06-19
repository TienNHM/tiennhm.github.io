"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[6437],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),h=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=h(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,c=e.originalType,l=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),m=h(n),s=i,g=m["".concat(l,".").concat(s)]||m[s]||p[s]||c;return n?r.createElement(g,o(o({ref:t},u),{},{components:n})):r.createElement(g,o({ref:t},u))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var c=n.length,o=new Array(c);o[0]=s;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a[m]="string"==typeof e?e:i,o[1]=a;for(var h=2;h<c;h++)o[h]=n[h];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},3015:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>c,metadata:()=>a,toc:()=>h});var r=n(7462),i=(n(7294),n(4137));const c={sidebar_position:1},o="Command Injection",a={unversionedId:"web-security/webgoat-7/Injection Flaws/Command Injection",id:"web-security/webgoat-7/Injection Flaws/Command Injection",title:"Command Injection",description:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Command Injection. \u0110\xe2y l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng r\u1ea5t nguy hi\u1ec3m, n\xf3 cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server.",source:"@site/docs/web-security/webgoat-7/Injection Flaws/01.Command Injection.md",sourceDirName:"web-security/webgoat-7/Injection Flaws",slug:"/web-security/webgoat-7/Injection Flaws/Command Injection",permalink:"/en/docs/web-security/webgoat-7/Injection Flaws/Command Injection",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/web-security/webgoat-7/Injection Flaws/01.Command Injection.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Injection Flaws",permalink:"/en/docs/category/injection-flaws"},next:{title:"Numeric SQL Injection",permalink:"/en/docs/web-security/webgoat-7/Injection Flaws/Numeric SQL Injection"}},l={},h=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"C\xe1ch khai th\xe1c",id:"c\xe1ch-khai-th\xe1c",level:2},{value:"C\xe1ch ph\xf2ng ch\u1ed1ng",id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],u={toc:h},m="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"command-injection"},"Command Injection"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Command Injection. \u0110\xe2y l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng r\u1ea5t nguy hi\u1ec3m, n\xf3 cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server."),(0,i.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u"},"Gi\u1edbi thi\u1ec7u"),(0,i.kt)("p",null,"Command Injection l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server. L\u1ed7 h\u1ed5ng n\xe0y x\u1ea3y ra khi \u1ee9ng d\u1ee5ng web kh\xf4ng ki\u1ec3m tra c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng v\xe0 th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server."),(0,i.kt)("h2",{id:"c\xe1ch-khai-th\xe1c"},"C\xe1ch khai th\xe1c"),(0,i.kt)("p",null,"\u0110\u1ec3 khai th\xe1c l\u1ed7 h\u1ed5ng n\xe0y, attacker s\u1ebd th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server th\xf4ng qua c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng. C\xe1c l\u1ec7nh n\xe0y s\u1ebd \u0111\u01b0\u1ee3c th\u1ef1c thi b\u1edfi \u1ee9ng d\u1ee5ng web."),(0,i.kt)("iframe",{class:"video",src:"https://www.youtube.com/embed/H1FNb5Kofjw",title:"Command Injection",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,i.kt)("h2",{id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng"},"C\xe1ch ph\xf2ng ch\u1ed1ng"),(0,i.kt)("p",null,"\u0110\u1ec3 ph\xf2ng ch\u1ed1ng l\u1ed7 h\u1ed5ng n\xe0y, \u1ee9ng d\u1ee5ng web c\u1ea7n ki\u1ec3m tra c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng v\xe0 kh\xf4ng th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server."),(0,i.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Command Injection. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,i.kt)("a",{parentName:"p",href:"https://www.youtube.com/TienNguyen09"},"k\xeanh Youtube")," c\u1ee7a m\xecnh.")))}p.isMDXComponent=!0}}]);