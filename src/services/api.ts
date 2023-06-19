import axios from "axios";

export const booksAPI = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
    headers: {
        "Content-type": "application/json",
    },
});
