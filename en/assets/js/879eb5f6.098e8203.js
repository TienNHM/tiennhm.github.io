"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[8989],{3905:(t,n,e)=>{e.d(n,{Zo:()=>c,kt:()=>g});var i=e(67294);function a(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function s(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,i)}return e}function r(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?s(Object(e),!0).forEach((function(n){a(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):s(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function p(t,n){if(null==t)return{};var e,i,a=function(t,n){if(null==t)return{};var e,i,a={},s=Object.keys(t);for(i=0;i<s.length;i++)e=s[i],n.indexOf(e)>=0||(a[e]=t[e]);return a}(t,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(i=0;i<s.length;i++)e=s[i],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(a[e]=t[e])}return a}var o=i.createContext({}),l=function(t){var n=i.useContext(o),e=n;return t&&(e="function"==typeof t?t(n):r(r({},n),t)),e},c=function(t){var n=l(t.components);return i.createElement(o.Provider,{value:n},t.children)},h="mdxType",m={inlineCode:"code",wrapper:function(t){var n=t.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(t,n){var e=t.components,a=t.mdxType,s=t.originalType,o=t.parentName,c=p(t,["components","mdxType","originalType","parentName"]),h=l(e),u=a,g=h["".concat(o,".").concat(u)]||h[u]||m[u]||s;return e?i.createElement(g,r(r({ref:n},c),{},{components:e})):i.createElement(g,r({ref:n},c))}));function g(t,n){var e=arguments,a=n&&n.mdxType;if("string"==typeof t||a){var s=e.length,r=new Array(s);r[0]=u;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=t,p[h]="string"==typeof t?t:a,r[1]=p;for(var l=2;l<s;l++)r[l]=e[l];return i.createElement.apply(null,r)}return i.createElement.apply(null,e)}u.displayName="MDXCreateElement"},35263:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>l});var i=e(87462),a=(e(67294),e(3905));const s={slug:"load-testing-restful-apis-with-k6-part-03",title:"Load testing v\u1edbi Virtual Users",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},r=void 0,p={unversionedId:"k6/part-03",id:"k6/part-03",title:"Load testing v\u1edbi Virtual Users",description:"Trong b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API th\xf4ng qua m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n \u0111\u1ec3 t\u1ea1o, \u0111\u1ecdc, c\u1eadp nh\u1eadt v\xe0 x\xf3a m\u1ed9t ng\u01b0\u1eddi d\xf9ng. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API th\xf4ng qua m\u1ed9t k\u1ecbch b\u1ea3n test v\u1edbi nhi\u1ec1u Virtual User.",source:"@site/docs/05-k6/part-03.md",sourceDirName:"05-k6",slug:"/k6/load-testing-restful-apis-with-k6-part-03",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-03",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/05-k6/part-03.md",tags:[{label:"load-testing",permalink:"/en/docs/tags/load-testing"},{label:"k6",permalink:"/en/docs/tags/k-6"},{label:"restful-api",permalink:"/en/docs/tags/restful-api"},{label:"performance-testing",permalink:"/en/docs/tags/performance-testing"},{label:"setup",permalink:"/en/docs/tags/setup"}],version:"current",frontMatter:{slug:"load-testing-restful-apis-with-k6-part-03",title:"Load testing v\u1edbi Virtual Users",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},sidebar:"tutorialSidebar",previous:{title:"Load testing API \u0111\u01a1n gi\u1ea3n",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-02"},next:{title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-04"}},o={},l=[{value:"M\u1ee5c ti\xeau",id:"m\u1ee5c-ti\xeau",level:2},{value:"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test v\u1edbi nhi\u1ec1u Virtual User",id:"vi\u1ebft-m\u1ed9t-k\u1ecbch-b\u1ea3n-test-v\u1edbi-nhi\u1ec1u-virtual-user",level:2},{value:"S\u1eed d\u1ee5ng c\u1edd <code>--vus</code> v\xe0 <code>--duration</code>",id:"s\u1eed-d\u1ee5ng-c\u1edd---vus-v\xe0---duration",level:3},{value:"Th\xf4ng qua set <code>options</code>",id:"th\xf4ng-qua-set-options",level:3},{value:"K\u1ebft qu\u1ea3",id:"k\u1ebft-qu\u1ea3",level:3},{value:"T\u0103ng, gi\u1ea3m s\u1ed1 l\u01b0\u1ee3ng Virtual User theo t\u1eebng giai \u0111o\u1ea1n",id:"t\u0103ng-gi\u1ea3m-s\u1ed1-l\u01b0\u1ee3ng-virtual-user-theo-t\u1eebng-giai-\u0111o\u1ea1n",level:2},{value:"K\u1ebft qu\u1ea3",id:"k\u1ebft-qu\u1ea3-1",level:3},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],c={toc:l},h="wrapper";function m(t){let{components:n,...e}=t;return(0,a.kt)(h,(0,i.Z)({},c,e,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",{align:"right"},(0,a.kt)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-03&label=\u26aaViews&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})),(0,a.kt)("p",null,"Trong ",(0,a.kt)("a",{parentName:"p",href:"/en/docs/k6/load-testing-restful-apis-with-k6-part-02"},"b\xe0i vi\u1ebft tr\u01b0\u1edbc"),", ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API th\xf4ng qua m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n \u0111\u1ec3 t\u1ea1o, \u0111\u1ecdc, c\u1eadp nh\u1eadt v\xe0 x\xf3a m\u1ed9t ng\u01b0\u1eddi d\xf9ng. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io"},"k6")," \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API th\xf4ng qua m\u1ed9t k\u1ecbch b\u1ea3n test v\u1edbi nhi\u1ec1u ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io/docs/misc/glossary/#virtual-user"},"Virtual User"),"."),(0,a.kt)("admonition",{title:"Virtual User",type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Virtual User l\xe0 m\u1ed9t \u0111\u1ea1i di\u1ec7n cho m\u1ed9t ng\u01b0\u1eddi d\xf9ng th\u1ef1c s\u1ef1. M\u1ed9t Virtual User c\xf3 th\u1ec3 th\u1ef1c hi\u1ec7n m\u1ed9t s\u1ed1 h\xe0nh \u0111\u1ed9ng nh\u1ea5t \u0111\u1ecbnh, v\xed d\u1ee5 nh\u01b0 t\u1ea1o m\u1ed9t ng\u01b0\u1eddi d\xf9ng m\u1edbi, \u0111\u1ecdc th\xf4ng tin c\u1ee7a m\u1ed9t ng\u01b0\u1eddi d\xf9ng, c\u1eadp nh\u1eadt th\xf4ng tin c\u1ee7a m\u1ed9t ng\u01b0\u1eddi d\xf9ng, x\xf3a m\u1ed9t ng\u01b0\u1eddi d\xf9ng, v.v.")),(0,a.kt)("p",null,"M\u1ed9t k\u1ecbch b\u1ea3n test c\xf3 th\u1ec3 c\xf3 nhi\u1ec1u Virtual Users. C\xe1c h\xe0nh \u0111\u1ed9ng n\xe0y c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c th\u1ef1c hi\u1ec7n tu\u1ea7n t\u1ef1 ho\u1eb7c \u0111\u1ed3ng th\u1eddi."),(0,a.kt)("p",null,"k6 ch\u1ea1y nhi\u1ec1u l\u1ea7n l\u1eb7p \u0111\u1ed3ng th\u1eddi v\u1edbi ng\u01b0\u1eddi d\xf9ng \u1ea3o (",(0,a.kt)("inlineCode",{parentName:"p"},"VU"),"). N\xf3i chung, nhi\u1ec1u ng\u01b0\u1eddi d\xf9ng \u1ea3o h\u01a1n c\xf3 ngh\u0129a l\xe0 nhi\u1ec1u l\u01b0u l\u01b0\u1ee3ng truy c\u1eadp \u0111\u01b0\u1ee3c m\xf4 ph\u1ecfng h\u01a1n. VU v\u1ec1 c\u01a1 b\u1ea3n l\xe0 c\xe1c v\xf2ng l\u1eb7p ",(0,a.kt)("inlineCode",{parentName:"p"},"while (true)")," ch\u1ea1y \u0111\u1ed3ng th\u1eddi. C\xe1c t\u1eadp l\u1ec7nh \u0111\u01b0\u1ee3c vi\u1ebft b\u1eb1ng JavaScript, d\u01b0\u1edbi d\u1ea1ng module ",(0,a.kt)("a",{parentName:"p",href:"https://www.w3schools.com/js/js_es6.asp"},"ES6"),", v\xec v\u1eady b\u1ea1n c\xf3 th\u1ec3 chia c\xe1c b\xe0i test l\u1edbn th\xe0nh c\xe1c ph\u1ea7n nh\u1ecf h\u01a1n ho\u1eb7c t\u1ea1o c\xe1c module c\xf3 th\u1ec3 s\u1eed d\u1ee5ng l\u1ea1i theo \xfd mu\u1ed1n."),(0,a.kt)("h2",{id:"m\u1ee5c-ti\xeau"},"M\u1ee5c ti\xeau"),(0,a.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API th\xf4ng qua m\u1ed9t k\u1ecbch b\u1ea3n test v\u1edbi nhi\u1ec1u Virtual Users. C\u1ee5 th\u1ec3, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test v\u1edbi nhi\u1ec1u Virtual Users."),(0,a.kt)("li",{parentName:"ul"},"T\u0103ng, gi\u1ea3m s\u1ed1 l\u01b0\u1ee3ng Virtual User theo t\u1eebng giai \u0111o\u1ea1n.")),(0,a.kt)("h2",{id:"vi\u1ebft-m\u1ed9t-k\u1ecbch-b\u1ea3n-test-v\u1edbi-nhi\u1ec1u-virtual-user"},"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test v\u1edbi nhi\u1ec1u Virtual User"),(0,a.kt)("p",null,"Trong ",(0,a.kt)("a",{parentName:"p",href:"/en/docs/k6/load-testing-restful-apis-with-k6-part-02"},"b\xe0i vi\u1ebft tr\u01b0\u1edbc"),", ch\xfang ta \u0111\xe3 l\xe0m quen v\u1edbi vi\u1ec7c t\u1ea1o m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n. Trong \u0111\xf3, file ",(0,a.kt)("inlineCode",{parentName:"p"},"script.js")," c\u1ee7a ch\xfang ta v\u1ec1 c\u01a1 b\u1ea3n s\u1ebd ch\u1ec9 g\u1ecdi API nh\u01b0 th\u1ebf n\xe0y:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import http from 'k6/http';\nimport { sleep } from 'k6';\n\nexport default function () {\n  http.get('https://test.k6.io');\n  sleep(1);\n}\n")),(0,a.kt)("p",null,"\u0110\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test n\xe0y, ch\xfang ta s\u1ebd ch\u1ea1y l\u1ec7nh sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"k6 run script.js\n")),(0,a.kt)("p",null,"B\xe2y gi\u1edd, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch ch\u1ea1y k\u1ecbch b\u1ea3n test n\xe0y v\u1edbi nhi\u1ec1u Virtual User."),(0,a.kt)("h3",{id:"s\u1eed-d\u1ee5ng-c\u1edd---vus-v\xe0---duration"},"S\u1eed d\u1ee5ng c\u1edd ",(0,a.kt)("inlineCode",{parentName:"h3"},"--vus")," v\xe0 ",(0,a.kt)("inlineCode",{parentName:"h3"},"--duration")),(0,a.kt)("p",null,"C\xe1ch \u0111\u01a1n gi\u1ea3n nh\u1ea5t \u0111\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test v\u1edbi nhi\u1ec1u Virtual User l\xe0 s\u1eed d\u1ee5ng c\u1edd ",(0,a.kt)("inlineCode",{parentName:"p"},"--vus")," v\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"--duration"),". C\u1edd ",(0,a.kt)("inlineCode",{parentName:"p"},"--vus")," s\u1ebd ch\u1ec9 \u0111\u1ecbnh s\u1ed1 l\u01b0\u1ee3ng Virtual User c\u1ea7n ch\u1ea1y, c\xf2n c\u1edd ",(0,a.kt)("inlineCode",{parentName:"p"},"--duration")," s\u1ebd ch\u1ec9 \u0111\u1ecbnh th\u1eddi gian ch\u1ea1y c\u1ee7a k\u1ecbch b\u1ea3n test."),(0,a.kt)("p",null,"V\xed d\u1ee5, \u0111\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test v\u1edbi 10 Virtual User trong 30 gi\xe2y, ch\xfang ta s\u1ebd ch\u1ea1y l\u1ec7nh sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"k6 run --vus 10 --duration 30s script.js\n")),(0,a.kt)("h3",{id:"th\xf4ng-qua-set-options"},"Th\xf4ng qua set ",(0,a.kt)("inlineCode",{parentName:"h3"},"options")),(0,a.kt)("p",null,"Ngo\xe0i c\xe1ch s\u1eed d\u1ee5ng c\u1edd ",(0,a.kt)("inlineCode",{parentName:"p"},"--vus")," v\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"--duration"),", ch\xfang ta c\u0169ng c\xf3 th\u1ec3 s\u1eed d\u1ee5ng set ",(0,a.kt)("inlineCode",{parentName:"p"},"options")," \u0111\u1ec3 ch\u1ec9 \u0111\u1ecbnh s\u1ed1 l\u01b0\u1ee3ng Virtual User c\u1ea7n ch\u1ea1y. \u0110\u1ec3 l\xe0m \u0111i\u1ec1u n\xe0y, ch\xfang ta s\u1ebd c\u1ea7n ch\u1ec9nh s\u1eeda file ",(0,a.kt)("inlineCode",{parentName:"p"},"script.js")," nh\u01b0 sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import http from 'k6/http';\nimport { sleep } from 'k6';\n\nexport let options = {\n  vus: 10,\n  duration: '30s',\n};\n\nexport default function () {\n  http.get('https://test.k6.io');\n  sleep(1);\n}\n")),(0,a.kt)("admonition",{type:"warning"},(0,a.kt)("p",{parentName:"admonition"},"L\u01b0u \xfd quan tr\u1ecdng, ch\xfang ta ch\u1ec9 \u0111\u1ecbnh t\u1eeb kh\xf3a ",(0,a.kt)("inlineCode",{parentName:"p"},"export")," cho ",(0,a.kt)("inlineCode",{parentName:"p"},"options")," v\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"default")," \u0111\u1ec3 k6 c\xf3 th\u1ec3 nh\u1eadn di\u1ec7n \u0111\u01b0\u1ee3c c\xe1c gi\xe1 tr\u1ecb n\xe0y.")),(0,a.kt)("p",null,"Sau \u0111\xf3, ch\xfang ta s\u1ebd ch\u1ea1y l\u1ec7nh sau \u0111\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"k6 run script.js\n")),(0,a.kt)("h3",{id:"k\u1ebft-qu\u1ea3"},"K\u1ebft qu\u1ea3"),(0,a.kt)("p",null,"Sau khi ch\u1ea1y k\u1ecbch b\u1ea3n test, ch\xfang ta s\u1ebd nh\u1eadn \u0111\u01b0\u1ee3c k\u1ebft qu\u1ea3 nh\u01b0 sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"          /\\      |\u203e\u203e| /\u203e\u203e/   /\u203e\u203e/\n     /\\  /  \\     |  |/  /   /  /\n    /  \\/    \\    |     (   /   \u203e\u203e\\\n   /          \\   |  |\\  \\ |  (\u203e)  |\n  / __________ \\  |__| \\__\\ \\_____/ .io\n\n  execution: local\n     script: script.js\n     output: -\n\n  scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):\n           * default: 10 looping VUs for 30s (gracefulStop: 30s)\n\n\n     data_received..................: 2.7 MB 88 kB/s\n     data_sent......................: 26 kB  844 B/s\n     http_req_blocked...............: avg=24.59ms  min=0s       med=0s       max=575.19ms p(90)=0s       p(95)=135.71\xb5s       \n     http_req_connecting............: avg=10.94ms  min=0s       med=0s       max=260.2ms  p(90)=0s       p(95)=0s\n     http_req_duration..............: avg=276.78ms min=244.65ms med=261.01ms max=574.14ms p(90)=279.08ms p(95)=506.76ms       \n       { expected_response:true }...: avg=276.78ms min=244.65ms med=261.01ms max=574.14ms p(90)=279.08ms p(95)=506.76ms       \n     http_req_failed................: 0.00%  \u2713 0        \u2717 233\n     http_req_receiving.............: avg=13.12ms  min=0s       med=0s       max=261.03ms p(90)=977.48\xb5s p(95)=98.09ms        \n     http_req_sending...............: avg=35.59\xb5s  min=0s       med=0s       max=1.41ms   p(90)=0s       p(95)=0s\n     http_req_tls_handshaking.......: avg=11.95ms  min=0s       med=0s       max=284.05ms p(90)=0s       p(95)=0s\n     http_req_waiting...............: avg=263.62ms min=243.91ms med=258.58ms max=573.54ms p(90)=267.65ms p(95)=277.49ms       \n     http_reqs......................: 233    7.495798/s\n     iteration_duration.............: avg=1.3s     min=1.24s    med=1.26s    max=1.87s    p(90)=1.5s     p(95)=1.53s\n     iterations.....................: 233    7.495798/s\n     vus............................: 1      min=1      max=10\n     vus_max........................: 10     min=10     max=10\n\n\nrunning (0m31.1s), 00/10 VUs, 233 complete and 0 interrupted iterations\ndefault \u2713 [======================================] 10 VUs  30s\n")),(0,a.kt)("h2",{id:"t\u0103ng-gi\u1ea3m-s\u1ed1-l\u01b0\u1ee3ng-virtual-user-theo-t\u1eebng-giai-\u0111o\u1ea1n"},"T\u0103ng, gi\u1ea3m s\u1ed1 l\u01b0\u1ee3ng Virtual User theo t\u1eebng giai \u0111o\u1ea1n"),(0,a.kt)("p",null,"\u0110\u1ec3 t\u0103ng, gi\u1ea3m s\u1ed1 l\u01b0\u1ee3ng Virtual User theo t\u1eebng giai \u0111o\u1ea1n, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng set ",(0,a.kt)("inlineCode",{parentName:"p"},"stages"),". \u0110\u1ec3 l\xe0m \u0111i\u1ec1u n\xe0y, ch\xfang ta s\u1ebd c\u1ea7n ch\u1ec9nh s\u1eeda file ",(0,a.kt)("inlineCode",{parentName:"p"},"script.js")," nh\u01b0 sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import http from 'k6/http';\nimport { sleep } from 'k6';\n\nexport let options = {\n  stages: [\n    { duration: '30s', target: 20 },\n    { duration: '1m30s', target: 10 },\n    { duration: '20s', target: 0 },\n  ],\n};\n\nexport default function () {\n  http.get('https://test.k6.io');\n  sleep(1);\n}\n")),(0,a.kt)("p",null,"Trong \u0111\xf3, ",(0,a.kt)("inlineCode",{parentName:"p"},"stages")," l\xe0 m\u1ed9t m\u1ea3ng c\xe1c \u0111\u1ed1i t\u01b0\u1ee3ng, m\u1ed7i \u0111\u1ed1i t\u01b0\u1ee3ng \u0111\u1ea1i di\u1ec7n cho m\u1ed9t giai \u0111o\u1ea1n. M\u1ed7i giai \u0111o\u1ea1n s\u1ebd c\xf3 hai thu\u1ed9c t\xednh l\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"duration")," v\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"target"),". Thu\u1ed9c t\xednh ",(0,a.kt)("inlineCode",{parentName:"p"},"duration")," s\u1ebd ch\u1ec9 \u0111\u1ecbnh th\u1eddi gian ch\u1ea1y c\u1ee7a giai \u0111o\u1ea1n, c\xf2n thu\u1ed9c t\xednh ",(0,a.kt)("inlineCode",{parentName:"p"},"target")," s\u1ebd ch\u1ec9 \u0111\u1ecbnh s\u1ed1 l\u01b0\u1ee3ng Virtual User c\u1ea7n ch\u1ea1y trong giai \u0111o\u1ea1n \u0111\xf3."),(0,a.kt)("p",null,"Ta ch\u1ea1y l\u1ec7nh sau \u0111\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"k6 run script.js\n")),(0,a.kt)("h3",{id:"k\u1ebft-qu\u1ea3-1"},"K\u1ebft qu\u1ea3"),(0,a.kt)("p",null,"Sau khi ch\u1ea1y k\u1ecbch b\u1ea3n test, ch\xfang ta s\u1ebd nh\u1eadn \u0111\u01b0\u1ee3c k\u1ebft qu\u1ea3 nh\u01b0 sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"\n          /\\      |\u203e\u203e| /\u203e\u203e/   /\u203e\u203e/\n     /\\  /  \\     |  |/  /   /  /\n    /  \\/    \\    |     (   /   \u203e\u203e\\\n   /          \\   |  |\\  \\ |  (\u203e)  |\n  / __________ \\  |__| \\__\\ \\_____/ .io\n\n  execution: local\n     script: d:\\repos\\tiennhm.github.io\\docs\\k6\\scripts\\script-stages.js\n     output: -\n\n  scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):\n           * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)\n\n\n     data_received..................: 16 MB  115 kB/s\n     data_sent......................: 145 kB 1.0 kB/s\n     http_req_blocked...............: avg=8.67ms   min=0s       med=0s       max=558.01ms p(90)=0s       p(95)=0s\n     http_req_connecting............: avg=4.27ms   min=0s       med=0s       max=268.3ms  p(90)=0s       p(95)=0s\n     http_req_duration..............: avg=282.48ms min=238.45ms med=252.07ms max=2.42s    p(90)=263.6ms  p(95)=493.22ms       \n       { expected_response:true }...: avg=282.48ms min=238.45ms med=252.07ms max=2.42s    p(90)=263.6ms  p(95)=493.22ms       \n     http_req_failed................: 0.00%  \u2713 0        \u2717 1399\n     http_req_receiving.............: avg=9.31ms   min=0s       med=0s       max=1.5s     p(90)=1ms      p(95)=1.17ms\n     http_req_sending...............: avg=35.87\xb5s  min=0s       med=0s       max=34.26ms  p(90)=0s       p(95)=0s\n     http_req_tls_handshaking.......: avg=4.35ms   min=0s       med=0s       max=280.96ms p(90)=0s       p(95)=0s\n     http_req_waiting...............: avg=273.14ms min=238.21ms med=251.42ms max=2.42s    p(90)=260.29ms p(95)=268.94ms       \n     http_reqs......................: 1399   9.918867/s\n     iteration_duration.............: avg=1.29s    min=1.23s    med=1.26s    max=3.43s    p(90)=1.3s     p(95)=1.5s\n     iterations.....................: 1399   9.918867/s\n     vus............................: 1      min=1      max=20\n     vus_max........................: 20     min=20     max=20\n\n\nrunning (2m21.0s), 00/20 VUs, 1399 complete and 0 interrupted iterations\ndefault \u2713 [======================================] 00/20 VUs  2m20s\n")),(0,a.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,a.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API th\xf4ng qua m\u1ed9t k\u1ecbch b\u1ea3n test v\u1edbi nhi\u1ec1u Virtual User th\xf4ng qua c\u1edd ",(0,a.kt)("inlineCode",{parentName:"p"},"--vus")," v\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"--duration")," ho\u1eb7c th\xf4ng qua set ",(0,a.kt)("inlineCode",{parentName:"p"},"options")," v\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"stages"),". Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho b\u1ea1n trong vi\u1ec7c t\xecm hi\u1ec3u v\u1ec1 k6."),(0,a.kt)("p",null,"Trong ",(0,a.kt)("a",{parentName:"p",href:"/en/docs/k6/load-testing-restful-apis-with-k6-part-04"},"b\xe0i vi\u1ebft ti\u1ebfp theo"),", ch\xfang ta s\u1ebd t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6."))}m.isMDXComponent=!0}}]);