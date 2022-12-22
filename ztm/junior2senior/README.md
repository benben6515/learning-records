# Junior to Senior Web Developer

## SSH

## Performance Part1

> Critical Render Path

DOM -> CCSOM -> (DOMContentLoaded) Render Tree -> Layout -> Paint (Load)

```html
<script></script>
==        ==
  ----
      ~~~
<script async></script>
======    ==
  ----
      ~~~
<script defer></script>
==========
  ----
          ~~~
<!--
= : HTML parsing
- : Script download
~ : Script execution
-->
```

```javascript
document.addEvenListener("DOMContentLoaded", (event) => {
  console.log('DOM fully loaded and parsed')
})
document.addEventListener("load", (event) => {
  console.log('All resources finished loading!')
})
console.log('hello world')

// hello world
// DOM fully loaded and parsed
// All resources finished loading
```

- pageSpeed Insight
- webpage test
- TODO

## React + Redux + Module Bundling

## Performance Part 2

## Testing
