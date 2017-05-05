/// <reference path="google-chart.d.ts" />

google.charts.load('current', {
    packages: ['corechart']
});

google.charts.setOnLoadCallback(iniciarGG);

function iniciarGG() {
    desenhaGrafico();

    let btnInserir = document.querySelector('#btn-inserir');
    btnInserir.removeAttribute('disabled');
}

function desenhaGrafico() {

    let data = inserirGrafico();

    let options = {
        title: 'Vendas X Cancelamentos Diários',
        width: 720,
        height: 360,
        legend: 'top',
        colors: ['#BADA55', '#F15A52', '#4F7EFF', '#94DAFF', '#000000', '#B00B1E', '#A5501E'],
        isStacked: true,
        vAxis: {
            title: 'Vendas x Cancelamentos',
            titleTextStyle: {
                bold: true,
                fontSize: 16,
                color: '#404041'
            }
        },
        hAxis: {
            title: 'Planos',
            textStyle: {
                bold: true,
                fontSize: 12
            }
        }
    }

    let graficoVendas = new google.visualization.ColumnChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function removerDados() {
    let data = inserirGrafico();

    data.removeRow(2);

    //personalização de cores geralmente devem ser inseridas aqui (options)
    let options = {
        title: 'Vendas X Cancelamentos Diários',
        width: 720,
        height: 360,
        legend: 'bottom',
        colors: ['#BADA55', '#F15A52', '#4F7EFF', '#94DAFF', '#000000', '#B00B1E', '#A5501E']
    }

    let graficoVendas = new google.visualization.ColumnChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function editarDados() {
    let data = inserirGrafico();

    let options = {
        title: 'Vendas X Cancelamentos Diários',
        width: 720,
        height: 360,
        legend: 'bottom',
        //legende: {position: 'none'}, //esconder legenda do topo para no caso de uso de cores diferentes para resultados no gráfico de barras
        //aqui pode usar o slices (objeto/array) para definir as cores individualmente. isso no gráfico de pizza
        //para o gráfico de barras, isso é feito direto no método arrayToDataTable
        colors: ['#BADA55', '#F15A52', '#4F7EFF', '#94DAFF', '#000000', '#B00B1E', '#A5501E']
    }

    let graficoVendas = new google.visualization.ColumnChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function inserirDados(event) {
    event.preventDefault();
    let plan = document.querySelector('#plan').value;
    let sales = document.querySelector('#sales').value;
    let churns = document.querySelector('#churns').value;
    let table = document.querySelector('.table-striped');
    let rows = table.querySelectorAll('tbody')[0].children.length;
    let row = table.insertRow(rows + 1);

    let cellA = row.insertCell(0);
    cellA.innerHTML = plan;
    let cellB = row.insertCell(1);
    cellB.innerHTML = sales;
    let cellC = row.insertCell(2);
    cellC.innerHTML = churns;
}

function inserirGrafico() {
    let table = document.querySelector('.table-striped');
    let rows = table.querySelectorAll('tbody')[0].children;
    //aqui também é possível passar através de um array as informações que devem ir no gráfico (arrayToDataTable)
    let data = new google.visualization.DataTable();
    /**
     * exemplo de uso do arrayToDataTable (veja outros tipo de role na documentação)
     */
    /*
    let data = new google.visualization.arrayToDataTable([
        ['Plano', 'Vendas', 'Cancelamentos'], //aqui tbm é possível passar um role do tipo style ou annotations como argumento aos outros itens das séries do array.
        ['Profissional', 321, 37],
        ['Executivo', 138, 7],
        ['Empresarial', 111, 2]            
    ]);
    */
    

    //a responsabilidade de cada coluna é implícito, mas é possível passar um objeto no primeiro parâmetro
    //é possível adicionar mais informações em cada coluna
    data.addColumn('string', 'Plano'); //role domain
    data.addColumn('number', 'Vendas'); //role series
    data.addColumn('number', 'Cancelamentos'); //role series

    for (let index = 0; index < rows.length; index++) {
        let plan = rows[index].cells[0].innerHTML;
        let sales = parseInt(rows[index].cells[1].innerHTML);
        let churns = parseInt(rows[index].cells[2].innerHTML);
        data.addRow([plan, sales, churns]);
    }
    console.log(data)
    return data;
}