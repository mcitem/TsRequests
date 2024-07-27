export interface RequestOptions {
  baseURL?: string;
  loading?: boolean;

  url: string;
  data?: string | Record<string, any>;
  method?: "GET" | "POST";
  header?: Record<string, string>;
  timeout?: number;
}

export type TsSuccessResponse = UniApp.RequestSuccessCallbackResult & {
  config: RequestOptions;
  isSuccess: true;
};

export type TsFailResponse = UniApp.GeneralCallbackResult & {
  config: RequestOptions;
  isSuccess: false;
};

class TsRequests {
  private Options: Partial<RequestOptions> = {
    baseURL: "",
    timeout: 5500,
    loading: true,
  };

  interceptors = {
    request: (options: RequestOptions) => options,
    response: (response: TsSuccessResponse | TsFailResponse) => response,
  };

  constructor(params: Partial<RequestOptions>) {
    this.Options = Object.assign(this.Options, params);
  }

  request(options: RequestOptions): Promise<TsSuccessResponse> {
    options = {
      ...this.Options,
      ...options,
    };
    options = this.interceptors.request(options);
    options.url = this.Options.baseURL + options.url;
    return new Promise((resolve, reject) => {
      uni.request({
        ...options,
        success: (res) => {
          resolve(
            this.interceptors.response(
              Object.assign(res, {
                config: options,
                isSuccess: true as true,
              })
            ) as TsSuccessResponse
          );
        },
        fail: (err) => {
          reject(
            this.interceptors.response(
              Object.assign(err, {
                config: options,
                isSuccess: false as false,
              })
            ) as TsFailResponse
          );
        },
      });
    });
  }

  get(options: RequestOptions) {
    return this.request(Object.assign(options, { method: "GET" }));
  }

  post(options: RequestOptions) {
    return this.request(Object.assign(options, { method: "POST" }));
  }

  all(...promises: Promise<TsSuccessResponse>[]) {
    return Promise.all(promises);
  }
}

export default TsRequests;
