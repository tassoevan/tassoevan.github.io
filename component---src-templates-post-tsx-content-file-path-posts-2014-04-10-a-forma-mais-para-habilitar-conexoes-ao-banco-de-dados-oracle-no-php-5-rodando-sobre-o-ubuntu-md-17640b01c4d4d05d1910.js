"use strict";(self.webpackChunk_tassoevan_tassoevan_github_io=self.webpackChunk_tassoevan_tassoevan_github_io||[]).push([[295],{8882:function(e,t,n){n.r(t),n.d(t,{Head:function(){return E},default:function(){return p}});var l=n(8453),a=n(6540);function o(e){const t=Object.assign({p:"p",a:"a",ul:"ul",li:"li",h1:"h1",ol:"ol",code:"code",em:"em",hr:"hr"},(0,l.R)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.p,null,"Este artigo está disponível como ",a.createElement(t.a,{href:"https://gist.github.com/tassoevan/10392954"},"um gist"),". Sinta-se livre para contribuir."),"\n",a.createElement(t.p,null,"Agradecimentos especiais para:"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://twitter.com/coolaj86"},"AJ ONeal")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"http://hsiaosiyuan.com/wp/"},"Hsiao Siyuan")),"\n"),"\n",a.createElement(t.h1,null,"Primeiro passo: Instalação do cliente Oracle"),"\n",a.createElement(t.ol,null,"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Faça o download do Instant Client em ",a.createElement(t.a,{href:"http://www.oracle.com/technetwork/indexes/downloads/index.html#database"},"http://www.oracle.com/technetwork/indexes/downloads/index.html#database")," (você deve ter um usuário registrado no site da Oracle; o registro é gratuito). Você precisa dos arquivos ",a.createElement(t.code,null,"instantclient-basic-*-*.zip")," e ",a.createElement(t.code,null,"instantclient-sdk-*-*.zip"),"."),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Execute os seguintes comandos no seu terminal:"),"\n",a.createElement(t.p,null,"$ sudo su -\n$ mkdir -p /opt/oracle/instantclient\n$ cd /opt/oracle/instantclient"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Copie os arquivos baixados em ",a.createElement(t.code,null,"/opt/oracle/instantclient"),"."),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Descompacte os arquivos executando estes comandos:"),"\n",a.createElement(t.p,null,"$ unzip instantclient-basic-",a.createElement(t.em,null,"-"),".zip\n$ unzip instantclient-sdk-",a.createElement(t.em,null,"-"),".zip"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Mova todos o conteúdo de ",a.createElement(t.code,null,"/opt/oracle/instantclient/instantclient")," para ",a.createElement(t.code,null,"/opt/oracle/instantclient"),":"),"\n",a.createElement(t.p,null,"$ mv instantclient*/* ./\n$ rmdir instantclient*/"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Durante a compilação do código da extensão, alguns erros podem surgir quando forem resolvidas as dependências de algumas libraries. Para evitá-los, faça:"),"\n",a.createElement(t.p,null,"$ ln -s libclntsh.so.* libclntsh.so\n$ ln -s libocci.so.* libocci.so\n$ echo /opt/oracle/instantclient >> /etc/ld.so.conf\n$ ldconfig"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Crie um diretório para seus arquivos de configuração de rede:"),"\n",a.createElement(t.p,null,"$ mkdir -p network/admin"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Coloque os arquivos ",a.createElement(t.code,null,"sqlnet.ora")," e ",a.createElement(t.code,null,"tnsnames.ora")," em ",a.createElement(t.code,null,"/opt/oracle/instantclient/network/admin"),"."),"\n"),"\n"),"\n",a.createElement(t.p,null,"Agora você tem o kit básico para conexões e acesso à SDK para compilar extensões PHP com Oracle."),"\n",a.createElement(t.h1,null,"Segundo passo: Instalação da extensão PHP OCI8"),"\n",a.createElement(t.ol,null,"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Pegue todos os pacotes essenciais para baixar e compilar a partir de repositórios PEAR:"),"\n",a.createElement(t.p,null,"$ apt-get install --yes php5 php5-cli php5-dev php-db php-pear\n$ apt-get install --yes build-essential libaio1"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Requisite a instalação do OCI8:"),"\n",a.createElement(t.p,null,"$ pecl install oci8"),"\n",a.createElement(t.p,null,"Digite ",a.createElement(t.code,null,"instantclient,/opt/oracle/instantclient")," quando perguntado pelo local de instalação do Instant Client."),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Salve este texto em ",a.createElement(t.code,null,"/etc/php5/mods-available/oci8.ini"),":"),"\n",a.createElement(t.p,null,"extension=oci8.so"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Ative a extensão:"),"\n",a.createElement(t.p,null,"$ php5enmod oci8"),"\n"),"\n"),"\n",a.createElement(t.p,null,"Agora você tem todas as funções PHP ",a.createElement(t.code,null,"oci_*")," disponíveis tanto via php-cli quanto via Apache."),"\n",a.createElement(t.h1,null,"Terceiro passo: Instalação da extensão PHP PDO/OCI"),"\n",a.createElement(t.p,null,"A biblioteca ",a.createElement(t.code,null,"pdo_oci"),' está desatualizada, então sua instalação é mais "engenhosa".'),"\n",a.createElement(t.ol,null,"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Corrija alguns caminhos de arquivo:"),"\n",a.createElement(t.p,null,"$ cd /usr/include/\n$ ln -s php5 php\n$ cd /opt/oracle/instantclient\n$ mkdir -p include/oracle/11.1/\n$ cd include/oracle/11.1/\n$ ln -s ../../../sdk/include client\n$ cd -\n$ mkdir -p lib/oracle/11.1/client\n$ cd lib/oracle/11.1/client\n$ ln -s ../../../../ lib\n$ cd -"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Baixe a ",a.createElement(t.code,null,"pdo_oci")," via ",a.createElement(t.code,null,"pecl"),":"),"\n",a.createElement(t.p,null,"$ pecl channel-update pear.php.net\n$ mkdir -p /tmp/pear/download/\n$ cd /tmp/pear/download/\n$ pecl download pdo_oci"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Extraia o código-fonte:"),"\n",a.createElement(t.p,null,"$ tar xvf PDO_OCI*.tgz\n$ cd PDO_OCI*"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Crie um arquivo chamado ",a.createElement(t.code,null,"config.m4.patch"),":"),"\n",a.createElement(t.p,null,"*** config.m4   2005-09-24 17:23:24.000000000 -0600\n--- /home/myuser/Desktop/PDO_OCI-1.0/config.m4  2009-07-07 17:32:14.000000000 -0600"),"\n",a.createElement(t.hr),"\n",a.createElement(t.p,null,'*** 7,12 ****\n--- 7,14 ----\nif test -s "$PDO_OCI_DIR/orainst/unix.rgs"; then\nPDO_OCI_VERSION=',a.createElement(t.code,null,"grep '\"ocommon\"' $PDO_OCI_DIR/orainst/unix.rgs | sed 's/[ ][ ]*/:/g' | cut -d: -f 6 | cut -c 2-4"),'\ntest -z "$PDO_OCI_VERSION" && PDO_OCI_VERSION=7.3'),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"elif test -f $PDO_OCI_DIR/lib/libclntsh.$SHLIB_SUFFIX_NAME.11.1; then"),"\n",a.createElement(t.li,null,"PDO_OCI_VERSION=11.1\nelif test -f $PDO_OCI_DIR/lib/libclntsh.$SHLIB_SUFFIX_NAME.10.1; then\nPDO_OCI_VERSION=10.1\nelif test -f $PDO_OCI_DIR/lib/libclntsh.$SHLIB_SUFFIX_NAME.9.0; then"),"\n"),"\n",a.createElement(t.hr),"\n",a.createElement(t.p,null,"*** 119,124 ****\n--- 121,129 ----\n10.2)\nPHP_ADD_LIBRARY(clntsh, 1, PDO_OCI_SHARED_LIBADD)\n;;"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"11.1)"),"\n",a.createElement(t.li,null,"PHP_ADD_LIBRARY(clntsh, 1, PDO_OCI_SHARED_LIBADD)"),"\n",a.createElement(t.li,null,";;\n*)\nAC_MSG_ERROR(Unsupported Oracle version! $PDO_OCI_VERSION)\n;;\n#EOF"),"\n"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Aplique o patch:"),"\n",a.createElement(t.p,null,"$ patch --dry-run -i config.m4.patch && patch -i config.m4.patch && phpize"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Substitua todas as referências de ",a.createElement(t.code,null,"function_entry")," para ",a.createElement(t.code,null,"zend_function_entry")," em ",a.createElement(t.code,null,"pdo_oci.c"),"."),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Configure, compile e instale:"),"\n",a.createElement(t.p,null,"$ ORACLE_HOME=/opt/oracle/instantclient ./configure --with-pdo-oci=instantclient,/opt/oracle/instantclient,11.1\n$ make && make test && make install && mv modules/pdo_oci.so /usr/lib/php5/*+lfs/"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Salve este texto em ",a.createElement(t.code,null,"/etc/php5/mods-available/pdo_oci.ini"),":"),"\n",a.createElement(t.p,null,"extension=pdo_oci.so"),"\n"),"\n",a.createElement(t.li,null,"\n",a.createElement(t.p,null,"Ative a extensão:"),"\n",a.createElement(t.p,null,"$ php5enmod pdo_oci"),"\n"),"\n"),"\n",a.createElement(t.p,null,"E agora você pode pegar uma xícara de café."))}var r=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.R)(),e.components);return t?a.createElement(t,e,a.createElement(o,e)):o(e)},i=n(7746),c=n(6008),m=n(9031),s=n(4615),u=n(4386);function d(e){let{pageContext:t,data:n,children:l}=e;const{frontmatter:{title:o,date:r},slug:i,next:d}=t;return a.createElement(a.Fragment,null,a.createElement(c.A,{title:o},a.createElement(m.A,{title:u.h.title,description:u.h.description}),a.createElement(s.A,{slug:i,title:o,date:Date.parse(r),timeToRead:Math.ceil(n.mdx.fields.timeToRead.minutes),next:d},l)))}function p(e){return a.createElement(d,e,a.createElement(r,e))}const E=e=>{let{pageContext:t,data:n,children:l}=e;const{frontmatter:{title:o}}=t,{excerpt:r}=n.mdx;return a.createElement(i.A,{title:o,description:r})}},6008:function(e,t,n){n.d(t,{A:function(){return E}});var l=n(6540),a=n(7581);const o="undefined"!=typeof window&&window.matchMedia?e=>{const{0:t,1:n}=(0,l.useState)((()=>matchMedia(e).matches));return(0,l.useEffect)((()=>{const t=matchMedia(e),l=()=>{n(t.matches)};return t.addEventListener("change",l),()=>{t.removeEventListener("change",l)}}),[e]),t}:e=>!1,r=(0,a.css)(["overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto;"]),i=e=>e.theme.isDark?"#ececec":"hsl(0deg, 0%, 30%)",c=e=>e.theme.isDark?"hsl(0deg, 0%, 30%)":"#ececec",m=e=>e.theme.isDark?"hsla(0deg, 0%, 70%, 10%)":"hsla(0deg, 0%, 30%, 10%)",s="rgb(46, 170, 190)",u="rgba(46, 170, 190, 90%)",d=(0,a.createGlobalStyle)(["html{font-size:100%;font-family:Baskerville,'Baskerville Old Face','Goudy Old Style',Garamond,'Times New Roman',serif;scroll-behavior:smooth;}body{font-size:1rem;line-height:1.5;margin:0;color:",";background-color:",";padding:1rem;}h1,h2,h3,h4,h5,h6{line-height:1.1;font-family:inherit;font-weight:700;margin-top:3rem;margin-bottom:1.5rem;","}h1{font-size:2.35em}h2{font-size:2.00em}h3{font-size:1.75em}h4{font-size:1.5em}h5{font-size:1.25em}h6{font-size:1em}p{margin-top:0px;margin-bottom:2.5rem;}small,sub,sup{font-size:75%;}hr{border-color:",";}a{text-decoration:none;color:",";&:hover{color:",";border-bottom:1px dashed ",";}}ul{padding-left:1.4em;margin-top:0px;margin-bottom:2.5rem;}li{margin-bottom:0.4em;}blockquote{font-style:italic;margin-left:1.5em;padding-left:1em;border-left:3px solid ",";}img{height:auto;max-width:100%;margin-top:0px;margin-bottom:2.5rem;}pre{background-color:",";display:block;padding:1em;overflow-x:auto;margin-top:0px;margin-bottom:2.5rem;}code{font-size:0.9em;padding:0 0.5em;background-color:",";white-space:pre-wrap;}pre > code{padding:0;background-color:transparent;white-space:pre;}table{text-align:justify;width:100%;border-collapse:collapse;}td,th{padding:0.5em;border-bottom:1px solid ",";}input,textarea{border:1px solid ",";&:focus{border:1px solid ",';}}textarea{width:100%;}.button,button,input[type="submit"],input[type="reset"],input[type="button"]{display:inline-block;padding:5px 10px;text-align:center;text-decoration:none;white-space:nowrap;background-color:',";color:",";border-radius:1px;border:1px solid ",";cursor:pointer;box-sizing:border-box;&[disabled]{cursor:default;opacity:.5;}&:focus,&:hover{background-color:",";border-color:",";color:",";outline:0;}}textarea,select,input[type]{color:",";padding:6px 10px;margin-bottom:10px;background-color:",";border:1px solid ",";border-radius:4px;box-shadow:none;box-sizing:border-box;&:focus{border:1px solid ",';outline:0;}}input[type="checkbox"]:focus{outline:1px dotted ',";}label,legend,fieldset{display:block;margin-bottom:.5rem;font-weight:600;}"],i,c,r,s,s,u,i,s,m,m,m,i,s,s,c,s,u,u,c,i,m,m,s,s),p=a.default.h1.withConfig({displayName:"Layout__BodyTitle",componentId:"sc-uy8b5k-0"})(["display:none;"]);var E=function(e){let{children:t,title:n}=e;const r=o("(prefers-color-scheme: dark)");return l.createElement(a.ThemeProvider,{theme:{isDark:r}},l.createElement(d,null),l.createElement(p,null,n),t)}},4017:function(e,t,n){var l=n(4794),a=n(6540);t.A=function(e){let{href:t,title:n,children:o}=e;return a.createElement(l.Link,{to:t,title:n},o)}},9031:function(e,t,n){var l=n(6540),a=n(7581),o=n(4017);const r=a.default.nav.withConfig({displayName:"NavBar__StyledNavBar",componentId:"sc-yc90xv-0"})(["h1{font-size:1em;font-weight:normal;margin:0;}"]);t.A=function(e){let{title:t,description:n}=e;return l.createElement(r,null,l.createElement("h1",null,l.createElement(o.A,{href:"/",title:n},t)))}},4615:function(e,t,n){var l=n(6540),a=n(7581),o=n(4017);const r=a.default.div.withConfig({displayName:"Post__StyledPost",componentId:"sc-1lj2z18-0"})(["max-width:38em;margin:0 auto;"]),i=a.default.footer.withConfig({displayName:"Post__NextArticle",componentId:"sc-1lj2z18-1"})(["border-top:1pt dashed currentColor;text-align:right;text-align:end;"]);t.A=function(e){let{title:t,date:n,children:a,timeToRead:c,slug:m,next:s}=e;return l.createElement(r,null,l.createElement("header",null,l.createElement("h2",null,l.createElement(o.A,{href:m},t)),l.createElement("div",null,l.createElement("time",{dateTime:new Date(n).toISOString()},new Intl.DateTimeFormat("pt-BR",{dateStyle:"long",timeStyle:"short"}).format(n))," ","· ",c," ",1===c?"minuto":"minutos")),a&&l.createElement("article",null,a),s&&l.createElement(i,null,l.createElement(o.A,{href:s.slug},s.title)))}},7746:function(e,t,n){var l=n(6540),a=n(4386);t.A=function(e){const t=e.lang||a.h.lang,n=e.title?`${e.title} | ${a.h.title}`:a.h.title,o=e.description||a.h.description,r=a.h.twitterHandle;return l.createElement(l.Fragment,null,l.createElement("html",{lang:t}),l.createElement("title",null,n),l.createElement("meta",{name:"description",content:o}),l.createElement("meta",{property:"og:title",content:n}),l.createElement("meta",{property:"og:description",content:o}),l.createElement("meta",{property:"og:type",content:"website"}),l.createElement("meta",{name:"twitter:card",content:"summary"}),l.createElement("meta",{name:"twitter:creator",content:r}),l.createElement("meta",{name:"twitter:title",content:n}),l.createElement("meta",{name:"twitter:description",content:o}))}},4386:function(e,t,n){n.d(t,{h:function(){return l}});const l={lang:"pt-BR",title:"Tasso & As Vozes",description:"Um lugar calmo e tranquilo onde dialogo com as vozes que habitam a minha cabeça",twitterHandle:"@tassoevan"}},8453:function(e,t,n){n.d(t,{R:function(){return r}});var l=n(6540);const a={},o=l.createContext(a);function r(e){const t=l.useContext(o);return l.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}}}]);
//# sourceMappingURL=component---src-templates-post-tsx-content-file-path-posts-2014-04-10-a-forma-mais-para-habilitar-conexoes-ao-banco-de-dados-oracle-no-php-5-rodando-sobre-o-ubuntu-md-17640b01c4d4d05d1910.js.map