import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/admin`,
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
  }
);

export default instance;
