---
small_title: Composer + iniciantes
title: Como instalar e usar o Composer?
description: Você deveria gerenciar dependências, não código de terceiros
image: /posts/images/logo-composer.png
publish_date: 2015-06-06T02:30:00-03:00
layout: post
---
Em projetos PHP atuais, é praticamente impossível um desenvolvedor fazer tudo do zero. Sempre existe um framework, uma library (biblioteca de código) ou até uma "funçãozinha" que outros devs escreveram e que nós utilizamos para entregar tudo dentro de prazos.

Alguns exemplos? [Laravel](http://laravel.com/), [Zend Framework](http://framework.zend.com/), [Yii](http://www.yiiframework.com/), [Symfony](https://symfony.com/), [Climate](http://climate.thephpleague.com/) etc.

Cada vez que utilizamos algo do tipo, estamos gerando uma *dependência* no projeto. Para que a nossa aplicação funcione, todas as dependências devem *ser resolvidas*, isto é, o código delas deve estar acessível.

# O que é?

O [Composer](https://getcomposer.org/) é um *gerenciador de dependências* escrito em e escrito para PHP. Através dele, todas as dependências de um projeto são baixadas da Internet automaticamente na forma de *pacotes* e corretamente disponibilizadas num diretório. Inclusive com direito a autoloader.

# Como instalar?

O Composer é disponibilizado como um arquivo PHAR (PHP archive) simples, mas para evitar múltiplas cópias dele espalhadas por aí, o ideal é instalá-lo globalmente.

## Debian/Ubuntu/Linux Mint

Se a ferramenta de linha de comando do PHP não está instalada,

```sh
$ sudo apt-get install php5-cli
```

Então instalar é fácil como digitar no terminal isto:

```
$ php -r "readfile('https://getcomposer.org/installer');" | sudo php -- --install-dir=/usr/bin --filename=composer
```

Para mais detalhes, consulte: [http://getcomposer.org/doc/00-intro.md#installation-nix](http://getcomposer.org/doc/00-intro.md#installation-nix)

## Windows

Baixe e execute o [instalador oficial](https://getcomposer.org/Composer-Setup.exe).

Para mais detalhes, consulte: [http://getcomposer.org/doc/00-intro.md#installation-windows](http://getcomposer.org/doc/00-intro.md#installation-windows)

# Como descrevar as dependências?

Para começar, você precisa descrever quais são as dependências do seu projeto em algum lugar. Isso é feito no arquivo `composer.json`, que agora também deve fazer parte do seu código. Como a extensão sugere, ele deve ter um conteúdo JSON válido. Vamos começar com um arquivo simples:

```json
{
  "name": "minha-empresa/meu-projeto",
  "description": "Meu primeiro projeto com Composer",
  "license": "proprietary"
}
```

Os itens `name` e `description` são obrigatórios e `license` é recomendado. Você pode verificar se tudo está ok executando o comando:

```sh
$ composer validate
./composer.json is valid
```

Agora podemos adicionar algumas dependências.

```json
{
  "name": "minha-empresa/meu-projeto",
  "description": "Meu primeiro projeto com Composer",
  "license": "proprietary",
  "require": {
    "yiisoft/yii2": "~2.0.0"
  }
}
```

Dentro da propriedade `require`, eu defini que meu projeto tem como dependência o framework Yii.

**Por que ele está descrito como `yiisoft/yii2`?** Porque foi assim que a Yiisoft o registrou no [Packagist](https://packagist.org/packages/yiisoft/yii2), o principal repositório de pacotes do Composer.

**O que significa `~2.0.0`?** Estamos especificando que queremos qualquer pacote cuja versão seja igual ou superior a 2.0.0 e inferior a 2.1.0. Existem várias [formas de descrever as versões](https://getcomposer.org/doc/02-libraries.md#specifying-the-version) que precisamos. As recomendações principais são (1) evitar as versões `dev-master`, que são baseadas no último código escrito nos pacotes e, portanto, mutáveis; e (2) evitar a tentação de utilizar `*` para ter sempre a última versão disponível. Existe uma diferença enorme, por exemplo, entre a versão 1.1 e a versão 2.0 do Yii. Atualizar dependências assim significa conviver com o fato de ter que mudar todo seu código quando uma delas for atualizada.

# Enfim, como utilizar?

Com tudo isso feito, estamos a um mero passo de ter o Yii no nosso projeto:

```sh
$ composer install
```

O Composer vai verificar os repositórios, como o Packagist; verificar se possuem os pacotes necessários; baixá-los; adicioná-los ao diretório `vendor` do projeto; e criar um arquivo `composer.lock`, que é uma versão superdetalhada do `composer.json`, descrevendo até todas as subdepências (i.e., as dependências das dependências do projeto) e versões baixadas.

Pronto.

Para atualizar as dependências ou reinstalá-las, utilize:

```sh
$ composer update
```
