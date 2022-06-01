import Axios from 'axios'

const axios = Axios.create({
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true,
    headers: {
        'content-type': 'application/json'
    }
})

export default axios
