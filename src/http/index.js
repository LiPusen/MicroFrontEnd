import api from './api'
import axios from 'axios'

// 全局设置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

const htp = axios.create({
    baseURL: '',
    timeout: 30000
})
htp.interceptors.request.use(config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
}, err => {
    console.log(err)
})

// 处理接口规范的公有方法
const server = ({ ur, options = {} }) => {
    let p;
    switch (api[ur].method) {
        case 'get':
            p = new Promise(function (resolve, reject) {
                htp.get(api[ur].api, { params: options }).then(response => {
                    resolve(response.data)
                }, er => {
                    errHandler(er)
                })
            })
            break;
        case 'post':
            p = new Promise(function (resolve, reject) {
                htp.post(api[ur].api, options).then(response => {
                    if (response.data.code == 200) {
                        resolve(response.data.body)
                    } else {
                        reject(response.data)
                    }
                }, er => {
                    errHandler(er)
                })
            })
            break;
        default:
            break;
    }
    return p
}

function errHandler(er) {
    console.log("error:" + er)
}

export default server