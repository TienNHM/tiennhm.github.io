"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[6581],{4137:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>p});var i=t(7294);function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,i,c=function(e,n){if(null==e)return{};var t,i,c={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(c[t]=e[t]);return c}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(c[t]=e[t])}return c}var l=i.createContext({}),s=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=s(e.components);return i.createElement(l.Provider,{value:n},e.children)},g="mdxType",h={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,c=e.mdxType,r=e.originalType,l=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),g=s(t),m=c,p=g["".concat(l,".").concat(m)]||g[m]||h[m]||r;return t?i.createElement(p,o(o({ref:n},u),{},{components:t})):i.createElement(p,o({ref:n},u))}));function p(e,n){var t=arguments,c=n&&n.mdxType;if("string"==typeof e||c){var r=t.length,o=new Array(r);o[0]=m;var a={};for(var l in n)hasOwnProperty.call(n,l)&&(a[l]=n[l]);a.originalType=e,a[g]="string"==typeof e?e:c,o[1]=a;for(var s=2;s<r;s++)o[s]=t[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9712:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>s});var i=t(7462),c=(t(7294),t(4137));const r={title:"Numeric SQL Injection",slug:"numeric-sql-injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",image:"https://img.youtube.com/vi/NMV20hGsm-M/0.jpg",sidebar_position:2,tags:["web-security","webgoat-7","injection-flaws","sql-injection"],keywords:["web security","webgoat 7","injection flaws","sql injection","numeric sql injection","l\u1ed7 h\u1ed5ng numeric sql injection","b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","h\u01b0\u1edbng d\u1eabn","t\u1ea5n c\xf4ng","c\xe1ch ph\xf2ng ch\u1ed1ng"]},o="Numeric SQL Injection",a={unversionedId:"web-security/webgoat-7/injection-flaws/numeric-sql-injection",id:"web-security/webgoat-7/injection-flaws/numeric-sql-injection",title:"Numeric SQL Injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",source:"@site/docs/web-security/webgoat-7/injection-flaws/02.numeric-sql-injection.md",sourceDirName:"web-security/webgoat-7/injection-flaws",slug:"/web-security/webgoat-7/injection-flaws/numeric-sql-injection",permalink:"/en/docs/web-security/webgoat-7/injection-flaws/numeric-sql-injection",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/web-security/webgoat-7/injection-flaws/02.numeric-sql-injection.md",tags:[{label:"web-security",permalink:"/en/docs/tags/web-security"},{label:"webgoat-7",permalink:"/en/docs/tags/webgoat-7"},{label:"injection-flaws",permalink:"/en/docs/tags/injection-flaws"},{label:"sql-injection",permalink:"/en/docs/tags/sql-injection"}],version:"current",sidebarPosition:2,frontMatter:{title:"Numeric SQL Injection",slug:"numeric-sql-injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",image:"https://img.youtube.com/vi/NMV20hGsm-M/0.jpg",sidebar_position:2,tags:["web-security","webgoat-7","injection-flaws","sql-injection"],keywords:["web security","webgoat 7","injection flaws","sql injection","numeric sql injection","l\u1ed7 h\u1ed5ng numeric sql injection","b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","h\u01b0\u1edbng d\u1eabn","t\u1ea5n c\xf4ng","c\xe1ch ph\xf2ng ch\u1ed1ng"]},sidebar:"tutorialSidebar",previous:{title:"Command Injection",permalink:"/en/docs/web-security/webgoat-7/injection-flaws/command-injection"},next:{title:"Log Spoofing",permalink:"/en/docs/web-security/webgoat-7/injection-flaws/log-spoofing"}},l={},s=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"C\xe1ch khai th\xe1c",id:"c\xe1ch-khai-th\xe1c",level:2},{value:"C\xe1ch ph\xf2ng ch\u1ed1ng",id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],u={toc:s},g="wrapper";function h(e){let{components:n,...t}=e;return(0,c.kt)(g,(0,i.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"numeric-sql-injection"},"Numeric SQL Injection"),(0,c.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection. \u0110\xe2y l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng r\u1ea5t nguy hi\u1ec3m, n\xf3 cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server."),(0,c.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u"},"Gi\u1edbi thi\u1ec7u"),(0,c.kt)("p",null,"Numeric SQL Injection l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server. L\u1ed7 h\u1ed5ng n\xe0y x\u1ea3y ra khi \u1ee9ng d\u1ee5ng web kh\xf4ng ki\u1ec3m tra c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng v\xe0 th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server."),(0,c.kt)("h2",{id:"c\xe1ch-khai-th\xe1c"},"C\xe1ch khai th\xe1c"),(0,c.kt)("p",null,"\u0110\u1ec3 khai th\xe1c l\u1ed7 h\u1ed5ng n\xe0y, attacker s\u1ebd th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server th\xf4ng qua c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng. C\xe1c l\u1ec7nh n\xe0y s\u1ebd \u0111\u01b0\u1ee3c th\u1ef1c thi b\u1edfi \u1ee9ng d\u1ee5ng web."),(0,c.kt)("iframe",{class:"video",src:"https://www.youtube.com/embed/NMV20hGsm-M",title:"Numeric SQL Injection",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,c.kt)("h2",{id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng"},"C\xe1ch ph\xf2ng ch\u1ed1ng"),(0,c.kt)("p",null,"\u0110\u1ec3 ph\xf2ng ch\u1ed1ng l\u1ed7 h\u1ed5ng n\xe0y, \u1ee9ng d\u1ee5ng web c\u1ea7n ki\u1ec3m tra c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng v\xe0 kh\xf4ng th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server."),(0,c.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,c.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."),(0,c.kt)("admonition",{type:"tip"},(0,c.kt)("p",{parentName:"admonition"},"\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,c.kt)("a",{parentName:"p",href:"https://www.youtube.com/TienNguyen09"},"k\xeanh Youtube")," c\u1ee7a m\xecnh.")))}h.isMDXComponent=!0}}]);