<template>
  <div class="d-flex flex-column justify-content-center block">
    <h2>Créer un nouveaux post</h2>
    <form
      class=" d-flex flex-column justify-content-center "
      @submit.prevent="onSubmit()"
    >
      <div>
        <label>Titre</label>
        <input id="title" type="text" class="m-2" v-model="title" />
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <label>text</label>
        <textarea id="text" type="text" class="m-2 text" v-model="text" />
      </div>
      <div>
        <input type="file" @change="onFileSelected" class="m-2" />
      </div>
      <button @click.prevent="onSubmit">valider</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CreatePost",
  data() {
    return { text: "", title: "", imgUrl: "" };
  },
  mounted() {},
  methods: {
    onFileSelected(event) {
      const selectedFile = event.target.files[0];
      this.imgUrl = selectedFile;
      console.log(this.imgUrl);
      return this.imgUrl;
    },
    onSubmit() {
      const fields = {
        title: this.title,
        text: this.text,
        imgUrl: this.onFileSelected(event),
      };

      if (fields.title != null || fields.text != null) {
        axios
          .post("http://localhost:3000/api/posts/", fields, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })

          .then(() => (window.location.href = "/#/Home"))
          .catch((error) => console.log(error));
      }
    },
  },
  props: {},
};
</script>
<style>
.block {
  border: 2px solid rgba(168, 166, 166, 0.2);
  border-radius: 1em;
}
</style>
