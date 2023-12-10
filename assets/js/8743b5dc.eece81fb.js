"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[6678],{3905:(t,n,a)=>{a.d(n,{Zo:()=>h,kt:()=>g});var e=a(67294);function r(t,n,a){return n in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t}function i(t,n){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);n&&(e=e.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),a.push.apply(a,e)}return a}function l(t){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?i(Object(a),!0).forEach((function(n){r(t,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(a,n))}))}return t}function o(t,n){if(null==t)return{};var a,e,r=function(t,n){if(null==t)return{};var a,e,r={},i=Object.keys(t);for(e=0;e<i.length;e++)a=i[e],n.indexOf(a)>=0||(r[a]=t[a]);return r}(t,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(e=0;e<i.length;e++)a=i[e],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var c=e.createContext({}),s=function(t){var n=e.useContext(c),a=n;return t&&(a="function"==typeof t?t(n):l(l({},n),t)),a},h=function(t){var n=s(t.components);return e.createElement(c.Provider,{value:n},t.children)},u="mdxType",p={inlineCode:"code",wrapper:function(t){var n=t.children;return e.createElement(e.Fragment,{},n)}},d=e.forwardRef((function(t,n){var a=t.components,r=t.mdxType,i=t.originalType,c=t.parentName,h=o(t,["components","mdxType","originalType","parentName"]),u=s(a),d=r,g=u["".concat(c,".").concat(d)]||u[d]||p[d]||i;return a?e.createElement(g,l(l({ref:n},h),{},{components:a})):e.createElement(g,l({ref:n},h))}));function g(t,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof t||r){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=t,o[u]="string"==typeof t?t:r,l[1]=o;for(var s=2;s<i;s++)l[s]=a[s];return e.createElement.apply(null,l)}return e.createElement.apply(null,a)}d.displayName="MDXCreateElement"},44465:(t,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var e=a(87462),r=(a(67294),a(3905));const i={slug:"load-testing-restful-apis-with-k6-part-05",title:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test v\u1edbi Grafana v\xe0 InfluxDB",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup","visualization","grafana","influxdb"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},l=void 0,o={unversionedId:"k6/part-05",id:"k6/part-05",title:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test v\u1edbi Grafana v\xe0 InfluxDB",description:"Trong c\xe1c b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 bi\u1ebft c\xe1ch vi\u1ebft k\u1ecbch b\u1ea3n test v\xe0 xem k\u1ebft qu\u1ea3 tr\xean m\xe0n h\xecnh console khi ch\u1ea1y k\u1ecbch b\u1ea3n v\u1edbi k6. Tuy nhi\xean, \u0111\u1ec3 c\xf3 th\u1ec3 quan s\xe1t v\xe0 ph\xe2n t\xedch k\u1ebft qu\u1ea3 m\u1ed9t c\xe1ch tr\u1ef1c quan h\u01a1n, ch\xfang ta c\xf3 th\u1ec3 k\u1ebft h\u1ee3p k6 v\u1edbi Grafana v\xe0 InfluxDB.",source:"@site/docs/05-k6/part-05.md",sourceDirName:"05-k6",slug:"/k6/load-testing-restful-apis-with-k6-part-05",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-05",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/05-k6/part-05.md",tags:[{label:"load-testing",permalink:"/docs/tags/load-testing"},{label:"k6",permalink:"/docs/tags/k-6"},{label:"restful-api",permalink:"/docs/tags/restful-api"},{label:"performance-testing",permalink:"/docs/tags/performance-testing"},{label:"setup",permalink:"/docs/tags/setup"},{label:"visualization",permalink:"/docs/tags/visualization"},{label:"grafana",permalink:"/docs/tags/grafana"},{label:"influxdb",permalink:"/docs/tags/influxdb"}],version:"current",frontMatter:{slug:"load-testing-restful-apis-with-k6-part-05",title:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test v\u1edbi Grafana v\xe0 InfluxDB",authors:["tiennhm"],tags:["load-testing","k6","restful-api","performance-testing","setup","visualization","grafana","influxdb"],enableComments:!0,draft:!1,image:"https://v1.screenshot.11ty.dev/https%3A%2F%2Fk6.io/opengraph/"},sidebar:"tutorialSidebar",previous:{title:"\xdd ngh\u0129a c\xe1c ch\u1ec9 s\u1ed1 trong k\u1ebft qu\u1ea3 c\u1ee7a k6",permalink:"/docs/k6/load-testing-restful-apis-with-k6-part-04"}},c={},s=[{value:"C\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana",id:"c\xe0i-\u0111\u1eb7t-influxdb-v\xe0-grafana",level:2},{value:"InfluxDB l\xe0 g\xec?",id:"influxdb-l\xe0-g\xec",level:3},{value:"Grafana l\xe0 g\xec?",id:"grafana-l\xe0-g\xec",level:3},{value:"C\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana",id:"c\xe0i-\u0111\u1eb7t-influxdb-v\xe0-grafana-1",level:3},{value:"1. T\u1ea1o file grafana-dashboard.yaml",id:"1-t\u1ea1o-file-grafana-dashboardyaml",level:4},{value:"2. T\u1ea1o file grafana-datasource.yaml",id:"2-t\u1ea1o-file-grafana-datasourceyaml",level:4},{value:"3. T\u1ea1o file docker-compose.yml",id:"3-t\u1ea1o-file-docker-composeyml",level:4},{value:"4. T\u1ea1o file k6-load-testing-results.json",id:"4-t\u1ea1o-file-k6-load-testing-resultsjson",level:4},{value:"5. Kh\u1edfi ch\u1ea1y Docker Compose",id:"5-kh\u1edfi-ch\u1ea1y-docker-compose",level:4},{value:"T\u1ea1o k\u1ecbch b\u1ea3n test",id:"t\u1ea1o-k\u1ecbch-b\u1ea3n-test",level:2},{value:"Ch\u1ea1y k\u1ecbch b\u1ea3n test v\xe0 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3",id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test-v\xe0-tr\u1ef1c-quan-h\xf3a-k\u1ebft-qu\u1ea3",level:2},{value:"Ch\u1ea1y k\u1ecbch b\u1ea3n test",id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test",level:3},{value:"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3",id:"tr\u1ef1c-quan-h\xf3a-k\u1ebft-qu\u1ea3",level:3},{value:"L\u1eddi k\u1ebft",id:"l\u1eddi-k\u1ebft",level:2}],h={toc:s},u="wrapper";function p(t){let{components:n,...a}=t;return(0,r.kt)(u,(0,e.Z)({},h,a,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",{align:"right"},(0,r.kt)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fload-testing-restful-apis-with-k6-part-05&label=\u26aaViews&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})),(0,r.kt)("p",null,"Trong c\xe1c b\xe0i vi\u1ebft tr\u01b0\u1edbc, ch\xfang ta \u0111\xe3 bi\u1ebft c\xe1ch vi\u1ebft k\u1ecbch b\u1ea3n test v\xe0 xem k\u1ebft qu\u1ea3 tr\xean m\xe0n h\xecnh console khi ch\u1ea1y k\u1ecbch b\u1ea3n v\u1edbi k6. Tuy nhi\xean, \u0111\u1ec3 c\xf3 th\u1ec3 quan s\xe1t v\xe0 ph\xe2n t\xedch k\u1ebft qu\u1ea3 m\u1ed9t c\xe1ch tr\u1ef1c quan h\u01a1n, ch\xfang ta c\xf3 th\u1ec3 k\u1ebft h\u1ee3p k6 v\u1edbi Grafana v\xe0 InfluxDB."),(0,r.kt)("p",null,"B\xe0i vi\u1ebft n\xe0y s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1c b\u1ea1n c\xe0i \u0111\u1eb7t v\xe0 s\u1eed d\u1ee5ng Grafana c\xf9ng InfluxDB \u0111\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test t\u1eeb k6."),(0,r.kt)("h2",{id:"c\xe0i-\u0111\u1eb7t-influxdb-v\xe0-grafana"},"C\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana"),(0,r.kt)("h3",{id:"influxdb-l\xe0-g\xec"},"InfluxDB l\xe0 g\xec?"),(0,r.kt)("p",{align:"right"},(0,r.kt)("img",{src:"https://www.influxdata.com/images/influxdata_full_navy-a7ca2ff4.svg",loading:"lazy",decoding:"async"})),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://www.influxdata.com/"},"InfluxDB")," l\xe0 m\u1ed9t c\u01a1 s\u1edf d\u1eef li\u1ec7u time-series m\xe3 ngu\u1ed3n m\u1edf \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 l\u01b0u tr\u1eef v\xe0 truy xu\u1ea5t d\u1eef li\u1ec7u theo th\u1eddi gian m\u1ed9t c\xe1ch hi\u1ec7u qu\u1ea3. InfluxDB c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 l\u01b0u tr\u1eef c\xe1c ch\u1ec9 s\u1ed1 \u0111o l\u01b0\u1eddng t\u1eeb c\xe1c c\xf4ng c\u1ee5 ki\u1ec3m tra hi\u1ec7u su\u1ea5t nh\u01b0 k6, ",(0,r.kt)("a",{parentName:"p",href:"https://jmeter.apache.org/"},"JMeter"),", ",(0,r.kt)("a",{parentName:"p",href:"https://gatling.io/"},"Gatling"),"... v\xe0 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 t\u1eeb c\xe1c c\xf4ng c\u1ee5 n\xe0y."),(0,r.kt)("p",null,"C\xe1c \u0111\u1eb7c \u0111i\u1ec3m ch\xednh c\u1ee7a InfluxDB bao g\u1ed3m:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"L\u01b0u tr\u1eef d\u1eef li\u1ec7u theo th\u1eddi gian v\u1edbi t\u1ed1c \u0111\u1ed9 cao."),(0,r.kt)("li",{parentName:"ul"},"C\xf3 kh\u1ea3 n\u0103ng m\u1edf r\u1ed9ng t\u1ed1t cho l\u01b0\u1ee3ng d\u1eef li\u1ec7u l\u1edbn."),(0,r.kt)("li",{parentName:"ul"},"C\xf3 th\u1ec3 truy v\u1ea5n v\xe0 l\u1ecdc d\u1eef li\u1ec7u theo th\u1eddi gian hi\u1ec7u qu\u1ea3.")),(0,r.kt)("h3",{id:"grafana-l\xe0-g\xec"},"Grafana l\xe0 g\xec?"),(0,r.kt)("p",{align:"right"},(0,r.kt)("img",{src:"https://grafana.com/media/grafana/images/grafana-dashboard-english.png",loading:"lazy",decoding:"async"})),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/"},"Grafana")," l\xe0 m\u1ed9t c\xf4ng c\u1ee5 tr\u1ef1c quan h\xf3a v\xe0 qu\u1ea3n l\xfd b\u1ea3ng \u0111i\u1ec1u khi\u1ec3n m\xe3 ngu\u1ed3n m\u1edf. N\xf3 cho ph\xe9p truy v\u1ea5n, tr\u1ef1c quan h\xf3a v\xe0 gi\xe1m s\xe1t nhi\u1ec1u lo\u1ea1i ngu\u1ed3n d\u1eef li\u1ec7u bao g\u1ed3m ",(0,r.kt)("a",{parentName:"p",href:"https://www.influxdata.com/"},"InfluxDB"),", ",(0,r.kt)("a",{parentName:"p",href:"https://prometheus.io/"},"Prometheus"),", ",(0,r.kt)("a",{parentName:"p",href:"https://www.elastic.co/"},"Elasticsearch")," v\xe0 nhi\u1ec1u ngu\u1ed3n kh\xe1c."),(0,r.kt)("p",null,"V\u1edbi Grafana, ch\xfang ta c\xf3 th\u1ec3 x\xe2y d\u1ef1ng c\xe1c b\u1ea3ng \u0111i\u1ec1u khi\u1ec3n v\u1edbi nhi\u1ec1u lo\u1ea1i bi\u1ec3u \u0111\u1ed3 kh\xe1c nhau nh\u01b0 bi\u1ec3u \u0111\u1ed3 \u0111\u01b0\u1eddng, bi\u1ec3u \u0111\u1ed3 tr\xf2n, bi\u1ec3u \u0111\u1ed3 c\u1ed9t...\u0111\u1ec3 tr\u1ef1c quan h\xf3a d\u1eef li\u1ec7u t\u1eeb ngu\u1ed3n d\u1eef li\u1ec7u l\u01b0u tr\u1eef nh\u01b0 InfluxDB. Ngo\xe0i ra, Grafana c\xf2n h\u1ed7 tr\u1ee3 nhi\u1ec1u t\xednh n\u0103ng nh\u01b0 ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/products/cloud/alerting/"},"alerting"),", ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/products/cloud/logs/"},"logging"),", dashboard sharing... gi\xfap qu\u1ea3n l\xfd v\xe0 theo d\xf5i hi\u1ec7u su\u1ea5t \u1ee9ng d\u1ee5ng m\u1ed9t c\xe1ch t\u1ed5ng quan v\xe0 tr\u1ef1c quan h\u01a1n."),(0,r.kt)("h3",{id:"c\xe0i-\u0111\u1eb7t-influxdb-v\xe0-grafana-1"},"C\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana"),(0,r.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd c\xe0i \u0111\u1eb7t InfluxDB v\xe0 Grafana b\u1eb1ng Docker Comopose. L\u01b0u \xfd \u0111\u1ea3m b\u1ea3o Docker v\xe0 Docker Compose \u0111\xe3 \u0111\u01b0\u1ee3c c\xe0i \u0111\u1eb7t tr\xean m\xe1y. N\u1ebfu ch\u01b0a, b\u1ea1n c\xf3 th\u1ec3 tham kh\u1ea3o ",(0,r.kt)("a",{parentName:"p",href:"https://docs.docker.com/get-docker/"},"c\xe1ch c\xe0i \u0111\u1eb7t Docker")," v\xe0 ",(0,r.kt)("a",{parentName:"p",href:"https://docs.docker.com/compose/install/"},"c\xe1c c\xe0i \u0111\u1eb7t Docker Compose")," cho m\xe1y t\xednh c\u1ee7a m\xecnh."),(0,r.kt)("h4",{id:"1-t\u1ea1o-file-grafana-dashboardyaml"},"1. T\u1ea1o file grafana-dashboard.yaml"),(0,r.kt)("p",null,"\u0110\u1ea7u ti\xean, ch\xfang ta s\u1ebd t\u1ea1o file ",(0,r.kt)("inlineCode",{parentName:"p"},"grafana-dashboard.yaml")," v\u1edbi n\u1ed9i dung sau:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"apiVersion: 1\nproviders:\n  - name: 'default'       \n    org_id: 1             \n    folder: ''            \n    type: 'file'          \n    options:\n      path: /var/lib/grafana/dashboards\n")),(0,r.kt)("p",null,"\u0110o\u1ea1n script n\xe0y \u0111\u1eb7t \u0111\u01b0\u1eddng d\u1eabn l\u01b0u tr\u1eef c\xe1c b\u1ea3ng \u0111i\u1ec1u khi\u1ec3n trong Grafana l\xe0 th\u01b0 m\u1ee5c ",(0,r.kt)("inlineCode",{parentName:"p"},"/var/lib/grafana/dashboards"),". Khi ch\xfang ta import ho\u1eb7c t\u1ea1o m\u1edbi dashboard, n\xf3 s\u1ebd l\u01b0u tr\u1eef t\u1ea1i v\u1ecb tr\xed n\xe0y. \u0110i\u1ec1u n\xe0y gi\xfap ch\xfang ta c\xf3 th\u1ec3 chia s\u1ebb v\xe0 qu\u1ea3n l\xfd dashboard d\u1ec5 d\xe0ng h\u01a1n."),(0,r.kt)("p",null,"Ti\u1ebfp \u0111\u1ebfn, h\xe3y t\u1ea1o th\u01b0 m\u1ee5c ",(0,r.kt)("inlineCode",{parentName:"p"},"dashboards")," trong th\u01b0 m\u1ee5c hi\u1ec7n t\u1ea1i \u0111\u1ec3 l\u01b0u tr\u1eef c\xe1c dashboard m\xe0 sau n\xe0y ch\xfang ta s\u1ebd t\u1ea1o v\xe0 import v\xe0o Grafana."),(0,r.kt)("h4",{id:"2-t\u1ea1o-file-grafana-datasourceyaml"},"2. T\u1ea1o file grafana-datasource.yaml"),(0,r.kt)("p",null,"Sau \u0111\xf3, t\u1ea1o th\xeam file ",(0,r.kt)("inlineCode",{parentName:"p"},"grafana-datasource.yaml")," v\u1edbi n\u1ed9i dung sau \u0111\u1ec3 \u0111\u1ecbnh ngh\u0129a ngu\u1ed3n d\u1eef li\u1ec7u cho Grafana:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: 1\n\ndatasources:\n  - name: k6influxdb\n    type: influxdb\n    access: proxy\n    database: k6\n    url: http://influxdb:8086\n    isDefault: true\n")),(0,r.kt)("p",null,"\u0110o\u1ea1n script n\xe0y \u0111\u1ecbnh ngh\u0129a ngu\u1ed3n d\u1eef li\u1ec7u cho Grafana l\xe0 InfluxDB v\u1edbi t\xean l\xe0 ",(0,r.kt)("inlineCode",{parentName:"p"},"k6influxdb"),". N\xf3 s\u1ebd k\u1ebft n\u1ed1i t\u1edbi InfluxDB ch\u1ea1y tr\xean c\u1ed5ng 8086 v\xe0 s\u1eed d\u1ee5ng c\u01a1 s\u1edf d\u1eef li\u1ec7u ",(0,r.kt)("inlineCode",{parentName:"p"},"k6")," l\xe0m m\u1eb7c \u0111\u1ecbnh."),(0,r.kt)("h4",{id:"3-t\u1ea1o-file-docker-composeyml"},"3. T\u1ea1o file docker-compose.yml"),(0,r.kt)("p",null,"Cu\u1ed1i c\xf9ng, h\xe3y t\u1ea1o file ",(0,r.kt)("inlineCode",{parentName:"p"},"docker-compose.yml")," v\u1edbi n\u1ed9i dung sau:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'version: \'3.4\'\n\nnetworks:\n  k6:\n  grafana:\n\nservices:\n  influxdb:\n    image: influxdb:1.8\n  #  entrypoint: /bin/sh\n  #  user: root\n    networks:\n      - k6\n      - grafana\n    ports:\n      - "8086:8086"\n    environment:\n      - INFLUXDB_DB=k6\n\n  grafana:\n    image: grafana/grafana:8.5.21\n  #  entrypoint: /bin/sh\n  #  user: root\n    networks:\n      - grafana\n    ports:\n      - "3000:3000"\n    environment:\n      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin\n      - GF_AUTH_ANONYMOUS_ENABLED=true\n      - GF_AUTH_BASIC_ENABLED=false\n      - GF_SERVER_SERVE_FROM_SUB_PATH=true\n    volumes:\n      - ./dashboards:/var/lib/grafana/dashboards\n      - ./grafana-dashboard.yaml:/etc/grafana/provisioning/dashboards/dashboard.yaml\n      - ./grafana-datasource.yaml:/etc/grafana/provisioning/datasources/datasource.yaml\n\n  k6:\n    image: grafana/k6:latest\n#    entrypoint: /bin/sh\n#    user: root\n    networks:\n      - k6\n    ports:\n      - "6565:6565"\n    environment:\n      - K6_OUT=influxdb=http://influxdb:8086/k6\n    volumes:\n      - ./scripts:/scripts\n')),(0,r.kt)("p",null,"Ch\xfang ta mount th\u01b0 m\u1ee5c ",(0,r.kt)("inlineCode",{parentName:"p"},"scripts")," trong container k6 v\xe0o th\u01b0 m\u1ee5c ",(0,r.kt)("inlineCode",{parentName:"p"},"/scripts")," \u0111\u1ec3 k6 c\xf3 th\u1ec3 truy c\u1eadp v\xe0 ch\u1ea1y c\xe1c k\u1ecbch b\u1ea3n test \u0111\u01b0\u1ee3c l\u01b0u trong th\u01b0 m\u1ee5c n\xe0y. Ngo\xe0i ra, c\u1ea5u h\xecnh cho k6 ghi k\u1ebft qu\u1ea3 load test sang InfluxDB th\xf4ng qua \u0111\u1ecba ch\u1ec9 ",(0,r.kt)("inlineCode",{parentName:"p"},"http://influxdb:8086/k6"),". \u0110\u1ecba ch\u1ec9 n\xe0y bao g\u1ed3m:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"influxdb: T\xean container InfluxDB \u0111\u01b0\u1ee3c khai b\xe1o trong "),"docker-compose.yml`."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"8086"),": C\u1ed5ng InfluxDB m\u1eb7c \u0111\u1ecbnh."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"k6"),": T\xean bucket \u0111\u01b0\u1ee3c t\u1ea1o trong InfluxDB \u0111\u1ec3 l\u01b0u tr\u1eef d\u1eef li\u1ec7u t\u1eeb k6.")),(0,r.kt)("p",null,"C\u1ea5u tr\xfac th\u01b0 m\u1ee5c s\u1ebd nh\u01b0 sau:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"\u251c\u2500\u2500 dashboards\n\u2502   \u2514\u2500\u2500 k6-load-testing-results.json\n\u251c\u2500\u2500 docker-compose.yml\n\u251c\u2500\u2500 grafana-dashboard.yaml\n\u251c\u2500\u2500 grafana-datasource.yaml\n\u2514\u2500\u2500 scripts\n    \u2514\u2500\u2500 script.js\n")),(0,r.kt)("h4",{id:"4-t\u1ea1o-file-k6-load-testing-resultsjson"},"4. T\u1ea1o file k6-load-testing-results.json"),(0,r.kt)("p",null,"Trong th\u01b0 m\u1ee5c ",(0,r.kt)("inlineCode",{parentName:"p"},"dashboards"),", h\xe3y t\u1ea3i file ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/grafana/dashboards/2587"},"k6-load-testing-results.json")," v\u1ec1 v\xe0 \u0111\u1ed5i t\xean th\xe0nh ",(0,r.kt)("inlineCode",{parentName:"p"},"k6-load-testing-results.json"),". \u0110\xe2y l\xe0 file m\u1eabu dashboard \u0111\u01b0\u1ee3c cung c\u1ea5p s\u1eb5n b\u1edfi Grafana \u0111\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test t\u1eeb k6."),(0,r.kt)("h4",{id:"5-kh\u1edfi-ch\u1ea1y-docker-compose"},"5. Kh\u1edfi ch\u1ea1y Docker Compose"),(0,r.kt)("p",null,"\u0110\u1ec3 kh\u1edfi ch\u1ea1y docker compose, h\xe3y ch\u1ea1y l\u1ec7nh sau:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker-compose up -d influxdb grafana\n")),(0,r.kt)("p",null,"\u0110\xe2y l\xe0 l\u1ec7nh kh\u1edfi ch\u1ea1y Docker Compose \u0111\u1ec3 ch\u1ea1y c\xe1c container InfluxDB v\xe0 Grafana trong n\u1ec1n. N\u1ebfu kh\u1edfi ch\u1ea1y th\xe0nh c\xf4ng, m\xe0n h\xecnh console s\u1ebd hi\u1ec3n th\u1ecb t\u01b0\u01a1ng t\u1ef1 nh\u01b0 sau:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker-compose up -d influxdb grafana\n[+] Running 4/4\n \u2714 Network perfomance_grafana       Created                                                0.1s \n \u2714 Network perfomance_k6            Created                                                0.1s \n \u2714 Container perfomance-influxdb-1  Started                                                2.4s \n \u2714 Container perfomance-grafana-1   Started                                                2.4s \n")),(0,r.kt)("p",null,"Sau khi ch\u1ea1y l\u1ec7nh n\xe0y, b\u1ea1n c\xf3 th\u1ec3 truy c\u1eadp v\xe0o InfluxDB tr\xean \u0111\u1ecba ch\u1ec9 ",(0,r.kt)("a",{parentName:"p",href:"http://localhost:8086"},"http://localhost:8086")," v\xe0 Grafana tr\xean \u0111\u1ecba ch\u1ec9 ",(0,r.kt)("a",{parentName:"p",href:"http://localhost:3000"},"http://localhost:3000"),". L\u01b0u \xfd r\u1eb1ng, c\xe1c porrt 8086 v\xe0 3000 \u0111\xe3 \u0111\u01b0\u1ee3c map t\u1eeb Docker container ra ngo\xe0i m\xe1y ch\u1ee7 \u0111\u1ec3 truy c\u1eadp."),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/img/docs/k6/grafana.webp",loading:"lazy",decoding:"async"})),(0,r.kt)("h2",{id:"t\u1ea1o-k\u1ecbch-b\u1ea3n-test"},"T\u1ea1o k\u1ecbch b\u1ea3n test"),(0,r.kt)("p",null,"\u1ede b\u01b0\u1edbc n\xe0y, ch\xfang ta s\u1ebd t\u1ea1o m\u1ed9t k\u1ecbch b\u1ea3n test API \u0111\u01a1n gi\u1ea3n. Trong th\u01b0 m\u1ee5c ",(0,r.kt)("inlineCode",{parentName:"p"},"scripts"),", h\xe3y t\u1ea1o file ",(0,r.kt)("inlineCode",{parentName:"p"},"script.js")," v\u1edbi n\u1ed9i dung sau:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import http from 'k6/http';\nimport { sleep } from 'k6';\n\nexport let options = {\n  stages: [\n    { duration: '30s', target: 20 },\n    { duration: '1m30s', target: 10 },\n    { duration: '20s', target: 0 },\n  ],\n};\n\nexport default function () {\n  http.get('https://test.k6.io');\n  sleep(1);\n}\n")),(0,r.kt)("p",null,"N\u1ebfu \u0111\u1ec3 \xfd, b\u1ea1n s\u1ebd th\u1ea5y \u0111o\u1ea1n script n\xe0y ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u trong ",(0,r.kt)("a",{parentName:"p",href:"/docs/k6/load-testing-restful-apis-with-k6-part-03"},"part 3")," c\u1ee7a lo\u1ea1t b\xe0i h\u01b0\u1edbng d\u1eabn n\xe0y."),(0,r.kt)("h2",{id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test-v\xe0-tr\u1ef1c-quan-h\xf3a-k\u1ebft-qu\u1ea3"},"Ch\u1ea1y k\u1ecbch b\u1ea3n test v\xe0 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3"),(0,r.kt)("h3",{id:"ch\u1ea1y-k\u1ecbch-b\u1ea3n-test"},"Ch\u1ea1y k\u1ecbch b\u1ea3n test"),(0,r.kt)("p",null,"\u0110\u1ec3 ch\u1ea1y k\u1ecbch b\u1ea3n test, h\xe3y ch\u1ea1y l\u1ec7nh sau:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker-compose run k6 run /scripts/script.js\n")),(0,r.kt)("p",null,"Trong l\u1ea7n ch\u1ea1y \u0111\u1ea7u ti\xean, k6 s\u1ebd t\u1ea3i image ",(0,r.kt)("inlineCode",{parentName:"p"},"grafana/k6:latest")," v\u1ec1 m\xe1y n\u1ebfu ch\u01b0a c\xf3 v\xe0 ch\u1ea1y k\u1ecbch b\u1ea3n test."),(0,r.kt)("h3",{id:"tr\u1ef1c-quan-h\xf3a-k\u1ebft-qu\u1ea3"},"Tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3"),(0,r.kt)("p",null,"\u0110\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3, h\xe3y truy c\u1eadp v\xe0o Grafana Dashboard theo link sau: ",(0,r.kt)("a",{parentName:"p",href:"http://localhost:3000/d/k6/k6-load-testing-results"},"http://localhost:3000/d/k6/k6-load-testing-results"),"."),(0,r.kt)("p",null,"K\u1ebft qu\u1ea3 s\u1ebd hi\u1ec3n th\u1ecb t\u01b0\u01a1ng t\u1ef1 nh\u01b0 sau:"),(0,r.kt)("p",{align:"center"},(0,r.kt)("img",{src:"/img/docs/k6/grafana-dashboard.webp",loading:"lazy",decoding:"async"})),(0,r.kt)("p",null,"Nh\u01b0 v\u1eady, ch\xfang ta \u0111\xe3 c\xf3 th\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test t\u1eeb k6 tr\xean Grafana. T\u1eeb \u0111\xe2y, ch\xfang ta c\xf3 th\u1ec3 ph\xe2n t\xedch k\u1ebft qu\u1ea3 v\xe0 t\u1ed1i \u01b0u h\xf3a hi\u1ec7u n\u0103ng \u1ee9ng d\u1ee5ng m\u1ed9t c\xe1ch tr\u1ef1c quan h\u01a1n."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"To\xe0n b\u1ed9 ",(0,r.kt)("strong",{parentName:"p"},"source code")," c\u1ee7a b\xe0i vi\u1ebft n\xe0y c\xf3 th\u1ec3 t\xecm th\u1ea5y t\u1ea1i ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/TienNHM/k6-load-testing-results-visualization-with-grafana"},"\u0111\xe2y"),". B\u1ea1n c\xf3 th\u1ec3 clone v\u1ec1 v\xe0 th\u1ef1c h\xe0nh theo h\u01b0\u1edbng d\u1eabn trong b\xe0i vi\u1ebft."),(0,r.kt)("p",{parentName:"admonition"},"H\xe3y g\u1eafn cho m\xecnh m\u1ed9t ng\xf4i sao tr\xean Github repo n\u1ebfu b\u1ea1n th\u1ea5y b\xe0i vi\u1ebft n\xe0y h\u1eefu \xedch nh\xe9!")),(0,r.kt)("h2",{id:"l\u1eddi-k\u1ebft"},"L\u1eddi k\u1ebft"),(0,r.kt)("p",null,"B\xe0i vi\u1ebft n\xe0y \u0111\xe3 h\u01b0\u1edbng d\u1eabn c\xe1c b\u01b0\u1edbc c\xe0i \u0111\u1eb7t v\xe0 c\u1ea5u h\xecnh Grafana c\xf9ng InfluxDB \u0111\u1ec3 tr\u1ef1c quan h\xf3a k\u1ebft qu\u1ea3 load test t\u1eeb k6. Vi\u1ec7c k\u1ebft h\u1ee3p c\xe1c c\xf4ng c\u1ee5 n\xe0y gi\xfap ng\u01b0\u1eddi d\xf9ng c\xf3 th\u1ec3 theo d\xf5i v\xe0 ph\xe2n t\xedch k\u1ebft qu\u1ea3 test m\u1ed9t c\xe1ch tr\u1ef1c quan h\u01a1n, d\u1ec5 d\xe0ng nh\u1eadn ra c\xe1c v\u1ea5n \u0111\u1ec1 v\u1ec1 hi\u1ec7u n\u0103ng c\u1ee7a \u1ee9ng d\u1ee5ng khi ch\u1ecbu t\u1ea3i cao."),(0,r.kt)("p",null,"Trong c\xe1c b\xe0i ti\u1ebfp theo, t\xf4i s\u1ebd h\u01b0\u1edbng d\u1eabn c\xe1c b\u1ea1n vi\u1ebft c\xe1c k\u1ecbch b\u1ea3n load test ph\u1ee9c t\u1ea1p h\u01a1n v\xe0 ph\xe2n t\xedch k\u1ebft qu\u1ea3 t\u1eeb Grafana \u0111\u1ec3 t\u1ed1i \u01b0u h\xf3a hi\u1ec7u n\u0103ng \u1ee9ng d\u1ee5ng."))}p.isMDXComponent=!0}}]);