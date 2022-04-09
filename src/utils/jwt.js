import decode from "jwt-decode";

export const isValidJwt = (token) => {
  const decodedToken = decode(token)

  const expirationDate = decodedToken.exp

  return !(Date.now() >= expirationDate * 1000)
} 