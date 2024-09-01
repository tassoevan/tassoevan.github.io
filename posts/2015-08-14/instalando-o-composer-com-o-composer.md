---
title: Instalando o Composer... com o Composer
date: 2015-08-14T17:00:00-03:00
published: true
---

Não apenas o Composer, mas uma série de ferramentas para desenvolvimento em PHP pode ser mantida atualizada utilizando o próprio Composer. Uma vez que se assume que essas ferramentas são utilizadas em todos os projetos, muitas vezes a adição delas como dependência de desenvolvimento (e.g `composer require --dev phpunit/phunit`) torna-se desnecessária projeto a projeto, podendo ser instalada **globalmente**. Aqui vai a sequência de passos – realizadas numa máquina com Ubuntu – que demonstra como isso é possível:

1. Faça download do arquivo [https://getcomposer.org/composer.phar](https://getcomposer.org/composer.phar).

   ```sh
   $ wget https://getcomposer.org/composer.phar
   ```

2. Instale o Composer como dependência global com o próprio Composer.

   ```sh
   $ php composer.phar global require --dev composer/composer
   ```

3. Adicione o diretório global de binários à variável PATH. No Ubuntu, isso pode ser feito adicionando a seguinte linha ao arquivo `~/.bashrc`

   ```
   export PATH="$HOME/.composer/vendor/bin:$PATH"
   ```

4. Remova o arquivo PHAR – não é mais necessário.

   ```sh
   $ rm composer.phar
   ```

Pronto. O comando `composer` já está disponível, mas sem o comando `self-update` embutido. Para atualizá-lo (junto com outros binários instalados), basta executar:

```sh
$ composer global update
```
