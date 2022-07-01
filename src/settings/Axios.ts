import Axios from 'axios'
const cookies = document.cookie.split("; ");
const cookie = cookies.find((_) => _.startsWith("XSRF-TOKEN")) || "";
const csrfToken = decodeURIComponent(cookie.split("=")[1]);

const axios = Axios.create({
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
    }
})

export default axios
