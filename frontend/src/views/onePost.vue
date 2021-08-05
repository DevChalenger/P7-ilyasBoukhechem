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
        <div class="card m-5">
          <div class="card-header m-0">
            <h4 id="Title">
              {{ userPost.firstName }}
              {{ userPost.lastName }}
            </h4>
          </div>
          <div class="DescriptionBlock card-text">
            <h4 id="Title">{{ postId.title }}</h4>
            <p id="description" class="descriptionIndex">{{ postId.text }}</p>
            <div
              class=" d-flex justify-content-center"
              v-if="postId.imgUrl != null"
            >
              <img
                v-bind:src="'data:image/*;base64,' + postId.imgUrl"
                alt="dataImage"
              />
            </div>
            <div
              v-if="userId == postId.userId || isAdmin === true"
              class="m-4 "
            >
              <button @click.prevent="deletePost()" class="btn btn-danger">
                suprimer
              </button>
            </div>
          </div>
          <ModifyPost v-if="userId == postId.userId || isAdmin === true" />
          <div
            v-for="postComment in postId.comments"
            :key="postComment"
            class="card mt-4"
          >
            <div class="card-header">
              {{ postComment.user.firstName }}
              {{ postComment.user.lastName }}
            </div>
            <div>{{ postComment.text }}</div>
            <div v-if="userId == postComment.user.id || isAdmin === true">
              <button
                class="btn btn-danger"
                @click.prevent="deleteComment(postComment.id)"
              >
                suprimer le commentaire
              </button>
            </div>
            <div>{{ postComment.createdAt }}</div>
          </div>
          <div class="m-2">
            <form @submit.prevent="postComment()">
              <h5>Envoyer un commentaire :</h5>
              <textarea v-model="text" class="form-control"></textarea>
              <button @click.prevent="postComment()" class="btn btn-primary">
                valider
              </button>
            </form>
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
import ModifyPost from "../components/PostModify.vue";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      postId: [],
      userPost: [],
      token: null,
      text: "",
      userId: "",
      idAdmin: "",
    };
  },
  components: { Header, Footer, ModifyPost },
  mounted() {
    this.getOnePost();
  },
  methods: {
    getOnePost() {
      const token = sessionStorage.getItem("token");
      this.token = token;
      const postId = this.$route.params.id;
      let decoded = jwt_decode(token);

      const userId = decoded.userId;
      const isAdmin = decoded.admin;
      this.isAdmin = isAdmin;
      this.userId = userId;
      {
        axios
          .get("http://localhost:3000/api/posts/" + postId, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            (this.postId = res.data), (this.userPost = res.data.user);
          })
          .catch((error) => {
            if (error.response.status == 401) {
              sessionStorage.clear();
              window.location.href = "/";
            }
            alert(JSON.stringify(error.response.data.message));
          });
      }
    },
    postComment() {
      const postId = this.$route.params.id;
      const token = sessionStorage.getItem("token");
      this.token = token;
      const field = {
        text: this.text,
      };
      if (this.text.length > 2) {
        axios
          .post("http://localhost:3000/api/reply/" + postId, field, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then((res) => {
            console.log(res), window.location.reload(true);
          })
          .catch((error) => alert(JSON.stringify(error.response.data.message)));
      }
    },
    deletePost() {
      const postId = this.$route.params.id;

      if (window.confirm("Voulez vous suprimer ce post ?")) {
        axios
          .delete("http://localhost:3000/api/posts/" + postId, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then((res) => {
            console.log(res), (window.location.href = "/#/home");
          })
          .catch((error) => alert(JSON.stringify(error.response.data.message)));
      }
    },
    deleteComment(commentId) {
      if (window.confirm("Voulez vous suprimer ce commentaire ?")) {
        axios
          .delete("http://localhost:3000/api/reply/" + commentId, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then((res) => {
            console.log(res), window.location.reload(true);
          })
          .catch((error) => alert(JSON.stringify(error.response.data.message)));
      }
    },
  },
  computed: {},
};
</script>
<style scoped>
img {
  max-height: 400px;
  width: 100%;
}
textarea {
  width: 100%;
}
</style>
