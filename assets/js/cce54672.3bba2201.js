"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[8090],{42568:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>m,contentTitle:()=>p,default:()=>x,frontMatter:()=>h,metadata:()=>b,toc:()=>g});var i=t(74848),r=t(28453),a=t(49489),s=t(7227),l=t(96188);const o="public class Solution {\n    public int[] CountBits(int n) {\n        var result = new int[n+1];\n        for (int i = 1; i <= n; i++) {\n            result[i] = result[i >> 1] + (i & 1);\n        }\n        return result;\n    }\n}",u='class Solution(object):\n    def countBits(self, n):\n        """\n        :type n: int\n        :rtype: List[int]\n        """\n        ans = [0] * (n + 1)\n        for i in range(1, n + 1):\n            ans[i] = ans[i >> 1] + (i & 1)\n        return ans',c="/**\n * @param {number} n\n * @return {number[]}\n */\nvar countBitsJs = function(n) {\n    var ans =  [0];\n    for (var i = 1; i<=n; i++) {\n        ans[i] = ans[i >> 1] + (i & 1);\n    }\n    return ans;\n};",d="function countBitsTs(n: number): number[] {\n    var ans = [0];\n    for (var i = 1; i<=n; i++) {\n        ans[i] = ans[i >> 1] + (i & 1);\n    }\n    return ans;\n};",h={title:"338. Counting Bits",slug:"338-counting-bits",description:"Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","bit-manipulation"],keywords:["leetcode","bit-manipulation"],enableComments:!0,draft:!1},p="338. Counting Bits",b={id:"leetcode/bit-manipulation/Counting Bits",title:"338. Counting Bits",description:"Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.",source:"@site/docs/04-leetcode/bit-manipulation/338. Counting Bits.mdx",sourceDirName:"04-leetcode/bit-manipulation",slug:"/leetcode/bit-manipulation/338-counting-bits",permalink:"/docs/leetcode/bit-manipulation/338-counting-bits",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/bit-manipulation/338. Counting Bits.mdx",tags:[{inline:!0,label:"leetcode",permalink:"/docs/tags/leetcode"},{inline:!0,label:"bit-manipulation",permalink:"/docs/tags/bit-manipulation"}],version:"current",lastUpdatedAt:1719026687e3,sidebarPosition:1,frontMatter:{title:"338. Counting Bits",slug:"338-counting-bits",description:"Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","bit-manipulation"],keywords:["leetcode","bit-manipulation"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"191. Number of 1 Bits",permalink:"/docs/leetcode/bit-manipulation/191-number-of-1-bits"},next:{title:"Database",permalink:"/docs/category/database"}},m={},g=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}];function f(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"338-counting-bits",children:"338. Counting Bits"}),"\n",(0,i.jsx)(n.h2,{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",children:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"}),"\n",(0,i.jsxs)(n.p,{children:["Chi ti\u1ebft: ",(0,i.jsx)(n.a,{href:"https://leetcode.com/problems/counting-bits/",children:"https://leetcode.com/problems/counting-bits/"})]}),"\n",(0,i.jsx)(n.admonition,{title:"Y\xeau c\u1ea7u",type:"tip",children:(0,i.jsxs)(n.p,{children:["Given an integer ",(0,i.jsx)(n.code,{children:"n"}),", return an array ",(0,i.jsx)(n.code,{children:"ans"})," of length ",(0,i.jsx)(n.code,{children:"n + 1"})," such that for each ",(0,i.jsx)(n.code,{children:"i (0 <= i <= n)"}),", ",(0,i.jsx)(n.code,{children:"ans[i]"})," is the number of 1's in the binary representation of ",(0,i.jsx)(n.code,{children:"i"}),"."]})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Example 1:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Input: n = 2"}),"\n",(0,i.jsx)(n.li,{children:"Output: [0,1,1]"}),"\n",(0,i.jsx)(n.li,{children:"Explanation:"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-log",children:"0 --\x3e 0\n1 --\x3e 1\n2 --\x3e 10\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Example 2:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Input: n = 5"}),"\n",(0,i.jsx)(n.li,{children:"Output: [0,1,1,2,1,2]"}),"\n",(0,i.jsx)(n.li,{children:"Explanation:"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-log",children:"0 --\x3e 0\n1 --\x3e 1\n2 --\x3e 10\n3 --\x3e 11\n4 --\x3e 100\n5 --\x3e 101\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Constraints:"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"0 <= n <= 105"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Follow up:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["It is very easy to come up with a solution with a runtime of ",(0,i.jsx)(n.code,{children:"O(n log n)"}),". Can you do it in linear time ",(0,i.jsx)(n.code,{children:"O(n)"})," and possibly in a single pass?"]}),"\n",(0,i.jsxs)(n.li,{children:["Can you do it without using any built-in function (i.e., like ",(0,i.jsx)(n.code,{children:"__builtin_popcount"})," in C++)?"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",children:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"}),"\n",(0,i.jsxs)(a.A,{defaultValue:"csharp",groupId:"language",queryString:!0,children:[(0,i.jsx)(s.A,{value:"csharp",label:"C#",children:(0,i.jsx)(l.A,{language:"csharp",showLineNumbers:!0,children:o})}),(0,i.jsx)(s.A,{value:"python",label:"Python",children:(0,i.jsx)(l.A,{language:"python",showLineNumbers:!0,children:u})}),(0,i.jsx)(s.A,{value:"javascript",label:"JavaScript",children:(0,i.jsx)(l.A,{language:"javascript",showLineNumbers:!0,children:c})}),(0,i.jsx)(s.A,{value:"typescript",label:"TypeScript",children:(0,i.jsx)(l.A,{language:"typescript",showLineNumbers:!0,children:d})})]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Tham kh\u1ea3o:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://leetcode.com/submissions/detail/1039509439/",children:"C#"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://leetcode.com/submissions/detail/1039538497/",children:"Python"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://leetcode.com/submissions/detail/1039545417/",children:"JavaScript"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://leetcode.com/submissions/detail/1039547895/",children:"TypeScript"})}),"\n"]})]})}function x(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(f,{...e})}):f(e)}},7227:(e,n,t)=>{t.d(n,{A:()=>s});t(96540);var i=t(18215);const r={tabItem:"tabItem_Ymn6"};var a=t(74848);function s(e){let{children:n,hidden:t,className:s}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,i.A)(r.tabItem,s),hidden:t,children:n})}},49489:(e,n,t)=>{t.d(n,{A:()=>w});var i=t(96540),r=t(18215),a=t(24245),s=t(56347),l=t(36494),o=t(62814),u=t(45167),c=t(69900);function d(e){return i.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,i.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,i.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:i,default:r}}=e;return{value:n,label:t,attributes:i,default:r}}))}(t);return function(e){const n=(0,u.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function b(e){let{queryString:n=!1,groupId:t}=e;const r=(0,s.W6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,o.aZ)(a),(0,i.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(r.location.search);n.set(a,e),r.replace({...r.location,search:n.toString()})}),[a,r])]}function m(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,a=h(e),[s,o]=(0,i.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const i=t.find((e=>e.default))??t[0];if(!i)throw new Error("Unexpected error: 0 tabValues");return i.value}({defaultValue:n,tabValues:a}))),[u,d]=b({queryString:t,groupId:r}),[m,g]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,a]=(0,c.Dv)(t);return[r,(0,i.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:r}),f=(()=>{const e=u??m;return p({value:e,tabValues:a})?e:null})();(0,l.A)((()=>{f&&o(f)}),[f]);return{selectedValue:s,selectValue:(0,i.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),g(e)}),[d,g,a]),tabValues:a}}var g=t(11062);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(74848);function j(e){let{className:n,block:t,selectedValue:i,selectValue:s,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:u}=(0,a.a_)(),c=e=>{const n=e.currentTarget,t=o.indexOf(n),r=l[t].value;r!==i&&(u(n),s(r))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;n=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;n=o[t]??o[o.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":t},n),children:l.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:i===n?0:-1,"aria-selected":i===n,ref:e=>o.push(e),onKeyDown:d,onClick:c,...a,className:(0,r.A)("tabs__item",f.tabItem,a?.className,{"tabs__item--active":i===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:r}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===r));return e?(0,i.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,i.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function y(e){const n=m(e);return(0,x.jsxs)("div",{className:(0,r.A)("tabs-container",f.tabList),children:[(0,x.jsx)(j,{...n,...e}),(0,x.jsx)(v,{...n,...e})]})}function w(e){const n=(0,g.A)();return(0,x.jsx)(y,{...e,children:d(e.children)},String(n))}},24630:(e,n,t)=>{t.d(n,{A:()=>r});var i=t(96540);const r={React:i,...i}}}]);