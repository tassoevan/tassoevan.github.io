"use strict";(self.webpackChunk_tassoevan_tassoevan_github_io=self.webpackChunk_tassoevan_tassoevan_github_io||[]).push([[218],{7250:function(e,t,o){o.r(t),o.d(t,{Head:function(){return h},default:function(){return p}});var a=o(8453),n=o(6540);function r(e){const t=Object.assign({p:"p",a:"a",em:"em",strong:"strong",code:"code",ol:"ol",li:"li",h1:"h1",pre:"pre",h2:"h2",h3:"h3"},(0,a.R)(),e.components);return n.createElement(n.Fragment,null,n.createElement(t.p,null,"Como ",n.createElement(t.a,{href:"http://stackoverflow.com/questions/13600598/convert-pdf-to-jpg-image-with-php"},"converter um PDF em imagens PNG ou JPEG"),", ",n.createElement(t.em,null,"usando PHP"),"? Como ",n.createElement(t.a,{href:"http://stackoverflow.com/questions/1571134/how-can-i-convert-an-avi-file-to-flv-format-with-php"},"converter arquivos de vídeo enviados via upload em formatos para a web"),", como WebM ou FLV, ",n.createElement(t.em,null,"usando PHP"),"? Como realizar uma tarefa administrativa no servidor, ",n.createElement(t.em,null,"usando PHP"),"?"),"\n",n.createElement(t.p,null,"Muitas vezes nos fazemos essas perguntas e passamos por algumas decepções ao procurar soluções. A primeira é descobrir que nem sempre podemos resolver usando única e exclusivamente a linguagem e/ou tecnologia que usamos em nossos projetos: PHP não foi construída para executar tarefas longas e que demandam alto processamento, como converter formatos de imagem, áudio e vídeo. Até podemos considerar o uso de extensões (como a ",n.createElement(t.a,{href:"http://php.net/manual/en/book.imagick.php"},"ImageMagick"),"), mas geralmente o modo rápido de conseguir o que se quer é através de ",n.createElement(t.strong,null,"programas externos"),", como ",n.createElement(t.code,null,"avconv")," e ",n.createElement(t.code,null,"convert"),"."),"\n",n.createElement(t.p,null,"A principal dificuldade esperada ao realizar a integração entre scripts PHP e programas externos é a perda de compatibilidade nas diversas plataformas em que PHP é executável. A maioria dos exemplos de uso das funções ",n.createElement(t.code,null,"exec()"),", ",n.createElement(t.code,null,"shell_exec()")," e ",n.createElement(t.code,null,"passthru()")," utiliza programas do ecossistema Unix e, ao menos no Brasil, o número de desenvolvedores PHP que rodam Windows em suas estações de trabalho é grande. Para eles, usar programas externos é adicionar ao seu código algo que só poderá ser testado em servidores de teste ou desenvolvimento — uma realidade que vem mudando, a passos de formiga, com a adoção de ferramentas como ",n.createElement(t.a,{href:"http://www.vagrantup.com/"},"Vagrant")," e ",n.createElement(t.a,{href:"http://www.docker.com/"},"Docker"),"."),"\n",n.createElement(t.p,null,"Então é simples usar programas externos? Não. Todo programa é executado como um novo ",n.createElement(t.strong,null,"processo")," do sistema, chamado pelo ",n.createElement(t.strong,null,"shell")," através de uma ",n.createElement(t.strong,null,"linha de comando"),". E neste contexto, existem algumas coisas a se considerar:"),"\n",n.createElement(t.ol,null,"\n",n.createElement(t.li,null,"Deve ser garantido que nenhum número abusivo de processos seja executado;"),"\n",n.createElement(t.li,null,"Deve ser garantido que ",n.createElement(t.a,{href:"http://en.wikipedia.org/wiki/Code_injection#Shell_injection"},"nenhum dado enviado execute código arbitrário"),";"),"\n",n.createElement(t.li,null,"Todo processo possui uma ",n.createElement(t.a,{href:"http://en.wikipedia.org/wiki/Standard_streams#Standard_input_.28stdin.29"},"stream de entrada de dados"),", uma ",n.createElement(t.a,{href:"http://en.wikipedia.org/wiki/Standard_streams#Standard_output_.28stdout.29"},"stream de saída normal")," e uma ",n.createElement(t.a,{href:"http://en.wikipedia.org/wiki/Standard_streams#Standard_error_.28stderr.29"},"stream de saída de erros"),";"),"\n",n.createElement(t.li,null,"Alguns processos exigem interação do usuário através da stream de entrada;"),"\n",n.createElement(t.li,null,"Alguns processos são longos;"),"\n",n.createElement(t.li,null,"Alguns processos escrevem dados em formatos complexos nas streams de saída;"),"\n",n.createElement(t.li,null,"Processos retornam um ",n.createElement(t.a,{href:"http://en.wikipedia.org/wiki/Exit_status"},"código de status de fim de execução")," que indica erros ocorridos durante a execução."),"\n"),"\n",n.createElement(t.p,null,"Vamos ver que opções as funções padrão do PHP nos fornecem para trabalhar com processos:"),"\n",n.createElement(t.h1,null,n.createElement(t.a,{href:"http://php.net/manual/en/function.shell-exec.php"},n.createElement(t.code,null,"string shell_exec(string $cmd)"))," ou ",n.createElement(t.a,{href:"http://php.net/manual/en/language.operators.execution.php"},n.createElement(t.code,null,"`$cmd`"))),"\n",n.createElement(t.p,null,"É a função ideal para processos invocados com uma linha de comando simples e que escrevem apenas uma linha de texto na stream de saída."),"\n",n.createElement(t.ol,null,"\n",n.createElement(t.li,null,"Somente um processo pode ser executado por vez, a menos que se utilizem mecanismos de execução paralela presentes no shell (e.g. ",n.createElement(t.code,null,"start convert doc.pdf images.jpg")," em Windows)."),"\n",n.createElement(t.li,null,"Você depende de ",n.createElement(t.code,null,"escapeshellarg($arg)")," para escapar argumentos vindos da entrada de usuário. Usar ou não usar é por sua conta e risco. Para o operador de execução (",n.createElement(t.code,null,"` `"),") é impossível passar dados de usuário, como se a definição da linha de comando do processo fosse constante."),"\n",n.createElement(t.li,null,"Tudo o que foi escrito na stream de saída é retornado pela função. Em caso de erro, entretanto, é retornado o valor ",n.createElement(t.code,null,"NULL"),", mesmo que dados tenham sido escritos."),"\n",n.createElement(t.li,null,"Não permite escrever dados na stream de entrada."),"\n",n.createElement(t.li,null,"Você não pode definir um tempo máximo para a execução do processo, embora fique limitado pelo limite de tempo de execução do próprio script PHP."),"\n",n.createElement(t.li,null,"Você precisa parsear toda a stream de saída obtida através do retorno da função/expressão."),"\n",n.createElement(t.li,null,"Você não obtém o código de status. Se ele for zero, a função retorna o conteúdo da stream de saída; caso contrário, ",n.createElement(t.code,null,"NULL")," é retornado."),"\n"),"\n",n.createElement(t.h1,null,n.createElement(t.a,{href:"http://php.net/manual/en/function.exec.php"},n.createElement(t.code,null,"string exec(string $command[, array &$output[, int &$return_var]])"))),"\n",n.createElement(t.p,null,"Esta função adiciona um grau maior de controle sob o que é escrito na stream de saída e sobre os códigos de status."),"\n",n.createElement(t.ol,null,"\n",n.createElement(t.li,null,"Somente um processo pode ser executado por vez, a menos que se utilizem mecanismos de execução paralela presentes no shell."),"\n",n.createElement(t.li,null,"Você depende de ",n.createElement(t.code,null,"escapeshellarg($arg)")," para escapar argumentos vindos da entrada de usuário. Usar ou não usar é por sua conta e risco."),"\n",n.createElement(t.li,null,"Você pode ter acesso ao que foi escrito na stream de saída através do array ",n.createElement(t.code,null,"$output")," ou apenas da última linha escrita através do retorno da função."),"\n",n.createElement(t.li,null,"Não permite escrever dados na stream de entrada."),"\n",n.createElement(t.li,null,"Você não pode definir um tempo máximo para a execução do processo, embora fique limitado pelo limite de tempo de execução do próprio script PHP."),"\n",n.createElement(t.li,null,"Você precisa parsear toda a stream de saída obtida através de ",n.createElement(t.code,null,"$output"),"."),"\n",n.createElement(t.li,null,"Você obtém o código de status através de ",n.createElement(t.code,null,"$return_var"),"."),"\n"),"\n",n.createElement(t.h1,null,n.createElement(t.a,{href:"http://php.net/manual/en/function.passthru.php"},n.createElement(t.code,null,"void passthru(string $command[, int &$return_var])"))),"\n",n.createElement(t.p,null,"O uso mais comum desta função é quando o script PHP funciona como um simples proxy para um programa externo, como um gerador de imagens ou compilador."),"\n",n.createElement(t.ol,null,"\n",n.createElement(t.li,null,"Somente um processo pode ser executado por vez, a menos que se utilizem mecanismos de execução paralela presentes no shell."),"\n",n.createElement(t.li,null,"Você depende de ",n.createElement(t.code,null,"escapeshellarg($arg)")," para escapar argumentos vindos da entrada de usuário. Usar ou não usar é por sua conta e risco."),"\n",n.createElement(t.li,null,"A stream de saída do processo é redirecionada para a stream de saída do script PHP. Se você quiser capturar a saída, vai ter que utilizar mecanismos de ",n.createElement(t.em,null,"output buffering")," (",n.createElement(t.code,null,"ob_start()"),")."),"\n",n.createElement(t.li,null,"Não permite escrever dados na stream de entrada."),"\n",n.createElement(t.li,null,"Você não pode definir um tempo máximo para a execução do processo, embora fique limitado pelo limite de tempo de execução do próprio script PHP."),"\n",n.createElement(t.li,null,"Você precisa parsear toda a stream de saída obtida através de ",n.createElement(t.em,null,"output buffering"),"."),"\n",n.createElement(t.li,null,"Você obtém o código de status através de ",n.createElement(t.code,null,"$return_var"),"."),"\n"),"\n",n.createElement(t.h1,null,n.createElement(t.a,{href:"php.net/manual/en/function.proc-open.php"},n.createElement(t.code,null,"resource proc_open(string $cmd, array $descriptorspec, array &$pipes[, string $cwd[, array $env[, array $other_options]]])"))),"\n",n.createElement(t.p,null,"E aqui temos o maior controle possível de processos (inclusive do diretório de trabalho do processo, via ",n.createElement(t.code,null,"$cwd"),") através de scripts PHP."),"\n",n.createElement(t.ol,null,"\n",n.createElement(t.li,null,"Esta função é não-bloqueante, de modo que você pode iniciar quantos processos julgar adequado. Vale o bom senso para garantir que uma quantidade não-abusiva de processos sejam rodados paralelamente."),"\n",n.createElement(t.li,null,"Você depende de ",n.createElement(t.code,null,"escapeshellarg($arg)")," para escapar argumentos vindos da entrada de usuário. Usar ou não usar é por sua conta e risco."),"\n",n.createElement(t.li,null,"Você tem acesso a ",n.createElement(t.em,null,"stdin"),", ",n.createElement(t.em,null,"stdout")," e ",n.createElement(t.em,null,"stderr")," através do array ",n.createElement(t.code,null,"$pipes"),", como se fossem ponteiros de arquivo tradicionais."),"\n",n.createElement(t.li,null,n.createElement(t.em,null,"stdin")," é uma stream de escrita, onde você pode escrever usando funções simples como ",n.createElement(t.code,null,"fwrite()"),"."),"\n",n.createElement(t.li,null,"O controle de ",n.createElement(t.em,null,"timeout")," dos processos pode ser implementado, já que o processo roda paralelamente ao script."),"\n",n.createElement(t.li,null,"A leitura dos dados escritos em ",n.createElement(t.em,null,"stdout")," e ",n.createElement(t.em,null,"stderr")," não difere da leitura de um arquivo; assim, as mesmas técnicas empregadas para parsear um arquivo podem ser aplicadas, seja de forma integral (ler toda a stream e interpretar o formato), seja de forma contínua (ler a stream linha a linha e interpretar durante a execução)."),"\n",n.createElement(t.li,null,"Você pode ter o código de status a partir do retorno de ",n.createElement(t.code,null,"proc_close($process)"),"."),"\n"),"\n",n.createElement(t.h1,null,"Tudo é complicado"),"\n",n.createElement(t.p,null,"Pelo que se percebe, a complexidade para se executar certos processos via PHP é semelhante à própria complexidade do processo, i.e., um processo que exige interação com todas as streams, ",n.createElement(t.em,null,"timeout")," e controle do código de status vai demandar o uso de uma função muito complexa. ",n.createElement(t.a,{href:"http://php.net/manual/en/function.proc-open.php#example-3774"},"Veja você mesmo"),":"),"\n",n.createElement(t.pre,null,n.createElement(t.code,{className:"language-php"},'<?php\n$descriptorspec = array(\n   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from\n   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to\n   2 => array("file", "/tmp/error-output.txt", "a") // stderr is a file to write to\n);\n\n$cwd = \'/tmp\';\n$env = array(\'some_option\' => \'aeiou\');\n\n$process = proc_open(\'php\', $descriptorspec, $pipes, $cwd, $env);\n\nif (is_resource($process)) {\n    // $pipes now looks like this:\n    // 0 => writeable handle connected to child stdin\n    // 1 => readable handle connected to child stdout\n    // Any error output will be appended to /tmp/error-output.txt\n\n    fwrite($pipes[0], \'<?php print_r($_ENV); ?>\');\n    fclose($pipes[0]);\n\n    echo stream_get_contents($pipes[1]);\n    fclose($pipes[1]);\n\n    // It is important that you close any pipes before calling\n    // proc_close in order to avoid a deadlock\n    $return_value = proc_close($process);\n\n    echo "command returned $return_value\\n";\n}\n')),"\n",n.createElement(t.p,null,"Nesse exemplo, abrimos o processo ",n.createElement(t.code,null,"php"),", escrevemos na stream de entrada o código ",n.createElement(t.code,null,"<?php print_r($_ENV); ?>")," e lemos o resultado da execução na stream de saída do processo. Nenhum mecanismo de ",n.createElement(t.em,null,"timeout")," é implementado, bem como nenhum controle de erros é realizado através da stream de erros e do código de status, e mesmo assim temos um código assustador para programadores novatos."),"\n",n.createElement(t.h2,null,"Symfony Process ao resgate"),"\n",n.createElement(t.p,null,"Streams, código de status, ",n.createElement(t.em,null,"timeout"),", diretório de trabalho, argumentos escapados... Muitos são os componentes e detalhes presentes na execução de um processo. Para nossa sorte, o componente ",n.createElement(t.a,{href:"http://symfony.com/doc/current/components/process.html"},"Symfony Process")," provê um mecanismo simples para execução e controle de processos (e ao contrário do que muitos pensam ",n.createElement(t.strong,null,"não é necessário estar utilizando o framework Symfony para usufruir deste componente"),"). Vamos recriar o exemplo supracitado para demonstrar isso."),"\n",n.createElement(t.p,null,"Primeiramente, você pode baixar as classes do Symfony Process de modo tradicional, mas isso é desaconselhado; prefira fazer o controle deste e de demais códigos de terceiros através do ",n.createElement(t.a,{href:"https://getcomposer.org"},"Composer"),", um gerenciador de dependências para PHP que se tornou praticamente o padrão da indústria. Caso você ainda não esteja utilizando no seu projeto, execute no terminal"),"\n",n.createElement(t.pre,null,n.createElement(t.code,{className:"language-sh"},"$ composer init\n")),"\n",n.createElement(t.p,null,"E forneça informações básicas do seu projeto. Assim que o arquivo ",n.createElement(t.code,null,"composer.json")," estiver disponível, execute"),"\n",n.createElement(t.pre,null,n.createElement(t.code,{className:"language-sh"},"$ composer require symfony/process\n")),"\n",n.createElement(t.p,null,"Para adicionar ao seu projeto a última versão do componente Symfony Process. Todo o código fica disponível no diretório ",n.createElement(t.code,null,"vendor/symfony/process")," e o arquivo ",n.createElement(t.code,null,"composer.lock")," é criado para registrar qual a versão utilizada."),"\n",n.createElement(t.p,null,"Com a library em mãos, vamos recriar o exemplo passo-a-passo. Escreva, num arquivo chamado ",n.createElement(t.code,null,"exemplo.php"),", as seguintes linhas:"),"\n",n.createElement(t.pre,null,n.createElement(t.code,{className:"language-php"},"<?php\nrequire __DIR__.'/vendor/autoload.php';\n\nuse Symfony\\Component\\Process\\Process;\n")),"\n",n.createElement(t.p,null,"A primeira linha vai adicionar o autoloader do Composer, tornando acessíveis todas as classes do Symfony Process. A linha seguinte permite que a classe ",n.createElement(t.code,null,"Symfony\\Component\\Process\\Process")," possa ser chamada apenas de ",n.createElement(t.code,null,"Process")," no script. Ainda no mesmo arquivo, escreva:"),"\n",n.createElement(t.pre,null,n.createElement(t.code,{className:"language-php"},"$process = new Process('php');\n")),"\n",n.createElement(t.p,null,"Essa linha não executa o processo ",n.createElement(t.code,null,"php")," de imediato, apenas prepara uma instância da classe ",n.createElement(t.code,null,"Process")," que representa um processo antes, durante, e após sua execução."),"\n",n.createElement(t.pre,null,n.createElement(t.code,{className:"language-php"},"$process->setInput('<?php print_r($_ENV); ?>');\n")),"\n",n.createElement(t.p,null,"Aqui foi definido qual conteúdo será escrito em ",n.createElement(t.em,null,"stdin")," que o processo seja executado (esse método lança ",n.createElement(t.code,null,"RuntimeException")," se é executado depois que o processo é executado)."),"\n",n.createElement(t.pre,null,n.createElement(t.code,{className:"language-php"},"$process->run(function ($type, $buffer) {\n    if (Process::ERR === $type) {\n        echo 'ERR > '.$buffer;\n    } else {\n        echo 'OUT > '.$buffer;\n    }\n});\n")),"\n",n.createElement(t.p,null,"Aqui o processo é executado de fato, de forma síncrona (para executar o processo de forma asíncrona, ",n.createElement(t.code,null,"$process->start()")," deve ser invocado no lugar de ",n.createElement(t.code,null,"$process->run()"),"), mas com um adendo: toda saída gerada pelo processo, em ",n.createElement(t.em,null,"stdout")," e ",n.createElement(t.em,null,"stderr"),", é passada imediatamente para o callable passado como parâmetro do método ",n.createElement(t.code,null,"run()")," (neste caso, é uma closure). O callable deve aceitar dois parâmetros: ",n.createElement(t.code,null,"$type"),", que indica se a saída foi escrita em ",n.createElement(t.em,null,"stdout")," ou ",n.createElement(t.em,null,"stderr"),"; ",n.createElement(t.code,null,"$buffer"),", que contém o texto escrito."),"\n",n.createElement(t.p,null,"E... Isso é tudo. Você não precisa fechar o processo, muito menos pará-lo. Segue o exemplo completo:"),"\n",n.createElement(t.pre,null,n.createElement(t.code,{className:"language-php"},"<?php\nrequire __DIR__.'/vendor/autoload.php';\n\nuse Symfony\\Component\\Process\\Process;\n\n$process = new Process('php');\n$process->setInput('<?php print_r($_ENV); ?>');\n$process->run(function ($type, $buffer) {\n    if (Process::ERR === $type) {\n        echo 'ERR > '.$buffer;\n    } else {\n        echo 'OUT > '.$buffer;\n    }\n});\n\n")),"\n",n.createElement(t.h3,null,"Agora vá!"),"\n",n.createElement(t.p,null,"Espero que este artigo tenha instigado o leitor investir um pouco de atenção ao componente Symfony Process. As possibilidades com ele são interessantes, principalmente se o seu desejo for de adicionar poder de fogo à sua aplicação web. Em breve devo demonstrar mais casos de uso, como invocação de ",n.createElement(t.code,null,"convert"),", ",n.createElement(t.code,null,"avconv")," e ",n.createElement(t.code,null,"rsync"),". Até lá!"))}var s=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.R)(),e.components);return t?n.createElement(t,e,n.createElement(r,e)):r(e)},l=o(7746),c=o(6008),m=o(9031),i=o(4615),d=o(4386);function u(e){let{pageContext:t,data:o,children:a}=e;const{frontmatter:{title:r,date:s},slug:l,next:u}=t;return n.createElement(n.Fragment,null,n.createElement(c.A,{title:r},n.createElement(m.A,{title:d.h.title,description:d.h.description}),n.createElement(i.A,{slug:l,title:r,date:Date.parse(s),timeToRead:Math.ceil(o.mdx.fields.timeToRead.minutes),next:u},a)))}function p(e){return n.createElement(u,e,n.createElement(s,e))}const h=e=>{let{pageContext:t,data:o,children:a}=e;const{frontmatter:{title:r}}=t,{excerpt:s}=o.mdx;return n.createElement(l.A,{title:r,description:s})}},6008:function(e,t,o){o.d(t,{A:function(){return h}});var a=o(6540),n=o(7581);const r="undefined"!=typeof window&&window.matchMedia?e=>{const{0:t,1:o}=(0,a.useState)((()=>matchMedia(e).matches));return(0,a.useEffect)((()=>{const t=matchMedia(e),a=()=>{o(t.matches)};return t.addEventListener("change",a),()=>{t.removeEventListener("change",a)}}),[e]),t}:e=>!1,s=(0,n.css)(["overflow-wrap:break-word;word-wrap:break-word;-ms-word-break:break-all;word-break:break-word;-ms-hyphens:auto;-moz-hyphens:auto;-webkit-hyphens:auto;hyphens:auto;"]),l=e=>e.theme.isDark?"#ececec":"hsl(0deg, 0%, 30%)",c=e=>e.theme.isDark?"hsl(0deg, 0%, 30%)":"#ececec",m=e=>e.theme.isDark?"hsla(0deg, 0%, 70%, 10%)":"hsla(0deg, 0%, 30%, 10%)",i="rgb(46, 170, 190)",d="rgba(46, 170, 190, 90%)",u=(0,n.createGlobalStyle)(["html{font-size:100%;font-family:Baskerville,'Baskerville Old Face','Goudy Old Style',Garamond,'Times New Roman',serif;scroll-behavior:smooth;}body{font-size:1rem;line-height:1.5;margin:0;color:",";background-color:",";padding:1rem;}h1,h2,h3,h4,h5,h6{line-height:1.1;font-family:inherit;font-weight:700;margin-top:3rem;margin-bottom:1.5rem;","}h1{font-size:2.35em}h2{font-size:2.00em}h3{font-size:1.75em}h4{font-size:1.5em}h5{font-size:1.25em}h6{font-size:1em}p{margin-top:0px;margin-bottom:2.5rem;}small,sub,sup{font-size:75%;}hr{border-color:",";}a{text-decoration:none;color:",";&:hover{color:",";border-bottom:1px dashed ",";}}ul{padding-left:1.4em;margin-top:0px;margin-bottom:2.5rem;}li{margin-bottom:0.4em;}blockquote{font-style:italic;margin-left:1.5em;padding-left:1em;border-left:3px solid ",";}img{height:auto;max-width:100%;margin-top:0px;margin-bottom:2.5rem;}pre{background-color:",";display:block;padding:1em;overflow-x:auto;margin-top:0px;margin-bottom:2.5rem;}code{font-size:0.9em;padding:0 0.5em;background-color:",";white-space:pre-wrap;}pre > code{padding:0;background-color:transparent;white-space:pre;}table{text-align:justify;width:100%;border-collapse:collapse;}td,th{padding:0.5em;border-bottom:1px solid ",";}input,textarea{border:1px solid ",";&:focus{border:1px solid ",';}}textarea{width:100%;}.button,button,input[type="submit"],input[type="reset"],input[type="button"]{display:inline-block;padding:5px 10px;text-align:center;text-decoration:none;white-space:nowrap;background-color:',";color:",";border-radius:1px;border:1px solid ",";cursor:pointer;box-sizing:border-box;&[disabled]{cursor:default;opacity:.5;}&:focus,&:hover{background-color:",";border-color:",";color:",";outline:0;}}textarea,select,input[type]{color:",";padding:6px 10px;margin-bottom:10px;background-color:",";border:1px solid ",";border-radius:4px;box-shadow:none;box-sizing:border-box;&:focus{border:1px solid ",';outline:0;}}input[type="checkbox"]:focus{outline:1px dotted ',";}label,legend,fieldset{display:block;margin-bottom:.5rem;font-weight:600;}"],l,c,s,i,i,d,l,i,m,m,m,l,i,i,c,i,d,d,c,l,m,m,i,i),p=n.default.h1.withConfig({displayName:"Layout__BodyTitle",componentId:"sc-uy8b5k-0"})(["display:none;"]);var h=function(e){let{children:t,title:o}=e;const s=r("(prefers-color-scheme: dark)");return a.createElement(n.ThemeProvider,{theme:{isDark:s}},a.createElement(u,null),a.createElement(p,null,o),t)}},4017:function(e,t,o){var a=o(4794),n=o(6540);t.A=function(e){let{href:t,title:o,children:r}=e;return n.createElement(a.Link,{to:t,title:o},r)}},9031:function(e,t,o){var a=o(6540),n=o(7581),r=o(4017);const s=n.default.nav.withConfig({displayName:"NavBar__StyledNavBar",componentId:"sc-yc90xv-0"})(["h1{font-size:1em;font-weight:normal;margin:0;}"]);t.A=function(e){let{title:t,description:o}=e;return a.createElement(s,null,a.createElement("h1",null,a.createElement(r.A,{href:"/",title:o},t)))}},4615:function(e,t,o){var a=o(6540),n=o(7581),r=o(4017);const s=n.default.div.withConfig({displayName:"Post__StyledPost",componentId:"sc-1lj2z18-0"})(["max-width:38em;margin:0 auto;"]),l=n.default.footer.withConfig({displayName:"Post__NextArticle",componentId:"sc-1lj2z18-1"})(["border-top:1pt dashed currentColor;text-align:right;text-align:end;"]);t.A=function(e){let{title:t,date:o,children:n,timeToRead:c,slug:m,next:i}=e;return a.createElement(s,null,a.createElement("header",null,a.createElement("h2",null,a.createElement(r.A,{href:m},t)),a.createElement("div",null,a.createElement("time",{dateTime:new Date(o).toISOString()},new Intl.DateTimeFormat("pt-BR",{dateStyle:"long",timeStyle:"short"}).format(o))," ","· ",c," ",1===c?"minuto":"minutos")),n&&a.createElement("article",null,n),i&&a.createElement(l,null,a.createElement(r.A,{href:i.slug},i.title)))}},7746:function(e,t,o){var a=o(6540),n=o(4386);t.A=function(e){const t=e.lang||n.h.lang,o=e.title?`${e.title} | ${n.h.title}`:n.h.title,r=e.description||n.h.description,s=n.h.twitterHandle;return a.createElement(a.Fragment,null,a.createElement("html",{lang:t}),a.createElement("title",null,o),a.createElement("meta",{name:"description",content:r}),a.createElement("meta",{property:"og:title",content:o}),a.createElement("meta",{property:"og:description",content:r}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{name:"twitter:card",content:"summary"}),a.createElement("meta",{name:"twitter:creator",content:s}),a.createElement("meta",{name:"twitter:title",content:o}),a.createElement("meta",{name:"twitter:description",content:r}))}},4386:function(e,t,o){o.d(t,{h:function(){return a}});const a={lang:"pt-BR",title:"Tasso & As Vozes",description:"Um lugar calmo e tranquilo onde dialogo com as vozes que habitam a minha cabeça",twitterHandle:"@tassoevan"}},8453:function(e,t,o){o.d(t,{R:function(){return s}});var a=o(6540);const n={},r=a.createContext(n);function s(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}}}]);
//# sourceMappingURL=component---src-templates-post-tsx-content-file-path-posts-2014-10-16-symfony-process-md-ddb482add9851da4502e.js.map