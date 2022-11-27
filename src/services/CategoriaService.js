import {api} from "./api";

const getCategorias = () => {
    return api.get("/categorias_despesa");
};

const getCategoria = id => {
    return api.get(`/categorias_despesa/${id}`);
};

const createCategoria = data => {
    return api.post("/categorias_despesa", data);
};

const updateCategoria = (id, data) => {
    return api.put(`/categorias_despesa/${id}`, data);
};


const removeCategoria = id => {
    return api.delete(`/categorias_despesa/${id}`);
};


export default {
    getCategorias,
    getCategoria,
    createCategoria,
    updateCategoria,
    removeCategoria,
};