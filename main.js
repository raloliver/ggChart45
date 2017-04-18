/// <reference path="google-chart.d.ts" />

google.charts.load('current', {packages: ['corechart']});

google.charts.setOnLoadCallback(desenhaGrafico);

function desenhaGrafico() {   
    
    let data = new google.visualization.DataTable();
    //adicionando colunas: qual o tipo e o nome?
    data.addColumn('string', 'Vendas');
    data.addColumn('number', 'Total Diário');

    //adicionando array de linhas
    data.addRows([
        ['Segunda', 40],
        ['Terça', 32],
        ['Quarta', 24],
        ['Quinta', 18],
        ['Sexta', 13],
        ['Sábado', 7],
        ['Domingo', 4]
    ]);

    let options = {
        title: 'Qual dia você trabalhou mais?',
        width: 720,
        height: 480
    }

    let graficoVendas = new google.visualization.PieChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}