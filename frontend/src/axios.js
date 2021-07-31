import axios from "axios";

// Configuration d'Axios
export default axios.create({
  backendURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
  },
});
