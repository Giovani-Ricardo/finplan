import dados_despesas from '../../data/expenses.json'
import dados_meta from '../../data/goal.json'
import previsao from '../../data/predict.json'

//Essa função irá retornar os dados necessários para preencher os dados do gráfico de meta
export function calcularMeta(){
    let total_despesas = 0;
    let sobra = 0;
    
    for(let i = 0; i < dados_despesas.length; i++){
        let valor = parseFloat(dados_despesas[i].amount);
        total_despesas += valor;
    }

    sobra = dados_meta.meta - total_despesas;

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
export function calcularCategorias(){
    let lista_dados = [["Categorias ", "Gastos"]];
    
    for(let i = 0; i < dados_despesas.length; i++){
        
        let j = 0;
        for(; j < lista_dados.length; j++){ 
            
            if(lista_dados[j][0] == dados_despesas[i].category){  
                lista_dados[j][1] += dados_despesas[i].amount;
                break;
            }
        }

        if(j == lista_dados.length){
            lista_dados.push([dados_despesas[i].category, dados_despesas[i].amount])
        }
        
    }
    
    return lista_dados;
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

export function calcularPrevisao(){
    let lista_dados = [["Mês","Previsão" , "Real"]]
    let despesas_agrupadas = extrairDadosMesDespesas();

    for(let i = 0; i < previsao.length; i++){
        if(i < despesas_agrupadas.length){
            lista_dados.push([previsao[i].mes, previsao[i].valor, despesas_agrupadas[i][1]]);
        }else{
            lista_dados.push([previsao[i].mes, previsao[i].valor, 0]);
        }
            
    }
    extrairDadosMesDespesas()
    return lista_dados;
}

function extrairDadosMesDespesas(){
    let lista_dados = [
        ['01/2022' , 0],
        ['02/2022' , 0],
        ['03/2022' , 0],
        ['04/2022' , 0],
        ['05/2022' , 0],
        ['06/2022' , 0],
        ['07/2022' , 0],
        ['08/2022' , 0],
        ['09/2022' , 0],
        ['10/2022' , 0],
        ['11/2022' , 0],
        ['12/2022' , 0]
    ];
    
    for(let i = 0; i < dados_despesas.length; i++){
        
        let j = 0;
        for(; j < lista_dados.length; j++){ 
            let data_dados = dados_despesas[i].date.split('/');
            let data_lista = lista_dados[j][0].split('/');
            
            if(data_lista[0] === data_dados[1]){  
                lista_dados[j][1] += dados_despesas[i].amount;
                break;
            }
        }

        if(j == lista_dados.length){
            let data_lista = dados_despesas[i].date.split('/');
            let data = data_lista[1] + '/' +data_lista[2];
            lista_dados.push([data, dados_despesas[i].amount])
        }
        
    }
    
    lista_dados = ordernarData(lista_dados)
    return lista_dados;
}

function ordernarData(datas) {

    for (let j = 0; j < datas.length; j++) {

        for (let i = 1; i < datas.length; i++) {

            let atual = datas[i][0].split('/');
            let anterior = datas[i - 1][0].split('/');

            atual = [parseInt(atual[0]), parseInt(atual[1])]
            anterior = [parseInt(anterior[0]), parseInt(anterior[1])]

            if (atual[1] < anterior[1]) {

                let temp = datas[i - 1];
                datas[i - 1] = datas[i];
                datas[i] = temp;


            } else if (atual[0] < anterior[0]) {

                let temp = datas[i - 1];
                datas[i - 1] = datas[i];
                datas[i] = temp;

            }
        }
    }

    return datas;
}

export const optionsPrevisao = {
    chart: {
      title: "Previsão de gastos X valor real gasto",
      subtitle: "Em reais (BRL)"
    },
  };