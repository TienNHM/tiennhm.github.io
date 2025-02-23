"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[7983],{39855:(n,a,t)=>{t.r(a),t.d(a,{assets:()=>h,contentTitle:()=>s,default:()=>d,frontMatter:()=>c,metadata:()=>r,toc:()=>l});var e=t(74848),i=t(28453);const c={slug:"load-testing-restful-apis-with-k6-part-05",title:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test v\u1edbi Grafana v\xe0 InfluxDB",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup","visualization","grafana","influxdb"],enableComments:!0,draft:!1,image:"https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fk6.io/showcase/"},s=void 0,r={id:"k6/part-05",title:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test v\u1edbi Grafana v\xe0 InfluxDB",description:"Trong c\xe1c b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 bi\u1ebft c\xe1ch vi\u1ebft k\u1ecbch b\u1ea3n test v\xe0 xem k\u1ebft qu\u1ea3 tr\xean m\xe0n h\xecnh console khi ch\u1ea1y k\u1ecbch b\u1ea3n v\u1edbi k6. Tuy nhi\xean, \u0111\u1ec3 c\xf3 th\u1ec3 quan s\xe1t v\xe0 ph\xe2n t\xedch k\u1ebft qu\u1ea3 m\u1ed9t c\xe1ch tr\u1ef1c quan h\u01a1n, ch\xfang ta c\xf3 th\u1ec3 k\u1ebft h\u1ee3p k6 v\u1edbi Grafana v\xe0 InfluxDB.",source:"@site/docs/05-k6/part-05.md",sourceDirName:"05-k6",slug:"/k6/load-testing-restful-apis-with-k6-part-05",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-05",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/05-k6/part-05.md",tags:[{inline:!0,label:"load-testing",permalink:"/docs/tags/load-testing"},{inline:!0,label:"k6",permalink:"/docs/tags/k-6"},{inline:!0,label:"restful-api",permalink:"/docs/tags/restful-api"},{inline:!0,label:"performance-testing",permalink:"/docs/tags/performance-testing"},{inline:!0,label:"setup",permalink:"/docs/tags/setup"},{inline:!0,label:"visualization",permalink:"/docs/tags/visualization"},{inline:!0,label:"grafana",permalink:"/docs/tags/grafana"},{inline:!0,label:"influxdb",permalink:"/docs/tags/influxdb"}],version:"current",lastUpdatedAt:1740320418e3,frontMatter:{slug:"load-testing-restful-apis-with-k6-part-05",title:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test v\u1edbi Grafana v\xe0 InfluxDB",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup","visualization","grafana","influxdb"],enableComments:!0,draft:!1,image:"https://slorber-api-screenshot.netlify.app/https%3A%2F%2Fk6.io/showcase/"},sidebar:"tutorialSidebar",previous:{title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-04"},next:{title:"C\u01a1 s\u1edf d\u1eef li\u1ec7u",permalink:"/docs/category/c\u01a1-s\u1edf-d\u1eef-li\u1ec7u"}},h={},l=[{value:"C\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana",id:"c\xe0i-\u0111\u1eb7t-influxdb-v\xe0-grafana",level:2},{value:"InfluxDB l\xe0 g\xec?",id:"influxdb-l\xe0-g\xec",level:3},{value:"Grafana l\xe0 g\xec?",id:"grafana-l\xe0-g\xec",level:3},{value:"C\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana",id:"c\xe0i-\u0111\u1eb7t-influxdb-v\xe0-grafana-1",level:3},{value:"1. T\u1ea1o file grafana-dashboard.yaml",id:"1-t\u1ea1o-file-grafana-dashboardyaml",level:4},{value:"2. T\u1ea1o file grafana-datasource.yaml",id:"2-t\u1ea1o-file-grafana-datasourceyaml",level:4},{value:"3. T\u1ea1o file docker-compose.yml",id:"3-t\u1ea1o-file-docker-composeyml",level:4},{value:"4. T\u1ea1o file k6-load-testing-results.json",id:"4-t\u1ea1o-file-k6-load-testing-resultsjson",level:4},{value:"5. Kh\u1edfi ch\u1ea1y Docker Compose",id:"5-kh\u1edfi-ch\u1ea1y-docker-compose",level:4},{value:"T\u1ea1o k\u1ecbch b\u1ea3n test",id:"t\u1ea1o-k\u1ecbch-b\u1ea3n-test",level:2},{value:"Ch\u1ea1y k\u1ecbch b\u1ea3n test v\xe0 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3",id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test-v\xe0-tr\u1ef1c-quan-h\xf3a-k\u1ebft-qu\u1ea3",level:2},{value:"Ch\u1ea1y k\u1ecbch b\u1ea3n test",id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",level:3},{value:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3",id:"tr\u1ef1c-quan-h\xf3a-k\u1ebft-qu\u1ea3",level:3},{value:"L\u1eddi k\u1ebft",id:"l\u1eddi-k\u1ebft",level:2}];function o(n){const a={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...n.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("p",{align:"right",children:(0,e.jsx)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-05&label=\u26aaView&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})}),"\n",(0,e.jsx)(a.p,{children:"Trong c\xe1c b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 bi\u1ebft c\xe1ch vi\u1ebft k\u1ecbch b\u1ea3n test v\xe0 xem k\u1ebft qu\u1ea3 tr\xean m\xe0n h\xecnh console khi ch\u1ea1y k\u1ecbch b\u1ea3n v\u1edbi k6. Tuy nhi\xean, \u0111\u1ec3 c\xf3 th\u1ec3 quan s\xe1t v\xe0 ph\xe2n t\xedch k\u1ebft qu\u1ea3 m\u1ed9t c\xe1ch tr\u1ef1c quan h\u01a1n, ch\xfang ta c\xf3 th\u1ec3 k\u1ebft h\u1ee3p k6 v\u1edbi Grafana v\xe0 InfluxDB."}),"\n",(0,e.jsx)(a.p,{children:"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1c b\u1ea1n c\xe0i \u0111\u1eb7t v\xe0 s\u1eed d\u1ee5ng Grafana c\xf9ng InfluxDB \u0111\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test t\u1eeb k6."}),"\n",(0,e.jsx)(a.h2,{id:"c\xe0i-\u0111\u1eb7t-influxdb-v\xe0-grafana",children:"C\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana"}),"\n",(0,e.jsx)(a.h3,{id:"influxdb-l\xe0-g\xec",children:"InfluxDB l\xe0 g\xec?"}),"\n",(0,e.jsx)("p",{align:"right",children:(0,e.jsx)("img",{src:"https://www.influxdata.com/images/influxdata_full_navy-a7ca2ff4.svg",loading:"lazy",decoding:"async"})}),"\n",(0,e.jsxs)(a.p,{children:[(0,e.jsx)(a.a,{href:"https://www.influxdata.com/",children:"InfluxDB"})," l\xe0 m\u1ed9t c\u01a1 s\u1edf d\u1eef li\u1ec7u time-series m\xe3 ngu\u1ed3n m\u1edf \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 l\u01b0u tr\u1eef v\xe0 truy xu\u1ea5t d\u1eef li\u1ec7u theo th\u1eddi gian m\u1ed9t c\xe1ch hi\u1ec7u qu\u1ea3. InfluxDB c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 l\u01b0u tr\u1eef c\xe1c ch\u1ec9 s\u1ed1 \u0111o l\u01b0\u1eddng t\u1eeb c\xe1c c\xf4ng c\u1ee5 ki\u1ec3m tra hi\u1ec7u su\u1ea5t nh\u01b0 k6, ",(0,e.jsx)(a.a,{href:"https://jmeter.apache.org/",children:"JMeter"}),", ",(0,e.jsx)(a.a,{href:"https://gatling.io/",children:"Gatling"}),"... v\xe0 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 t\u1eeb c\xe1c c\xf4ng c\u1ee5 n\xe0y."]}),"\n",(0,e.jsx)(a.p,{children:"C\xe1c \u0111\u1eb7c \u0111i\u1ec3m ch\xednh c\u1ee7a InfluxDB bao g\u1ed3m:"}),"\n",(0,e.jsxs)(a.ul,{children:["\n",(0,e.jsx)(a.li,{children:"L\u01b0u tr\u1eef d\u1eef li\u1ec7u theo th\u1eddi gian v\u1edbi t\u1ed1c \u0111\u1ed9 cao."}),"\n",(0,e.jsx)(a.li,{children:"C\xf3 kh\u1ea3 n\u0103ng m\u1edf r\u1ed9ng t\u1ed1t cho l\u01b0\u1ee3ng d\u1eef li\u1ec7u l\u1edbn."}),"\n",(0,e.jsx)(a.li,{children:"C\xf3 th\u1ec3 truy v\u1ea5n v\xe0 l\u1ecdc d\u1eef li\u1ec7u theo th\u1eddi gian hi\u1ec7u qu\u1ea3."}),"\n"]}),"\n",(0,e.jsx)(a.h3,{id:"grafana-l\xe0-g\xec",children:"Grafana l\xe0 g\xec?"}),"\n",(0,e.jsx)("p",{align:"right",children:(0,e.jsx)("img",{src:"https://grafana.com/media/grafana/images/grafana-dashboard-english.png",loading:"lazy",decoding:"async"})}),"\n",(0,e.jsxs)(a.p,{children:[(0,e.jsx)(a.a,{href:"https://grafana.com/",children:"Grafana"})," l\xe0 m\u1ed9t c\xf4ng c\u1ee5 tr\u1ef1c quan h\xf3a v\xe0 qu\u1ea3n l\xfd b\u1ea3ng \u0111i\u1ec1u khi\u1ec3n m\xe3 ngu\u1ed3n m\u1edf. N\xf3 cho ph\xe9p truy v\u1ea5n, tr\u1ef1c quan h\xf3a v\xe0 gi\xe1m s\xe1t nhi\u1ec1u lo\u1ea1i ngu\u1ed3n d\u1eef li\u1ec7u bao g\u1ed3m ",(0,e.jsx)(a.a,{href:"https://www.influxdata.com/",children:"InfluxDB"}),", ",(0,e.jsx)(a.a,{href:"https://prometheus.io/",children:"Prometheus"}),", ",(0,e.jsx)(a.a,{href:"https://www.elastic.co/",children:"Elasticsearch"})," v\xe0 nhi\u1ec1u ngu\u1ed3n kh\xe1c."]}),"\n",(0,e.jsxs)(a.p,{children:["V\u1edbi Grafana, ch\xfang ta c\xf3 th\u1ec3 x\xe2y d\u1ef1ng c\xe1c b\u1ea3ng \u0111i\u1ec1u khi\u1ec3n v\u1edbi nhi\u1ec1u lo\u1ea1i bi\u1ec3u \u0111\u1ed3 kh\xe1c nhau nh\u01b0 bi\u1ec3u \u0111\u1ed3 \u0111\u01b0\u1eddng, bi\u1ec3u \u0111\u1ed3 tr\xf2n, bi\u1ec3u \u0111\u1ed3 c\u1ed9t...\u0111\u1ec3 tr\u1ef1c quan h\xf3a d\u1eef li\u1ec7u t\u1eeb ngu\u1ed3n d\u1eef li\u1ec7u l\u01b0u tr\u1eef nh\u01b0 InfluxDB. Ngo\xe0i ra, Grafana c\xf2n h\u1ed7 tr\u1ee3 nhi\u1ec1u t\xednh n\u0103ng nh\u01b0 ",(0,e.jsx)(a.a,{href:"https://grafana.com/products/cloud/alerting/",children:"alerting"}),", ",(0,e.jsx)(a.a,{href:"https://grafana.com/products/cloud/logs/",children:"logging"}),", dashboard sharing... gi\xfap qu\u1ea3n l\xfd v\xe0 theo d\xf5i hi\u1ec7u su\u1ea5t \u1ee9ng d\u1ee5ng m\u1ed9t c\xe1ch t\u1ed5ng quan v\xe0 tr\u1ef1c quan h\u01a1n."]}),"\n",(0,e.jsx)(a.h3,{id:"c\xe0i-\u0111\u1eb7t-influxdb-v\xe0-grafana-1",children:"C\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana"}),"\n",(0,e.jsxs)(a.p,{children:["Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd c\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana b\u1eb1ng Docker Comopose. L\u01b0u \xfd \u0111\u1ea3m b\u1ea3o Docker v\xe0 Docker Compose \u0111\xe3 \u0111\u01b0\u1ee3c c\xe0i \u0111\u1eb7t tr\xean m\xe1y. N\u1ebfu ch\u01b0a, b\u1ea1n c\xf3 th\u1ec3 tham kh\u1ea3o ",(0,e.jsx)(a.a,{href:"https://docs.docker.com/get-docker/",children:"c\xe1ch c\xe0i \u0111\u1eb7t Docker"})," v\xe0 ",(0,e.jsx)(a.a,{href:"https://docs.docker.com/compose/install/",children:"c\xe1c c\xe0i \u0111\u1eb7t Docker Compose"})," cho m\xe1y t\xednh c\u1ee7a m\xecnh."]}),"\n",(0,e.jsx)(a.h4,{id:"1-t\u1ea1o-file-grafana-dashboardyaml",children:"1. T\u1ea1o file grafana-dashboard.yaml"}),"\n",(0,e.jsxs)(a.p,{children:["\u0110\u1ea7u ti\xean, ch\xfang ta s\u1ebd t\u1ea1o file ",(0,e.jsx)(a.code,{children:"grafana-dashboard.yaml"})," v\u1edbi n\u1ed9i dung sau:"]}),"\n",(0,e.jsx)(a.pre,{children:(0,e.jsx)(a.code,{className:"language-bash",children:"apiVersion: 1\nproviders:\n  - name: 'default'       \n    org_id: 1             \n    folder: ''            \n    type: 'file'          \n    options:\n      path: /var/lib/grafana/dashboards\n"})}),"\n",(0,e.jsxs)(a.p,{children:["\u0110o\u1ea1n script n\xe0y \u0111\u1eb7t \u0111\u01b0\u1eddng d\u1eabn l\u01b0u tr\u1eef c\xe1c b\u1ea3ng \u0111i\u1ec1u khi\u1ec3n trong Grafana l\xe0 th\u01b0 m\u1ee5c ",(0,e.jsx)(a.code,{children:"/var/lib/grafana/dashboards"}),". Khi ch\xfang ta import ho\u1eb7c t\u1ea1o m\u1edbi dashboard, n\xf3 s\u1ebd l\u01b0u tr\u1eef t\u1ea1i v\u1ecb tr\xed n\xe0y. \u0110i\u1ec1u n\xe0y gi\xfap ch\xfang ta c\xf3 th\u1ec3 chia s\u1ebb v\xe0 qu\u1ea3n l\xfd dashboard d\u1ec5 d\xe0ng h\u01a1n."]}),"\n",(0,e.jsxs)(a.p,{children:["Ti\u1ebfp \u0111\u1ebfn, h\xe3y t\u1ea1o th\u01b0 m\u1ee5c ",(0,e.jsx)(a.code,{children:"dashboards"})," trong th\u01b0 m\u1ee5c hi\u1ec7n t\u1ea1i \u0111\u1ec3 l\u01b0u tr\u1eef c\xe1c dashboard m\xe0 sau n\xe0y ch\xfang ta s\u1ebd t\u1ea1o v\xe0 import v\xe0o Grafana."]}),"\n",(0,e.jsx)(a.h4,{id:"2-t\u1ea1o-file-grafana-datasourceyaml",children:"2. T\u1ea1o file grafana-datasource.yaml"}),"\n",(0,e.jsxs)(a.p,{children:["Sau \u0111\xf3, t\u1ea1o th\xeam file ",(0,e.jsx)(a.code,{children:"grafana-datasource.yaml"})," v\u1edbi n\u1ed9i dung sau \u0111\u1ec3 \u0111\u1ecbnh ngh\u0129a ngu\u1ed3n d\u1eef li\u1ec7u cho Grafana:"]}),"\n",(0,e.jsx)(a.pre,{children:(0,e.jsx)(a.code,{className:"language-yaml",children:"apiVersion: 1\n\ndatasources:\n  - name: k6influxdb\n    type: influxdb\n    access: proxy\n    database: k6\n    url: http://influxdb:8086\n    isDefault: true\n"})}),"\n",(0,e.jsxs)(a.p,{children:["\u0110o\u1ea1n script n\xe0y \u0111\u1ecbnh ngh\u0129a ngu\u1ed3n d\u1eef li\u1ec7u cho Grafana l\xe0 InfluxDB v\u1edbi t\xean l\xe0 ",(0,e.jsx)(a.code,{children:"k6influxdb"}),". N\xf3 s\u1ebd k\u1ebft n\u1ed1i t\u1edbi InfluxDB ch\u1ea1y tr\xean c\u1ed5ng 8086 v\xe0 s\u1eed d\u1ee5ng c\u01a1 s\u1edf d\u1eef li\u1ec7u ",(0,e.jsx)(a.code,{children:"k6"})," l\xe0m m\u1eb7c \u0111\u1ecbnh."]}),"\n",(0,e.jsx)(a.h4,{id:"3-t\u1ea1o-file-docker-composeyml",children:"3. T\u1ea1o file docker-compose.yml"}),"\n",(0,e.jsxs)(a.p,{children:["Cu\u1ed1i c\xf9ng, h\xe3y t\u1ea1o file ",(0,e.jsx)(a.code,{children:"docker-compose.yml"})," v\u1edbi n\u1ed9i dung sau:"]}),"\n",(0,e.jsx)(a.pre,{children:(0,e.jsx)(a.code,{className:"language-yaml",children:'version: \'3.4\'\n\nnetworks:\n  k6:\n  grafana:\n\nservices:\n  influxdb:\n    image: influxdb:1.8\n  #  entrypoint: /bin/sh\n  #  user: root\n    networks:\n      - k6\n      - grafana\n    ports:\n      - "8086:8086"\n    environment:\n      - INFLUXDB_DB=k6\n\n  grafana:\n    image: grafana/grafana:8.5.21\n  #  entrypoint: /bin/sh\n  #  user: root\n    networks:\n      - grafana\n    ports:\n      - "3000:3000"\n    environment:\n      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin\n      - GF_AUTH_ANONYMOUS_ENABLED=true\n      - GF_AUTH_BASIC_ENABLED=false\n      - GF_SERVER_SERVE_FROM_SUB_PATH=true\n    volumes:\n      - ./dashboards:/var/lib/grafana/dashboards\n      - ./grafana-dashboard.yaml:/etc/grafana/provisioning/dashboards/dashboard.yaml\n      - ./grafana-datasource.yaml:/etc/grafana/provisioning/datasources/datasource.yaml\n\n  k6:\n    image: grafana/k6:latest\n#    entrypoint: /bin/sh\n#    user: root\n    networks:\n      - k6\n    ports:\n      - "6565:6565"\n    environment:\n      - K6_OUT=influxdb=http://influxdb:8086/k6\n    volumes:\n      - ./scripts:/scripts\n'})}),"\n",(0,e.jsxs)(a.p,{children:["Ch\xfang ta mount th\u01b0 m\u1ee5c ",(0,e.jsx)(a.code,{children:"scripts"})," trong container k6 v\xe0o th\u01b0 m\u1ee5c ",(0,e.jsx)(a.code,{children:"/scripts"})," \u0111\u1ec3 k6 c\xf3 th\u1ec3 truy c\u1eadp v\xe0 ch\u1ea1y c\xe1c k\u1ecbch b\u1ea3n test \u0111\u01b0\u1ee3c l\u01b0u trong th\u01b0 m\u1ee5c n\xe0y. Ngo\xe0i ra, c\u1ea5u h\xecnh cho k6 ghi k\u1ebft qu\u1ea3 load test sang InfluxDB th\xf4ng qua \u0111\u1ecba ch\u1ec9 ",(0,e.jsx)(a.code,{children:"http://influxdb:8086/k6"}),". \u0110\u1ecba ch\u1ec9 n\xe0y bao g\u1ed3m:"]}),"\n",(0,e.jsxs)(a.ul,{children:["\n",(0,e.jsxs)(a.li,{children:[(0,e.jsx)(a.code,{children:"influxdb: T\xean container InfluxDB \u0111\u01b0\u1ee3c khai b\xe1o trong "}),"docker-compose.yml`."]}),"\n",(0,e.jsxs)(a.li,{children:[(0,e.jsx)(a.code,{children:"8086"}),": C\u1ed5ng InfluxDB m\u1eb7c \u0111\u1ecbnh."]}),"\n",(0,e.jsxs)(a.li,{children:[(0,e.jsx)(a.code,{children:"k6"}),": T\xean bucket \u0111\u01b0\u1ee3c t\u1ea1o trong InfluxDB \u0111\u1ec3 l\u01b0u tr\u1eef d\u1eef li\u1ec7u t\u1eeb k6."]}),"\n"]}),"\n",(0,e.jsx)(a.p,{children:"C\u1ea5u tr\xfac th\u01b0 m\u1ee5c s\u1ebd nh\u01b0 sau:"}),"\n",(0,e.jsx)(a.pre,{children:(0,e.jsx)(a.code,{className:"language-bash",children:"\u251c\u2500\u2500 dashboards\n\u2502   \u2514\u2500\u2500 k6-load-testing-results.json\n\u251c\u2500\u2500 docker-compose.yml\n\u251c\u2500\u2500 grafana-dashboard.yaml\n\u251c\u2500\u2500 grafana-datasource.yaml\n\u2514\u2500\u2500 scripts\n    \u2514\u2500\u2500 script.js\n"})}),"\n",(0,e.jsx)(a.h4,{id:"4-t\u1ea1o-file-k6-load-testing-resultsjson",children:"4. T\u1ea1o file k6-load-testing-results.json"}),"\n",(0,e.jsxs)(a.p,{children:["Trong th\u01b0 m\u1ee5c ",(0,e.jsx)(a.code,{children:"dashboards"}),", h\xe3y t\u1ea3i file ",(0,e.jsx)(a.a,{href:"https://grafana.com/grafana/dashboards/2587",children:"k6-load-testing-results.json"})," v\u1ec1 v\xe0 \u0111\u1ed5i t\xean th\xe0nh ",(0,e.jsx)(a.code,{children:"k6-load-testing-results.json"}),". \u0110\xe2y l\xe0 file m\u1eabu dashboard \u0111\u01b0\u1ee3c cung c\u1ea5p s\u1eb5n b\u1edfi Grafana \u0111\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test t\u1eeb k6."]}),"\n",(0,e.jsx)(a.h4,{id:"5-kh\u1edfi-ch\u1ea1y-docker-compose",children:"5. Kh\u1edfi ch\u1ea1y Docker Compose"}),"\n",(0,e.jsx)(a.p,{children:"\u0110\u1ec3 kh\u1edfi ch\u1ea1y docker compose, h\xe3y ch\u1ea1y l\u1ec7nh sau:"}),"\n",(0,e.jsx)(a.pre,{children:(0,e.jsx)(a.code,{className:"language-bash",children:"docker-compose up -d influxdb grafana\n"})}),"\n",(0,e.jsx)(a.p,{children:"\u0110\xe2y l\xe0 l\u1ec7nh kh\u1edfi ch\u1ea1y Docker Compose \u0111\u1ec3 ch\u1ea1y c\xe1c container InfluxDB v\xe0 Grafana trong n\u1ec1n. N\u1ebfu kh\u1edfi ch\u1ea1y th\xe0nh c\xf4ng, m\xe0n h\xecnh console s\u1ebd hi\u1ec3n th\u1ecb t\u01b0\u01a1ng t\u1ef1 nh\u01b0 sau:"}),"\n",(0,e.jsx)(a.pre,{children:(0,e.jsx)(a.code,{className:"language-bash",children:"docker-compose up -d influxdb grafana\n[+] Running 4/4\n \u2714 Network perfomance_grafana       Created                                                0.1s \n \u2714 Network perfomance_k6            Created                                                0.1s \n \u2714 Container perfomance-influxdb-1  Started                                                2.4s \n \u2714 Container perfomance-grafana-1   Started                                                2.4s \n"})}),"\n",(0,e.jsxs)(a.p,{children:["Sau khi ch\u1ea1y l\u1ec7nh n\xe0y, b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o InfluxDB tr\xean \u0111\u1ecba ch\u1ec9 ",(0,e.jsx)(a.a,{href:"http://localhost:8086",children:"http://localhost:8086"})," v\xe0 Grafana tr\xean \u0111\u1ecba ch\u1ec9 ",(0,e.jsx)(a.a,{href:"http://localhost:3000",children:"http://localhost:3000"}),". L\u01b0u \xfd r\u1eb1ng, c\xe1c porrt 8086 v\xe0 3000 \u0111\xe3 \u0111\u01b0\u1ee3c map t\u1eeb Docker container ra ngo\xe0i m\xe1y ch\u1ee7 \u0111\u1ec3 truy c\u1eadp."]}),"\n",(0,e.jsx)("p",{align:"center",children:(0,e.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725712964/blog/images/grafana_f8drfr.webp",loading:"lazy",decoding:"async"})}),"\n",(0,e.jsx)(a.h2,{id:"t\u1ea1o-k\u1ecbch-b\u1ea3n-test",children:"T\u1ea1o k\u1ecbch b\u1ea3n test"}),"\n",(0,e.jsxs)(a.p,{children:["\u1ede b\u01b0\u1edbc n\xe0y, ch\xfang ta s\u1ebd t\u1ea1o m\u1ed9t k\u1ecbch b\u1ea3n test API \u0111\u01a1n gi\u1ea3n. Trong th\u01b0 m\u1ee5c ",(0,e.jsx)(a.code,{children:"scripts"}),", h\xe3y t\u1ea1o file ",(0,e.jsx)(a.code,{children:"script.js"})," v\u1edbi n\u1ed9i dung sau:"]}),"\n",(0,e.jsx)(a.pre,{children:(0,e.jsx)(a.code,{className:"language-js",children:"import http from 'k6/http';\nimport { sleep } from 'k6';\n\nexport let options = {\n  stages: [\n    { duration: '30s', target: 20 },\n    { duration: '1m30s', target: 10 },\n    { duration: '20s', target: 0 },\n  ],\n};\n\nexport default function () {\n  http.get('https://test.k6.io');\n  sleep(1);\n}\n"})}),"\n",(0,e.jsxs)(a.p,{children:["N\u1ebfu \u0111\u1ec3 \xfd, b\u1ea1n s\u1ebd th\u1ea5y \u0111o\u1ea1n script n\xe0y ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u trong ",(0,e.jsx)(a.a,{href:"/docs/k6/load-testing-restful-apis-with-k6-part-03",children:"part 3"})," c\u1ee7a lo\u1ea1t b\xe0i h\u01b0\u1edbng d\u1eabn n\xe0y."]}),"\n",(0,e.jsx)(a.h2,{id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test-v\xe0-tr\u1ef1c-quan-h\xf3a-k\u1ebft-qu\u1ea3",children:"Ch\u1ea1y k\u1ecbch b\u1ea3n test v\xe0 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3"}),"\n",(0,e.jsx)(a.h3,{id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",children:"Ch\u1ea1y k\u1ecbch b\u1ea3n test"}),"\n",(0,e.jsx)(a.p,{children:"\u0110\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test, h\xe3y ch\u1ea1y l\u1ec7nh sau:"}),"\n",(0,e.jsx)(a.pre,{children:(0,e.jsx)(a.code,{className:"language-bash",children:"docker-compose run k6 run /scripts/script.js\n"})}),"\n",(0,e.jsxs)(a.p,{children:["Trong l\u1ea7n ch\u1ea1y \u0111\u1ea7u ti\xean, k6 s\u1ebd t\u1ea3i image ",(0,e.jsx)(a.code,{children:"grafana/k6:latest"})," v\u1ec1 m\xe1y n\u1ebfu ch\u01b0a c\xf3 v\xe0 ch\u1ea1y k\u1ecbch b\u1ea3n test."]}),"\n",(0,e.jsx)(a.h3,{id:"tr\u1ef1c-quan-h\xf3a-k\u1ebft-qu\u1ea3",children:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3"}),"\n",(0,e.jsxs)(a.p,{children:["\u0110\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3, h\xe3y truy c\u1eadp v\xe0o Grafana Dashboard theo link sau: ",(0,e.jsx)(a.a,{href:"http://localhost:3000/d/k6/k6-load-testing-results",children:"http://localhost:3000/d/k6/k6-load-testing-results"}),"."]}),"\n",(0,e.jsx)(a.p,{children:"K\u1ebft qu\u1ea3 s\u1ebd hi\u1ec3n th\u1ecb t\u01b0\u01a1ng t\u1ef1 nh\u01b0 sau:"}),"\n",(0,e.jsx)("p",{align:"center",children:(0,e.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725712969/blog/images/grafana-dashboard_dgue57.webp",loading:"lazy",decoding:"async"})}),"\n",(0,e.jsx)(a.p,{children:"Nh\u01b0 v\u1eady, ch\xfang ta \u0111\xe3 c\xf3 th\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test t\u1eeb k6 tr\xean Grafana. T\u1eeb \u0111\xe2y, ch\xfang ta c\xf3 th\u1ec3 ph\xe2n t\xedch k\u1ebft qu\u1ea3 v\xe0 t\u1ed1i \u01b0u h\xf3a hi\u1ec7u n\u0103ng \u1ee9ng d\u1ee5ng m\u1ed9t c\xe1ch tr\u1ef1c quan h\u01a1n."}),"\n",(0,e.jsxs)(a.admonition,{type:"tip",children:[(0,e.jsxs)(a.p,{children:["To\xe0n b\u1ed9 ",(0,e.jsx)(a.strong,{children:"source code"})," c\u1ee7a b\xe0i vi\u1ebft n\xe0y c\xf3 th\u1ec3 t\xecm th\u1ea5y t\u1ea1i ",(0,e.jsx)(a.a,{href:"https://github.com/TienNHM/k6-load-testing-results-visualization-with-grafana",children:"\u0111\xe2y"}),". B\u1ea1n c\xf3 th\u1ec3 clone v\u1ec1 v\xe0 th\u1ef1c h\xe0nh theo h\u01b0\u1edbng d\u1eabn trong b\xe0i vi\u1ebft."]}),(0,e.jsx)(a.p,{children:"H\xe3y g\u1eafn cho m\xecnh m\u1ed9t ng\xf4i sao tr\xean Github repo n\u1ebfu b\u1ea1n th\u1ea5y b\xe0i vi\u1ebft n\xe0y h\u1eefu \xedch nh\xe9!"})]}),"\n",(0,e.jsx)(a.h2,{id:"l\u1eddi-k\u1ebft",children:"L\u1eddi k\u1ebft"}),"\n",(0,e.jsx)(a.p,{children:"B\xe0i vi\u1ebft n\xe0y \u0111\xe3 h\u01b0\u1edbng d\u1eabn c\xe1c b\u01b0\u1edbc c\xe0i \u0111\u1eb7t v\xe0 c\u1ea5u h\xecnh Grafana c\xf9ng InfluxDB \u0111\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test t\u1eeb k6. Vi\u1ec7c k\u1ebft h\u1ee3p c\xe1c c\xf4ng c\u1ee5 n\xe0y gi\xfap ng\u01b0\u1eddi d\xf9ng c\xf3 th\u1ec3 theo d\xf5i v\xe0 ph\xe2n t\xedch k\u1ebft qu\u1ea3 test m\u1ed9t c\xe1ch tr\u1ef1c quan h\u01a1n, d\u1ec5 d\xe0ng nh\u1eadn ra c\xe1c v\u1ea5n \u0111\u1ec1 v\u1ec1 hi\u1ec7u n\u0103ng c\u1ee7a \u1ee9ng d\u1ee5ng khi ch\u1ecbu t\u1ea3i cao."}),"\n",(0,e.jsx)(a.p,{children:"Trong c\xe1c b\xe0i ti\u1ebfp theo, t\xf4i s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1c b\u1ea1n vi\u1ebft c\xe1c k\u1ecbch b\u1ea3n load test ph\u1ee9c t\u1ea1p h\u01a1n v\xe0 ph\xe2n t\xedch k\u1ebft qu\u1ea3 t\u1eeb Grafana \u0111\u1ec3 t\u1ed1i \u01b0u h\xf3a hi\u1ec7u n\u0103ng \u1ee9ng d\u1ee5ng."})]})}function d(n={}){const{wrapper:a}={...(0,i.R)(),...n.components};return a?(0,e.jsx)(a,{...n,children:(0,e.jsx)(o,{...n})}):o(n)}},28453:(n,a,t)=>{t.d(a,{R:()=>s,x:()=>r});var e=t(96540);const i={},c=e.createContext(i);function s(n){const a=e.useContext(c);return e.useMemo((function(){return"function"==typeof n?n(a):{...a,...n}}),[a,n])}function r(n){let a;return a=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:s(n.components),e.createElement(c.Provider,{value:a},n.children)}}}]);