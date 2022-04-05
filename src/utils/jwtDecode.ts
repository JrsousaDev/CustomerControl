import jwt_decode from 'jwt-decode';

export async function jwtDecode(token: any) {
  let decoded = await jwt_decode(token);
  return decoded;
}