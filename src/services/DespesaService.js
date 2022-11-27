import {api} from "./api";

const getDespesas = () => {
    return api.get("/despesas");
};

const getDespesa = id => {
    return api.get(`/despesas/${id}`);
};

const createDespesa = data => {
    return api.post("/despesas", data);
};

const updateDespesa = (id, data) => {
    return api.put(`/despesas/${id}`, data);
};


const removeDespesa = id => {
    return api.delete(`/despesas/${id}`);
};

const filtrarDespesas = (data) => {
    if(data.categorias_despesa_id == undefined){
        data.categorias_despesa_id = ""
    }

    if(data.data_inicio == undefined){
        data.data_inicio = ""
    }

    if(data.data_fim == undefined){
        data.data_fim = ""
    }
    
    return api.get(`/filtrar_despesa?categorias_despesa_id=${data.categorias_despesa_id}&data_inicio=${data.data_inicio}&data_fim=${data.data_fim}`);
}


export default {
    getDespesas,
    getDespesa,
    createDespesa,
    updateDespesa,
    removeDespesa,
    filtrarDespesas
};