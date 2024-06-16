"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[193],{55124:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>d,default:()=>o,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var s=i(74848),n=i(28453);const r={title:"197. Rising Temperature",slug:"197-rising-temperature",description:"Find all dates' `Id` with higher temperatures compared to its previous dates (yesterday).",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},d="197. Rising Temperature",a={id:"leetcode/database/Rising Temperature",title:"197. Rising Temperature",description:"Find all dates' `Id` with higher temperatures compared to its previous dates (yesterday).",source:"@site/docs/04-leetcode/database/197. Rising Temperature.mdx",sourceDirName:"04-leetcode/database",slug:"/leetcode/database/197-rising-temperature",permalink:"/en/docs/leetcode/database/197-rising-temperature",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/database/197. Rising Temperature.mdx",tags:[{inline:!0,label:"leetcode",permalink:"/en/docs/tags/leetcode"},{inline:!0,label:"database",permalink:"/en/docs/tags/database"}],version:"current",lastUpdatedAt:171852689e4,sidebarPosition:1,frontMatter:{title:"197. Rising Temperature",slug:"197-rising-temperature",description:"Find all dates' `Id` with higher temperatures compared to its previous dates (yesterday).",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","database"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"196. Delete Duplicate Emails",permalink:"/en/docs/leetcode/database/196-delete-duplicate-emails"},next:{title:"511. Game Play Analysis I",permalink:"/en/docs/leetcode/database/511-game-play-analysis-i"}},l={},c=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"197-rising-temperature",children:"197. Rising Temperature"}),"\n",(0,s.jsx)(t.h2,{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",children:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"}),"\n",(0,s.jsxs)(t.p,{children:["Chi ti\u1ebft: ",(0,s.jsx)(t.a,{href:"https://leetcode.com/problems/rising-temperature/",children:"https://leetcode.com/problems/rising-temperature/"})]}),"\n",(0,s.jsxs)(t.p,{children:["Table: ",(0,s.jsx)(t.code,{children:"Weather"})]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Column Name"}),(0,s.jsx)(t.th,{children:"Type"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"id"}),(0,s.jsx)(t.td,{children:"int"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"recordDate"}),(0,s.jsx)(t.td,{children:"date"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"temperature"}),(0,s.jsx)(t.td,{children:"int"})]})]})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"In SQL, id is the primary key for this table."}),"\n",(0,s.jsx)(t.li,{children:"This table contains information about the temperature on a certain day."}),"\n"]}),"\n",(0,s.jsxs)(t.admonition,{title:"Y\xeau c\u1ea7u",type:"tip",children:[(0,s.jsxs)(t.p,{children:["Find all dates' ",(0,s.jsx)(t.code,{children:"Id"})," with higher temperatures compared to its previous dates (yesterday)."]}),(0,s.jsx)(t.p,{children:"Return the result table in any order. The result format is in the following example."})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Example 1:"})}),"\n",(0,s.jsxs)(t.p,{children:["Input: ",(0,s.jsx)(t.code,{children:"Weather"})," table:"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"id"}),(0,s.jsx)(t.th,{children:"recordDate"}),(0,s.jsx)(t.th,{children:"temperature"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"1"}),(0,s.jsx)(t.td,{children:"2015-01-01"}),(0,s.jsx)(t.td,{children:"10"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"2"}),(0,s.jsx)(t.td,{children:"2015-01-02"}),(0,s.jsx)(t.td,{children:"25"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"3"}),(0,s.jsx)(t.td,{children:"2015-01-03"}),(0,s.jsx)(t.td,{children:"20"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"4"}),(0,s.jsx)(t.td,{children:"2015-01-04"}),(0,s.jsx)(t.td,{children:"30"})]})]})]}),"\n",(0,s.jsx)(t.p,{children:"Output:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.th,{children:"id"})})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{children:"2"})}),(0,s.jsx)(t.tr,{children:(0,s.jsx)(t.td,{children:"4"})})]})]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Explanation:","\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"In 2015-01-02, the temperature was higher than the previous day (10 -> 25)."}),"\n",(0,s.jsx)(t.li,{children:"In 2015-01-04, the temperature was higher than the previous day (20 -> 30)."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",children:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sql",children:"SELECT w1.id \nFROM Weather w1 JOIN Weather w2\n    ON w1.RecordDate = DATE_ADD(w2.RecordDate, INTERVAL 1 DAY)\nWHERE w1.temperature > w2.temperature;\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Tham kh\u1ea3o: ",(0,s.jsx)(t.a,{href:"https://leetcode.com/submissions/detail/1039224990/",children:"https://leetcode.com/submissions/detail/1039224990/"})]})]})}function o(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>d,x:()=>a});var s=i(96540);const n={},r=s.createContext(n);function d(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:d(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);