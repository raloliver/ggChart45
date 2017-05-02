/// <reference path="google-chart.d.ts" />

google.charts.load('current', {
    packages: ['corechart']
});

google.charts.setOnLoadCallback(iniciarGG);

function iniciarGG() {
    desenhaGrafico();

    let btnInserir = document.querySelector('#btn-inserir');
    btnInserir.removeAttribute('disabled');
    /*
    let btnAtualizar = document.querySelector('#btn-atualizar');
    //ao carregar o GG, habilitar o botão
    btnAtualizar.removeAttribute('disabled');
    */
}

function desenhaGrafico() {

    //pegando os dados de uma tabela
    let data = inserirGrafico();

    /*
    //bando de dados burro
    let data = new google.visualization.DataTable();
    
    //adicionando colunas: qual o tipo e o nome?
    data.addColumn('string', 'Dia da Semana');
    data.addColumn('number', 'Total');

    //adicionando array de linhas
    data.addRows([        
        ['Domingo', 4]
    ]);
    */

    //personalização de cores geralmente devem ser inseridas aqui (options)
    let options = {
        title: 'Qual dia você trabalhou mais?',
        width: 720,
        height: 360,
        legend: 'bottom',
        //is3D: true,
        pieHole: .4,
        colors: ['#BADA55', '#F15A52', '#4F7EFF', '#94DAFF', '#000000', '#B00B1E', '#A5501E'], // é possível informar uma paleta de cores ou individualmente
        sliceVisibilityThreshold: 0.15, //soma do resto
    }

    let graficoVendas = new google.visualization.PieChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function removerDados() {
    let data = inserirGrafico();

    data.removeRow(2);


    let options = {
        title: 'Qual dia você trabalhou mais?',
        width: 720,
        height: 360
    }

    let graficoVendas = new google.visualization.PieChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function editarDados() {
    let data = inserirGrafico();

    //aqui vão os métodos para edição de valor (setValue[apenas dados] ou setCell[tem mais opções])
    data.setValue(0, 0, 'Segunda');
    data.setValue(0, 1, 50);

    data.setCell(1, 0, 'Quinta');
    data.setCell(1, 1, 100);


    let options = {
        title: 'Qual dia você trabalhou mais?',
        width: 720,
        height: 360
    }

    let graficoVendas = new google.visualization.PieChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function inserirDados(event) {
    event.preventDefault();
    let date = document.querySelector('#date').value;
    let sales = document.querySelector('#sales').value;
    let table = document.querySelector('.table-striped');
    let rows = table.querySelectorAll('tbody')[0].children.length;
    let row = table.insertRow(rows + 1);

    let cellA = row.insertCell(0);
    cellA.innerHTML = date;
    let cellB = row.insertCell(1);
    cellB.innerHTML = sales;
}

function inserirGrafico() {
    //coletando os dados
    let table = document.querySelector('.table-striped');
    let rows = table.querySelectorAll('tbody')[0].children;
    let data = new google.visualization.DataTable();

    //adicionando colunas: qual o tipo e o nome?
    data.addColumn('string', 'Dia da Semana');
    data.addColumn('number', 'Total');

    for (let index = 0; index < rows.length; index++) {
        let date = rows[index].cells[0].innerHTML;
        //converter para número para dizer ao GG o formato correto
        let sales = parseInt(rows[index].cells[1].innerHTML);
        //GG add linhas
        data.addRow([date, sales]);
    }
    console.log(data)
    return data;
}