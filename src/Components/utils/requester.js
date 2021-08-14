import axios from "axios"

export default {
  post: (url, params = {}) => {
    const LocStr =  localStorage.getItem('token')
    return new Promise((resolve, reject) => {
      const data = new FormData();
      Object.keys(params).map((v) => {
        data.append(v, params[v]);
      });
      axios.post(`https://api.chat.besoft.kg/v1${url}`, data,
        {
          headers: LocStr ? {
            Authorization: "Bearer " + LocStr
          } : {}
        } 
      ).then((response) => {
        resolve(response)
      }).catch((e) => {
        console.log(e)
        alert(e.message)
        reject(e)
      })
    })
  },
  get: (url, params) => {
    const LocStr =  localStorage.getItem('token')
    return new Promise((resolve, reject) => {
      axios.get(`https://api.chat.besoft.kg/v1${url}`, {
        params,
        headers:  {
          Authorization: "Bearer " + LocStr
        }
      }).then((response) => {
        resolve(response)
      }).catch((e) => {
        console.log(e)
        alert(e.message)
        reject(e)
      })
    })
  }
}