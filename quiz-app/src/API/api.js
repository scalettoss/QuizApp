import axios from "axios";

export const BASE_URL = "http://localhost:58752/";

export const ENDPOINTS = {
  participant: "participant",
  question: "question",
  user: "user",
  map: "map",
};

const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + "api/" + endpoint + "/";
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updateRecord) => axios.put(url + id, updateRecord),
    delete: (id) => axios.delete(url + id),
    login: (user) => axios.post(url + "login", user),
    register: (user) => axios.post(url + "register", user),
    getquestion: (number) =>
      axios.get(url + "getquestion", { params: { number } }),
    userinfo: (token) => axios.post(url + "userinfo", { token: token }),
    createBy: (createdBy) =>
      axios.get(url + "createdby", { params: { createdBy } }),
  };
};

export default createAPIEndpoint;
