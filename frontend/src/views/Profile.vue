<template>
  <div>
    <div v-if="token == null" class="d-flex justify-content-center">
      <div class="card mt-5 p-5 ">
        Pour pouvoir consulter la page vous devez vous connecter
        <router-link to="/">Connection</router-link><br />
        Si vous n'avez pas encore de compte inscrivez vous
        <router-link to="/signup">Inscription</router-link>
      </div>
    </div>
    <div v-if="token != null">
      <Header />
      <div class="d-flex justify-content-around ">
        <div class=" ">
          <div class="d-flex justify-content-center">
            <p><strong>Votre email :</strong></p>
            <p>{{ user.email }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <p><strong>Votre prénom :</strong></p>
            <p>{{ user.firstName }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <p><strong>Votre Nom:</strong></p>
            <p>{{ user.lastName }}</p>
          </div>
        </div>
        <div>
          <div>
            <button type="button" class="btn btn-danger mb-4" @click="logout">
              Déconnection
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-danger" @click="deleteProfile">
              Suprimer le profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Header from "../components/Header.vue";

export default {
  data() {
    return {
      user: [],
      token: null,
    };
  },
  components: { Header },
  mounted() {
    this.getProfil();
  },
  methods: {
    logout() {
      sessionStorage.clear();
      window.location.href = "/#/signup";
    },
    getProfil() {
      const token = sessionStorage.getItem("token");
      this.token = token;
      const id = sessionStorage.getItem("usersId");
      axios
        .get("http://localhost:3000/api/auth/user/" + JSON.parse(id), {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => (this.user = res.data))
        .catch((error) => console.log(error));
    },
    deleteProfile() {
      if (window.confirm("Voulez vous suprimer le profile ?")) {
        const id = sessionStorage.getItem("usersId");
        axios
          .delete("http://localhost:3000/api/auth/delete/" + JSON.parse(id), {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
          .then(
            (res) => console.log(res),
            (window.location.href = "/#/signup"),
            sessionStorage.clear()
          )
          .catch((error) => console.log(error));
      }
    },
  },
  computed: {},
};
</script>
