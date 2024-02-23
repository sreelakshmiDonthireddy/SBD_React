const config = {
    api: 'http://127.0.0.1:5000/',
    apis:'https://reqres.in/api/',
    options: {
      headers: { 'content-type': 'application/json' },
    },
  };

  const httpGet = (endpoint:any) => {
    return fetch(`${config.api}${endpoint}`, {
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };

  const httpPost = (endpoint:any, data:any) => {
    return fetch(`${config.apis}${endpoint}`, {
      method: 'post',
      body: data ? JSON.stringify(data) : null,
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  const handleResponse = (response:any) => {
    // You can handle 400 errors as well.
    if (response.status === 200) {
      return response.json();
    } else {
      throw Error( 'error');
    }
  };
  
// function handleResponse(response: Response): any {
//     throw new Error("Function not implemented.");
// }
export default { httpGet, httpPost };