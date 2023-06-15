document.addEventListener("DOMContentLoaded", function () {
  // Para que se agreguen automaticamente los eventos
  CantFacturas();
  CantProductos();
  CantClientes();
  CantUsuarios();
  FechaActual();

  ProductosMinimos();
  CreditoPendientePago()

  FacturasEmitidas()
});

function FechaActual() {
  var fecha = new Date(); //Fecha actual
  var mes = fecha.getMonth() + 1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var anho = fecha.getFullYear(); //obteniendo año
  if (dia < 10)
    dia = '0' + dia; //agrega cero si el menor de 10
  if (mes < 10)
    mes = '0' + mes //agrega cero si el menor de 10
  document.getElementById('txtFecha').value = anho + "-" + mes + "-" + dia;
}

function CantProductos() {
  // Obtener los datos
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  var url = base_url + "Productos/getCantProductos";
  request.open("GET", url, true);
  request.send();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var objData = JSON.parse(request.responseText);
      document.querySelector("#cantProductos").innerHTML = objData[0].Cantidad;
    }
  };
}

function CantClientes() {
  // Obtener los datos
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  var url = base_url + "Clientes/getCantClients";
  request.open("GET", url);
  request.send();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var objData = JSON.parse(request.responseText);
      document.querySelector("#cantClientes").innerHTML = objData[0].Cantidad;
    }
  };
}

function CantUsuarios() {
  // Obtener los datos
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  var url = base_url + "Usuarios/getCantUsers";
  request.open("GET", url);
  request.send();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var objData = JSON.parse(request.responseText);
      document.querySelector("#cantUsers").innerHTML = objData[0].Cantidad;
    }
  };
}

function CantFacturas() {
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  var url = `${base_url}facturacion/getCantFacturas`;
  request.open("GET", url);
  request.send();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var objData = JSON.parse(request.responseText);
      document.querySelector("#cantFacturas").innerHTML = objData[0].Cantidad;
    }
  };
}

function ProductosMinimos() {
  tblClientes = $("#tblProductosMinimos").DataTable({
    aProcessing: true,
    aServerSide: true,
    Search: false,
    dom: "rtp",
    "language": {
      "url": `${base_url}assets/js/plugins/Spanish.json`,
    },
    ajax: {
      url: ` ${base_url}productos/getProductosMinimo`,
      dataSrc: "",
    },
    columns: [{
      data: "id",
    },
    {
      data: "name",
    },
    {
      data: "unidad",
    },
    {
      data: "cantidad",
      render: function (data, type) {
        var number = $.fn.dataTable.render.number(',', '.', 2,).display(data);

        if (type === 'display') {
          return `<span class="badge badge-danger">${number}</span>`;
        }

        return number;
      }
    },
    {
      data: "minimo",
      render: $.fn.dataTable.render.number(',', '.', 2,)
    },
    ],
    responsive: "true",
    bDestroy: true,
    iDisplayLenght: 5,
    order: [
      [4, "asc"]
    ],
    columnDefs: [{
      targets: [0],
      visible: false,
      searchable: false
    }],
  });
}

function CreditoPendientePago() {
  tblClientes = $("#tblCreditoPendiente").DataTable({
    aProcessing: true,
    aServerSide: true,
    Search: false,
    dom: "rtp",
    "language": {
      "url": `${base_url}assets/js/plugins/Spanish.json`,
    },
    ajax: {
      url: `${base_url}creditos/getCreditoPendientePago`,
      dataSrc: "",
    },
    columns: [{
      data: "Nombre",
    },
    {
      data: "Telefono",
    },
    {
      data: "montoCredito",
      render: $.fn.dataTable.render.number(',', '.', 2,)
    },
    {
      data: "pendiente_pago",
      render: function (data, type) {
        var number = $.fn.dataTable.render.number(',', '.', 2,).display(data);

        if (type === 'display') {
          return `<span class="badge badge-danger">${number}</span>`;
        }

        return number;
      }
    },
    {
      data: "creditoActual",
      render: $.fn.dataTable.render.number(',', '.', 2,)
    },
      // {
      //   data: "estado",
      // },
    ],
    responsive: "true",
    bDestroy: true,
    iDisplayLenght: 5,
    order: [
      [3, "desc"]
    ],
  });
}

function FacturasEmitidas() {
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  var url = `${base_url}facturacion/getFacturasEmitidas`;
  request.open("GET", url);
  request.send();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var data = JSON.parse(request.responseText);
      const nombreTipoDocumento = new Array();
      const cantidadTipoDocumento = new Array();
      let totalFacturas = 0;

      for (let i = 0; i < data.length; i++) {
        nombreTipoDocumento.push(data[i].nombre)
        cantidadTipoDocumento.push(data[i].totalFacturas)
        totalFacturas += data[i].totalFacturas;
      }

      chartFacturasEmitidas(nombreTipoDocumento, cantidadTipoDocumento, totalFacturas)
    }
  };
}

function chartFacturasEmitidas(nombreTipoDocumento, cantidadTipoDocumento, totalFacturas) {
  const ctx = document.getElementById('myChart');
  const ChartFPagoMes = document.getElementById('ChartFPagoMes');

  const data = {
    labels: nombreTipoDocumento,
    datasets: [{
      label: '',
      data: cantidadTipoDocumento,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        // 'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        // 'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        // 'rgb(255, 159, 64)',
        // 'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        // 'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        // 'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  // const data = {
  //   labels: nombreTipoDocumento,
  //   // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [{
  //     label: 'Documentos',
  //     data: cantidadTipoDocumento,
  //     // data: [65, 59, 80, 81, 26, 55, 40],
  //     fill: false,
  //     borderColor: 'rgb(75, 192, 192)',
  //   }]
  // };

  // const config = {
  //   type: 'line',
  //   data: data,
  //   options: {
  //     animations: {
  //       tension: {
  //         duration: 1000,
  //         easing: 'linear',
  //         from: 1,
  //         to: 0,
  //         loop: true
  //       }
  //     },
  //     scales: {
  //       y: { // defining min and max so hiding the dataset does not change scale range
  //         min: 0,
  //         max: totalFacturas
  //       }
  //     }
  //   }
  // };


  new Chart(ctx, config);
  new Chart(ChartFPagoMes, config);
}

function FormaPago() {
  var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  var url = `${base_url}facturacion/getFormaPago`;
  request.open("GET", url);
  request.send();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      var data = JSON.parse(request.responseText);
      const nombreFormaPago = new Array();
      const cantidadFormaPago = new Array();
      let totalFacturas = 0;

      for (let i = 0; i < data.length; i++) {
        nombreFormaPago.push(data[i].nombre)
        cantidadFormaPago.push(data[i].totalFP)
        totalFacturas += data[i].totalFP;
      }

      chartFacturasEmitidas(nombreFormaPago, cantidadFormaPago, totalFacturas)
    }
  };
}