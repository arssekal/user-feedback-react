import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/feedbacks";

export const listUserFeedbacks = () => {
    return axios.get(REST_API_BASE_URL + "/get-all");
}

export const createUserFeedback = (userFeedback) => {
    return axios.post(REST_API_BASE_URL + "/create-feedback", userFeedback)
}

export const getUserFeedback = (id) => {
    return axios.get(REST_API_BASE_URL + "/get-feedback/"+ id)
}