"use strict";(self.webpackChunk_tassoevan_tassoevan_github_io=self.webpackChunk_tassoevan_tassoevan_github_io||[]).push([[542],{9810:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});var a=t(8453),r=t(6540);function c(e){const n=Object.assign({pre:"pre",code:"code"},(0,a.R)(),e.components);return r.createElement(n.pre,null,r.createElement(n.code,{className:"language-js"},"// Basic jQuery plugins initialization\nvar MyNamespace = MyNamespace || {};\n\nMyNamespace.applyPlugins = function (parent) {\n  if (!parent) parent = $('body');\n\n  $('[data-focus=auto]', parent).focus();\n\n  var richEdits = $('textarea[data-rich=true]');\n  if (richEdits.size() > 0) {\n    richEdits.fadeTo(0, 1e-8);\n\n    // head.js used here for instance\n    head.js('/js/vendor/ckeditor/ckeditor.js').ready(function () {\n      richEdits.fadeTo(0, 1).each(function () {\n        $(this).myRichEditorPlugin();\n      });\n    });\n  }\n\n  // more stuff ...\n};\n\n$(function () {\n  MyNamespace.applyPlugins();\n});\n"))}var i=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.R)(),e.components);return n?r.createElement(n,e,r.createElement(c,e)):c(e)},o=t(4387),s=t(6008),u=t(9031),l=t(4615);function d(e){let{pageContext:n,data:t,children:a}=e;const{frontmatter:{title:c,date:i},slug:d,next:f}=n,{excerpt:m,timeToRead:p}=t.mdx;return r.createElement(r.Fragment,null,r.createElement(o.A,{title:c,description:m}),r.createElement(s.A,null,r.createElement(u.A,null),r.createElement(l.A,{slug:d,title:c,date:new Date(Date.parse(i)),timeToRead:Math.ceil(p),next:f},a)))}function f(e){return r.createElement(d,e,r.createElement(i,e))}},9031:function(e,n,t){var a=t(6540),r=t(7581),c=t(8864),i=t(4017);const o=r.default.nav.withConfig({displayName:"NavBar__StyledNavBar",componentId:"sc-yc90xv-0"})(["h1{font-size:1em;font-weight:normal;margin:0;}"]);n.A=function(){const{title:e,description:n}=(0,c.Q)();return a.createElement(o,null,a.createElement("h1",null,a.createElement(i.A,{href:"/",title:n},e)))}},8453:function(e,n,t){t.d(n,{R:function(){return i}});var a=t(6540);const r={},c=a.createContext(r);function i(e){const n=a.useContext(c);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}}}]);
//# sourceMappingURL=component---src-templates-post-tsx-content-file-path-posts-2013-04-05-inicializacao-basica-de-plugins-jquery-mdx-8b90d8755e8341030238.js.map