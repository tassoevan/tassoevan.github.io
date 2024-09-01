---
title: Acesso fácil à classe `\Respect\Validation\Validator`
date: 2013-05-06T00:08:26Z
published: true
---

```php
<?php
  // Author's recommendation
  use Respect\Validation\Validator as v;

  $number = 123;
  v::numeric()->validate($number); //true

  // The author method can be a little uncomfortable, because
  // the 'v' alias will be present in all source code and it
  // is meaningless according OOP.

  // Here my approach
  $v = 'Respect\Validation\Validator';

  $number = 123;
  $v::numeric()->validate($number); //true
```
