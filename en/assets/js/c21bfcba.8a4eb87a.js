"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[715],{81326:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>b,contentTitle:()=>d,default:()=>g,frontMatter:()=>c,metadata:()=>h,toc:()=>m});var i=t(74848),r=t(28453),s=t(49489),a=t(7227),l=t(96188);const o="public class Solution {\n    public int HammingWeight(uint n) {\n        uint result = 0;\n        while (n > 0) {\n            result += n & 1;\n            n = n >> 1;\n        }\n        return (int)result;\n    }\n}",u="function hammingWeight(n: number): number {\n    var result = 0;\n    while (n > 0) {\n        result += n & 1;\n        n = n >>> 1;\n    }\n    return result;\n};",c={title:"191. Number of 1 Bits",slug:"191-number-of-1-bits",description:"Write a function that takes the binary representation of an unsigned integer and returns the number of `1` bits it has (also known as the Hamming weight).",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","bit-manipulation"],keywords:["leetcode","bit-manipulation"],enableComments:!0,draft:!1},d="191. Number of 1 Bits",h={id:"leetcode/bit-manipulation/Number of 1 Bits",title:"191. Number of 1 Bits",description:"Write a function that takes the binary representation of an unsigned integer and returns the number of `1` bits it has (also known as the Hamming weight).",source:"@site/docs/04-leetcode/bit-manipulation/191. Number of 1 Bits.mdx",sourceDirName:"04-leetcode/bit-manipulation",slug:"/leetcode/bit-manipulation/191-number-of-1-bits",permalink:"/en/docs/leetcode/bit-manipulation/191-number-of-1-bits",draft:!1,unlisted:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/bit-manipulation/191. Number of 1 Bits.mdx",tags:[{inline:!0,label:"leetcode",permalink:"/en/docs/tags/leetcode"},{inline:!0,label:"bit-manipulation",permalink:"/en/docs/tags/bit-manipulation"}],version:"current",lastUpdatedAt:1719026687e3,sidebarPosition:1,frontMatter:{title:"191. Number of 1 Bits",slug:"191-number-of-1-bits",description:"Write a function that takes the binary representation of an unsigned integer and returns the number of `1` bits it has (also known as the Hamming weight).",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","bit-manipulation"],keywords:["leetcode","bit-manipulation"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"136. Single Number",permalink:"/en/docs/leetcode/bit-manipulation/136-single-number"},next:{title:"338. Counting Bits",permalink:"/en/docs/leetcode/bit-manipulation/338-counting-bits"}},b={},m=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"191-number-of-1-bits",children:"191. Number of 1 Bits"}),"\n",(0,i.jsx)(n.h2,{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",children:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"}),"\n",(0,i.jsxs)(n.p,{children:["Chi ti\u1ebft: ",(0,i.jsx)(n.a,{href:"https://leetcode.com/problems/number-of-1-bits/",children:"https://leetcode.com/problems/number-of-1-bits/"})]}),"\n",(0,i.jsx)(n.admonition,{title:"Y\xeau c\u1ea7u",type:"tip",children:(0,i.jsxs)(n.p,{children:["Write a function that takes the binary representation of an unsigned integer and returns the number of ",(0,i.jsx)(n.code,{children:"1"})," bits it has (also known as the Hamming weight)."]})}),"\n",(0,i.jsx)(n.p,{children:"Note:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Note that in some languages, such as Java, there is no unsigned integer type. In this case, the input will be given as a signed integer type. It should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned."}),"\n",(0,i.jsx)(n.li,{children:"In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 3, the input represents the signed integer. -3."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Example 1:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Input: ",(0,i.jsx)(n.code,{children:"n = 00000000000000000000000000001011"})]}),"\n",(0,i.jsx)(n.li,{children:"Output: 3"}),"\n",(0,i.jsxs)(n.li,{children:["Explanation: The input binary string ",(0,i.jsx)(n.code,{children:"00000000000000000000000000001011"})," has a total of three '1' bits."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Example 2:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Input: ",(0,i.jsx)(n.code,{children:"n = 00000000000000000000000010000000"})]}),"\n",(0,i.jsx)(n.li,{children:"Output: 1"}),"\n",(0,i.jsxs)(n.li,{children:["Explanation: The input binary string ",(0,i.jsx)(n.code,{children:"00000000000000000000000010000000"})," has a total of one '1' bit."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Example 3:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Input: ",(0,i.jsx)(n.code,{children:"n = 11111111111111111111111111111101"})]}),"\n",(0,i.jsx)(n.li,{children:"Output: 31"}),"\n",(0,i.jsxs)(n.li,{children:["Explanation: The input binary string ",(0,i.jsx)(n.code,{children:"11111111111111111111111111111101"})," has a total of thirty one '1' bits."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Constraints:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The input must be a binary string of length 32."}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Follow up:"})," If this function is called many times, how would you optimize it?"]}),"\n",(0,i.jsx)(n.h2,{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",children:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"}),"\n",(0,i.jsxs)(s.A,{defaultValue:"csharp",groupId:"language",queryString:!0,children:[(0,i.jsx)(a.A,{value:"csharp",label:"C#",children:(0,i.jsx)(l.A,{language:"csharp",showLineNumbers:!0,children:o})}),(0,i.jsx)(a.A,{value:"typescript",label:"TypeScript",children:(0,i.jsx)(l.A,{language:"typescript",showLineNumbers:!0,children:u})})]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Tham kh\u1ea3o:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://leetcode.com/submissions/detail/1040273349/",children:"C#"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://leetcode.com/submissions/detail/1040275362/",children:"TypeScript"})}),"\n"]})]})}function g(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},7227:(e,n,t)=>{t.d(n,{A:()=>a});t(96540);var i=t(18215);const r={tabItem:"tabItem_Ymn6"};var s=t(74848);function a(e){let{children:n,hidden:t,className:a}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,i.A)(r.tabItem,a),hidden:t,children:n})}},49489:(e,n,t)=>{t.d(n,{A:()=>w});var i=t(96540),r=t(18215),s=t(24245),a=t(56347),l=t(36494),o=t(62814),u=t(45167),c=t(69900);function d(e){return i.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,i.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,i.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:i,default:r}}=e;return{value:n,label:t,attributes:i,default:r}}))}(t);return function(e){const n=(0,u.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function b(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const r=(0,a.W6)(),s=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,o.aZ)(s),(0,i.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(r.location.search);n.set(s,e),r.replace({...r.location,search:n.toString()})}),[s,r])]}function p(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,s=h(e),[a,o]=(0,i.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!b({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const i=t.find((e=>e.default))??t[0];if(!i)throw new Error("Unexpected error: 0 tabValues");return i.value}({defaultValue:n,tabValues:s}))),[u,d]=m({queryString:t,groupId:r}),[p,g]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,s]=(0,c.Dv)(t);return[r,(0,i.useCallback)((e=>{t&&s.set(e)}),[t,s])]}({groupId:r}),f=(()=>{const e=u??p;return b({value:e,tabValues:s})?e:null})();(0,l.A)((()=>{f&&o(f)}),[f]);return{selectedValue:a,selectValue:(0,i.useCallback)((e=>{if(!b({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),g(e)}),[d,g,s]),tabValues:s}}var g=t(11062);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(74848);function j(e){let{className:n,block:t,selectedValue:i,selectValue:a,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:u}=(0,s.a_)(),c=e=>{const n=e.currentTarget,t=o.indexOf(n),r=l[t].value;r!==i&&(u(n),a(r))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;n=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;n=o[t]??o[o.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":t},n),children:l.map((e=>{let{value:n,label:t,attributes:s}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:i===n?0:-1,"aria-selected":i===n,ref:e=>o.push(e),onKeyDown:d,onClick:c,...s,className:(0,r.A)("tabs__item",f.tabItem,s?.className,{"tabs__item--active":i===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:r}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===r));return e?(0,i.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,i.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function y(e){const n=p(e);return(0,x.jsxs)("div",{className:(0,r.A)("tabs-container",f.tabList),children:[(0,x.jsx)(j,{...n,...e}),(0,x.jsx)(v,{...n,...e})]})}function w(e){const n=(0,g.A)();return(0,x.jsx)(y,{...e,children:d(e.children)},String(n))}},24630:(e,n,t)=>{t.d(n,{A:()=>r});var i=t(96540);const r={React:i,...i}}}]);