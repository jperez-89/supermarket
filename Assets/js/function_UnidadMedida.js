document.addEventListener("DOMContentLoaded", function () {
    tblUnidadMedida = $("#tblUnidadMedida").DataTable({
        aProcessing: true,
        aServerSide: true,
        dom: "frtip",
        "language": {
            "url": `${base_url}assets/js/plugins/Spanish.json`,
        },
        ajax: {
            url: ` ${base_url}/productos/getUnidadesMedida`,
            dataSrc: "",
        },
        columns: [{
            data: "id",
        },
        {
            data: "unidad",
        },
        {
            data: "nomenclatura",
        },
        {
            data: "equivalencia",
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
        iDisplayLenght: 10,
        order: [
            [0, "asc"]
        ],
        columnDefs: [{
            targets: [0],
            visible: false,
            searchable: false
        }],
    });
});