const Identificacion = document.querySelector("#Identificacion");
const Nombre = document.querySelector("#Nombre");
const NombreProducto = document.querySelector("#nombreProducto");
const txtCodigo = document.querySelector("#txtCodigo");
var listaIdentificacion = document.getElementById('listaIdentificacion');
var listaNombre = document.getElementById('listaNombre');
var listaProductos = document.getElementById('listaProductos');
const btnAgregarProducto = document.querySelector("#btnAgregarProducto");
var NuevaCantidad = 0, NuevoSubtotal = 0, existe = false, cantidad = 0, precio = 0, iva = 0, subTotal = 0, total = 0, miva = 0, DatosTabla, idProducto, cfilas = 0, idFactura, tipoFactura = 3, codigo;

window.onload = function () {
     FechaActual();
     getTipoDocumento()
     $("#txtCodigo").focus();
     MostrarCliente(2, 'data')
};

var tabla = $("#tblFactura").dataTable({
     retrieve: true,
     paging: false,
     searching: false,
     // "language": {
     //      "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
     // },
     'language': {
          // "lengthMenu": "Mostrar _MENU_ registros por página",
          // "search": "Buscar:",
          "sEmptyTable": "",
          "sInfo": " ", // Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros
          "infoEmpty": " ",
          "zeroRecords": " ",
          "oPaginate": {
               "sFirst": "Primero",
               "sLast": "Ultimo",
               "sNext": "Siguiente",
               "sPrevious": "Anterior",
          }
     }
});

//#region Buscar Cliente
Identificacion.onkeyup = (e) => {
     if (e.key.length != 9) {
          if (e.key.length != 1 || 1 + e.key.search(/^[0-9]/)) {

               if (Identificacion.value.length >= 1) {
                    Nombre.setAttribute("disabled", "true");

                    const url = `${base_url}facturacion/getCliente`;
                    const datos = new FormData();
                    datos.append('op', 'i');
                    datos.append('dato', e.target.value);

                    const response = fnt_Fetch(url, 'post', datos);
                    response.then((info) => {
                         if (info.status) {
                              listaIdentificacion.innerHTML = info.data;
                              listaIdentificacion.style.display = 'block';
                         }
                    })
               }
          }
     } else {
          Nombre.removeAttribute("disabled", "true");
          Identificacion.removeAttribute("disabled", "true");
          document.querySelector("#Nombre").value = "";
          // document.querySelector("#Telefono").value = "";
          document.querySelector("#Email").value = "";
          // document.querySelector("#Direccion").value = "";
          listaIdentificacion.style.display = 'none';
          listaNombre.style.display = 'none';
     }
}

Nombre.onkeyup = (e) => {
     if (e.key.length != 9) {
          if (e.key.length != 1 || 1 + e.key.search(/^[a-zA-Z]/)) {

               if (Nombre.value.length >= 2) {
                    Identificacion.setAttribute("disabled", "true");

                    const url = `${base_url}facturacion/getCliente`;
                    const datos = new FormData();
                    datos.append('op', 'n');
                    datos.append('dato', Nombre.value);

                    const response = fnt_Fetch(url, 'post', datos);
                    response.then((info) => {
                         if (info.status) {
                              listaNombre.innerHTML = info.data;
                              listaNombre.style.display = 'block';
                         }
                    });
               }
          }
     } else {
          Nombre.removeAttribute("disabled", "true");
          Identificacion.removeAttribute("disabled", "true");
          document.querySelector("#Identificacion").value = "";
          // document.querySelector("#Telefono").value = "";
          document.querySelector("#Email").value = "";
          // document.querySelector("#Direccion").value = "";
          listaIdentificacion.style.display = 'none';
          listaNombre.style.display = 'none';
     }
}

function MostrarCliente(dato, op) {
     const url = `${base_url}facturacion/getCliente`;
     const datos = new FormData();
     datos.append('op', op);
     datos.append('dato', dato);

     const response = fnt_Fetch(url, 'post', datos);
     response.then((info) => {
          if (info.status) {
               document.getElementById('listaIdentificacion').style.display = 'none';
               document.getElementById('listaNombre').style.display = 'none';

               document.querySelector("#idCliente").value = info.data.id;
               document.querySelector("#Identificacion").value = info.data.Identificacion;
               document.querySelector("#Nombre").value = info.data.Nombre;
               // document.querySelector("#Telefono").value = info.data.Telefono;
               var telef = info.data.Telefono;
               document.querySelector("#Email").value = info.data.Email;
               // document.querySelector("#Direccion").value = info.data.Direccion;
               var direc = info.data.Direccion;

          } else {
               swal('', info.msg, "info");
          }
     });
}
//#endregion

//#region Buscar Producto
//Arma el select del cliente
NombreProducto.onkeyup = (e) => {
     if (e.key.length != 9) {
          if (e.key.length != 1 || 1 + e.key.search(/^[a-zA-Z]/)) {

               if (NombreProducto.value.length >= 2) {
                    const url = `${base_url}facturacion/getProducto`;
                    const datos = new FormData();
                    datos.append('op', 'n');
                    datos.append('dato', NombreProducto.value);

                    const response = fnt_Fetch(url, 'post', datos);
                    response.then((info) => {
                         if (info.status) {
                              listaProductos.innerHTML = info.data;
                              listaProductos.style.display = 'block';
                         }
                    });
               }
          }
     } else {
          listaProductos.style.display = 'none';
     }
}

//Muestra los datos del producto en los inputs
function MostrarProducto(dato, op) {
     const url = `${base_url}facturacion/getProducto`;
     const datos = new FormData();
     datos.append('op', op);
     datos.append('dato', dato);

     const response = fnt_Fetch(url, 'post', datos);
     response.then((info) => {
          if (info.status) {
               listaProductos.style.display = 'none';

               $("#btnAgregarProducto").removeClass("disabled");
               document.querySelector("#codigo").value = info.data.codigo;
               document.querySelector("#nombreProducto").value = info.data.name;
               document.querySelector("#Precio").value = info.data.price;
               document.querySelector("#Stock").value = info.data.cantidad;
               porceIva = info.data.valor / 100;
               document.querySelector("#Cantidad").focus();
          } else {
               swal('', info.msg, 'info');
          }
     });
}
//#endregion

//#region Agregar datos a la tabla
btnAgregarProducto.onclick = function () {
     codigo = document.querySelector("#codigo").value;
     cantidad = document.querySelector("#Cantidad").value;
     precio = document.querySelector("#Precio").value;
     let stock = parseInt($('#Stock').val());

     if (codigo == '') {
          $("#nombreProducto").focus();
          swal("", "Debe agregar un producto", "error");
          return false;
     } else if (cantidad == '' || cantidad < 1) {
          $("#Cantidad").focus();
          swal("", "Agregar cantidad válida", "error");
          return false;
     } else if (stock < cantidad) {
          swal('', `Solo hay ${stock} en existencia`, "info");
          return false;
     }

     // ------------ PROCESO EN CASO DE QUE SEA EL PRIMER PRODUCTO ------------------------------
     if (cfilas == 0) {

          CalcularTotalLinea(precio, cantidad);
          AgregarLinea(tabla, codigo, cantidad, NombreProducto.value, precio, subTotal, miva, total);
          cfilas += 1;
     }
     // ------------ PROCESO EN CASO DE QUE YA EXISTA EL PRODUCTO -------------------------------
     else {
          // BUSCAR SI EXISTE EL CODIGO
          for (var i = 0; i < cfilas; i++) {
               // Vamos obteniendo los datos de la fila
               DatosTabla = tabla.fnGetData(i);
               //Validamos si el codigo a ingresar existe
               if (DatosTabla[0] == codigo) {
                    existe = true;
                    var CantExistente = $("#cantidadT").val();  //DatosTabla[1];
                    nfila = i;
                    break;
               }
          }
          // ------------ SI EXISTE EL CODIGO SE ACTUALIZA LAS CANTIDADES Y TOTALES DE LINEA -------------------------------
          if (existe) {
               NuevaCantidad = Number(CantExistente) + Number(cantidad);
               tabla.fnUpdate(`<div class="w-100"><input name="cantidadT" id="cantidadT" type="number" value="${NuevaCantidad}" min="1" class="form-control text-center" ></div>`, nfila, 1, 0, false);

               NuevoIva = (precio * porceIva) * NuevaCantidad;
               tabla.fnUpdate(Number.parseFloat(NuevoIva).toFixed(2), nfila, 5, 0, false);

               NuevoSubtotal = (precio * NuevaCantidad);
               tabla.fnUpdate(Number.parseFloat(NuevoSubtotal).toFixed(2), nfila, 4, 0, false);

               NuevoTotal = NuevoSubtotal + NuevoIva;
               tabla.fnUpdate(Number.parseFloat(NuevoTotal).toFixed(2), nfila, 6, 0, false);
               /* Dato, nfila, ncolumna, 0, false */

               // se cambia a falso por que en el if del for no se implemento el else, para que no se ejecute tantas veces por si no se valida el if
               existe = false;
          }
          // ------------ SI NO EXISTE EL CODIGO DEL PRODUCTO, AGREGA LA INFORMACION A LA TABLA ----------------------
          else {
               CalcularTotalLinea(precio, cantidad);
               AgregarLinea(tabla, codigo, cantidad, NombreProducto.value, precio, subTotal, miva, total);
               cfilas += 1;
          }
     }
     $("#nombreProducto").focus();
     LimpiarCampos();
     CalcularTotales(tabla, cfilas);
};

$('#txtCodigo').change(function (e) {
     e.preventDefault();

     const url = `${base_url}facturacion/getProducto`;
     const datos = new FormData();
     datos.append('op', 'data');
     datos.append('dato', e.target.value);

     const response = fnt_Fetch(url, 'post', datos);
     response.then((info) => {
          if (info.status) {
               codigo = $("#txtCodigo").val();
               NombreProduct = info.data.name;
               price = info.data.price;
               porceIva = info.data.valor;
               cantidad = 1;

               // INSERTA PRIMER PRODUCTO
               if (cfilas == 0) {
                    CalcularTotalLinea(price, cantidad);
                    AgregarLinea(tabla, codigo, cantidad, NombreProduct, price, subTotal, miva, total);
                    cfilas += 1;
               }
               // SI EXISTE EL CODIGO SE ACTUALIZA LAS CANTIDADES Y TOTALES DE LINEA
               else {
                    infoTable = tabla.fnGetNodes();
                    for (let i = 0; i < infoTable.length; i++) {
                         if (infoTable[i].cells[0].innerHTML == codigo) {
                              existe = true;
                              var CantExistente = infoTable[i].cells[1].childNodes[0].children.cantidadT.value;
                              nfila = i;
                              break;
                         }
                    };

                    if (existe) {
                         NuevaCantidad = Number(CantExistente) + Number(cantidad);
                         tabla.fnUpdate(`<div class="w-100"><input name="cantidadT" id="cantidadT" type="number" value="${NuevaCantidad}" min="1" class="form-control text-center" ></div>`, nfila, 1, 0, false);

                         NuevoIva = (price * porceIva) * NuevaCantidad;
                         tabla.fnUpdate(Number.parseFloat(NuevoIva).toFixed(2), nfila, 5, 0, false);

                         NuevoSubtotal = (price * NuevaCantidad);
                         tabla.fnUpdate(Number.parseFloat(NuevoSubtotal).toFixed(2), nfila, 4, 0, false);

                         NuevoTotal = NuevoSubtotal + NuevoIva;
                         tabla.fnUpdate(Number.parseFloat(NuevoTotal).toFixed(2), nfila, 6, 0, false);
                         /* Dato, nfila, ncolumna, 0, false */

                         // se cambia a falso por que en el if del for no se implemento el else, para que no se ejecute tantas veces por si no se valida el if
                         existe = false;
                    }
                    //SI NO EXISTE EL CODIGO DEL PRODUCTO, AGREGA LA INFORMACION A LA TABLA ----------------------
                    else {
                         CalcularTotalLinea(price, cantidad);
                         AgregarLinea(tabla, codigo, cantidad, NombreProduct, price, subTotal, miva, total);
                         cfilas += 1;
                    }
               }

               CalcularTotales(tabla, cfilas);

               $("#txtCodigo").val('');
               $("#txtCodigo").focus();
          } else {
               swal('', info.msg, "info");
          }
     });
});

function AgregarLinea(tabla, codigo, cantidad, NombreProducto, precio, subTotal, miva, total) {
     tabla.fnAddData([
          codigo,
          `<div class="w-100"><input name="cantidadT" id="cantidadT" type="number" value="${cantidad}" min="1" class="form-control text-center"></div>`,
          // cantidad,
          `<div class="w-100">${NombreProducto}</div>`,
          Number.parseFloat(precio).toFixed(2),
          Number.parseFloat(subTotal).toFixed(2),
          Number.parseFloat(miva).toFixed(2),
          Number.parseFloat(total).toFixed(2),
          `<div class="flex-center">
                         <div class="btn-group">
                              <i id="btnEliminarLinea" class="fa fa-trash btn btn-danger2" title="Eliminar Linea"></i>
                         </div>
                         </div>`,
     ]);
}
//#endregion

//#region Funciones de la tabla
$(document).on('change', '#cantidadT', function (e) {
     e.preventDefault();
     // obtener la fila a editar
     filaEditar = $(this).closest("tr").get(0);
     nFila = filaEditar._DT_RowIndex;

     // De la tabla obtiene los datos de esa fila 
     data = tabla.fnGetData(nFila);
     let preUnitario = data[3];
     codigo = data[0];

     const url = `${base_url}facturacion/getProducto`;
     const datos = new FormData();
     datos.append('op', 'data');
     datos.append('dato', codigo);
     let cant = e.target.value;

     const response = fnt_Fetch(url, 'post', datos);
     response.then((info) => {
          if (info.status) {
               if (parseInt(info.data.cantidad) >= parseInt(cant)) {
                    CalcularTotalLinea(preUnitario, cant);

                    tabla.fnUpdate(subTotal.toFixed(2), nFila, 4, 0, false);
                    tabla.fnUpdate(miva.toFixed(2), nFila, 5, 0, false);
                    tabla.fnUpdate(total.toFixed(2), nFila, 6, 0, false);

                    CalcularTotales(tabla, cfilas);
               } else {
                    tabla.fnUpdate(`<div class="w-100"><input name="cantidadT" id="cantidadT" type="number" value="${parseInt(info.data.cantidad)}" min="1" class="form-control text-center"></div>`, nFila, 1, 0, false);
                    swal('', `Solo hay ${parseInt(info.data.cantidad)} en existencia`, "info");
               }
          } else {
               swal('', info.msg, "info");
          }
     });
});

$(document).on('click', '#btnEditarLinea', function (e) {
     e.preventDefault();
     // obtener la fila a editar
     filaEditar = $(this).closest("tr").get(0);
     // De la tabla obtiene los datos de esa fila 
     data = tabla.fnGetData(filaEditar._DT_RowIndex);
     // Imprime la posicion 1 del array, o sea, el Codigo del Producto
     $("#nombreProducto").val(data[2]); // nombre
     $("#Cantidad").val(data[1]); // cantidad
     $("#Precio").val(data[3]); // prec unit

     document.getElementById('add').style.display = 'none';
     document.getElementById('update').style.display = 'block';
});

$(document).on('click', '#btnActualizarProducto', function (e) {
     e.preventDefault();
     // OBTENER LA FILA SELECCIONADA
     nFila = filaEditar._DT_RowIndex;

     CalcularTotalLinea($("#Precio").val(), $("#Cantidad").val());

     // SE ACTUALIZAN LOS CAMPOS EN LA TABLA
     /* Orden de los campos: Dato nuevo, nfila, ncolumna, 0, false */
     $("#cantidadT").val($("#Cantidad").val())
     // tabla.fnUpdate($("#Cantidad").val(), nFila, 1, 0, false);
     tabla.fnUpdate(subTotal.toFixed(2), nFila, 4, 0, false);
     tabla.fnUpdate(iva.toFixed(2), nFila, 5, 0, false);
     tabla.fnUpdate(total.toFixed(2), nFila, 6, 0, false);

     CalcularTotales(tabla, cfilas);

     LimpiarCampos();
     document.getElementById('add').style.display = 'block';
     document.getElementById('update').style.display = 'none';
});

$(document).on('click', '#btnEliminarLinea', function (e) {
     e.preventDefault();
     var row = $(this).closest("tr").get(0);
     tabla.fnDeleteRow(tabla.fnGetPosition(row));
     cfilas -= 1;

     CalcularTotales(tabla, cfilas);
});
//#endregion

//#region Calculos
function CalcularTotalLinea(precio, cantidad) {
     miva = (precio * porceIva) * cantidad;
     subTotal = Number(precio * cantidad);
     total = subTotal + miva;
}

function CalcularTotales(tabla, cfilas) {
     var SubTotal = 0,
          TotalFactura = 0,
          SubTotalIVA = 0;

     for (var i = 0; i < cfilas; i++) {
          DatosTabla = tabla.fnGetData(i);

          SubTotal += Number(DatosTabla[4]);
          SubTotalIVA += Number(DatosTabla[5]);
          TotalFactura += Number(DatosTabla[6]);
     }

     document.querySelector("#Subtotal").value = Number.parseFloat(SubTotal).toFixed(2);
     document.querySelector("#iva").value = Number.parseFloat(SubTotalIVA).toFixed(2);
     document.querySelector("#totalFactura").value = Number.parseFloat(TotalFactura).toFixed(2);
     // document.querySelector("#totalFacturaLbl").innerHTML = Number.parseFloat(TotalFactura).toFixed(2);
     document.querySelector("#totalFacturaLbl").innerHTML = Math.round(TotalFactura).toFixed(2);
}
//#endregion

//#region OTRAS FUNCIONES
function getTipoDocumento() {
     const url = `${base_url}facturacion/getTipoDocumento`
     const response = fnt_Fetch(url);
     response.then((res) => {
          if (res.status) {
               arrTipoDoc = res.data;

               for (let i = 0; i < arrTipoDoc.length; i++) {
                    tipoDocumento.options[i] = new Option(
                         arrTipoDoc[i]["nombre"],
                         arrTipoDoc[i]["id"]
                    );
               }
               tipoDocumento.options[2].defaultSelected = true;
          } else {
               swal('', res.msg, "error");
          }
     });
}

function LimpiarCampos() {
     document.querySelector("#nombreProducto").value = '';
     document.querySelector("#codigo").value = '';
     document.querySelector("#Cantidad").value = '';
     document.querySelector("#Precio").value = '';
     document.querySelector("#Stock").value = '';
}

var chkEstadoEfectivo = false, chkEstadoTarjeta = false, chkEstadoCredito = false;
$(document).on('click', '#chkEfectivo', function (e) {
     if (!chkEstadoEfectivo) {
          document.querySelector("#chkTarjeta").setAttribute('disabled', '');
          document.querySelector("#chkCredito").setAttribute('disabled', '');
          chkEstadoEfectivo = true;
     } else {
          document.querySelector("#chkTarjeta").removeAttribute('disabled');
          document.querySelector("#chkCredito").removeAttribute('disabled');
          chkEstadoEfectivo = false;
     }
})

$(document).on('click', '#chkTarjeta', function (e) {
     if (!chkEstadoTarjeta) {
          document.querySelector("#chkEfectivo").setAttribute('disabled', '');
          document.querySelector("#chkCredito").setAttribute('disabled', '');
          chkEstadoTarjeta = true;
     } else {
          document.querySelector("#chkEfectivo").removeAttribute('disabled');
          document.querySelector("#chkCredito").removeAttribute('disabled');
          chkEstadoTarjeta = false;
     }
})

$(document).on('click', '#chkCredito', function (e) {
     if (!chkEstadoCredito) {
          document.querySelector("#chkEfectivo").setAttribute('disabled', '');
          document.querySelector("#chkTarjeta").setAttribute('disabled', '');
          chkEstadoCredito = true;
     } else {
          document.querySelector("#chkEfectivo").removeAttribute('disabled');
          document.querySelector("#chkTarjeta").removeAttribute('disabled');
          chkEstadoCredito = false;
     }
});

$('#tipoDocumento').on('change', (e) => {
     tipoFactura = e.target.value;
});

$("#Nombre").on({
     keydown: (e) => {
          return (e.key.length != 1 || 1 + e.key.search(/[a-zA-Z]/)) ? true : false;
     },
     paste: function (e) {
          return false;
     }
});

$("#Identificacion").on({
     keydown: (e) => {
          return (e.key.length != 1 || 1 + e.key.search(/^[0-9]/)) ? true : false;
     },
     paste: function (e) {
          return false;
     }
});

function FechaActual() {
     var fecha = new Date(); //Fecha actual
     var mes = fecha.getMonth() + 1; //obteniendo mes
     var dia = fecha.getDate(); //obteniendo dia
     var anho = fecha.getFullYear(); //obteniendo año
     if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
     if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
     var fchActual = document.querySelectorAll('#Fecha');
     fchActual.forEach(function (fchActual) {
          fchActual.value = dia + "/" + mes + "/" + anho;
     })
};

function getUrl() {
     var loc = window.location;
     var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
     alert(loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length)));
}
//#endregion

//#region FACTURACION
$('#btnFacturar').click(function (e) {
     e.preventDefault();
     detaFactura = Array();
     encaFactura = Array();

     infoTable = tabla.fnGetNodes();
     if (infoTable.length > 0) {
          const idCliente = document.querySelector("#idCliente").value;
          const tipoFactura = document.querySelector("#tipoDocumento").value;
          const tipoPago = document.querySelector("#tipoPago").value;
          const Subtotall = document.querySelector("#Subtotal").value;
          const ivaa = document.querySelector("#iva").value;
          const totalFactura = document.querySelector("#totalFactura").value;

          frmDatos = new FormData();
          frmDatos.append('tipoFactura', tipoFactura);
          frmDatos.append('tipoPago', tipoPago);
          frmDatos.append('idCliente', idCliente);
          frmDatos.append('Subtotal', Subtotall);
          frmDatos.append('iva', ivaa);
          frmDatos.append('totalFactura', totalFactura);

          const url = `${base_url}facturacion/insertEncaFactura`
          const response = fnt_Fetch(url, 'post', frmDatos);
          response.then((res) => {
               if (res.status) {
                    idVenta = res.id;

                    for (let i = 0; i < infoTable.length; i++) {
                         co = infoTable[i].cells[0].innerHTML;
                         ca = infoTable[i].cells[1].childNodes[0].children.cantidadT.value;
                         pUnit = infoTable[i].cells[3].innerHTML;
                         sub = infoTable[i].cells[4].innerHTML;
                         iva = infoTable[i].cells[5].innerHTML;
                         tot = infoTable[i].cells[6].innerHTML;

                         detaFactura.push({ idVenta, co, ca, pUnit, sub, iva, tot });
                    };

                    const url = `${base_url}facturacion/insertDetaFactura`
                    $.post(url, { datos: detaFactura }, (info) => {
                         const response = JSON.parse(info)
                         if (response.status) {
                              GenerarFactura(idVenta, tipoFactura);
                         } else {
                              swal("", response.msg, "error");
                         }
                    });
               } else {
                    swal('', res.msg, "error");
               }
          });
     } else {
          swal('', 'No hay datos para procesar', "info");
     }
});

const GenerarFactura = async (idVenta, tipoFactura) => {
     const url = `${base_url}facturacion/GeneraFactura`
     datos = new FormData();
     datos.append('idVenta', idVenta);
     datos.append('tipoFactura', tipoFactura);

     const response = fnt_Fetch(url, 'post', datos);
     response.then((response) => {
          if (response.status) {
               swalMixin('success', 'Documento ' + response.nfactura, 'bottom-end', 1600);
               setTimeout(`location.href='${base_url}facturacion/nueva_venta'`, 1600);

               /* Funcion esta en archivo main.js */
               generarPDF(idVenta);
          } else {
               swal('', response.msg, 'error');
          }
     })
}
//#endregion