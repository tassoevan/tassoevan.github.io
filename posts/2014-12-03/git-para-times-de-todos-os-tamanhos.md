---
title: 'Git para times de todos os tamanhos'
date: 2014-12-04T04:30:00-02:00
published: true
---

Recentemente, o <a href="http://code.tutsplus.com/tutorials/focusing-on-a-team-workflow-with-git--cms-22514" target="_blank" title="Focusing on a Team Workflow With Git">Tuts+ lançou um artigo</a> sugerindo um _workflow_ baseado no conhecido <a href="http://nvie.com/posts/a-successful-git-branching-model/" target="_blank" title="A successful Git branching model">Git-Flow</a> de Vincent Driessen. Gostei das sugestões dadas e resolvi escrever um pouco sobre esse assunto adicionando uma pitada da minha experiência com o uso de git em pequenas equipes.

# Preciso disso?

Uma vez que superamos as primeiras barreiras de aprendizado e dominamos os conceitos que o git nos traz, como submissões (_commits_), ramos (_branches_), repositórios etc., já somos capazes de dominar com relativa facilidade a administração dos nossos próprios repositórios. Entretanto, mesmo nessa situação de controle total, em alguns momentos decidir entre se fazer do jeito A ou fazer do jeito B é melhor. Acredito que esse sentimento está presente quando percorremos o log de commits de um repositório e não encontramos em qual o commit uma determinada modificação foi feita. Quando isso ocorre, notamos pela primeira vez que mensagens de commit devem ser bem escritas para nós mesmos, não apenas para escrevermos um _change log_ pomposo que nem precisamos manter em alguns casos. **Mas o que seria uma mensagem de commit bem escrita?**

Se esse pequeno problema já é bem incômodo quando trabalhamos sozinhos, imagina o quão crítico ele se torna onde estamos trabalhando em equipe, seja num projeto com colegas de trabalho ou num projeto open source hospedado no GitHub ou outro serviço popular. O que toda ferramenta de controle de versão se propõe a fazer é garantir que, quando vários colaboradores fazem modificações sobre os mesmos arquivos, os conflitos gerados sejam detectados e resolvidos antes de que as mudanças sejam aceitas, e o git trata desses conflitos de uma forma muito conveniente. Segundo seus usuários, muito superior à forma como as demais ferramentas (SourceSafe, CVS, SVN) trabalham. **O que não significa, todavia, que o git resolva os conflitos sozinho.** Há sempre uma etapa no processo de trabalho em equipe em que o código deve ser revisado e aceito por alguém. Nessa situação, gerenciar vários commits em conflito pode ser algo muito desafiador se não houver uma ordem de trabalho, mesmo em projetos pequenos. Código mal revisado significa adição de bugs no seu software.

Agora vou citar uma série de regras que são interessantes para o gerenciamento dos repositórios git. São **sugestões**: você pode adicionar, remover ou modificar algumas propostas para que se ajustem ao ritmo de trabalho da sua equipe. E o seu também.

# Quais são as regras do jogo?

1. [`master` é a versão estável](#regra-1)
2. [`develop` é a versão instável](#regra-2)
3. [`feature-<funcionalidade>` é uma funcionalidade nova](#regra-3)
4. [`fix-<problema>` é a correção de um problema](#regra-4)
5. [`hotfix-<problema>` é a correção de um problema no código em `master`](#regra-5)
6. [`<funcionalidade>` e `<problema>` são códigos simples](#regra-6)
7. [Resolva os conflitos com o branch `develop` antes de solicitar uma mesclagem](#regra-7)
8. [Enviou os commits antes de resolver os conflitos? Mescle `develop`](#regra-8)
9. [O revisor de código deve informar as mesclagens em `develop` e `master`](#regra-9)
10. [Adicione tags aos commits de mesclagem em `master`](#regra-10)
11. [Use verbos imperativos nas mensagens dos commits](#regra-11)
12. [Frase curta + descrição longa](#regra-12)

<a name='regra-1'></a>

## Regra #1 - `master` é a versão estável

[Ian Lollar](https://twitter.com/redhotvengeance), o autor do artigo do Tuts+, estabelece essa regra como a principal. Eu concordo totalmente com ele.

Quando alguém clona um repositório, sempre se espera que o código do repositório já está "pronto para uso" (_deployable_). Se for código compilável, ele pode ser compilado em poucos comandos para gerar um programa estável; se for o código de um website, ele já pode ser enviado para o servidor.

Para quem está acostumado com os ambientes de _desenvolvimento_, de _homologação_ e de _produção_, o branch `master` deve conter o código de produção. Quando algum problema sério ocorre em software em produção, nós temos que agir para enviar correções imediatas (_hotfixes_) sobre esse código. Afinal, como você vai escrever um hotfix em cima do código que está em desenvolvimento e contém modificações que ainda estão incompletas ou não foram aprovadas para produção?

<a name='regra-2'></a>

## Regra #2 - `develop` é a versão instável

Entenda-se que a versão instável de um software é aquela que ainda está incompleta ou não foi aprovada para produção. _Incompleta_, nesse sentido, significa que ainda não contém todas as funcionalidades que estão planejadas para virar a versão estável e **não quer dizer é possui funcionalidades incompletas**. Para entender o que é isso, suponha que você está desenvolvendo uma aplicação divida em vários módulos. Cada módulo criado representa uma funcionalidade nova adicionada ao sistema. Logo, cada módulo pronto deve ser adiciona ao branch `develop`, mas isso não significa que o módulo todo seja empacotado num único commit. Se algum módulo é constituído de várias telas, cada tela pode ser enviada ao repositório como um commit diferente, **mas não diretamente ao branch `develop`**.

Mantenha isso em mente quando trabalhar com o branch `develop`: ele só deve aceitar funcionalidades **completas**.

<a name='regra-3'></a>

## Regra #3 - `feature-<funcionalidade>` é uma funcionalidade nova

Em outras palavras, cada coisa nova que você adiciona ao seu software deve ser gradualmente commitada num branch específico. O prefixo `feature-` no nome do branch indica que ele contém uma funcionalidade (_feature_). Uma vez que a funcionalidade está completa e nenhum novo commit for adicionado a esse branch, você pode enviar uma solicitação ao revisor de código do projeto pedindo que ele mescle (_merge_) os commits no branch `develop`.

<a name='regra-4'></a>

## Regra #4 - `fix-<problema>` é a correção de um problema

Quando um problema é conhecido num projeto e ele não é solucionado pela adição de uma funcionalidade nova &mdash; logo, um bug &mdash;, uma correção deve ser enviada para o código presente no branch `develop`, mas nunca diretamente. Novamente, assim que o código estiver completo no branch, você solicita uma mesclagem.

<a name='regra-5'></a>

## Regra #5 - `hotfix-<problema>` é a correção de um problema no código em `master`

Enquanto os dois tipos de branches anteriormente citados são criados a partir de `develop`,

```sh
$ git checkout -b `feature-<funcionalidade>` `develop`
```

este tipo especial de branch precisa ser criado a partir do código de produção, presente em `master`:

```sh
$ git checkout -b `hotfix-<problema>` `master`
```

<a name='regra-6'></a>

## Regra #6 - `<funcionalidade>` e `<problema>` são códigos simples

Complementando as três regras anteriores, é preciso deixar claro que descrever o nome de uma funcionalidade ou de um problema pode ser uma tarefa complicada. Quando a equipe tem acesso a algum gerenciador de incidentes (_issue tracker_), por exemplo, os bugs são numerados, de forma que os branches são melhor descritos na forma `fix-issue-X`, onde X é o número do bug.

Alguns exemplos adicionais de branches seriam `feature-modulo-usuarios`, `fix-bug-323`, `feature-pagina-sobre`, `hotfix-issue-23` etc. Tenha em mente que isso deve ser acordado entre todos os membros da equipe, não apenas de ciência do revisor de código.

<a name='regra-7'></a>

## Regra #7 - Resolva os conflitos com o branch `develop` antes de solicitar uma mesclagem

Suponha que você e um colega desejam criar duas funcionalidades diferentes, A e B. Você vai ficar com a funcionalidade A e, portanto, criará um branch chamado `feature-A` no seu repositório local. Seu colega criará um branch `feature-B` no repositório dele. Vocês seguem trabalhando, mas seu colega termina o trabalho antes e solicita uma mesclagem em seguida para o revisor de código. O revisor verifica que está tudo certo e mescla os commits do branch `feature-B` no branch `develop` do repositório principal. Você termina o seu trabalho e solicita uma mesclagem. O revisor de código então descobre um conflito, pois o seu colega alterou algum ponto no projeto que você também alterou no desenvolvimento das funcionaldades. Assim, você precisa adicionar ao seu próprio branch `feature-A` os commits de `feature-B` que foram adicionados em `develop`. A melhor forma de fazer isso é através de _rebasing_.

Rebasing é uma técnica do git que consiste em reescrever os commits de um branch, reordenando-os, adicionando novos, removendo alguns e até mesmo reescrevendo o código armazenado em certos commits. No caso apresentado, realizar rebase do branch `develop` no branch `feature-A` vai implicar em ter que reescrever algum commit que você adicionou no `feature-A`.

O ideal é que o branch `develop` do seu repositório local esteja sempre atualizado com relação ao `develop` do repositório principal:

```sh
$ git checkout develop
$ git pull origin develop
```

Em seguida, você pode adicionar as mudanças de `develop` no seu branch:

```sh
$ git checkout feature-A
$ git rebase develop
```

E seguir trabalhando na funcionalidade. Quando tudo estiver pronto:

```sh
$ git push origin feature-A
```

<a name='regra-8'></a>

## Regra #8 - Enviou os commits antes de resolver os conflitos? Mescle `develop`

É possível que você acidentalmente envie para o repositório principal o branch de trabalho sem se certificar de que ele não tem conflitos em relação ao `develop`. Se esses conflitos existem, o revisor de código te informará disso e caberá a você resolver. Como **você nunca deve reescrever o que já está no repositório principal**, rebasing não poderá ser utilizado aqui. Como Lollar diz, rebasing é uma ação destrutiva. Você precisa criar um commit novo que solucione os conflitos; é exatamente o que o comando `git merge` te permite fazer:

```sh
$ git checkout feature-A
$ git merge develop
```

Uma forma simplificada de resolver os conflitos é através do comando `git mergetool`. Com ele, cada conflito existente é listado e as devidas ações de correção são pedidas para você, uma a uma.

<a name='regra-9'></a>

## Regra #9 - O revisor de código deve informar as mesclagens em `develop` e `master`

E como ele pode dizer que os commits adicionados em `develop` vieram de `feature-A`? Desabilitando o recurso de <a href="http://ariya.ofilabs.com/2013/09/fast-forward-git-merge.html" target="_blank" title="Fast-Forward Git Merge"> _fast-forwarding_ </a> na mesclagem.

```sh
$ git checkout develop
$ git merge --no-ff feature-A
```

Isto adicionará um commit adicional a `develop` informando a mesclagem, em vez de copiar os commits de `feature-A` em `develop`.

E qual a vantagem de se fazer isso?

<a name='regra-10'></a>

## Regra #10 - Adicione tags aos commits de mesclagem em `master`

As tags permitem que você marque pontos importantes no histórico do código presente no `master`, como mudanças de versão.

```sh
$ git checkout master
$ git merge --no-ff develop
$ git tag -a v<versão> -m 'Versão <versão>'
```

Uma dica adicional, também sugerida por Lollar, é a utilização do <a href="http://semver.org/" target="_blank" title="Semantic Versioning 2.0.0">versionamento semântico</a> para escrever os números de versões.

<a name='regra-11'></a>

## Regra #11 - Use verbos imperativos nas mensagens dos commits

"**Adiciona** a tela X" em vez de "Tela X adicionada". "**Corrige** o bug Y" em vez de "Correção do bug Y". Alguns verbos comuns:

- adiciona
- remove
- corrige
- transfere
- atualiza

Pode "colar" alguns verbos de <a href="http://www.youtube.com/watch?v=YtdWHFwmd2o" target="_blank" title="Daft Punk - Technologic">_Technologic_</a> também.

<a name='regra-12'></a>

## Regra #12 - Frase curta + descrição longa

Outra recomendação é que a mensagem do commit seja uma frase curta (de até 50 caracteres, com a primeira letra maiúscula), uma linha em branco e um parágrafo que dê uma descrição maior sobre o commit. Essa descrição, entretanto, é opcional.
