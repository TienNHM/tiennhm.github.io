"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[4446],{18679:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(67294),r=n(86010);const i={tabItem:"tabItem_Ymn6"};function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,l),hidden:n},t)}},73992:(e,t,n)=>{n.d(t,{Z:()=>N});var a=n(87462),r=n(67294),i=n(86010),l=n(72957),u=n(16550),o=n(75238),s=n(33609),c=n(92560);function m(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,s.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:n}=e;const a=(0,u.k6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o._X)(i),(0,r.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(a.location.search);t.set(i,e),a.replace({...a.location,search:t.toString()})}),[i,a])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,i=p(e),[l,u]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:i}))),[o,s]=b({queryString:n,groupId:a}),[m,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,i]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:a}),g=(()=>{const e=o??m;return d({value:e,tabValues:i})?e:null})();(0,r.useLayoutEffect)((()=>{g&&u(g)}),[g]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!d({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);u(e),s(e),h(e)}),[s,h,i]),tabValues:i}}var g=n(51048);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function k(e){let{className:t,block:n,selectedValue:u,selectValue:o,tabValues:s}=e;const c=[],{blockElementScrollPositionUntilNextRender:m}=(0,l.o5)(),p=e=>{const t=e.currentTarget,n=c.indexOf(t),a=s[n].value;a!==u&&(m(t),o(a))},d=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},t)},s.map((e=>{let{value:t,label:n,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:u===t?0:-1,"aria-selected":u===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:p},l,{className:(0,i.Z)("tabs__item",f.tabItem,l?.className,{"tabs__item--active":u===t})}),n??t)})))}function y(e){let{lazy:t,children:n,selectedValue:a}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},i.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function v(e){const t=h(e);return r.createElement("div",{className:(0,i.Z)("tabs-container",f.tabList)},r.createElement(k,(0,a.Z)({},e,t)),r.createElement(y,(0,a.Z)({},e,t)))}function N(e){const t=(0,g.Z)();return r.createElement(v,(0,a.Z)({key:String(t)},e))}},88263:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294);const r={React:a,...a}},96333:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>m,default:()=>f,frontMatter:()=>c,metadata:()=>p,toc:()=>b});var a=n(87462),r=(n(67294),n(3905)),i=n(73992),l=n(18679),u=n(57130);const o="public class Solution {\n    public int SingleNumber(int[] nums) {\n        int result = 0;\n        foreach (var num in nums) {\n            result = result ^ num;\n        }\n        return result;\n    }\n}",s="function singleNumber(nums: number[]): number {\n    var result = 0;\n    nums.forEach(x => result = result ^ x)\n    return result;\n};",c={title:"136. Single Number",slug:"136-single-number",description:"Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","bit-manipulation"],keywords:["leetcode","bit-manipulation"],enableComments:!0,draft:!1},m="136. Single Number",p={unversionedId:"leetcode/bit-manipulation/Single Number",id:"leetcode/bit-manipulation/Single Number",title:"136. Single Number",description:"Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.",source:"@site/docs/04-leetcode/bit-manipulation/136. Single Number.mdx",sourceDirName:"04-leetcode/bit-manipulation",slug:"/leetcode/bit-manipulation/136-single-number",permalink:"/en/docs/leetcode/bit-manipulation/136-single-number",draft:!1,editUrl:"https://github.com/TienNHM/tiennhm.github.io/tree/master/docs/04-leetcode/bit-manipulation/136. Single Number.mdx",tags:[{label:"leetcode",permalink:"/en/docs/tags/leetcode"},{label:"bit-manipulation",permalink:"/en/docs/tags/bit-manipulation"}],version:"current",lastUpdatedAt:1702222766,formattedLastUpdatedAt:"Dec 10, 2023",sidebarPosition:1,frontMatter:{title:"136. Single Number",slug:"136-single-number",description:"Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.",image:"https://leetcode.com/static/images/LeetCode_Sharing.png",sidebar_position:1,sidebar_class_name:"hidden",tags:["leetcode","bit-manipulation"],keywords:["leetcode","bit-manipulation"],enableComments:!0,draft:!1},sidebar:"tutorialSidebar",previous:{title:"Bit manipulation",permalink:"/en/docs/category/bit-manipulation"},next:{title:"191. Number of 1 Bits",permalink:"/en/docs/leetcode/bit-manipulation/191-number-of-1-bits"}},d={},b=[{value:"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n",id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n",level:2},{value:"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n",id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n",level:2}],h={toc:b},g="wrapper";function f(e){let{components:t,...n}=e;return(0,r.kt)(g,(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"136-single-number"},"136. Single Number"),(0,r.kt)("h2",{id:"gi\u1edbi-thi\u1ec7u-b\xe0i-to\xe1n"},"Gi\u1edbi thi\u1ec7u b\xe0i to\xe1n"),(0,r.kt)("p",null,"Chi ti\u1ebft: ",(0,r.kt)("a",{parentName:"p",href:"https://leetcode.com/problems/single-number/"},"https://leetcode.com/problems/single-number/")),(0,r.kt)("admonition",{title:"Y\xeau c\u1ea7u",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Given a non-empty array of integers ",(0,r.kt)("inlineCode",{parentName:"p"},"nums"),", every element appears twice except for one. Find that single one."),(0,r.kt)("p",{parentName:"admonition"},"You must implement a solution with a linear runtime complexity and use only constant extra space.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 1:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Input: ",(0,r.kt)("inlineCode",{parentName:"li"},"nums")," = ","[2,2,1]"),(0,r.kt)("li",{parentName:"ul"},"Output: 1")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 2:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Input: ",(0,r.kt)("inlineCode",{parentName:"li"},"nums")," = ","[4,1,2,1,2]"),(0,r.kt)("li",{parentName:"ul"},"Output: 4")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 3:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Input: ",(0,r.kt)("inlineCode",{parentName:"li"},"nums")," = ","[1]"),(0,r.kt)("li",{parentName:"ul"},"Output: 1")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Constraints:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"1 <= nums.length <= 3 * 10^4")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"3 * 104 <= nums[i] <= 3 * 10^4")),(0,r.kt)("li",{parentName:"ul"},"Each element in the array appears twice except for one element which appears only once.")),(0,r.kt)("h2",{id:"gi\u1ea3i-quy\u1ebft-b\xe0i-to\xe1n"},"Gi\u1ea3i quy\u1ebft b\xe0i to\xe1n"),(0,r.kt)(i.Z,{defaultValue:"csharp",groupId:"language",queryString:!0,mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"csharp",label:"C#",mdxType:"TabItem"},(0,r.kt)(u.Z,{language:"csharp",showLineNumbers:!0,mdxType:"CodeBlock"},o)),(0,r.kt)(l.Z,{value:"typescript",label:"TypeScript",mdxType:"TabItem"},(0,r.kt)(u.Z,{language:"typescript",showLineNumbers:!0,mdxType:"CodeBlock"},s))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Tham kh\u1ea3o:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://leetcode.com/submissions/detail/1040259402/"},"C#")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://leetcode.com/submissions/detail/1040263083/"},"TypeScript"))))}f.isMDXComponent=!0}}]);