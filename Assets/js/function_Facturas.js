var tblFacturas;

document.addEventListener("DOMContentLoaded", function () {
     tblFacturas = $("#tblFacturas").DataTable({
          aProcessing: true,
          aServerSide: true,
          dom: "frtip",
          "language": {
               "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
          },
          ajax: {
               url: ` ${base_url}/facturacion/getFacturas`,
               dataSrc: "",
          },
          columns: [
               {
                    data: "fecha",
               },
               {
                    data: "nfactura",
               },
               {
                    data: "tipo_factura",
               },
               {
                    data: "tipo_pago",
               },
               {
                    data: "m_total",
               },
               {
                    data: "estado",
               },
               {
                    data: "options",
               },
          ],
          responsive: "true",
          bDestroy: true,
          'iDisplayLenght': 15,
     });
});

// function fntverPDF(id) {
//      url = `${base_url}facturacion/verPDF/${id}`;
//      window.open(url, 'blank');
// }

function fntVerVenta(id) {
     alert('id factura '+id);
}

function fntReenviarFactura(id) {
     alert('id factura ' + id);
}