const api = async url => {
  //   return  fetch(url).then(response => response.json());
  const res = await fetch(url);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

export default api;
