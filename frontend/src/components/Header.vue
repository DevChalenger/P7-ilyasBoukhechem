<template>
  <div id="app">
    <header
      class="header d-flex justify-content-center-xs justify-content-around  flex-wrap mb-5 backgroundCard"
    >
      <div class="d-flex align-items-center ">
        <img src="@\assets\icon.png" alt="dataImage" />
      </div>
      <div class="d-flex align-items-center flex-wrap">
        <nav>
          <ul class="d-flex flex-column p-0 mb-0">
            <li class="m-2 btn">
              <router-link to="/Home">
                <button class="">
                  Accueille
                </button>
              </router-link>
            </li>
            <li class="m-2">
              <router-link to="/allUsers">
                <button class="">
                  Liste des utilisateur
                </button>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="d-flex align-items-center p-4">
        <router-link to="/user/:id" class="">
          <button class="">
            <div class="d-flex flex-column">
              <i class="fas fa-user-circle"> </i>
              <span>Compte</span>
            </div>
          </button>
        </router-link>
      </div>
    </header>
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
