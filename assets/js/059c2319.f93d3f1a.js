"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[4617],{68584:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>l,contentTitle:()=>h,default:()=>o,frontMatter:()=>c,metadata:()=>r,toc:()=>d});var s=e(74848),i=e(28453);const c={slug:"load-testing-restful-apis-with-k6-part-04",title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fk6.io/showcase/"},h=void 0,r={id:"k6/part-04",title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",description:"Trong c\xe1c b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch c\xe0i \u0111\u1eb7t k6, vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n, ch\u1ea1y k\u1ecbch b\u1ea3n test v\xe0 xem k\u1ebft qu\u1ea3. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6.",source:"@site/docs/05-k6/part-04.md",sourceDirName:"05-k6",slug:"/k6/load-testing-restful-apis-with-k6-part-04",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-04",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/05-k6/part-04.md",tags:[{inline:!0,label:"load-testing",permalink:"/docs/tags/load-testing"},{inline:!0,label:"k6",permalink:"/docs/tags/k-6"},{inline:!0,label:"restful-api",permalink:"/docs/tags/restful-api"},{inline:!0,label:"performance-testing",permalink:"/docs/tags/performance-testing"},{inline:!0,label:"setup",permalink:"/docs/tags/setup"}],version:"current",lastUpdatedAt:1725684768e3,frontMatter:{slug:"load-testing-restful-apis-with-k6-part-04",title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fk6.io/showcase/"},sidebar:"tutorialSidebar",previous:{title:"Load testing v\u1edbi Virtual Users",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-03"},next:{title:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test v\u1edbi Grafana v\xe0 InfluxDB",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-05"}},l={},d=[{value:"K\u1ebft qu\u1ea3 c\u1ee7a k6",id:"k\u1ebft-qu\u1ea3-c\u1ee7a-k6",level:2},{value:"\xdd ngh\u0129a",id:"\xfd-ngh\u0129a",level:2},{value:"1. Logo c\u1ee7a k6",id:"1-logo-c\u1ee7a-k6",level:3},{value:"2. Th\xf4ng tin v\u1ec1 k\u1ecbch b\u1ea3n test",id:"2-th\xf4ng-tin-v\u1ec1-k\u1ecbch-b\u1ea3n-test",level:3},{value:"3. K\u1ebft qu\u1ea3 c\u1ee7a k\u1ecbch b\u1ea3n test",id:"3-k\u1ebft-qu\u1ea3-c\u1ee7a-k\u1ecbch-b\u1ea3n-test",level:3},{value:"3.1. Th\xf4ng tin v\u1ec1 k\u1ecbch b\u1ea3n test",id:"31-th\xf4ng-tin-v\u1ec1-k\u1ecbch-b\u1ea3n-test",level:4},{value:"3.2. Th\xf4ng tin v\u1ec1 qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test",id:"32-th\xf4ng-tin-v\u1ec1-qu\xe1-tr\xecnh-ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",level:4},{value:"L\u1eddi k\u1ebft",id:"l\u1eddi-k\u1ebft",level:2}];function a(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{align:"right",children:(0,s.jsx)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-04&label=\u26aaView&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})}),"\n",(0,s.jsxs)(t.p,{children:["Trong c\xe1c b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch ",(0,s.jsx)(t.strong,{children:"c\xe0i \u0111\u1eb7t"})," ",(0,s.jsx)(t.a,{href:"https://k6.io",children:"k6"}),", ",(0,s.jsx)(t.strong,{children:"vi\u1ebft"})," m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n, ",(0,s.jsx)(t.strong,{children:"ch\u1ea1y"})," k\u1ecbch b\u1ea3n test v\xe0 ",(0,s.jsx)(t.strong,{children:"xem"})," k\u1ebft qu\u1ea3. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6."]}),"\n",(0,s.jsx)(t.h2,{id:"k\u1ebft-qu\u1ea3-c\u1ee7a-k6",children:"K\u1ebft qu\u1ea3 c\u1ee7a k6"}),"\n",(0,s.jsx)(t.p,{children:"Khi ch\u1ea1y k\u1ecbch b\u1ea3n test, k6 s\u1ebd hi\u1ec3n th\u1ecb k\u1ebft qu\u1ea3 tr\xean m\xe0n h\xecnh console. K\u1ebft qu\u1ea3 n\xe0y c\xf3 th\u1ec3 kh\xe1 d\xe0i, nh\u01b0ng ch\xfang ta s\u1ebd t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a t\u1eebng ph\u1ea7n trong k\u1ebft qu\u1ea3 n\xe0y."}),"\n",(0,s.jsx)(t.p,{children:"Gi\u1ea3 s\u1eed ta c\xf3 m\u1ed9t k\u1ebft qu\u1ea3 nh\u01b0 sau:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"          /\\      |\u203e\u203e| /\u203e\u203e/   /\u203e\u203e/\n     /\\  /  \\     |  |/  /   /  /\n    /  \\/    \\    |     (   /   \u203e\u203e\\\n   /          \\   |  |\\  \\ |  (\u203e)  |\n  / __________ \\  |__| \\__\\ \\_____/ .io\n\n  execution: local\n     script: script.js\n     output: -\n\n  scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):\n           * default: 10 looping VUs for 30s (gracefulStop: 30s)\n\n\n     data_received..................: 2.7 MB 88 kB/s\n     data_sent......................: 26 kB  844 B/s\n     http_req_blocked...............: avg=24.59ms  min=0s       med=0s       max=575.19ms p(90)=0s       p(95)=135.71\xb5s       \n     http_req_connecting............: avg=10.94ms  min=0s       med=0s       max=260.2ms  p(90)=0s       p(95)=0s\n     http_req_duration..............: avg=276.78ms min=244.65ms med=261.01ms max=574.14ms p(90)=279.08ms p(95)=506.76ms       \n       { expected_response:true }...: avg=276.78ms min=244.65ms med=261.01ms max=574.14ms p(90)=279.08ms p(95)=506.76ms       \n     http_req_failed................: 0.00%  \u2713 0        \u2717 233\n     http_req_receiving.............: avg=13.12ms  min=0s       med=0s       max=261.03ms p(90)=977.48\xb5s p(95)=98.09ms        \n     http_req_sending...............: avg=35.59\xb5s  min=0s       med=0s       max=1.41ms   p(90)=0s       p(95)=0s\n     http_req_tls_handshaking.......: avg=11.95ms  min=0s       med=0s       max=284.05ms p(90)=0s       p(95)=0s\n     http_req_waiting...............: avg=263.62ms min=243.91ms med=258.58ms max=573.54ms p(90)=267.65ms p(95)=277.49ms       \n     http_reqs......................: 233    7.495798/s\n     iteration_duration.............: avg=1.3s     min=1.24s    med=1.26s    max=1.87s    p(90)=1.5s     p(95)=1.53s\n     iterations.....................: 233    7.495798/s\n     vus............................: 1      min=1      max=10\n     vus_max........................: 10     min=10     max=10\n\n\nrunning (0m31.1s), 00/10 VUs, 233 complete and 0 interrupted iterations\ndefault \u2713 [======================================] 10 VUs  30s\n"})}),"\n",(0,s.jsx)(t.h2,{id:"\xfd-ngh\u0129a",children:"\xdd ngh\u0129a"}),"\n",(0,s.jsx)(t.p,{children:"K\u1ebft qu\u1ea3 n\xe0y \u0111\u01b0\u1ee3c chia th\xe0nh 3 ph\u1ea7n:"}),"\n",(0,s.jsx)(t.h3,{id:"1-logo-c\u1ee7a-k6",children:"1. Logo c\u1ee7a k6"}),"\n",(0,s.jsx)(t.p,{children:"Ph\u1ea7n \u0111\u1ea7u ti\xean l\xe0 logo c\u1ee7a k6. Ph\u1ea7n n\xe0y kh\xf4ng c\xf3 \xfd ngh\u0129a g\xec \u0111\u1eb7c bi\u1ec7t."}),"\n",(0,s.jsx)(t.h3,{id:"2-th\xf4ng-tin-v\u1ec1-k\u1ecbch-b\u1ea3n-test",children:"2. Th\xf4ng tin v\u1ec1 k\u1ecbch b\u1ea3n test"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"execution"}),": c\xe1ch th\u1ee9c ch\u1ea1y k\u1ecbch b\u1ea3n test. Trong tr\u01b0\u1eddng h\u1ee3p n\xe0y, k\u1ecbch b\u1ea3n test \u0111\u01b0\u1ee3c ch\u1ea1y tr\xean m\xe1y local."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"script"}),": ch\u1ee9a t\xean c\u1ee7a file ch\u1ee9a k\u1ecbch b\u1ea3n test."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"output"}),": c\xe1ch xu\u1ea5t k\u1ebft qu\u1ea3. Trong tr\u01b0\u1eddng h\u1ee3p n\xe0y, k\u1ebft qu\u1ea3 \u0111\u01b0\u1ee3c xu\u1ea5t tr\u1ef1c ti\u1ebfp tr\xean m\xe0n h\xecnh console."]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"3-k\u1ebft-qu\u1ea3-c\u1ee7a-k\u1ecbch-b\u1ea3n-test",children:"3. K\u1ebft qu\u1ea3 c\u1ee7a k\u1ecbch b\u1ea3n test"}),"\n",(0,s.jsx)(t.h4,{id:"31-th\xf4ng-tin-v\u1ec1-k\u1ecbch-b\u1ea3n-test",children:"3.1. Th\xf4ng tin v\u1ec1 k\u1ecbch b\u1ea3n test"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"scenarios"}),": k\u1ecbch b\u1ea3n test, bao g\u1ed3m:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"default"}),": t\xean c\u1ee7a k\u1ecbch b\u1ea3n test."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"10 looping VUs for 30s"}),": 10 virtual users s\u1ebd \u0111\u01b0\u1ee3c t\u1ea1o ra v\xe0 ch\u1ea1y k\u1ecbch b\u1ea3n test trong 30 gi\xe2y."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"gracefulStop: 30s"}),": k\u1ecbch b\u1ea3n test s\u1ebd \u0111\u01b0\u1ee3c ch\u1ea1y trong 30 gi\xe2y."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"C\xe1c ch\u1ec9 s\u1ed1:"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"T\xean ch\u1ec9 s\u1ed1"}),(0,s.jsx)(t.th,{style:{textAlign:"center"},children:"\u0110\u01a1n v\u1ecb"}),(0,s.jsx)(t.th,{children:"\xdd ngh\u0129a"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"data_received"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"byte"})}),(0,s.jsx)(t.td,{children:"L\u01b0\u1ee3ng d\u1eef li\u1ec7u nh\u1eadn \u0111\u01b0\u1ee3c trong qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"data_sent"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"byte"})}),(0,s.jsx)(t.td,{children:"L\u01b0\u1ee3ng d\u1eef li\u1ec7u g\u1eedi \u0111i trong qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_req_blocked"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"millisecond"})}),(0,s.jsx)(t.td,{children:"Th\u1eddi gian ch\u1edd \u0111\u1ec3 g\u1eedi request HTTP."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_req_connecting"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"millisecond"})}),(0,s.jsx)(t.td,{children:"Th\u1eddi gian k\u1ebft n\u1ed1i \u0111\u1ebfn m\xe1y ch\u1ee7."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_req_duration"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"millisecond"})}),(0,s.jsx)(t.td,{children:"Th\u1eddi gian th\u1ef1c thi request HTTP."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_req_failed"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"%"})}),(0,s.jsx)(t.td,{children:"S\u1ed1 l\u01b0\u1ee3ng request HTTP th\u1ea5t b\u1ea1i."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_req_receiving"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"millisecond"})}),(0,s.jsx)(t.td,{children:"Th\u1eddi gian nh\u1eadn ph\u1ea3n h\u1ed3i t\u1eeb m\xe1y ch\u1ee7."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_req_sending"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"millisecond"})}),(0,s.jsx)(t.td,{children:"Th\u1eddi gian g\u1eedi request HTTP."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_req_tls_handshaking"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"millisecond"})}),(0,s.jsx)(t.td,{children:"Th\u1eddi gian b\u1eaft tay TLS."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_req_waiting"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"millisecond"})}),(0,s.jsx)(t.td,{children:"Th\u1eddi gian ch\u1edd ph\u1ea3n h\u1ed3i t\u1eeb m\xe1y ch\u1ee7."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"http_reqs"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"request"})}),(0,s.jsx)(t.td,{children:"S\u1ed1 l\u01b0\u1ee3ng request HTTP \u0111\u01b0\u1ee3c g\u1eedi \u0111i."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"iteration_duration"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"millisecond"})}),(0,s.jsx)(t.td,{children:"Th\u1eddi gian th\u1ef1c thi m\u1ed9t v\xf2ng l\u1eb7p."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"iterations"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"iteration"})}),(0,s.jsx)(t.td,{children:"S\u1ed1 l\u01b0\u1ee3ng v\xf2ng l\u1eb7p \u0111\u01b0\u1ee3c th\u1ef1c thi."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"vus"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"VU"})}),(0,s.jsx)(t.td,{children:"S\u1ed1 l\u01b0\u1ee3ng virtual users."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"vus_max"})}),(0,s.jsx)(t.td,{style:{textAlign:"center"},children:(0,s.jsx)(t.code,{children:"VU"})}),(0,s.jsx)(t.td,{children:"S\u1ed1 l\u01b0\u1ee3ng virtual users t\u1ed1i \u0111a."})]})]})]}),"\n",(0,s.jsx)(t.h4,{id:"32-th\xf4ng-tin-v\u1ec1-qu\xe1-tr\xecnh-ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",children:"3.2. Th\xf4ng tin v\u1ec1 qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"running"}),": qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test, bao g\u1ed3m:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"0m31.1s"}),": th\u1eddi gian ch\u1ea1y k\u1ecbch b\u1ea3n test."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"00/10 VUs"}),": s\u1ed1 l\u01b0\u1ee3ng virtual users hi\u1ec7n t\u1ea1i."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"233 complete and 0 interrupted iterations"}),": s\u1ed1 l\u01b0\u1ee3ng v\xf2ng l\u1eb7p \u0111\xe3 th\u1ef1c thi v\xe0 s\u1ed1 l\u01b0\u1ee3ng v\xf2ng l\u1eb7p b\u1ecb gi\xe1n \u0111o\u1ea1n."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"default"}),": qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test, bao g\u1ed3m:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"10 VUs"}),": s\u1ed1 l\u01b0\u1ee3ng virtual users."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"30s"}),": th\u1eddi gian ch\u1ea1y k\u1ecbch b\u1ea3n test."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"l\u1eddi-k\u1ebft",children:"L\u1eddi k\u1ebft"}),"\n",(0,s.jsx)(t.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho b\u1ea1n trong vi\u1ec7c t\xecm hi\u1ec3u v\u1ec1 k6."}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"/docs/k6/load-testing-restful-apis-with-k6-part-05",children:"B\xe0i vi\u1ebft ti\u1ebfp theo"}),", ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 c\u1ee7a k6 b\u1eb1ng Grafana v\xe0 InfluxDB."]})]})}function o(n={}){const{wrapper:t}={...(0,i.R)(),...n.components};return t?(0,s.jsx)(t,{...n,children:(0,s.jsx)(a,{...n})}):a(n)}},28453:(n,t,e)=>{e.d(t,{R:()=>h,x:()=>r});var s=e(96540);const i={},c=s.createContext(i);function h(n){const t=s.useContext(c);return s.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function r(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:h(n.components),s.createElement(c.Provider,{value:t},n.children)}}}]);