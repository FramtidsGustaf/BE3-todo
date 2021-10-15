export const verifyToken = async () => {

  const storageToken = localStorage.getItem('token');

  const res = await fetch("http://localhost:3000/user/verify-jwt", {
    method: "POST",
    headers: {
      Authorization: `${storageToken}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data.token;
  }
}