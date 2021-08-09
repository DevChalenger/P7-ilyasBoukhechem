<template>
  <router-view />
</template>
<script></script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.card_title {
  text-align: center;
  font-weight: 800;
}
.card_subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.card__action {
  color: #2196f3;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
button:hover {
  cursor: pointer;
  border: none;
  background-color: rgb(226, 67, 67);
}
.button:active {
  cursor: pointer;
  border: none;
}
button:focus {
  outline: none;
}
.borderRadius {
  border-radius: 0.5em;
}
button {
  background-color: #7c0e0e;
  outline: none;
  border: 0;
  color: white;
  padding: 0.5em 1.5rem;
  border-radius: 0.5em;
}
.backgroundCard {
  background-color: rgb(250, 195, 195);
}
.backgroundCardHeader {
  background-color: #7c0e0e;
  color: rgb(250, 195, 195);
}
.backgroundText {
  background-color: white;
}
</style>
