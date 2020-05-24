---
title: '.htaccess snippets'
date: 2013-03-21T20:01:16Z
published: true
---

```htaccess
# ------------------------------------------------------------------------------
# Redirecionar para mobile a partir do agente de usuário
# ------------------------------------------------------------------------------
<IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteCond %{HTTP_USER_AGENT} "android|blackberry|googlebot-mobile|iemobile|ipad|iphone|ipod|opera mobile|palmos|webos" [NC]
   RewriteRule ^$ http://m.example.com/ [L,R=302]
</IfModule>
<IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteCond %{HTTP_USER_AGENT} "!(android|blackberry|googlebot-mobile|iemobile|ipad|iphone|ipod|opera mobile|palmos|webos)" [NC]
   RewriteRule ^$ http://www.example.com/ [L,R=302]
</IfModule>

# ------------------------------------------------------------------------------
# Ativar Google Chrome Frame
# ------------------------------------------------------------------------------
<IfModule mod_headers.c>
  Header set X-UA-Compatible "IE=Edge,chrome=1"
  <FilesMatch "\.(appcache|crx|css|eot|gif|htc|ico|jpe?g|js|m4a|m4v|manifest|mp4|oex|oga|ogg|ogv|otf|pdf|png|safariextz|svg|svgz|ttf|vcf|webm|webp|woff|xml|xpi)$">
      Header unset X-UA-Compatible
  </FilesMatch>
</IfModule>

# ------------------------------------------------------------------------------
# Permissão de acesso às Webfonts
# ------------------------------------------------------------------------------
# Nota: qualquer domínio pode ser especificado no lugar de "*"
<IfModule mod_headers.c>
  <FilesMatch "\.(eot|font.css|otf|ttc|ttf|woff)$">
      Header set Access-Control-Allow-Origin "*"
  </FilesMatch>
</IfModule>

# ------------------------------------------------------------------------------
# MIME type apropriado para todos os arquivos
# ------------------------------------------------------------------------------
AddType application/javascript         js jsonp
AddType application/json               json
AddType audio/mp4                      m4a f4a f4b
AddType audio/ogg                      oga ogg
AddType video/mp4                      mp4 m4v f4v f4p
AddType video/ogg                      ogv
AddType video/webm                     webm
AddType video/x-flv                    flv
AddType     image/svg+xml              svg svgz
AddEncoding gzip                       svgz
AddType application/vnd.ms-fontobject  eot
AddType application/x-font-ttf         ttf ttc
AddType application/x-font-woff        woff
AddType font/opentype                  otf
AddType application/octet-stream            safariextz
AddType application/x-chrome-extension      crx
AddType application/x-opera-extension       oex
AddType application/x-shockwave-flash       swf
AddType application/x-web-app-manifest+json webapp
AddType application/x-xpinstall             xpi
AddType application/xml                     rss atom xml rdf
AddType image/webp                          webp
AddType image/x-icon                        ico
AddType text/cache-manifest                 appcache manifest
AddType text/vtt                            vtt
AddType text/x-component                    htc
AddType text/x-vcard                        vcf

# ------------------------------------------------------------------------------
# Compressão gzip
# ------------------------------------------------------------------------------
<IfModule mod_deflate.c>
  <IfModule mod_setenvif.c>
      <IfModule mod_headers.c>
          SetEnvIfNoCase ^(Accept-EncodXng|X-cept-Encoding|X{15}|~{15}|-{15})$ ^((gzip|deflate)\s*,?\s*)+|[X~-]{4,13}$ HAVE_Accept-Encoding
          RequestHeader append Accept-Encoding "gzip,deflate" env=HAVE_Accept-Encoding
      </IfModule>
  </IfModule>
  <IfModule mod_filter.c>
      AddOutputFilterByType DEFLATE application/atom+xml \
                                    application/javascript \
                                    application/json \
                                    application/rss+xml \
                                    application/vnd.ms-fontobject \
                                    application/x-font-ttf \
                                    application/xhtml+xml \
                                    application/xml \
                                    font/opentype \
                                    image/svg+xml \
                                    image/x-icon \
                                    text/css \
                                    text/html \
                                    text/plain \
                                    text/x-component \
                                    text/xml
  </IfModule>
</IfModule>

# ------------------------------------------------------------------------------
# Expires headers (para um melhor controle de cache)
# ------------------------------------------------------------------------------
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresDefault                          "access plus 1 minute"

  ExpiresByType text/cache-manifest       "access plus 0 seconds"
  ExpiresByType text/html                 "access plus 0 seconds"
  ExpiresByType application/json          "access plus 0 seconds"
  ExpiresByType application/xml           "access plus 0 seconds"
  ExpiresByType text/xml                  "access plus 0 seconds"
  ExpiresByType application/atom+xml      "access plus 1 hour"
  ExpiresByType application/rss+xml       "access plus 1 hour"
  ExpiresByType image/x-icon              "access plus 1 minute"
  ExpiresByType audio/ogg                 "access plus 1 month"
  ExpiresByType image/gif                 "access plus 1 month"
  ExpiresByType image/jpeg                "access plus 1 month"
  ExpiresByType image/png                 "access plus 1 month"
  ExpiresByType video/mp4                 "access plus 1 month"
  ExpiresByType video/ogg                 "access plus 1 month"
  ExpiresByType video/webm                "access plus 1 month"
  ExpiresByType text/x-component          "access plus 1 month"
  ExpiresByType application/vnd.ms-fontobject "access plus 1 month"
  ExpiresByType application/x-font-ttf    "access plus 1 month"
  ExpiresByType application/x-font-woff   "access plus 1 month"
  ExpiresByType font/opentype             "access plus 1 month"
  ExpiresByType image/svg+xml             "access plus 1 month"
  ExpiresByType application/javascript    "access plus 1 minute"
  ExpiresByType text/css                  "access plus 1 minute"
</IfModule>

# ------------------------------------------------------------------------------
# Remoção de ETag
# ------------------------------------------------------------------------------
<IfModule mod_headers.c>
  Header unset ETag
</IfModule>
FileETag None

# ------------------------------------------------------------------------------
# Remover o flicker em rollovers CSS no Internet Explorer
# ------------------------------------------------------------------------------
BrowserMatch "MSIE" brokenvary=1
BrowserMatch "Mozilla/4.[0-9]{2}" brokenvary=1
BrowserMatch "Opera" !brokenvary
SetEnvIf brokenvary 1 force-no-vary

# ------------------------------------------------------------------------------
# Requisições AJAX cross-domain
# ------------------------------------------------------------------------------
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>

# ------------------------------------------------------------------------------
# Imagens CORS habilitadas (@crossorigin)
# ------------------------------------------------------------------------------
<IfModule mod_setenvif.c>
  <IfModule mod_headers.c>
      <FilesMatch "\.(gif|ico|jpe?g|png|svg|svgz|webp)$">
          SetEnvIf Origin ":" IS_CORS
          Header set Access-Control-Allow-Origin "*" env=IS_CORS
      </FilesMatch>
  </IfModule>
</IfModule>

# ------------------------------------------------------------------------------
# Concatenação entre arquivos js e css específicos
# ------------------------------------------------------------------------------
# Nota: e.g., em script.combined.js você pode ter
#       <!--#include file="libs/jquery-1.5.0.min.js" -->
#       <!--#include file="plugins/jquery.idletimer.js" -->
<FilesMatch "\.combined\.js$">
  Options +Includes
  AddOutputFilterByType INCLUDES application/javascript application/json
  SetOutputFilter INCLUDES
</FilesMatch>
<FilesMatch "\.combined\.css$">
  Options +Includes
  AddOutputFilterByType INCLUDES text/css
  SetOutputFilter INCLUDES
</FilesMatch>

# ------------------------------------------------------------------------------
# Impedir provedores de redes mobile (3G) de modificar seu site
# ------------------------------------------------------------------------------
<IfModule mod_headers.c>
  Header set Cache-Control "no-transform"
</IfModule>

# ------------------------------------------------------------------------------
# Keep-Alive
# ------------------------------------------------------------------------------
# Nota: existem algumas desvantagens em habilitar esta opção.
#       Ative-a se você serve muito conteúdo estático
<IfModule mod_headers.c>
  Header set Connection Keep-Alive
</IfModule>

# ------------------------------------------------------------------------------
# Permitir a criação de cookies em iframes
# ------------------------------------------------------------------------------
# Nota: apenas Internet Explorer
<IfModule mod_headers.c>
  Header set P3P "policyref=\"/w3c/p3p.xml\", CP=\"IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT\""
</IfModule>

# ------------------------------------------------------------------------------
# Iniciar o motor de reescrita de URLs
# ------------------------------------------------------------------------------
<IfModule mod_rewrite.c>
  Options +FollowSymlinks
  RewriteEngine On
#   RewriteBase /
</IfModule>

# ------------------------------------------------------------------------------
# Reescrever "example.com -> www.example.com"
# ------------------------------------------------------------------------------
<IfModule mod_rewrite.c>
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP_HOST} !^www\..+$
  # Exceto para localhost
  RewriteCond %{HTTP_HOST} !^localhost$
  # Exceto para endereço IP
  RewriteCond %{HTTP_HOST} !^(\d{1,3}\.){3}\d{1,3}$ [NC]
  RewriteRule ^ http://www.%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</IfModule>

# ------------------------------------------------------------------------------
# Reescrever "www.example.com -> example.com"
# ------------------------------------------------------------------------------
<IfModule mod_rewrite.c>
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
  RewriteRule ^ http://%1%{REQUEST_URI} [R=301,L]
</IfModule>

# ------------------------------------------------------------------------------
# Melhor cache baseado em nome de arquivo
# ------------------------------------------------------------------------------
# Nota: link "css/estilos.css" como "css/estilos.123.css"
<IfModule mod_rewrite.c>
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.+)\.(\d+)\.(js|css|png|jpg|gif)$ $1.$3 [L]
</IfModule>

# ------------------------------------------------------------------------------
# Impedir alguns alertas SSL
# ------------------------------------------------------------------------------
<IfModule mod_rewrite.c>
  RewriteCond %{SERVER_PORT} !^443
  RewriteRule ^ https://example.com%{REQUEST_URI} [R=301,L]
</IfModule>

# ------------------------------------------------------------------------------
# Impedir erros 404 para pastas não existentes em URIs reescritas
# ------------------------------------------------------------------------------
Options -MultiViews

# ------------------------------------------------------------------------------
# Página 404 personalizada
# ------------------------------------------------------------------------------
ErrorDocument 404 /404.html

# ------------------------------------------------------------------------------
# Codificação UTF-8
# ------------------------------------------------------------------------------
AddDefaultCharset utf-8
AddCharset utf-8 .atom .css .js .json .rss .vtt .xml

# ------------------------------------------------------------------------------
# Remover assinatura do servidor
# ------------------------------------------------------------------------------
# Nota: apenas para a httpd.conf
ServerSignature Off
ServerTokens Prod

# ------------------------------------------------------------------------------
# Impedir listagem em diretórios sem documento padrão
# ------------------------------------------------------------------------------
<IfModule mod_autoindex.c>
  Options -Indexes
</IfModule>

# ------------------------------------------------------------------------------
# Impedir acesso a diretórios ocultos no Linux
# ------------------------------------------------------------------------------
# Nota: são diretórios cujo nome inicial com ponto, e.g. ".git"
<IfModule mod_rewrite.c>
  RewriteCond %{SCRIPT_FILENAME} -d [OR]
  RewriteCond %{SCRIPT_FILENAME} -f
  RewriteRule "(^|/)\." - [F]
</IfModule>

# ------------------------------------------------------------------------------
# Impedir acesso a arquivos de becape, código-fonte e configuração
# ------------------------------------------------------------------------------
<FilesMatch "(\.(bak|config|dist|fla|inc|ini|log|psd|sh|sql|swp)|~)$">
  Order allow,deny
  Deny from all
  Satisfy All
</FilesMatch>

# ------------------------------------------------------------------------------
# Configurações seguras para o PHP
# ------------------------------------------------------------------------------
# Nota: nem todos servidores suportam essas modificações via .htaccess
php_flag  register_globals       Off
php_value session.name           SESSIONID
php_flag  magic_quotes_gpc       Off
php_flag  expose_php             Off
php_value error_reporting        -1
php_flag  log_errors             On
php_flag  display_errors         Off
php_flag  display_startup_errors Off
php_flag  html_errors            Off
php_flag  ignore_repeated_errors Off
php_flag  ignore_repeated_source Off
php_value log_errors_max_len     1024
php_value error_prepend_string   " "
php_value error_append_string    " "
<IfModule mod_php5.c>
  php_value session.cookie_httponly true
</IfModule>

# ------------------------------------------------------------------------------
# Redirecionar acesso para router PHP
# ------------------------------------------------------------------------------
# Nota: "E=app:main" especifica a variável
#       $_SERVER['REDIRECT_app'] = 'main';
<IfModule mod_rewrite.c>
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.php [QSA,E=app:main,L]
</IfModule>
```
