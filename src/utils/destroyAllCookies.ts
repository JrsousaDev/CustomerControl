import { destroyCookie } from "nookies";

export default async function destroyAllCookies(ctx = undefined) {
  destroyCookie(ctx, "customerControl.token", {
    path: "/",
  });
}