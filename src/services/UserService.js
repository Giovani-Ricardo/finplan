import {api} from "./api";

const createUser = data => {
        return api.post("/auth", data);
    };

const updateUser = (data) => {
        return api.put("/auth", data);
    };


const removeUser = () => {
        return api.delete("/auth");
    };


// // const findByTitle = title => {
// // return api.get(`/tutorials?title=${title}`);
// // };

export default {
    createUser,
    updateUser,
    removeUser,
};