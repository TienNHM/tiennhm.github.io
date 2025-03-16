"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[6571],{38522:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>l,contentTitle:()=>r,default:()=>g,frontMatter:()=>i,metadata:()=>o,toc:()=>h});var t=s(74848),c=s(28453);const i={title:"3.03 | Missing Function Level Access Control",slug:"missing-function-level-access-control-03",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Missing Function Level Access Control tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:3,tags:["web-security","webgoat","broken-access-control","missing-function-level-access-control","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","missing-function-level-access-control","webgoat-2023.8"],enableComments:!0,draft:!1},r=void 0,o={id:"web-security/webgoat-2023.8/A1-Broken-Access-Control/Missing-Function-Level-Access-Control-03",title:"3.03 | Missing Function Level Access Control",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Missing Function Level Access Control tr\xean WebGoat 2023.8",source:"@site/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Missing-Function-Level-Access-Control-03.md",sourceDirName:"02-web-security/webgoat-2023.8/A1-Broken-Access-Control",slug:"/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-03",permalink:"/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-03",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Missing-Function-Level-Access-Control-03.md",tags:[{inline:!0,label:"web-security",permalink:"/docs/tags/web-security"},{inline:!0,label:"webgoat",permalink:"/docs/tags/webgoat"},{inline:!0,label:"broken-access-control",permalink:"/docs/tags/broken-access-control"},{inline:!0,label:"missing-function-level-access-control",permalink:"/docs/tags/missing-function-level-access-control"},{inline:!0,label:"webgoat-2023.8",permalink:"/docs/tags/webgoat-2023-8"}],version:"current",lastUpdatedAt:1742144457e3,sidebarPosition:3,frontMatter:{title:"3.03 | Missing Function Level Access Control",slug:"missing-function-level-access-control-03",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Missing Function Level Access Control tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:3,tags:["web-security","webgoat","broken-access-control","missing-function-level-access-control","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","missing-function-level-access-control","webgoat-2023.8"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"3.02 | Missing Function Level Access Control",permalink:"/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-02"},next:{title:"3.04 | Missing Function Level Access Control",permalink:"/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-04"}},l={},h=[{value:"\u2705 <strong>1\ufe0f\u20e3 \xdd ngh\u0129a c\u1ee7a b\xe0i t\u1eadp n\xe0y?</strong>",id:"-1\ufe0f\u20e3-\xfd-ngh\u0129a-c\u1ee7a-b\xe0i-t\u1eadp-n\xe0y",level:2},{value:"\ud83d\ude80 <strong>2\ufe0f\u20e3 C\xe1ch khai th\xe1c l\u1ed7 h\u1ed5ng &quot;Try It&quot;</strong>",id:"-2\ufe0f\u20e3-c\xe1ch-khai-th\xe1c-l\u1ed7-h\u1ed5ng-try-it",level:2},{value:"<strong>\ud83d\udd0e C\xe1ch 1: S\u1eed d\u1ee5ng Burp Suite/ZAP \u0111\u1ec3 ch\u1eb7n &amp; thay \u0111\u1ed5i request</strong>",id:"-c\xe1ch-1-s\u1eed-d\u1ee5ng-burp-suitezap-\u0111\u1ec3-ch\u1eb7n--thay-\u0111\u1ed5i-request",level:3},{value:"<strong>\ud83d\udd0e C\xe1ch 2: D\xf9ng Developer Tools (DevTools)</strong>",id:"-c\xe1ch-2-d\xf9ng-developer-tools-devtools",level:3},{value:"\ud83d\udd12 <strong>3\ufe0f\u20e3 Gi\u1ea3i ph\xe1p ph\xf2ng tr\xe1nh</strong>",id:"-3\ufe0f\u20e3-gi\u1ea3i-ph\xe1p-ph\xf2ng-tr\xe1nh",level:2},{value:"\u2705 <strong>1. Ki\u1ec3m so\xe1t quy\u1ec1n truy c\u1eadp tr\xean Backend</strong>",id:"-1-ki\u1ec3m-so\xe1t-quy\u1ec1n-truy-c\u1eadp-tr\xean-backend",level:3},{value:"\u2705 <strong>2. Tr\xe1nh \u0111\u1ec3 l\u1ed9 th\xf4ng tin trong response</strong>",id:"-2-tr\xe1nh-\u0111\u1ec3-l\u1ed9-th\xf4ng-tin-trong-response",level:3},{value:"\u2705 <strong>3. Ghi log &amp; ch\u1eb7n h\xe0nh vi \u0111\xe1ng ng\u1edd</strong>",id:"-3-ghi-log--ch\u1eb7n-h\xe0nh-vi-\u0111\xe1ng-ng\u1edd",level:3},{value:"\ud83d\udd25 <strong>4\ufe0f\u20e3 K\u1ebft lu\u1eadn</strong>",id:"-4\ufe0f\u20e3-k\u1ebft-lu\u1eadn",level:2}];function d(n){const e={a:"a",blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,c.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(e.blockquote,{children:["\n",(0,t.jsxs)(e.p,{children:["\ud83d\udd25 ",(0,t.jsx)(e.strong,{children:'Ph\xe2n t\xedch & C\xe1ch khai th\xe1c l\u1ed7 h\u1ed5ng "Try It" trong WebGoat'})]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-1\ufe0f\u20e3-\xfd-ngh\u0129a-c\u1ee7a-b\xe0i-t\u1eadp-n\xe0y",children:["\u2705 ",(0,t.jsx)(e.strong,{children:"1\ufe0f\u20e3 \xdd ngh\u0129a c\u1ee7a b\xe0i t\u1eadp n\xe0y?"})]}),"\n",(0,t.jsxs)(e.p,{children:["B\xe0i t\u1eadp n\xe0y nh\u1ea5n m\u1ea1nh v\xe0o vi\u1ec7c ",(0,t.jsx)(e.strong,{children:"ki\u1ec3m tra quy\u1ec1n truy c\u1eadp b\u1ecb b\u1ecf s\xf3t"}),". Nhi\u1ec1u \u1ee9ng d\u1ee5ng ch\u1ec9 ",(0,t.jsx)(e.strong,{children:"\u1ea9n ch\u1ee9c n\u0103ng tr\xean giao di\u1ec7n ng\u01b0\u1eddi d\xf9ng (UI)"})," m\xe0 ",(0,t.jsx)(e.strong,{children:"kh\xf4ng th\u1ef1c s\u1ef1 ki\u1ec3m tra quy\u1ec1n tr\xean backend"}),", d\u1eabn \u0111\u1ebfn vi\u1ec7c hacker c\xf3 th\u1ec3 ",(0,t.jsx)(e.strong,{children:"truy c\u1eadp tr\xe1i ph\xe9p"})," b\u1eb1ng c\xe1ch ",(0,t.jsx)(e.strong,{children:"th\u1eed tr\u1ef1c ti\u1ebfp c\xe1c endpoint"}),"."]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"B\xe0i to\xe1n th\u1ef1c t\u1ebf:"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["B\u1ea1n \u0111\xe3 t\xecm th\u1ea5y ",(0,t.jsx)(e.strong,{children:"2 menu \u1ea9n"}),": ",(0,t.jsx)(e.code,{children:"/users"})," v\xe0 ",(0,t.jsx)(e.code,{children:"/config"})]}),"\n",(0,t.jsxs)(e.li,{children:["M\u1ee5c ti\xeau: ",(0,t.jsxs)(e.strong,{children:["Khai th\xe1c endpoint ",(0,t.jsx)(e.code,{children:"/users"})," \u0111\u1ec3 l\u1ea5y danh s\xe1ch ng\u01b0\u1eddi d\xf9ng"]})]}),"\n",(0,t.jsxs)(e.li,{children:["C\u1ea7n t\xecm ",(0,t.jsx)(e.strong,{children:"hash c\u1ee7a t\xe0i kho\u1ea3n Jerry"})," v\xe0 nh\u1eadp v\xe0o WebGoat"]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-2\ufe0f\u20e3-c\xe1ch-khai-th\xe1c-l\u1ed7-h\u1ed5ng-try-it",children:["\ud83d\ude80 ",(0,t.jsx)(e.strong,{children:'2\ufe0f\u20e3 C\xe1ch khai th\xe1c l\u1ed7 h\u1ed5ng "Try It"'})]}),"\n",(0,t.jsx)(e.h3,{id:"-c\xe1ch-1-s\u1eed-d\u1ee5ng-burp-suitezap-\u0111\u1ec3-ch\u1eb7n--thay-\u0111\u1ed5i-request",children:(0,t.jsx)(e.strong,{children:"\ud83d\udd0e C\xe1ch 1: S\u1eed d\u1ee5ng Burp Suite/ZAP \u0111\u1ec3 ch\u1eb7n & thay \u0111\u1ed5i request"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"B\u01b0\u1edbc 1\ufe0f\u20e3: B\u1eadt Intercept (ch\u1eb7n request)"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["M\u1edf ",(0,t.jsx)(e.strong,{children:"Burp Suite"})," \u2192 ",(0,t.jsx)(e.strong,{children:"B\u1eadt Intercept"})]}),"\n",(0,t.jsx)(e.li,{children:'Truy c\u1eadp WebGoat \u2192 Click Submit d\u01b0\u1edbi m\u1ee5c "User Hash"'}),"\n",(0,t.jsxs)(e.li,{children:["Ch\u1eb7n request \u0111\u1ec3 ki\u1ec3m tra ",(0,t.jsx)(e.strong,{children:"endpoint n\xe0o b\u1ecb g\u1ecdi"})]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"B\u01b0\u1edbc 2\ufe0f\u20e3: T\xecm & s\u1eeda request"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Xem ",(0,t.jsx)(e.strong,{children:"request b\u1ecb ch\u1eb7n"}),", \u0111\u1ed5i endpoint t\u1eeb ",(0,t.jsx)(e.code,{children:"/user-hash"})," th\xe0nh ",(0,t.jsx)(e.code,{children:"/users"})]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:'N\u1ebfu l\u1ed7i "Unsupported Media Type"'}),", th\xeam header:","\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-http",children:"Content-Type: application/json; charset=UTF-8\n"})}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:'N\u1ebfu l\u1ed7i "Expected JSON object"'}),", chuy\u1ec3n t\u1eeb ",(0,t.jsx)(e.code,{children:"POST"})," sang ",(0,t.jsx)(e.code,{children:"GET"})]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"N\u1ebfu l\u1ed7i quy\u1ec1n truy c\u1eadp"}),", th\u1eed ",(0,t.jsx)(e.strong,{children:"ch\xe8n role admin"})," (",(0,t.jsx)(e.code,{children:"WEBGOAT_ADMIN"}),")"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"B\u01b0\u1edbc 3\ufe0f\u20e3: G\u1eedi request & tr\xedch xu\u1ea5t d\u1eef li\u1ec7u"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"N\u1ebfu request th\xe0nh c\xf4ng, d\u1eef li\u1ec7u user s\u1ebd tr\u1ea3 v\u1ec1."}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"T\xecm hash c\u1ee7a Jerry"})," v\xe0 nh\u1eadp v\xe0o WebGoat."]}),"\n"]}),"\n",(0,t.jsx)(e.h3,{id:"-c\xe1ch-2-d\xf9ng-developer-tools-devtools",children:(0,t.jsx)(e.strong,{children:"\ud83d\udd0e C\xe1ch 2: D\xf9ng Developer Tools (DevTools)"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"B\u01b0\u1edbc 1\ufe0f\u20e3: M\u1edf DevTools (F12) \u2192 Chuy\u1ec3n sang tab Network"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Truy c\u1eadp ",(0,t.jsx)(e.code,{children:"http://localhost:8080/WebGoat/users"})]}),"\n",(0,t.jsxs)(e.li,{children:["Xem c\xe1c request g\u1eedi \u0111i, t\xecm endpoint ",(0,t.jsx)(e.code,{children:"/users"})]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"B\u01b0\u1edbc 2\ufe0f\u20e3: Ch\u1ec9nh s\u1eeda request"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Click v\xe0o request ",(0,t.jsx)(e.code,{children:"/users"})," \u2192 ",(0,t.jsx)(e.strong,{children:"Edit & Resend"})]}),"\n",(0,t.jsxs)(e.li,{children:["Th\xeam header:","\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-http",children:"Content-Type: application/json\n"})}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"G\u1eedi request"})," v\xe0 ki\u1ec3m tra ph\u1ea3n h\u1ed3i."]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-3\ufe0f\u20e3-gi\u1ea3i-ph\xe1p-ph\xf2ng-tr\xe1nh",children:["\ud83d\udd12 ",(0,t.jsx)(e.strong,{children:"3\ufe0f\u20e3 Gi\u1ea3i ph\xe1p ph\xf2ng tr\xe1nh"})]}),"\n",(0,t.jsxs)(e.h3,{id:"-1-ki\u1ec3m-so\xe1t-quy\u1ec1n-truy-c\u1eadp-tr\xean-backend",children:["\u2705 ",(0,t.jsx)(e.strong,{children:"1. Ki\u1ec3m so\xe1t quy\u1ec1n truy c\u1eadp tr\xean Backend"})]}),"\n",(0,t.jsxs)(e.p,{children:["Kh\xf4ng ch\u1ec9 ki\u1ec3m tra ",(0,t.jsx)(e.strong,{children:"role tr\xean UI"}),", m\xe0 ph\u1ea3i ki\u1ec3m tra tr\xean API:"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-csharp",children:'[Authorize(Roles = "Admin")]\npublic IActionResult GetUsers()\n{\n    return Json(userService.GetAllUsers());\n}\n'})}),"\n",(0,t.jsxs)(e.h3,{id:"-2-tr\xe1nh-\u0111\u1ec3-l\u1ed9-th\xf4ng-tin-trong-response",children:["\u2705 ",(0,t.jsx)(e.strong,{children:"2. Tr\xe1nh \u0111\u1ec3 l\u1ed9 th\xf4ng tin trong response"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Kh\xf4ng tr\u1ea3 v\u1ec1 danh s\xe1ch user n\u1ebfu kh\xf4ng c\u1ea7n thi\u1ebft."}),"\n",(0,t.jsx)(e.li,{children:"Hash to\xe0n b\u1ed9 d\u1eef li\u1ec7u nh\u1ea1y c\u1ea3m."}),"\n"]}),"\n",(0,t.jsxs)(e.h3,{id:"-3-ghi-log--ch\u1eb7n-h\xe0nh-vi-\u0111\xe1ng-ng\u1edd",children:["\u2705 ",(0,t.jsx)(e.strong,{children:"3. Ghi log & ch\u1eb7n h\xe0nh vi \u0111\xe1ng ng\u1edd"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["N\u1ebfu c\xf3 ",(0,t.jsx)(e.strong,{children:"nhi\u1ec1u request b\u1ea5t th\u01b0\u1eddng"})," \u0111\u1ebfn ",(0,t.jsx)(e.code,{children:"/users"}),", c\xf3 th\u1ec3 l\xe0 hacker \u0111ang t\u1ea5n c\xf4ng."]}),"\n",(0,t.jsx)(e.li,{children:"Ghi l\u1ea1i c\xe1c request b\u1ecb t\u1eeb ch\u1ed1i."}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-4\ufe0f\u20e3-k\u1ebft-lu\u1eadn",children:["\ud83d\udd25 ",(0,t.jsx)(e.strong,{children:"4\ufe0f\u20e3 K\u1ebft lu\u1eadn"})]}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsxs)(e.th,{children:["\u274c ",(0,t.jsx)(e.strong,{children:"Sai l\u1ea7m"})]}),(0,t.jsxs)(e.th,{children:["\u2705 ",(0,t.jsx)(e.strong,{children:"C\xe1ch s\u1eeda"})]})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Ch\u1ec9 \u1ea9n menu b\u1eb1ng UI"}),(0,t.jsx)(e.td,{children:"Ki\u1ec3m so\xe1t quy\u1ec1n t\u1eeb backend"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Kh\xf4ng ki\u1ec3m tra quy\u1ec1n tr\xean API"}),(0,t.jsxs)(e.td,{children:["D\xf9ng ",(0,t.jsx)(e.code,{children:"[Authorize]"})," \u0111\u1ec3 ch\u1eb7n API"]})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"L\u1ed9 th\xf4ng tin user trong response"}),(0,t.jsx)(e.td,{children:"Ch\u1ec9 tr\u1ea3 v\u1ec1 th\xf4ng tin c\u1ea7n thi\u1ebft"})]})]})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"B\xe0i h\u1ecdc r\xfat ra:"}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"Ch\u1ec9 v\xec b\u1ea1n kh\xf4ng th\u1ea5y kh\xf4ng c\xf3 ngh\u0129a l\xe0 n\xf3 kh\xf4ng t\u1ed3n t\u1ea1i!"})," \ud83d\ude80"]}),"\n",(0,t.jsxs)(e.p,{children:["Xem chi ti\u1ebft t\u1ea1i ",(0,t.jsx)(e.a,{href:"https://docs.cycubix.com/application-security-series/web-application-security-essentials/solutions/a5-broken-access-control/a1-2021-or-missing-function-level-access-control-or-cycubix-docs/missing-function-level-access-control-3",children:"\u0111\xe2y"}),"."]})]})}function g(n={}){const{wrapper:e}={...(0,c.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>r,x:()=>o});var t=s(96540);const c={},i=t.createContext(c);function r(n){const e=t.useContext(i);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:r(n.components),t.createElement(i.Provider,{value:e},n.children)}}}]);