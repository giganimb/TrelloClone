import axios from "axios";

const $api =  axios.create({
  withCredentials: true,
  baseURL: `http://localhost:3000/api/v1/`,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if(error.response.status == 401 && error.config && !error.config._isRetry){
    originalRequest._isRetry = true;
    try{
      const response = await axios.get("http://localhost:3000/api/v1/auth/refresh", {withCredentials: true});
      localStorage.setItem("token", response.data.userData.accessToken);
      return $api.request(originalRequest);
    }
    catch(e){
      console.log(e);
    }
  }
  throw error;
});

export default $api;