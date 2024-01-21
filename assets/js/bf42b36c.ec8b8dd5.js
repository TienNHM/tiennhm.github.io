"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[6697],{3905:(t,n,e)=>{e.d(n,{Zo:()=>l,kt:()=>m});var i=e(67294);function a(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function r(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,i)}return e}function h(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?r(Object(e),!0).forEach((function(n){a(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function c(t,n){if(null==t)return{};var e,i,a=function(t,n){if(null==t)return{};var e,i,a={},r=Object.keys(t);for(i=0;i<r.length;i++)e=r[i],n.indexOf(e)>=0||(a[e]=t[e]);return a}(t,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(i=0;i<r.length;i++)e=r[i],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(a[e]=t[e])}return a}var o=i.createContext({}),s=function(t){var n=i.useContext(o),e=n;return t&&(e="function"==typeof t?t(n):h(h({},n),t)),e},l=function(t){var n=s(t.components);return i.createElement(o.Provider,{value:n},t.children)},p="mdxType",g={inlineCode:"code",wrapper:function(t){var n=t.children;return i.createElement(i.Fragment,{},n)}},k=i.forwardRef((function(t,n){var e=t.components,a=t.mdxType,r=t.originalType,o=t.parentName,l=c(t,["components","mdxType","originalType","parentName"]),p=s(e),k=a,m=p["".concat(o,".").concat(k)]||p[k]||g[k]||r;return e?i.createElement(m,h(h({ref:n},l),{},{components:e})):i.createElement(m,h({ref:n},l))}));function m(t,n){var e=arguments,a=n&&n.mdxType;if("string"==typeof t||a){var r=e.length,h=new Array(r);h[0]=k;var c={};for(var o in n)hasOwnProperty.call(n,o)&&(c[o]=n[o]);c.originalType=t,c[p]="string"==typeof t?t:a,h[1]=c;for(var s=2;s<r;s++)h[s]=e[s];return i.createElement.apply(null,h)}return i.createElement.apply(null,e)}k.displayName="MDXCreateElement"},32661:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>o,contentTitle:()=>h,default:()=>g,frontMatter:()=>r,metadata:()=>c,toc:()=>s});var i=e(87462),a=(e(67294),e(3905));const r={slug:"load-testing-restful-apis-with-k6-part-01",title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t k6",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},h=void 0,c={unversionedId:"k6/part-01",id:"k6/part-01",title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t k6",description:"RESTful API l\xe0 m\u1ed9t trong nh\u1eefng ki\u1ec3u API ph\u1ed5 bi\u1ebfn nh\u1ea5t hi\u1ec7n nay. V\xec v\u1eady, vi\u1ec7c ki\u1ec3m tra t\u1ea3i (load testing) l\xe0 m\u1ed9t ph\u1ea7n quan tr\u1ecdng c\u1ee7a vi\u1ec7c ki\u1ec3m tra hi\u1ec7u su\u1ea5t. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch c\xe0i \u0111\u1eb7t k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API.",source:"@site/docs/05-k6/part-01.md",sourceDirName:"05-k6",slug:"/k6/load-testing-restful-apis-with-k6-part-01",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-01",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/05-k6/part-01.md",tags:[{label:"load-testing",permalink:"/docs/tags/load-testing"},{label:"k6",permalink:"/docs/tags/k-6"},{label:"restful-api",permalink:"/docs/tags/restful-api"},{label:"performance-testing",permalink:"/docs/tags/performance-testing"},{label:"setup",permalink:"/docs/tags/setup"}],version:"current",lastUpdatedAt:1705822708,formattedLastUpdatedAt:"21 thg 1, 2024",frontMatter:{slug:"load-testing-restful-apis-with-k6-part-01",title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t k6",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},sidebar:"tutorialSidebar",previous:{title:"K6 load testing",permalink:"/docs/category/k6-load-testing"},next:{title:"Load testing API \u0111\u01a1n gi\u1ea3n",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-02"}},o={},s=[{value:"Gi\u1edbi thi\u1ec7u v\u1ec1 k6",id:"gi\u1edbi-thi\u1ec7u-v\u1ec1-k6",level:2},{value:"Nh\u1eefng t\xednh n\u0103ng ch\xednh",id:"nh\u1eefng-t\xednh-n\u0103ng-ch\xednh",level:3},{value:"Tr\u01b0\u1eddng h\u1ee3p th\u01b0\u1eddng d\xf9ng",id:"tr\u01b0\u1eddng-h\u1ee3p-th\u01b0\u1eddng-d\xf9ng",level:3},{value:"M\u1ed9t v\xe0i l\u01b0u \xfd",id:"m\u1ed9t-v\xe0i-l\u01b0u-\xfd",level:3},{value:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t",id:"h\u01b0\u1edbng-d\u1eabn-c\xe0i-\u0111\u1eb7t",level:2},{value:"L\u1eddi k\u1ebft",id:"l\u1eddi-k\u1ebft",level:2}],l={toc:s},p="wrapper";function g(t){let{components:n,...e}=t;return(0,a.kt)(p,(0,i.Z)({},l,e,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",{align:"right"},(0,a.kt)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-01&label=\u26aaViews&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://aws.amazon.com/what-is/restful-api/"},"RESTful API")," l\xe0 m\u1ed9t trong nh\u1eefng ki\u1ec3u API ph\u1ed5 bi\u1ebfn nh\u1ea5t hi\u1ec7n nay. V\xec v\u1eady, vi\u1ec7c ki\u1ec3m tra t\u1ea3i (load testing) l\xe0 m\u1ed9t ph\u1ea7n quan tr\u1ecdng c\u1ee7a vi\u1ec7c ki\u1ec3m tra hi\u1ec7u su\u1ea5t. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch ",(0,a.kt)("strong",{parentName:"p"},"c\xe0i \u0111\u1eb7t")," ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io"},"k6")," \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API."),(0,a.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-v\u1ec1-k6"},"Gi\u1edbi thi\u1ec7u v\u1ec1 k6"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://k6.io"},"Grafana k6")," l\xe0 m\u1ed9t c\xf4ng c\u1ee5 ki\u1ec3m tra t\u1ea3i (load testing) m\xe3 ngu\u1ed3n m\u1edf, gi\xfap vi\u1ec7c ki\u1ec3m tra hi\u1ec7u su\u1ea5t (performance testing) tr\u1edf n\xean d\u1ec5 d\xe0ng v\xe0 hi\u1ec7u qu\u1ea3."),(0,a.kt)("p",null,"\u0110\xe2y l\xe0 m\u1ed9t c\xf4ng c\u1ee5 mi\u1ec5n ph\xed, l\u1ea5y nh\xe0 ph\xe1t tri\u1ec3n l\xe0m trung t\xe2m v\xe0 c\xf3 th\u1ec3 d\u1ec5 d\xe0ng m\u1edf r\u1ed9ng, \u0111\u01b0\u1ee3c ph\xe1t tri\u1ec3n b\u1edfi ",(0,a.kt)("a",{parentName:"p",href:"https://grafana.com/"},"Grafana Labs")," v\xe0 c\u1ed9ng \u0111\u1ed3ng."),(0,a.kt)("img",{src:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/",loading:"lazy",decoding:"async"}),(0,a.kt)("h3",{id:"nh\u1eefng-t\xednh-n\u0103ng-ch\xednh"},"Nh\u1eefng t\xednh n\u0103ng ch\xednh"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"k6")," c\xf3 r\u1ea5t nhi\u1ec1u t\xednh n\u0103ng, m\xe0 b\u1ea1n c\xf3 th\u1ec3 d\u1ec5 d\xe0ng t\xecm hi\u1ec3u t\u1ea5t c\u1ea3 ch\xfang trong t\xe0i li\u1ec7u ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io/docs/"},"t\u1ea1i \u0111\xe2y"),". C\xe1c t\xednh n\u0103ng ch\xednh bao g\u1ed3m:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/using-k6/k6-options/how-to/"},"CLI tool")," v\u1edbi API th\xe2n thi\u1ec7n v\u1edbi nh\xe0 ph\xe1t tri\u1ec3n."),(0,a.kt)("li",{parentName:"ul"},"K\u1ecbch b\u1ea3n test d\u1ec5 d\xe0ng vi\u1ebft b\u1eb1ng JavaScript ES2015/ES6 - c\xf3 h\u1ed7 tr\u1ee3 cho c\xe1c ",(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/using-k6/modules/"},"module local v\xe0 remote"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/using-k6/checks/"},"Check")," v\xe0 ",(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/using-k6/thresholds/"},"Thresholds")," - \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i theo \u0111\u1ecbnh h\u01b0\u1edbng m\u1ee5c ti\xeau, th\xe2n thi\u1ec7n v\u1edbi t\u1ef1 \u0111\u1ed9ng h\xf3a.")),(0,a.kt)("h3",{id:"tr\u01b0\u1eddng-h\u1ee3p-th\u01b0\u1eddng-d\xf9ng"},"Tr\u01b0\u1eddng h\u1ee3p th\u01b0\u1eddng d\xf9ng"),(0,a.kt)("p",null,"Ng\u01b0\u1eddi d\xf9ng k6 th\u01b0\u1eddng l\xe0 Developer, QA, SDET v\xe0 SRE. H\u1ecd s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra hi\u1ec7u su\u1ea5t v\xe0 \u0111\u1ed9 tin c\u1eady c\u1ee7a API, ",(0,a.kt)("a",{parentName:"p",href:"https://microservices.io/"},"microservices")," v\xe0 trang web. C\xe1c tr\u01b0\u1eddng h\u1ee3p s\u1eed d\u1ee5ng k6 ph\u1ed5 bi\u1ebfn l\xe0:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Load testing: k6 \u0111\u01b0\u1ee3c t\u1ed1i \u01b0u h\xf3a \u0111\u1ec3 ti\xeau th\u1ee5 t\xe0i nguy\xean t\u1ed1i thi\u1ec3u v\xe0 \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 ch\u1ea1y c\xe1c test t\u1ea3i cao (",(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/test-types/spike-testing/"},"spike"),", ",(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/test-types/stress-testing/"},"stress"),", ",(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/test-types/soak-testing/"},"soak")," tests)."),(0,a.kt)("li",{parentName:"ul"},"Browser testing: Th\xf4ng qua ",(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/using-k6-browser/overview/"},"k6 browser"),", b\u1ea1n c\xf3 th\u1ec3 ch\u1ea1y test hi\u1ec7u su\u1ea5t d\u1ef1a tr\xean tr\xecnh duy\u1ec7t v\xe0 ph\xe1t hi\u1ec7n c\xe1c s\u1ef1 c\u1ed1 ch\u1ec9 li\xean quan \u0111\u1ebfn tr\xecnh duy\u1ec7t m\xe0 c\xf3 th\u1ec3 b\u1ecf qua ho\xe0n to\xe0n \u1edf c\u1ea5p giao th\u1ee9c."),(0,a.kt)("li",{parentName:"ul"},"Chaos v\xe0 resilience testing: k6 c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 m\xf4 ph\u1ecfng l\u01b0u l\u01b0\u1ee3ng truy c\u1eadp nh\u01b0 m\u1ed9t ph\u1ea7n c\u1ee7a vi\u1ec7c test h\u1ed7n lo\u1ea1n (chaos testing), trigger ch\xfang t\u1eeb c\xe1c th\u1eed nghi\u1ec7m k6 ho\u1eb7c \u0111\u01b0a c\xe1c lo\u1ea1i l\u1ed7i kh\xe1c nhau v\xe0o Kubernetes b\u1eb1ng ",(0,a.kt)("a",{parentName:"li",href:"https://k6.io/docs/javascript-api/xk6-disruptor/"},"xk6-disruptor"),"."),(0,a.kt)("li",{parentName:"ul"},"Performance v\xe0 synthetic monitoring: V\u1edbi k6, b\u1ea1n c\xf3 th\u1ec3 t\u1ef1 \u0111\u1ed9ng h\xf3a v\xe0 l\xean l\u1ecbch trigger c\xe1c th\u1eed nghi\u1ec7m r\u1ea5t th\u01b0\u1eddng xuy\xean v\u1edbi t\u1ea3i nh\u1ecf \u0111\u1ec3 li\xean t\u1ee5c x\xe1c th\u1ef1c hi\u1ec7u su\u1ea5t v\xe0 t\xednh kh\u1ea3 d\u1ee5ng c\u1ee7a m\xf4i tr\u01b0\u1eddng production c\u1ee7a b\u1ea1n.")),(0,a.kt)("p",{align:"center"},(0,a.kt)("img",{src:"https://k6.io/blog/static/d63ce8932598c91bbc2f4b5f77d25cab/4be29/api-collaboration.webp",loading:"lazy",decoding:"async"})),(0,a.kt)("h3",{id:"m\u1ed9t-v\xe0i-l\u01b0u-\xfd"},"M\u1ed9t v\xe0i l\u01b0u \xfd"),(0,a.kt)("p",null,"k6 l\xe0 m\u1ed9t c\xf4ng c\u1ee5 ki\u1ec3m tra t\u1ea3i hi\u1ec7u su\u1ea5t cao, c\xf3 th\u1ec3 vi\u1ebft b\u1eb1ng JavaScript. Thi\u1ebft k\u1ebf ki\u1ebfn tr\xfac \u0111\u1ec3 c\xf3 \u0111\u01b0\u1ee3c nh\u1eefng kh\u1ea3 n\u0103ng n\xe0y, mang l\u1ea1i m\u1ed9t s\u1ed1 s\u1ef1 \u0111\xe1nh \u0111\u1ed5i:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Kh\xf4ng th\u1ec3 ch\u1ea1y tr\u1ef1c ti\u1ebfp tr\xean tr\xecnh duy\u1ec7t"))),(0,a.kt)("p",null,"Theo m\u1eb7c \u0111\u1ecbnh, k6 kh\xf4ng hi\u1ec3n th\u1ecb c\xe1c trang web gi\u1ed1ng nh\u01b0 c\xe1ch tr\xecnh duy\u1ec7t th\u1ef1c hi\u1ec7n. Tr\xecnh duy\u1ec7t c\xf3 th\u1ec3 ti\xeau t\u1ed1n t\xe0i nguy\xean h\u1ec7 th\u1ed1ng \u0111\xe1ng k\u1ec3. B\u1ecf qua tr\xecnh duy\u1ec7t cho ph\xe9p ch\u1ea1y nhi\u1ec1u t\u1ea3i h\u01a1n trong m\u1ed9t m\xe1y."),(0,a.kt)("p",null,"Tuy nhi\xean, v\u1edbi ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io/docs/using-k6-browser/overview/"},"k6 browser"),", b\u1ea1n c\xf3 th\u1ec3 t\u01b0\u01a1ng t\xe1c v\u1edbi c\xe1c tr\xecnh duy\u1ec7t th\u1ef1c v\xe0 thu th\u1eadp s\u1ed1 li\u1ec7u giao di\u1ec7n ng\u01b0\u1eddi d\xf9ng nh\u01b0 m\u1ed9t ph\u1ea7n c\u1ee7a testing."),(0,a.kt)("p",{align:"center"},(0,a.kt)("img",{src:"https://k6.io/blog/static/bf37122311fee7096e292f1d2f050b5e/f3baa/hybrid-testing.png",loading:"lazy",decoding:"async"})),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Kh\xf4ng th\u1ec3 ch\u1ea1y tr\xean Node.js"))),(0,a.kt)("p",null,"JavaScript th\u01b0\u1eddng kh\xf4ng ph\xf9 h\u1ee3p \u0111\u1ec3 s\u1eed d\u1ee5ng trong c\xe1c tr\u01b0\u1eddng h\u1ee3p c\u1ea7n hi\u1ec7u su\u1ea5t cao. \u0110\u1ec3 \u0111\u1ea1t \u0111\u01b0\u1ee3c hi\u1ec7u su\u1ea5t t\u1ed1i \u0111a, b\u1ea3n th\xe2n c\xf4ng c\u1ee5 n\xe0y \u0111\u01b0\u1ee3c vi\u1ebft b\u1eb1ng ",(0,a.kt)("a",{parentName:"p",href:"https://go.dev"},"Go"),", embed JavaScript runtime cho ph\xe9p vi\u1ebft k\u1ecbch b\u1ea3n ki\u1ec3m tra d\u1ec5 d\xe0ng."),(0,a.kt)("p",null,"N\u1ebfu b\u1ea1n mu\u1ed1n import npm modules ho\u1eb7c th\u01b0 vi\u1ec7n s\u1eed d\u1ee5ng NodeJS APIs, b\u1ea1n c\xf3 th\u1ec3 ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io/docs/using-k6/modules/#bundling-node-modules"},"bundle npm modules v\u1edbi webpack")," v\xe0 import ch\xfang v\xe0o script load test."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"N\u1ebfu mu\u1ed1n bi\u1ebft th\xeam th\xf4ng tin v\u1ec1 k6, b\u1ea1n c\xf3 th\u1ec3 xem th\xeam t\u1ea1i ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io/docs"},"\u0111\xe2y"),".")),(0,a.kt)("h2",{id:"h\u01b0\u1edbng-d\u1eabn-c\xe0i-\u0111\u1eb7t"},"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t"),(0,a.kt)("p",null,"k6 c\xf3 c\xe1c g\xf3i c\xe0i \u0111\u1eb7t d\xe0nh cho Linux, Mac v\xe0 Windows. Ngo\xe0i ra, b\u1ea1n c\xf3 th\u1ec3 s\u1eed d\u1ee5ng Docker container ho\u1eb7c file c\xe0i \u0111\u1eb7t ph\u1ea7n m\u1ec1m."),(0,a.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch c\xe0i \u0111\u1eb7t k6 tr\xean ",(0,a.kt)("strong",{parentName:"p"},"Windows")," th\xf4ng qua file c\xe0i \u0111\u1eb7t ph\u1ea7n m\u1ec1m."),(0,a.kt)("p",null,"\u0110\u1ec3 c\xe0i \u0111\u1eb7t k6, b\u1ea1n c\xf3 th\u1ec3 t\u1ea3i file c\xe0i \u0111\u1eb7t ph\u1ea7n m\u1ec1m t\u1ea1i ",(0,a.kt)("a",{parentName:"p",href:"https://dl.k6.io/msi/k6-latest-amd64.msi"},"\u0111\xe2y")," v\xe0 ti\u1ebfn h\xe0nh c\xe0i \u0111\u1eb7t theo h\u01b0\u1edbng d\u1eabn."),(0,a.kt)("p",{align:"center"},(0,a.kt)("img",{src:"/img/docs/k6/k6-install.webp",loading:"lazy",decoding:"async"})),(0,a.kt)("p",null,"Sau khi c\xe0i \u0111\u1eb7t th\xe0nh c\xf4ng, b\u1ea1n c\xf3 th\u1ec3 m\u1edf Command Prompt v\xe0 ki\u1ec3m tra phi\xean b\u1ea3n k6 \u0111\xe3 c\xe0i \u0111\u1eb7t b\u1eb1ng l\u1ec7nh:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"k6\n")),(0,a.kt)("p",null,"N\u1ebfu k6 \u0111\xe3 \u0111\u01b0\u1ee3c c\xe0i \u0111\u1eb7t th\xe0nh c\xf4ng, b\u1ea1n s\u1ebd nh\u1eadn \u0111\u01b0\u1ee3c th\xf4ng b\xe1o nh\u01b0 sau:"),(0,a.kt)("p",{align:"center"},(0,a.kt)("img",{src:"/img/docs/k6/k6-install-verify.webp",loading:"lazy",decoding:"async"})),(0,a.kt)("p",null,"Trong tr\u01b0\u1eddng h\u1ee3p b\u1ea1n mu\u1ed1n c\xe0i m\u1ed9t phi\xean b\u1ea3n c\u1ee5 th\u1ec3, b\u1ea1n c\xf3 th\u1ec3 t\xecm th\u1ea5y t\u1ea5t c\u1ea3 c\xe1c phi\xean b\u1ea3n t\u1ea1i ",(0,a.kt)("a",{parentName:"p",href:"https://dl.k6.io/msi/"},"\u0111\xe2y"),"."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Chi ti\u1ebft h\u01b0\u1edbng d\u1eabn c\u1ee7a c\xe1c ph\u01b0\u01a1ng th\u1ee9c c\xe0i \u0111\u1eb7t k6, b\u1ea1n c\xf3 th\u1ec3 xem th\xeam t\u1ea1i ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io/docs/getting-started/installation/"},"\u0111\xe2y"),".")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Trong m\u1ed9t v\xe0i t\xecnh hu\u1ed1ng, b\u1ea1n c\xf3 th\u1ec3 g\u1eb7p l\u1ed7i khi c\xe0i \u0111\u1eb7t k6. \u0110\u1ec3 kh\u1eafc ph\u1ee5c l\u1ed7i n\xe0y, b\u1ea1n c\xf3 th\u1ec3 tham kh\u1ea3o th\xeam t\u1ea1i ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io/docs/getting-started/installation/#troubleshooting"},"\u0111\xe2y"),"."),(0,a.kt)("p",{parentName:"admonition"},"Tr\xean Windows, b\u1ea1n c\xf3 th\u1ec3 g\u1eb7p l\u1ed7i sau khi c\xe0i \u0111\u1eb7t k6:"),(0,a.kt)("p",{align:"center"},(0,a.kt)("img",{src:"/img/docs/k6/k6-install-error.webp",loading:"lazy",decoding:"async"})),(0,a.kt)("p",{parentName:"admonition"},"Khi \u0111\xf3, h\xe3y \u0111\u1ea3m b\u1ea3o r\u1eb1ng b\u1ea1n \u0111\xe3 th\xeam \u0111\u01b0\u1eddng d\u1eabn \u0111\u1ebfn th\u01b0 m\u1ee5c ch\u1ee9a k6 v\xe0o bi\u1ebfn m\xf4i tr\u01b0\u1eddng PATH. Trong tr\u01b0\u1eddng h\u1ee3p m\u1eb7c \u0111\u1ecbnh, th\u01b0 m\u1ee5c n\xe0y s\u1ebd n\u1eb1m t\u1ea1i ",(0,a.kt)("inlineCode",{parentName:"p"},"C:\\Program Files\\k6"),".")),(0,a.kt)("h2",{id:"l\u1eddi-k\u1ebft"},"L\u1eddi k\u1ebft"),(0,a.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u v\u1ec1 k6, m\u1ed9t c\xf4ng c\u1ee5 ki\u1ec3m tra t\u1ea3i hi\u1ec7u su\u1ea5t cao, c\xf3 th\u1ec3 vi\u1ebft b\u1eb1ng JavaScript. Ch\xfang ta c\u0169ng \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch c\xe0i \u0111\u1eb7t k6 tr\xean Windows th\xf4ng qua file c\xe0i \u0111\u1eb7t ph\u1ea7n m\u1ec1m."),(0,a.kt)("p",null,"Trong ",(0,a.kt)("a",{parentName:"p",href:"/docs/k6/load-testing-restful-apis-with-k6-part-02"},"b\xe0i vi\u1ebft ti\u1ebfp theo"),", ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n ki\u1ec3m tra t\u1ea3i \u0111\u01a1n gi\u1ea3n b\u1eb1ng k6."))}g.isMDXComponent=!0}}]);