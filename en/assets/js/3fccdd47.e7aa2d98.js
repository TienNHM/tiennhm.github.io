"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[7701],{55329:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>o,contentTitle:()=>r,default:()=>a,frontMatter:()=>s,metadata:()=>h,toc:()=>l});var t=i(74848),c=i(28453);const s={title:"1.04 | XXE",slug:"XXE-04",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng XXE tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:1,tags:["web-security","webgoat","security-misconfiguration","xxe","webgoat-2023.8"],keywords:["web-security","webgoat","security-misconfiguration","xxe","webgoat-2023.8"],enableComments:!0,draft:!1},r=void 0,h={id:"web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-04",title:"1.04 | XXE",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng XXE tr\xean WebGoat 2023.8",source:"@site/docs/02-web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-04.md",sourceDirName:"02-web-security/webgoat-2023.8/A5-Security-Misconfiguration",slug:"/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-04",permalink:"/en/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-04",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-04.md",tags:[{inline:!0,label:"web-security",permalink:"/en/docs/tags/web-security"},{inline:!0,label:"webgoat",permalink:"/en/docs/tags/webgoat"},{inline:!0,label:"security-misconfiguration",permalink:"/en/docs/tags/security-misconfiguration"},{inline:!0,label:"xxe",permalink:"/en/docs/tags/xxe"},{inline:!0,label:"webgoat-2023.8",permalink:"/en/docs/tags/webgoat-2023-8"}],version:"current",lastUpdatedAt:1742149476e3,sidebarPosition:1,frontMatter:{title:"1.04 | XXE",slug:"XXE-04",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng XXE tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:1,tags:["web-security","webgoat","security-misconfiguration","xxe","webgoat-2023.8"],keywords:["web-security","webgoat","security-misconfiguration","xxe","webgoat-2023.8"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"1.03 | XXE",permalink:"/en/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-03"},next:{title:"1.05 | XXE",permalink:"/en/docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-05"}},o={},l=[{value:"\ud83d\udccc <strong>1. M\u1ee5c ti\xeau c\u1ee7a b\xe0i th\u1ef1c h\xe0nh</strong>",id:"-1-m\u1ee5c-ti\xeau-c\u1ee7a-b\xe0i-th\u1ef1c-h\xe0nh",level:2},{value:"\ud83d\udd25 <strong>2. C\xe1ch th\u1ef1c hi\u1ec7n</strong>",id:"-2-c\xe1ch-th\u1ef1c-hi\u1ec7n",level:2},{value:"<strong>\ud83d\udccc B\u01b0\u1edbc 1: G\u1eedi b\xecnh lu\u1eadn b\xecnh th\u01b0\u1eddng</strong>",id:"-b\u01b0\u1edbc-1-g\u1eedi-b\xecnh-lu\u1eadn-b\xecnh-th\u01b0\u1eddng",level:3},{value:"<strong>\ud83d\udccc B\u01b0\u1edbc 2: D\xf9ng Burp/ZAP \u0111\u1ec3 ch\u1eb7n request</strong>",id:"-b\u01b0\u1edbc-2-d\xf9ng-burpzap-\u0111\u1ec3-ch\u1eb7n-request",level:3},{value:"<strong>\ud83d\udccc B\u01b0\u1edbc 3: Thay \u0111\u1ed5i request \u0111\u1ec3 th\u1ef1c hi\u1ec7n XXE Injection</strong>",id:"-b\u01b0\u1edbc-3-thay-\u0111\u1ed5i-request-\u0111\u1ec3-th\u1ef1c-hi\u1ec7n-xxe-injection",level:3},{value:"\ud83d\udd0e <strong>3. Ki\u1ec3m tra ph\u1ea3n h\u1ed3i c\u1ee7a server</strong>",id:"-3-ki\u1ec3m-tra-ph\u1ea3n-h\u1ed3i-c\u1ee7a-server",level:2},{value:"\ud83d\udea8 <strong>4. Ph\xf2ng ch\u1ed1ng XXE</strong>",id:"-4-ph\xf2ng-ch\u1ed1ng-xxe",level:2},{value:"\ud83d\udce2 <strong>B\u1ea1n c\xf3 th\u1ec3 th\u1eed nghi\u1ec7m v\u1edbi c\xe1c file kh\xe1c:</strong>",id:"-b\u1ea1n-c\xf3-th\u1ec3-th\u1eed-nghi\u1ec7m-v\u1edbi-c\xe1c-file-kh\xe1c",level:2}];function d(n){const e={blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(e.blockquote,{children:["\n",(0,t.jsxs)(e.p,{children:["\ud83d\udee0 ",(0,t.jsx)(e.strong,{children:"XXE Injection - Th\u1eed nghi\u1ec7m khai th\xe1c"})]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-1-m\u1ee5c-ti\xeau-c\u1ee7a-b\xe0i-th\u1ef1c-h\xe0nh",children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"1. M\u1ee5c ti\xeau c\u1ee7a b\xe0i th\u1ef1c h\xe0nh"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["G\u1eedi b\xecnh lu\u1eadn tr\xean \u1ea3nh v\xe0 th\u1eed th\u1ef1c hi\u1ec7n ",(0,t.jsx)(e.strong,{children:"XXE Injection"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:["M\u1ee5c ti\xeau: ",(0,t.jsx)(e.strong,{children:"li\u1ec7t k\xea th\u01b0 m\u1ee5c g\u1ed1c"})," (",(0,t.jsx)(e.code,{children:"/"})," tr\xean Linux, ",(0,t.jsx)(e.code,{children:"C:\\"})," tr\xean Windows)."]}),"\n",(0,t.jsxs)(e.li,{children:["D\xf9ng ",(0,t.jsx)(e.strong,{children:"Burp Suite, ZAP Proxy"})," ho\u1eb7c ",(0,t.jsx)(e.strong,{children:"DevTools"})," \u0111\u1ec3 ph\xe2n t\xedch request."]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-2-c\xe1ch-th\u1ef1c-hi\u1ec7n",children:["\ud83d\udd25 ",(0,t.jsx)(e.strong,{children:"2. C\xe1ch th\u1ef1c hi\u1ec7n"})]}),"\n",(0,t.jsx)(e.h3,{id:"-b\u01b0\u1edbc-1-g\u1eedi-b\xecnh-lu\u1eadn-b\xecnh-th\u01b0\u1eddng",children:(0,t.jsx)(e.strong,{children:"\ud83d\udccc B\u01b0\u1edbc 1: G\u1eedi b\xecnh lu\u1eadn b\xecnh th\u01b0\u1eddng"})}),"\n",(0,t.jsx)(e.p,{children:"Tr\u01b0\u1edbc ti\xean, th\u1eed g\u1eedi m\u1ed9t b\xecnh lu\u1eadn b\xecnh th\u01b0\u1eddng \u0111\u1ec3 xem request \u0111\u01b0\u1ee3c g\u1eedi nh\u01b0 th\u1ebf n\xe0o."}),"\n",(0,t.jsx)(e.p,{children:"V\xed d\u1ee5:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-xml",children:"<comment>\n  <text>I am a cat</text>\n</comment>\n"})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udd0d ",(0,t.jsx)(e.strong,{children:"Ph\xe2n t\xedch format XML c\u1ee7a request n\xe0y."})]}),"\n",(0,t.jsx)(e.h3,{id:"-b\u01b0\u1edbc-2-d\xf9ng-burpzap-\u0111\u1ec3-ch\u1eb7n-request",children:(0,t.jsx)(e.strong,{children:"\ud83d\udccc B\u01b0\u1edbc 2: D\xf9ng Burp/ZAP \u0111\u1ec3 ch\u1eb7n request"})}),"\n",(0,t.jsxs)(e.ol,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"M\u1edf Burp Suite ho\u1eb7c ZAP"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"B\u1eadt Intercept Mode (Burp) ho\u1eb7c Breakpoint (ZAP)"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"G\u1eedi m\u1ed9t b\xecnh lu\u1eadn"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"Ph\xe2n t\xedch request \u0111\u01b0\u1ee3c g\u1eedi \u0111i"}),"."]}),"\n"]}),"\n",(0,t.jsx)(e.h3,{id:"-b\u01b0\u1edbc-3-thay-\u0111\u1ed5i-request-\u0111\u1ec3-th\u1ef1c-hi\u1ec7n-xxe-injection",children:(0,t.jsx)(e.strong,{children:"\ud83d\udccc B\u01b0\u1edbc 3: Thay \u0111\u1ed5i request \u0111\u1ec3 th\u1ef1c hi\u1ec7n XXE Injection"})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udc49 Thay \u0111\u1ed5i ph\u1ea7n ",(0,t.jsx)(e.code,{children:"text"})," th\xe0nh:"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-xml",children:'<?xml version="1.0"?>\n<!DOCTYPE comment [<!ENTITY xxe SYSTEM "file:///">]>\n<comment>\n  <text>&xxe;</text>\n</comment>\n'})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"Gi\u1ea3i th\xedch:"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:"<!DOCTYPE comment [...]>"}),": Khai b\xe1o ",(0,t.jsx)(e.strong,{children:"DOCTYPE"})," \u0111\u1ec3 c\xf3 th\u1ec3 s\u1eed d\u1ee5ng ",(0,t.jsx)(e.code,{children:"ENTITY"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:'<!ENTITY xxe SYSTEM "file:///">'}),": \u0110\u1ecbnh ngh\u0129a m\u1ed9t entity \u0111\u1ec3 \u0111\u1ecdc th\u01b0 m\u1ee5c g\u1ed1c ",(0,t.jsx)(e.code,{children:"/"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:"<text>&xxe;</text>"}),": Ch\xe8n entity v\xe0o n\u1ed9i dung b\xecnh lu\u1eadn."]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-3-ki\u1ec3m-tra-ph\u1ea3n-h\u1ed3i-c\u1ee7a-server",children:["\ud83d\udd0e ",(0,t.jsx)(e.strong,{children:"3. Ki\u1ec3m tra ph\u1ea3n h\u1ed3i c\u1ee7a server"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["N\u1ebfu server tr\u1ea3 v\u1ec1 danh s\xe1ch th\u01b0 m\u1ee5c (",(0,t.jsx)(e.code,{children:"bin, etc, home, root..."}),"), ",(0,t.jsx)(e.strong,{children:"XXE Injection th\xe0nh c\xf4ng"}),"."]}),"\n",(0,t.jsxs)(e.li,{children:["N\u1ebfu kh\xf4ng c\xf3 ph\u1ea3n h\u1ed3i ho\u1eb7c c\xf3 l\u1ed7i, c\xf3 th\u1ec3 server \u0111\xe3 ",(0,t.jsx)(e.strong,{children:"v\xf4 hi\u1ec7u h\xf3a DTD"})," ho\u1eb7c ",(0,t.jsx)(e.strong,{children:"b\u1ea3o v\u1ec7 XXE"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{id:"-4-ph\xf2ng-ch\u1ed1ng-xxe",children:["\ud83d\udea8 ",(0,t.jsx)(e.strong,{children:"4. Ph\xf2ng ch\u1ed1ng XXE"})]}),"\n",(0,t.jsxs)(e.p,{children:["\u2705 ",(0,t.jsx)(e.strong,{children:"V\xf4 hi\u1ec7u h\xf3a DOCTYPE trong XML parser"}),(0,t.jsx)(e.br,{}),"\n","\u2705 ",(0,t.jsxs)(e.strong,{children:["Kh\xf4ng cho ph\xe9p \u0111\u1ecdc external entities (",(0,t.jsx)(e.code,{children:'SYSTEM "file:///"'}),")"]}),(0,t.jsx)(e.br,{}),"\n","\u2705 ",(0,t.jsx)(e.strong,{children:"S\u1eed d\u1ee5ng JSON thay v\xec XML n\u1ebfu c\xf3 th\u1ec3"}),(0,t.jsx)(e.br,{}),"\n","\u2705 ",(0,t.jsxs)(e.strong,{children:["D\xf9ng WAF \u0111\u1ec3 ph\xe1t hi\u1ec7n payload ch\u1ee9a ",(0,t.jsx)(e.code,{children:"<!ENTITY"})]})]}),"\n",(0,t.jsxs)(e.h2,{id:"-b\u1ea1n-c\xf3-th\u1ec3-th\u1eed-nghi\u1ec7m-v\u1edbi-c\xe1c-file-kh\xe1c",children:["\ud83d\udce2 ",(0,t.jsx)(e.strong,{children:"B\u1ea1n c\xf3 th\u1ec3 th\u1eed nghi\u1ec7m v\u1edbi c\xe1c file kh\xe1c:"})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-xml",children:'<!ENTITY xxe SYSTEM "file:///etc/passwd">  \x3c!-- Linux --\x3e\n<!ENTITY xxe SYSTEM "file:///C:/Windows/win.ini">  \x3c!-- Windows --\x3e\n'})})]})}function a(n={}){const{wrapper:e}={...(0,c.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>r,x:()=>h});var t=i(96540);const c={},s=t.createContext(c);function r(n){const e=t.useContext(s);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function h(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:r(n.components),t.createElement(s.Provider,{value:e},n.children)}}}]);