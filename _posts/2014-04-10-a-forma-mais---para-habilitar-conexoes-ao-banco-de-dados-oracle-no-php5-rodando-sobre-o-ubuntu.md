---
small_title: Oracle + PHP
title: A forma mais *@#$!* para habilitar conexões ao banco de dados Oracle no PHP5 rodando sobre o Ubuntu
image: /posts/images/oracle.png
publish_date: 2014-04-10T15:29:52Z
layout: post
---

Este artigo está disponível como [um gist](https://gist.github.com/tassoevan/10392954). Sinta-se livre para contribuir.

Agradecimentos especiais para:

* [AJ ONeal](https://twitter.com/coolaj86)
* [Hsiao Siyuan](http://hsiaosiyuan.com/wp/)

# Primeiro passo: Instalação do cliente Oracle

1. Faça o download do Instant Client em [http://www.oracle.com/technetwork/indexes/downloads/index.html#database](http://www.oracle.com/technetwork/indexes/downloads/index.html#database) (você deve ter um usuário registrado no site da Oracle; o registro é gratuito). Você precisa dos arquivos `instantclient-basic-*-*.zip` e `instantclient-sdk-*-*.zip`.
2. Execute os seguintes comandos no seu terminal:

        $ sudo su -
        $ mkdir -p /opt/oracle/instantclient
        $ cd /opt/oracle/instantclient

3. Copie os arquivos baixados em `/opt/oracle/instantclient`.
4. Descompacte os arquivos executando estes comandos:

        $ unzip instantclient-basic-*-*.zip
        $ unzip instantclient-sdk-*-*.zip

5. Mova todos o conteúdo de `/opt/oracle/instantclient/instantclient` para `/opt/oracle/instantclient`:

        $ mv instantclient*/* ./
        $ rmdir instantclient*/

6. Durante a compilação do código da extensão, alguns erros podem surgir quando forem resolvidas as dependências de algumas libraries. Para evitá-los, faça:

        $ ln -s libclntsh.so.* libclntsh.so
        $ ln -s libocci.so.* libocci.so
        $ echo /opt/oracle/instantclient >> /etc/ld.so.conf
        $ ldconfig

7. Crie um diretório para seus arquivos de configuração de rede:

        $ mkdir -p network/admin

8. Coloque os arquivos `sqlnet.ora` e `tnsnames.ora` em `/opt/oracle/instantclient/network/admin`.

Agora você tem o kit básico para conexões e acesso à SDK para compilar extensões PHP com Oracle.

# Segundo passo: Instalação da extensão PHP OCI8

1. Pegue todos os pacotes essenciais para baixar e compilar a partir de repositórios PEAR:

        $ apt-get install --yes php5 php5-cli php5-dev php-db php-pear
        $ apt-get install --yes build-essential libaio1

2. Requisite a instalação do OCI8:

        $ pecl install oci8

    Digite `instantclient,/opt/oracle/instantclient` quando perguntado pelo local de instalação do Instant Client.

3. Salve este texto em `/etc/php5/mods-available/oci8.ini`:

        extension=oci8.so

4. Ative a extensão:

        $ php5enmod oci8

Agora você tem todas as funções PHP `oci_*` disponíveis tanto via php-cli quanto via Apache.

# Terceiro passo: Instalação da extensão PHP PDO/OCI

A biblioteca `pdo_oci` está desatualizada, então sua instalação é mais "engenhosa".

1. Corrija alguns caminhos de arquivo:

        $ cd /usr/include/
        $ ln -s php5 php
        $ cd /opt/oracle/instantclient
        $ mkdir -p include/oracle/11.1/
        $ cd include/oracle/11.1/
        $ ln -s ../../../sdk/include client
        $ cd -
        $ mkdir -p lib/oracle/11.1/client
        $ cd lib/oracle/11.1/client
        $ ln -s ../../../../ lib
        $ cd -

2. Baixe a `pdo_oci` via `pecl`:

        $ pecl channel-update pear.php.net
        $ mkdir -p /tmp/pear/download/
        $ cd /tmp/pear/download/
        $ pecl download pdo_oci

3. Extraia o código-fonte:

        $ tar xvf PDO_OCI*.tgz
        $ cd PDO_OCI*

4. Crie um arquivo chamado `config.m4.patch`:

        *** config.m4   2005-09-24 17:23:24.000000000 -0600
        --- /home/myuser/Desktop/PDO_OCI-1.0/config.m4  2009-07-07 17:32:14.000000000 -0600
        ***************
        *** 7,12 ****
        --- 7,14 ----
            if test -s "$PDO_OCI_DIR/orainst/unix.rgs"; then
              PDO_OCI_VERSION=`grep '"ocommon"' $PDO_OCI_DIR/orainst/unix.rgs | sed 's/[ ][ ]*/:/g' | cut -d: -f 6 | cut -c 2-4`
              test -z "$PDO_OCI_VERSION" && PDO_OCI_VERSION=7.3
        +   elif test -f $PDO_OCI_DIR/lib/libclntsh.$SHLIB_SUFFIX_NAME.11.1; then
        +     PDO_OCI_VERSION=11.1
            elif test -f $PDO_OCI_DIR/lib/libclntsh.$SHLIB_SUFFIX_NAME.10.1; then
              PDO_OCI_VERSION=10.1
            elif test -f $PDO_OCI_DIR/lib/libclntsh.$SHLIB_SUFFIX_NAME.9.0; then
        ***************
        *** 119,124 ****
        --- 121,129 ----
              10.2)
                PHP_ADD_LIBRARY(clntsh, 1, PDO_OCI_SHARED_LIBADD)
                ;;
        +     11.1)
        +       PHP_ADD_LIBRARY(clntsh, 1, PDO_OCI_SHARED_LIBADD)
        +       ;;
              *)
                AC_MSG_ERROR(Unsupported Oracle version! $PDO_OCI_VERSION)
                ;;
        #EOF

5. Aplique o patch:

        $ patch --dry-run -i config.m4.patch && patch -i config.m4.patch && phpize

6. Substitua todas as referências  de `function_entry` para `zend_function_entry` em `pdo_oci.c`.

7. Configure, compile e instale:

        $ ORACLE_HOME=/opt/oracle/instantclient ./configure --with-pdo-oci=instantclient,/opt/oracle/instantclient,11.1
        $ make && make test && make install && mv modules/pdo_oci.so /usr/lib/php5/*+lfs/

8. Salve este texto em `/etc/php5/mods-available/pdo_oci.ini`:

        extension=pdo_oci.so

9. Ative a extensão:

        $ php5enmod pdo_oci

E agora você pode pegar uma xícara de café.
