"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[5693],{3905:(t,e,n)=>{n.d(e,{Zo:()=>m,kt:()=>h});var a=n(67294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=a.createContext({}),c=function(t){var e=a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},m=function(t){var e=c(t.components);return a.createElement(s.Provider,{value:e},t.children)},o="mdxType",k={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,s=t.parentName,m=p(t,["components","mdxType","originalType","parentName"]),o=c(n),d=r,h=o["".concat(s,".").concat(d)]||o[d]||k[d]||i;return n?a.createElement(h,l(l({ref:e},m),{},{components:n})):a.createElement(h,l({ref:e},m))}));function h(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,l=new Array(i);l[0]=d;var p={};for(var s in e)hasOwnProperty.call(e,s)&&(p[s]=e[s]);p.originalType=t,p[o]="string"==typeof t?t:r,l[1]=p;for(var c=2;c<i;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},46843:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>l,default:()=>k,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var a=n(87462),r=(n(67294),n(3905));const i={slug:"load-testing-restful-apis-with-k6-part-04",title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},l=void 0,p={unversionedId:"k6/part-04",id:"k6/part-04",title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",description:"Trong c\xe1c b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch c\xe0i \u0111\u1eb7t k6, vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n, ch\u1ea1y k\u1ecbch b\u1ea3n test v\xe0 xem k\u1ebft qu\u1ea3. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6.",source:"@site/docs/05-k6/part-04.md",sourceDirName:"05-k6",slug:"/k6/load-testing-restful-apis-with-k6-part-04",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-04",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/05-k6/part-04.md",tags:[{label:"load-testing",permalink:"/en/docs/tags/load-testing"},{label:"k6",permalink:"/en/docs/tags/k-6"},{label:"restful-api",permalink:"/en/docs/tags/restful-api"},{label:"performance-testing",permalink:"/en/docs/tags/performance-testing"},{label:"setup",permalink:"/en/docs/tags/setup"}],version:"current",lastUpdatedAt:1702222766,formattedLastUpdatedAt:"Dec 10, 2023",frontMatter:{slug:"load-testing-restful-apis-with-k6-part-04",title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},sidebar:"tutorialSidebar",previous:{title:"Load testing v\u1edbi Virtual Users",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-03"},next:{title:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test v\u1edbi Grafana v\xe0 InfluxDB",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-05"}},s={},c=[{value:"K\u1ebft qu\u1ea3 c\u1ee7a k6",id:"k\u1ebft-qu\u1ea3-c\u1ee7a-k6",level:2},{value:"\xdd ngh\u0129a",id:"\xfd-ngh\u0129a",level:2},{value:"1. Logo c\u1ee7a k6",id:"1-logo-c\u1ee7a-k6",level:3},{value:"2. Th\xf4ng tin v\u1ec1 k\u1ecbch b\u1ea3n test",id:"2-th\xf4ng-tin-v\u1ec1-k\u1ecbch-b\u1ea3n-test",level:3},{value:"3. K\u1ebft qu\u1ea3 c\u1ee7a k\u1ecbch b\u1ea3n test",id:"3-k\u1ebft-qu\u1ea3-c\u1ee7a-k\u1ecbch-b\u1ea3n-test",level:3},{value:"3.1. Th\xf4ng tin v\u1ec1 k\u1ecbch b\u1ea3n test",id:"31-th\xf4ng-tin-v\u1ec1-k\u1ecbch-b\u1ea3n-test",level:4},{value:"3.2. Th\xf4ng tin v\u1ec1 qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test",id:"32-th\xf4ng-tin-v\u1ec1-qu\xe1-tr\xecnh-ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",level:4},{value:"L\u1eddi k\u1ebft",id:"l\u1eddi-k\u1ebft",level:2}],m={toc:c},o="wrapper";function k(t){let{components:e,...n}=t;return(0,r.kt)(o,(0,a.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",{align:"right"},(0,r.kt)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-04&label=\u26aaViews&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})),(0,r.kt)("p",null,"Trong c\xe1c b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch ",(0,r.kt)("strong",{parentName:"p"},"c\xe0i \u0111\u1eb7t")," ",(0,r.kt)("a",{parentName:"p",href:"https://k6.io"},"k6"),", ",(0,r.kt)("strong",{parentName:"p"},"vi\u1ebft")," m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n, ",(0,r.kt)("strong",{parentName:"p"},"ch\u1ea1y")," k\u1ecbch b\u1ea3n test v\xe0 ",(0,r.kt)("strong",{parentName:"p"},"xem")," k\u1ebft qu\u1ea3. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6."),(0,r.kt)("h2",{id:"k\u1ebft-qu\u1ea3-c\u1ee7a-k6"},"K\u1ebft qu\u1ea3 c\u1ee7a k6"),(0,r.kt)("p",null,"Khi ch\u1ea1y k\u1ecbch b\u1ea3n test, k6 s\u1ebd hi\u1ec3n th\u1ecb k\u1ebft qu\u1ea3 tr\xean m\xe0n h\xecnh console. K\u1ebft qu\u1ea3 n\xe0y c\xf3 th\u1ec3 kh\xe1 d\xe0i, nh\u01b0ng ch\xfang ta s\u1ebd t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a t\u1eebng ph\u1ea7n trong k\u1ebft qu\u1ea3 n\xe0y."),(0,r.kt)("p",null,"Gi\u1ea3 s\u1eed ta c\xf3 m\u1ed9t k\u1ebft qu\u1ea3 nh\u01b0 sau:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"          /\\      |\u203e\u203e| /\u203e\u203e/   /\u203e\u203e/\n     /\\  /  \\     |  |/  /   /  /\n    /  \\/    \\    |     (   /   \u203e\u203e\\\n   /          \\   |  |\\  \\ |  (\u203e)  |\n  / __________ \\  |__| \\__\\ \\_____/ .io\n\n  execution: local\n     script: script.js\n     output: -\n\n  scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):\n           * default: 10 looping VUs for 30s (gracefulStop: 30s)\n\n\n     data_received..................: 2.7 MB 88 kB/s\n     data_sent......................: 26 kB  844 B/s\n     http_req_blocked...............: avg=24.59ms  min=0s       med=0s       max=575.19ms p(90)=0s       p(95)=135.71\xb5s       \n     http_req_connecting............: avg=10.94ms  min=0s       med=0s       max=260.2ms  p(90)=0s       p(95)=0s\n     http_req_duration..............: avg=276.78ms min=244.65ms med=261.01ms max=574.14ms p(90)=279.08ms p(95)=506.76ms       \n       { expected_response:true }...: avg=276.78ms min=244.65ms med=261.01ms max=574.14ms p(90)=279.08ms p(95)=506.76ms       \n     http_req_failed................: 0.00%  \u2713 0        \u2717 233\n     http_req_receiving.............: avg=13.12ms  min=0s       med=0s       max=261.03ms p(90)=977.48\xb5s p(95)=98.09ms        \n     http_req_sending...............: avg=35.59\xb5s  min=0s       med=0s       max=1.41ms   p(90)=0s       p(95)=0s\n     http_req_tls_handshaking.......: avg=11.95ms  min=0s       med=0s       max=284.05ms p(90)=0s       p(95)=0s\n     http_req_waiting...............: avg=263.62ms min=243.91ms med=258.58ms max=573.54ms p(90)=267.65ms p(95)=277.49ms       \n     http_reqs......................: 233    7.495798/s\n     iteration_duration.............: avg=1.3s     min=1.24s    med=1.26s    max=1.87s    p(90)=1.5s     p(95)=1.53s\n     iterations.....................: 233    7.495798/s\n     vus............................: 1      min=1      max=10\n     vus_max........................: 10     min=10     max=10\n\n\nrunning (0m31.1s), 00/10 VUs, 233 complete and 0 interrupted iterations\ndefault \u2713 [======================================] 10 VUs  30s\n")),(0,r.kt)("h2",{id:"\xfd-ngh\u0129a"},"\xdd ngh\u0129a"),(0,r.kt)("p",null,"K\u1ebft qu\u1ea3 n\xe0y \u0111\u01b0\u1ee3c chia th\xe0nh 3 ph\u1ea7n:"),(0,r.kt)("h3",{id:"1-logo-c\u1ee7a-k6"},"1. Logo c\u1ee7a k6"),(0,r.kt)("p",null,"Ph\u1ea7n \u0111\u1ea7u ti\xean l\xe0 logo c\u1ee7a k6. Ph\u1ea7n n\xe0y kh\xf4ng c\xf3 \xfd ngh\u0129a g\xec \u0111\u1eb7c bi\u1ec7t."),(0,r.kt)("h3",{id:"2-th\xf4ng-tin-v\u1ec1-k\u1ecbch-b\u1ea3n-test"},"2. Th\xf4ng tin v\u1ec1 k\u1ecbch b\u1ea3n test"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"execution"),": c\xe1ch th\u1ee9c ch\u1ea1y k\u1ecbch b\u1ea3n test. Trong tr\u01b0\u1eddng h\u1ee3p n\xe0y, k\u1ecbch b\u1ea3n test \u0111\u01b0\u1ee3c ch\u1ea1y tr\xean m\xe1y local."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"script"),": ch\u1ee9a t\xean c\u1ee7a file ch\u1ee9a k\u1ecbch b\u1ea3n test."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"output"),": c\xe1ch xu\u1ea5t k\u1ebft qu\u1ea3. Trong tr\u01b0\u1eddng h\u1ee3p n\xe0y, k\u1ebft qu\u1ea3 \u0111\u01b0\u1ee3c xu\u1ea5t tr\u1ef1c ti\u1ebfp tr\xean m\xe0n h\xecnh console. ")),(0,r.kt)("h3",{id:"3-k\u1ebft-qu\u1ea3-c\u1ee7a-k\u1ecbch-b\u1ea3n-test"},"3. K\u1ebft qu\u1ea3 c\u1ee7a k\u1ecbch b\u1ea3n test"),(0,r.kt)("h4",{id:"31-th\xf4ng-tin-v\u1ec1-k\u1ecbch-b\u1ea3n-test"},"3.1. Th\xf4ng tin v\u1ec1 k\u1ecbch b\u1ea3n test"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"scenarios"),": k\u1ecbch b\u1ea3n test, bao g\u1ed3m:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"default"),": t\xean c\u1ee7a k\u1ecbch b\u1ea3n test."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"10 looping VUs for 30s"),": 10 virtual users s\u1ebd \u0111\u01b0\u1ee3c t\u1ea1o ra v\xe0 ch\u1ea1y k\u1ecbch b\u1ea3n test trong 30 gi\xe2y."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"gracefulStop: 30s"),": k\u1ecbch b\u1ea3n test s\u1ebd \u0111\u01b0\u1ee3c ch\u1ea1y trong 30 gi\xe2y."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"C\xe1c ch\u1ec9 s\u1ed1:"))),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"T\xean ch\u1ec9 s\u1ed1"),(0,r.kt)("th",{parentName:"tr",align:"center"},"\u0110\u01a1n v\u1ecb"),(0,r.kt)("th",{parentName:"tr",align:null},"\xdd ngh\u0129a"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"data_received")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"byte")),(0,r.kt)("td",{parentName:"tr",align:null},"L\u01b0\u1ee3ng d\u1eef li\u1ec7u nh\u1eadn \u0111\u01b0\u1ee3c trong qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"data_sent")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"byte")),(0,r.kt)("td",{parentName:"tr",align:null},"L\u01b0\u1ee3ng d\u1eef li\u1ec7u g\u1eedi \u0111i trong qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_req_blocked")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"millisecond")),(0,r.kt)("td",{parentName:"tr",align:null},"Th\u1eddi gian ch\u1edd \u0111\u1ec3 g\u1eedi request HTTP.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_req_connecting")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"millisecond")),(0,r.kt)("td",{parentName:"tr",align:null},"Th\u1eddi gian k\u1ebft n\u1ed1i \u0111\u1ebfn m\xe1y ch\u1ee7.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_req_duration")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"millisecond")),(0,r.kt)("td",{parentName:"tr",align:null},"Th\u1eddi gian th\u1ef1c thi request HTTP.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_req_failed")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"%")),(0,r.kt)("td",{parentName:"tr",align:null},"S\u1ed1 l\u01b0\u1ee3ng request HTTP th\u1ea5t b\u1ea1i.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_req_receiving")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"millisecond")),(0,r.kt)("td",{parentName:"tr",align:null},"Th\u1eddi gian nh\u1eadn ph\u1ea3n h\u1ed3i t\u1eeb m\xe1y ch\u1ee7.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_req_sending")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"millisecond")),(0,r.kt)("td",{parentName:"tr",align:null},"Th\u1eddi gian g\u1eedi request HTTP.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_req_tls_handshaking")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"millisecond")),(0,r.kt)("td",{parentName:"tr",align:null},"Th\u1eddi gian b\u1eaft tay TLS.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_req_waiting")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"millisecond")),(0,r.kt)("td",{parentName:"tr",align:null},"Th\u1eddi gian ch\u1edd ph\u1ea3n h\u1ed3i t\u1eeb m\xe1y ch\u1ee7.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"http_reqs")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"request")),(0,r.kt)("td",{parentName:"tr",align:null},"S\u1ed1 l\u01b0\u1ee3ng request HTTP \u0111\u01b0\u1ee3c g\u1eedi \u0111i.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"iteration_duration")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"millisecond")),(0,r.kt)("td",{parentName:"tr",align:null},"Th\u1eddi gian th\u1ef1c thi m\u1ed9t v\xf2ng l\u1eb7p.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"iterations")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"iteration")),(0,r.kt)("td",{parentName:"tr",align:null},"S\u1ed1 l\u01b0\u1ee3ng v\xf2ng l\u1eb7p \u0111\u01b0\u1ee3c th\u1ef1c thi.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vus")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"VU")),(0,r.kt)("td",{parentName:"tr",align:null},"S\u1ed1 l\u01b0\u1ee3ng virtual users.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"vus_max")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"VU")),(0,r.kt)("td",{parentName:"tr",align:null},"S\u1ed1 l\u01b0\u1ee3ng virtual users t\u1ed1i \u0111a.")))),(0,r.kt)("h4",{id:"32-th\xf4ng-tin-v\u1ec1-qu\xe1-tr\xecnh-ch\u1ea1y-k\u1ecbch-b\u1ea3n-test"},"3.2. Th\xf4ng tin v\u1ec1 qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"running"),": qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test, bao g\u1ed3m:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"0m31.1s"),": th\u1eddi gian ch\u1ea1y k\u1ecbch b\u1ea3n test."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"00/10 VUs"),": s\u1ed1 l\u01b0\u1ee3ng virtual users hi\u1ec7n t\u1ea1i."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"233 complete and 0 interrupted iterations"),": s\u1ed1 l\u01b0\u1ee3ng v\xf2ng l\u1eb7p \u0111\xe3 th\u1ef1c thi v\xe0 s\u1ed1 l\u01b0\u1ee3ng v\xf2ng l\u1eb7p b\u1ecb gi\xe1n \u0111o\u1ea1n."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"default"),": qu\xe1 tr\xecnh ch\u1ea1y k\u1ecbch b\u1ea3n test, bao g\u1ed3m:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"10 VUs"),": s\u1ed1 l\u01b0\u1ee3ng virtual users."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"30s"),": th\u1eddi gian ch\u1ea1y k\u1ecbch b\u1ea3n test.")))),(0,r.kt)("h2",{id:"l\u1eddi-k\u1ebft"},"L\u1eddi k\u1ebft"),(0,r.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u \xfd ngh\u0129a c\u1ee7a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho b\u1ea1n trong vi\u1ec7c t\xecm hi\u1ec3u v\u1ec1 k6."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/en/docs/k6/load-testing-restful-apis-with-k6-part-05"},"B\xe0i vi\u1ebft ti\u1ebfp theo"),", ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 c\u1ee7a k6 b\u1eb1ng Grafana v\xe0 InfluxDB."))}k.isMDXComponent=!0}}]);