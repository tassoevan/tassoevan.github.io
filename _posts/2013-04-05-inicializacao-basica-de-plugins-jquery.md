---
small_title: jQuery
title: Inicialização básica de plugins jQuery
tags:
    - jquery
publish_date: 2013-04-05T16:49:03Z
layout: post
---

```js
// Basic jQuery plugins initialization
var MyNamespace = MyNamespace || {};

MyNamespace.applyPlugins = function(parent) {
if (!parent)
    parent = $('body');

$('[data-focus=auto]', parent).focus();

var richEdits = $('textarea[data-rich=true]');
if (richEdits.size() > 0) {
    richEdits.fadeTo(0, 1e-8);

  // head.js used here for instance
  head.js('/js/vendor/ckeditor/ckeditor.js').ready(function() {
    richEdits.fadeTo(0, 1).each(function() {
      $(this).myRichEditorPlugin();
    });
  });
}

// more stuff ...
};

$(function() {
MyNamespace.applyPlugins();
});
```
