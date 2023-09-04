"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[980],{18679:(t,e,n)=>{n.d(e,{Z:()=>i});var a=n(67294),r=n(86010);const l={tabItem:"tabItem_Ymn6"};function i(t){let{children:e,hidden:n,className:i}=t;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,i),hidden:n},e)}},73992:(t,e,n)=>{n.d(e,{Z:()=>w});var a=n(87462),r=n(67294),l=n(86010),i=n(72957),u=n(16550),o=n(75238),d=n(33609),s=n(92560);function m(t){return function(t){return r.Children.map(t,(t=>{if(!t||(0,r.isValidElement)(t)&&function(t){const{props:e}=t;return!!e&&"object"==typeof e&&"value"in e}(t))return t;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof t.type?t.type:t.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(t).map((t=>{let{props:{value:e,label:n,attributes:a,default:r}}=t;return{value:e,label:n,attributes:a,default:r}}))}function p(t){const{values:e,children:n}=t;return(0,r.useMemo)((()=>{const t=e??m(n);return function(t){const e=(0,d.l)(t,((t,e)=>t.value===e.value));if(e.length>0)throw new Error(`Docusaurus error: Duplicate values "${e.map((t=>t.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(t),t}),[e,n])}function c(t){let{value:e,tabValues:n}=t;return n.some((t=>t.value===e))}function h(t){let{queryString:e=!1,groupId:n}=t;const a=(0,u.k6)(),l=function(t){let{queryString:e=!1,groupId:n}=t;if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:e,groupId:n});return[(0,o._X)(l),(0,r.useCallback)((t=>{if(!l)return;const e=new URLSearchParams(a.location.search);e.set(l,t),a.replace({...a.location,search:e.toString()})}),[l,a])]}function g(t){const{defaultValue:e,queryString:n=!1,groupId:a}=t,l=p(t),[i,u]=(0,r.useState)((()=>function(t){let{defaultValue:e,tabValues:n}=t;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!c({value:e,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${n.map((t=>t.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const a=n.find((t=>t.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:e,tabValues:l}))),[o,d]=h({queryString:n,groupId:a}),[m,g]=function(t){let{groupId:e}=t;const n=function(t){return t?`docusaurus.tab.${t}`:null}(e),[a,l]=(0,s.Nk)(n);return[a,(0,r.useCallback)((t=>{n&&l.set(t)}),[n,l])]}({groupId:a}),k=(()=>{const t=o??m;return c({value:t,tabValues:l})?t:null})();(0,r.useLayoutEffect)((()=>{k&&u(k)}),[k]);return{selectedValue:i,selectValue:(0,r.useCallback)((t=>{if(!c({value:t,tabValues:l}))throw new Error(`Can't select invalid tab value=${t}`);u(t),d(t),g(t)}),[d,g,l]),tabValues:l}}var k=n(51048);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function N(t){let{className:e,block:n,selectedValue:u,selectValue:o,tabValues:d}=t;const s=[],{blockElementScrollPositionUntilNextRender:m}=(0,i.o5)(),p=t=>{const e=t.currentTarget,n=s.indexOf(e),a=d[n].value;a!==u&&(m(e),o(a))},c=t=>{let e=null;switch(t.key){case"Enter":p(t);break;case"ArrowRight":{const n=s.indexOf(t.currentTarget)+1;e=s[n]??s[0];break}case"ArrowLeft":{const n=s.indexOf(t.currentTarget)-1;e=s[n]??s[s.length-1];break}}e?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},e)},d.map((t=>{let{value:e,label:n,attributes:i}=t;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:u===e?0:-1,"aria-selected":u===e,key:e,ref:t=>s.push(t),onKeyDown:c,onClick:p},i,{className:(0,l.Z)("tabs__item",b.tabItem,i?.className,{"tabs__item--active":u===e})}),n??e)})))}function A(t){let{lazy:e,children:n,selectedValue:a}=t;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(e){const t=l.find((t=>t.props.value===a));return t?(0,r.cloneElement)(t,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((t,e)=>(0,r.cloneElement)(t,{key:e,hidden:t.props.value!==a}))))}function f(t){const e=g(t);return r.createElement("div",{className:(0,l.Z)("tabs-container",b.tabList)},r.createElement(N,(0,a.Z)({},t,e)),r.createElement(A,(0,a.Z)({},t,e)))}function w(t){const e=(0,k.Z)();return r.createElement(f,(0,a.Z)({key:String(e)},t))}},88263:(t,e,n)=>{n.d(e,{Z:()=>r});var a=n(67294);const r={React:a,...a}},21901:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>m,default:()=>b,frontMatter:()=>s,metadata:()=>p,toc:()=>h});var a=n(87462),r=(n(67294),n(3905)),l=n(73992),i=n(18679),u=n(57130);const o="public class Solution {\n    public int UniquePaths(int m, int n) {\n        var A = new int[m, n];\n        for (int i = 0; i < m; i++) {\n            A[i, 0] = 1;\n        }\n        for (int j = 0; j < n; j++) {\n            A[0, j] = 1;\n        }\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                A[i, j] = A[i - 1, j] + A[i, j - 1];\n            }\n        }\n        return A[m - 1, n - 1];\n    }\n}",d="function uniquePaths(m: number, n: number): number {\n    var A : number[][] = Array.from(Array(m), _ => Array(n).fill(0));\n\n    for (var i = 0; i < m; i++) {\n            A[i][0] = 1;\n        }\n    for (var j = 0; j < n; j++) {\n        A[0][j] = 1;\n    }\n    for (var i = 1; i < m; i++) {\n        for (var j = 1; j < n; j++) {\n            A[i][j] = A[i-1][j] + A[i][j-1];\n        }\n    }\n    return A[m-1][n-1];\n};",s={title:"62. Unique Paths",slug:"62-unique-paths",description:"Solution cho problem 62. Unique Paths c\u1ee7a LeetCode",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","dynamic-programming"],keywords:["leetcode","database"]},m="62. Unique Paths",p={unversionedId:"leetcode/dynamic-programming/Unique Paths",id:"leetcode/dynamic-programming/Unique Paths",title:"62. Unique Paths",description:"Solution cho problem 62. Unique Paths c\u1ee7a LeetCode",source:"@site/docs/leetcode/dynamic-programming/62. Unique Paths.mdx",sourceDirName:"leetcode/dynamic-programming",slug:"/leetcode/dynamic-programming/62-unique-paths",permalink:"/docs/leetcode/dynamic-programming/62-unique-paths",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/leetcode/dynamic-programming/62. Unique Paths.mdx",tags:[{label:"leetcode",permalink:"/docs/tags/leetcode"},{label:"dynamic-programming",permalink:"/docs/tags/dynamic-programming"}],version:"current",sidebarPosition:1,frontMatter:{title:"62. Unique Paths",slug:"62-unique-paths",description:"Solution cho problem 62. Unique Paths c\u1ee7a LeetCode",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,tags:["leetcode","dynamic-programming"],keywords:["leetcode","database"]},sidebar:"tutorialSidebar",previous:{title:"Dynamic Programming",permalink:"/docs/category/dynamic-programming"},next:{title:"H\u1ec7 \u0111i\u1ec1u h\xe0nh",permalink:"/docs/category/h\u1ec7-\u0111i\u1ec1u-h\xe0nh"}},c={},h=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}],g={toc:h},k="wrapper";function b(t){let{components:e,...s}=t;return(0,r.kt)(k,(0,a.Z)({},g,s,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"62-unique-paths"},"62. Unique Paths"),(0,r.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n"},"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"),(0,r.kt)("p",null,"Chi ti\u1ebft: ",(0,r.kt)("a",{parentName:"p",href:"https://leetcode.com/problems/unique-paths/"},"https://leetcode.com/problems/unique-paths/")),(0,r.kt)("p",null,"There is a robot on an ",(0,r.kt)("inlineCode",{parentName:"p"},"m x n")," grid. The robot is initially located at the top-left corner (i.e., ",(0,r.kt)("inlineCode",{parentName:"p"},"grid[0][0]"),"). The robot tries to move to the bottom-right corner (i.e., ",(0,r.kt)("inlineCode",{parentName:"p"},"grid[m - 1][n - 1]"),"). The robot can only move either ",(0,r.kt)("inlineCode",{parentName:"p"},"down")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"right")," at any point in time."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"robot_maze",src:n(96176).Z,width:"400",height:"183"})),(0,r.kt)("admonition",{title:"Y\xeau c\u1ea7u",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Given the two integers ",(0,r.kt)("inlineCode",{parentName:"p"},"m")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"n"),", return the number of possible unique paths that the robot can take to reach the bottom-right corner.")),(0,r.kt)("p",null,"The test cases are generated so that the answer will be less than or equal to ",(0,r.kt)("inlineCode",{parentName:"p"},"2 * 10^9"),"."),(0,r.kt)("h2",{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n"},"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"),(0,r.kt)("p",null,"Ta l\u1eadp b\u1ea3ng 2 chi\u1ec1u ",(0,r.kt)("inlineCode",{parentName:"p"},"m x n")," \u0111\u1ec3 l\u01b0u s\u1ed1 l\u01b0\u1ee3ng \u0111\u01b0\u1eddng \u0111i t\u1ea1i m\u1ed7i \xf4."),(0,r.kt)("p",null,"D\u1ec5 d\xe0ng nh\u1eadn th\u1ea5y, s\u1ed1 l\u01b0\u1ee3ng \u0111\u01b0\u1eddng \u0111i t\u1ea1i \xf4 ",(0,r.kt)("inlineCode",{parentName:"p"},"(i, j)")," b\u1eb1ng t\u1ed5ng s\u1ed1 l\u01b0\u1ee3ng \u0111\u01b0\u1eddng \u0111i t\u1ea1i \xf4 ",(0,r.kt)("inlineCode",{parentName:"p"},"(i - 1, j)")," v\xe0 ",(0,r.kt)("inlineCode",{parentName:"p"},"(i, j - 1)"),". Trong \u0111\xf3, \xf4 ",(0,r.kt)("inlineCode",{parentName:"p"},"(i - 1, j)")," l\xe0 \xf4 ph\xeda tr\xean \xf4 ",(0,r.kt)("inlineCode",{parentName:"p"},"(i, j)")," v\xe0 \xf4 ",(0,r.kt)("inlineCode",{parentName:"p"},"(i, j - 1)")," l\xe0 \xf4 b\xean tr\xe1i \xf4 ",(0,r.kt)("inlineCode",{parentName:"p"},"(i, j)"),"."),(0,r.kt)("p",null,"L\u01b0u \xfd, \xf4 ",(0,r.kt)("inlineCode",{parentName:"p"},"(i, j)")," n\u1ebfu n\u1eb1m \u1edf h\xe0ng \u0111\u1ea7u ti\xean ho\u1eb7c c\u1ed9t \u0111\u1ea7u ti\xean th\xec s\u1ed1 l\u01b0\u1ee3ng \u0111\u01b0\u1eddng \u0111i t\u1ea1i \xf4 \u0111\xf3 lu\xf4n b\u1eb1ng ",(0,r.kt)("inlineCode",{parentName:"p"},"1"),"."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null}),(0,r.kt)("th",{parentName:"tr",align:null},"1"),(0,r.kt)("th",{parentName:"tr",align:null},"2"),(0,r.kt)("th",{parentName:"tr",align:null},"3"),(0,r.kt)("th",{parentName:"tr",align:null},"4"),(0,r.kt)("th",{parentName:"tr",align:null},"5"),(0,r.kt)("th",{parentName:"tr",align:null},"6"),(0,r.kt)("th",{parentName:"tr",align:null},"7"),(0,r.kt)("th",{parentName:"tr",align:null},"8"),(0,r.kt)("th",{parentName:"tr",align:null},"y"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"1")),(0,r.kt)("td",{parentName:"tr",align:null},"0"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"1")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"2")),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"4"),(0,r.kt)("td",{parentName:"tr",align:null},"5"),(0,r.kt)("td",{parentName:"tr",align:null},"6"),(0,r.kt)("td",{parentName:"tr",align:null},"7"),(0,r.kt)("td",{parentName:"tr",align:null},"8"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"3")),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"6"),(0,r.kt)("td",{parentName:"tr",align:null},"10"),(0,r.kt)("td",{parentName:"tr",align:null},"15"),(0,r.kt)("td",{parentName:"tr",align:null},"21"),(0,r.kt)("td",{parentName:"tr",align:null},"28"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"4")),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"4"),(0,r.kt)("td",{parentName:"tr",align:null},"10"),(0,r.kt)("td",{parentName:"tr",align:null},"20"),(0,r.kt)("td",{parentName:"tr",align:null},"35"),(0,r.kt)("td",{parentName:"tr",align:null},"56"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"5")),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"5"),(0,r.kt)("td",{parentName:"tr",align:null},"15"),(0,r.kt)("td",{parentName:"tr",align:null},"35"),(0,r.kt)("td",{parentName:"tr",align:null},"70"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"x")),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"value")))),(0,r.kt)(l.Z,{defaultValue:"csharp",groupId:"language",queryString:!0,mdxType:"Tabs"},(0,r.kt)(i.Z,{value:"csharp",label:"C#",mdxType:"TabItem"},(0,r.kt)(u.Z,{language:"csharp",showLineNumbers:!0,mdxType:"CodeBlock"},o)),(0,r.kt)(i.Z,{value:"typescript",label:"TypeScript",mdxType:"TabItem"},(0,r.kt)(u.Z,{language:"typescript",showLineNumbers:!0,mdxType:"CodeBlock"},d))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Tham kh\u1ea3o:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://leetcode.com/submissions/detail/1039901081/"},"C#")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://leetcode.com/submissions/detail/1039917510/"},"TypeScript"))))}b.isMDXComponent=!0},96176:(t,e,n)=>{n.d(e,{Z:()=>a});const a="data:image/png;base64,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"}}]);