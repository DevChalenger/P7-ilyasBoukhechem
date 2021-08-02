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
    <div v-if="token != null" class="">
      <Header />
      <div class=" d-flex justify-content-center">
        <div class="card m-2">
          <div class="card-header">
            <h2 id="Title">
              {{ postId.user.lastName + " " + postId.user.firstName }}
            </h2>
          </div>
          <div class="DescriptionBlock card-text">
            <h2 id="Title">{{ postId.title }}</h2>
            <p id="description" class="descriptionIndex">{{ postId.text }}</p>
            <div
              class="m-4 d-flex justify-content-center"
              v-if="postId.imgUrl != null"
            >
              <img v-bind:src="'data:image/*;base64,' + postId.imgUrl" />
            </div>
          </div>
          <div
            v-for="postComments in postId.comments"
            :key="postComments"
            class="card"
          >
            {{ postComments.text }}
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

export default {
  data() {
    return {
      postId: [],
      token: null,
    };
  },
  components: { Header, Footer },
  mounted() {
    this.getOnePost();
  },
  methods: {
    getOnePost() {
      const token = sessionStorage.getItem("token");
      this.token = token;
      const postId = this.$route.params.id;
      axios
        .get("http://localhost:3000/api/posts/" + postId, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res), (this.postId = res.data);
        })
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
<style scoped>
img {
  min-height: 200px;
  max-height: 400px;
}
</style>
