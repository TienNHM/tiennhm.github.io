"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[19],{44258:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>h,toc:()=>l});var s=e(74848),i=e(28453);const r={slug:"load-testing-restful-apis-with-k6-part-02",title:"Load testing API \u0111\u01a1n gi\u1ea3n",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fk6.io/showcase/"},c=void 0,h={id:"k6/part-02",title:"Load testing API \u0111\u01a1n gi\u1ea3n",description:"RESTful API l\xe0 m\u1ed9t trong nh\u1eefng ki\u1ec3u API ph\u1ed5 bi\u1ebfn nh\u1ea5t hi\u1ec7n nay. V\xec v\u1eady, vi\u1ec7c ki\u1ec3m tra t\u1ea3i (load testing) l\xe0 m\u1ed9t ph\u1ea7n quan tr\u1ecdng c\u1ee7a vi\u1ec7c ki\u1ec3m tra hi\u1ec7u su\u1ea5t. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API.",source:"@site/docs/05-k6/part-02.md",sourceDirName:"05-k6",slug:"/k6/load-testing-restful-apis-with-k6-part-02",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-02",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/05-k6/part-02.md",tags:[{inline:!0,label:"load-testing",permalink:"/en/docs/tags/load-testing"},{inline:!0,label:"k6",permalink:"/en/docs/tags/k-6"},{inline:!0,label:"restful-api",permalink:"/en/docs/tags/restful-api"},{inline:!0,label:"performance-testing",permalink:"/en/docs/tags/performance-testing"},{inline:!0,label:"setup",permalink:"/en/docs/tags/setup"}],version:"current",lastUpdatedAt:1725684768e3,frontMatter:{slug:"load-testing-restful-apis-with-k6-part-02",title:"Load testing API \u0111\u01a1n gi\u1ea3n",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup"],enableComments:!0,draft:!1,image:"https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fk6.io/showcase/"},sidebar:"tutorialSidebar",previous:{title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t k6",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-01"},next:{title:"Load testing v\u1edbi Virtual Users",permalink:"/en/docs/k6/load-testing-restful-apis-with-k6-part-03"}},a={},l=[{value:"M\u1ee5c ti\xeau",id:"m\u1ee5c-ti\xeau",level:2},{value:"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n",id:"vi\u1ebft-m\u1ed9t-k\u1ecbch-b\u1ea3n-test-\u0111\u01a1n-gi\u1ea3n",level:2},{value:"T\u1ea1o m\u1ed9t k\u1ecbch b\u1ea3n test",id:"t\u1ea1o-m\u1ed9t-k\u1ecbch-b\u1ea3n-test",level:3},{value:"Vi\u1ebft k\u1ecbch b\u1ea3n test",id:"vi\u1ebft-k\u1ecbch-b\u1ea3n-test",level:3},{value:"K\u1ecbch b\u1ea3n test ho\xe0n ch\u1ec9nh",id:"k\u1ecbch-b\u1ea3n-test-ho\xe0n-ch\u1ec9nh",level:3},{value:"Ch\u1ea1y k\u1ecbch b\u1ea3n test",id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",level:2},{value:"Xem k\u1ebft qu\u1ea3",id:"xem-k\u1ebft-qu\u1ea3",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}];function o(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{align:"right",children:(0,s.jsx)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-02&label=\u26aaView&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://aws.amazon.com/what-is/restful-api/",children:"RESTful API"})," l\xe0 m\u1ed9t trong nh\u1eefng ki\u1ec3u API ph\u1ed5 bi\u1ebfn nh\u1ea5t hi\u1ec7n nay. V\xec v\u1eady, vi\u1ec7c ki\u1ec3m tra t\u1ea3i (load testing) l\xe0 m\u1ed9t ph\u1ea7n quan tr\u1ecdng c\u1ee7a vi\u1ec7c ki\u1ec3m tra hi\u1ec7u su\u1ea5t. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch ",(0,s.jsx)(t.strong,{children:"s\u1eed d\u1ee5ng"})," ",(0,s.jsx)(t.a,{href:"https://k6.io",children:"k6"})," \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API."]}),"\n",(0,s.jsx)(t.h2,{id:"m\u1ee5c-ti\xeau",children:"M\u1ee5c ti\xeau"}),"\n",(0,s.jsx)(t.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API. C\u1ee5 th\u1ec3, ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n"}),"\n",(0,s.jsx)(t.li,{children:"Ch\u1ea1y k\u1ecbch b\u1ea3n test"}),"\n",(0,s.jsx)(t.li,{children:"Xem k\u1ebft qu\u1ea3"}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"vi\u1ebft-m\u1ed9t-k\u1ecbch-b\u1ea3n-test-\u0111\u01a1n-gi\u1ea3n",children:"Vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n"}),"\n",(0,s.jsxs)(t.p,{children:["\u0110\u1ec3 vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n test \u0111\u01a1n gi\u1ea3n, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng m\u1ed9t mockup RESTful API. API n\xe0y c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c t\xecm th\u1ea5y t\u1ea1i ",(0,s.jsx)(t.a,{href:"https://reqres.in/",children:"https://reqres.in/"}),", cung c\u1ea5p m\u1ed9t s\u1ed1 endpoints \u0111\u1ec3 t\u1ea1o, \u0111\u1ecdc, c\u1eadp nh\u1eadt v\xe0 x\xf3a ng\u01b0\u1eddi d\xf9ng."]}),"\n",(0,s.jsx)(t.p,{children:"Trong tr\u01b0\u1eddng h\u1ee3p b\u1ea1n mu\u1ed1n ch\u1ea1y load test cho c\xe1c API c\u1ee7a ri\xeang b\u1ea1n, h\xe3y t\u1ea1o m\u1ed9t function t\u01b0\u01a1ng t\u1ef1 nh\u01b0 c\xe1c v\xed d\u1ee5 d\u01b0\u1edbi \u0111\xe2y."}),"\n",(0,s.jsx)(t.h3,{id:"t\u1ea1o-m\u1ed9t-k\u1ecbch-b\u1ea3n-test",children:"T\u1ea1o m\u1ed9t k\u1ecbch b\u1ea3n test"}),"\n",(0,s.jsxs)(t.p,{children:["\u0110\u1ea7u ti\xean, ch\xfang ta s\u1ebd t\u1ea1o m\u1ed9t th\u01b0 m\u1ee5c m\u1edbi \u0111\u1ec3 ch\u1ee9a k\u1ecbch b\u1ea3n test. Trong th\u01b0 m\u1ee5c n\xe0y, ch\xfang ta s\u1ebd t\u1ea1o m\u1ed9t file c\xf3 t\xean l\xe0 ",(0,s.jsx)(t.code,{children:"script.js"}),", ch\u1ee9a c\xe1c h\xe0m c\u1ea7n thi\u1ebft ph\u1ee5c v\u1ee5 cho vi\u1ec7c ch\u1ea1y load test."]}),"\n",(0,s.jsx)(t.h3,{id:"vi\u1ebft-k\u1ecbch-b\u1ea3n-test",children:"Vi\u1ebft k\u1ecbch b\u1ea3n test"}),"\n",(0,s.jsx)(t.p,{children:"\u0110\u1ea7u ti\xean, ch\xfang ta s\u1ebd import m\u1ed9t s\u1ed1 th\u01b0 vi\u1ec7n c\u1ea7n thi\u1ebft:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import http from 'k6/http';\nimport { sleep } from 'k6';\n"})}),"\n",(0,s.jsx)(t.p,{children:"Trong \u0111\xf3:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"http"})," l\xe0 m\u1ed9t th\u01b0 vi\u1ec7n ch\u1ee9a c\xe1c h\xe0m \u0111\u1ec3 g\u1eedi request \u0111\u1ebfn API."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"sleep"})," l\xe0 m\u1ed9t th\u01b0 vi\u1ec7n ch\u1ee9a c\xe1c h\xe0m \u0111\u1ec3 sleep m\u1ed9t kho\u1ea3ng th\u1eddi gian nh\u1ea5t \u0111\u1ecbnh. Ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng h\xe0m n\xe0y \u0111\u1ec3 \u0111\u1ea3m b\u1ea3o r\u1eb1ng m\u1ed7i request \u0111\u01b0\u1ee3c g\u1eedi c\xe1ch nhau 1 gi\xe2y."]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Ti\u1ebfp theo, ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m \u0111\u1ec3 t\u1ea1o m\u1ed9t ng\u01b0\u1eddi d\xf9ng m\u1edbi:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"function createUser() {\n  const url = 'https://reqres.in/api/users';\n  const payload = JSON.stringify({\n    name: 'morpheus',\n    job: 'leader',\n  });\n  const params = {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  };\n  return http.post(url, payload, params);\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["H\xe0m n\xe0y s\u1ebd g\u1eedi m\u1ed9t request POST \u0111\u1ebfn endpoint ",(0,s.jsx)(t.code,{children:"/api/users"})," v\u1edbi m\u1ed9t payload l\xe0 m\u1ed9t \u0111\u1ed1i t\u01b0\u1ee3ng JSON ch\u1ee9a th\xf4ng tin c\u1ee7a ng\u01b0\u1eddi d\xf9ng m\u1edbi c\u1ea7n t\u1ea1o, nh\u01b0 ",(0,s.jsx)(t.code,{children:"name"})," v\xe0 ",(0,s.jsx)(t.code,{children:"job"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["Ti\u1ebfp theo, ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m \u0111\u1ec3 \u0111\u1ecdc th\xf4ng tin c\u1ee7a m\u1ed9t ng\u01b0\u1eddi d\xf9ng. H\xe0m n\xe0y s\u1ebd g\u1eedi m\u1ed9t request GET \u0111\u1ebfn endpoint ",(0,s.jsx)(t.code,{children:"/api/users/{id}"})," v\u1edbi ",(0,s.jsx)(t.code,{children:"id"})," l\xe0 tham s\u1ed1 truy\u1ec1n v\xe0o."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"function getUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  return http.get(url);\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"Ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m \u0111\u1ec3 c\u1eadp nh\u1eadt th\xf4ng tin c\u1ee7a m\u1ed9t ng\u01b0\u1eddi d\xf9ng nh\u01b0 sau:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"function updateUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  const payload = JSON.stringify({\n    name: 'morpheus',\n    job: 'zion resident',\n  });\n  const params = {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  };\n  return http.put(url, payload, params);\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["H\xe0m n\xe0y s\u1ebd g\u1eedi m\u1ed9t request PUT \u0111\u1ebfn endpoint ",(0,s.jsx)(t.code,{children:"/api/users/{id}"})," v\u1edbi ",(0,s.jsx)(t.code,{children:"id"})," l\xe0 tham s\u1ed1 truy\u1ec1n v\xe0o v\xe0 payload l\xe0 m\u1ed9t \u0111\u1ed1i t\u01b0\u1ee3ng JSON ch\u1ee9a th\xf4ng tin c\u1ee7a ng\u01b0\u1eddi d\xf9ng c\u1ea7n c\u1eadp nh\u1eadt."]}),"\n",(0,s.jsx)(t.p,{children:"V\xe0 \u0111\u1ec3 x\xf3a m\u1ed9t ng\u01b0\u1eddi d\xf9ng, ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m nh\u01b0 sau:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"function deleteUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  return http.del(url);\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["H\xe0m n\xe0y s\u1ebd g\u1eedi m\u1ed9t request DELETE \u0111\u1ebfn endpoint ",(0,s.jsx)(t.code,{children:"/api/users/{id}"})," v\u1edbi ",(0,s.jsx)(t.code,{children:"id"})," l\xe0 tham s\u1ed1 truy\u1ec1n v\xe0o."]}),"\n",(0,s.jsx)(t.p,{children:"Cu\u1ed1i c\xf9ng, ch\xfang ta s\u1ebd vi\u1ebft m\u1ed9t h\xe0m \u0111\u1ec3 th\u1ef1c hi\u1ec7n m\u1ed9t k\u1ecbch b\u1ea3n test:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"export default function () {\n  const user = createUser();\n  const id = user.json('id');\n  sleep(1);\n  getUser(id);\n  sleep(1);\n  updateUser(id);\n  sleep(1);\n  deleteUser(id);\n  sleep(1);\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["H\xe0m n\xe0y s\u1ebd g\u1ecdi l\u1ea7n l\u01b0\u1ee3t c\xe1c h\xe0m \u0111\xe3 vi\u1ebft \u1edf tr\xean \u0111\u1ec3 t\u1ea1o, \u0111\u1ecdc, c\u1eadp nh\u1eadt v\xe0 x\xf3a m\u1ed9t ng\u01b0\u1eddi d\xf9ng. \u0110\u1ec3 \u0111\u1ea3m b\u1ea3o r\u1eb1ng m\u1ed7i request \u0111\u01b0\u1ee3c g\u1eedi c\xe1ch nhau 1 gi\xe2y, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng h\xe0m ",(0,s.jsx)(t.code,{children:"sleep"})," \u0111\u1ec3 d\u1eebng ch\u01b0\u01a1ng tr\xecnh trong 1 gi\xe2y."]}),"\n",(0,s.jsx)(t.h3,{id:"k\u1ecbch-b\u1ea3n-test-ho\xe0n-ch\u1ec9nh",children:"K\u1ecbch b\u1ea3n test ho\xe0n ch\u1ec9nh"}),"\n",(0,s.jsxs)(t.p,{children:["Sau khi vi\u1ebft xong k\u1ecbch b\u1ea3n test, ch\xfang ta s\u1ebd c\xf3 m\u1ed9t file ",(0,s.jsx)(t.code,{children:"script.js"})," nh\u01b0 sau:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import http from 'k6/http';\nimport { sleep } from 'k6';\n\nfunction createUser() {\n  const url = 'https://reqres.in/api/users';\n  const payload = JSON.stringify({\n    name: 'morpheus',\n    job: 'leader',\n  });\n  const params = {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  };\n  return http.post(url, payload, params);\n}\n\nfunction getUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  return http.get(url);\n}\n\nfunction updateUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  const payload = JSON.stringify({\n    name: 'morpheus',\n    job: 'zion resident',\n  });\n  const params = {\n    headers: {\n      'Content-Type': 'application/json',\n    },\n  };\n  return http.put(url, payload, params);\n}\n\nfunction deleteUser(id) {\n  const url = `https://reqres.in/api/users/${id}`;\n  return http.del(url);\n}\n\nexport default function () {\n  const user = createUser();\n  const id = user.json('id');\n  sleep(1);\n  getUser(id);\n  sleep(1);\n  updateUser(id);\n  sleep(1);\n  deleteUser(id);\n  sleep(1);\n}\n"})}),"\n",(0,s.jsx)(t.h2,{id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",children:"Ch\u1ea1y k\u1ecbch b\u1ea3n test"}),"\n",(0,s.jsx)(t.p,{children:"\u0110\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test, ch\xfang ta s\u1ebd m\u1edf Command Prompt / Terminal v\xe0 ch\u1ea1y l\u1ec7nh sau:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"k6 run script.js\n"})}),"\n",(0,s.jsx)(t.h2,{id:"xem-k\u1ebft-qu\u1ea3",children:"Xem k\u1ebft qu\u1ea3"}),"\n",(0,s.jsx)(t.p,{children:"N\u1ebfu k\u1ecbch b\u1ea3n test \u0111\u01b0\u1ee3c ch\u1ea1y th\xe0nh c\xf4ng, b\u1ea1n s\u1ebd nh\u1eadn \u0111\u01b0\u1ee3c k\u1ebft qu\u1ea3 nh\u01b0 sau:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"data_received..............: 1.1 kB  1.1 kB/s\ndata_sent..................: 1.1 kB  1.1 kB/s\nhttp_req_blocked...........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms\nhttp_req_connecting........: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s\nhttp_req_duration..........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms\nhttp_req_receiving.........: avg=1.1ms    min=1.1ms    med=1.1ms    max=1.1ms    p(90)=1.1ms    p(95)=1.1ms\nhttp_req_sending...........: avg=1.01ms   min=1.01ms   med=1.01ms   max=1.01ms   p(90)=1.01ms   p(95)=1.01ms\nhttp_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s\nhttp_req_waiting...........: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s\nhttp_reqs..................: 4      4.0/s\niteration_duration.........: avg=4.04ms   min=4.04ms   med=4.04ms   max=4.04ms   p(90)=4.04ms   p(95)=4.04ms\niterations.................: 4      4.0/s\nvus........................: 1      min=1 max=1\nvus_max....................: 1      min=1 max=1\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Nh\u01b0 b\u1ea1n c\xf3 th\u1ec3 th\u1ea5y, k\u1ebft qu\u1ea3 tr\u1ea3 v\u1ec1 c\xf3 nhi\u1ec1u th\xf4ng tin. \u0110\u1ec3 hi\u1ec3u r\xf5 h\u01a1n v\u1ec1 t\u1eebng gi\xe1 tr\u1ecb trong \u0111\xf3, b\u1ea1n c\xf3 th\u1ec3 xem th\xeam t\u1ea1i ",(0,s.jsx)(t.a,{href:"/en/docs/k6/load-testing-restful-apis-with-k6-part-04",children:"ph\u1ea7n 4"})," trong lo\u1ea1t b\xe0i vi\u1ebft n\xe0y."]}),"\n",(0,s.jsx)(t.h2,{id:"t\u1ed5ng-k\u1ebft",children:"T\u1ed5ng k\u1ebft"}),"\n",(0,s.jsx)(t.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u c\xe1ch s\u1eed d\u1ee5ng k6 \u0111\u1ec3 ki\u1ec3m tra t\u1ea3i cho RESTful API. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho b\u1ea1n trong vi\u1ec7c t\xecm hi\u1ec3u v\u1ec1 k6."}),"\n",(0,s.jsxs)(t.p,{children:["Trong ",(0,s.jsx)(t.a,{href:"/en/docs/k6/load-testing-restful-apis-with-k6-part-03",children:"b\xe0i vi\u1ebft ti\u1ebfp theo"}),", ch\xfang ta s\u1ebd t\xecm hi\u1ec3u c\xe1ch vi\u1ebft m\u1ed9t k\u1ecbch b\u1ea3n ki\u1ec3m tra t\u1ea3i v\u1edbi Virtual Users."]})]})}function d(n={}){const{wrapper:t}={...(0,i.R)(),...n.components};return t?(0,s.jsx)(t,{...n,children:(0,s.jsx)(o,{...n})}):o(n)}},28453:(n,t,e)=>{e.d(t,{R:()=>c,x:()=>h});var s=e(96540);const i={},r=s.createContext(i);function c(n){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function h(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:c(n.components),s.createElement(r.Provider,{value:t},n.children)}}}]);