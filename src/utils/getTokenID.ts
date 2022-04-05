import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";

export default async function getTokenId(context, nameToken){
  const cookies = parseCookies(context);
  const token = cookies[nameToken];
  let tokenDecoded;

  if(token) tokenDecoded = await jwtDecode(token);

  if (tokenDecoded?._id) {
    return tokenDecoded._id;
  }

  return false
}