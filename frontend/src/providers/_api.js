import axios from 'axios'
import {t} from '../utils/translate'

function header() {
	return {
		token: localStorage.getItem('token') || '',
		deviceId: localStorage.getItem('deviceId') || '',
		'Content-Type': 'application/json',
	}
}

function error(err) {
  console.log('error:',err.response.data)
  if(err && err.response && err.response.data && err.response.data.error){
    return {
      name:err.response.data.error.name,
      message:t(err.response.data.error.message),
    }
  }else{
    return err.message || err
  }
}

export function getData(func, config = {}) {
	return new Promise((resolve, reject) => {
		config = Object.assign(
			{
				method: 'get',
				url: func,
				baseURL: process.env.REACT_APP_API_URL,
				headers: header(),
			},
			config
		)
		
		axios(config)
			.then((resp) => {
				resolve(resp.data)
			})
			.catch((err) => reject(error(err)))
	})
}

export function post(func, config = {}) {
	return new Promise((resolve, reject) => {
		config = Object.assign(
			{
				method: 'post',
				url: func,
				baseURL: process.env.REACT_APP_API_URL,
				headers: header(),
			},
			config
		)
		console.log(`api.post config:`, config)
		axios(config)
			.then((resp) => {
				console.log('api.post resp:', resp)
				resolve(resp.data)
			})
			.catch((err) => reject(error(err)))
	})
}

export function put(func, config = {}) {
	return new Promise((resolve, reject) => {
		config = Object.assign(
			{
				method: 'put',
				url: func,
				baseURL: process.env.REACT_APP_API_URL,
				headers: header(),
			},
			config
		)
		console.log(`api.put config:`, config)
		axios(config)
			.then((resp) => {
				console.log('api.put resp:', resp)
				resolve(resp.data)
			})
			.catch((err) => reject(error(err)))
	})
}

export function remove(func, config = {}) {
	return new Promise((resolve, reject) => {
		config = Object.assign(
			{
				method: 'delete',
				url: func,
				baseURL: process.env.REACT_APP_API_URL,
				headers: header(),
			},
			config
		)
		console.log(`api.remove config:`, config)
		axios(config)
			.then((resp) => {
				console.log('api.remove resp:', resp)
				resolve(resp.data)
			})
			.catch((err) => reject(error(err)))
	})
}
