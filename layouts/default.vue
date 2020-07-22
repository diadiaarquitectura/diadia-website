<template>
  <nuxt />
</template>

<style>
@import url(https://db.onlinewebfonts.com/c/0f56c874ba695191e7f4cab237447698?family=Futura);

body,
html {
  font-family: 'Futura', Arial, Helvetica, sans-serif;
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
