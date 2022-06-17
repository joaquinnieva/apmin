export function isLogged() {
  const token = localStorage.getItem("token")
  return token ||null
}