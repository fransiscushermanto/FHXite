import axios from "axios";

var instance = axios.create({
  baseURL: `${process.env.REACT_APP_SOCKET_URL || window.location.origin}`,
  headers: { "X-Custom-Header": "foobar" }
});

export default instance;
