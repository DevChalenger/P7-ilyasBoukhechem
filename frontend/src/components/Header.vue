<template>
  <div id="app">
    <div class="header d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <img src="@\assets\icon.png" />
      </div>
      <div class="d-flex align-items-center">
        <nav>
          <ul class="d-flex flex-column p-0 mb-0">
            <li class="m-2">
              <router-link to="/Home">Acceuil</router-link>
            </li>
            <li class="m-2">
              <router-link to="/allUsers">Liste des utilisateur </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="d-flex align-items-center p-4">
        <router-link to="/user/:id">
          <i class="fas fa-user-circle"> </i
        ></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {},
  methods: {},
};
</script>
<style scoped>
.header {
  width: 100%;
  margin: 0 0 20px 0;

  box-shadow: 20px -20px 20px 20px;
}
img {
  z-index: 200;
  height: 100px;
  width: 100px;
}
ul {
  list-style: none;
}
i {
  font-size: 75px;
}
</style>
