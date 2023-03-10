var tabla = $("#tblFactura").dataTable({
     retrieve: true,
     paging: false,
     searching: false,
     language: {
          sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
     },
});

// CARGA LA FUNCION AL INICIAR LA PAGINA
window.onload = function () {
     this.FechaActual();
};

const btnIdentificacion = document.querySelector("#btnIdentificacion");
btnIdentificacion.onclick = function (e) {
     e.preventDefault();
     const identification = document.querySelector("#Identificacion").value;
     if (identification != " ") {
          const url = `${base_url}Facturacion/getCliente/${identification}`;

          const response = fnt_Fetch(url);
          response.then((InfoCliente) => {
               if (InfoCliente.status) {
                    document.querySelector("#Nombre").value = InfoCliente.data.Nombre;
                    document.querySelector("#Telefono").value = InfoCliente.data.Telefono;
                    document.querySelector("#Email").value = InfoCliente.data.Email;
                    document.querySelector("#Direccion").value = InfoCliente.data.Direccion;
               } else {
                    document.querySelector("#Nombre").value = " ";
                    document.querySelector("#Telefono").value = " ";
                    document.querySelector("#Email").value = " ";
                    document.querySelector("#Direccion").value = " ";
               }
          });
     } else {
          document.querySelector("#Nombre").value = " ";
          document.querySelector("#Telefono").value = " ";
          document.querySelector("#Email").value = " ";
          document.querySelector("#Direccion").value = " ";
     }
};

const nombreProducto = document.querySelector("#nombreProducto");
nombreProducto.onclick = function (e) {
     document.getElementById("alerta").innerHTML = "(Precione enter para buscar)";
};

nombreProducto.onkeypress = function (e) {
     if (e.keyCode == 13) {
          if (nombreProducto.value != "") {
               document.getElementById("alerta").classList.remove("error");
               const url = `${base_url}Facturacion/getProduct/${nombreProducto.value}`;

               const response = fnt_Fetch(url);
               response.then((InfoProducto) => {
                    if (InfoProducto.status) {
                         if (InfoProducto.data.state != 0) {
                              $("#btnAgregarProducto").removeClass("disabled");
                              document.querySelector("#nombreProducto").value = InfoProducto.data.name;
                              document.querySelector("#Precio").value = InfoProducto.data.price;
                              document.querySelector("#Stock").value = InfoProducto.data.stock;
                              document.querySelector("#Cantidad").focus();
                         } else {
                              swal("Producto deshabilitado", " ", "info");
                         }
                    } else {
                         $("#btnAgregarProducto").addClass("disabled");
                         swal(InfoProducto.msg, ' ', 'error')
                    }
               });
          } else {
               document.getElementById("alerta").classList.add("error");
               document.getElementById("alerta").innerHTML = "(Escriba el nombre de un producto)";
          }
     } else {
          document.getElementById("alerta").classList.remove("error");
          document.getElementById("alerta").innerHTML = "(Precione enter para buscar)";
     }
};

function fnt_Fetch(url, method = "", Databody) {
     var jsonResponse;

     if (method == "post") {
          jsonResponse = fetch(url, {
               method: method,
               body: Databody,
          }).then((res) => res.json());
     } else {
          jsonResponse = fetch(url).then((res) => res.json());
     }
     return jsonResponse;
};

// PONE LA FECHA ACTUAL EN EL CAMPO FECHA
function FechaActual() {
     var fecha = new Date(); //Fecha actual
     var mes = fecha.getMonth() + 1; //obteniendo mes
     var dia = fecha.getDate(); //obteniendo dia
     var anho = fecha.getFullYear(); //obteniendo a??o
     if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
     if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
     document.getElementById("txtFecha").value = anho + "-" + mes + "-" + dia;
};

// AGREGA LA LINEA DEL PRODUCTO A LA TABLA
var NuevaCantidad = 0,
     NuevoSubtotal = 0,
     existe = false,
     cfilas = 0,
     cantidad = 0,
     precio = 0,
     iva = 0,
     subTotal = 0,
     total = 0,
     DatosTabla;

const btnAgregarProducto = document.querySelector("#btnAgregarProducto");
btnAgregarProducto.onclick = function () {
     // }
     // $(document).on("click", "#btnAgregarProducto", function (e) {
     cantidad = document.querySelector("#Cantidad").value;
     precio = document.querySelector("#Precio").value;

     if (cantidad != "" && nombreProducto.value != "") {
          // tabla = $("#tblFactura").dataTable({
          //      retrieve: true,
          //      paging: false,
          //      searching: false,
          //      language: {
          //           sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
          //      },
          // });

          // ------------ PROCESO EN CASO DE QUE SEA EL PRIMER PRODUCTO ------------------------------
          if (cfilas == 0) {
               subTotal = precio * cantidad;
               iva = precio * 0.13;
               total = iva + subTotal;

               tabla.fnAddData([
                    cantidad,
                    nombreProducto.value,
                    Number.parseFloat(precio).toFixed(2),
                    Number.parseFloat(subTotal).toFixed(2),
                    Number.parseFloat(iva),
                    Number.parseFloat(total),
                    '<div class="">' +
                    '<button class="btn btn-info" id="EditarLinea" title="Editar Linea"><i class="fa fa-edit"></i></button>' +
                    '<button class="btn btn-danger" id="EliminarLinea" title="Eliminar Linea"><i class="fa fa-trash"></i></button>' +
                    "</div>",
               ]);
               cfilas += 1;
          }
          // ------------ PROCESO EN CASO DE QUE YA EXISTA EL PRODUCTO -------------------------------
          else {
               // BUSCAR SI EXISTE EL CODIGO
               for (var i = 0; i < cfilas; i++) {
                    // Vamos obteniendo los datos de la fila
                    DatosTabla = tabla.fnGetData(i);
                    //Validamos si el codigo a ingresar existe
                    if (DatosTabla[1] == nombreProducto.value) {
                         existe = true;
                         var CantExistente = DatosTabla[0];
                         nfila = i;
                    }
               }
               // ------------ SI EXISTE EL CODIGO SE ACTUALIZA LAS CANTIDADES Y TOTALES DE LINEA -------------------------------
               if (existe) {
                    NuevaCantidad = Number(CantExistente) + Number(cantidad);
                    tabla.fnUpdate(NuevaCantidad, nfila, 0, 0, false);

                    NuevoSubtotal = NuevaCantidad * precio;
                    tabla.fnUpdate(NuevoSubtotal, nfila, 3, 0, false);

                    NuevoIva = NuevoSubtotal * 0.13;
                    tabla.fnUpdate(NuevoIva, nfila, 4, 0, false);

                    NuevoTotal = NuevoSubtotal + NuevoIva;
                    tabla.fnUpdate(NuevoTotal, nfila, 5, 0, false);
                    /* Dato, nfila, ncolumna, 0, false */

                    // se cambia a falso por que en el if del for no se implemento el else, para que no se ejecute tantas veces por si no se valida el if
                    existe = false;
               }
               // ------------ SI NO EXISTE EL CODIGO DEL PRODUCTO, AGREGA LA INFORMACION A LA TABLA ----------------------
               else {
                    // cantidad = Number(cantidad);
                    // precio = $("#Precio").val();
                    subTotal = precio * cantidad;
                    iva = precio * 0.13;
                    total = iva + subTotal;

                    tabla.fnAddData([
                         cantidad,
                         nombreProducto.value,
                         Number.parseFloat(precio).toFixed(2),
                         Number.parseFloat(subTotal).toFixed(2),
                         Number.parseFloat(iva),
                         Number.parseFloat(total),
                         '<div class="">' +
                         '<button class="btn btn-info" id="EditarLinea" title="Editar Linea"><i class="fa fa-edit"></i></button>' +
                         '<button class="btn btn-danger" id="EliminarLinea" title="Eliminar Linea"><i class="fa fa-trash"></i></button>' +
                         "</div>",
                    ]);
                    cfilas += 1;
               }
          }
          $("#nombreProducto").focus();
          LimpiarCampos();
     } else {
          swal("Debe agregar un producto", "", "error");
     }

     CalcularTotales(tabla, cfilas);
};

function LimpiarCampos() {
     document.querySelector("#nombreProducto").value = '';
     document.querySelector("#Cantidad").value = '';
     document.querySelector("#Precio").value = '';
     document.querySelector("#Stock").value = '';
}

function CalcularTotales(tabla, cfilas) {
     var SubTotal = 0,
          SubTotalDescuento = 0,
          TotalFactura = 0,
          SubTotalIVA = 0;

     // PROCESO QUE LLENA LOS CAMPOS DE TOTALES
     for (var i = 0; i < cfilas; i++) {
          DatosTabla = tabla.fnGetData(i);

          // Suma lo que tiene el campo subtotal + el monto nuevo
          //var cantidad = Number(DatosTabla[3]);
          //var preciopro = Number(DatosTabla[4]);
          //SubTotalFactura += cantidad * preciopro;

          // var NuevoTotalProducto = Number(DatosTabla[0]) * Number(DatosTabla[2]);
          // SubTotal += NuevoTotalProducto;
          // SubTotalDescuento += Number(DatosTabla[6]);
          SubTotal += Number(DatosTabla[3]);
          SubTotalIVA += Number(DatosTabla[4]);
          TotalFactura += Number(DatosTabla[5]);
     }

     document.querySelector("#Subtotal").value = Number.parseFloat(SubTotal).toFixed(2);
     document.querySelector("#iva").value = Number.parseFloat(SubTotalIVA).toFixed(2);
     document.querySelector("#Total").value = Number.parseFloat(TotalFactura).toFixed(2);

     // $('#Subtotal').val(numeral(SubTotal).format('0,0.00'));
     // $('#TxtMontoDescuento').val(numeral(SubTotalDescuento).format('0,0.00'));
     // $('#TxtImpuesto').val(numeral(SubTotalIVA).format('0,0.00'));
     // $('#TxtTotalFactura').val(numeral(TotalFactura).format('0,0.00'));
}

// ========================== FUNCIONES QUE NO SE UTILIZAN =======================================
// function SearchClient(identification) {
//      if (identification != " ") {
//           const url = `${base_url}Facturacion/getCliente/${identification}`;

//           const response = fnt_Fetch(url)
//           response.then(InfoCliente => {
//                if (InfoCliente.status) {
//                     document.querySelector("#Nombre").value = InfoCliente.data.Nombre;
//                     document.querySelector("#Telefono").value = InfoCliente.data.Telefono;
//                     document.querySelector("#Email").value = InfoCliente.data.Email;
//                     document.querySelector("#Direccion").value = InfoCliente.data.Direccion;
//                } else {
//                     document.querySelector("#Nombre").value = ' ';
//                     document.querySelector("#Telefono").value = " ";
//                     document.querySelector("#Email").value = " ";
//                     document.querySelector("#Direccion").value = " ";
//                }
//           })
//      } else {
//           document.querySelector("#Nombre").value = ' ';
//           document.querySelector("#Telefono").value = " ";
//           document.querySelector("#Email").value = " ";
//           document.querySelector("#Direccion").value = " ";
//      }
// }

// function SearchProduct(nombreProducto) {
//      if (nombreProducto != " ") {
//           const url = `${base_url}Facturacion/getProduct/${nombreProducto}`;

//           const response = fnt_Fetch(url)
//           response.then(InfoProducto => {
//                if (InfoProducto.status) {
//                     if (InfoProducto.data.state != 0) {
//                          $("#btnAgregarProducto").removeClass("disabled");
//                          document.querySelector("#Precio").value = InfoProducto.data.price;
//                          document.querySelector("#Stock").value = InfoProducto.data.stock;
//                          document.querySelector("#Cantidad").focus();
//                     } else {
//                          swal("Producto deshabilitado", " ", "info");
//                     }
//                } else {
//                     $("#btnAgregarProducto").addClass("disabled");
//                     document.querySelector("#Precio").value = " ";
//                     document.querySelector("#Stock").value = " ";
//                }
//           })
//      } else {
//           document.querySelector("#Precio").value = " ";
//           document.querySelector("#Stock").value = " ";
//      }
// }