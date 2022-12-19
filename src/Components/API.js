import axios from "axios";
//https://capsule-web-server.onrender.com/users

export const postUserData = (userData) => {
    return axios.post(`http://localhost:8080/users`, {
        ...userData,
    });
};


export const fetchUser = () => {
    return axios.get(`http://localhost:8080/users`);
};




