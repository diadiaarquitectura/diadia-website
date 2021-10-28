<template>
  <nuxt />
</template>

<style>
@font-face {
  font-family: 'Futura';
  src: url('/fonts/0f56c874ba695191e7f4cab237447698.eot');
  src: url('/fonts/0f56c874ba695191e7f4cab237447698.eot?#iefix') format('embedded-opentype'),
    url('/fonts/0f56c874ba695191e7f4cab237447698.woff2') format('woff2'),
    url('/fonts/0f56c874ba695191e7f4cab237447698.woff') format('woff'),
    url('/fonts/0f56c874ba695191e7f4cab237447698.ttf') format('truetype'),
    url('/fonts/0f56c874ba695191e7f4cab237447698.svg#Futura') format('svg');
}

body,
html {
  font-family: 'Futura', Arial, Helvetica, sans-serif;
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
}

/* #__nuxt, */
#__layout {
  height: 100%;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

/* width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f0f0f0;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #ddd;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #eee;
}

:focus {
  outline: none;
}
::-moz-focus-inner {
  border: 0;
}
</style>
