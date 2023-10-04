"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[5432],{3905:(t,n,e)=>{e.d(n,{Zo:()=>c,kt:()=>g});var i=e(67294);function a(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function r(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,i)}return e}function s(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?r(Object(e),!0).forEach((function(n){a(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function p(t,n){if(null==t)return{};var e,i,a=function(t,n){if(null==t)return{};var e,i,a={},r=Object.keys(t);for(i=0;i<r.length;i++)e=r[i],n.indexOf(e)>=0||(a[e]=t[e]);return a}(t,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(i=0;i<r.length;i++)e=r[i],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(a[e]=t[e])}return a}var l=i.createContext({}),o=function(t){var n=i.useContext(l),e=n;return t&&(e="function"==typeof t?t(n):s(s({},n),t)),e},c=function(t){var n=o(t.components);return i.createElement(l.Provider,{value:n},t.children)},m="mdxType",h={inlineCode:"code",wrapper:function(t){var n=t.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(t,n){var e=t.components,a=t.mdxType,r=t.originalType,l=t.parentName,c=p(t,["components","mdxType","originalType","parentName"]),m=o(e),u=a,g=m["".concat(l,".").concat(u)]||m[u]||h[u]||r;return e?i.createElement(g,s(s({ref:n},c),{},{components:e})):i.createElement(g,s({ref:n},c))}));function g(t,n){var e=arguments,a=n&&n.mdxType;if("string"==typeof t||a){var r=e.length,s=new Array(r);s[0]=u;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=t,p[m]="string"==typeof t?t:a,s[1]=p;for(var o=2;o<r;o++)s[o]=e[o];return i.createElement.apply(null,s)}return i.createElement.apply(null,e)}u.displayName="MDXCreateElement"},81315:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>p,toc:()=>o});var i=e(87462),a=(e(67294),e(3905));const r={slug:"load-testing-restful-apis-with-k6-part-02",title:"Load testing API \u0111\u01a1n gi\u1ea3n",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},s=void 0,p={unversionedId:"k6/part-02",id:"k6/part-02",title:"Load testing API \u0111\u01a1n gi\u1ea3n",description:"RESTful API l\xe0 m\u1ed9t trong nh\u1eefng ki\u1ec3u API ph\u1ed5 bi\u1ebfn nh\u1ea5t hi\u1ec7n nay. V\xec v\u1eady, vi\u1ec7c ki\u1ec3m tra t\u1ea3i (load testing) l\xe0 m\u1ed9t ph\u1ea7n quan tr\u1ecdng c\u1ee7a vi\u1ec7c ki\u1ec3m tra hi\u1ec7u su\u1ea5t. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API.",source:"@site/docs/k6/part-02.md",sourceDirName:"k6",slug:"/k6/load-testing-restful-apis-with-k6-part-02",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-02",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/k6/part-02.md",tags:[{label:"load-testing",permalink:"/en/docs/tags/load-testing"},{label:"k6",permalink:"/en/docs/tags/k-6"},{label:"restful-api",permalink:"/en/docs/tags/restful-api"},{label:"performance-testing",permalink:"/en/docs/tags/performance-testing"},{label:"setup",permalink:"/en/docs/tags/setup"}],version:"current",frontMatter:{slug:"load-testing-restful-apis-with-k6-part-02",title:"Load testing API \u0111\u01a1n gi\u1ea3n",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},sidebar:"tutorialSidebar",previous:{title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t k6",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-01"},next:{title:"Load testing v\u1edbi Virtual Users",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-03"}},l={},o=[{value:"M\u1ee5c ti\xeau",id:"m\u1ee5c-ti\xeau",level:2},{value:"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n",id:"vi\u1ebft-m\u1ed9t-k\u1ecbch-b\u1ea3n-test-\u0111\u01a1n-gi\u1ea3n",level:2},{value:"T\u1ea1o m\u1ed9t k\u1ecbch b\u1ea3n test",id:"t\u1ea1o-m\u1ed9t-k\u1ecbch-b\u1ea3n-test",level:3},{value:"Vi\u1ebft k\u1ecbch b\u1ea3n test",id:"vi\u1ebft-k\u1ecbch-b\u1ea3n-test",level:3},{value:"K\u1ecbch b\u1ea3n test ho\xe0n ch\u1ec9nh",id:"k\u1ecbch-b\u1ea3n-test-ho\xe0n-ch\u1ec9nh",level:3},{value:"Ch\u1ea1y k\u1ecbch b\u1ea3n test",id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",level:2},{value:"Xem k\u1ebft qu\u1ea3",id:"xem-k\u1ebft-qu\u1ea3",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],c={toc:o},m="wrapper";function h(t){let{components:n,...e}=t;return(0,a.kt)(m,(0,i.Z)({},c,e,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",{align:"right"},(0,a.kt)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-02&label=\u26aaViews&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://aws.amazon.com/what-is/restful-api/"},"RESTful API")," l\xe0 m\u1ed9t trong nh\u1eefng ki\u1ec3u API ph\u1ed5 bi\u1ebfn nh\u1ea5t hi\u1ec7n nay. V\xec v\u1eady, vi\u1ec7c ki\u1ec3m tra t\u1ea3i (load testing) l\xe0 m\u1ed9t ph\u1ea7n quan tr\u1ecdng c\u1ee7a vi\u1ec7c ki\u1ec3m tra hi\u1ec7u su\u1ea5t. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch ",(0,a.kt)("strong",{parentName:"p"},"s\u1eed d\u1ee5ng")," ",(0,a.kt)("a",{parentName:"p",href:"https://k6.io"},"k6")," \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API."),(0,a.kt)("h2",{id:"m\u1ee5c-ti\xeau"},"M\u1ee5c ti\xeau"),(0,a.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API. C\u1ee5 th\u1ec3, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n"),(0,a.kt)("li",{parentName:"ul"},"Ch\u1ea1y k\u1ecbch b\u1ea3n test"),(0,a.kt)("li",{parentName:"ul"},"Xem k\u1ebft qu\u1ea3")),(0,a.kt)("h2",{id:"vi\u1ebft-m\u1ed9t-k\u1ecbch-b\u1ea3n-test-\u0111\u01a1n-gi\u1ea3n"},"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n"),(0,a.kt)("p",null,"\u0110\u1ec3 vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng m\u1ed9t mockup RESTful API. API n\xe0y c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c t\xecm th\u1ea5y t\u1ea1i ",(0,a.kt)("a",{parentName:"p",href:"https://reqres.in/"},"https://reqres.in/"),", cung c\u1ea5p m\u1ed9t s\u1ed1 endpoints \u0111\u1ec3 t\u1ea1o, \u0111\u1ecdc, c\u1eadp nh\u1eadt v\xe0 x\xf3a ng\u01b0\u1eddi d\xf9ng."),(0,a.kt)("p",null,"Trong tr\u01b0\u1eddng h\u1ee3p b\u1ea1n mu\u1ed1n ch\u1ea1y load test cho c\xe1c API c\u1ee7a ri\xeang b\u1ea1n, h\xe3y t\u1ea1o m\u1ed9t function t\u01b0\u01a1ng t\u1ef1 nh\u01b0 c\xe1c v\xed d\u1ee5 d\u01b0\u1edbi \u0111\xe2y."),(0,a.kt)("h3",{id:"t\u1ea1o-m\u1ed9t-k\u1ecbch-b\u1ea3n-test"},"T\u1ea1o m\u1ed9t k\u1ecbch b\u1ea3n test"),(0,a.kt)("p",null,"\u0110\u1ea7u ti\xean, ch\xfang ta s\u1ebd t\u1ea1o m\u1ed9t th\u01b0 m\u1ee5c m\u1edbi \u0111\u1ec3 ch\u1ee9a k\u1ecbch b\u1ea3n test. Trong th\u01b0 m\u1ee5c n\xe0y, ch\xfang ta s\u1ebd t\u1ea1o m\u1ed9t file c\xf3 t\xean l\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"script.js"),", ch\u1ee9a c\xe1c h\xe0m c\u1ea7n thi\u1ebft ph\u1ee5c v\u1ee5 cho vi\u1ec7c ch\u1ea1y load test."),(0,a.kt)("h3",{id:"vi\u1ebft-k\u1ecbch-b\u1ea3n-test"},"Vi\u1ebft k\u1ecbch b\u1ea3n test"),(0,a.kt)("p",null,"\u0110\u1ea7u ti\xean, ch\xfang ta s\u1ebd import m\u1ed9t s\u1ed1 th\u01b0 vi\u1ec7n c\u1ea7n thi\u1ebft:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import http from 'k6/http';\nimport { sleep } from 'k6';\n")),(0,a.kt)("p",null,"Trong \u0111\xf3:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"http")," l\xe0 m\u1ed9t th\u01b0 vi\u1ec7n ch\u1ee9a c\xe1c h\xe0m \u0111\u1ec3 g\u1eedi request \u0111\u1ebfn API."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"sleep")," l\xe0 m\u1ed9t th\u01b0 vi\u1ec7n ch\u1ee9a c\xe1c h\xe0m \u0111\u1ec3 sleep m\u1ed9t kho\u1ea3ng th\u1eddi gian nh\u1ea5t \u0111\u1ecbnh. Ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng h\xe0m n\xe0y \u0111\u1ec3 \u0111\u1ea3m b\u1ea3o r\u1eb1ng m\u1ed7i request \u0111\u01b0\u1ee3c g\u1eedi c\xe1ch nhau 1 gi\xe2y.")),(0,a.kt)("p",null,"Ti\u1ebfp theo, ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m \u0111\u1ec3 t\u1ea1o m\u1ed9t ng\u01b0\u1eddi d\xf9ng m\u1edbi:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"function createUser() {\n  const url = 'https://reqres.in/api/users';\n  const payload = JSON.stringify({\n    name: 'morpheus',\n    job: 'leader',\n  });\n  const params = {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  };\n  return http.post(url, payload, params);\n}\n")),(0,a.kt)("p",null,"H\xe0m n\xe0y s\u1ebd g\u1eedi m\u1ed9t request POST \u0111\u1ebfn endpoint ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/users")," v\u1edbi m\u1ed9t payload l\xe0 m\u1ed9t \u0111\u1ed1i t\u01b0\u1ee3ng JSON ch\u1ee9a th\xf4ng tin c\u1ee7a ng\u01b0\u1eddi d\xf9ng m\u1edbi c\u1ea7n t\u1ea1o, nh\u01b0 ",(0,a.kt)("inlineCode",{parentName:"p"},"name")," v\xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"job"),"."),(0,a.kt)("p",null,"Ti\u1ebfp theo, ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m \u0111\u1ec3 \u0111\u1ecdc th\xf4ng tin c\u1ee7a m\u1ed9t ng\u01b0\u1eddi d\xf9ng. H\xe0m n\xe0y s\u1ebd g\u1eedi m\u1ed9t request GET \u0111\u1ebfn endpoint ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/users/{id}")," v\u1edbi ",(0,a.kt)("inlineCode",{parentName:"p"},"id")," l\xe0 tham s\u1ed1 truy\u1ec1n v\xe0o."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"function getUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  return http.get(url);\n}\n")),(0,a.kt)("p",null,"Ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m \u0111\u1ec3 c\u1eadp nh\u1eadt th\xf4ng tin c\u1ee7a m\u1ed9t ng\u01b0\u1eddi d\xf9ng nh\u01b0 sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"function updateUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  const payload = JSON.stringify({\n    name: 'morpheus',\n    job: 'zion resident',\n  });\n  const params = {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  };\n  return http.put(url, payload, params);\n}\n")),(0,a.kt)("p",null,"H\xe0m n\xe0y s\u1ebd g\u1eedi m\u1ed9t request PUT \u0111\u1ebfn endpoint ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/users/{id}")," v\u1edbi ",(0,a.kt)("inlineCode",{parentName:"p"},"id")," l\xe0 tham s\u1ed1 truy\u1ec1n v\xe0o v\xe0 payload l\xe0 m\u1ed9t \u0111\u1ed1i t\u01b0\u1ee3ng JSON ch\u1ee9a th\xf4ng tin c\u1ee7a ng\u01b0\u1eddi d\xf9ng c\u1ea7n c\u1eadp nh\u1eadt."),(0,a.kt)("p",null,"V\xe0 \u0111\u1ec3 x\xf3a m\u1ed9t ng\u01b0\u1eddi d\xf9ng, ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m nh\u01b0 sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"function deleteUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  return http.del(url);\n}\n")),(0,a.kt)("p",null,"H\xe0m n\xe0y s\u1ebd g\u1eedi m\u1ed9t request DELETE \u0111\u1ebfn endpoint ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/users/{id}")," v\u1edbi ",(0,a.kt)("inlineCode",{parentName:"p"},"id")," l\xe0 tham s\u1ed1 truy\u1ec1n v\xe0o."),(0,a.kt)("p",null,"Cu\u1ed1i c\xf9ng, ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m \u0111\u1ec3 th\u1ef1c hi\u1ec7n m\u1ed9t k\u1ecbch b\u1ea3n test:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"export default function () {\n  const user = createUser();\n  const id = user.json('id');\n  sleep(1);\n  getUser(id);\n  sleep(1);\n  updateUser(id);\n  sleep(1);\n  deleteUser(id);\n  sleep(1);\n}\n")),(0,a.kt)("p",null,"H\xe0m n\xe0y s\u1ebd g\u1ecdi l\u1ea7n l\u01b0\u1ee3t c\xe1c h\xe0m \u0111\xe3 vi\u1ebft \u1edf tr\xean \u0111\u1ec3 t\u1ea1o, \u0111\u1ecdc, c\u1eadp nh\u1eadt v\xe0 x\xf3a m\u1ed9t ng\u01b0\u1eddi d\xf9ng. \u0110\u1ec3 \u0111\u1ea3m b\u1ea3o r\u1eb1ng m\u1ed7i request \u0111\u01b0\u1ee3c g\u1eedi c\xe1ch nhau 1 gi\xe2y, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng h\xe0m ",(0,a.kt)("inlineCode",{parentName:"p"},"sleep")," \u0111\u1ec3 d\u1eebng ch\u01b0\u01a1ng tr\xecnh trong 1 gi\xe2y."),(0,a.kt)("h3",{id:"k\u1ecbch-b\u1ea3n-test-ho\xe0n-ch\u1ec9nh"},"K\u1ecbch b\u1ea3n test ho\xe0n ch\u1ec9nh"),(0,a.kt)("p",null,"Sau khi vi\u1ebft xong k\u1ecbch b\u1ea3n test, ch\xfang ta s\u1ebd c\xf3 m\u1ed9t file ",(0,a.kt)("inlineCode",{parentName:"p"},"script.js")," nh\u01b0 sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import http from 'k6/http';\nimport { sleep } from 'k6';\n\nfunction createUser() {\n  const url = 'https://reqres.in/api/users';\n  const payload = JSON.stringify({\n    name: 'morpheus',\n    job: 'leader',\n  });\n  const params = {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  };\n  return http.post(url, payload, params);\n}\n\nfunction getUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  return http.get(url);\n}\n\nfunction updateUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  const payload = JSON.stringify({\n    name: 'morpheus',\n    job: 'zion resident',\n  });\n  const params = {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  };\n  return http.put(url, payload, params);\n}\n\nfunction deleteUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  return http.del(url);\n}\n\nexport default function () {\n  const user = createUser();\n  const id = user.json('id');\n  sleep(1);\n  getUser(id);\n  sleep(1);\n  updateUser(id);\n  sleep(1);\n  deleteUser(id);\n  sleep(1);\n}\n")),(0,a.kt)("h2",{id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test"},"Ch\u1ea1y k\u1ecbch b\u1ea3n test"),(0,a.kt)("p",null,"\u0110\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test, ch\xfang ta s\u1ebd m\u1edf Command Prompt / Terminal v\xe0 ch\u1ea1y l\u1ec7nh sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"k6 run script.js\n")),(0,a.kt)("h2",{id:"xem-k\u1ebft-qu\u1ea3"},"Xem k\u1ebft qu\u1ea3"),(0,a.kt)("p",null,"N\u1ebfu k\u1ecbch b\u1ea3n test \u0111\u01b0\u1ee3c ch\u1ea1y th\xe0nh c\xf4ng, b\u1ea1n s\u1ebd nh\u1eadn \u0111\u01b0\u1ee3c k\u1ebft qu\u1ea3 nh\u01b0 sau:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"data_received..............: 1.1 kB  1.1 kB/s\ndata_sent..................: 1.1 kB  1.1 kB/s\nhttp_req_blocked...........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms\nhttp_req_connecting........: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s\nhttp_req_duration..........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms\nhttp_req_receiving.........: avg=1.1ms    min=1.1ms    med=1.1ms    max=1.1ms    p(90)=1.1ms    p(95)=1.1ms\nhttp_req_sending...........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms\nhttp_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s\nhttp_req_waiting...........: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s\nhttp_reqs..................: 4      4.0/s\niteration_duration.........: avg=4.04ms   min=4.04ms   med=4.04ms   max=4.04ms   p(90)=4.04ms   p(95)=4.04ms\niterations.................: 4      4.0/s\nvus........................: 1      min=1 max=1\nvus_max....................: 1      min=1 max=1\n")),(0,a.kt)("p",null,"Nh\u01b0 b\u1ea1n c\xf3 th\u1ec3 th\u1ea5y, k\u1ebft qu\u1ea3 tr\u1ea3 v\u1ec1 c\xf3 nhi\u1ec1u th\xf4ng tin. \u0110\u1ec3 hi\u1ec3u r\xf5 h\u01a1n v\u1ec1 t\u1eebng gi\xe1 tr\u1ecb trong \u0111\xf3, b\u1ea1n c\xf3 th\u1ec3 xem th\xeam t\u1ea1i ",(0,a.kt)("a",{parentName:"p",href:"/en/docs/k6/load-testing-restful-apis-with-k6-part-04"},"ph\u1ea7n 4")," trong lo\u1ea1t b\xe0i vi\u1ebft n\xe0y."),(0,a.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,a.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho b\u1ea1n trong vi\u1ec7c t\xecm hi\u1ec3u v\u1ec1 k6."),(0,a.kt)("p",null,"Trong ",(0,a.kt)("a",{parentName:"p",href:"/en/docs/k6/load-testing-restful-apis-with-k6-part-03"},"b\xe0i vi\u1ebft ti\u1ebfp theo"),", ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n ki\u1ec3m tra t\u1ea3i v\u1edbi Virtual Users."))}h.isMDXComponent=!0}}]);