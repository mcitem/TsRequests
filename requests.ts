import TsRequests from "./TsRequests";
export const requests = new TsRequests({
  baseURL: "https://api.example.com",
});
export default requests;
requests.interceptors.request = (config) => {
  if (config.loading === undefined || config.loading === true) {
    uni.showLoading({
      title: "loading",
    });
  }
  return config;
};

requests.interceptors.response = (response) => {
  if (response.config.loading != false) {
    uni.hideLoading();
  }
  if (response.isSuccess === true) {
    return response;
  } else {
    return response;
  }
};
