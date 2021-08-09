<template>
  <div class="signup container wrapper">
    <img
      alt="Groupomania logo"
      class="Logo "
      src="../assets/icon-above-font.png"
    />
    <nav class="">
      <router-link to="/" class="unactive">Se connecter</router-link> |
      <router-link to="/signup" class="active">S'inscrire</router-link>
    </nav>
    <form class="Form-Signup d-flex flex-column  " @submit.prevent="signup()">
      <div class="m-1 p-2">
        <label class="" for="lastName">Nom</label>
        <input id="lastName" class="form-control" v-model="lastName" />
      </div>
      <div class="m-1 p-2">
        <label for="firstName">Prénom</label>
        <input id="firstName" class="form-control" v-model="firstName" />
      </div>
      <div class="m-1  p-2">
        <label for="email">Email</label>
        <input id="email" class="form-control" type="email" v-model="email" />
      </div>
      <div class="m-1 p-2">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          class="form-control"
          type="password"
          v-model="password"
        />
      </div>
      <button
        @click.prevent="signup"
        class="btn btn-primary m-2 ml-5 mr-5"
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
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      lastName: "",
      firstName: "",
    };
  },
  components: {},
  methods: {
    signup() {
      const fields = {
        email: this.email,
        password: this.password,
        lastName: this.lastName,
        firstName: this.firstName,
      };
      if (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)) {
        axios
          .post("http://localhost:3000/api/auth/signup", fields)
          .then(() => {
            console.log("Utilisateur enrengistré");
            window.location.href = "/#/";
          })
          .catch((error) => {
            console.log(error),
              alert(JSON.stringify(error.response.data.message));
          });
      } else {
        alert("l'email est invalide");
      }
    },
  },
};
</script>
<style scoped>
nav .active {
  color: #eb0000;
}
nav .unactive {
  color: #a45b5b;
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
</style>
