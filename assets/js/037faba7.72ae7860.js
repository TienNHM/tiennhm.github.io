"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[9294],{36578:(n,e,c)=>{c.r(e),c.d(e,{assets:()=>d,contentTitle:()=>s,default:()=>o,frontMatter:()=>t,metadata:()=>r,toc:()=>h});var i=c(74848),l=c(28453);const t={slug:"character-sets-and-collations-in-mysql",title:"Character Sets - Collations v\xe0 v\u1ea5n \u0111\u1ec1 so s\xe1nh chu\u1ed7i trong MySQL",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c b\u1ea3ng m\xe3 v\xe0 c\xe1ch so s\xe1nh chu\u1ed7i trong MySQL, nh\u1eefng v\u1ea5n \u0111\u1ec1 c\u1ea7n l\u01b0u \xfd khi l\xe0m vi\u1ec7c v\u1edbi c\xe1c b\u1ea3ng m\xe3 kh\xe1c nhau.",image:"https://i.pinimg.com/originals/6e/4a/9a/6e4a9a1b7604e4f9b6a9f74f932834ad.png",authors:["tiennhm"],tags:["mysql","character-sets","collations","tips-and-tricks","database"],keywords:["mysql","character-sets","collations","tips-and-tricks","database"],enableComments:!0,draft:!1},s=void 0,r={permalink:"/blog/character-sets-and-collations-in-mysql",editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/blog/2024/2024-06-22-character-sets-and-collations-in-mysql/index.md",source:"@site/blog/2024/2024-06-22-character-sets-and-collations-in-mysql/index.md",title:"Character Sets - Collations v\xe0 v\u1ea5n \u0111\u1ec1 so s\xe1nh chu\u1ed7i trong MySQL",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c b\u1ea3ng m\xe3 v\xe0 c\xe1ch so s\xe1nh chu\u1ed7i trong MySQL, nh\u1eefng v\u1ea5n \u0111\u1ec1 c\u1ea7n l\u01b0u \xfd khi l\xe0m vi\u1ec7c v\u1edbi c\xe1c b\u1ea3ng m\xe3 kh\xe1c nhau.",date:"2024-06-22T00:00:00.000Z",tags:[{inline:!0,label:"mysql",permalink:"/blog/tags/mysql"},{inline:!0,label:"character-sets",permalink:"/blog/tags/character-sets"},{inline:!0,label:"collations",permalink:"/blog/tags/collations"},{inline:!0,label:"tips-and-tricks",permalink:"/blog/tags/tips-and-tricks"},{inline:!0,label:"database",permalink:"/blog/tags/database"}],readingTime:10.79,hasTruncateMarker:!0,authors:[{name:"Nguy\u1ec5n Hu\u1ef3nh Minh Ti\u1ebfn",title:"Fullstack Developer @ Utop.io",url:"https://github.com/TienNHM",imageURL:"https://github.com/TienNHM.png",key:"tiennhm"}],frontMatter:{slug:"character-sets-and-collations-in-mysql",title:"Character Sets - Collations v\xe0 v\u1ea5n \u0111\u1ec1 so s\xe1nh chu\u1ed7i trong MySQL",description:"Gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c b\u1ea3ng m\xe3 v\xe0 c\xe1ch so s\xe1nh chu\u1ed7i trong MySQL, nh\u1eefng v\u1ea5n \u0111\u1ec1 c\u1ea7n l\u01b0u \xfd khi l\xe0m vi\u1ec7c v\u1edbi c\xe1c b\u1ea3ng m\xe3 kh\xe1c nhau.",image:"https://i.pinimg.com/originals/6e/4a/9a/6e4a9a1b7604e4f9b6a9f74f932834ad.png",authors:["tiennhm"],tags:["mysql","character-sets","collations","tips-and-tricks","database"],keywords:["mysql","character-sets","collations","tips-and-tricks","database"],enableComments:!0,draft:!1},unlisted:!1,nextItem:{title:"C\xe1c lo\u1ea1i ki\u1ec3m th\u1eed API",permalink:"/blog/api-testing-types"}},d={authorsImageUrls:[void 0]},h=[{value:"1. B\u1ea3ng m\xe3 (Character Sets) trong MySQL",id:"character-sets",level:2},{value:"2. Th\u1ee9 t\u1ef1 k\xfd t\u1ef1 (Collations) trong MySQL",id:"collations",level:2},{value:"3. So s\xe1nh chu\u1ed7i trong MySQL",id:"string-comparison",level:2},{value:"4. Nh\u1eefng v\u1ea5n \u0111\u1ec1 c\u1ea7n l\u01b0u \xfd",id:"issues",level:2},{value:"4.1. M\u1ed9t s\u1ed1 v\xed d\u1ee5 s\u1eed d\u1ee5ng collation",id:"41-m\u1ed9t-s\u1ed1-v\xed-d\u1ee5-s\u1eed-d\u1ee5ng-collation",level:3},{value:"D\xf9ng v\u1edbi <code>ORDER BY</code> \u0111\u1ec3 s\u1eafp x\u1ebfp chu\u1ed7i theo collation kh\xe1c nhau",id:"collate-order-by",level:4},{value:"D\xf9ng v\u1edbi <code>AS</code> \u0111\u1ec3 \u0111\u1eb7t t\xean collation cho c\u1ed9t m\u1edbi",id:"collate-as",level:4},{value:"D\xf9ng v\u1edbi <code>GROUP BY</code> \u0111\u1ec3 nh\xf3m chu\u1ed7i theo collation kh\xe1c nhau",id:"collate-group-by",level:4},{value:"D\xf9ng v\u1edbi c\xe1c h\xe0m aggregation \u0111\u1ec3 t\xednh to\xe1n tr\xean chu\u1ed7i theo collation kh\xe1c nhau",id:"collate-aggregation",level:4},{value:"D\xf9ng v\u1edbi <code>DISTINCT</code> \u0111\u1ec3 lo\u1ea1i b\u1ecf c\xe1c gi\xe1 tr\u1ecb tr\xf9ng l\u1eb7p theo collation kh\xe1c nhau",id:"collate-distinct",level:4},{value:"D\xf9ng v\u1edbi <code>WHERE</code> \u0111\u1ec3 so s\xe1nh chu\u1ed7i theo collation kh\xe1c nhau",id:"collate-where",level:4},{value:"D\xf9ng v\u1edbi <code>HAVING</code> \u0111\u1ec3 l\u1ecdc k\u1ebft qu\u1ea3 theo collation kh\xe1c nhau",id:"collate-having",level:4},{value:"4.2. M\u1ee9c \u0111\u1ed9 \u01b0u ti\xean c\u1ee7a collation",id:"42-m\u1ee9c-\u0111\u1ed9-\u01b0u-ti\xean-c\u1ee7a-collation",level:3},{value:"4.3. \u0110\u1ed9 t\u01b0\u01a1ng th\xedch c\u1ee7a collation",id:"43-\u0111\u1ed9-t\u01b0\u01a1ng-th\xedch-c\u1ee7a-collation",level:3},{value:"5. K\u1ebft lu\u1eadn",id:"conclusion",level:2},{value:"Tham kh\u1ea3o",id:"references",level:2}];function a(n){const e={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("p",{align:"right",children:(0,i.jsx)("img",{src:"https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftiennhm.github.io%2Fblog%2Fcharacter-sets-and-collations-in-mysql&label=\u26aaView&labelColor=%2337d67a&countColor=%23555555&style=flat&labelStyle=upper",loading:"lazy",decoding:"async"})}),"\n",(0,i.jsx)(e.p,{children:"Trong th\u1ef1c t\u1ebf, khi l\xe0m vi\u1ec7c v\u1edbi c\u01a1 s\u1edf d\u1eef li\u1ec7u, b\u1ea1n th\u01b0\u1eddng ph\u1ea3i x\u1eed l\xfd c\xe1c chu\u1ed7i v\u0103n b\u1ea3n, v\xe0 vi\u1ec7c so s\xe1nh chu\u1ed7i \u0111\xf4i khi g\u1eb7p ph\u1ea3i m\u1ed9t s\u1ed1 v\u1ea5n \u0111\u1ec1. MySQL h\u1ed7 tr\u1ee3 nhi\u1ec1u b\u1ea3ng m\xe3 (Character Sets) v\xe0 th\u1ee9 t\u1ef1 k\xfd t\u1ef1 (Collations) kh\xe1c nhau, v\xe0 c\xe1ch so s\xe1nh chu\u1ed7i ph\u1ee5 thu\u1ed9c v\xe0o collation c\u1ee7a b\u1ea3ng m\xe3."}),"\n",(0,i.jsx)(e.p,{children:"B\xe0i vi\u1ebft n\xe0y gi\u1edbi thi\u1ec7u v\u1ec1 c\xe1c b\u1ea3ng m\xe3 v\xe0 c\xe1ch so s\xe1nh chu\u1ed7i trong MySQL, nh\u1eefng v\u1ea5n \u0111\u1ec1 c\u1ea7n l\u01b0u \xfd khi l\xe0m vi\u1ec7c v\u1edbi c\xe1c b\u1ea3ng m\xe3 kh\xe1c nhau."}),"\n",(0,i.jsx)(e.h2,{id:"character-sets",children:"1. B\u1ea3ng m\xe3 (Character Sets) trong MySQL"}),"\n",(0,i.jsx)(e.p,{children:"B\u1ea3ng m\xe3 (Character Sets) trong MySQL l\xe0 b\u1ed9 k\xfd t\u1ef1 \u0111\u1ea1i di\u1ec7n cho t\u1eadp h\u1ee3p c\xe1c k\xfd t\u1ef1 v\u1edbi m\xe3 h\xf3a duy nh\u1ea5t, x\xe1c \u0111\u1ecbnh nh\u1eefng k\xfd t\u1ef1 n\xe0o \u0111\u01b0\u1ee3c ph\xe9p trong m\u1ed9t c\u1ed9t ki\u1ec3u v\u0103n b\u1ea3n, bao g\u1ed3m ch\u1eef c\xe1i, s\u1ed1, k\xfd hi\u1ec7u v\xe0 k\xfd t\u1ef1 \u0111\u1eb7c bi\u1ec7t."}),"\n",(0,i.jsx)(e.p,{children:"B\u1ed9 k\xfd t\u1ef1 quy\u1ebft \u0111\u1ecbnh ph\u1ea1m vi c\xe1c k\xfd t\u1ef1 c\xf3 th\u1ec3 l\u01b0u tr\u1eef trong m\u1ed9t c\u1ed9t. MySQL h\u1ed7 tr\u1ee3 nhi\u1ec1u b\u1ea3ng m\xe3 kh\xe1c nhau, bao g\u1ed3m c\u1ea3 m\u1ed9t s\u1ed1 b\u1ed9 k\xfd t\u1ef1 Unicode. \u0110\u1ec3 li\u1ec7t k\xea t\u1ea5t c\u1ea3 c\xe1c b\u1ed9 k\xfd t\u1ef1 tr\xean m\xe1y ch\u1ee7 MySQL hi\u1ec7n t\u1ea1i, b\u1ea1n s\u1eed d\u1ee5ng c\xe2u l\u1ec7nh sau:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SHOW CHARACTER SET;\n"})}),"\n",(0,i.jsx)(e.p,{children:"K\u1ebft qu\u1ea3 tr\u1ea3 v\u1ec1 s\u1ebd bao g\u1ed3m t\xean b\u1ea3ng m\xe3, m\xf4 t\u1ea3 v\xe0 m\u1eb7c \u0111\u1ecbnh. V\xed d\u1ee5:"}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Charset"}),(0,i.jsx)(e.th,{children:"Description"}),(0,i.jsx)(e.th,{children:"Default collation"}),(0,i.jsx)(e.th,{style:{textAlign:"center"},children:"Maxlen"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"ascii"}),(0,i.jsx)(e.td,{children:"US ASCII"}),(0,i.jsx)(e.td,{children:"ascii_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"big5"}),(0,i.jsx)(e.td,{children:"Big5 Traditional Chinese"}),(0,i.jsx)(e.td,{children:"big5_chinese_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"binary"}),(0,i.jsx)(e.td,{children:"Binary pseudo charset"}),(0,i.jsx)(e.td,{children:"binary"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cp1250"}),(0,i.jsx)(e.td,{children:"Windows Central European"}),(0,i.jsx)(e.td,{children:"cp1250_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cp1251"}),(0,i.jsx)(e.td,{children:"Windows Cyrillic"}),(0,i.jsx)(e.td,{children:"cp1251_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cp1256"}),(0,i.jsx)(e.td,{children:"Windows Arabic"}),(0,i.jsx)(e.td,{children:"cp1256_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cp1257"}),(0,i.jsx)(e.td,{children:"Windows Baltic"}),(0,i.jsx)(e.td,{children:"cp1257_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cp850"}),(0,i.jsx)(e.td,{children:"DOS West European"}),(0,i.jsx)(e.td,{children:"cp850_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cp852"}),(0,i.jsx)(e.td,{children:"DOS Central European"}),(0,i.jsx)(e.td,{children:"cp852_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cp866"}),(0,i.jsx)(e.td,{children:"DOS Russian"}),(0,i.jsx)(e.td,{children:"cp866_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"cp932"}),(0,i.jsx)(e.td,{children:"SJIS for Windows Japanese"}),(0,i.jsx)(e.td,{children:"cp932_japanese_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"dec8"}),(0,i.jsx)(e.td,{children:"DEC West European"}),(0,i.jsx)(e.td,{children:"dec8_swedish_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"eucjpms"}),(0,i.jsx)(e.td,{children:"UJIS for Windows Japanese"}),(0,i.jsx)(e.td,{children:"eucjpms_japanese_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"3"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"euckr"}),(0,i.jsx)(e.td,{children:"EUC-KR Korean"}),(0,i.jsx)(e.td,{children:"euckr_korean_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"gb18030"}),(0,i.jsx)(e.td,{children:"China National Standard GB18030"}),(0,i.jsx)(e.td,{children:"gb18030_chinese_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"4"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"gb2312"}),(0,i.jsx)(e.td,{children:"GB2312 Simplified Chinese"}),(0,i.jsx)(e.td,{children:"gb2312_chinese_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"gbk"}),(0,i.jsx)(e.td,{children:"GBK Simplified Chinese"}),(0,i.jsx)(e.td,{children:"gbk_chinese_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"geostd8"}),(0,i.jsx)(e.td,{children:"GEOSTD8 Georgian"}),(0,i.jsx)(e.td,{children:"geostd8_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"greek"}),(0,i.jsx)(e.td,{children:"ISO 8859-7 Greek"}),(0,i.jsx)(e.td,{children:"greek_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"hebrew"}),(0,i.jsx)(e.td,{children:"ISO 8859-8 Hebrew"}),(0,i.jsx)(e.td,{children:"hebrew_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"hp8"}),(0,i.jsx)(e.td,{children:"HP West European"}),(0,i.jsx)(e.td,{children:"hp8_english_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"keybcs2"}),(0,i.jsx)(e.td,{children:"DOS Kamenicky Czech-Slovak"}),(0,i.jsx)(e.td,{children:"keybcs2_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"koi8r"}),(0,i.jsx)(e.td,{children:"KOI8-R Relcom Russian"}),(0,i.jsx)(e.td,{children:"koi8r_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"koi8u"}),(0,i.jsx)(e.td,{children:"KOI8-U Ukrainian"}),(0,i.jsx)(e.td,{children:"koi8u_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"latin1"}),(0,i.jsx)(e.td,{children:"cp1252 West European"}),(0,i.jsx)(e.td,{children:"latin1_swedish_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"latin2"}),(0,i.jsx)(e.td,{children:"ISO 8859-2 Central European"}),(0,i.jsx)(e.td,{children:"latin2_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"latin5"}),(0,i.jsx)(e.td,{children:"ISO 8859-9 Turkish"}),(0,i.jsx)(e.td,{children:"latin5_turkish_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"latin7"}),(0,i.jsx)(e.td,{children:"ISO 8859-13 Baltic"}),(0,i.jsx)(e.td,{children:"latin7_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"macce"}),(0,i.jsx)(e.td,{children:"Mac Central European"}),(0,i.jsx)(e.td,{children:"macce_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"macroman"}),(0,i.jsx)(e.td,{children:"Mac West European"}),(0,i.jsx)(e.td,{children:"macroman_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"sjis"}),(0,i.jsx)(e.td,{children:"Shift-JIS Japanese"}),(0,i.jsx)(e.td,{children:"sjis_japanese_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"swe7"}),(0,i.jsx)(e.td,{children:"7bit Swedish"}),(0,i.jsx)(e.td,{children:"swe7_swedish_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"tis620"}),(0,i.jsx)(e.td,{children:"TIS620 Thai"}),(0,i.jsx)(e.td,{children:"tis620_thai_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"ucs2"}),(0,i.jsx)(e.td,{children:"UCS-2 Unicode"}),(0,i.jsx)(e.td,{children:"ucs2_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"2"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"ujis"}),(0,i.jsx)(e.td,{children:"EUC-JP Japanese"}),(0,i.jsx)(e.td,{children:"ujis_japanese_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"3"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"utf16"}),(0,i.jsx)(e.td,{children:"UTF-16 Unicode"}),(0,i.jsx)(e.td,{children:"utf16_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"4"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"utf16le"}),(0,i.jsx)(e.td,{children:"UTF-16LE Unicode"}),(0,i.jsx)(e.td,{children:"utf16le_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"4"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"utf32"}),(0,i.jsx)(e.td,{children:"UTF-32 Unicode"}),(0,i.jsx)(e.td,{children:"utf32_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"4"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"utf8mb3"}),(0,i.jsx)(e.td,{children:"UTF-8 Unicode"}),(0,i.jsx)(e.td,{children:"utf8mb3_general_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"3"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"utf8mb4"}),(0,i.jsx)(e.td,{children:"UTF-8 Unicode"}),(0,i.jsx)(e.td,{children:"utf8mb4_0900_ai_ci"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"4"})]})]})]}),"\n",(0,i.jsx)(e.p,{children:"Trong \u0111\xf3:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Charset"}),": t\xean b\u1ea3ng m\xe3"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Description"}),": m\xf4 t\u1ea3"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Default collation"}),": b\u1ea3ng m\xe3 m\u1eb7c \u0111\u1ecbnh"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Maxlen"}),": \u0111\u1ed9 d\xe0i t\u1ed1i \u0111a c\u1ee7a m\u1ed7i k\xfd t\u1ef1 trong b\u1ea3ng m\xe3. M\u1ed9t s\u1ed1 b\u1ea3ng m\xe3 ch\u1ee9a k\xfd t\u1ef1 ",(0,i.jsx)(e.strong,{children:"\u0111a byte"}),", n\xean Maxlen c\xf3 th\u1ec3 l\u1edbn h\u01a1n 1."]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"collations",children:"2. Th\u1ee9 t\u1ef1 k\xfd t\u1ef1 (Collations) trong MySQL"}),"\n",(0,i.jsx)(e.p,{children:"Th\u1ee9 t\u1ef1 k\xfd t\u1ef1 (Collations) trong MySQL x\xe1c \u0111\u1ecbnh c\xe1ch so s\xe1nh v\xe0 s\u1eafp x\u1ebfp c\xe1c k\xfd t\u1ef1 trong m\u1ed9t b\u1ea3ng m\xe3. M\u1ed7i b\u1ed9 k\xfd t\u1ef1 c\xf3 \xedt nh\u1ea5t m\u1ed9t collation m\u1eb7c \u0111\u1ecbnh, v\xe0 h\u1ea7u h\u1ebft c\xe1c b\u1ed9 k\xfd t\u1ef1 c\xf3 nhi\u1ec1u collation."}),"\n",(0,i.jsx)(e.p,{children:"\u0110\u1ec3 li\u1ec7t k\xea t\u1ea5t c\u1ea3 c\xe1c collation c\u1ee7a m\u1ed9t b\u1ea3ng m\xe3, b\u1ea1n s\u1eed d\u1ee5ng c\xe2u l\u1ec7nh sau:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SHOW COLLATION WHERE Charset = 'ascii';\n"})}),"\n",(0,i.jsxs)(e.p,{children:["Trong \u0111\xf3, ",(0,i.jsx)(e.code,{children:"ascii"})," l\xe0 t\xean b\u1ea3ng m\xe3. K\u1ebft qu\u1ea3 tr\u1ea3 v\u1ec1 s\u1ebd bao g\u1ed3m t\xean collation, m\xf4 t\u1ea3 v\xe0 m\u1eb7c \u0111\u1ecbnh. V\xed d\u1ee5:"]}),"\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"Collation"}),(0,i.jsx)(e.th,{children:"Charset"}),(0,i.jsx)(e.th,{children:"Id"}),(0,i.jsx)(e.th,{style:{textAlign:"center"},children:"Default"}),(0,i.jsx)(e.th,{style:{textAlign:"center"},children:"Compiled"}),(0,i.jsx)(e.th,{style:{textAlign:"center"},children:"Sortlen"}),(0,i.jsx)(e.th,{children:"Pad_attribute"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"ascii_bin"}),(0,i.jsx)(e.td,{children:"ascii"}),(0,i.jsx)(e.td,{children:"65"}),(0,i.jsx)(e.td,{style:{textAlign:"center"}}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"Yes"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"}),(0,i.jsx)(e.td,{children:"PAD SPACE"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"ascii_general_ci"}),(0,i.jsx)(e.td,{children:"ascii"}),(0,i.jsx)(e.td,{children:"11"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"Yes"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"Yes"}),(0,i.jsx)(e.td,{style:{textAlign:"center"},children:"1"}),(0,i.jsx)(e.td,{children:"PAD SPACE"})]})]})]}),"\n",(0,i.jsx)(e.p,{children:"Trong \u0111\xf3:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Collation"}),": t\xean collation"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Charset"}),": t\xean b\u1ea3ng m\xe3"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Id"}),": ID c\u1ee7a collation"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Default"}),": collation m\u1eb7c \u0111\u1ecbnh"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Compiled"}),": collation \u0111\xe3 \u0111\u01b0\u1ee3c bi\xean d\u1ecbch"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Sortlen"}),": \u0111\u1ed9 d\xe0i c\u1ee7a chu\u1ed7i s\u1eafp x\u1ebfp"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"Pad_attribute"}),": thu\u1ed9c t\xednh \u0111\u1ec7m."]}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["Collation x\xe1c \u0111\u1ecbnh c\xe1ch so s\xe1nh chu\u1ed7i trong MySQL. V\xed d\u1ee5, collation ",(0,i.jsx)(e.code,{children:"ascii_general_ci"})," so s\xe1nh chu\u1ed7i kh\xf4ng ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng, trong khi collation ",(0,i.jsx)(e.code,{children:"ascii_bin"})," so s\xe1nh ch\xednh x\xe1c t\u1eebng k\xfd t\u1ef1 (ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng)."]}),"\n",(0,i.jsx)(e.p,{children:"Collation c\xf3 m\u1ed9t s\u1ed1 \u0111\u1eb7c \u0111i\u1ec3m quan tr\u1ecdng:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Case sensitivity"}),": x\xe1c \u0111\u1ecbnh collation c\xf3 ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng hay kh\xf4ng.","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"ci"})," (case-insensitive): kh\xf4ng ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng. M\u1ed9t s\u1ed1 collation c\xf3 ",(0,i.jsx)(e.code,{children:"ci"})," \u1edf cu\u1ed1i t\xean, v\xed d\u1ee5: ",(0,i.jsx)(e.code,{children:"utf8_general_ci"})," s\u1ebd xem ",(0,i.jsx)(e.code,{children:"A"})," v\xe0 ",(0,i.jsx)(e.code,{children:"a"})," l\xe0 gi\u1ed1ng nhau."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"cs"})," (case-sensitive): ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng. V\xed d\u1ee5: ",(0,i.jsx)(e.code,{children:"utf8_bin"})," s\u1ebd xem ",(0,i.jsx)(e.code,{children:"A"})," v\xe0 ",(0,i.jsx)(e.code,{children:"a"})," l\xe0 kh\xe1c nhau."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Accent sensitivity"}),": x\xe1c \u0111\u1ecbnh collation c\xf3 ph\xe2n bi\u1ec7t d\u1ea5u thanh hay kh\xf4ng. V\xed d\u1ee5: ",(0,i.jsx)(e.code,{children:"utf8_general_ci"})," s\u1ebd xem ",(0,i.jsx)(e.code,{children:"\xe1"})," v\xe0 ",(0,i.jsx)(e.code,{children:"a"})," l\xe0 gi\u1ed1ng nhau, trong khi ",(0,i.jsx)(e.code,{children:"utf8_bin"})," s\u1ebd xem ch\xfang l\xe0 kh\xe1c nhau."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Kana sensitivity"}),": x\xe1c \u0111\u1ecbnh collation c\xf3 ph\xe2n bi\u1ec7t k\xfd t\u1ef1 Kana (ti\u1ebfng Nh\u1eadt) hay kh\xf4ng. V\xed d\u1ee5: ",(0,i.jsx)(e.code,{children:"utf8_general_ci"})," s\u1ebd xem ",(0,i.jsx)(e.code,{children:"\u3042"})," v\xe0 ",(0,i.jsx)(e.code,{children:"\u30a2"})," l\xe0 gi\u1ed1ng nhau, trong khi ",(0,i.jsx)(e.code,{children:"utf8_bin"})," s\u1ebd xem ch\xfang l\xe0 kh\xe1c nhau."]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"string-comparison",children:"3. So s\xe1nh chu\u1ed7i trong MySQL"}),"\n",(0,i.jsx)(e.p,{children:"Khi so s\xe1nh chu\u1ed7i trong MySQL, b\u1ea1n c\u1ea7n l\u01b0u \xfd c\xe1c collation c\u1ee7a b\u1ea3ng m\xe3. MySQL s\u1eed d\u1ee5ng collation \u0111\u1ec3 x\xe1c \u0111\u1ecbnh c\xe1ch so s\xe1nh chu\u1ed7i, v\xe0 k\u1ebft qu\u1ea3 c\xf3 th\u1ec3 kh\xe1c nhau t\xf9y thu\u1ed9c v\xe0o collation."}),"\n",(0,i.jsxs)(e.p,{children:["V\xed d\u1ee5, gi\u1ea3 s\u1eed b\u1ea1n c\xf3 m\u1ed9t b\u1ea3ng ",(0,i.jsx)(e.code,{children:"users"})," v\u1edbi c\u1ed9t ",(0,i.jsx)(e.code,{children:"name"})," c\xf3 collation ",(0,i.jsx)(e.code,{children:"utf8_general_ci"}),":"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"CREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(255) COLLATE utf8_bin\n);\n"})}),"\n",(0,i.jsxs)(e.p,{children:["N\u1ebfu b\u1ea1n th\xeam d\u1eef li\u1ec7u v\xe0o b\u1ea3ng ",(0,i.jsx)(e.code,{children:"users"}),":"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"INSERT INTO users (id, name) VALUES (1, 'Alice');\nINSERT INTO users (id, name) VALUES (2, 'alice');\n"})}),"\n",(0,i.jsx)(e.p,{children:"Khi b\u1ea1n so s\xe1nh chu\u1ed7i trong MySQL, k\u1ebft qu\u1ea3 s\u1ebd ph\u1ee5 thu\u1ed9c v\xe0o collation c\u1ee7a c\u1ed9t. V\xed d\u1ee5:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT * FROM users WHERE name = 'Alice';\n"})}),"\n",(0,i.jsxs)(e.p,{children:["N\u1ebfu collation c\u1ee7a c\u1ed9t ",(0,i.jsx)(e.code,{children:"name"})," l\xe0 ",(0,i.jsx)(e.code,{children:"utf8_bin"}),", c\xe2u l\u1ec7nh tr\xean s\u1ebd ch\u1ec9 tr\u1ea3 v\u1ec1 d\xf2ng c\xf3 ",(0,i.jsx)(e.code,{children:"name"})," l\xe0 ",(0,i.jsx)(e.code,{children:"Alice"}),", v\xec collation ",(0,i.jsx)(e.code,{children:"utf8_bin"})," ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng."]}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685192/blog/images/string-comparison-mysql_pkvxqr.webp",loading:"lazy",decoding:"async",alt:"string-comparison-mysql"})}),"\n",(0,i.jsxs)(e.p,{children:["Tuy nhi\xean, n\u1ebfu collation c\u1ee7a c\u1ed9t ",(0,i.jsx)(e.code,{children:"name"})," l\xe0 ",(0,i.jsx)(e.code,{children:"utf8_general_ci"}),", c\xe2u l\u1ec7nh tr\xean s\u1ebd tr\u1ea3 v\u1ec1 c\u1ea3 hai d\xf2ng, v\xec collation ",(0,i.jsx)(e.code,{children:"utf8_general_ci"})," kh\xf4ng ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng."]}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685199/blog/images/string-comparison-mysql-ci_s00oow.webp",loading:"lazy",decoding:"async",alt:"string-comparison-mysql-ci"})}),"\n",(0,i.jsxs)(e.p,{children:["T\u1eeb \u0111\xf3, khi l\xe0m vi\u1ec7c v\u1edbi chu\u1ed7i trong MySQL, b\u1ea1n c\u1ea7n l\u01b0u \xfd collation c\u1ee7a c\u1ed9t \u0111\u1ec3 tr\xe1nh nh\u1ea7m l\u1eabn trong k\u1ebft qu\u1ea3 truy v\u1ea5n. N\u1ebfu c\u1ea7n, b\u1ea1n c\xf3 th\u1ec3 s\u1eed d\u1ee5ng h\xe0m ",(0,i.jsx)(e.code,{children:"COLLATE"})," \u0111\u1ec3 ghi \u0111\xe8 collation m\u1eb7c \u0111\u1ecbnh:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT * FROM users WHERE name COLLATE utf8_bin = 'Alice';\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685203/blog/images/string-comparison-mysql-collate_goiuye.webp",loading:"lazy",decoding:"async",alt:"string-comparison-mysql-collate"})}),"\n",(0,i.jsx)(e.p,{children:"Nh\u01b0 v\u1eady, b\u1ea1n \u0111\xe3 bi\u1ebft c\xe1ch so s\xe1nh chu\u1ed7i trong MySQL v\xe0 c\xe1ch x\xe1c \u0111\u1ecbnh collation c\u1ee7a c\u1ed9t \u0111\u1ec3 tr\xe1nh nh\u1ea7m l\u1eabn trong k\u1ebft qu\u1ea3 truy v\u1ea5n."}),"\n",(0,i.jsx)(e.h2,{id:"issues",children:"4. Nh\u1eefng v\u1ea5n \u0111\u1ec1 c\u1ea7n l\u01b0u \xfd"}),"\n",(0,i.jsx)(e.h3,{id:"41-m\u1ed9t-s\u1ed1-v\xed-d\u1ee5-s\u1eed-d\u1ee5ng-collation",children:"4.1. M\u1ed9t s\u1ed1 v\xed d\u1ee5 s\u1eed d\u1ee5ng collation"}),"\n",(0,i.jsxs)(e.p,{children:["Gi\u1ea3 s\u1eed b\u1ea1n c\xf3 m\u1ed9t b\u1ea3ng ",(0,i.jsx)(e.code,{children:"users"})," v\u1edbi c\u1ed9t ",(0,i.jsx)(e.code,{children:"name"})," c\xf3 collation ",(0,i.jsx)(e.code,{children:"latin1_bin"}),":"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"CREATE TABLE users (\n    id INT PRIMARY KEY,\n    name VARCHAR(255) COLLATE latin1_bin\n);\n"})}),"\n",(0,i.jsxs)(e.p,{children:["V\xe0 b\u1ea1n th\xeam d\u1eef li\u1ec7u v\xe0o b\u1ea3ng ",(0,i.jsx)(e.code,{children:"users"}),":"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"INSERT INTO users (id, name) VALUES (1, 'Alice');\nINSERT INTO users (id, name) VALUES (2, 'alice');\nINSERT INTO users (id, name) VALUES (3, 'ALICE');\nINSERT INTO users (id, name) VALUES (4, 'Bar');\nINSERT INTO users (id, name) VALUES (5, 'B\xe4r');\nINSERT INTO users (id, name) VALUES (6, 'Muffler');\nINSERT INTO users (id, name) VALUES (7, 'M\xfcller');\nINSERT INTO users (id, name) VALUES (8, 'MX Systems');\nINSERT INTO users (id, name) VALUES (9, 'MySQL');\n"})}),"\n",(0,i.jsxs)(e.p,{children:["V\u1edbi t\u1eeb kh\xf3a ",(0,i.jsx)(e.code,{children:"COLLATE"}),", b\u1ea1n c\xf3 th\u1ec3 ghi \u0111\xe8 collation m\u1eb7c \u0111\u1ecbnh c\u1ee7a c\u1ed9t trong truy v\u1ea5n. Ta c\xf3 th\u1ec3 s\u1eed d\u1ee5ng ",(0,i.jsx)(e.code,{children:"COLLATE"})," trong c\xe1c tr\u01b0\u1eddng h\u1ee3p sau:"]}),"\n",(0,i.jsxs)(e.h4,{id:"collate-order-by",children:["D\xf9ng v\u1edbi ",(0,i.jsx)(e.code,{children:"ORDER BY"})," \u0111\u1ec3 s\u1eafp x\u1ebfp chu\u1ed7i theo collation kh\xe1c nhau"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM users \nORDER BY name COLLATE latin1_bin;\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685451/blog/images/collate-order-by-latin1_bin_xgmhuo.webp",loading:"lazy",decoding:"async",alt:"collate-order-by-latin1_bin"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT *\nFROM users\nORDER BY name COLLATE latin1_general_ci;\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685455/blog/images/collate-order-by-latin1_general_ci_kmlhe2.webp",loading:"lazy",decoding:"async",alt:"collate-order-by-latin1_general_ci"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM users \nORDER BY name COLLATE latin1_general_cs;\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685432/blog/images/collate-order-by-latin1_general_cs_fcbdwz.webp",loading:"lazy",decoding:"async",alt:"collate-order-by-latin1_general_cs"})}),"\n",(0,i.jsx)(e.p,{children:"Nh\u1eadn x\xe9t:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"latin1_bin"}),": s\u1eafp x\u1ebfp ch\xednh x\xe1c t\u1eebng k\xfd t\u1ef1, ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"latin1_general_ci"}),": kh\xf4ng ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng."]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"latin1_general_cs"}),": ph\xe2n bi\u1ec7t ch\u1eef hoa v\xe0 ch\u1eef th\u01b0\u1eddng. Tuy nhi\xean, collation n\xe0y kh\xf4ng ph\xe2n bi\u1ec7t d\u1ea5u thanh."]}),"\n"]}),"\n",(0,i.jsxs)(e.h4,{id:"collate-as",children:["D\xf9ng v\u1edbi ",(0,i.jsx)(e.code,{children:"AS"})," \u0111\u1ec3 \u0111\u1eb7t t\xean collation cho c\u1ed9t m\u1edbi"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT name COLLATE latin1_general_ci AS name_latin1_general_ci\nFROM users;\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725684950/blog/images/collate-as-latin1_general_ci_nfjjrl.webp",loading:"lazy",decoding:"async",alt:"collate-as-latin1_general_ci"})}),"\n",(0,i.jsxs)(e.h4,{id:"collate-group-by",children:["D\xf9ng v\u1edbi ",(0,i.jsx)(e.code,{children:"GROUP BY"})," \u0111\u1ec3 nh\xf3m chu\u1ed7i theo collation kh\xe1c nhau"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT name COLLATE latin1_general_ci, COUNT(1)\nFROM users\nGROUP BY name COLLATE latin1_general_ci;\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685080/blog/images/collate-group-by-latin1_general_ci_iv8crg.webp",loading:"lazy",decoding:"async",alt:"collate-group-by-latin1_general_ci"})}),"\n",(0,i.jsx)(e.h4,{id:"collate-aggregation",children:"D\xf9ng v\u1edbi c\xe1c h\xe0m aggregation \u0111\u1ec3 t\xednh to\xe1n tr\xean chu\u1ed7i theo collation kh\xe1c nhau"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT MIN(name COLLATE latin1_general_ci)\nFROM users;\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685287/blog/images/collate-min-latin1_general_ci_tzwxqj.webp",loading:"lazy",decoding:"async",alt:"collate-min-latin1_general_ci"})}),"\n",(0,i.jsxs)(e.h4,{id:"collate-distinct",children:["D\xf9ng v\u1edbi ",(0,i.jsx)(e.code,{children:"DISTINCT"})," \u0111\u1ec3 lo\u1ea1i b\u1ecf c\xe1c gi\xe1 tr\u1ecb tr\xf9ng l\u1eb7p theo collation kh\xe1c nhau"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT DISTINCT name COLLATE latin1_general_ci\nFROM users;\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685005/blog/images/collate-distinct-latin1_general_ci_o4alwi.webp",loading:"lazy",decoding:"async",alt:"collate-distinct-latin1_general_ci"})}),"\n",(0,i.jsxs)(e.h4,{id:"collate-where",children:["D\xf9ng v\u1edbi ",(0,i.jsx)(e.code,{children:"WHERE"})," \u0111\u1ec3 so s\xe1nh chu\u1ed7i theo collation kh\xe1c nhau"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM users\nWHERE name COLLATE latin1_general_ci = 'Alice';\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685364/blog/images/collate-where-latin1_general_ci_oiaxdc.webp",loading:"lazy",decoding:"async",alt:"collate-where-latin1_general_ci"})}),"\n",(0,i.jsxs)(e.p,{children:["Ta th\u1ea5y, v\u1edbi collation ",(0,i.jsx)(e.code,{children:"latin1_general_ci"}),", ",(0,i.jsx)(e.code,{children:"Alice"}),", ",(0,i.jsx)(e.code,{children:"ALICE"})," v\xe0 ",(0,i.jsx)(e.code,{children:"alice"})," \u0111\u01b0\u1ee3c xem l\xe0 gi\u1ed1ng nhau, n\xean tr\u1ea3 v\u1ec1 t\u1ea5t c\u1ea3 c\xe1c d\xf2ng c\xf3 ",(0,i.jsx)(e.code,{children:"name"})," l\xe0 ",(0,i.jsx)(e.code,{children:"Alice"}),"."]}),"\n",(0,i.jsxs)(e.p,{children:["L\u01b0u \xfd, n\u1ebfu kh\xf4ng ch\u1ec9 \u0111\u1ecbnh collation, MySQL s\u1ebd s\u1eed d\u1ee5ng collation m\u1eb7c \u0111\u1ecbnh c\u1ee7a c\u1ed9t (trong tr\u01b0\u1eddng h\u1ee3p n\xe0y l\xe0 ",(0,i.jsx)(e.code,{children:"latin1_bin"}),"). V\xed d\u1ee5:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM users\nWHERE name = 'Alice';\n"})}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{src:"https://res.cloudinary.com/tiennhm/image/upload/v1725685354/blog/images/collate-where-latin1_bin_dsgdsn.webp",loading:"lazy",decoding:"async",alt:"collate-where-latin1_bin"})}),"\n",(0,i.jsxs)(e.p,{children:["Ta th\u1ea5y, v\u1edbi collation ",(0,i.jsx)(e.code,{children:"latin1_bin"}),", ",(0,i.jsx)(e.code,{children:"Alice"}),", ",(0,i.jsx)(e.code,{children:"ALICE"})," v\xe0 ",(0,i.jsx)(e.code,{children:"alice"})," \u0111\u01b0\u1ee3c xem l\xe0 kh\xe1c nhau, n\xean ch\u1ec9 tr\u1ea3 v\u1ec1 d\xf2ng c\xf3 ",(0,i.jsx)(e.code,{children:"name"})," l\xe0 ",(0,i.jsx)(e.code,{children:"Alice"}),"."]}),"\n",(0,i.jsxs)(e.h4,{id:"collate-having",children:["D\xf9ng v\u1edbi ",(0,i.jsx)(e.code,{children:"HAVING"})," \u0111\u1ec3 l\u1ecdc k\u1ebft qu\u1ea3 theo collation kh\xe1c nhau"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT * \nFROM users\nGROUP BY name COLLATE latin1_general_ci\nHAVING COUNT(1) > 1;\n"})}),"\n",(0,i.jsx)(e.h3,{id:"42-m\u1ee9c-\u0111\u1ed9-\u01b0u-ti\xean-c\u1ee7a-collation",children:"4.2. M\u1ee9c \u0111\u1ed9 \u01b0u ti\xean c\u1ee7a collation"}),"\n",(0,i.jsxs)(e.p,{children:["M\u1ec7nh \u0111\u1ec1 ",(0,i.jsx)(e.code,{children:"COLLATE"})," c\xf3 \u0111\u1ed9 \u01b0u ti\xean cao (cao h\u01a1n ",(0,i.jsx)(e.code,{children:"||"}),"). Hai bi\u1ec3u th\u1ee9c sau s\u1ebd t\u01b0\u01a1ng \u0111\u01b0\u01a1ng:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"x || y COLLATE z\nx || (y COLLATE z)\n"})}),"\n",(0,i.jsx)(e.p,{children:"V\xed d\u1ee5:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT 'Alice' || 'Alice' COLLATE utf8_general_ci;\n"})}),"\n",(0,i.jsx)(e.p,{children:"T\u01b0\u01a1ng \u0111\u01b0\u01a1ng v\u1edbi:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT 'Alice' || ('Alice' COLLATE utf8_general_ci);\n"})}),"\n",(0,i.jsx)(e.h3,{id:"43-\u0111\u1ed9-t\u01b0\u01a1ng-th\xedch-c\u1ee7a-collation",children:"4.3. \u0110\u1ed9 t\u01b0\u01a1ng th\xedch c\u1ee7a collation"}),"\n",(0,i.jsx)(e.p,{children:"N\u1ebfu hai collation kh\xf4ng t\u01b0\u01a1ng th\xedch, MySQL s\u1ebd b\xe1o l\u1ed7i. V\xed d\u1ee5:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-sql",children:"SELECT 'Alice' COLLATE utf8_bin = 'Alice' COLLATE utf8_general_ci;\n"})}),"\n",(0,i.jsx)(e.p,{children:"S\u1ebd b\xe1o l\u1ed7i:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"Error Code: 1253. COLLATION 'utf8_bin' is not valid for CHARACTER SET 'utf8mb4'\n"})}),"\n",(0,i.jsx)(e.h2,{id:"conclusion",children:"5. K\u1ebft lu\u1eadn"}),"\n",(0,i.jsx)(e.p,{children:"Trong b\xe0i vi\u1ebft n\xe0y, ch\xfang ta \u0111\xe3 t\xecm hi\u1ec3u v\u1ec1 c\xe1c b\u1ea3ng m\xe3 v\xe0 c\xe1ch so s\xe1nh chu\u1ed7i trong MySQL, nh\u1eefng v\u1ea5n \u0111\u1ec1 c\u1ea7n l\u01b0u \xfd khi l\xe0m vi\u1ec7c v\u1edbi c\xe1c b\u1ea3ng m\xe3 kh\xe1c nhau. Hy v\u1ecdng b\xe0i vi\u1ebft n\xe0y gi\xfap b\u1ea1n hi\u1ec3u r\xf5 h\u01a1n v\u1ec1 collation v\xe0 c\xe1ch so s\xe1nh chu\u1ed7i trong MySQL."}),"\n",(0,i.jsx)(e.p,{children:"N\u1ebfu b\u1ea1n c\xf3 b\u1ea5t k\u1ef3 c\xe2u h\u1ecfi ho\u1eb7c \xfd ki\u1ebfn \u0111\xf3ng g\xf3p n\xe0o, h\xe3y \u0111\u1ec3 l\u1ea1i b\xecnh lu\u1eadn b\xean d\u01b0\u1edbi. C\u1ea3m \u01a1n b\u1ea1n \u0111\xe3 \u0111\u1ecdc b\xe0i vi\u1ebft!"}),"\n",(0,i.jsx)(e.h2,{id:"references",children:"Tham kh\u1ea3o"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://dev.mysql.com/doc/refman/8.0/en/charset.html",children:"MySQL Character Sets and Collations"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html",children:"MySQL String Comparison"})}),"\n"]})]})}function o(n={}){const{wrapper:e}={...(0,l.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(a,{...n})}):a(n)}},28453:(n,e,c)=>{c.d(e,{R:()=>s,x:()=>r});var i=c(96540);const l={},t=i.createContext(l);function s(n){const e=i.useContext(t);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:s(n.components),i.createElement(t.Provider,{value:e},n.children)}}}]);