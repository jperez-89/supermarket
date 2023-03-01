<?= headerAdmin($data); ?>

<!-- CONTENIDO PRICIPAL -->
<main class="app-content">
     <div class="app-title">
          <div>
               <h1>
                    <i class="fas fa-file-invoice-dollar"></i> <?= $data['page_name'] ?>
               </h1>
          </div>
          <ul class="app-breadcrumb breadcrumb">
               <li class="breadcrumb-item"><a href="<?= base_url(); ?>dashboard"><i class="fa fa-home fa-lg"></i></a></li>
               <li class="breadcrumb-item"><a href="<?= base_url(); ?>facturacion/facturas"> Facturas</a></li>
          </ul>
     </div>
     <div class="row">
          <div class="col-md-12">
               <div class="tile">
                    <div class="table-responsive">
                         <table class="table table-centered w-100 table-sm" id="tblFacturas">
                              <thead>
                                   <tr>
                                        <th>Fecha</th>
                                        <th># Factura</th>
                                        <th>Tipo</th>
                                        <th>Tipo Pago</th>
                                        <th>Monto Total</th>
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
footerAdmin($data);
?>