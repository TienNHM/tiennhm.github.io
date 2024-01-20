"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[2329],{3905:(t,n,e)=>{e.d(n,{Zo:()=>r,kt:()=>d});var a=e(67294);function i(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function p(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,a)}return e}function l(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?p(Object(e),!0).forEach((function(n){i(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):p(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function o(t,n){if(null==t)return{};var e,a,i=function(t,n){if(null==t)return{};var e,a,i={},p=Object.keys(t);for(a=0;a<p.length;a++)e=p[a],n.indexOf(e)>=0||(i[e]=t[e]);return i}(t,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(t);for(a=0;a<p.length;a++)e=p[a],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(i[e]=t[e])}return i}var c=a.createContext({}),h=function(t){var n=a.useContext(c),e=n;return t&&(e="function"==typeof t?t(n):l(l({},n),t)),e},r=function(t){var n=h(t.components);return a.createElement(c.Provider,{value:n},t.children)},s="mdxType",g={inlineCode:"code",wrapper:function(t){var n=t.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(t,n){var e=t.components,i=t.mdxType,p=t.originalType,c=t.parentName,r=o(t,["components","mdxType","originalType","parentName"]),s=h(e),m=i,d=s["".concat(c,".").concat(m)]||s[m]||g[m]||p;return e?a.createElement(d,l(l({ref:n},r),{},{components:e})):a.createElement(d,l({ref:n},r))}));function d(t,n){var e=arguments,i=n&&n.mdxType;if("string"==typeof t||i){var p=e.length,l=new Array(p);l[0]=m;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=t,o[s]="string"==typeof t?t:i,l[1]=o;for(var h=2;h<p;h++)l[h]=e[h];return a.createElement.apply(null,l)}return a.createElement.apply(null,e)}m.displayName="MDXCreateElement"},5091:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>g,frontMatter:()=>p,metadata:()=>o,toc:()=>h});var a=e(87462),i=(e(67294),e(3905));const p={slug:"install-zeppelin-on-windows",title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t Apache Zeppelin tr\xean Windows",authors:["tiennhm"],tags:["apache","zeppelin","installation","tutorial","windows"],enableComments:!0,draft:!1,image:"./images/zeppelin-spark.png"},l=void 0,o={permalink:"/blog/install-zeppelin-on-windows",editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/blog/2024/2024-01-15-install-zeppelin/index.md",source:"@site/blog/2024/2024-01-15-install-zeppelin/index.md",title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t Apache Zeppelin tr\xean Windows",description:"Apache Zeppelin l\xe0 m\u1ed9t c\xf4ng c\u1ee5 ph\xe2n t\xedch d\u1eef li\u1ec7u m\xe3 ngu\u1ed3n m\u1edf, \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 th\u1ef1c hi\u1ec7n c\xe1c nhi\u1ec7m v\u1ee5 ph\xe2n t\xedch d\u1eef li\u1ec7u t\u01b0\u01a1ng t\xe1c v\xe0 tr\u1ef1c quan. N\xf3 cung c\u1ea5p m\u1ed9t giao di\u1ec7n ng\u01b0\u1eddi d\xf9ng web \u0111\u1ec3 ph\xe2n t\xedch d\u1eef li\u1ec7u b\u1eb1ng nhi\u1ec1u ng\xf4n ng\u1eef l\u1eadp tr\xecnh kh\xe1c nhau nh\u01b0 Scala, Python, SQL, SparkSQL, Hive, Markdown, Shell, v.v. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd c\xf9ng nhau t\xecm hi\u1ec3u c\xe1ch c\xe0i \u0111\u1eb7t Apache Zeppelin tr\xean Windows.",date:"2024-01-15T00:00:00.000Z",formattedDate:"15 th\xe1ng 1, 2024",tags:[{label:"apache",permalink:"/blog/tags/apache"},{label:"zeppelin",permalink:"/blog/tags/zeppelin"},{label:"installation",permalink:"/blog/tags/installation"},{label:"tutorial",permalink:"/blog/tags/tutorial"},{label:"windows",permalink:"/blog/tags/windows"}],readingTime:4.11,hasTruncateMarker:!0,authors:[{name:"Nguy\u1ec5n Hu\u1ef3nh Minh Ti\u1ebfn",title:"Fullstack Developer @ Utop.io",url:"https://github.com/TienNHM",imageURL:"https://github.com/TienNHM.png",key:"tiennhm"}],frontMatter:{slug:"install-zeppelin-on-windows",title:"H\u01b0\u1edbng d\u1eabn c\xe0i \u0111\u1eb7t Apache Zeppelin tr\xean Windows",authors:["tiennhm"],tags:["apache","zeppelin","installation","tutorial","windows"],enableComments:!0,draft:!1,image:"./images/zeppelin-spark.png"},prevItem:{title:"Bi\u1ec3u di\u1ec5n s\u1ed1 nguy\xean d\u01b0\u01a1ng trong c\xe1c h\u1ec7 s\u1ed1",permalink:"/blog/unsigned-integer-representation"},nextItem:{title:"Nh\u1eefng t\xe0i kho\u1ea3n Linkedin m\xe0 b\u1ea5t c\u1ee9 l\u1eadp tr\xecnh vi\xean n\xe0o c\u0169ng n\xean theo d\xf5i",permalink:"/blog/top-linked-accounts-to-follow-for-developers"}},c={image:e(78555).Z,authorsImageUrls:[void 0]},h=[{value:"1. C\xe0i \u0111\u1eb7t Java",id:"1-c\xe0i-\u0111\u1eb7t-java",level:2},{value:"2. C\xe0i \u0111\u1eb7t Apache Zeppelin - Version 0.8.2",id:"2-c\xe0i-\u0111\u1eb7t-apache-zeppelin---version-082",level:2},{value:"3. C\xe0i \u0111\u1eb7t Python3 - Version 3.12.1",id:"3-c\xe0i-\u0111\u1eb7t-python3---version-3121",level:2},{value:"4. T\u1ea1o m\xf4i tr\u01b0\u1eddng \u1ea3o Python3 cho Apache Zeppelin",id:"4-t\u1ea1o-m\xf4i-tr\u01b0\u1eddng-\u1ea3o-python3-cho-apache-zeppelin",level:2},{value:"5. C\xe0i \u0111\u1eb7t c\xe1c th\u01b0 vi\u1ec7n Python3 c\u1ea7n thi\u1ebft",id:"5-c\xe0i-\u0111\u1eb7t-c\xe1c-th\u01b0-vi\u1ec7n-python3-c\u1ea7n-thi\u1ebft",level:2},{value:"6. S\u1eeda m\u1ed9t s\u1ed1 t\u1eadp tin li\xean quan",id:"6-s\u1eeda-m\u1ed9t-s\u1ed1-t\u1eadp-tin-li\xean-quan",level:2},{value:"7. Thay th\u1ebf m\u1ed9t s\u1ed1 t\u1eadp tin",id:"7-thay-th\u1ebf-m\u1ed9t-s\u1ed1-t\u1eadp-tin",level:2},{value:"8. Ch\u1ea1y Apache Zeppelin",id:"8-ch\u1ea1y-apache-zeppelin",level:2},{value:"T\u1ed5ng k\u1ebft",id:"t\u1ed5ng-k\u1ebft",level:2}],r={toc:h},s="wrapper";function g(t){let{components:n,...p}=t;return(0,i.kt)(s,(0,a.Z)({},r,p,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",{align:"right"},(0,i.kt)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Finstall-zeppelin-on-windows&label=\u26aaViews&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})),(0,i.kt)("p",null,"Apache Zeppelin l\xe0 m\u1ed9t c\xf4ng c\u1ee5 ph\xe2n t\xedch d\u1eef li\u1ec7u m\xe3 ngu\u1ed3n m\u1edf, \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 th\u1ef1c hi\u1ec7n c\xe1c nhi\u1ec7m v\u1ee5 ph\xe2n t\xedch d\u1eef li\u1ec7u t\u01b0\u01a1ng t\xe1c v\xe0 tr\u1ef1c quan. N\xf3 cung c\u1ea5p m\u1ed9t giao di\u1ec7n ng\u01b0\u1eddi d\xf9ng web \u0111\u1ec3 ph\xe2n t\xedch d\u1eef li\u1ec7u b\u1eb1ng nhi\u1ec1u ng\xf4n ng\u1eef l\u1eadp tr\xecnh kh\xe1c nhau nh\u01b0 Scala, Python, SQL, SparkSQL, Hive, Markdown, Shell, v.v. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd c\xf9ng nhau t\xecm hi\u1ec3u c\xe1ch c\xe0i \u0111\u1eb7t Apache Zeppelin tr\xean Windows."),(0,i.kt)("h2",{id:"1-c\xe0i-\u0111\u1eb7t-java"},"1. C\xe0i \u0111\u1eb7t Java"),(0,i.kt)("p",null,"\u0110\u1ec3 c\xe0i \u0111\u1eb7t Apache Zeppelin, ch\xfang ta c\u1ea7n c\xe0i \u0111\u1eb7t Java tr\u01b0\u1edbc. C\xf3 th\u1ec3 t\u1ea3i Java t\u1eeb trang ch\u1ee7 c\u1ee7a Oracle t\u1ea1i \u0111\u1ecba ch\u1ec9 ",(0,i.kt)("a",{parentName:"p",href:"https://www.oracle.com/java/technologies/javase-downloads.html"},"https://www.oracle.com/java/technologies/javase-downloads.html"),". Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng Java 8."),(0,i.kt)("admonition",{title:"Link t\u1ea3i tr\u1ef1c ti\u1ebfp",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{parentName:"p",href:"https://javadl.oracle.com/webapps/download/GetFile/1.8.0_331-b09/165374ff4ea84ef0bbd821706e29b123/windows-i586/jre-8u331-windows-x64.exe"},"https://javadl.oracle.com/webapps/download/GetFile/1.8.0_331-b09/165374ff4ea84ef0bbd821706e29b123/windows-i586/jre-8u331-windows-x64.exe"))),(0,i.kt)("p",null,"Sau khi t\u1ea3i v\u1ec1, ch\xfang ta ti\u1ebfn h\xe0nh c\xe0i \u0111\u1eb7t Java b\xecnh th\u01b0\u1eddng."),(0,i.kt)("h2",{id:"2-c\xe0i-\u0111\u1eb7t-apache-zeppelin---version-082"},"2. C\xe0i \u0111\u1eb7t Apache Zeppelin - Version 0.8.2"),(0,i.kt)("p",null,"Sau khi c\xe0i \u0111\u1eb7t Java xong, ch\xfang ta ti\u1ebfn h\xe0nh t\u1ea3i Apache Zeppelin v\u1ec1 t\u1eeb trang ch\u1ee7 c\u1ee7a Apache Zeppelin t\u1ea1i \u0111\u1ecba ch\u1ec9 ",(0,i.kt)("a",{parentName:"p",href:"https://zeppelin.apache.org/download.html"},"https://zeppelin.apache.org/download.html"),". Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng Apache Zeppelin phi\xean b\u1ea3n 0.8.2."),(0,i.kt)("admonition",{title:"Link t\u1ea3i tr\u1ef1c ti\u1ebfp",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{parentName:"p",href:"https://dlcdn.apache.org/zeppelin/zeppelin-0.8.2/zeppelin-0.8.2-bin-all.tgz"},"https://dlcdn.apache.org/zeppelin/zeppelin-0.8.2/zeppelin-0.8.2-bin-all.tgz"))),(0,i.kt)("p",null,"B\u1ea1n h\xe3y t\u1ea3i file ",(0,i.kt)("inlineCode",{parentName:"p"},"zeppelin-0.8.2-bin-all.tgz")," v\u1ec1 v\xe0 gi\u1ea3i n\xe9n ra m\u1ed9t th\u01b0 m\u1ee5c b\u1ea5t k\u1ef3. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd gi\u1ea3i n\xe9n v\xe0o th\u01b0 m\u1ee5c ",(0,i.kt)("inlineCode",{parentName:"p"},"D:\\Programs\\zeppelin-0.8.2-bin-all"),"."),(0,i.kt)("p",null,"B\u1ea1n c\xf3 th\u1ec3 s\u1eed d\u1ee5ng ph\u1ea7n m\u1ec1m ",(0,i.kt)("a",{parentName:"p",href:"https://www.7-zip.org/"},"7-Zip")," ho\u1eb7c ",(0,i.kt)("a",{parentName:"p",href:"https://www.win-rar.com/"},"WinRAR")," \u0111\u1ec3 gi\u1ea3i n\xe9n file ",(0,i.kt)("inlineCode",{parentName:"p"},"zeppelin-0.8.2-bin-all.tgz"),"."),(0,i.kt)("h2",{id:"3-c\xe0i-\u0111\u1eb7t-python3---version-3121"},"3. C\xe0i \u0111\u1eb7t Python3 - Version 3.12.1"),(0,i.kt)("p",null,"Apache Zeppelin h\u1ed7 tr\u1ee3 nhi\u1ec1u ng\xf4n ng\u1eef l\u1eadp tr\xecnh kh\xe1c nhau. Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng Python3. B\u1ea1n c\xf3 th\u1ec3 t\u1ea3i Python3 t\u1eeb trang ch\u1ee7 c\u1ee7a Python t\u1ea1i \u0111\u1ecba ch\u1ec9 ",(0,i.kt)("a",{parentName:"p",href:"https://www.python.org/downloads/"},"https://www.python.org/downloads/"),". Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta s\u1ebd s\u1eed d\u1ee5ng Python3 phi\xean b\u1ea3n 3.12.1."),(0,i.kt)("admonition",{title:"Link t\u1ea3i tr\u1ef1c ti\u1ebfp",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},(0,i.kt)("a",{parentName:"p",href:"https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe"},"https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe"))),(0,i.kt)("p",null,"L\u01b0u \xfd khi c\xe0i \u0111\u1eb7t Python3, b\u1ea1n ch\u1ecdn ch\u1ebf \u0111\u1ed9 c\xe0i \u0111\u1eb7t ",(0,i.kt)("inlineCode",{parentName:"p"},"Customize installation")," v\xe0 ch\u1ecdn ",(0,i.kt)("inlineCode",{parentName:"p"},"Add Python 3.12 to PATH")," nh\u01b0 h\xecnh d\u01b0\u1edbi \u0111\xe2y:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Install Python - 01",src:e(20293).Z,width:"817",height:"502"})),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Install Python - 02",src:e(48422).Z,width:"800",height:"494"})),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Install Python - 03",src:e(85906).Z,width:"801",height:"497"})),(0,i.kt)("h2",{id:"4-t\u1ea1o-m\xf4i-tr\u01b0\u1eddng-\u1ea3o-python3-cho-apache-zeppelin"},"4. T\u1ea1o m\xf4i tr\u01b0\u1eddng \u1ea3o Python3 cho Apache Zeppelin"),(0,i.kt)("p",null,"Sau khi c\xe0i \u0111\u1eb7t Python3 xong, ch\xfang ta ti\u1ebfn h\xe0nh t\u1ea1o m\u1ed9t m\xf4i tr\u01b0\u1eddng \u1ea3o Python3 cho Apache Zeppelin. \u0110\u1ec3 t\u1ea1o m\xf4i tr\u01b0\u1eddng \u1ea3o Python3, ch\xfang ta s\u1eed d\u1ee5ng c\xf4ng c\u1ee5 ",(0,i.kt)("inlineCode",{parentName:"p"},"venv")," c\u1ee7a Python3."),(0,i.kt)("p",null,"\u0110\u1ea7u ti\xean, ch\xfang ta m\u1edf Command Prompt (ho\u1eb7c Windows PowerShell) l\xean v\xe0 ch\u1ea1y l\u1ea7n l\u01b0\u1ee3t c\xe1c l\u1ec7nh sau:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd D:\\Programs\\zeppelin-0.8.2-bin-all\nmkdir python\\venv\npython -m venv python\\venv\npython\\venv\\Scripts\\activate.bat\n")),(0,i.kt)("p",null,"Sau \u0111\xf3, chuy\u1ec3n t\u1edbi th\u01b0 m\u1ee5c ",(0,i.kt)("inlineCode",{parentName:"p"},"D:\\Programs\\zeppelin-0.8.2-bin-all\\python\\venv\\Scripts")," v\xe0 ch\u1ea1y l\u1ec7nh sau \u0111\u1ec3 active m\xf4i tr\u01b0\u1eddng \u1ea3o Python3:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"activate.bat\n")),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Create Python Virtual Environment",src:e(96437).Z,width:"1186",height:"418"})),(0,i.kt)("h2",{id:"5-c\xe0i-\u0111\u1eb7t-c\xe1c-th\u01b0-vi\u1ec7n-python3-c\u1ea7n-thi\u1ebft"},"5. C\xe0i \u0111\u1eb7t c\xe1c th\u01b0 vi\u1ec7n Python3 c\u1ea7n thi\u1ebft"),(0,i.kt)("p",null,"Sau khi active m\xf4i tr\u01b0\u1eddng \u1ea3o Python3, ch\xfang ta ti\u1ebfn h\xe0nh c\xe0i \u0111\u1eb7t c\xe1c th\u01b0 vi\u1ec7n Python3 c\u1ea7n thi\u1ebft cho Apache Zeppelin. \u0110\u1ec3 c\xe0i \u0111\u1eb7t c\xe1c th\u01b0 vi\u1ec7n Python3 c\u1ea7n thi\u1ebft, ch\xfang ta s\u1eed d\u1ee5ng c\xf4ng c\u1ee5 ",(0,i.kt)("inlineCode",{parentName:"p"},"pip")," c\u1ee7a Python3."),(0,i.kt)("p",null,"C\xe1c b\u1ea1n ti\u1ebfp t\u1ee5c ch\u1ea1y l\u1ea7n l\u01b0\u1ee3t c\xe1c l\u1ec7nh sau:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"pip install py4j==0.10.4\npip install pypandoc==1.5\npip install pyspark==2.2.1\n")),(0,i.kt)("h2",{id:"6-s\u1eeda-m\u1ed9t-s\u1ed1-t\u1eadp-tin-li\xean-quan"},"6. S\u1eeda m\u1ed9t s\u1ed1 t\u1eadp tin li\xean quan"),(0,i.kt)("p",null,"Sau khi c\xe0i \u0111\u1eb7t c\xe1c th\u01b0 vi\u1ec7n Python3 c\u1ea7n thi\u1ebft, ch\xfang ta ti\u1ebfn h\xe0nh s\u1eeda file ",(0,i.kt)("inlineCode",{parentName:"p"},"zeppelin-env.cmd")," v\xe0 ",(0,i.kt)("inlineCode",{parentName:"p"},"common.cmd")," \u0111\u1ec3 Apache Zeppelin c\xf3 th\u1ec3 s\u1eed d\u1ee5ng \u0111\u01b0\u1ee3c Python3."),(0,i.kt)("p",null,"Chuy\u1ec3n t\u1edbi th\u01b0 m\u1ee5c ",(0,i.kt)("inlineCode",{parentName:"p"},"D:\\Programs\\zeppelin-0.8.2-bin-all\\bin"),", l\u1ea7n l\u01b0\u1ee3t m\u1edf file ",(0,i.kt)("inlineCode",{parentName:"p"},"zeppelin-env.cmd")," v\xe0 ",(0,i.kt)("inlineCode",{parentName:"p"},"common.cmd")," l\xean v\xe0 th\xeam v\xe0o ngay sau d\xf2ng b\u1eaft \u0111\u1ea7u b\u1eb1ng ",(0,i.kt)("inlineCode",{parentName:"p"},"REM")," cu\u1ed1i c\xf9ng:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"\nset PATH=C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;D:\\Programs\\zeppelin-0.8.2-bin-all\\python\\venv\\Scripts;\n\n")),(0,i.kt)("p",null,"L\u01b0u \xfd: \u0110\u01b0\u1eddng d\u1eabn ",(0,i.kt)("inlineCode",{parentName:"p"},"D:\\Programs\\zeppelin-0.8.2-bin-all\\python\\venv\\Scripts")," l\xe0 \u0111\u01b0\u1eddng d\u1eabn t\u1edbi th\u01b0 m\u1ee5c ",(0,i.kt)("inlineCode",{parentName:"p"},"Scripts")," c\u1ee7a m\xf4i tr\u01b0\u1eddng \u1ea3o Python3 m\xe0 ch\xfang ta \u0111\xe3 t\u1ea1o \u1edf b\u01b0\u1edbc 4. N\u1ebfu b\u1ea1n t\u1ea1o m\xf4i tr\u01b0\u1eddng \u1ea3o Python3 \u1edf m\u1ed9t th\u01b0 m\u1ee5c kh\xe1c, b\u1ea1n h\xe3y thay \u0111\u1ed5i \u0111\u01b0\u1eddng d\u1eabn t\u01b0\u01a1ng \u1ee9ng."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Edit zeppelin-env.cmd",src:e(61879).Z,width:"1228",height:"408"})),(0,i.kt)("h2",{id:"7-thay-th\u1ebf-m\u1ed9t-s\u1ed1-t\u1eadp-tin"},"7. Thay th\u1ebf m\u1ed9t s\u1ed1 t\u1eadp tin"),(0,i.kt)("p",null,"T\u1ea3i c\xe1c file patches t\u1ea1i ",(0,i.kt)("a",{parentName:"p",href:"https://cloud.cntt.io/s/G69GLQ9MKwWpAZy"},"https://cloud.cntt.io/s/G69GLQ9MKwWpAZy"),". L\u1ea7n l\u01b0\u1ee3t thay th\u1ebf nh\u01b0 sau:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"spark-interpreter-0.8.2.jar",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"D:\\Programs\\zeppelin-0.8.2-bin-all\\interpreter\\spark\\spark-interpreter-0.8.2.jar"))),(0,i.kt)("li",{parentName:"ul"},"py4j-0.10.4-src.zip",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"D:\\Programs\\zeppelin-0.8.2-bin-all\\interpreter\\spark\\pyspark\\py4j-0.10.4-src.zip"))),(0,i.kt)("li",{parentName:"ul"},"spark.zip ",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"D:\\Programs\\zeppelin-0.8.2-bin-all\\interpreter\\spark\\pyspark\\spark.zip"))),(0,i.kt)("li",{parentName:"ul"},"resultiterable.py ",(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"D:\\Programs\\zeppelin-0.8.2-bin-all\\python\\venv\\Lib\\site-packages\\pyspark\\resultiterable.py")))),(0,i.kt)("h2",{id:"8-ch\u1ea1y-apache-zeppelin"},"8. Ch\u1ea1y Apache Zeppelin"),(0,i.kt)("p",null,"Sau khi th\u1ef1c hi\u1ec7n xong c\xe1c b\u01b0\u1edbc tr\xean, ch\xfang ta ti\u1ebfn h\xe0nh ch\u1ea1y Apache Zeppelin. \u0110\u1ec3 ch\u1ea1y Apache Zeppelin, ch\xfang ta chuy\u1ec3n t\u1edbi th\u01b0 m\u1ee5c ",(0,i.kt)("inlineCode",{parentName:"p"},"D:\\Programs\\zeppelin-0.8.2-bin-all\\bin"),", m\u1edf Command Prompt (ho\u1eb7c Windows PowerShell) l\xean v\xe0 ch\u1ea1y l\u1ec7nh sau:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"zeppelin.cmd\n")),(0,i.kt)("p",null,"K\u1ebft qu\u1ea3 tr\xean Command Prompt (ho\u1eb7c Windows PowerShell) s\u1ebd nh\u01b0 sau:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Run Apache Zeppelin",src:e(32145).Z,width:"1920",height:"976"})),(0,i.kt)("p",null,"Sau khi ch\u1ea1y v\xe0 th\u1ea5y logs b\xe1o ",(0,i.kt)("inlineCode",{parentName:"p"},"Done, zeppelin server started"),", ch\xfang ta m\u1edf tr\xecnh duy\u1ec7t web l\xean v\xe0 truy c\u1eadp v\xe0o \u0111\u1ecba ch\u1ec9 ",(0,i.kt)("a",{parentName:"p",href:"http://localhost:8080"},"http://localhost:8080")," \u0111\u1ec3 s\u1eed d\u1ee5ng Apache Zeppelin."),(0,i.kt)("p",null,"M\xe0n h\xecnh trang ch\u1ee7 c\u1ee7a Apache Zeppelin s\u1ebd nh\u01b0 sau:\n",(0,i.kt)("img",{alt:"Apache Zeppelin Home Page",src:e(96944).Z,width:"1853",height:"870"})),(0,i.kt)("p",null,"Nh\u01b0 v\u1eady, ch\xfang ta \u0111\xe3 c\xe0i \u0111\u1eb7t th\xe0nh c\xf4ng Apache Zeppelin tr\xean Windows."),(0,i.kt)("h2",{id:"t\u1ed5ng-k\u1ebft"},"T\u1ed5ng k\u1ebft"),(0,i.kt)("p",null,"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta \u0111\xe3 c\xf9ng nhau t\xecm hi\u1ec3u c\xe1ch c\xe0i \u0111\u1eb7t Apache Zeppelin tr\xean Windows. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y s\u1ebd gi\xfap \xedch cho c\xe1c b\u1ea1n trong qu\xe1 tr\xecnh h\u1ecdc t\u1eadp v\xe0 l\xe0m vi\u1ec7c."))}g.isMDXComponent=!0},96437:(t,n,e)=>{e.d(n,{Z:()=>a});const a=e.p+"assets/images/create-python-virtual-environment-1073c7c5c5479491323def89f1b9ec8e.jpg"},61879:(t,n,e)=>{e.d(n,{Z:()=>a});const a=e.p+"assets/images/edit-zeppelin-env-cmd-69dc5102a7b5ec21e4187c28917977f7.jpg"},20293:(t,n,e)=>{e.d(n,{Z:()=>a});const a=e.p+"assets/images/install-python-01-0e5950efd6b70227055efe9d1f6a0209.jpg"},48422:(t,n,e)=>{e.d(n,{Z:()=>a});const a=e.p+"assets/images/install-python-02-7a750dcab48682a82ccf0eef8b0f8ec6.jpg"},85906:(t,n,e)=>{e.d(n,{Z:()=>a});const a=e.p+"assets/images/install-python-03-9e0ce095517daec055c4e8f42222d59b.jpg"},32145:(t,n,e)=>{e.d(n,{Z:()=>a});const a=e.p+"assets/images/run-apache-zeppelin-0823bb679ce2565b1ac47f9653f2bcc4.jpg"},96944:(t,n,e)=>{e.d(n,{Z:()=>a});const a=e.p+"assets/images/welcome-apache-zeppelin-77030c6c3121478da53354c180c10d07.jpg"},78555:(t,n,e)=>{e.d(n,{Z:()=>a});const a=e.p+"assets/images/zeppelin-spark-67253fbdf08c227c6ebd2e3e71a7c914.png"}}]);