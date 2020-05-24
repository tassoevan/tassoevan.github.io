---
title: 'Um método mais confiável para serializar closures'
date: 2013-07-19T00:34:33Z
published: true
---

```php
<?php
/**
* Serializes a closure as string
* @param \Closure $closure
* @return string
*/
function serializeClosure(\Closure $closure) {
$ref = new ReflectionFunction($closure);
$tokens = token_get_all(file_get_contents($ref->getFileName()));

$tokensCount = count($tokens);
$start = false;
$end = $tokensCount;

for ( $i = 0; $i < $tokensCount; ++$i ) {
  if ( is_array($tokens[$i]) && $tokens[$i][0] === T_FUNCTION && $tokens[$i][2] == $ref->getStartLine() ) {
    $start = $i;
    break;
  }
}

for ( $i = $start; $i < $tokensCount; ++$i ) {
  if ( is_array($tokens[$i]) && $tokens[$i][2] > $ref->getEndLine() ) {
    $end = $i - 1;
    break;
  }
}

$tokens = array_slice($tokens, $start, $end);

$replaceToken = function($a) { return is_array($a) ? $a[1] : $a; };

while ( count($tokens) > 0 && $tokens[0][0] === T_FUNCTION ) {

  if ( !getNesting($parameters, $tokens, '(', ')') ) // does not have parameters
    break;

  if ( !getNesting($body, $tokens, '{', '}', $parameters['end']) ) // does not have body
    break;

  if ( ($use_idx = findToken($tokens, T_USE, $parameters['end'] + 2, $body['start'] - 2)) !== false )
    getNesting($use, $tokens, '(', ')', $use_idx);

  if ( findToken($tokens, T_STRING, 0, $parameters['start']) === false ) { // is anonymous function
    while ( getNesting($tmp, $body['tokens'], T_STATIC, ';') ) {
      $tmp['start']--;
      $tmp['end']++;
      array_splice($body['tokens'], $tmp['start'], $tmp['end']);
    }

    if ( !isset($use) )
      $use = array();

    $closure = compact('parameters', 'use', 'body');

    $variables = $ref->getStaticVariables();

    $source = "return function(" . implode('', array_map($replaceToken, $closure['parameters']['tokens'])) .  ") ";
    if ( !empty($closure['use']['tokens']) ) {
      $useParams = array_map('trim', explode(',', implode('', array_map($replaceToken, $closure['use']['tokens']))));

      foreach ( $useParams as $param ) {
        if ( $param[0] == '$')
          $source = "$param = " . var_export($variables[substr($param, 1)], true) . ";\n$source";
      }

      $source .= "use(" . implode(', ', $useParams) .  ") ";
    }

    $source .= "{" .  implode('', array_map($replaceToken, $closure['body']['tokens'])) . "};";

    $test = function($ref) use($source) {
      $newClosure = eval($source);
      $newRef = new ReflectionFunction($newClosure);

      return ( array_map(function($a) { return $a->getName(); }, $newRef->getParameters()) == array_map(function($a) { return $a->getName(); }, $newRef->getParameters()) );
    };

    if ( $test($ref) )
      return $source;
  }

  $function_idx = findToken($tokens, T_FUNCTION, $body['end'] + 2);

  $tokens = $function_idx === false ? array() : array_slice($tokens, $function_idx);
}

return null;
}

function findToken(array $tokens, $needle, $start = 0, $end = PHP_INT_MAX)
{
$idx = false;
for ( $i = $start, $end = min($end, count($tokens)); $i < $end; ++$i ) {
  if ( (is_int($needle) && is_array($tokens[$i]) && $tokens[$i][0] === $needle) ||
    is_string($needle) && is_string($tokens[$i]) && $tokens[$i] === $needle ) {
    $idx = $i;
    break;
  }
}

return $idx;
}

function getNesting(&$matches, array $tokens, $begin = '{', $end = '}', $offset = 0)
{
$level = 0;
$start = false;

for ( $i = $offset, $count = count($tokens); $i < $count; ++$i ) {
  if ( is_array($tokens[$i]) ? ($tokens[$i][0] === $begin) : ($tokens[$i] === $begin) ) {
    ++$level;
    if ( $start === false )
      $start = $i + 1;
  }
  elseif ( is_array($tokens[$i]) ? ($tokens[$i][0] === $end) : ($tokens[$i] === $end) ) {
    if ( $start === false )
      break;

    if ( --$level == 0 ) {
      $matches = array(
        'tokens' => array_slice($tokens, $start, $i - $start),
        'start' => $start,
        'end' => $i - 1
      );
      return true;
    }
  }
}

$matches = null;
return false;
}
```
