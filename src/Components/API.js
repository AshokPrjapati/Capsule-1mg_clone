import axios from "axios";
const api = `http://localhost:8080`;

// https://capsule-web-server.onrender.com
// http://localhost:8080

export const postUserData = (userData) => {
    return axios.post(`${api}/users`, {
        ...userData,
    });
};


export const fetchUser = () => {
    return axios.get(`${api}/users`);
};

export const fetchProduct = ({ limit, sort, page }) => {
    return axios
        .get(
            `${api}/products?_page=${page}&_limit=${limit}&${sort}`
        )
}

export const fetchSingleProduct = ({ id }) => {
    return axios.get(`${api}/products/${id}`);
}

export const CarouselData = ({ category }) => {
    return axios
        .get(`${api}/${category}?_page=1&_limit=10`)
}

export const fetchCategoryData = ({ category, page, limit, sort }) => {
    return axios
        .get(
            `${api}/${category}?_page=${page}&_limit=${limit}&${sort}`
        )
}
