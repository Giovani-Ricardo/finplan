import {api} from "./api";

const getMeta = () => {
    return api.get("/meta_gastos");
};

const redefinirMeta = (data) => {
    return api.post(`/atualizar_meta`, data);
};

export default {
    getMeta,
    redefinirMeta,
};