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
    update: (id) => axios.put(url + id),
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
    getParticipant: (mapId, userId) => axios.get(url + mapId + "/" + userId),
    getbymap: (mapId) => axios.get(url + "getbymap/" + mapId),
    getAvailableMap: () => axios.get(url + "availablemap"),
    getParbyMapId: (mapId) => axios.get(url + "getparbymapid/" + mapId),
    deleteQuestByMapId: (id) => axios.delete(url + "deleteby-mapid/" + id),
    deletePartByMapUserId: (mapId, userId) =>
      axios.delete(url + mapId + "/" + userId),
  };
};

export default createAPIEndpoint;
