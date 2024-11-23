"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[6665],{17551:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>h});var i=n(74848),r=n(28453);const o={title:"C\xe1c thu\u1eadt to\xe1n thay trang",slug:"page-replacement-algorithms",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c thu\u1eadt to\xe1n thay trang (page replacement algorithms) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",image:"https://img.youtube.com/vi/r6Uf8mwuo2E/0.jpg",sidebar_position:2,tags:["page-replacement-algorithms","os","algorithm","fifo","optimal","lru","clock"],keywords:["operating system","os","page replacement algorithms","algorithm","fifo","first in first out","optimal","lru","least recently used","lru stack","lru counter","clock","h\u1ec7 \u0111i\u1ec1u h\xe0nh","thu\u1eadt to\xe1n thay trang"],enableComments:!0,draft:!1},a="C\xe1c thu\u1eadt to\xe1n thay trang",c={id:"operating-system/page-replacement-algorithms",title:"C\xe1c thu\u1eadt to\xe1n thay trang",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c thu\u1eadt to\xe1n thay trang (page replacement algorithms) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",source:"@site/docs/01-operating-system/02.page-replacement-algorithms.md",sourceDirName:"01-operating-system",slug:"/operating-system/page-replacement-algorithms",permalink:"/docs/operating-system/page-replacement-algorithms",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/01-operating-system/02.page-replacement-algorithms.md",tags:[{inline:!0,label:"page-replacement-algorithms",permalink:"/docs/tags/page-replacement-algorithms"},{inline:!0,label:"os",permalink:"/docs/tags/os"},{inline:!0,label:"algorithm",permalink:"/docs/tags/algorithm"},{inline:!0,label:"fifo",permalink:"/docs/tags/fifo"},{inline:!0,label:"optimal",permalink:"/docs/tags/optimal"},{inline:!0,label:"lru",permalink:"/docs/tags/lru"},{inline:!0,label:"clock",permalink:"/docs/tags/clock"}],version:"current",lastUpdatedAt:1732381601e3,sidebarPosition:2,frontMatter:{title:"C\xe1c thu\u1eadt to\xe1n thay trang",slug:"page-replacement-algorithms",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c thu\u1eadt to\xe1n thay trang (page replacement algorithms) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",image:"https://img.youtube.com/vi/r6Uf8mwuo2E/0.jpg",sidebar_position:2,tags:["page-replacement-algorithms","os","algorithm","fifo","optimal","lru","clock"],keywords:["operating system","os","page replacement algorithms","algorithm","fifo","first in first out","optimal","lru","least recently used","lru stack","lru counter","clock","h\u1ec7 \u0111i\u1ec1u h\xe0nh","thu\u1eadt to\xe1n thay trang"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"DOS Debug",permalink:"/docs/operating-system/dos-debug"},next:{title:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh",permalink:"/docs/operating-system/process-scheduling-algorithms"}},l={},h=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"C\xe1c thu\u1eadt to\xe1n thay trang",id:"c\xe1c-thu\u1eadt-to\xe1n-thay-trang-1",level:2},{value:"FIFO",id:"fifo",level:3},{value:"Optimal",id:"optimal",level:3},{value:"LRU",id:"lru",level:3},{value:"LRU Stack",id:"lru-stack",level:4},{value:"LRU Counter",id:"lru-counter",level:4},{value:"Clock",id:"clock",level:3},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}];function s(t){const e={a:"a",admonition:"admonition",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",...(0,r.R)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"c\xe1c-thu\u1eadt-to\xe1n-thay-trang",children:"C\xe1c thu\u1eadt to\xe1n thay trang"}),"\n",(0,i.jsx)(e.h2,{id:"gi\u1edbi-thi\u1ec7u",children:"Gi\u1edbi thi\u1ec7u"}),"\n",(0,i.jsx)(e.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u c\xe1c thu\u1eadt to\xe1n thay trang (page replacement algorithms) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh. C\xe1c thu\u1eadt to\xe1n n\xe0y \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 thay th\u1ebf c\xe1c trang (page) trong b\u1ed9 nh\u1edb \u1ea3o (virtual memory) khi b\u1ed9 nh\u1edb \u0111\u1ea7y."}),"\n",(0,i.jsx)(e.h2,{id:"c\xe1c-thu\u1eadt-to\xe1n-thay-trang-1",children:"C\xe1c thu\u1eadt to\xe1n thay trang"}),"\n",(0,i.jsx)(e.h3,{id:"fifo",children:"FIFO"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n FIFO (First In First Out) s\u1ebd thay th\u1ebf trang \u0111\u1ea7u ti\xean \u0111\u01b0\u1ee3c \u0111\u01b0a v\xe0o b\u1ed9 nh\u1edb \u1ea3o. Thu\u1eadt to\xe1n n\xe0y d\u1ec5 hi\u1ec3u v\xe0 d\u1ec5 c\xe0i \u0111\u1eb7t, nh\u01b0ng n\xf3 kh\xf4ng ph\u1ea3i l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u."}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/r6Uf8mwuo2E",title:"FIFO (First In First Out)",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h3,{id:"optimal",children:"Optimal"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n Optimal s\u1ebd thay th\u1ebf trang m\xe0 s\u1ebd kh\xf4ng \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng trong t\u01b0\u01a1ng lai g\u1ea7n nh\u1ea5t. Thu\u1eadt to\xe1n n\xe0y l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u nh\u1ea5t, nh\u01b0ng n\xf3 kh\xf4ng th\u1ec3 c\xe0i \u0111\u1eb7t \u0111\u01b0\u1ee3c."}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/jWWvXr_mIoc",title:"Optimal",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h3,{id:"lru",children:"LRU"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n LRU (Least Recently Used) s\u1ebd thay th\u1ebf trang m\xe0 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng l\xe2u nh\u1ea5t. Thu\u1eadt to\xe1n n\xe0y l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u nh\u1ea5t c\xf3 th\u1ec3 c\xe0i \u0111\u1eb7t \u0111\u01b0\u1ee3c."}),"\n",(0,i.jsx)(e.h4,{id:"lru-stack",children:"LRU Stack"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n LRU Stack s\u1ebd thay th\u1ebf trang m\xe0 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng l\xe2u nh\u1ea5t. Thu\u1eadt to\xe1n n\xe0y l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u nh\u1ea5t c\xf3 th\u1ec3 c\xe0i \u0111\u1eb7t \u0111\u01b0\u1ee3c."}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/TD3Rbda-z2E",title:"LRU Stack",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h4,{id:"lru-counter",children:"LRU Counter"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n LRU Counter s\u1ebd thay th\u1ebf trang m\xe0 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng l\xe2u nh\u1ea5t. Thu\u1eadt to\xe1n n\xe0y l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u nh\u1ea5t c\xf3 th\u1ec3 c\xe0i \u0111\u1eb7t \u0111\u01b0\u1ee3c."}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/fvwBP3GeOa8",title:"LRU Counter",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h3,{id:"clock",children:"Clock"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n Clock s\u1ebd thay th\u1ebf trang m\xe0 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng l\xe2u nh\u1ea5t. Thu\u1eadt to\xe1n n\xe0y kh\xf4ng ph\u1ea3i l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u, nh\u01b0ng n\xf3 c\xf3 th\u1ec3 c\xe0i \u0111\u1eb7t \u0111\u01b0\u1ee3c."}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/p1wV_Ix8pVk",title:"Clock",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h2,{id:"t\u1ed5ng-k\u1ebft",children:"T\u1ed5ng k\u1ebft"}),"\n",(0,i.jsx)(e.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u c\xe1c thu\u1eadt to\xe1n thay trang trong h\u1ec7 \u0111i\u1ec1u h\xe0nh. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."}),"\n",(0,i.jsx)(e.admonition,{type:"info",children:(0,i.jsx)(e.p,{children:"B\xean c\u1ea1nh c\xe1c thu\u1eadt to\xe1n tr\xean, c\xf2n c\xf3 c\xe1c thu\u1eadt to\xe1n kh\xe1c nh\u01b0: MFU, LFU, Second Chance, Enhanced Second Chance, NRU, FIFO Approximation, LRU Approximation, Random, ... C\xe1c b\u1ea1n c\xf3 th\u1ec3 t\xecm hi\u1ec3u th\xeam v\u1ec1 c\xe1c thu\u1eadt to\xe1n n\xe0y."})}),"\n",(0,i.jsx)(e.admonition,{type:"tip",children:(0,i.jsxs)(e.p,{children:["\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,i.jsx)(e.a,{href:"https://www.youtube.com/TienNguyen09",children:"k\xeanh Youtube"})," c\u1ee7a m\xecnh."]})})]})}function u(t={}){const{wrapper:e}={...(0,r.R)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(s,{...t})}):s(t)}},28453:(t,e,n)=>{n.d(e,{R:()=>a,x:()=>c});var i=n(96540);const r={},o=i.createContext(r);function a(t){const e=i.useContext(o);return i.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function c(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:a(t.components),i.createElement(o.Provider,{value:e},t.children)}}}]);