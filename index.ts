import { exit } from "process";
import { Phone } from "./src/api/phone/phone";

let p = Phone();
p.update(3, "Xiaomi").then((res) => {
  console.log(res);
  exit();
});
