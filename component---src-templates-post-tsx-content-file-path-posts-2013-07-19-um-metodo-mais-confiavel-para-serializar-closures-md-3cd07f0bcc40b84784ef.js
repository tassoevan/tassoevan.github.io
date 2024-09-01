"use strict";(self.webpackChunk_tassoevan_tassoevan_github_io=self.webpackChunk_tassoevan_tassoevan_github_io||[]).push([[407],{203:function(e,t,n){n.r(t),n.d(t,{Head:function(){return p},default:function(){return $}});var r=n(8453),o=n(6540);function a(e){const t=Object.assign({pre:"pre",code:"code"},(0,r.R)(),e.components);return o.createElement(t.pre,null,o.createElement(t.code,{className:"language-php"},"<?php\n/**\n* Serializes a closure as string\n* @param \\Closure $closure\n* @return string\n*/\nfunction serializeClosure(\\Closure $closure) {\n$ref = new ReflectionFunction($closure);\n$tokens = token_get_all(file_get_contents($ref->getFileName()));\n\n$tokensCount = count($tokens);\n$start = false;\n$end = $tokensCount;\n\nfor ( $i = 0; $i < $tokensCount; ++$i ) {\n  if ( is_array($tokens[$i]) && $tokens[$i][0] === T_FUNCTION && $tokens[$i][2] == $ref->getStartLine() ) {\n    $start = $i;\n    break;\n  }\n}\n\nfor ( $i = $start; $i < $tokensCount; ++$i ) {\n  if ( is_array($tokens[$i]) && $tokens[$i][2] > $ref->getEndLine() ) {\n    $end = $i - 1;\n    break;\n  }\n}\n\n$tokens = array_slice($tokens, $start, $end);\n\n$replaceToken = function($a) { return is_array($a) ? $a[1] : $a; };\n\nwhile ( count($tokens) > 0 && $tokens[0][0] === T_FUNCTION ) {\n\n  if ( !getNesting($parameters, $tokens, '(', ')') ) // does not have parameters\n    break;\n\n  if ( !getNesting($body, $tokens, '{', '}', $parameters['end']) ) // does not have body\n    break;\n\n  if ( ($use_idx = findToken($tokens, T_USE, $parameters['end'] + 2, $body['start'] - 2)) !== false )\n    getNesting($use, $tokens, '(', ')', $use_idx);\n\n  if ( findToken($tokens, T_STRING, 0, $parameters['start']) === false ) { // is anonymous function\n    while ( getNesting($tmp, $body['tokens'], T_STATIC, ';') ) {\n      $tmp['start']--;\n      $tmp['end']++;\n      array_splice($body['tokens'], $tmp['start'], $tmp['end']);\n    }\n\n    if ( !isset($use) )\n      $use = array();\n\n    $closure = compact('parameters', 'use', 'body');\n\n    $variables = $ref->getStaticVariables();\n\n    $source = \"return function(\" . implode('', array_map($replaceToken, $closure['parameters']['tokens'])) .  \") \";\n    if ( !empty($closure['use']['tokens']) ) {\n      $useParams = array_map('trim', explode(',', implode('', array_map($replaceToken, $closure['use']['tokens']))));\n\n      foreach ( $useParams as $param ) {\n        if ( $param[0] == '$')\n          $source = \"$param = \" . var_export($variables[substr($param, 1)], true) . \";\\n$source\";\n      }\n\n      $source .= \"use(\" . implode(', ', $useParams) .  \") \";\n    }\n\n    $source .= \"{\" .  implode('', array_map($replaceToken, $closure['body']['tokens'])) . \"};\";\n\n    $test = function($ref) use($source) {\n      $newClosure = eval($source);\n      $newRef = new ReflectionFunction($newClosure);\n\n      return ( array_map(function($a) { return $a->getName(); }, $newRef->getParameters()) == array_map(function($a) { return $a->getName(); }, $newRef->getParameters()) );\n    };\n\n    if ( $test($ref) )\n      return $source;\n  }\n\n  $function_idx = findToken($tokens, T_FUNCTION, $body['end'] + 2);\n\n  $tokens = $function_idx === false ? array() : array_slice($tokens, $function_idx);\n}\n\nreturn null;\n}\n\nfunction findToken(array $tokens, $needle, $start = 0, $end = PHP_INT_MAX)\n{\n$idx = false;\nfor ( $i = $start, $end = min($end, count($tokens)); $i < $end; ++$i ) {\n  if ( (is_int($needle) && is_array($tokens[$i]) && $tokens[$i][0] === $needle) ||\n    is_string($needle) && is_string($tokens[$i]) && $tokens[$i] === $needle ) {\n    $idx = $i;\n    break;\n  }\n}\n\nreturn $idx;\n}\n\nfunction getNesting(&$matches, array $tokens, $begin = '{', $end = '}', $offset = 0)\n{\n$level = 0;\n$start = false;\n\nfor ( $i = $offset, $count = count($tokens); $i < $count; ++$i ) {\n  if ( is_array($tokens[$i]) ? ($tokens[$i][0] === $begin) : ($tokens[$i] === $begin) ) {\n    ++$level;\n    if ( $start === false )\n      $start = $i + 1;\n  }\n  elseif ( is_array($tokens[$i]) ? ($tokens[$i][0] === $end) : ($tokens[$i] === $end) ) {\n    if ( $start === false )\n      break;\n\n    if ( --$level == 0 ) {\n      $matches = array(\n        'tokens' => array_slice($tokens, $start, $i - $start),\n        'start' => $start,\n        'end' => $i - 1\n      );\n      return true;\n    }\n  }\n}\n\n$matches = null;\nreturn false;\n}\n"))}var i=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.R)(),e.components);return t?o.createElement(t,e,o.createElement(a,e)):a(e)},s=n(7746),l=n(6008),c=n(9031),d=n(4615),m=n(4386);function u(e){let{pageContext:t,data:n,children:r}=e;const{frontmatter:{title:a,date:i},slug:s,next:u}=t;return o.createElement(o.Fragment,null,o.createElement(l.A,{title:a},o.createElement(c.A,{title:m.h.title,description:m.h.description}),o.createElement(d.A,{slug:s,title:a,date:Date.parse(i),timeToRead:Math.ceil(n.mdx.fields.timeToRead.minutes),next:u},r)))}function $(e){return o.createElement(u,e,o.createElement(i,e))}const p=e=>{let{pageContext:t,data:n,children:r}=e;const{frontmatter:{title:a}}=t,{excerpt:i}=n.mdx;return o.createElement(s.A,{title:a,description:i})}},6008:function(e,t,n){n.d(t,{A:function(){return p}});var r=n(6540),o=n(7581);const a="undefined"!=typeof window&&window.matchMedia?e=>{const{0:t,1:n}=(0,r.useState)((()=>matchMedia(e).matches));return(0,r.useEffect)((()=>{const t=matchMedia(e),r=()=>{n(t.matches)};return t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}}),[e]),t}:e=>!1,i=(0,o.css)(["overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto;"]),s=e=>e.theme.isDark?"#ececec":"hsl(0deg, 0%, 30%)",l=e=>e.theme.isDark?"hsl(0deg, 0%, 30%)":"#ececec",c=e=>e.theme.isDark?"hsla(0deg, 0%, 70%, 10%)":"hsla(0deg, 0%, 30%, 10%)",d="rgb(46, 170, 190)",m="rgba(46, 170, 190, 90%)",u=(0,o.createGlobalStyle)(["html{font-size:100%;font-family:Baskerville,'Baskerville Old Face','Goudy Old Style',Garamond,'Times New Roman',serif;scroll-behavior:smooth;}body{font-size:1rem;line-height:1.5;margin:0;color:",";background-color:",";padding:1rem;}h1,h2,h3,h4,h5,h6{line-height:1.1;font-family:inherit;font-weight:700;margin-top:3rem;margin-bottom:1.5rem;","}h1{font-size:2.35em}h2{font-size:2.00em}h3{font-size:1.75em}h4{font-size:1.5em}h5{font-size:1.25em}h6{font-size:1em}p{margin-top:0px;margin-bottom:2.5rem;}small,sub,sup{font-size:75%;}hr{border-color:",";}a{text-decoration:none;color:",";&:hover{color:",";border-bottom:1px dashed ",";}}ul{padding-left:1.4em;margin-top:0px;margin-bottom:2.5rem;}li{margin-bottom:0.4em;}blockquote{font-style:italic;margin-left:1.5em;padding-left:1em;border-left:3px solid ",";}img{height:auto;max-width:100%;margin-top:0px;margin-bottom:2.5rem;}pre{background-color:",";display:block;padding:1em;overflow-x:auto;margin-top:0px;margin-bottom:2.5rem;}code{font-size:0.9em;padding:0 0.5em;background-color:",";white-space:pre-wrap;}pre > code{padding:0;background-color:transparent;white-space:pre;}table{text-align:justify;width:100%;border-collapse:collapse;}td,th{padding:0.5em;border-bottom:1px solid ",";}input,textarea{border:1px solid ",";&:focus{border:1px solid ",';}}textarea{width:100%;}.button,button,input[type="submit"],input[type="reset"],input[type="button"]{display:inline-block;padding:5px 10px;text-align:center;text-decoration:none;white-space:nowrap;background-color:',";color:",";border-radius:1px;border:1px solid ",";cursor:pointer;box-sizing:border-box;&[disabled]{cursor:default;opacity:.5;}&:focus,&:hover{background-color:",";border-color:",";color:",";outline:0;}}textarea,select,input[type]{color:",";padding:6px 10px;margin-bottom:10px;background-color:",";border:1px solid ",";border-radius:4px;box-shadow:none;box-sizing:border-box;&:focus{border:1px solid ",';outline:0;}}input[type="checkbox"]:focus{outline:1px dotted ',";}label,legend,fieldset{display:block;margin-bottom:.5rem;font-weight:600;}"],s,l,i,d,d,m,s,d,c,c,c,s,d,d,l,d,m,m,l,s,c,c,d,d),$=o.default.h1.withConfig({displayName:"Layout__BodyTitle",componentId:"sc-uy8b5k-0"})(["display:none;"]);var p=function(e){let{children:t,title:n}=e;const i=a("(prefers-color-scheme: dark)");return r.createElement(o.ThemeProvider,{theme:{isDark:i}},r.createElement(u,null),r.createElement($,null,n),t)}},4017:function(e,t,n){var r=n(4794),o=n(6540);t.A=function(e){let{href:t,title:n,children:a}=e;return o.createElement(r.Link,{to:t,title:n},a)}},9031:function(e,t,n){var r=n(6540),o=n(7581),a=n(4017);const i=o.default.nav.withConfig({displayName:"NavBar__StyledNavBar",componentId:"sc-yc90xv-0"})(["h1{font-size:1em;font-weight:normal;margin:0;}"]);t.A=function(e){let{title:t,description:n}=e;return r.createElement(i,null,r.createElement("h1",null,r.createElement(a.A,{href:"/",title:n},t)))}},4615:function(e,t,n){var r=n(6540),o=n(7581),a=n(4017);const i=o.default.div.withConfig({displayName:"Post__StyledPost",componentId:"sc-1lj2z18-0"})(["max-width:38em;margin:0 auto;"]),s=o.default.footer.withConfig({displayName:"Post__NextArticle",componentId:"sc-1lj2z18-1"})(["border-top:1pt dashed currentColor;text-align:right;text-align:end;"]);t.A=function(e){let{title:t,date:n,children:o,timeToRead:l,slug:c,next:d}=e;return r.createElement(i,null,r.createElement("header",null,r.createElement("h2",null,r.createElement(a.A,{href:c},t)),r.createElement("div",null,r.createElement("time",{dateTime:new Date(n).toISOString()},new Intl.DateTimeFormat("pt-BR",{dateStyle:"long",timeStyle:"short"}).format(n))," ","· ",l," ",1===l?"minuto":"minutos")),o&&r.createElement("article",null,o),d&&r.createElement(s,null,r.createElement(a.A,{href:d.slug},d.title)))}},7746:function(e,t,n){var r=n(6540),o=n(4386);t.A=function(e){const t=e.lang||o.h.lang,n=e.title?`${e.title} | ${o.h.title}`:o.h.title,a=e.description||o.h.description,i=o.h.twitterHandle;return r.createElement(r.Fragment,null,r.createElement("html",{lang:t}),r.createElement("title",null,n),r.createElement("meta",{name:"description",content:a}),r.createElement("meta",{property:"og:title",content:n}),r.createElement("meta",{property:"og:description",content:a}),r.createElement("meta",{property:"og:type",content:"website"}),r.createElement("meta",{name:"twitter:card",content:"summary"}),r.createElement("meta",{name:"twitter:creator",content:i}),r.createElement("meta",{name:"twitter:title",content:n}),r.createElement("meta",{name:"twitter:description",content:a}))}},4386:function(e,t,n){n.d(t,{h:function(){return r}});const r={lang:"pt-BR",title:"Tasso & As Vozes",description:"Um lugar calmo e tranquilo onde dialogo com as vozes que habitam a minha cabeça",twitterHandle:"@tassoevan"}},8453:function(e,t,n){n.d(t,{R:function(){return i}});var r=n(6540);const o={},a=r.createContext(o);function i(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}}}]);
//# sourceMappingURL=component---src-templates-post-tsx-content-file-path-posts-2013-07-19-um-metodo-mais-confiavel-para-serializar-closures-md-3cd07f0bcc40b84784ef.js.map