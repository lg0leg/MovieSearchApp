export const getDataFromApi = async (query) => {
  const response = await fetch('/express_backend');
  const apiKey = await response.json();

  const fetchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey.key}`,
    },
  };

  let resp = await fetch(query, fetchOptions);
  let data = await resp.json();

  return data;
};

// export const getDataFromApi = async (query) => {
//   const response = await fetch('/express_backend')
//     .then((data) => data.json())
//     .then((data) => {
//       return fetch(query, {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           Authorization: `Bearer ${data.key}`,
//         },
//       });
//     })
//     .then((data) => data.json());

//   return response;
// };
