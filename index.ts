import { Phone } from "./src/api/phone/phone";

let p = Phone();
p.removePhone(2).then((res) => {
  console.log(res);
});
