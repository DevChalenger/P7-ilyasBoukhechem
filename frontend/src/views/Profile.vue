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
      <div class="d-flex justify-content-around flex-column m-5">
        <div class=" m-4">
          <i class="fas fa-user-circle m-2"></i>
          <div class="d-flex justify-content-center">
            <p><strong>Votre email : </strong></p>
            <p>{{ " " + user.email }}</p>
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
      <Footer />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      user: [],
      token: null,
    };
  },
  components: { Header, Footer },
  mounted() {
    this.getProfil();
  },
  methods: {
    logout() {
      sessionStorage.clear();
      window.location.href = "/#/";
    },
    getProfil() {
      const token = sessionStorage.getItem("token");
      this.token = token;
      if (token != null) {
        let decoded = jwt_decode(this.token);
        axios
          .get("http://localhost:3000/api/auth/user/" + decoded.userId, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => (this.user = res.data))
          .catch((error) => {
            alert(JSON.stringify(error.response.data.message));
            if (error.response.status == 401) {
              sessionStorage.clear();
              window.location.href = "/";
            }
          });
      }
    },
    deleteProfile() {
      if (this.token != null) {
        if (window.confirm("Voulez vous suprimer le profile ?")) {
          const token = sessionStorage.getItem("token");
          let decoded = jwt_decode(token);
          axios
            .delete("http://localhost:3000/api/auth/delete/" + decoded.userId, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res),
                (window.location.href = "/#/signup"),
                alert(JSON.stringify(res.response.data.message)),
                sessionStorage.clear();
            })
            .catch((error) => {
              if (error.response.status == 401) {
                sessionStorage.clear();
              }
              alert(JSON.stringify(error.response.data.message));
            });
        }
      }
    },
  },
  computed: {},
};
</script>
<style scoped>
i {
  font-size: 100px;
}
</style>
