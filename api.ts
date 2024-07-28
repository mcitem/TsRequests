import requests from "./requests";
export async function APITest() {
  return requests
    .get<{
      test: string;
    }>({
      url: "/test",
    })
    .then((res) => res.data);
}
