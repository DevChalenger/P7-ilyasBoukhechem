import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    userData: {
      email: "",
      lastName: "",
      firstName: "",
      token: "",
    },
  },
  mutations: {
    setUserInfos(state, [email, lastName, firstName, token]) {
      (state.user.email = email),
        (state.user.lastName = lastName),
        (state.user.firstName = firstName);
      state.user.token = token;
    },
  },
  actions: {
    getUserData(set) {
      axios
        .get("http://localhost:3000/api/user/:id", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          set.commit("setUserInfos", [
            res.data.lastName,
            res.data.firstName,
            res.data.email,
            res.data.token,
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
