const axios = require('axios').default;
const get = (url) => axios.get(url);
const post = (url, payload) => axios.post(url, payload);

export default {
  get,
  post
};