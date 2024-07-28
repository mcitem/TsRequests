import { APITest } from "./api";
APITest().then(({ data: { data } }) => {
  console.log(data);
});
