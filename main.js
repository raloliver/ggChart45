/// <reference path="google-chart.d.ts" />

google.charts.load('current', {
    packages: ['corechart']
});

google.charts.setOnLoadCallback(iniciarGG);

function iniciarGG() {
    desenhaGrafico();
    let btnInserir = document.querySelector('#btn-inserir');
    let btnAtualizar = document.querySelector('#btn-atualizar');
    //ao carregar o GG, habilitar o botão
    btnInserir.removeAttribute('disabled');
    btnAtualizar.removeAttribute('disabled');
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

    let options = {
        title: 'Qual dia você trabalhou mais?',
        width: 720,
        height: 360
    }

    let graficoVendas = new google.visualization.PieChart(document.querySelector('#grafico-vendas'));

    graficoVendas.draw(data, options);
}

function inserirDados(evento) {
    evento.preventDefault();
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