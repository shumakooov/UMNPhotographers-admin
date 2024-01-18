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
    if (error.response.status === 401) {
      document.cookie = "SESSION=; path=/;";
      window.location.reload();
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;
