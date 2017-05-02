/// <reference path="google-chart.d.ts" />

google.charts.load('current', {
    packages: ['bar']
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
        chart: {
            title: 'Vendas X Cancelamentos Diários',
            subtitle: 'Planos leadlovers'
        },
        bars: 'vertical',
        width: 720,
        height: 360,
        legend: {
            position: 'top'
        },
        colors: ['#BADA55', '#F15A52', '#4F7EFF', '#94DAFF', '#000000', '#B00B1E', '#A5501E']
    }

    let graficoVendas = new google.charts.Bar(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function removerDados() {
    let data = inserirGrafico();

    data.removeRow(2);

    //personalização de cores geralmente devem ser inseridas aqui (options)
    let options = {
        title: 'Vendas X Cancelamentos Diários',
        width: 720,
        height: 360
    }

    let graficoVendas = new google.visualization.ColumnChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function editarDados() {
    let data = inserirGrafico();

    let options = {
        title: 'Vendas X Cancelamentos Diários',
        width: 720,
        height: 360
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
    let data = new google.visualization.DataTable();

    data.addColumn('string', 'Plano');
    data.addColumn('number', 'Vendas');
    data.addColumn('number', 'Cancelamentos');

    for (let index = 0; index < rows.length; index++) {
        let plan = rows[index].cells[0].innerHTML;
        let sales = parseInt(rows[index].cells[1].innerHTML);
        let churns = parseInt(rows[index].cells[2].innerHTML);
        data.addRow([plan, sales, churns]);
    }
    console.log(data)
    return data;
}