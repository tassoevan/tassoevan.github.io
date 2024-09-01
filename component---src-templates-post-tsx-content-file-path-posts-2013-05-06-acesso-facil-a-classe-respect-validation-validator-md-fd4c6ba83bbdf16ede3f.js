"use strict";(self.webpackChunk_tassoevan_tassoevan_github_io=self.webpackChunk_tassoevan_tassoevan_github_io||[]).push([[410],{1648:function(e,t,n){n.r(t),n.d(t,{Head:function(){return h},default:function(){return p}});var o=n(8453),r=n(6540);function a(e){const t=Object.assign({pre:"pre",code:"code"},(0,o.R)(),e.components);return r.createElement(t.pre,null,r.createElement(t.code,{className:"language-php"},"<?php\n  // Author's recommendation\n  use Respect\\Validation\\Validator as v;\n\n  $number = 123;\n  v::numeric()->validate($number); //true\n\n  // The author method can be a little uncomfortable, because\n  // the 'v' alias will be present in all source code and it\n  // is meaningless according OOP.\n\n  // Here my approach\n  $v = 'Respect\\Validation\\Validator';\n\n  $number = 123;\n  $v::numeric()->validate($number); //true\n"))}var i=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,o.R)(),e.components);return t?r.createElement(t,e,r.createElement(a,e)):a(e)},l=n(7746),c=n(6008),m=n(9031),d=n(4615),s=n(4386);function u(e){let{pageContext:t,data:n,children:o}=e;const{frontmatter:{title:a,date:i},slug:l,next:u}=t;return r.createElement(r.Fragment,null,r.createElement(c.A,{title:a},r.createElement(m.A,{title:s.h.title,description:s.h.description}),r.createElement(d.A,{slug:l,title:a,date:Date.parse(i),timeToRead:Math.ceil(n.mdx.fields.timeToRead.minutes),next:u},o)))}function p(e){return r.createElement(u,e,r.createElement(i,e))}const h=e=>{let{pageContext:t,data:n,children:o}=e;const{frontmatter:{title:a}}=t,{excerpt:i}=n.mdx;return r.createElement(l.A,{title:a,description:i})}},6008:function(e,t,n){n.d(t,{A:function(){return h}});var o=n(6540),r=n(7581);const a="undefined"!=typeof window&&window.matchMedia?e=>{const{0:t,1:n}=(0,o.useState)((()=>matchMedia(e).matches));return(0,o.useEffect)((()=>{const t=matchMedia(e),o=()=>{n(t.matches)};return t.addEventListener("change",o),()=>{t.removeEventListener("change",o)}}),[e]),t}:e=>!1,i=(0,r.css)(["overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto;"]),l=e=>e.theme.isDark?"#ececec":"hsl(0deg, 0%, 30%)",c=e=>e.theme.isDark?"hsl(0deg, 0%, 30%)":"#ececec",m=e=>e.theme.isDark?"hsla(0deg, 0%, 70%, 10%)":"hsla(0deg, 0%, 30%, 10%)",d="rgb(46, 170, 190)",s="rgba(46, 170, 190, 90%)",u=(0,r.createGlobalStyle)(["html{font-size:100%;font-family:Baskerville,'Baskerville Old Face','Goudy Old Style',Garamond,'Times New Roman',serif;scroll-behavior:smooth;}body{font-size:1rem;line-height:1.5;margin:0;color:",";background-color:",";padding:1rem;}h1,h2,h3,h4,h5,h6{line-height:1.1;font-family:inherit;font-weight:700;margin-top:3rem;margin-bottom:1.5rem;","}h1{font-size:2.35em}h2{font-size:2.00em}h3{font-size:1.75em}h4{font-size:1.5em}h5{font-size:1.25em}h6{font-size:1em}p{margin-top:0px;margin-bottom:2.5rem;}small,sub,sup{font-size:75%;}hr{border-color:",";}a{text-decoration:none;color:",";&:hover{color:",";border-bottom:1px dashed ",";}}ul{padding-left:1.4em;margin-top:0px;margin-bottom:2.5rem;}li{margin-bottom:0.4em;}blockquote{font-style:italic;margin-left:1.5em;padding-left:1em;border-left:3px solid ",";}img{height:auto;max-width:100%;margin-top:0px;margin-bottom:2.5rem;}pre{background-color:",";display:block;padding:1em;overflow-x:auto;margin-top:0px;margin-bottom:2.5rem;}code{font-size:0.9em;padding:0 0.5em;background-color:",";white-space:pre-wrap;}pre > code{padding:0;background-color:transparent;white-space:pre;}table{text-align:justify;width:100%;border-collapse:collapse;}td,th{padding:0.5em;border-bottom:1px solid ",";}input,textarea{border:1px solid ",";&:focus{border:1px solid ",';}}textarea{width:100%;}.button,button,input[type="submit"],input[type="reset"],input[type="button"]{display:inline-block;padding:5px 10px;text-align:center;text-decoration:none;white-space:nowrap;background-color:',";color:",";border-radius:1px;border:1px solid ",";cursor:pointer;box-sizing:border-box;&[disabled]{cursor:default;opacity:.5;}&:focus,&:hover{background-color:",";border-color:",";color:",";outline:0;}}textarea,select,input[type]{color:",";padding:6px 10px;margin-bottom:10px;background-color:",";border:1px solid ",";border-radius:4px;box-shadow:none;box-sizing:border-box;&:focus{border:1px solid ",';outline:0;}}input[type="checkbox"]:focus{outline:1px dotted ',";}label,legend,fieldset{display:block;margin-bottom:.5rem;font-weight:600;}"],l,c,i,d,d,s,l,d,m,m,m,l,d,d,c,d,s,s,c,l,m,m,d,d),p=r.default.h1.withConfig({displayName:"Layout__BodyTitle",componentId:"sc-uy8b5k-0"})(["display:none;"]);var h=function(e){let{children:t,title:n}=e;const i=a("(prefers-color-scheme: dark)");return o.createElement(r.ThemeProvider,{theme:{isDark:i}},o.createElement(u,null),o.createElement(p,null,n),t)}},4017:function(e,t,n){var o=n(4794),r=n(6540);t.A=function(e){let{href:t,title:n,children:a}=e;return r.createElement(o.Link,{to:t,title:n},a)}},9031:function(e,t,n){var o=n(6540),r=n(7581),a=n(4017);const i=r.default.nav.withConfig({displayName:"NavBar__StyledNavBar",componentId:"sc-yc90xv-0"})(["h1{font-size:1em;font-weight:normal;margin:0;}"]);t.A=function(e){let{title:t,description:n}=e;return o.createElement(i,null,o.createElement("h1",null,o.createElement(a.A,{href:"/",title:n},t)))}},4615:function(e,t,n){var o=n(6540),r=n(7581),a=n(4017);const i=r.default.div.withConfig({displayName:"Post__StyledPost",componentId:"sc-1lj2z18-0"})(["max-width:38em;margin:0 auto;"]),l=r.default.footer.withConfig({displayName:"Post__NextArticle",componentId:"sc-1lj2z18-1"})(["border-top:1pt dashed currentColor;text-align:right;text-align:end;"]);t.A=function(e){let{title:t,date:n,children:r,timeToRead:c,slug:m,next:d}=e;return o.createElement(i,null,o.createElement("header",null,o.createElement("h2",null,o.createElement(a.A,{href:m},t)),o.createElement("div",null,o.createElement("time",{dateTime:new Date(n).toISOString()},new Intl.DateTimeFormat("pt-BR",{dateStyle:"long",timeStyle:"short"}).format(n))," ","· ",c," ",1===c?"minuto":"minutos")),r&&o.createElement("article",null,r),d&&o.createElement(l,null,o.createElement(a.A,{href:d.slug},d.title)))}},7746:function(e,t,n){var o=n(6540),r=n(4386);t.A=function(e){const t=e.lang||r.h.lang,n=e.title?`${e.title} | ${r.h.title}`:r.h.title,a=e.description||r.h.description,i=r.h.twitterHandle;return o.createElement(o.Fragment,null,o.createElement("html",{lang:t}),o.createElement("title",null,n),o.createElement("meta",{name:"description",content:a}),o.createElement("meta",{property:"og:title",content:n}),o.createElement("meta",{property:"og:description",content:a}),o.createElement("meta",{property:"og:type",content:"website"}),o.createElement("meta",{name:"twitter:card",content:"summary"}),o.createElement("meta",{name:"twitter:creator",content:i}),o.createElement("meta",{name:"twitter:title",content:n}),o.createElement("meta",{name:"twitter:description",content:a}))}},4386:function(e,t,n){n.d(t,{h:function(){return o}});const o={lang:"pt-BR",title:"Tasso & As Vozes",description:"Um lugar calmo e tranquilo onde dialogo com as vozes que habitam a minha cabeça",twitterHandle:"@tassoevan"}},8453:function(e,t,n){n.d(t,{R:function(){return i}});var o=n(6540);const r={},a=o.createContext(r);function i(e){const t=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}}}]);
//# sourceMappingURL=component---src-templates-post-tsx-content-file-path-posts-2013-05-06-acesso-facil-a-classe-respect-validation-validator-md-fd4c6ba83bbdf16ede3f.js.map