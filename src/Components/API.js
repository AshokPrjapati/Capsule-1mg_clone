import axios from "axios";

axios.defaults.baseURL = `http://localhost:8080`;
// axios.defaults.baseURL = `https://capsule-web-server.onrender.com`

export const postUserData = (userData) => {
    return axios.post(`/users`, {
        ...userData,
    });
};


export const fetchUser = () => {
    return axios.get(`/users`);
};


// updating the cart products in db
export const updateCart = (id, cartProducts) => {
    return axios.patch(`/users/${id}`, { cart: [...cartProducts] });
}

// For updating promo code status is applied or not
// export const updateCoupanStatus = (id, status) => {
//     return axios.patch(`/users/${id}`, { isPromoCodeApplied: status });
// }

export const fetchProduct = ({ category, limit, sort, page }) => {
    return axios
        .get(
            `/${category}?_page=${page}&_limit=${limit}&${sort}`
        )
}

export const fetchSingleProduct = ({ category, id }) => {
    return axios.get(`/${category}/${id}`);
}

export const CarouselData = ({ category }) => {
    return axios
        .get(`/${category}?_page=1&_limit=10`)
}

export const fetchCategoryData = ({ category, page, limit, sort }) => {
    return axios
        .get(
            `/${category}?_page=${page}&_limit=${limit}&${sort}`
        )
}
