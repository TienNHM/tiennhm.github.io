"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[4092],{35963:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>s,default:()=>a,frontMatter:()=>h,metadata:()=>o,toc:()=>l});var i=n(74848),r=n(28453);const h={title:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh",slug:"process-scheduling-algorithms",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh (process scheduling algorithms) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",image:"https://img.youtube.com/vi/Su3YjXB-tSM/0.jpg",sidebar_position:3,tags:["process-scheduling-algorithms","os","algorithm","fcfs","sjf","round-robin"],keywords:["operating system","os","process scheduling algorithms","algorithm","fcfs","first come first served","shortest job first","sjf","sjf non preemptive","sjf preemptive","round robin","l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh","thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh","sjf \u0111\u1eb7c quy\u1ec1n","sjf kh\xf4ng \u0111\u1eb7c quy\u1ec1n","h\u1ec7 \u0111i\u1ec1u h\xe0nh","thu\u1eadt to\xe1n"],enableComments:!0,draft:!1},s="C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh",o={id:"operating-system/os-process-scheduling-algorithms",title:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh (process scheduling algorithms) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",source:"@site/docs/01-operating-system/03.os-process-scheduling-algorithms.md",sourceDirName:"01-operating-system",slug:"/operating-system/process-scheduling-algorithms",permalink:"/en/docs/operating-system/process-scheduling-algorithms",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/01-operating-system/03.os-process-scheduling-algorithms.md",tags:[{inline:!0,label:"process-scheduling-algorithms",permalink:"/en/docs/tags/process-scheduling-algorithms"},{inline:!0,label:"os",permalink:"/en/docs/tags/os"},{inline:!0,label:"algorithm",permalink:"/en/docs/tags/algorithm"},{inline:!0,label:"fcfs",permalink:"/en/docs/tags/fcfs"},{inline:!0,label:"sjf",permalink:"/en/docs/tags/sjf"},{inline:!0,label:"round-robin",permalink:"/en/docs/tags/round-robin"}],version:"current",lastUpdatedAt:171852689e4,sidebarPosition:3,frontMatter:{title:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh",slug:"process-scheduling-algorithms",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh (process scheduling algorithms) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh.",image:"https://img.youtube.com/vi/Su3YjXB-tSM/0.jpg",sidebar_position:3,tags:["process-scheduling-algorithms","os","algorithm","fcfs","sjf","round-robin"],keywords:["operating system","os","process scheduling algorithms","algorithm","fcfs","first come first served","shortest job first","sjf","sjf non preemptive","sjf preemptive","round robin","l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh","thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh","sjf \u0111\u1eb7c quy\u1ec1n","sjf kh\xf4ng \u0111\u1eb7c quy\u1ec1n","h\u1ec7 \u0111i\u1ec1u h\xe0nh","thu\u1eadt to\xe1n"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"C\xe1c thu\u1eadt to\xe1n thay trang",permalink:"/en/docs/operating-system/page-replacement-algorithms"},next:{title:"Gi\u1ea3i thu\u1eadt Banker",permalink:"/en/docs/operating-system/bankers-algorithm"}},c={},l=[{value:"Gi\u1edbi thi\u1ec7u",id:"gi\u1edbi-thi\u1ec7u",level:2},{value:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh",id:"c\xe1c-thu\u1eadt-to\xe1n-l\u1eadp-l\u1ecbch-ti\u1ebfn-tr\xecnh-1",level:2},{value:"FCFS",id:"fcfs",level:3},{value:"SJF",id:"sjf",level:3},{value:"SJF Non-preemptive",id:"sjf-non-preemptive",level:4},{value:"SJF Preemptive",id:"sjf-preemptive",level:4},{value:"RR",id:"rr",level:3},{value:"Part 1",id:"part-1",level:4},{value:"Part 2",id:"part-2",level:4},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}];function u(t){const e={a:"a",admonition:"admonition",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",...(0,r.R)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"c\xe1c-thu\u1eadt-to\xe1n-l\u1eadp-l\u1ecbch-ti\u1ebfn-tr\xecnh",children:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh"}),"\n",(0,i.jsx)(e.h2,{id:"gi\u1edbi-thi\u1ec7u",children:"Gi\u1edbi thi\u1ec7u"}),"\n",(0,i.jsx)(e.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh s\u1ebd gi\u1edbi thi\u1ec7u c\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh (process scheduling algorithms) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh. C\xe1c thu\u1eadt to\xe1n n\xe0y \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 l\u1eadp l\u1ecbch c\xe1c ti\u1ebfn tr\xecnh (process) trong h\u1ec7 \u0111i\u1ec1u h\xe0nh."}),"\n",(0,i.jsx)(e.h2,{id:"c\xe1c-thu\u1eadt-to\xe1n-l\u1eadp-l\u1ecbch-ti\u1ebfn-tr\xecnh-1",children:"C\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh"}),"\n",(0,i.jsx)(e.h3,{id:"fcfs",children:"FCFS"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n FCFS (First Come First Served) s\u1ebd l\u1eadp l\u1ecbch c\xe1c ti\u1ebfn tr\xecnh theo th\u1ee9 t\u1ef1 \u0111\u1ebfn tr\u01b0\u1edbc th\xec \u0111\u01b0\u1ee3c l\u1eadp l\u1ecbch tr\u01b0\u1edbc. Thu\u1eadt to\xe1n n\xe0y d\u1ec5 hi\u1ec3u v\xe0 d\u1ec5 c\xe0i \u0111\u1eb7t, nh\u01b0ng n\xf3 kh\xf4ng ph\u1ea3i l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u."}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/Su3YjXB-tSM",title:"FCFS (First Come First Served)",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h3,{id:"sjf",children:"SJF"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n SJF (Shortest Job First) s\u1ebd l\u1eadp l\u1ecbch c\xe1c ti\u1ebfn tr\xecnh theo th\u1ee9 t\u1ef1 th\u1eddi gian th\u1ef1c thi ng\u1eafn nh\u1ea5t th\xec \u0111\u01b0\u1ee3c l\u1eadp l\u1ecbch tr\u01b0\u1edbc. Thu\u1eadt to\xe1n n\xe0y l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u nh\u1ea5t, nh\u01b0ng n\xf3 kh\xf4ng th\u1ec3 c\xe0i \u0111\u1eb7t \u0111\u01b0\u1ee3c."}),"\n",(0,i.jsx)(e.h4,{id:"sjf-non-preemptive",children:"SJF Non-preemptive"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n SJF Non-preemptive s\u1ebd l\u1eadp l\u1ecbch c\xe1c ti\u1ebfn tr\xecnh theo th\u1ee9 t\u1ef1 th\u1eddi gian th\u1ef1c thi ng\u1eafn nh\u1ea5t th\xec \u0111\u01b0\u1ee3c l\u1eadp l\u1ecbch tr\u01b0\u1edbc. Thu\u1eadt to\xe1n n\xe0y l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u nh\u1ea5t, nh\u01b0ng n\xf3 kh\xf4ng th\u1ec3 c\xe0i \u0111\u1eb7t \u0111\u01b0\u1ee3c."}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/01sr_mroqBk",title:"SJF Non-preemptive (Shortest Job First Non-preemptive)",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h4,{id:"sjf-preemptive",children:"SJF Preemptive"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n SJF Preemptive s\u1ebd l\u1eadp l\u1ecbch c\xe1c ti\u1ebfn tr\xecnh theo th\u1ee9 t\u1ef1 th\u1eddi gian th\u1ef1c thi ng\u1eafn nh\u1ea5t th\xec \u0111\u01b0\u1ee3c l\u1eadp l\u1ecbch tr\u01b0\u1edbc. Thu\u1eadt to\xe1n n\xe0y l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u nh\u1ea5t, nh\u01b0ng n\xf3 kh\xf4ng th\u1ec3 c\xe0i \u0111\u1eb7t \u0111\u01b0\u1ee3c."}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/iQs6nLTOSCo",title:"SJF (Shortest Job First)",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h3,{id:"rr",children:"RR"}),"\n",(0,i.jsx)(e.p,{children:"Thu\u1eadt to\xe1n RR (Round Robin) s\u1ebd l\u1eadp l\u1ecbch c\xe1c ti\u1ebfn tr\xecnh theo th\u1ee9 t\u1ef1 v\xf2ng tr\xf2n. Thu\u1eadt to\xe1n n\xe0y d\u1ec5 hi\u1ec3u v\xe0 d\u1ec5 c\xe0i \u0111\u1eb7t, nh\u01b0ng n\xf3 kh\xf4ng ph\u1ea3i l\xe0 thu\u1eadt to\xe1n t\u1ed1i \u01b0u."}),"\n",(0,i.jsx)(e.h4,{id:"part-1",children:"Part 1"}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/vW_XC7CJ-6c",title:"RR (Round Robin)",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h4,{id:"part-2",children:"Part 2"}),"\n",(0,i.jsx)("iframe",{class:"video",src:"https://www.youtube.com/embed/Js_FkUmdMvw",title:"RR (Round Robin)",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),"\n",(0,i.jsx)(e.h2,{id:"t\u1ed5ng-k\u1ebft",children:"T\u1ed5ng k\u1ebft"}),"\n",(0,i.jsx)(e.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, m\xecnh \u0111\xe3 gi\u1edbi thi\u1ec7u c\xe1c thu\u1eadt to\xe1n l\u1eadp l\u1ecbch ti\u1ebfn tr\xecnh trong h\u1ec7 \u0111i\u1ec1u h\xe0nh. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n."}),"\n",(0,i.jsx)(e.admonition,{type:"info",children:(0,i.jsx)(e.p,{children:"B\xean c\u1ea1nh c\xe1c thu\u1eadt to\xe1n tr\xean, c\xf2n c\xf3 c\xe1c thu\u1eadt to\xe1n kh\xe1c nh\u01b0: Shortest Remaining Time First, Multilevel Queue, Multilevel Feedback Queue, ... C\xe1c b\u1ea1n c\xf3 th\u1ec3 t\xecm hi\u1ec3u th\xeam v\u1ec1 c\xe1c thu\u1eadt to\xe1n n\xe0y."})}),"\n",(0,i.jsx)(e.admonition,{type:"tip",children:(0,i.jsxs)(e.p,{children:["\u0110\u1ec3 xem th\xeam c\xe1c video kh\xe1c, c\xe1c b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o ",(0,i.jsx)(e.a,{href:"https://www.youtube.com/TienNguyen09",children:"k\xeanh Youtube"})," c\u1ee7a m\xecnh."]})})]})}function a(t={}){const{wrapper:e}={...(0,r.R)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(u,{...t})}):u(t)}},28453:(t,e,n)=>{n.d(e,{R:()=>s,x:()=>o});var i=n(96540);const r={},h=i.createContext(r);function s(t){const e=i.useContext(h);return i.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function o(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:s(t.components),i.createElement(h.Provider,{value:e},t.children)}}}]);