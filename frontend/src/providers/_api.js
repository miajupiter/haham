import axios from 'axios'
import { t } from '../utils/translate'

function header() {
  return {
    token: localStorage.getItem('token') || '',
    deviceId: localStorage.getItem('deviceId') || '',
    'Content-Type': 'application/json',
  }
}

function error(err) {
  let errMsg='Error'
  if (err && err.response && err.response.data && err.response.data.error) {
    if(typeof err.response.data.error==='string'){
      errMsg=err.response.data.error
    }else if(err.response.data.error.message){
      errMsg=err.response.data.error.message
    }
  } 
  
  return errMsg
  
}

export function getData(func, config = {}) {
  return new Promise((resolve, reject) => {
    config = Object.assign(
      {
        method: 'GET',
        url: func,
        baseURL: process.env.REACT_APP_API_URL,
        headers: header(),
      },
      config
    )

    axios(config)
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(error(err)))
  })
}

export function post(func, config = {}) {
  return new Promise((resolve, reject) => {
    config = Object.assign(
      {
        method: 'POST',
        url: func,
        baseURL: process.env.REACT_APP_API_URL,
        headers: header(),
      },
      config
    )
    axios(config)
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(error(err)))
  })
}

export function put(func, config = {}) {
  return new Promise((resolve, reject) => {
    config = Object.assign(
      {
        method: 'PUT',
        url: func,
        baseURL: process.env.REACT_APP_API_URL,
        headers: header(),
      },
      config
    )
    axios(config)
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(error(err)))
  })
}

export function remove(func, config = {}) {
  return new Promise((resolve, reject) => {
    config = Object.assign(
      {
        method: 'DELETE',
        url: func,
        baseURL: process.env.REACT_APP_API_URL,
        headers: header(),
      },
      config
    )
    axios(config)
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(error(err)))
  })
}
