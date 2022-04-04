import { destroyCookie } from "nookies";

export default async function destroyAllCookies() {
  destroyCookie(null, "customerControl.token", {
    path: "/",
  });
}