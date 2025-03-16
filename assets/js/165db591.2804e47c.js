"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[3484],{43061:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>l,frontMatter:()=>s,metadata:()=>o,toc:()=>b});var c=t(74848),r=t(28453);const s={title:"02 | Insecure Direct Object References",slug:"insecure-direct-object-references-02",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Insecure Direct Object References tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:2,tags:["web-security","webgoat","broken-access-control","insecure-direct-object-references","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","insecure-direct-object-references","webgoat-2023.8"],enableComments:!0,draft:!1},i=void 0,o={id:"web-security/webgoat-2023.8/A1-Broken-Access-Control/Insecure-Direct-Object-References-02",title:"02 | Insecure Direct Object References",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Insecure Direct Object References tr\xean WebGoat 2023.8",source:"@site/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Insecure-Direct-Object-References-02.md",sourceDirName:"02-web-security/webgoat-2023.8/A1-Broken-Access-Control",slug:"/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-02",permalink:"/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-02",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Insecure-Direct-Object-References-02.md",tags:[{inline:!0,label:"web-security",permalink:"/docs/tags/web-security"},{inline:!0,label:"webgoat",permalink:"/docs/tags/webgoat"},{inline:!0,label:"broken-access-control",permalink:"/docs/tags/broken-access-control"},{inline:!0,label:"insecure-direct-object-references",permalink:"/docs/tags/insecure-direct-object-references"},{inline:!0,label:"webgoat-2023.8",permalink:"/docs/tags/webgoat-2023-8"}],version:"current",lastUpdatedAt:1742144389e3,sidebarPosition:2,frontMatter:{title:"02 | Insecure Direct Object References",slug:"insecure-direct-object-references-02",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Insecure Direct Object References tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:2,tags:["web-security","webgoat","broken-access-control","insecure-direct-object-references","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","insecure-direct-object-references","webgoat-2023.8"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"01 | Insecure Direct Object References",permalink:"/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-01"},next:{title:"03 | Insecure Direct Object References",permalink:"/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-03"}},a={},b=[{value:"<strong>Th\xf4ng tin \u0111\u0103ng nh\u1eadp</strong>",id:"th\xf4ng-tin-\u0111\u0103ng-nh\u1eadp",level:4}];function h(e){const n={blockquote:"blockquote",br:"br",code:"code",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(n.blockquote,{children:["\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:"Authenticate First, Abuse Authorization Later"})," (X\xe1c th\u1ef1c tr\u01b0\u1edbc, l\u1ea1m d\u1ee5ng quy\u1ec1n sau)."]}),"\n"]}),"\n",(0,c.jsxs)(n.p,{children:["Nhi\u1ec1u l\u1ed7 h\u1ed5ng ki\u1ec3m so\xe1t truy c\u1eadp c\xf3 th\u1ec3 b\u1ecb khai th\xe1c b\u1edfi m\u1ed9t ng\u01b0\u1eddi d\xf9ng ",(0,c.jsx)(n.strong,{children:"\u0111\xe3 x\xe1c th\u1ef1c nh\u01b0ng kh\xf4ng \u0111\u01b0\u1ee3c c\u1ea5p quy\u1ec1n h\u1ee3p l\u1ec7"}),"."]}),"\n",(0,c.jsxs)(n.p,{children:["V\xec v\u1eady, tr\u01b0\u1edbc ti\xean ch\xfang ta s\u1ebd ",(0,c.jsx)(n.strong,{children:"x\xe1c th\u1ef1c h\u1ee3p l\u1ec7"})," v\xe0o h\u1ec7 th\u1ed1ng. Sau \u0111\xf3, ch\xfang ta s\u1ebd t\xecm c\xe1ch ",(0,c.jsx)(n.strong,{children:"bypass (v\u01b0\u1ee3t qua) ho\u1eb7c l\u1ea1m d\u1ee5ng c\u01a1 ch\u1ebf ph\xe2n quy\u1ec1n"})," \u0111\u1ec3 truy c\u1eadp v\xe0o t\xe0i nguy\xean m\xe0 ch\xfang ta kh\xf4ng \u0111\u01b0\u1ee3c ph\xe9p."]}),"\n",(0,c.jsx)(n.h4,{id:"th\xf4ng-tin-\u0111\u0103ng-nh\u1eadp",children:(0,c.jsx)(n.strong,{children:"Th\xf4ng tin \u0111\u0103ng nh\u1eadp"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:"ID"}),": ",(0,c.jsx)(n.code,{children:"tom"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:"M\u1eadt kh\u1ea9u"}),": ",(0,c.jsx)(n.code,{children:"cat"}),(0,c.jsx)(n.br,{}),"\n","(H\u1ec7 th\u1ed1ng n\xe0y v\u1ed1n d\u0129 kh\xf4ng an to\xe0n, \u0111\xfang kh\xf4ng? \ud83d\ude03)"]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"Sau khi \u0111\u0103ng nh\u1eadp th\xe0nh c\xf4ng, h\xe3y ti\u1ebfp t\u1ee5c kh\xe1m ph\xe1 m\xe0n h\xecnh ti\u1ebfp theo \u0111\u1ec3 t\xecm c\xe1ch khai th\xe1c l\u1ed7 h\u1ed5ng ph\xe2n quy\u1ec1n! \ud83d\ude80"})]})}function l(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>o});var c=t(96540);const r={},s=c.createContext(r);function i(e){const n=c.useContext(s);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),c.createElement(s.Provider,{value:n},e.children)}}}]);