---
small_title: URL + DOM
title: Interpretando URLs com DOM
image: /posts/images/url.png
publish_date: 2013-07-24T12:01:48Z
layout: post
---

```js
function parseURL(url)
{
    var a = document.createElement('a');
    a.href = url;
    return {
          'href': a.href
        , 'scheme': a.protocol
        , 'host': a.host
        , 'port': a.port
        , 'path': a.pathname
        , 'query': a.search.charAt(0) == '?' ? a.search.substring(1) : null
        , 'hash': a.hash.charAt(0) == '#' ? a.hash.substring(1) : null
    };
}
```