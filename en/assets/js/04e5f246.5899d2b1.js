"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[4543],{37636:(e,n,c)=>{c.r(n),c.d(n,{assets:()=>h,contentTitle:()=>i,default:()=>a,frontMatter:()=>t,metadata:()=>o,toc:()=>l});var s=c(74848),r=c(28453);const t={title:"05 | Insecure Direct Object References",slug:"insecure-direct-object-references-05",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Insecure Direct Object References tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:2,tags:["web-security","webgoat","broken-access-control","insecure-direct-object-references","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","insecure-direct-object-references","webgoat-2023.8"],enableComments:!0,draft:!1},i=void 0,o={id:"web-security/webgoat-2023.8/A1-Broken-Access-Control/Insecure-Direct-Object-References-05",title:"05 | Insecure Direct Object References",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Insecure Direct Object References tr\xean WebGoat 2023.8",source:"@site/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Insecure-Direct-Object-References-05.md",sourceDirName:"02-web-security/webgoat-2023.8/A1-Broken-Access-Control",slug:"/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-05",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-05",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Insecure-Direct-Object-References-05.md",tags:[{inline:!0,label:"web-security",permalink:"/en/docs/tags/web-security"},{inline:!0,label:"webgoat",permalink:"/en/docs/tags/webgoat"},{inline:!0,label:"broken-access-control",permalink:"/en/docs/tags/broken-access-control"},{inline:!0,label:"insecure-direct-object-references",permalink:"/en/docs/tags/insecure-direct-object-references"},{inline:!0,label:"webgoat-2023.8",permalink:"/en/docs/tags/webgoat-2023-8"}],version:"current",lastUpdatedAt:1742144389e3,sidebarPosition:2,frontMatter:{title:"05 | Insecure Direct Object References",slug:"insecure-direct-object-references-05",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Insecure Direct Object References tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:2,tags:["web-security","webgoat","broken-access-control","insecure-direct-object-references","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","insecure-direct-object-references","webgoat-2023.8"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"04 | Insecure Direct Object References",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-04"},next:{title:"06 | Insecure Direct Object References",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06"}},h={},l=[{value:"<strong>1\ufe0f\u20e3 Xem h\u1ed3 s\u01a1 c\u1ee7a ng\u01b0\u1eddi kh\xe1c</strong>",id:"1\ufe0f\u20e3-xem-h\u1ed3-s\u01a1-c\u1ee7a-ng\u01b0\u1eddi-kh\xe1c",level:4},{value:"<strong>C\xe1ch th\u1ef1c hi\u1ec7n</strong>",id:"c\xe1ch-th\u1ef1c-hi\u1ec7n",level:4},{value:"<strong>2\ufe0f\u20e3 Ch\u1ec9nh s\u1eeda h\u1ed3 s\u01a1 ng\u01b0\u1eddi kh\xe1c</strong>",id:"2\ufe0f\u20e3-ch\u1ec9nh-s\u1eeda-h\u1ed3-s\u01a1-ng\u01b0\u1eddi-kh\xe1c",level:4},{value:"<strong>C\xe1ch th\u1ef1c hi\u1ec7n</strong>",id:"c\xe1ch-th\u1ef1c-hi\u1ec7n-1",level:4},{value:"<strong>\ud83d\udccc V\xed d\u1ee5 Payload (<code>PUT</code> Request)</strong>",id:"-v\xed-d\u1ee5-payload-put-request",level:4}];function d(e){const n={a:"a",blockquote:"blockquote",br:"br",code:"code",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Playing with the Patterns"})}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"1\ufe0f\u20e3-xem-h\u1ed3-s\u01a1-c\u1ee7a-ng\u01b0\u1eddi-kh\xe1c",children:(0,s.jsx)(n.strong,{children:"1\ufe0f\u20e3 Xem h\u1ed3 s\u01a1 c\u1ee7a ng\u01b0\u1eddi kh\xe1c"})}),"\n",(0,s.jsx)(n.p,{children:"B\u1ea1n \u0111\xe3 t\xecm ra c\xe1ch xem h\u1ed3 s\u01a1 c\u1ee7a m\xecnh b\u1eb1ng \u0111\u01b0\u1eddng d\u1eabn:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"WebGoat/IDOR/profile/2342384\n"})}),"\n",(0,s.jsxs)(n.p,{children:["T\u01b0\u01a1ng t\u1ef1, \u0111\u1ec3 xem ",(0,s.jsx)(n.strong,{children:"h\u1ed3 s\u01a1 c\u1ee7a ng\u01b0\u1eddi kh\xe1c"}),", b\u1ea1n c\xf3 th\u1ec3 ",(0,s.jsx)(n.strong,{children:"thay \u0111\u1ed5i ID"})," trong URL."]}),"\n",(0,s.jsx)(n.h4,{id:"c\xe1ch-th\u1ef1c-hi\u1ec7n",children:(0,s.jsx)(n.strong,{children:"C\xe1ch th\u1ef1c hi\u1ec7n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"C\xe1ch 1:"})," D\xf9ng ",(0,s.jsx)(n.strong,{children:"Developer Tools (F12)"})," \u2192 ",(0,s.jsx)(n.strong,{children:"Intercept request"})," v\xe0 thay \u0111\u1ed5i ID"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"C\xe1ch 2:"})," D\xf9ng ",(0,s.jsx)(n.strong,{children:"tr\xecnh duy\u1ec7t"})," v\xe0 nh\u1eadp URL theo m\u1eabu:","\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-plaintext",children:"WebGoat/IDOR/profile/{otherUserId}\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"C\xe1ch 3:"})," S\u1eed d\u1ee5ng ",(0,s.jsx)(n.strong,{children:"c\xf4ng c\u1ee5 nh\u01b0 Postman ho\u1eb7c cURL"})," \u0111\u1ec3 g\u1eedi y\xeau c\u1ea7u GET"]}),"\n"]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h4,{id:"2\ufe0f\u20e3-ch\u1ec9nh-s\u1eeda-h\u1ed3-s\u01a1-ng\u01b0\u1eddi-kh\xe1c",children:(0,s.jsx)(n.strong,{children:"2\ufe0f\u20e3 Ch\u1ec9nh s\u1eeda h\u1ed3 s\u01a1 ng\u01b0\u1eddi kh\xe1c"})}),"\n",(0,s.jsxs)(n.p,{children:["C\xe1c \u1ee9ng d\u1ee5ng RESTful th\u01b0\u1eddng thay \u0111\u1ed5i ",(0,s.jsx)(n.strong,{children:"ph\u01b0\u01a1ng th\u1ee9c HTTP"})," \u0111\u1ec3 th\u1ef1c hi\u1ec7n c\xe1c h\xe0nh \u0111\u1ed9ng kh\xe1c nhau."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"V\xed d\u1ee5:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"GET /profile/{id}"})," \u2192 ",(0,s.jsx)(n.strong,{children:"Xem h\u1ed3 s\u01a1"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"PUT /profile/{id}"})," \u2192 ",(0,s.jsx)(n.strong,{children:"Ch\u1ec9nh s\u1eeda h\u1ed3 s\u01a1"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["\ud83d\udca1 ",(0,s.jsx)(n.strong,{children:"M\u1ee5c ti\xeau:"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Ch\u1ec9nh s\u1eeda h\u1ed3 s\u01a1 c\u1ee7a ",(0,s.jsx)(n.strong,{children:"Buffalo Bill"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"H\u1ea1 c\u1ea5p quy\u1ec1n c\u1ee7a ng\u01b0\u1eddi d\xf9ng"})," (v\xec quy\u1ec1n cao h\u01a1n th\u01b0\u1eddng c\xf3 ID th\u1ea5p)"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Thay \u0111\u1ed5i m\xe0u s\u1eafc"})," th\xe0nh ",(0,s.jsx)(n.code,{children:'"red"'})]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"c\xe1ch-th\u1ef1c-hi\u1ec7n-1",children:(0,s.jsx)(n.strong,{children:"C\xe1ch th\u1ef1c hi\u1ec7n"})}),"\n",(0,s.jsxs)(n.p,{children:["1\ufe0f\u20e3 ",(0,s.jsx)(n.strong,{children:"Intercept request"})," b\u1eb1ng Burp Suite/ZAP v\xe0 thay \u0111\u1ed5i ID",(0,s.jsx)(n.br,{}),"\n","2\ufe0f\u20e3 ",(0,s.jsx)(n.strong,{children:"Thay \u0111\u1ed5i ph\u01b0\u01a1ng th\u1ee9c"})," t\u1eeb ",(0,s.jsx)(n.code,{children:"GET"})," \u2192 ",(0,s.jsx)(n.code,{children:"PUT"}),(0,s.jsx)(n.br,{}),"\n","3\ufe0f\u20e3 ",(0,s.jsx)(n.strong,{children:"G\u1eedi payload m\u1edbi"})]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h4,{id:"-v\xed-d\u1ee5-payload-put-request",children:(0,s.jsxs)(n.strong,{children:["\ud83d\udccc V\xed d\u1ee5 Payload (",(0,s.jsx)(n.code,{children:"PUT"})," Request)"]})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "id": 123456,\n  "username": "Buffalo Bill",\n  "role": "user",\n  "color": "red"\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["\ud83d\uded1 ",(0,s.jsx)(n.strong,{children:"L\u01b0u \xfd:"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"N\u1ebfu \u1ee9ng d\u1ee5ng kh\xf4ng x\xe1c th\u1ef1c quy\u1ec1n \u0111\xfang c\xe1ch, b\u1ea1n c\xf3 th\u1ec3 s\u1eeda th\xf4ng tin c\u1ee7a ng\u01b0\u1eddi kh\xe1c!"}),"\n",(0,s.jsxs)(n.li,{children:["\u0110\xe2y l\xe0 m\u1ed9t l\u1ed7 h\u1ed5ng ",(0,s.jsx)(n.strong,{children:"Insecure Direct Object References (IDOR)"})," ph\u1ed5 bi\u1ebfn."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["\ud83d\ude80 ",(0,s.jsx)(n.strong,{children:"Th\u1eed ngay v\xe0 quan s\xe1t k\u1ebft qu\u1ea3!"})]}),"\n",(0,s.jsxs)(n.p,{children:["Xem chi ti\u1ebft t\u1ea1i ",(0,s.jsx)(n.a,{href:"https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-insecure-direct-object-reference-or-cycubix-docs/insecure-direct-object-reference-5",children:"\u0111\xe2y"}),"."]})]})}function a(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,n,c)=>{c.d(n,{R:()=>i,x:()=>o});var s=c(96540);const r={},t=s.createContext(r);function i(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);