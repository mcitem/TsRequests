interface APIResponse<T> {
  code: number;
  msg: string;
  data: T;
}
import requests from "./requests";
export function APITest() {
  return requests.get<APIResponse<any>>({
    url: "/test",
  });
}
