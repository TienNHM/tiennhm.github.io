"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[4013],{92506:(e,t,a)=>{a.d(t,{Z:()=>E});var l=a(67294),n=a(86010),r=a(70241),s=a(13488),i=a(83699),c=a(97325);const m={sidebar:"sidebar_re4s",sidebarItemTitle:"sidebarItemTitle_pO2u",sidebarItemList:"sidebarItemList_Yudw",sidebarItem:"sidebarItem__DBe",sidebarItemLink:"sidebarItemLink_mo7H",sidebarItemLinkActive:"sidebarItemLinkActive_I1ZP"};function o(e){let{sidebar:t}=e;return l.createElement("aside",{className:"col col--3"},l.createElement("nav",{className:(0,n.Z)(m.sidebar,"thin-scrollbar"),"aria-label":(0,c.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,n.Z)(m.sidebarItemTitle,"margin-bottom--md")},t.title),l.createElement("ul",{className:(0,n.Z)(m.sidebarItemList,"clean-list")},t.items.map((e=>l.createElement("li",{key:e.permalink,className:m.sidebarItem},l.createElement(i.Z,{isNavLink:!0,to:e.permalink,className:m.sidebarItemLink,activeClassName:m.sidebarItemLinkActive},e.title)))))))}var u=a(53086);function g(e){let{sidebar:t}=e;return l.createElement("ul",{className:"menu__list"},t.items.map((e=>l.createElement("li",{key:e.permalink,className:"menu__list-item"},l.createElement(i.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active"},e.title)))))}function b(e){return l.createElement(u.Zo,{component:g,props:e})}function d(e){let{sidebar:t}=e;const a=(0,s.i)();return t?.items.length?"mobile"===a?l.createElement(b,{sidebar:t}):l.createElement(o,{sidebar:t}):null}function E(e){const{sidebar:t,toc:a,children:s,...i}=e,c=t&&t.items.length>0;return l.createElement(r.Z,i,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement(d,{sidebar:t}),l.createElement("main",{className:(0,n.Z)("col",{"col--7":c,"col--9 col--offset-1":!c}),itemScope:!0,itemType:"http://schema.org/Blog"},s),a&&l.createElement("div",{className:"col col--2"},a))))}},23977:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var l=a(67294),n=a(86010),r=a(45565),s=a(79488),i=a(23702),c=a(92506),m=a(86426),o=a(33647);function u(e){let{tags:t,sidebar:a}=e;const u=(0,r.M)();return l.createElement(s.FG,{className:(0,n.Z)(i.k.wrapper.blogPages,i.k.page.blogTagsListPage)},l.createElement(s.d,{title:u}),l.createElement(o.Z,{tag:"blog_tags_list"}),l.createElement(c.Z,{sidebar:a},l.createElement("h1",null,u),l.createElement(m.Z,{tags:t})))}},53852:(e,t,a)=>{a.d(t,{Z:()=>i});var l=a(67294),n=a(86010),r=a(83699);const s={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};function i(e){let{permalink:t,label:a,count:i}=e;return l.createElement(r.Z,{href:t,className:(0,n.Z)(s.tag,i?s.tagWithCount:s.tagRegular)},a,i&&l.createElement("span",null,i))}},86426:(e,t,a)=>{a.d(t,{Z:()=>c});var l=a(67294),n=a(45565),r=a(53852);const s={tag:"tag_Nnez"};function i(e){let{letterEntry:t}=e;return l.createElement("article",null,l.createElement("h2",null,t.letter),l.createElement("ul",{className:"padding--none"},t.tags.map((e=>l.createElement("li",{key:e.permalink,className:s.tag},l.createElement(r.Z,e))))),l.createElement("hr",null))}function c(e){let{tags:t}=e;const a=(0,n.P)(t);return l.createElement("section",{className:"margin-vert--lg"},a.map((e=>l.createElement(i,{key:e.letter,letterEntry:e}))))}},45565:(e,t,a)=>{a.d(t,{M:()=>n,P:()=>r});var l=a(97325);const n=()=>(0,l.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function r(e){const t={};return Object.values(e).forEach((e=>{const a=function(e){return e[0].toUpperCase()}(e.label);t[a]??=[],t[a].push(e)})),Object.entries(t).sort(((e,t)=>{let[a]=e,[l]=t;return a.localeCompare(l)})).map((e=>{let[t,a]=e;return{letter:t,tags:a.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}}}]);