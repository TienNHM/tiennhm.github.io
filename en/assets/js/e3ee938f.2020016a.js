"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[2803],{10468:(n,i,t)=>{t.r(i),t.d(i,{assets:()=>l,contentTitle:()=>g,default:()=>a,frontMatter:()=>c,metadata:()=>h,toc:()=>s});var e=t(74848),o=t(28453);const c={title:"Log Spoofing",slug:"log-spoofing",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Log Spoofing trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",image:"https://img.youtube.com/vi/ajCyV1xkMGI/0.jpg",sidebar_position:2,sidebar_class_name:"hidden",tags:["web-security","webgoat-7","injection-flaws","sql-injection"],keywords:["web security","webgoat 7","injection flaws","sql injection","log spoofing","l\u1ed7 h\u1ed5ng log spoofing","b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","h\u01b0\u1edbng d\u1eabn","t\u1ea5n c\xf4ng","c\xe1ch ph\xf2ng ch\u1ed1ng"]},g="Log Spoofing",h={id:"web-security/webgoat-7/injection-flaws/log-spoofing",title:"Log Spoofing",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Log Spoofing trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",source:"@site/docs/02-web-security/webgoat-7/injection-flaws/03.log-spoofing.md",sourceDirName:"02-web-security/webgoat-7/injection-flaws",slug:"/web-security/webgoat-7/injection-flaws/log-spoofing",permalink:"/en/docs/web-security/webgoat-7/injection-flaws/log-spoofing",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-7/injection-flaws/03.log-spoofing.md",tags:[{inline:!0,label:"web-security",permalink:"/en/docs/tags/web-security"},{inline:!0,label:"webgoat-7",permalink:"/en/docs/tags/webgoat-7"},{inline:!0,label:"injection-flaws",permalink:"/en/docs/tags/injection-flaws"},{inline:!0,label:"sql-injection",permalink:"/en/docs/tags/sql-injection"}],version:"current",lastUpdatedAt:1719026687e3,sidebarPosition:2,frontMatter:{title:"Log Spoofing",slug:"log-spoofing",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Log Spoofing trong b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web.",image:"https://img.youtube.com/vi/ajCyV1xkMGI/0.jpg",sidebar_position:2,sidebar_class_name:"hidden",tags:["web-security","webgoat-7","injection-flaws","sql-injection"],keywords:["web security","webgoat 7","injection flaws","sql injection","log spoofing","l\u1ed7 h\u1ed5ng log spoofing","b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt \u1ee9ng d\u1ee5ng web","h\u01b0\u1edbng d\u1eabn","t\u1ea5n c\xf4ng","c\xe1ch ph\xf2ng ch\u1ed1ng"]},sidebar:"tutorialSidebar",previous:{title:"Numeric SQL Injection",permalink:"/en/docs/web-security/webgoat-7/injection-flaws/numeric-sql-injection"},next:{title:"LeetCode",permalink:"/en/docs/category/leetcode"}},l={},s=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"C\xe1ch khai th\xe1c",id:"c\xe1ch-khai-th\xe1c",level:2},{value:"C\xe1ch ph\xf2ng ch\u1ed1ng",id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}];function r(n){const i={a:"a",admonition:"admonition",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,o.R)(),...n.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(i.h1,{id:"log-spoofing",children:"Log Spoofing"}),"\n",(0,e.jsx)(i.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Log Spoofing. \u0110\xe2y l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng r\u1ea5t nguy hi\u1ec3m, n\xf3 cho ph\xe9p attacker th\u1ef1c thi c\xe1c l\u1ec7nh tr\xean server."}),"\n",(0,e.jsx)(i.h2,{id:"gi\u1edbi-thi\u1ec7u",children:"Gi\u1edbi thi\u1ec7u"}),"\n",(0,e.jsx)(i.p,{children:"Log Spoofing l\xe0 m\u1ed9t h\xecnh th\u1ee9c l\u1eeba \u0111\u1ea3o m\xe0 k\u1ebb t\u1ea5n c\xf4ng gi\u1ea3 m\u1ea1o c\xe1c ngu\u1ed3n \u0111\xe1ng tin c\u1eady, c\xf3 th\u1ec3 g\xe2y ra nhi\u1ec1u r\u1ee7i ro cho ng\u01b0\u1eddi d\xf9ng nh\u01b0 b\u1ecb \u0111\xe1nh c\u1eafp t\xe0i kho\u1ea3n, b\u1ecb c\xe0i \u0111\u1eb7t ph\u1ea7n m\u1ec1m \u0111\u1ed9c h\u1ea1i ho\u1eb7c b\u1ecb l\u1eeba ti\u1ec1n."}),"\n",(0,e.jsx)(i.h2,{id:"c\xe1ch-khai-th\xe1c",children:"C\xe1ch khai th\xe1c"}),"\n",(0,e.jsx)(i.p,{children:"\u0110\u1ec3 khai th\xe1c l\u1ed7 h\u1ed5ng n\xe0y, attacker g\u1eedi c\xe1c th\xf4ng tin gi\u1ea3 m\u1ea1o c\xe1c ngu\u1ed3n \u0111\xe1ng tin c\u1eady nh\u01b0 \u0111\u1ecba ch\u1ec9 email, t\xean, s\u1ed1 \u0111i\u1ec7n tho\u1ea1i, SMS ho\u1eb7c URL trang web \u0111\u1ec3 l\u1ea5y th\xf4ng tin c\xe1 nh\xe2n c\u1ee7a ng\u01b0\u1eddi d\xf9ng. Log Spoofing c\xf3 nhi\u1ec1u lo\u1ea1i, bao g\u1ed3m gi\u1ea3 m\u1ea1o email, gi\u1ea3 m\u1ea1o tin nh\u1eafn, gi\u1ea3 m\u1ea1o ID ng\u01b0\u1eddi g\u1ecdi, gi\u1ea3 m\u1ea1o URL v\xe0 gi\u1ea3 m\u1ea1o GPS."}),"\n",(0,e.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/ajCyV1xkMGI",title:"Log Spoofing",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,e.jsx)(i.h2,{id:"c\xe1ch-ph\xf2ng-ch\u1ed1ng",children:"C\xe1ch ph\xf2ng ch\u1ed1ng"}),"\n",(0,e.jsx)(i.p,{children:"C\xe1ch ph\xf2ng ch\u1ed1ng Log Spoofing l\xe0 m\u1ed9t v\u1ea5n \u0111\u1ec1 quan tr\u1ecdng \u0111\u1ec3 b\u1ea3o v\u1ec7 th\xf4ng tin c\xe1 nh\xe2n v\xe0 an ninh m\u1ea1ng. M\u1ed9t s\u1ed1 c\xe1ch ph\xf2ng ch\u1ed1ng Log Spoofing c\xf3 th\u1ec3 l\xe0:"}),"\n",(0,e.jsxs)(i.ul,{children:["\n",(0,e.jsx)(i.li,{children:"B\u1eadt ch\u1ebf \u0111\u1ed9 l\u1ecdc th\u01b0 r\xe1c trong Email \u0111\u1ec3 ng\u0103n ch\u1eb7n c\xe1c Email Spoofing truy c\u1eadp v\xe0o h\u1ed9p th\u01b0 \u0111\u1ebfn."}),"\n",(0,e.jsx)(i.li,{children:"Kh\xf4ng nh\u1ea5p v\xe0o c\xe1c link ho\u1eb7c t\u1ec7p \u0111\xednh k\xe8m y\xeau trong Email, SMS ho\u1eb7c cu\u1ed9c g\u1ecdi \u0111\xe1ng ng\u1edd."}),"\n",(0,e.jsx)(i.li,{children:"Kh\xf4ng cung c\u1ea5p th\xf4ng tin c\xe1 nh\xe2n cho b\u1ea5t k\u1ef3 cu\u1ed9c \u0111i\u1ec1u tra t\xecm ki\u1ebfm c\xe1 nh\xe2n \u0111\xe1ng ng\u1edd n\xe0o."}),"\n",(0,e.jsx)(i.li,{children:"Thay \u0111\u1ed5i c\xe0i \u0111\u1eb7t trong Windows b\u1eb1ng c\xe1ch nh\u1ea5p v\xe0o tab \u201cView\u201d trong File Explorer v\xe0o ch\u1ecdn h\u1ed9p \u0111\u1ec3 hi\u1ec3n th\u1ecb ph\u1ea7n m\u1edf r\u1ed9ng t\u1ec7p. Sau \u0111\xf3 ng\u01b0\u1eddi d\xf9ng c\xf3 th\u1ec3 xem b\u1ea5t k\u1ef3 ti\u1ec7n \xedch m\u1edf r\u1ed9ng Spoofing n\xe0o v\xe0 tr\xe1nh m\u1edf c\xe1c t\u1ec7p \u0111\u1ed9c h\u1ea1i."}),"\n",(0,e.jsx)(i.li,{children:"S\u1eed d\u1ee5ng c\xe1c ph\u1ea7n m\u1ec1m an ninh m\u1ea1ng uy t\xedn c\xf3 kh\u1ea3 n\u0103ng ph\xe1t hi\u1ec7n v\xe0 c\u1ea3nh b\xe1o c\xe1c m\u1ed1i \u0111e d\u1ecda ti\u1ec1m \u1ea9n. Ng\u0103n ch\u1eb7n t\u1ea3i xu\u1ed1ng v\xe0 ng\u0103n ph\u1ea7n m\u1ec1m \u0111\u1ed9c h\u1ea1i x\xe2m nh\u1eadp v\xe0o h\u1ec7 th\u1ed1ng."}),"\n",(0,e.jsx)(i.li,{children:"C\u1eadp nh\u1eadt l\xean phi\xean b\u1ea3n Log4j 2.17.1 \u0111\u1ec3 kh\u1eafc ph\u1ee5c l\u1ed7 h\u1ed5ng CVE-2021-44228."}),"\n"]}),"\n",(0,e.jsx)(i.h2,{id:"t\u1ed5ng-k\u1ebft",children:"T\u1ed5ng k\u1ebft"}),"\n",(0,e.jsx)(i.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u v\u1ec1 l\u1ed7 h\u1ed5ng Log Spoofing. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."}),"\n",(0,e.jsx)(i.admonition,{type:"tip",children:(0,e.jsxs)(i.p,{children:["\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,e.jsx)(i.a,{href:"https://www.youtube.com/TienNguyen09",children:"k\xeanh Youtube"})," c\u1ee7a m\xecnh."]})})]})}function a(n={}){const{wrapper:i}={...(0,o.R)(),...n.components};return i?(0,e.jsx)(i,{...n,children:(0,e.jsx)(r,{...n})}):r(n)}},28453:(n,i,t)=>{t.d(i,{R:()=>g,x:()=>h});var e=t(96540);const o={},c=e.createContext(o);function g(n){const i=e.useContext(c);return e.useMemo((function(){return"function"==typeof n?n(i):{...i,...n}}),[i,n])}function h(n){let i;return i=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:g(n.components),e.createElement(c.Provider,{value:i},n.children)}}}]);