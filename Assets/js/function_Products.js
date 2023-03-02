var tableProductos;
var frmProducto = document.querySelector("#frmProducto");
var selecMedida = document.querySelector("#selecMedida");


document.addEventListener("DOMContentLoaded", function () {
  CargaUnidades();
  CargaImpuesto()

  tableProductos = $("#tblProductos").DataTable({
    aProcessing: true,
    aServerSide: true,
    dom: "frtip",
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    },
    ajax: {
      url: ` ${base_url}/productos/getProductos`,
      dataSrc: ""
    },
    columns: [{
      data: "id"
    },
    {
      data: "code"
    },
    {
      data: "img"
    },
    {
      data: "name"
    },
    {
      data: "description"
    },
    {
      data: "unidad"
    },
    {
      data: "price"
    },
    {
      data: "valor"
    },
    {
      data: "cantidad"
    },
    {
      data: "minimo"
    },
    {
      data: "state"
    },
    {
      data: "options"
    },
    ],
    responsive: "true",
    bDestroy: true,
    iDisplayLenght: 10,
    order: [
      [0, "desc"]
    ],
    columnDefs: [{
      targets: [0],
      visible: false,
      searchable: false
    }],
  });
});

frmProducto.onsubmit = function (e) {
  e.preventDefault();
  // Extraemos los datos
  var idProducto = document.querySelector("#idProducto").value;
  var name = document.querySelector("#txtNombre").value;
  var Codigo = document.querySelector("#txtCodigo").value;
  var price = document.querySelector("#txtPrecio").value;
  var stock = document.querySelector("#txtStock").value;
  var description = document.querySelector("#txtDescripcion").value;
  var measure = document.querySelector("#selecMedida").value;
  var iva = document.querySelector("#selecIVA").value;
  var image = document.querySelector("#image").value;
  var frmDatos = new FormData(this);
  frmDatos.append('op', '');

  // Validamos si los campos estan vacios para mostrar alerta
  if (idProducto == "") {
    if (
      Codigo == "" ||
      name == "" ||
      price == "" ||
      stock == "" ||
      description == "" ||
      measure == ""
    ) {
      swal("Atención", "Todos los campos son obligatorios", "error");
      return false;
    }
  } else {
    frmDatos = new FormData(this);
    frmDatos.append('op', 'update');
  }

  const url = `${base_url}productos/setProducto`;
  const response = fnt_Fetch(url, 'post', frmDatos)
  response.then(objData => {
    if (objData.status) {
      frmProducto.reset();
      tableProductos.ajax.reload()
      // CerrarCamara()

      $("#modalProducto").modal("hide");
      swal("", objData.msg, "success");
    } else {
      swal("", objData.msg, "error");
    }
  })
};

function fntEditProduct(codigo) {
  document.querySelector("#titleModal").innerHTML = "Actualizar Producto";
  document.querySelector("#btnText").innerHTML = "Actualizar";
  // $('#btnCamaraIn').css('display', 'inline');
  // $('#btnCamaraOut').css('display', 'none');

  const url = `${base_url}productos/getProducto/${codigo}`;
  const response = fnt_Fetch(url)
  response.then(objData => {
    if (objData.status) {
      document.querySelector("#idProducto").value = objData.data.codigo;
      document.querySelector("#txtCodigo").value = objData.data.codigo;
      document.querySelector("#txtNombre").value = objData.data.name;
      document.querySelector("#txtPrecio").value = objData.data.price;
      // document.querySelector("#txtStock").value = objData.data.cantidad;
      document.getElementById("txtStock").placeholder = 'Cantidad a sumar';
      document.querySelector("#txtDescripcion").value = objData.data.description;
      document.querySelector("#selecMedida").value = objData.data.measure;
      document.querySelector("#selecIVA").value = objData.data.idIVA;
      document.querySelector("#imgProducto").src = `./assets/images/productos/${objData.data.img}`;

      $("#modalProducto").modal("show");
    } else {
      // Mostramos error
      swal("", objData.msg, "error");
    }
  })
}

function fntDeleteProduct(codigo) {
  swal({
    title: "",
    text: "Realmente quiere eliminar el producto?",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    closeOnConfirm: false,
    closeOnCancel: true,
  },
    (isConfirm) => {
      if (isConfirm) {
        const url = `${base_url}productos/deleteProduct/`;
        const data = `codigo=${codigo}`;

        const request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        request.open("POST", url, true);
        request.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        request.send(data);
        request.onreadystatechange = function () {
          if (request.readyState == 4 && request.status == 200) {
            var objData = JSON.parse(request.responseText);

            if (objData.status) {
              tableProductos.ajax.reload()
              swal("", objData.msg, "success");
            } else {
              swal("", objData.msg, "error");
            }
          }
        };
      }
    }
  );
}

function fntEnableProduct(codigo) {
  swal({
    title: "",
    text: "Realmente quiere Habilitar el Producto?",
    type: "info",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    closeOnConfirm: false,
    closeOnCancel: true,
  },
    (isConfirm) => {
      if (isConfirm) {
        const url = `${base_url}productos/enableProduct/`;
        const frm = new FormData()
        frm.append('codigo', codigo)

        const request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        request.open("POST", url);
        request.send(frm);
        request.onreadystatechange = function () {
          if (request.readyState == 4 && request.status == 200) {
            const objData = JSON.parse(request.responseText);

            if (objData.status) {
              tableProductos.ajax.reload()
              swal("", objData.msg, "success");
            } else {
              swal("", objData.msg, "error");
            }
          }
        };
      }
    })
  // })
}

function OpenModal() {
  document.querySelector("#idProducto").value = "";
  document.querySelector("#titleModal").innerHTML = "Nuevo Producto";
  document.querySelector("#btnText").innerHTML = "Guardar";
  document.querySelector("#frmProducto").reset();
  document.querySelector("#imgProducto").src = "";
  // $('#btnCamaraIn').css('display', 'inline');
  $("#modalProducto").modal("show");
}

function CargaUnidades() {
  const url = `${base_url}productos/getUnidadMedida`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      selecMedida.options[0] = new Option("Seleccione una medida", "0");
      arrMedida = data;

      for (let i = 1; i <= arrMedida.length; i++) {
        selecMedida.options[i] = new Option(
          arrMedida[i - 1]["unidad"],
          arrMedida[i - 1]["nomenclatura"]
        );
      }
    });
}

function CargaImpuesto() {
  const url = `${base_url}productos/getImpuestos`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      selecIVA.options[0] = new Option("Seleccione una opción", "0");
      arrIVA = data;

      for (let i = 1; i <= arrIVA.length; i++) {
        selecIVA.options[i] = new Option(
          arrIVA[i - 1]["valor"],
          arrIVA[i - 1]["id"]
        );
      }
    });
}

$(".cerrarModal").click(function () {
  CerrarCamara();
  frmProducto.reset();
  $("#modalProducto").modal('hide')
});

$('#btnCamaraIn').click(function (e) {
  e.preventDefault();
  $('#btnCamaraIn').css('display', 'none');
  $('#btnCamaraOut').css('display', 'inline');
  AbrirCamara();
});

$('#btnCamaraOut').click(function (e) {
  e.preventDefault();
  $('#btnCamaraIn').css('display', 'inline');
  $('#btnCamaraOut').css('display', 'none');
  CerrarCamara();
});


/** Funcion para habilitar la camara cuando se agrega un producto
var lastMessage;
var codeId = 0;

function onScanSuccess(decodedText, decodedResult) {
  $("#txtCodigo").val(decodedText);
  PlayAudio();
  $('#txtCodigo').focus();
}

var qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
  // Square QR Box, with size = 80% of the min edge.
  var minEdgeSizeThreshold = 300;
  var edgeSizePercentage = 0.75;
  var minEdgeSize = (viewfinderWidth > viewfinderHeight) ?
    viewfinderHeight : viewfinderWidth;
  var qrboxEdgeSize = Math.floor(minEdgeSize * edgeSizePercentage);
  if (qrboxEdgeSize < minEdgeSizeThreshold) {
    if (minEdgeSize < minEdgeSizeThreshold) {
      return {
        width: minEdgeSize,
        height: minEdgeSize
      };
    } else {
      return {
        width: minEdgeSizeThreshold,
        height: minEdgeSizeThreshold
      };
    }
  }
  return {
    width: qrboxEdgeSize,
    height: qrboxEdgeSize
  };
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", {
  isShowingInfoIcon: false,
  fps: 10,
  qrbox: qrboxFunction,
  experimentalFeatures: {
    useBarCodeDetectorIfSupported: true
  },
  rememberLastUsedCamera: true,
  showTorchButtonIfSupported: true
});

function AbrirCamara() {
  html5QrcodeScanner.render(onScanSuccess);
  $('#reader').css('display', 'inline-block');
}

function CerrarCamara() {
  html5QrcodeScanner.clear();
  $('#reader').css('display', 'none');
}
 */

/* Funcion para mostrar la imagen cargada
var input = document.querySelector('input[type=file]');
input.onchange = function () {
  var file = input.files[0];
  var fileReader = new FileReader();
  fileReader.onload = function (e) {
    {
      let image = document.getElementById('imgProducto');
      image.src = e.target.result;
    }
  }
  fileReader.readAsDataURL(file);
}
*/