import axios from "axios";

const instance = axios.create({
  baseURL: "https://photographersekb.ru:8080/admin",
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      document.cookie = "SESSION=; path=/;";
      window.location.reload();
      return;
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;
