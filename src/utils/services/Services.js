import axios from "axios";


const axiosLoginData = async (postData) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/users/login`, postData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(JSON.parse(error.request.response));
        });
    });
  };
  const axiosGetData = async (url) => {
    let headers = {
        headers: {
            "x-access-token": sessionStorage.getItem("accessToken"),
            "refreshToken": sessionStorage.getItem("refreshToken"),
            "Content-Type": "application/json"
        }
      };

    //  const resp =  await axios.get(url, headers).then((response) => {
    //     //   console.log('response', response);
    //       return response.data;
    //     })
    //     .catch((error) => {
          
    //     });
        
    // return resp;


      
    return new Promise(async (resolve, reject) => {
      axios
        .get(url, headers)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error : { error: "Invalid data" });
        });
    });
    
  };
  
  const axiosPostData = async (url, postData) => {
    let headers = {
      headers: {
        "x-access-token": sessionStorage.getItem("accessToken"),
        "refreshToken": sessionStorage.getItem("refreshToken"),
        "Content-Type": "application/json"
    }
    };
    return new Promise(async (resolve, reject) => {
      axios
        .post(url, postData, headers)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error ? error : { error: "Invalid data" });
        });
    });
  };
  
  const axiosPatchData = async (url, postData) => {
    let headers = {
      headers: {
        "x-access-token": sessionStorage.getItem("accessToken"),
        "refreshToken": sessionStorage.getItem("refreshToken"),
        "Content-Type": "application/json"
    }
    };
    return new Promise(async (resolve, reject) => {
      axios
        .patch(url, postData, headers)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          // console.log(error);
          reject(error ? error : { error: "Invalid data" });
        });
    });
  };
  
  const clearSession = (history) => {
    ["refreshToken", "accessToken", "user"].map((item) => sessionStorage.removeItem(item));
    history.push(`/`);
  };
  
  export {
    axiosLoginData,
    axiosPostData,
    axiosGetData,
    clearSession,
    axiosPatchData
  };