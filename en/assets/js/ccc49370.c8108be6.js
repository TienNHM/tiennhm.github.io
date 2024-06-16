"use strict";(self.webpackChunktiennhm_github_io=self.webpackChunktiennhm_github_io||[]).push([[3249],{11917:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});n(96540);var i=n(18215),a=n(17153),o=n(18630),s=n(38322),r=n(71866),l=n(85276),c=n(23230),d=n(13555),u=n(74848);function m(e){const{nextItem:t,prevItem:n}=e;return(0,u.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,c.T)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"}),children:[n&&(0,u.jsx)(d.A,{...n,subLabel:(0,u.jsx)(c.A,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post",children:"Newer Post"})}),t&&(0,u.jsx)(d.A,{...t,subLabel:(0,u.jsx)(c.A,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post",children:"Older Post"}),isNext:!0})]})}function h(){const{assets:e,metadata:t}=(0,s.e)(),{title:n,description:i,date:o,tags:r,authors:l,frontMatter:c}=t,{keywords:d}=c,m=e.image??c.image;return(0,u.jsxs)(a.be,{title:n,description:i,keywords:d,image:m,children:[(0,u.jsx)("meta",{property:"og:type",content:"article"}),(0,u.jsx)("meta",{property:"article:published_time",content:o}),l.some((e=>e.url))&&(0,u.jsx)("meta",{property:"article:author",content:l.map((e=>e.url)).filter(Boolean).join(",")}),r.length>0&&(0,u.jsx)("meta",{property:"article:tag",content:r.map((e=>e.label)).join(",")})]})}var g=n(21141),f=n(58806);function p(){const e=(0,f.J)();return(0,u.jsx)(g.A,{children:(0,u.jsx)("script",{type:"application/ld+json",children:JSON.stringify(e)})})}var x=n(98793),v=n(36057);function b(e){let{sidebar:t,children:n}=e;const{metadata:i,toc:a}=(0,s.e)(),{nextItem:o,prevItem:c,frontMatter:d,unlisted:h}=i,{hide_table_of_contents:g,toc_min_heading_level:f,toc_max_heading_level:p}=d;return(0,u.jsxs)(r.A,{sidebar:t,toc:!g&&a.length>0?(0,u.jsx)(x.A,{toc:a,minHeadingLevel:f,maxHeadingLevel:p}):void 0,children:[h&&(0,u.jsx)(v.A,{}),(0,u.jsx)(l.A,{children:n}),(o||c)&&(0,u.jsx)(m,{nextItem:o,prevItem:c})]})}function j(e){const t=e.content;return(0,u.jsx)(s.i,{content:e.content,isBlogPostPage:!0,children:(0,u.jsxs)(a.e3,{className:(0,i.A)(o.G.wrapper.blogPages,o.G.page.blogPostPage),children:[(0,u.jsx)(h,{}),(0,u.jsx)(p,{}),(0,u.jsx)(b,{sidebar:e.sidebar,children:(0,u.jsx)(t,{})})]})})}},98793:(e,t,n)=>{n.d(t,{A:()=>c});n(96540);var i=n(18215),a=n(61507);const o={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var s=n(74848);const r="table-of-contents__link toc-highlight",l="table-of-contents__link--active";function c(e){let{className:t,...n}=e;return(0,s.jsx)("div",{className:(0,i.A)(o.tableOfContents,"thin-scrollbar",t),children:(0,s.jsx)(a.A,{...n,linkClassName:r,linkActiveClassName:l})})}},61507:(e,t,n)=>{n.d(t,{A:()=>f});var i=n(96540),a=n(86957);function o(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const i=n.slice(2,e.level);e.parentIndex=Math.max(...i),n[e.level]=t}));const i=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):i.push(a)})),i}function s(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:i}=e;return t.flatMap((e=>{const t=s({toc:e.children,minHeadingLevel:n,maxHeadingLevel:i});return function(e){return e.level>=n&&e.level<=i}(e)?[{...e,children:t}]:t}))}function r(e){const t=e.getBoundingClientRect();return t.top===t.bottom?r(e.parentNode):t}function l(e,t){let{anchorTopOffset:n}=t;const i=e.find((e=>r(e).top>=n));if(i){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(r(i))?i:e[e.indexOf(i)-1]??null}return e[e.length-1]??null}function c(){const e=(0,i.useRef)(0),{navbar:{hideOnScroll:t}}=(0,a.p)();return(0,i.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function d(e){const t=(0,i.useRef)(void 0),n=c();(0,i.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:i,linkActiveClassName:a,minHeadingLevel:o,maxHeadingLevel:s}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(i),r=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const i=[];for(let a=t;a<=n;a+=1)i.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(i.join()))}({minHeadingLevel:o,maxHeadingLevel:s}),c=l(r,{anchorTopOffset:n.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===d)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,n])}var u=n(14783),m=n(74848);function h(e){let{toc:t,className:n,linkClassName:i,isChild:a}=e;return t.length?(0,m.jsx)("ul",{className:a?void 0:n,children:t.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)(u.A,{to:`#${e.id}`,className:i??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(h,{isChild:!0,toc:e.children,className:n,linkClassName:i})]},e.id)))}):null}const g=i.memo(h);function f(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:r="table-of-contents__link",linkActiveClassName:l,minHeadingLevel:c,maxHeadingLevel:u,...h}=e;const f=(0,a.p)(),p=c??f.tableOfContents.minHeadingLevel,x=u??f.tableOfContents.maxHeadingLevel,v=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,i.useMemo)((()=>s({toc:o(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:p,maxHeadingLevel:x});return d((0,i.useMemo)((()=>{if(r&&l)return{linkClassName:r,linkActiveClassName:l,minHeadingLevel:p,maxHeadingLevel:x}}),[r,l,p,x])),(0,m.jsx)(g,{toc:v,className:n,linkClassName:r,...h})}},36057:(e,t,n)=>{n.d(t,{A:()=>h});n(96540);var i=n(18215),a=n(23230),o=n(21141),s=n(74848);function r(){return(0,s.jsx)(a.A,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function l(){return(0,s.jsx)(a.A,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,s.jsx)(o.A,{children:(0,s.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=n(18630),u=n(54182);function m(e){let{className:t}=e;return(0,s.jsx)(u.A,{type:"caution",title:(0,s.jsx)(r,{}),className:(0,i.A)(t,d.G.common.unlistedBanner),children:(0,s.jsx)(l,{})})}function h(e){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c,{}),(0,s.jsx)(m,{...e})]})}},58806:(e,t,n)=>{n.d(t,{k:()=>d,J:()=>u});var i=n(98180),a=n(97639),o=n(93512);var s=n(38322);const r=e=>new Date(e).toISOString();function l(e){const t=e.map(m);return{author:1===t.length?t[0]:t}}function c(e,t,n){return e?{image:h({imageUrl:t(e,{absolute:!0}),caption:`title image for the blog post: ${n}`})}:{}}function d(e){const{siteConfig:t}=(0,a.A)(),{withBaseUrl:n}=(0,i.hH)(),{metadata:{blogDescription:o,blogTitle:s,permalink:d}}=e,u=`${t.url}${d}`;return{"@context":"https://schema.org","@type":"Blog","@id":u,mainEntityOfPage:u,headline:s,description:o,blogPost:e.items.map((e=>function(e,t,n){const{assets:i,frontMatter:a,metadata:o}=e,{date:s,title:d,description:u,lastUpdatedAt:m}=o,h=i.image??a.image,g=a.keywords??[],f=`${t.url}${o.permalink}`,p=m?r(m):void 0;return{"@type":"BlogPosting","@id":f,mainEntityOfPage:f,url:f,headline:d,name:d,description:u,datePublished:s,...p?{dateModified:p}:{},...l(o.authors),...c(h,n,d),...g?{keywords:g}:{}}}(e.content,t,n)))}}function u(){const e=function(){const e=(0,o.A)(),t=e?.data?.blogMetadata;if(!t)throw new Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return t}(),{assets:t,metadata:n}=(0,s.e)(),{siteConfig:d}=(0,a.A)(),{withBaseUrl:u}=(0,i.hH)(),{date:m,title:h,description:g,frontMatter:f,lastUpdatedAt:p}=n,x=t.image??f.image,v=f.keywords??[],b=p?r(p):void 0,j=`${d.url}${n.permalink}`;return{"@context":"https://schema.org","@type":"BlogPosting","@id":j,mainEntityOfPage:j,url:j,headline:h,name:h,description:g,datePublished:m,...b?{dateModified:b}:{},...l(n.authors),...c(x,u,h),...v?{keywords:v}:{},isPartOf:{"@type":"Blog","@id":`${d.url}${e.blogBasePath}`,name:e.blogTitle}}}function m(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}function h(e){let{imageUrl:t,caption:n}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:n}}},8421:(e,t,n)=>{n.d(t,{A:()=>r});n(96540);var i=n(13955),a=n(7710),o=n(97639),s=n(74848);function r(){const{colorMode:e}=(0,a.G)(),{siteConfig:{customFields:t}}=(0,o.A)();return(0,s.jsx)(i.A,{repo:t.GITHUB_REPO,repoId:t.GITHUB_REPO_ID,category:"General",categoryId:t.GITHUB_CATEGORY_ID,mapping:"title",term:"Discussion",strict:"1",reactionsEnabled:"1",emitMetadata:"1",inputPosition:"top",theme:e,lang:"vi",loading:"lazy",id:"giscus"})}},85276:(e,t,n)=>{n.d(t,{A:()=>L});n(96540);var i=n(38322),a=n(64255),o=n(8421),s=n(11062);const r={shareSocialMedia:"shareSocialMedia_GbU1",shareHeading:"shareHeading_NURz",shareButtons:"shareButtons_xgwB"};var l=n(20053),c=n(27748),d=n(98348),u=n(66369),m=n(89358),h=n(56092),g=n(84758),f=n(7726),p=n(84801),x=n(68964),v=n(99006),b=n(23230),j=n(74848);function A(e){let{isBrowser:t,title:n,...i}=e;return(0,j.jsxs)("div",{className:(0,l.A)(r.shareSocialMedia),children:[(0,j.jsx)("h4",{className:(0,l.A)(r.shareHeading),children:(0,j.jsx)(b.A,{id:"share.section.title",children:"Share this page"})}),(0,j.jsxs)("div",{className:(0,l.A)(r.shareButtons),children:[(0,j.jsx)(c.A,{url:t?window.location.href:"",quote:n,children:(0,j.jsx)(g.A,{size:48,round:!0})}),(0,j.jsx)(d.A,{url:t?window.location.href:"",quote:n,children:(0,j.jsx)(f.A,{size:48,round:!0})}),(0,j.jsx)(u.A,{url:t?window.location.href:"",title:n,children:(0,j.jsx)(p.A,{size:48,round:!0})}),(0,j.jsx)(m.A,{url:t?window.location.href:"",title:n,children:(0,j.jsx)(x.A,{size:48,round:!0})}),(0,j.jsx)(h.A,{url:t?window.location.href:"",title:n,children:(0,j.jsx)(v.A,{size:48,round:!0})})]})]})}function L(e){const{metadata:t,isBlogPostPage:n}=(0,i.e)(),c=(0,s.A)(),{frontMatter:d,slug:u,title:m}=t,{enableComments:h}=d;return(0,j.jsxs)("div",{className:(0,l.A)(r.main),children:[(0,j.jsx)(a.A,{...e}),h&&n&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(A,{isBrowser:c,title:m}),(0,j.jsx)(o.A,{})]})]})}},24630:(e,t,n)=>{n.d(t,{A:()=>a});var i=n(96540);const a={React:i,...i}}}]);