import axios from 'axios'

// You can add your headers here
// ================================
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.timeout = 15000

export default axios
