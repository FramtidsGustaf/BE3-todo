import BASE_URL from '../constants';

export const useVerifyToken = async () => {
  const storageToken = localStorage.getItem('token');
  try {
    const res = await fetch(`${BASE_URL}user/verify-jwt`, {
      method: 'POST',
      headers: {
        Authorization: storageToken,
      },
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
    } else {
      localStorage.removeItem('token');
      return -1;
    }
  } catch {
    return -1;
  }
};
