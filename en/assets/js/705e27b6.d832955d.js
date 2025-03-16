"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[3341],{59484:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>l,contentTitle:()=>r,default:()=>g,frontMatter:()=>c,metadata:()=>o,toc:()=>d});var t=s(74848),i=s(28453);const c={title:"3.01 | Missing Function Level Access Control",slug:"missing-function-level-access-control-01",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Missing Function Level Access Control tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:3,tags:["web-security","webgoat","broken-access-control","missing-function-level-access-control","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","missing-function-level-access-control","webgoat-2023.8"],enableComments:!0,draft:!1},r=void 0,o={id:"web-security/webgoat-2023.8/A1-Broken-Access-Control/Missing-Function-Level-Access-Control-01",title:"3.01 | Missing Function Level Access Control",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Missing Function Level Access Control tr\xean WebGoat 2023.8",source:"@site/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Missing-Function-Level-Access-Control-01.md",sourceDirName:"02-web-security/webgoat-2023.8/A1-Broken-Access-Control",slug:"/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-01",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-01",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Missing-Function-Level-Access-Control-01.md",tags:[{inline:!0,label:"web-security",permalink:"/en/docs/tags/web-security"},{inline:!0,label:"webgoat",permalink:"/en/docs/tags/webgoat"},{inline:!0,label:"broken-access-control",permalink:"/en/docs/tags/broken-access-control"},{inline:!0,label:"missing-function-level-access-control",permalink:"/en/docs/tags/missing-function-level-access-control"},{inline:!0,label:"webgoat-2023.8",permalink:"/en/docs/tags/webgoat-2023-8"}],version:"current",lastUpdatedAt:1742144457e3,sidebarPosition:3,frontMatter:{title:"3.01 | Missing Function Level Access Control",slug:"missing-function-level-access-control-01",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Missing Function Level Access Control tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:3,tags:["web-security","webgoat","broken-access-control","missing-function-level-access-control","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","missing-function-level-access-control","webgoat-2023.8"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"2.06 | Insecure Direct Object References",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06"},next:{title:"3.02 | Missing Function Level Access Control",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-02"}},l={},d=[{value:"\u2705 <strong>1\ufe0f\u20e3 MFAC l\xe0 g\xec?</strong>",id:"-1\ufe0f\u20e3-mfac-l\xe0-g\xec",level:2},{value:"\ud83d\udea8 <strong>2\ufe0f\u20e3 V\xed d\u1ee5 th\u1ef1c t\u1ebf v\u1ec1 MFAC</strong>",id:"-2\ufe0f\u20e3-v\xed-d\u1ee5-th\u1ef1c-t\u1ebf-v\u1ec1-mfac",level:2},{value:"<strong>T\xecnh hu\u1ed1ng nguy hi\u1ec3m</strong>",id:"t\xecnh-hu\u1ed1ng-nguy-hi\u1ec3m",level:3},{value:"\u2705 <strong>3\ufe0f\u20e3 Gi\u1ea3i ph\xe1p b\u1ea3o m\u1eadt</strong>",id:"-3\ufe0f\u20e3-gi\u1ea3i-ph\xe1p-b\u1ea3o-m\u1eadt",level:2},{value:"\ud83d\udd12 <strong>1. Ki\u1ec3m tra quy\u1ec1n tr\xean Backend</strong>",id:"-1-ki\u1ec3m-tra-quy\u1ec1n-tr\xean-backend",level:3},{value:"\ud83d\udd12 <strong>2. \u1ea8n Endpoint quan tr\u1ecdng (Security by Design)</strong>",id:"-2-\u1ea9n-endpoint-quan-tr\u1ecdng-security-by-design",level:3},{value:"\ud83d\udd12 <strong>3. Ghi log c\xe1c h\xe0nh \u0111\u1ed9ng quan tr\u1ecdng</strong>",id:"-3-ghi-log-c\xe1c-h\xe0nh-\u0111\u1ed9ng-quan-tr\u1ecdng",level:3},{value:"\ud83d\udd25 <strong>4\ufe0f\u20e3 T\xf3m t\u1eaft: C\xe1ch ng\u0103n ch\u1eb7n MFAC</strong>",id:"-4\ufe0f\u20e3-t\xf3m-t\u1eaft-c\xe1ch-ng\u0103n-ch\u1eb7n-mfac",level:2}];function h(n){const e={blockquote:"blockquote",br:"br",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(e.blockquote,{children:["\n",(0,t.jsxs)(e.p,{children:["\ud83d\udd25 ",(0,t.jsx)(e.strong,{children:"Missing Function Level Access Control (MFAC) - L\u1ed7 h\u1ed5ng Ki\u1ec3m so\xe1t Truy c\u1eadp C\u1ea5p H\xe0m"})]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-1\ufe0f\u20e3-mfac-l\xe0-g\xec",children:["\u2705 ",(0,t.jsx)(e.strong,{children:"1\ufe0f\u20e3 MFAC l\xe0 g\xec?"})]}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.strong,{children:"\ud83d\udccc \u0110\u1ecbnh ngh\u0129a:"}),(0,t.jsx)(e.br,{}),"\n","L\u1ed7 h\u1ed5ng ",(0,t.jsx)(e.strong,{children:"Missing Function Level Access Control (MFAC)"})," x\u1ea3y ra khi \u1ee9ng d\u1ee5ng kh\xf4ng ki\u1ec3m so\xe1t quy\u1ec1n truy c\u1eadp v\xe0o m\u1ed9t s\u1ed1 ch\u1ee9c n\u0103ng ",(0,t.jsx)(e.strong,{children:"\u1edf c\u1ea5p \u0111\u1ed9 API ho\u1eb7c backend"}),", d\u1eabn \u0111\u1ebfn vi\u1ec7c ng\u01b0\u1eddi d\xf9ng tr\xe1i ph\xe9p c\xf3 th\u1ec3 g\u1ecdi tr\u1ef1c ti\u1ebfp c\xe1c API \u1ea9n \u0111\u1ec3 th\u1ef1c hi\u1ec7n h\xe0nh \u0111\u1ed9ng m\xe0 h\u1ecd kh\xf4ng \u0111\u01b0\u1ee3c ph\xe9p."]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"So s\xe1nh IDOR vs MFAC"})]}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsxs)(e.th,{children:["\ud83d\udd25 ",(0,t.jsx)(e.strong,{children:"L\u1ed7 h\u1ed5ng"})]}),(0,t.jsxs)(e.th,{children:["\u274c ",(0,t.jsx)(e.strong,{children:"Nguy c\u01a1 b\u1ea3o m\u1eadt"})]})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsxs)(e.td,{children:[(0,t.jsx)(e.strong,{children:"IDOR"})," ",(0,t.jsx)(e.em,{children:"(Insecure Direct Object Reference)"})]}),(0,t.jsxs)(e.td,{children:["Truy c\u1eadp d\u1eef li\u1ec7u c\u1ee7a ng\u01b0\u1eddi kh\xe1c b\u1eb1ng c\xe1ch thay \u0111\u1ed5i ID (",(0,t.jsx)(e.code,{children:"GET /profile/5678"}),")"]})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsxs)(e.td,{children:[(0,t.jsx)(e.strong,{children:"MFAC"})," ",(0,t.jsx)(e.em,{children:"(Missing Function Level Access Control)"})]}),(0,t.jsxs)(e.td,{children:["Truy c\u1eadp ",(0,t.jsx)(e.strong,{children:"ch\u1ee9c n\u0103ng c\u1ea5m"})," b\u1eb1ng c\xe1ch g\u1ecdi tr\u1ef1c ti\u1ebfp API (",(0,t.jsx)(e.code,{children:"POST /admin/deleteUser"}),")"]})]})]})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"IDOR"})," \u2192 Ki\u1ec3m so\xe1t ",(0,t.jsx)(e.strong,{children:"n\u1ed9i dung d\u1eef li\u1ec7u"}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"MFAC"})," \u2192 Ki\u1ec3m so\xe1t ",(0,t.jsx)(e.strong,{children:"quy\u1ec1n th\u1ef1c thi ch\u1ee9c n\u0103ng"})]}),"\n",(0,t.jsxs)(e.h2,{id:"-2\ufe0f\u20e3-v\xed-d\u1ee5-th\u1ef1c-t\u1ebf-v\u1ec1-mfac",children:["\ud83d\udea8 ",(0,t.jsx)(e.strong,{children:"2\ufe0f\u20e3 V\xed d\u1ee5 th\u1ef1c t\u1ebf v\u1ec1 MFAC"})]}),"\n",(0,t.jsx)(e.h3,{id:"t\xecnh-hu\u1ed1ng-nguy-hi\u1ec3m",children:(0,t.jsx)(e.strong,{children:"T\xecnh hu\u1ed1ng nguy hi\u1ec3m"})}),"\n",(0,t.jsx)(e.p,{children:"M\u1ed9t \u1ee9ng d\u1ee5ng c\xf3 giao di\u1ec7n qu\u1ea3n tr\u1ecb vi\xean \u0111\u1ec3 x\xf3a ng\u01b0\u1eddi d\xf9ng:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:'Ch\u1ec9 admin m\u1edbi th\u1ea5y n\xfat "X\xf3a ng\u01b0\u1eddi d\xf9ng"'}),"\n",(0,t.jsxs)(e.li,{children:["Tuy nhi\xean, API v\u1eabn m\u1edf cho b\u1ea5t k\u1ef3 ai g\u1ecdi tr\u1ef1c ti\u1ebfp:","\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-plaintext",children:'POST /admin/deleteUser\nBody: { "userId": 5678 }\n'})}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["N\u1ebfu attacker bi\u1ebft API n\xe0y, h\u1ecd c\xf3 th\u1ec3 g\u1eedi request x\xf3a t\xe0i kho\u1ea3n ",(0,t.jsx)(e.strong,{children:"m\xe0 kh\xf4ng c\u1ea7n quy\u1ec1n admin"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-3\ufe0f\u20e3-gi\u1ea3i-ph\xe1p-b\u1ea3o-m\u1eadt",children:["\u2705 ",(0,t.jsx)(e.strong,{children:"3\ufe0f\u20e3 Gi\u1ea3i ph\xe1p b\u1ea3o m\u1eadt"})]}),"\n",(0,t.jsxs)(e.h3,{id:"-1-ki\u1ec3m-tra-quy\u1ec1n-tr\xean-backend",children:["\ud83d\udd12 ",(0,t.jsx)(e.strong,{children:"1. Ki\u1ec3m tra quy\u1ec1n tr\xean Backend"})]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"\u274c Sai c\xe1ch (D\u1ec5 b\u1ecb t\u1ea5n c\xf4ng)"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-csharp",children:'[HttpPost("/admin/deleteUser")]\npublic IActionResult DeleteUser([FromBody] DeleteUserDto request)\n{\n    var user = _dbContext.Users.Find(request.UserId);\n    if (user == null) return NotFound();\n\n    _dbContext.Users.Remove(user);\n    _dbContext.SaveChanges();\n    return Ok();\n}\n'})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"V\u1ea5n \u0111\u1ec1:"})," Kh\xf4ng ki\u1ec3m tra ",(0,t.jsx)(e.strong,{children:"ng\u01b0\u1eddi g\u1ecdi API c\xf3 ph\u1ea3i l\xe0 admin hay kh\xf4ng"}),"."]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"\u2705 \u0110\xfang c\xe1ch (B\u1ea3o m\u1eadt h\u01a1n)"})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-csharp",children:'[Authorize(Roles = "Admin")] // \ud83d\udd12 Ch\u1ec9 admin m\u1edbi \u0111\u01b0\u1ee3c g\u1ecdi API\n[HttpPost("/admin/deleteUser")]\npublic IActionResult DeleteUser([FromBody] DeleteUserDto request)\n{\n    var user = _dbContext.Users.Find(request.UserId);\n    if (user == null) return NotFound();\n\n    _dbContext.Users.Remove(user);\n    _dbContext.SaveChanges();\n    return Ok();\n}\n'})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"K\u1ebft qu\u1ea3:"}),(0,t.jsx)(e.br,{}),"\n","\u2705 Ng\u01b0\u1eddi d\xf9ng th\u01b0\u1eddng KH\xd4NG th\u1ec3 truy c\u1eadp ch\u1ee9c n\u0103ng n\xe0y, k\u1ec3 c\u1ea3 khi g\u1ecdi API tr\u1ef1c ti\u1ebfp."]}),"\n",(0,t.jsxs)(e.h3,{id:"-2-\u1ea9n-endpoint-quan-tr\u1ecdng-security-by-design",children:["\ud83d\udd12 ",(0,t.jsx)(e.strong,{children:"2. \u1ea8n Endpoint quan tr\u1ecdng (Security by Design)"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Kh\xf4ng \u0111\u1ec3 l\u1ed9 API ",(0,t.jsx)(e.strong,{children:(0,t.jsx)(e.code,{children:"/admin/deleteUser"})}),", thay v\xe0o \u0111\xf3:","\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-plaintext",children:'POST /user/action\nBody: { "action": "delete", "userId": 5678 }\n'})}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["Ch\u1ec9 admin m\u1edbi \u0111\u01b0\u1ee3c ph\xe9p th\u1ef1c hi\u1ec7n ",(0,t.jsx)(e.code,{children:'"action": "delete"'}),"."]}),"\n"]}),"\n",(0,t.jsxs)(e.h3,{id:"-3-ghi-log-c\xe1c-h\xe0nh-\u0111\u1ed9ng-quan-tr\u1ecdng",children:["\ud83d\udd12 ",(0,t.jsx)(e.strong,{children:"3. Ghi log c\xe1c h\xe0nh \u0111\u1ed9ng quan tr\u1ecdng"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"N\u1ebfu API b\u1ecb t\u1ea5n c\xf4ng, c\u1ea7n c\xf3 log \u0111\u1ec3 \u0111i\u1ec1u tra."}),"\n",(0,t.jsxs)(e.li,{children:["V\xed d\u1ee5 ghi log khi x\xf3a t\xe0i kho\u1ea3n:","\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-csharp",children:'_logger.LogWarning($"Admin {currentUser.Id} deleted user {user.Id}");\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-4\ufe0f\u20e3-t\xf3m-t\u1eaft-c\xe1ch-ng\u0103n-ch\u1eb7n-mfac",children:["\ud83d\udd25 ",(0,t.jsx)(e.strong,{children:"4\ufe0f\u20e3 T\xf3m t\u1eaft: C\xe1ch ng\u0103n ch\u1eb7n MFAC"})]}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsxs)(e.th,{children:["\u274c ",(0,t.jsx)(e.strong,{children:"L\u1ed7 h\u1ed5ng"})]}),(0,t.jsxs)(e.th,{children:["\u2705 ",(0,t.jsx)(e.strong,{children:"Gi\u1ea3i ph\xe1p"})]})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"API kh\xf4ng ki\u1ec3m tra quy\u1ec1n"})}),(0,t.jsxs)(e.td,{children:["Lu\xf4n d\xf9ng ",(0,t.jsx)(e.code,{children:'[Authorize(Roles = "...")]'})," \u0111\u1ec3 gi\u1edbi h\u1ea1n quy\u1ec1n truy c\u1eadp"]})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"L\u1ed9 API quan tr\u1ecdng"})}),(0,t.jsx)(e.td,{children:"\u0110\u1eb7t t\xean API chung chung \u0111\u1ec3 tr\xe1nh b\u1ecb l\u1ed9"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"Kh\xf4ng c\xf3 log gi\xe1m s\xe1t"})}),(0,t.jsx)(e.td,{children:"Ghi log m\u1ecdi h\xe0nh \u0111\u1ed9ng quan tr\u1ecdng \u0111\u1ec3 d\u1ec5 \u0111i\u1ec1u tra"})]})]})]})]})}function g(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(h,{...n})}):h(n)}},28453:(n,e,s)=>{s.d(e,{R:()=>r,x:()=>o});var t=s(96540);const i={},c=t.createContext(i);function r(n){const e=t.useContext(c);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),t.createElement(c.Provider,{value:e},n.children)}}}]);