"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[5159],{3905:(n,e,t)=>{t.d(e,{Zo:()=>g,kt:()=>u});var i=t(67294);function c(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}function r(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){c(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function a(n,e){if(null==n)return{};var t,i,c=function(n,e){if(null==n)return{};var t,i,c={},o=Object.keys(n);for(i=0;i<o.length;i++)t=o[i],e.indexOf(t)>=0||(c[t]=n[t]);return c}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(i=0;i<o.length;i++)t=o[i],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(c[t]=n[t])}return c}var l=i.createContext({}),m=function(n){var e=i.useContext(l),t=e;return n&&(t="function"==typeof n?n(e):r(r({},e),n)),t},g=function(n){var e=m(n.components);return i.createElement(l.Provider,{value:e},n.children)},s="mdxType",h={inlineCode:"code",wrapper:function(n){var e=n.children;return i.createElement(i.Fragment,{},e)}},d=i.forwardRef((function(n,e){var t=n.components,c=n.mdxType,o=n.originalType,l=n.parentName,g=a(n,["components","mdxType","originalType","parentName"]),s=m(t),d=c,u=s["".concat(l,".").concat(d)]||s[d]||h[d]||o;return t?i.createElement(u,r(r({ref:e},g),{},{components:t})):i.createElement(u,r({ref:e},g))}));function u(n,e){var t=arguments,c=e&&e.mdxType;if("string"==typeof n||c){var o=t.length,r=new Array(o);r[0]=d;var a={};for(var l in e)hasOwnProperty.call(e,l)&&(a[l]=e[l]);a.originalType=n,a[s]="string"==typeof n?n:c,r[1]=a;for(var m=2;m<o;m++)r[m]=t[m];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}d.displayName="MDXCreateElement"},73614:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>m});var i=t(87462),c=(t(67294),t(3905));const o={title:"Command Injection",slug:"command-injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Command Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",image:"https://img.youtube.com/vi/H1FNb5Kofjw/0.jpg",sidebar_position:1,sidebar_class_name:"hidden",tags:["web-security","webgoat-7","injection-flaws","command-injection"],keywords:["web security","webgoat 7","injection flaws","command injection","l\u1ed7 h\u1ed5ng command injection","b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","h\u01b0\u1edbng d\u1eabn","t\u1ea5n c\xf4ng","c\xe1ch ph\xf2ng ch\u1ed1ng"]},r="Command Injection",a={unversionedId:"web-security/webgoat-7/injection-flaws/command-injection",id:"web-security/webgoat-7/injection-flaws/command-injection",title:"Command Injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Command Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",source:"@site/docs/02-web-security/webgoat-7/injection-flaws/01.command-injection.md",sourceDirName:"02-web-security/webgoat-7/injection-flaws",slug:"/web-security/webgoat-7/injection-flaws/command-injection",permalink:"/docs/web-security/webgoat-7/injection-flaws/command-injection",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-7/injection-flaws/01.command-injection.md",tags:[{label:"web-security",permalink:"/docs/tags/web-security"},{label:"webgoat-7",permalink:"/docs/tags/webgoat-7"},{label:"injection-flaws",permalink:"/docs/tags/injection-flaws"},{label:"command-injection",permalink:"/docs/tags/command-injection"}],version:"current",lastUpdatedAt:1705822708,formattedLastUpdatedAt:"21 thg 1, 2024",sidebarPosition:1,frontMatter:{title:"Command Injection",slug:"command-injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Command Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",image:"https://img.youtube.com/vi/H1FNb5Kofjw/0.jpg",sidebar_position:1,sidebar_class_name:"hidden",tags:["web-security","webgoat-7","injection-flaws","command-injection"],keywords:["web security","webgoat 7","injection flaws","command injection","l\u1ed7 h\u1ed5ng command injection","b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","h\u01b0\u1edbng d\u1eabn","t\u1ea5n c\xf4ng","c\xe1ch ph\xf2ng ch\u1ed1ng"]},sidebar:"tutorialSidebar",previous:{title:"Injection Flaws",permalink:"/docs/category/injection-flaws"},next:{title:"Numeric SQL Injection",permalink:"/docs/web-security/webgoat-7/injection-flaws/numeric-sql-injection"}},l={},m=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"C\xe1ch khai th\xe1c",id:"c\xe1ch-khai-th\xe1c",level:2},{value:"C\xe1ch ph\xf2ng ch\u1ed1ng",id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],g={toc:m},s="wrapper";function h(n){let{components:e,...t}=n;return(0,c.kt)(s,(0,i.Z)({},g,t,{components:e,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"command-injection"},"Command Injection"),(0,c.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Command Injection. \u0110\xe2y l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng r\u1ea5t nguy hi\u1ec3m, n\xf3 cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server."),(0,c.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u"},"Gi\u1edbi thi\u1ec7u"),(0,c.kt)("p",null,"Command Injection l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server. L\u1ed7 h\u1ed5ng n\xe0y x\u1ea3y ra khi \u1ee9ng d\u1ee5ng web kh\xf4ng ki\u1ec3m tra c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng v\xe0 th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server."),(0,c.kt)("h2",{id:"c\xe1ch-khai-th\xe1c"},"C\xe1ch khai th\xe1c"),(0,c.kt)("p",null,"\u0110\u1ec3 khai th\xe1c l\u1ed7 h\u1ed5ng n\xe0y, attacker s\u1ebd th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server th\xf4ng qua c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng. C\xe1c l\u1ec7nh n\xe0y s\u1ebd \u0111\u01b0\u1ee3c th\u1ef1c thi b\u1edfi \u1ee9ng d\u1ee5ng web."),(0,c.kt)("iframe",{class:"video",src:"https://www.youtube.com/embed/H1FNb5Kofjw",title:"Command Injection",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,c.kt)("h2",{id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng"},"C\xe1ch ph\xf2ng ch\u1ed1ng"),(0,c.kt)("p",null,"\u0110\u1ec3 ph\xf2ng ch\u1ed1ng l\u1ed7 h\u1ed5ng n\xe0y, \u1ee9ng d\u1ee5ng web c\u1ea7n ki\u1ec3m tra c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng v\xe0 kh\xf4ng th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server."),(0,c.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,c.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Command Injection. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."),(0,c.kt)("admonition",{type:"tip"},(0,c.kt)("p",{parentName:"admonition"},"\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,c.kt)("a",{parentName:"p",href:"https://www.youtube.com/TienNguyen09"},"k\xeanh Youtube")," c\u1ee7a m\xecnh.")))}h.isMDXComponent=!0}}]);