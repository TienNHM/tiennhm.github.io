"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[9758],{66899:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>j,contentTitle:()=>u,default:()=>A,frontMatter:()=>c,metadata:()=>h,toc:()=>x});var r=n(74848),i=n(28453),s=n(49489),l=n(7227),d=n(96188);const a="public class Solution {\n    public int UniquePaths(int m, int n) {\n        var A = new int[m, n];\n        for (int i = 0; i < m; i++) {\n            A[i, 0] = 1;\n        }\n        for (int j = 0; j < n; j++) {\n            A[0, j] = 1;\n        }\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                A[i, j] = A[i - 1, j] + A[i, j - 1];\n            }\n        }\n        return A[m - 1, n - 1];\n    }\n}",o="function uniquePaths(m: number, n: number): number {\n    var A : number[][] = Array.from(Array(m), _ => Array(n).fill(0));\n\n    for (var i = 0; i < m; i++) {\n            A[i][0] = 1;\n        }\n    for (var j = 0; j < n; j++) {\n        A[0][j] = 1;\n    }\n    for (var i = 1; i < m; i++) {\n        for (var j = 1; j < n; j++) {\n            A[i][j] = A[i-1][j] + A[i][j-1];\n        }\n    }\n    return A[m-1][n-1];\n};",c={title:"62. Unique Paths",slug:"62-unique-paths",description:"Find the number of possible unique paths that the robot can take to reach the bottom-right corner.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","dynamic-programming"],keywords:["leetcode","database"],enableComments:!0,draft:!1},u="62. Unique Paths",h={id:"leetcode/dynamic-programming/Unique Paths",title:"62. Unique Paths",description:"Find the number of possible unique paths that the robot can take to reach the bottom-right corner.",source:"@site/docs/04-leetcode/dynamic-programming/62. Unique Paths.mdx",sourceDirName:"04-leetcode/dynamic-programming",slug:"/leetcode/dynamic-programming/62-unique-paths",permalink:"/docs/leetcode/dynamic-programming/62-unique-paths",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/dynamic-programming/62. Unique Paths.mdx",tags:[{inline:!0,label:"leetcode",permalink:"/docs/tags/leetcode"},{inline:!0,label:"dynamic-programming",permalink:"/docs/tags/dynamic-programming"}],version:"current",lastUpdatedAt:171852689e4,sidebarPosition:1,frontMatter:{title:"62. Unique Paths",slug:"62-unique-paths",description:"Find the number of possible unique paths that the robot can take to reach the bottom-right corner.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","dynamic-programming"],keywords:["leetcode","database"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"Dynamic Programming",permalink:"/docs/category/dynamic-programming"},next:{title:"K6 load testing",permalink:"/docs/category/k6-load-testing"}},j={},x=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}];function b(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"62-unique-paths",children:"62. Unique Paths"}),"\n",(0,r.jsx)(t.h2,{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",children:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"}),"\n",(0,r.jsxs)(t.p,{children:["Chi ti\u1ebft: ",(0,r.jsx)(t.a,{href:"https://leetcode.com/problems/unique-paths/",children:"https://leetcode.com/problems/unique-paths/"})]}),"\n",(0,r.jsxs)(t.p,{children:["There is a robot on an ",(0,r.jsx)(t.code,{children:"m x n"})," grid. The robot is initially located at the top-left corner (i.e., ",(0,r.jsx)(t.code,{children:"grid[0][0]"}),"). The robot tries to move to the bottom-right corner (i.e., ",(0,r.jsx)(t.code,{children:"grid[m - 1][n - 1]"}),"). The robot can only move either ",(0,r.jsx)(t.code,{children:"down"})," or ",(0,r.jsx)(t.code,{children:"right"})," at any point in time."]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"robot_maze",src:n(60994).A+"",width:"400",height:"183"})}),"\n",(0,r.jsx)(t.admonition,{title:"Y\xeau c\u1ea7u",type:"tip",children:(0,r.jsxs)(t.p,{children:["Given the two integers ",(0,r.jsx)(t.code,{children:"m"})," and ",(0,r.jsx)(t.code,{children:"n"}),", return the number of possible unique paths that the robot can take to reach the bottom-right corner."]})}),"\n",(0,r.jsxs)(t.p,{children:["The test cases are generated so that the answer will be less than or equal to ",(0,r.jsx)(t.code,{children:"2 * 10^9"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",children:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"}),"\n",(0,r.jsxs)(t.p,{children:["Ta l\u1eadp b\u1ea3ng 2 chi\u1ec1u ",(0,r.jsx)(t.code,{children:"m x n"})," \u0111\u1ec3 l\u01b0u s\u1ed1 l\u01b0\u1ee3ng \u0111\u01b0\u1eddng \u0111i t\u1ea1i m\u1ed7i \xf4."]}),"\n",(0,r.jsxs)(t.p,{children:["D\u1ec5 d\xe0ng nh\u1eadn th\u1ea5y, s\u1ed1 l\u01b0\u1ee3ng \u0111\u01b0\u1eddng \u0111i t\u1ea1i \xf4 ",(0,r.jsx)(t.code,{children:"(i, j)"})," b\u1eb1ng t\u1ed5ng s\u1ed1 l\u01b0\u1ee3ng \u0111\u01b0\u1eddng \u0111i t\u1ea1i \xf4 ",(0,r.jsx)(t.code,{children:"(i - 1, j)"})," v\xe0 ",(0,r.jsx)(t.code,{children:"(i, j - 1)"}),". Trong \u0111\xf3, \xf4 ",(0,r.jsx)(t.code,{children:"(i - 1, j)"})," l\xe0 \xf4 ph\xeda tr\xean \xf4 ",(0,r.jsx)(t.code,{children:"(i, j)"})," v\xe0 \xf4 ",(0,r.jsx)(t.code,{children:"(i, j - 1)"})," l\xe0 \xf4 b\xean tr\xe1i \xf4 ",(0,r.jsx)(t.code,{children:"(i, j)"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["L\u01b0u \xfd, \xf4 ",(0,r.jsx)(t.code,{children:"(i, j)"})," n\u1ebfu n\u1eb1m \u1edf h\xe0ng \u0111\u1ea7u ti\xean ho\u1eb7c c\u1ed9t \u0111\u1ea7u ti\xean th\xec s\u1ed1 l\u01b0\u1ee3ng \u0111\u01b0\u1eddng \u0111i t\u1ea1i \xf4 \u0111\xf3 lu\xf4n b\u1eb1ng ",(0,r.jsx)(t.code,{children:"1"}),"."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{}),(0,r.jsx)(t.th,{children:"1"}),(0,r.jsx)(t.th,{children:"2"}),(0,r.jsx)(t.th,{children:"3"}),(0,r.jsx)(t.th,{children:"4"}),(0,r.jsx)(t.th,{children:"5"}),(0,r.jsx)(t.th,{children:"6"}),(0,r.jsx)(t.th,{children:"7"}),(0,r.jsx)(t.th,{children:"8"}),(0,r.jsx)(t.th,{children:"y"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"1"})}),(0,r.jsx)(t.td,{children:"0"}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"1"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"2"})}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"2"}),(0,r.jsx)(t.td,{children:"3"}),(0,r.jsx)(t.td,{children:"4"}),(0,r.jsx)(t.td,{children:"5"}),(0,r.jsx)(t.td,{children:"6"}),(0,r.jsx)(t.td,{children:"7"}),(0,r.jsx)(t.td,{children:"8"}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"3"})}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"3"}),(0,r.jsx)(t.td,{children:"6"}),(0,r.jsx)(t.td,{children:"10"}),(0,r.jsx)(t.td,{children:"15"}),(0,r.jsx)(t.td,{children:"21"}),(0,r.jsx)(t.td,{children:"28"}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"4"})}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"4"}),(0,r.jsx)(t.td,{children:"10"}),(0,r.jsx)(t.td,{children:"20"}),(0,r.jsx)(t.td,{children:"35"}),(0,r.jsx)(t.td,{children:"56"}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"5"})}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"5"}),(0,r.jsx)(t.td,{children:"15"}),(0,r.jsx)(t.td,{children:"35"}),(0,r.jsx)(t.td,{children:"70"}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"x"})}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{}),(0,r.jsx)(t.td,{children:"value"})]})]})]}),"\n",(0,r.jsxs)(s.A,{defaultValue:"csharp",groupId:"language",queryString:!0,children:[(0,r.jsx)(l.A,{value:"csharp",label:"C#",children:(0,r.jsx)(d.A,{language:"csharp",showLineNumbers:!0,children:a})}),(0,r.jsx)(l.A,{value:"typescript",label:"TypeScript",children:(0,r.jsx)(d.A,{language:"typescript",showLineNumbers:!0,children:o})})]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Tham kh\u1ea3o:"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://leetcode.com/submissions/detail/1039901081/",children:"C#"})}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://leetcode.com/submissions/detail/1039917510/",children:"TypeScript"})}),"\n"]})]})}function A(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(b,{...e})}):b(e)}},7227:(e,t,n)=>{n.d(t,{A:()=>l});n(96540);var r=n(18215);const i={tabItem:"tabItem_Ymn6"};var s=n(74848);function l(e){let{children:t,hidden:n,className:l}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.A)(i.tabItem,l),hidden:n,children:t})}},49489:(e,t,n)=>{n.d(t,{A:()=>y});var r=n(96540),i=n(18215),s=n(24245),l=n(56347),d=n(36494),a=n(62814),o=n(45167),c=n(69900);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:i}}=e;return{value:t,label:n,attributes:r,default:i}}))}(n);return function(e){const t=(0,o.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function j(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function x(e){let{queryString:t=!1,groupId:n}=e;const i=(0,l.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,a.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(i.location.search);t.set(s,e),i.replace({...i.location,search:t.toString()})}),[s,i])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:i}=e,s=h(e),[l,a]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!j({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[o,u]=x({queryString:n,groupId:i}),[b,A]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[i,s]=(0,c.Dv)(n);return[i,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:i}),m=(()=>{const e=o??b;return j({value:e,tabValues:s})?e:null})();(0,d.A)((()=>{m&&a(m)}),[m]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!j({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);a(e),u(e),A(e)}),[u,A,s]),tabValues:s}}var A=n(11062);const m={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=n(74848);function p(e){let{className:t,block:n,selectedValue:r,selectValue:l,tabValues:d}=e;const a=[],{blockElementScrollPositionUntilNextRender:o}=(0,s.a_)(),c=e=>{const t=e.currentTarget,n=a.indexOf(t),i=d[n].value;i!==r&&(o(t),l(i))},u=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=a.indexOf(e.currentTarget)+1;t=a[n]??a[0];break}case"ArrowLeft":{const n=a.indexOf(e.currentTarget)-1;t=a[n]??a[a.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":n},t),children:d.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>a.push(e),onKeyDown:u,onClick:c,...s,className:(0,i.A)("tabs__item",m.tabItem,s?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function f(e){let{lazy:t,children:n,selectedValue:i}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===i));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==i})))})}function w(e){const t=b(e);return(0,g.jsxs)("div",{className:(0,i.A)("tabs-container",m.tabList),children:[(0,g.jsx)(p,{...t,...e}),(0,g.jsx)(f,{...t,...e})]})}function y(e){const t=(0,A.A)();return(0,g.jsx)(w,{...e,children:u(e.children)},String(t))}},24630:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(96540);const i={React:r,...r}},60994:(e,t,n)=>{n.d(t,{A:()=>r});const r="data:image/png;base64,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"}}]);