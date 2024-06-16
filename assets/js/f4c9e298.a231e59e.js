"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[2935],{43089:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>h,contentTitle:()=>s,default:()=>g,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var t=i(74848),c=i(28453);const o={title:"Numeric SQL Injection",slug:"numeric-sql-injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",image:"https://img.youtube.com/vi/NMV20hGsm-M/0.jpg",sidebar_position:2,sidebar_class_name:"hidden",tags:["web-security","webgoat-7","injection-flaws","sql-injection"],keywords:["web security","webgoat 7","injection flaws","sql injection","numeric sql injection","l\u1ed7 h\u1ed5ng numeric sql injection","b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","h\u01b0\u1edbng d\u1eabn","t\u1ea5n c\xf4ng","c\xe1ch ph\xf2ng ch\u1ed1ng"]},s="Numeric SQL Injection",r={id:"web-security/webgoat-7/injection-flaws/numeric-sql-injection",title:"Numeric SQL Injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",source:"@site/docs/02-web-security/webgoat-7/injection-flaws/02.numeric-sql-injection.md",sourceDirName:"02-web-security/webgoat-7/injection-flaws",slug:"/web-security/webgoat-7/injection-flaws/numeric-sql-injection",permalink:"/docs/web-security/webgoat-7/injection-flaws/numeric-sql-injection",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-7/injection-flaws/02.numeric-sql-injection.md",tags:[{inline:!0,label:"web-security",permalink:"/docs/tags/web-security"},{inline:!0,label:"webgoat-7",permalink:"/docs/tags/webgoat-7"},{inline:!0,label:"injection-flaws",permalink:"/docs/tags/injection-flaws"},{inline:!0,label:"sql-injection",permalink:"/docs/tags/sql-injection"}],version:"current",lastUpdatedAt:171852689e4,sidebarPosition:2,frontMatter:{title:"Numeric SQL Injection",slug:"numeric-sql-injection",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",image:"https://img.youtube.com/vi/NMV20hGsm-M/0.jpg",sidebar_position:2,sidebar_class_name:"hidden",tags:["web-security","webgoat-7","injection-flaws","sql-injection"],keywords:["web security","webgoat 7","injection flaws","sql injection","numeric sql injection","l\u1ed7 h\u1ed5ng numeric sql injection","b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","h\u01b0\u1edbng d\u1eabn","t\u1ea5n c\xf4ng","c\xe1ch ph\xf2ng ch\u1ed1ng"]},sidebar:"tutorialSidebar",previous:{title:"Command Injection",permalink:"/docs/web-security/webgoat-7/injection-flaws/command-injection"},next:{title:"Log Spoofing",permalink:"/docs/web-security/webgoat-7/injection-flaws/log-spoofing"}},h={},l=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"C\xe1ch khai th\xe1c",id:"c\xe1ch-khai-th\xe1c",level:2},{value:"C\xe1ch ph\xf2ng ch\u1ed1ng",id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}];function a(n){const e={a:"a",admonition:"admonition",h1:"h1",h2:"h2",p:"p",...(0,c.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"numeric-sql-injection",children:"Numeric SQL Injection"}),"\n",(0,t.jsx)(e.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection. \u0110\xe2y l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng r\u1ea5t nguy hi\u1ec3m, n\xf3 cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server."}),"\n",(0,t.jsx)(e.h2,{id:"gi\u1edbi-thi\u1ec7u",children:"Gi\u1edbi thi\u1ec7u"}),"\n",(0,t.jsx)(e.p,{children:"Numeric SQL Injection l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server. L\u1ed7 h\u1ed5ng n\xe0y x\u1ea3y ra khi \u1ee9ng d\u1ee5ng web kh\xf4ng ki\u1ec3m tra c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng v\xe0 th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server."}),"\n",(0,t.jsx)(e.h2,{id:"c\xe1ch-khai-th\xe1c",children:"C\xe1ch khai th\xe1c"}),"\n",(0,t.jsx)(e.p,{children:"\u0110\u1ec3 khai th\xe1c l\u1ed7 h\u1ed5ng n\xe0y, attacker s\u1ebd th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server th\xf4ng qua c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng. C\xe1c l\u1ec7nh n\xe0y s\u1ebd \u0111\u01b0\u1ee3c th\u1ef1c thi b\u1edfi \u1ee9ng d\u1ee5ng web."}),"\n",(0,t.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/NMV20hGsm-M",title:"Numeric SQL Injection",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,t.jsx)(e.h2,{id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng",children:"C\xe1ch ph\xf2ng ch\u1ed1ng"}),"\n",(0,t.jsx)(e.p,{children:"\u0110\u1ec3 ph\xf2ng ch\u1ed1ng l\u1ed7 h\u1ed5ng n\xe0y, \u1ee9ng d\u1ee5ng web c\u1ea7n ki\u1ec3m tra c\xe1c input c\u1ee7a ng\u01b0\u1eddi d\xf9ng v\xe0 kh\xf4ng th\u1ef1c thi c\xe1c l\u1ec7nh SQL tr\xean server."}),"\n",(0,t.jsx)(e.h2,{id:"t\u1ed5ng-k\u1ebft",children:"T\u1ed5ng k\u1ebft"}),"\n",(0,t.jsx)(e.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Numeric SQL Injection. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."}),"\n",(0,t.jsx)(e.admonition,{type:"tip",children:(0,t.jsxs)(e.p,{children:["\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,t.jsx)(e.a,{href:"https://www.youtube.com/TienNguyen09",children:"k\xeanh Youtube"})," c\u1ee7a m\xecnh."]})})]})}function g(n={}){const{wrapper:e}={...(0,c.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(a,{...n})}):a(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>s,x:()=>r});var t=i(96540);const c={},o=t.createContext(c);function s(n){const e=t.useContext(o);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:s(n.components),t.createElement(o.Provider,{value:e},n.children)}}}]);