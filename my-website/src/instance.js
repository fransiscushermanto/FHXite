import axios from "axios";

var instance = axios.create({
  baseURL:
    window.location.protocol + "//" + window.location.hostname + ":8000/",
  headers: { "X-Custom-Header": "foobar" }
});

export default instance;
