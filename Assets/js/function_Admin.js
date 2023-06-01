document.addEventListener("DOMContentLoaded", function () {
  // Para que se agreguen automaticamente los eventos
  getCantFacturas();
  getCantProductos();
  getCantClientes();
  getCantUsuarios();
  setFechaActual();

  getProductosMinimos();
});

function setFechaActual() {
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

function getCantProductos() {
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

function getCantClientes() {
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

function getCantUsuarios() {
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

function getCantFacturas() {
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

function getProductosMinimos() {
  tblClientes = $("#tblProductosMinimos").DataTable({
    aProcessing: true,
    aServerSide: true,
    Search: false,
    dom: "rtip",
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    },
    ajax: {
      url: ` ${base_url}/productos/getProductosMinimo`,
      dataSrc: "",
    },
    columns: [{
      data: "id",
    },
    {
      data: "name",
    },
    {
      data: "description",
    },
    {
      data: "unidad",
    },
    {
      data: "cantidad",
    },
    {
      data: "minimo",
    },
    ],
    responsive: "true",
    bDestroy: true,
    iDisplayLenght: 5,
    order: [
      [0, "desc"]
    ],
    columnDefs: [{
      targets: [0],
      visible: false,
      searchable: false
    }],
  });
}