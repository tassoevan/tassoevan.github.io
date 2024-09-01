---
title: 'Adeus shell_exec()'
date: 2014-10-17T03:00:00-03:00
published: true
---

Como [converter um PDF em imagens PNG ou JPEG](http://stackoverflow.com/questions/13600598/convert-pdf-to-jpg-image-with-php), _usando PHP_? Como [converter arquivos de vídeo enviados via upload em formatos para a web](http://stackoverflow.com/questions/1571134/how-can-i-convert-an-avi-file-to-flv-format-with-php), como WebM ou FLV, _usando PHP_? Como realizar uma tarefa administrativa no servidor, _usando PHP_?

Muitas vezes nos fazemos essas perguntas e passamos por algumas decepções ao procurar soluções. A primeira é descobrir que nem sempre podemos resolver usando única e exclusivamente a linguagem e/ou tecnologia que usamos em nossos projetos: PHP não foi construída para executar tarefas longas e que demandam alto processamento, como converter formatos de imagem, áudio e vídeo. Até podemos considerar o uso de extensões (como a [ImageMagick](http://php.net/manual/en/book.imagick.php)), mas geralmente o modo rápido de conseguir o que se quer é através de **programas externos**, como `avconv` e `convert`.

A principal dificuldade esperada ao realizar a integração entre scripts PHP e programas externos é a perda de compatibilidade nas diversas plataformas em que PHP é executável. A maioria dos exemplos de uso das funções `exec()`, `shell_exec()` e `passthru()` utiliza programas do ecossistema Unix e, ao menos no Brasil, o número de desenvolvedores PHP que rodam Windows em suas estações de trabalho é grande. Para eles, usar programas externos é adicionar ao seu código algo que só poderá ser testado em servidores de teste ou desenvolvimento &mdash; uma realidade que vem mudando, a passos de formiga, com a adoção de ferramentas como [Vagrant](http://www.vagrantup.com/) e [Docker](http://www.docker.com/).

Então é simples usar programas externos? Não. Todo programa é executado como um novo **processo** do sistema, chamado pelo **shell** através de uma **linha de comando**. E neste contexto, existem algumas coisas a se considerar:

1. Deve ser garantido que nenhum número abusivo de processos seja executado;
2. Deve ser garantido que [nenhum dado enviado execute código arbitrário](http://en.wikipedia.org/wiki/Code_injection#Shell_injection);
3. Todo processo possui uma [stream de entrada de dados](http://en.wikipedia.org/wiki/Standard_streams#Standard_input_.28stdin.29), uma [stream de saída normal](http://en.wikipedia.org/wiki/Standard_streams#Standard_output_.28stdout.29) e uma [stream de saída de erros](http://en.wikipedia.org/wiki/Standard_streams#Standard_error_.28stderr.29);
4. Alguns processos exigem interação do usuário através da stream de entrada;
5. Alguns processos são longos;
6. Alguns processos escrevem dados em formatos complexos nas streams de saída;
7. Processos retornam um [código de status de fim de execução](http://en.wikipedia.org/wiki/Exit_status) que indica erros ocorridos durante a execução.

Vamos ver que opções as funções padrão do PHP nos fornecem para trabalhar com processos:

# [`string shell_exec(string $cmd)`](http://php.net/manual/en/function.shell-exec.php) ou [`` `$cmd` ``](http://php.net/manual/en/language.operators.execution.php)

É a função ideal para processos invocados com uma linha de comando simples e que escrevem apenas uma linha de texto na stream de saída.

1. Somente um processo pode ser executado por vez, a menos que se utilizem mecanismos de execução paralela presentes no shell (e.g. `start convert doc.pdf images.jpg` em Windows).
2. Você depende de `escapeshellarg($arg)` para escapar argumentos vindos da entrada de usuário. Usar ou não usar é por sua conta e risco. Para o operador de execução (`` ` ` ``) é impossível passar dados de usuário, como se a definição da linha de comando do processo fosse constante.
3. Tudo o que foi escrito na stream de saída é retornado pela função. Em caso de erro, entretanto, é retornado o valor `NULL`, mesmo que dados tenham sido escritos.
4. Não permite escrever dados na stream de entrada.
5. Você não pode definir um tempo máximo para a execução do processo, embora fique limitado pelo limite de tempo de execução do próprio script PHP.
6. Você precisa parsear toda a stream de saída obtida através do retorno da função/expressão.
7. Você não obtém o código de status. Se ele for zero, a função retorna o conteúdo da stream de saída; caso contrário, `NULL` é retornado.

# [`string exec(string $command[, array &$output[, int &$return_var]])`](http://php.net/manual/en/function.exec.php)

Esta função adiciona um grau maior de controle sob o que é escrito na stream de saída e sobre os códigos de status.

1. Somente um processo pode ser executado por vez, a menos que se utilizem mecanismos de execução paralela presentes no shell.
2. Você depende de `escapeshellarg($arg)` para escapar argumentos vindos da entrada de usuário. Usar ou não usar é por sua conta e risco.
3. Você pode ter acesso ao que foi escrito na stream de saída através do array `$output` ou apenas da última linha escrita através do retorno da função.
4. Não permite escrever dados na stream de entrada.
5. Você não pode definir um tempo máximo para a execução do processo, embora fique limitado pelo limite de tempo de execução do próprio script PHP.
6. Você precisa parsear toda a stream de saída obtida através de `$output`.
7. Você obtém o código de status através de `$return_var`.

# [`void passthru(string $command[, int &$return_var])`](http://php.net/manual/en/function.passthru.php)

O uso mais comum desta função é quando o script PHP funciona como um simples proxy para um programa externo, como um gerador de imagens ou compilador.

1. Somente um processo pode ser executado por vez, a menos que se utilizem mecanismos de execução paralela presentes no shell.
2. Você depende de `escapeshellarg($arg)` para escapar argumentos vindos da entrada de usuário. Usar ou não usar é por sua conta e risco.
3. A stream de saída do processo é redirecionada para a stream de saída do script PHP. Se você quiser capturar a saída, vai ter que utilizar mecanismos de _output buffering_ (`ob_start()`).
4. Não permite escrever dados na stream de entrada.
5. Você não pode definir um tempo máximo para a execução do processo, embora fique limitado pelo limite de tempo de execução do próprio script PHP.
6. Você precisa parsear toda a stream de saída obtida através de _output buffering_.
7. Você obtém o código de status através de `$return_var`.

# [`resource proc_open(string $cmd, array $descriptorspec, array &$pipes[, string $cwd[, array $env[, array $other_options]]])`](php.net/manual/en/function.proc-open.php)

E aqui temos o maior controle possível de processos (inclusive do diretório de trabalho do processo, via `$cwd`) através de scripts PHP.

1. Esta função é não-bloqueante, de modo que você pode iniciar quantos processos julgar adequado. Vale o bom senso para garantir que uma quantidade não-abusiva de processos sejam rodados paralelamente.
2. Você depende de `escapeshellarg($arg)` para escapar argumentos vindos da entrada de usuário. Usar ou não usar é por sua conta e risco.
3. Você tem acesso a _stdin_, _stdout_ e _stderr_ através do array `$pipes`, como se fossem ponteiros de arquivo tradicionais.
4. _stdin_ é uma stream de escrita, onde você pode escrever usando funções simples como `fwrite()`.
5. O controle de _timeout_ dos processos pode ser implementado, já que o processo roda paralelamente ao script.
6. A leitura dos dados escritos em _stdout_ e _stderr_ não difere da leitura de um arquivo; assim, as mesmas técnicas empregadas para parsear um arquivo podem ser aplicadas, seja de forma integral (ler toda a stream e interpretar o formato), seja de forma contínua (ler a stream linha a linha e interpretar durante a execução).
7. Você pode ter o código de status a partir do retorno de `proc_close($process)`.

# Tudo é complicado

Pelo que se percebe, a complexidade para se executar certos processos via PHP é semelhante à própria complexidade do processo, i.e., um processo que exige interação com todas as streams, _timeout_ e controle do código de status vai demandar o uso de uma função muito complexa. [Veja você mesmo](http://php.net/manual/en/function.proc-open.php#example-3774):

```php
<?php
$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
   2 => array("file", "/tmp/error-output.txt", "a") // stderr is a file to write to
);

$cwd = '/tmp';
$env = array('some_option' => 'aeiou');

$process = proc_open('php', $descriptorspec, $pipes, $cwd, $env);

if (is_resource($process)) {
    // $pipes now looks like this:
    // 0 => writeable handle connected to child stdin
    // 1 => readable handle connected to child stdout
    // Any error output will be appended to /tmp/error-output.txt

    fwrite($pipes[0], '<?php print_r($_ENV); ?>');
    fclose($pipes[0]);

    echo stream_get_contents($pipes[1]);
    fclose($pipes[1]);

    // It is important that you close any pipes before calling
    // proc_close in order to avoid a deadlock
    $return_value = proc_close($process);

    echo "command returned $return_value\n";
}
```

Nesse exemplo, abrimos o processo `php`, escrevemos na stream de entrada o código `<?php print_r($_ENV); ?>` e lemos o resultado da execução na stream de saída do processo. Nenhum mecanismo de _timeout_ é implementado, bem como nenhum controle de erros é realizado através da stream de erros e do código de status, e mesmo assim temos um código assustador para programadores novatos.

## Symfony Process ao resgate

Streams, código de status, _timeout_, diretório de trabalho, argumentos escapados... Muitos são os componentes e detalhes presentes na execução de um processo. Para nossa sorte, o componente [Symfony Process](http://symfony.com/doc/current/components/process.html) provê um mecanismo simples para execução e controle de processos (e ao contrário do que muitos pensam **não é necessário estar utilizando o framework Symfony para usufruir deste componente**). Vamos recriar o exemplo supracitado para demonstrar isso.

Primeiramente, você pode baixar as classes do Symfony Process de modo tradicional, mas isso é desaconselhado; prefira fazer o controle deste e de demais códigos de terceiros através do [Composer](https://getcomposer.org), um gerenciador de dependências para PHP que se tornou praticamente o padrão da indústria. Caso você ainda não esteja utilizando no seu projeto, execute no terminal

```sh
$ composer init
```

E forneça informações básicas do seu projeto. Assim que o arquivo `composer.json` estiver disponível, execute

```sh
$ composer require symfony/process
```

Para adicionar ao seu projeto a última versão do componente Symfony Process. Todo o código fica disponível no diretório `vendor/symfony/process` e o arquivo `composer.lock` é criado para registrar qual a versão utilizada.

Com a library em mãos, vamos recriar o exemplo passo-a-passo. Escreva, num arquivo chamado `exemplo.php`, as seguintes linhas:

```php
<?php
require __DIR__.'/vendor/autoload.php';

use Symfony\Component\Process\Process;
```

A primeira linha vai adicionar o autoloader do Composer, tornando acessíveis todas as classes do Symfony Process. A linha seguinte permite que a classe `Symfony\Component\Process\Process` possa ser chamada apenas de `Process` no script. Ainda no mesmo arquivo, escreva:

```php
$process = new Process('php');
```

Essa linha não executa o processo `php` de imediato, apenas prepara uma instância da classe `Process` que representa um processo antes, durante, e após sua execução.

```php
$process->setInput('<?php print_r($_ENV); ?>');
```

Aqui foi definido qual conteúdo será escrito em _stdin_ que o processo seja executado (esse método lança `RuntimeException` se é executado depois que o processo é executado).

```php
$process->run(function ($type, $buffer) {
    if (Process::ERR === $type) {
        echo 'ERR > '.$buffer;
    } else {
        echo 'OUT > '.$buffer;
    }
});
```

Aqui o processo é executado de fato, de forma síncrona (para executar o processo de forma asíncrona, `$process->start()` deve ser invocado no lugar de `$process->run()`), mas com um adendo: toda saída gerada pelo processo, em _stdout_ e _stderr_, é passada imediatamente para o callable passado como parâmetro do método `run()` (neste caso, é uma closure). O callable deve aceitar dois parâmetros: `$type`, que indica se a saída foi escrita em _stdout_ ou _stderr_; `$buffer`, que contém o texto escrito.

E... Isso é tudo. Você não precisa fechar o processo, muito menos pará-lo. Segue o exemplo completo:

```php
<?php
require __DIR__.'/vendor/autoload.php';

use Symfony\Component\Process\Process;

$process = new Process('php');
$process->setInput('<?php print_r($_ENV); ?>');
$process->run(function ($type, $buffer) {
    if (Process::ERR === $type) {
        echo 'ERR > '.$buffer;
    } else {
        echo 'OUT > '.$buffer;
    }
});

```

### Agora vá!

Espero que este artigo tenha instigado o leitor investir um pouco de atenção ao componente Symfony Process. As possibilidades com ele são interessantes, principalmente se o seu desejo for de adicionar poder de fogo à sua aplicação web. Em breve devo demonstrar mais casos de uso, como invocação de `convert`, `avconv` e `rsync`. Até lá!
