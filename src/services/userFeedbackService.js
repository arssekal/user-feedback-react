import axios from "axios";

// const REST_API_BASE_URL = "https://your-railway-app.up.railway.app/api/feedbacks";
const REST_API_BASE_URL = "https://user-feedback-spring-production-15e3.up.railway.app/api/feedbacks";

export const listUserFeedbacks = () => {
    return axios.get(REST_API_BASE_URL + "/get-all");
}

export const createUserFeedback = (userFeedback) => {
    return axios.post(REST_API_BASE_URL + "/create-feedback", userFeedback)
}

export const getUserFeedback = (id) => {
    return axios.get(REST_API_BASE_URL + "/get-feedback/"+ id)
}