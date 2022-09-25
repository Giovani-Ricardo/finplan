
export function filtrarDespesa(select, dataInicio, dataFim, lista) {

    if(dataInicio === ''){
        dataInicio = undefined;
    }

    if(dataFim === ''){
        dataFim = undefined;
    }
    
    if (select === "Selecione a categoria" && dataInicio === undefined  && dataFim === undefined ) {
        return lista;
    }

    if (dataInicio !== undefined && dataFim === undefined) {
        alert("Selecione a data Fim");
        return lista;
    }

    if(dataInicio === undefined && dataFim !== undefined){
        alert("Selecione a data Inicio");
        return lista;
    }

    if(select === "Selecione a categoria" && dataInicio !== undefined && dataFim !== undefined){
        let nova_lista = filtarPorData(dataInicio, dataFim, lista);
        return nova_lista;
    }

    if(select !== "Selecione a categoria" && dataInicio === undefined && dataFim === undefined){
        let nova_lista = filtrarPorCategoria(select, lista);
        return(nova_lista);
    }

    if(select !== "Selecione a categoria" && dataInicio !== undefined && dataFim !== undefined){
        let nova_lista = filtarPorData(dataInicio, dataFim, lista);
        nova_lista = filtrarPorCategoria(select, nova_lista);
        return nova_lista;
    }

    
}

function filtarPorData(dataInicio, dataFim, lista){
    let data_inicio = dataInicio.split('-').reverse().map((e) => parseInt(e));
    let data_fim = dataFim.split('-').reverse().map((e) => parseInt(e));    

    let nova_lista = []

    for(let i = 0; i < lista.length ; i++){

        let data_lista = lista[i].date.split('/').map((e) => parseInt(e));
        
        if(data_lista[2] === data_inicio[2]){
            if(data_lista[1] >= data_inicio[1] && data_lista[1] <= data_fim[1]){
                if(data_lista[0] >= data_inicio[0] && data_lista[0] <= data_fim[0]){
                    nova_lista.push([lista[i]]);
                }
            }
        }
    }
    nova_lista = nova_lista.map((e) => e[0]);
    return nova_lista;
}

function filtrarPorCategoria(select, lista){
    let nova_lista = [];

    for(let i = 0; i < lista.length; i++){
        
        if(lista[i].category === select){
            nova_lista.push(lista[i])
        }
    }

    return nova_lista;

}