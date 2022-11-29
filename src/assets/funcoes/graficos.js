

//Essa função irá retornar os dados necessários para preencher os dados do gráfico de meta
export function calcularMeta(despesas, teto){
    let total_despesas = 0;
    let sobra = 0;

    if(despesas.length < 0){
        total_despesas = 0;
    }else{
        for(let i = 0; i < despesas.length; i++){
            let valor = parseFloat(despesas[i].valor);
            total_despesas += valor;
        }
    }
    
    sobra = teto - total_despesas;
    if(teto === null){
        teto = 0;
    }

    if(sobra < 0){
        sobra = 0;
    }

    let data = [
        ['Teto', 'Valor gasto'],
        ['Disponível' , sobra],
        ['Valor gasto', total_despesas]
    ]
    return data;
}

export function optionsGraficoMeta(){
    let options = {
        title:"Teto de gastos",
        pieHole: 0.4,
        is3D: false,
        colors: ["#47d147", "#ff3300"]
      };

    return options;
}

//Essa função é responsável por passar os dados para o graficos de gasto por categoria
export function calcularCategorias(despesas, categorias){
    let lista_dados = [["Categorias ", "Gastos"]];
    
    for(let i = 0; i < despesas.length; i++){
        
        let categoria = getCategoriaNome(categorias, despesas[i].categorias_despesa_id)
        let j = 0;

        for(; j < lista_dados.length; j++){ 
            if(lista_dados[j][0] === categoria){  
                lista_dados[j][1] += Number.parseFloat(despesas[i].valor);
                break;
            }
        }

        if(j === lista_dados.length){
            lista_dados.push([categoria, parseFloat(despesas[i].valor)]);
        }
        
    }
    return lista_dados;
}

function getCategoriaNome(categorias, id){
    for(let categoria of categorias){
        if(categoria.id === id){
            return categoria.nome;
        }
    }
}

//Configuração do gráfico de gastos por categoria
export function optionsGraficoCategoria(){
    let options = {
        title:"Gasto por categoria",
        pieHole: 0.4,
        is3D: false,
      };

    return options;
}

export function dadosGraficoTopDespesas(despesas){
    let lista_dados = [['Despesas'], [' ']]
    if (despesas.length > 0) {
        
        for(let despesa of despesas){
            lista_dados[0].push(despesa.descricao);
            // lista_dados[1].push(despesa.descricao);
            lista_dados[1].push(parseInt(despesa.valor));
        }
    } else {
        lista_dados[0].push("Não há dados");
        lista_dados[1].push(0);
    }
    return lista_dados;
}

export const optionsPrevisao = {
    chart: {
      title: "Top 5 despesas mais caras",
      subtitle: "Em reais (BRL)"
    },
  };