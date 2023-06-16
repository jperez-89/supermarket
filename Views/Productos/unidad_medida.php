<?= headerAdmin($data); ?>

<!-- CONTENIDO PRICIPAL -->
<main class="app-content animate__animated animate__headShake ">
    <div class="app-title">
        <div class="flex-center">
            <h1><?= $data['page_name'] ?></h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
            <li class="breadcrumb-item"><a href="<?= base_url(); ?>dashboard"><i class="fa fa-home fa-lg"></i></a></li>
            <li class="breadcrumb-item"><a href="<?= base_url(); ?>productos/unidad_medida"> Unidad de medida</a></li>
        </ul>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <button onclick="OpenModal();" type="button" class="btn text-muted" data-toggle="modal" data-target="#modalUnidadMedida"><i class="fas fa-plus-circle"></i> Nueva unidad de medida</button>
                <div class="table-responsive">
                    <table class="table table-centered table-sm" id="tblUnidadMedida" style="width: 100%;">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Abreviatura</th>
                                <th>Equivalencia</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>

<?=
ShowModal('modalUnidadMedida');
footerAdmin($data);
?>