<template>
  <div id="app">
    <div v-if="token == null" class="d-flex justify-content-center">
      <div class="card mt-5 p-5 ">
        Pour pouvoir consulter la page vous devez vous connecter
        <a href="/">Connection</a><br />
        Si vous n'avez pas encore de compte inscrivez vous
        <router-link to="/signup">Inscription</router-link>
      </div>
    </div>
    <div v-if="token != null">
      <Header />
      <div class="container">
        <h1 class="heading">Bienvenu sur Groupomania</h1>
        <NewPost />
        <div
          v-for="post in posts"
          :key="post"
          class="d-flex justify-content-center"
        >
          <div class="card m-4">
            <div class="card-header">
              <h4 id="Title">
                {{ post.user.lastName + " " + post.user.firstName }}
              </h4>
            </div>
            <div class="DescriptionBlock card-text">
              <h4 id="Title">{{ post.title }}</h4>
              <p id="description" class="descriptionIndex">{{ post.text }}</p>
              <div
                class="m-2 d-flex justify-content-center"
                v-if="post.imgUrl != null"
              >
                <img
                  v-bind:src="'data:image/*;base64,' + post.imgUrl"
                  alt="dataImage"
                />
              </div>
            </div>
            <div
              class="DescriptionBlock card-text d-flex justify-content-around"
            >
              <a v-bind:href="'/#/post/' + post.id">
                <i class="fas fa-comments"></i
              ></a>
              <span>{{ post.comments.id }}</span>
              <p id="description" class="descriptionIndex">
                {{ post.createdAt }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewPost from "../components/CreatePost.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "app",
  components: {
    NewPost,
    Header,
    Footer,
  },
  data() {
    return {
      posts: [],
      token: null,
    };
  },
  mounted() {
    this.getAllposts();
  },
  methods: {
    getAllposts() {
      const token = sessionStorage.getItem("token");
      this.token = token;
      axios
        .get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => (this.posts = res.data))
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(error.response.data.message));
          if (error.response.status == 401) {
            sessionStorage.clear();
            window.location.href = "/";
          }
        });
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
i {
  font-size: 30px;
}
img {
  width: 100%;
}
</style>
