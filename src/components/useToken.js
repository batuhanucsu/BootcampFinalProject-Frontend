import { useState } from 'react';

 function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const data = JSON.parse(tokenString);
    return data?.data?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

export default useToken;