import TsRequests from "./TsRequests";
import type { TsFailResponse } from "./TsRequests";

export const requests = new TsRequests({
  baseURL: "https://example.com/api",
});

requests.interceptors.request = (config) => {
  if (config.loading === undefined || config.loading === true) {
    uni.showLoading({
      title: "loading",
    });
  }
  console.log(config);
  return config;
};

requests.interceptors.response = (response) => {
  if (response.config.loading != false) {
    uni.hideLoading();
  }

  if (response.isSuccess == false) {
    response as TsFailResponse;
  }
  console.log(response);
  return response;
};

export default requests;
