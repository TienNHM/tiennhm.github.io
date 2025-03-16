"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[4328],{58064:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>h,contentTitle:()=>c,default:()=>g,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var t=i(74848),s=i(28453);const o={title:"4.01 | Spoofing an Authentication Cookie",slug:"spoofing-an-authentication-cookie-01",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Spoofing an Authentication Cookie tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:4,tags:["web-security","webgoat","broken-access-control","spoofing-an-authentication-cookie","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","spoofing-an-authentication-cookie","webgoat-2023.8"],enableComments:!0,draft:!1},c=void 0,r={id:"web-security/webgoat-2023.8/A1-Broken-Access-Control/Spoofing-an-Authentication-Cookie-01",title:"4.01 | Spoofing an Authentication Cookie",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Spoofing an Authentication Cookie tr\xean WebGoat 2023.8",source:"@site/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Spoofing-an-Authentication-Cookie-01.md",sourceDirName:"02-web-security/webgoat-2023.8/A1-Broken-Access-Control",slug:"/web-security/webgoat-2023.8/A1-Broken-Access-Control/spoofing-an-authentication-cookie-01",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/spoofing-an-authentication-cookie-01",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/02-web-security/webgoat-2023.8/A1-Broken-Access-Control/Spoofing-an-Authentication-Cookie-01.md",tags:[{inline:!0,label:"web-security",permalink:"/en/docs/tags/web-security"},{inline:!0,label:"webgoat",permalink:"/en/docs/tags/webgoat"},{inline:!0,label:"broken-access-control",permalink:"/en/docs/tags/broken-access-control"},{inline:!0,label:"spoofing-an-authentication-cookie",permalink:"/en/docs/tags/spoofing-an-authentication-cookie"},{inline:!0,label:"webgoat-2023.8",permalink:"/en/docs/tags/webgoat-2023-8"}],version:"current",lastUpdatedAt:1742145178e3,sidebarPosition:4,frontMatter:{title:"4.01 | Spoofing an Authentication Cookie",slug:"spoofing-an-authentication-cookie-01",description:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1ch t\u1ea5n c\xf4ng Spoofing an Authentication Cookie tr\xean WebGoat 2023.8",image:"https://tiennhm.github.io/img/docs/database.jpg",sidebar_position:4,tags:["web-security","webgoat","broken-access-control","spoofing-an-authentication-cookie","webgoat-2023.8"],keywords:["web-security","webgoat","broken-access-control","spoofing-an-authentication-cookie","webgoat-2023.8"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"3.04 | Missing Function Level Access Control",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-04"},next:{title:"4.02 | Spoofing an Authentication Cookie",permalink:"/en/docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/spoofing-an-authentication-cookie-02"}},h={},l=[{value:"<strong>\ud83d\udccc 1\ufe0f\u20e3 T\u1ea1i sao authentication cookies d\u1ec5 b\u1ecb t\u1ea5n c\xf4ng?</strong>",id:"-1\ufe0f\u20e3-t\u1ea1i-sao-authentication-cookies-d\u1ec5-b\u1ecb-t\u1ea5n-c\xf4ng",level:2},{value:"<strong>\u2705 2\ufe0f\u20e3 Gi\u1ea3i ph\xe1p ph\xf2ng tr\xe1nh</strong>",id:"-2\ufe0f\u20e3-gi\u1ea3i-ph\xe1p-ph\xf2ng-tr\xe1nh",level:2},{value:"\ud83d\udd39 <strong>1. S\u1eed d\u1ee5ng cookie b\u1ea3o m\u1eadt (Secure, HttpOnly, SameSite, Domain, Path)</strong>",id:"-1-s\u1eed-d\u1ee5ng-cookie-b\u1ea3o-m\u1eadt-secure-httponly-samesite-domain-path",level:3},{value:"\ud83d\udd39 <strong>2. M\xe3 h\xf3a &amp; k\xfd cookie \u0111\u1ec3 ch\u1ed1ng gi\u1ea3 m\u1ea1o</strong>",id:"-2-m\xe3-h\xf3a--k\xfd-cookie-\u0111\u1ec3-ch\u1ed1ng-gi\u1ea3-m\u1ea1o",level:3},{value:"\ud83d\udd39 <strong>3. H\u1ea1n ch\u1ebf th\u1eddi gian s\u1ed1ng c\u1ee7a cookie (Session Expiration)</strong>",id:"-3-h\u1ea1n-ch\u1ebf-th\u1eddi-gian-s\u1ed1ng-c\u1ee7a-cookie-session-expiration",level:3},{value:"\ud83d\udd39 <strong>4. Ch\u1ed1ng t\u1ea5n c\xf4ng Cross-Site Scripting (XSS)</strong>",id:"-4-ch\u1ed1ng-t\u1ea5n-c\xf4ng-cross-site-scripting-xss",level:3},{value:"\ud83d\udd39 <strong>5. Ch\u1ed1ng t\u1ea5n c\xf4ng Session Fixation</strong>",id:"-5-ch\u1ed1ng-t\u1ea5n-c\xf4ng-session-fixation",level:3},{value:"<strong>\ud83d\udd0e 3\ufe0f\u20e3 K\u1ebft lu\u1eadn</strong>",id:"-3\ufe0f\u20e3-k\u1ebft-lu\u1eadn",level:2}];function a(n){const e={blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(e.blockquote,{children:["\n",(0,t.jsxs)(e.p,{children:["\ud83d\udd10 ",(0,t.jsx)(e.strong,{children:"Ph\xf2ng tr\xe1nh l\u1ed7 h\u1ed5ng b\u1ea3o m\u1eadt li\xean quan \u0111\u1ebfn Authentication Cookies"})]}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"-1\ufe0f\u20e3-t\u1ea1i-sao-authentication-cookies-d\u1ec5-b\u1ecb-t\u1ea5n-c\xf4ng",children:(0,t.jsx)(e.strong,{children:"\ud83d\udccc 1\ufe0f\u20e3 T\u1ea1i sao authentication cookies d\u1ec5 b\u1ecb t\u1ea5n c\xf4ng?"})}),"\n",(0,t.jsxs)(e.ol,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"D\u1ef1 \u0111o\xe1n thu\u1eadt to\xe1n sinh cookie"})," \u2192 Hacker c\xf3 th\u1ec3 t\u1ea1o cookie gi\u1ea3 m\u1ea1o."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"\u0110\xe1nh c\u1eafp cookie qua XSS"})," \u2192 N\u1ebfu trang web c\xf3 l\u1ed7 h\u1ed5ng XSS, hacker c\xf3 th\u1ec3 l\u1ea5y cookie c\u1ee7a user."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"T\u1ea5n c\xf4ng Man-in-the-Middle (MitM)"})," \u2192 N\u1ebfu cookie kh\xf4ng \u0111\u01b0\u1ee3c b\u1ea3o v\u1ec7 b\u1eb1ng HTTPS, hacker c\xf3 th\u1ec3 ch\u1eb7n cookie trong qu\xe1 tr\xecnh truy\u1ec1n."]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.strong,{children:"Cookie kh\xf4ng c\xf3 th\u1eddi h\u1ea1n h\u1ebft h\u1ea1n (Session Fixation)"})," \u2192 Hacker c\xf3 th\u1ec3 d\xf9ng l\u1ea1i cookie c\u0169 \u0111\u1ec3 truy c\u1eadp v\xe0o t\xe0i kho\u1ea3n."]}),"\n"]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,t.jsx)(e.strong,{children:"M\u1ee5c ti\xeau c\u1ee7a ch\xfang ta:"}),(0,t.jsx)(e.br,{}),"\n","\u2714\ufe0f B\u1ea3o v\u1ec7 cookie kh\u1ecfi b\u1ecb \u0111\xe1nh c\u1eafp.",(0,t.jsx)(e.br,{}),"\n","\u2714\ufe0f Ng\u0103n hacker gi\u1ea3 m\u1ea1o cookie.",(0,t.jsx)(e.br,{}),"\n","\u2714\ufe0f Gi\u1ea3m thi\u1ec3u th\u1eddi gian hacker c\xf3 th\u1ec3 khai th\xe1c cookie."]}),"\n",(0,t.jsx)(e.h2,{id:"-2\ufe0f\u20e3-gi\u1ea3i-ph\xe1p-ph\xf2ng-tr\xe1nh",children:(0,t.jsx)(e.strong,{children:"\u2705 2\ufe0f\u20e3 Gi\u1ea3i ph\xe1p ph\xf2ng tr\xe1nh"})}),"\n",(0,t.jsxs)(e.h3,{id:"-1-s\u1eed-d\u1ee5ng-cookie-b\u1ea3o-m\u1eadt-secure-httponly-samesite-domain-path",children:["\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"1. S\u1eed d\u1ee5ng cookie b\u1ea3o m\u1eadt (Secure, HttpOnly, SameSite, Domain, Path)"})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"Sai l\u1ea7m ph\u1ed5 bi\u1ebfn:"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Kh\xf4ng \u0111\u1eb7t thu\u1ed9c t\xednh ",(0,t.jsx)(e.code,{children:"HttpOnly"}),", cho ph\xe9p hacker l\u1ea5y cookie b\u1eb1ng JavaScript (XSS)."]}),"\n",(0,t.jsxs)(e.li,{children:["Kh\xf4ng \u0111\u1eb7t ",(0,t.jsx)(e.code,{children:"Secure"}),", khi\u1ebfn cookie b\u1ecb g\u1eedi qua HTTP thay v\xec HTTPS."]}),"\n",(0,t.jsxs)(e.li,{children:["Kh\xf4ng c\xf3 ",(0,t.jsx)(e.code,{children:"SameSite"}),", l\xe0m cho cookie b\u1ecb g\u1eedi \u0111\u1ebfn trang web kh\xe1c (CSRF)."]}),"\n"]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"C\xe1ch l\xe0m \u0111\xfang:"}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"K\xedch ho\u1ea1t c\xe1c thu\u1ed9c t\xednh b\u1ea3o m\u1eadt trong cookie"}),":"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-http",children:"Set-Cookie: sessionId=abc123; Secure; HttpOnly; SameSite=Strict; Path=/; Domain=example.com;\n"})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"\xdd ngh\u0129a c\xe1c thu\u1ed9c t\xednh:"})]}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"Thu\u1ed9c t\xednh"}),(0,t.jsx)(e.th,{children:"\xdd ngh\u0129a"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"Secure"})}),(0,t.jsx)(e.td,{children:"Ch\u1ec9 g\u1eedi cookie qua HTTPS, ng\u0103n ch\u1eb7n t\u1ea5n c\xf4ng MitM."})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"HttpOnly"})}),(0,t.jsx)(e.td,{children:"Ng\u0103n JavaScript truy c\u1eadp cookie, gi\u1ea3m r\u1ee7i ro XSS."})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"SameSite=Strict"})}),(0,t.jsx)(e.td,{children:"Ng\u0103n CSRF b\u1eb1ng c\xe1ch ch\u1ec9 g\u1eedi cookie trong c\xf9ng m\u1ed9t site."})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"Domain & Path"})}),(0,t.jsx)(e.td,{children:"Gi\u1edbi h\u1ea1n cookie ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng trong ph\u1ea1m vi nh\u1ea5t \u0111\u1ecbnh."})]})]})]}),"\n",(0,t.jsxs)(e.h3,{id:"-2-m\xe3-h\xf3a--k\xfd-cookie-\u0111\u1ec3-ch\u1ed1ng-gi\u1ea3-m\u1ea1o",children:["\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"2. M\xe3 h\xf3a & k\xfd cookie \u0111\u1ec3 ch\u1ed1ng gi\u1ea3 m\u1ea1o"})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"Sai l\u1ea7m ph\u1ed5 bi\u1ebfn:"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"L\u01b0u th\xf4ng tin session tr\u1ef1c ti\u1ebfp trong cookie d\u01b0\u1edbi d\u1ea1ng plaintext."}),"\n",(0,t.jsx)(e.li,{children:"Kh\xf4ng c\xf3 c\u01a1 ch\u1ebf x\xe1c th\u1ef1c t\xednh h\u1ee3p l\u1ec7 c\u1ee7a cookie."}),"\n"]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"C\xe1ch l\xe0m \u0111\xfang:"}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"S\u1eed d\u1ee5ng JWT (JSON Web Token) \u0111\u1ec3 k\xfd v\xe0 m\xe3 h\xf3a cookie"}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"D\xf9ng thu\u1eadt to\xe1n b\u0103m m\u1ea1nh nh\u01b0 HMAC-SHA256 \u0111\u1ec3 \u0111\u1ea3m b\u1ea3o t\xednh to\xe0n v\u1eb9n c\u1ee7a cookie"})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\ude80 ",(0,t.jsx)(e.strong,{children:"V\xed d\u1ee5: T\u1ea1o cookie an to\xe0n v\u1edbi JWT trong Node.js"})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"const jwt = require('jsonwebtoken');\n\nconst user = { id: 123, username: \"admin\" };\nconst secretKey = \"supersecretkey\";\nconst token = jwt.sign(user, secretKey, { expiresIn: '1h' });\n\n// L\u01b0u v\xe0o cookie v\u1edbi c\xe1c thu\u1ed9c t\xednh b\u1ea3o m\u1eadt\nres.cookie('auth', token, { httpOnly: true, secure: true, sameSite: 'Strict' });\n"})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,t.jsx)(e.strong,{children:"L\u1ee3i \xedch:"}),(0,t.jsx)(e.br,{}),"\n","\u2705 Hacker kh\xf4ng th\u1ec3 s\u1eeda n\u1ed9i dung cookie do c\xf3 ch\u1eef k\xfd s\u1ed1.",(0,t.jsx)(e.br,{}),"\n","\u2705 Token c\xf3 th\u1eddi h\u1ea1n h\u1ebft h\u1ea1n, gi\u1ea3m nguy c\u01a1 b\u1ecb l\u1ee3i d\u1ee5ng l\xe2u d\xe0i."]}),"\n",(0,t.jsxs)(e.h3,{id:"-3-h\u1ea1n-ch\u1ebf-th\u1eddi-gian-s\u1ed1ng-c\u1ee7a-cookie-session-expiration",children:["\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"3. H\u1ea1n ch\u1ebf th\u1eddi gian s\u1ed1ng c\u1ee7a cookie (Session Expiration)"})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"Sai l\u1ea7m ph\u1ed5 bi\u1ebfn:"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Cookie kh\xf4ng c\xf3 th\u1eddi gian h\u1ebft h\u1ea1n \u2192 N\u1ebfu b\u1ecb \u0111\xe1nh c\u1eafp, hacker c\xf3 th\u1ec3 d\xf9ng m\xe3i m\xe3i."}),"\n"]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"C\xe1ch l\xe0m \u0111\xfang:"}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"\u0110\u1eb7t th\u1eddi gian h\u1ebft h\u1ea1n ng\u1eafn cho cookie."}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"B\u1eaft bu\u1ed9c \u0111\u0103ng xu\u1ea5t ng\u01b0\u1eddi d\xf9ng sau m\u1ed9t kho\u1ea3ng th\u1eddi gian kh\xf4ng ho\u1ea1t \u0111\u1ed9ng."})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\ude80 ",(0,t.jsx)(e.strong,{children:"V\xed d\u1ee5: \u0110\u1eb7t th\u1eddi gian h\u1ebft h\u1ea1n cho cookie"})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-http",children:"Set-Cookie: sessionId=abc123; Secure; HttpOnly; Expires=Wed, 21 Oct 2025 07:28:00 GMT;\n"})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,t.jsx)(e.strong,{children:"L\u1ee3i \xedch:"}),(0,t.jsx)(e.br,{}),"\n","\u2705 N\u1ebfu hacker c\xf3 cookie, n\xf3 c\u0169ng s\u1ebd h\u1ebft h\u1ea1n nhanh ch\xf3ng.",(0,t.jsx)(e.br,{}),"\n","\u2705 Gi\u1ea3m th\u1eddi gian hacker c\xf3 th\u1ec3 khai th\xe1c phi\xean ng\u01b0\u1eddi d\xf9ng."]}),"\n",(0,t.jsxs)(e.h3,{id:"-4-ch\u1ed1ng-t\u1ea5n-c\xf4ng-cross-site-scripting-xss",children:["\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"4. Ch\u1ed1ng t\u1ea5n c\xf4ng Cross-Site Scripting (XSS)"})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"Sai l\u1ea7m ph\u1ed5 bi\u1ebfn:"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Website c\xf3 l\u1ed7 h\u1ed5ng XSS \u2192 Hacker c\xf3 th\u1ec3 l\u1ea5y cookie qua ",(0,t.jsx)(e.code,{children:"document.cookie"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"C\xe1ch l\xe0m \u0111\xfang:"}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsxs)(e.strong,{children:["\u0110\u1eb7t thu\u1ed9c t\xednh ",(0,t.jsx)(e.code,{children:"HttpOnly"})," \u0111\u1ec3 ng\u0103n JavaScript \u0111\u1ecdc cookie."]}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"L\u1ecdc & m\xe3 h\xf3a \u0111\u1ea7u v\xe0o \u0111\u1ec3 tr\xe1nh XSS."}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"D\xf9ng Content Security Policy (CSP) \u0111\u1ec3 ng\u0103n ch\u1eb7n JavaScript \u0111\u1ed9c h\u1ea1i."})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\ude80 ",(0,t.jsx)(e.strong,{children:"V\xed d\u1ee5: K\xedch ho\u1ea1t CSP trong header"})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-http",children:"Content-Security-Policy: default-src 'self'; script-src 'self';\n"})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,t.jsx)(e.strong,{children:"L\u1ee3i \xedch:"}),(0,t.jsx)(e.br,{}),"\n","\u2705 Ng\u0103n hacker ch\xe8n m\xe3 JavaScript \u0111\u1ec3 l\u1ea5y cookie.",(0,t.jsx)(e.br,{}),"\n","\u2705 T\u0103ng c\u01b0\u1eddng b\u1ea3o m\u1eadt cho to\xe0n b\u1ed9 \u1ee9ng d\u1ee5ng web."]}),"\n",(0,t.jsxs)(e.h3,{id:"-5-ch\u1ed1ng-t\u1ea5n-c\xf4ng-session-fixation",children:["\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"5. Ch\u1ed1ng t\u1ea5n c\xf4ng Session Fixation"})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"Sai l\u1ea7m ph\u1ed5 bi\u1ebfn:"})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["H\u1ec7 th\u1ed1ng gi\u1eef nguy\xean ",(0,t.jsx)(e.code,{children:"sessionId"})," sau khi user \u0111\u0103ng nh\u1eadp \u2192 Hacker c\xf3 th\u1ec3 \xe9p user s\u1eed d\u1ee5ng session c\u1ee7a m\xecnh."]}),"\n"]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"C\xe1ch l\xe0m \u0111\xfang:"}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"T\u1ea1o session m\u1edbi sau khi \u0111\u0103ng nh\u1eadp th\xe0nh c\xf4ng."}),(0,t.jsx)(e.br,{}),"\n","\ud83d\udd39 ",(0,t.jsx)(e.strong,{children:"Kh\xf4ng cho ph\xe9p ng\u01b0\u1eddi d\xf9ng t\u1ef1 \u0111\u1eb7t sessionId."})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\ude80 ",(0,t.jsx)(e.strong,{children:"V\xed d\u1ee5: Reset session sau khi \u0111\u0103ng nh\u1eadp"})]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"req.session.regenerate(function(err) {\n    req.session.user = user;\n    res.redirect('/dashboard');\n});\n"})}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udca1 ",(0,t.jsx)(e.strong,{children:"L\u1ee3i \xedch:"}),(0,t.jsx)(e.br,{}),"\n","\u2705 Hacker kh\xf4ng th\u1ec3 \xe9p user d\xf9ng session c\u0169 c\u1ee7a h\u1eafn.",(0,t.jsx)(e.br,{}),"\n","\u2705 \u0110\u1ea3m b\u1ea3o m\u1ed7i l\u1ea7n \u0111\u0103ng nh\u1eadp c\xf3 session ri\xeang."]}),"\n",(0,t.jsx)(e.h2,{id:"-3\ufe0f\u20e3-k\u1ebft-lu\u1eadn",children:(0,t.jsx)(e.strong,{children:"\ud83d\udd0e 3\ufe0f\u20e3 K\u1ebft lu\u1eadn"})}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsxs)(e.th,{children:["\u274c ",(0,t.jsx)(e.strong,{children:"Sai l\u1ea7m"})]}),(0,t.jsxs)(e.th,{children:["\u2705 ",(0,t.jsx)(e.strong,{children:"C\xe1ch s\u1eeda"})]})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsxs)(e.td,{children:["Kh\xf4ng \u0111\u1eb7t ",(0,t.jsx)(e.code,{children:"HttpOnly"}),", cho ph\xe9p hacker l\u1ea5y cookie qua XSS"]}),(0,t.jsxs)(e.td,{children:["\u0110\u1eb7t ",(0,t.jsx)(e.code,{children:"HttpOnly"})," \u0111\u1ec3 ng\u0103n JavaScript truy c\u1eadp cookie"]})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsxs)(e.td,{children:["Kh\xf4ng \u0111\u1eb7t ",(0,t.jsx)(e.code,{children:"Secure"}),", cho ph\xe9p g\u1eedi cookie qua HTTP"]}),(0,t.jsxs)(e.td,{children:["\u0110\u1eb7t ",(0,t.jsx)(e.code,{children:"Secure"})," \u0111\u1ec3 ch\u1ec9 g\u1eedi cookie qua HTTPS"]})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Kh\xf4ng \u0111\u1eb7t th\u1eddi gian h\u1ebft h\u1ea1n cho cookie"}),(0,t.jsxs)(e.td,{children:["Thi\u1ebft l\u1eadp th\u1eddi gian h\u1ebft h\u1ea1n (",(0,t.jsx)(e.code,{children:"Expires"})," ho\u1eb7c ",(0,t.jsx)(e.code,{children:"Max-Age"}),")"]})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"L\u01b0u th\xf4ng tin session trong cookie kh\xf4ng m\xe3 h\xf3a"}),(0,t.jsx)(e.td,{children:"S\u1eed d\u1ee5ng JWT ho\u1eb7c HMAC-SHA256 \u0111\u1ec3 b\u1ea3o v\u1ec7 d\u1eef li\u1ec7u trong cookie"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"Kh\xf4ng \u0111\u1ed5i sessionId sau khi \u0111\u0103ng nh\u1eadp"}),(0,t.jsxs)(e.td,{children:[(0,t.jsx)(e.strong,{children:"Regenerate session"})," sau khi \u0111\u0103ng nh\u1eadp th\xe0nh c\xf4ng"]})]})]})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udccc ",(0,t.jsx)(e.strong,{children:"B\xe0i h\u1ecdc quan tr\u1ecdng:"}),(0,t.jsx)(e.br,{}),"\n","\u2705 ",(0,t.jsx)(e.strong,{children:"Cookie ph\u1ea3i \u0111\u01b0\u1ee3c b\u1ea3o v\u1ec7 b\u1eb1ng nhi\u1ec1u l\u1edbp"}),": m\xe3 h\xf3a, k\xfd, h\u1ea1n ch\u1ebf truy c\u1eadp.",(0,t.jsx)(e.br,{}),"\n","\u2705 ",(0,t.jsx)(e.strong,{children:"Ch\u1ec9 s\u1eeda l\u1ed7i tr\xean UI kh\xf4ng \u0111\u1ee7 \u2013 ph\u1ea3i ki\u1ec3m tra backend"}),"!",(0,t.jsx)(e.br,{}),"\n","\u2705 ",(0,t.jsx)(e.strong,{children:"B\u1ea3o m\u1eadt authentication cookies l\xe0 c\u1ed1t l\xf5i c\u1ee7a m\u1ecdi h\u1ec7 th\u1ed1ng \u0111\u0103ng nh\u1eadp."})]}),"\n",(0,t.jsxs)(e.p,{children:["\ud83d\udd25 ",(0,t.jsx)(e.strong,{children:'"M\u1ed9t cookie kh\xf4ng \u0111\u01b0\u1ee3c b\u1ea3o v\u1ec7 c\xf3 th\u1ec3 ph\xe1 h\u1ee7y to\xe0n b\u1ed9 h\u1ec7 th\u1ed1ng!"'})," \ud83d\ude80"]})]})}function g(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(a,{...n})}):a(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>c,x:()=>r});var t=i(96540);const s={},o=t.createContext(s);function c(n){const e=t.useContext(o);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),t.createElement(o.Provider,{value:e},n.children)}}}]);