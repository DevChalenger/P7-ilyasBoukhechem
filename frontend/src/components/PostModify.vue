<template>
  <div class="d-flex flex-column justify-content-center block p-4">
    <h2>Modifier le post</h2>
    <form
      class=" d-flex flex-column justify-content-center "
      @submit.prevent="onSubmit()"
      enctype="multipart/form-data"
    >
      <div class="d-flex flex-column justify-content-center align-items-center">
        <label for="title">Titre</label>
        <input
          id="title"
          type="text"
          class="m-2 form-control"
          v-model="title"
        />
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <label for="text" class="">Text :</label>
        <textarea
          id="text"
          type="text"
          class="m-2 text form-control"
          v-model="text"
        />
      </div>
      <div
        class="d-flex custom-file flex-column justify-content-center align-items-center"
      >
        <input
          type="file"
          ref="file"
          @change="fileSelected"
          class="d-flex flex-column custom-file-input"
        />
        <label for="file" class="custom-file-label">
          <i class="fas fa-upload"></i>
        </label>
      </div>
      <div>
        <img id="output" class="m-2" />
      </div>
      <div
        class="d-flex m-2 flex-column justify-content-center align-items-center"
      >
        <button @click.prevent="onSubmit" class="btn btn-primary">
          valider
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ModifyPost",
  data() {
    return {
      text: "",
      title: "",
      file: null,
    };
  },
  methods: {
    fileSelected() {
      let file = this.file;
      file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.onload = function() {
        let dataURL = reader.result;
        let output = document.getElementById("output");
        output.src = dataURL;
        /* console.log(reader.result); */
      };
      reader.onloadend = function() {
        let imgData = reader.result.replace(/^data:.+;base64,/, "");
        sessionStorage.setItem("imgData", imgData);
      };
      reader.onerror = (error) => error;
      reader.readAsDataURL(file);
      /*    console.log(dataURL); */
    },
    onSubmit() {
      const fields = {
        title: this.title,
        text: this.text,
        imgUrl: sessionStorage.getItem("imgData"),
      };
      const postId = this.$route.params.id;
      if (fields.title.length >= 2 && fields.text.length >= 2) {
        axios
          .put("http://localhost:3000/api/posts/" + postId, fields, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
          .then(
            (res) => console.log(res),
            sessionStorage.removeItem("imgData"),
            window.location.reload(true)
          )

          .catch((error) => alert(JSON.stringify(error.response.data.message)));
      } else {
        alert("Tout les champs ne sont pas rempli");
      }
    },
  },
  props: {},
};
</script>
<style scoped>
.block {
  border: 2px solid rgba(168, 166, 166, 0.2);
  border-radius: 1em;
}
textarea {
  width: 100%;
  height: 100px;
}
img {
  min-width: 100px;
  max-height: 300px;
}
</style>
