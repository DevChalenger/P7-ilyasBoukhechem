<template>
  <div id="app">
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
      <div class="container">
        <h3 class="heading">Users</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Nom et prénom</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user">
              <td>{{ user.lastName + " " + user.firstName }}</td>

              <td>
                <a v-bind:href="'mailto:' + user.email">{{ user.email }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
export default {
  name: "app",
  data() {
    return {
      users: [],
      token: null,
    };
  },
  components: { Header },
  mounted() {
    this.getAllusers();
  },
  methods: {
    getAllusers() {
      const token = sessionStorage.getItem("token");
      this.token = token;
      axios
        .get("http://localhost:3000/api/auth/users", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => (this.users = res.data))
        .catch((error) => {
          if (error.response.status == 401) {
            sessionStorage.clear();
            window.location.href = "/";
          }
          alert(JSON.stringify(error.response.data.message));
        });
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
.heading {
  margin-bottom: 30px;
}
</style>
