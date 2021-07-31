<template>
  <div class="signup container wrapper">
    <img
      alt="Groupomania logo"
      class="Logo "
      src="../assets/icon-above-font.png"
    />
    <nav class="">
      <router-link to="/" class="active">Se connecter</router-link> |
      <router-link to="/signup" class="unactive">S'inscrire</router-link>
    </nav>
    <form class="Form-Signup d-flex flex-column  " @submit.prevent="login()">
      <div class="m-1  p-2">
        <label>Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="m-1 p-2">
        <label>Mot de passe</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <button
        @click.prevent="login"
        class="button_disabled m-2 ml-5 mr-5"
        id="validate"
      >
        Valider
      </button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {},
  methods: {
    login() {
      const fields = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/api/auth/login", fields)
        .then((res) => {
          console.log("Utilisateur connecté");
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("usersId", res.data.userId);
          window.location.href = "/#/home";
        })
        .catch((error) => {
          console.log(error),
            alert("Les champs ne sont pas rempli correctement");
        });
    },
  },
};
</script>
<style scoped>
nav .active {
  color: red;
}
nav .unactive {
  color: rgb(200, 140, 140);
}
.Logo {
  max-height: 300px;
  width: auto;
}
.Form-Signup {
  border: 5px dashed red;
  background-color: rgb(255, 245, 245);
  min-height: 250px;
  width: 60%;
  min-width: 250px;
  margin: auto;
  margin-top: 0;
}
.Form-Signup div {
  display: flex;
  flex-direction: column;
}
.btn {
  background-color: rgb(250, 140, 140);
  color: white;
}
</style>
