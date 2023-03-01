<?= headerAdmin($data); ?>

<!-- CONTENIDO PRICIPAL -->
<main class="app-content">
     <div class="app-title">
          <div>
               <h1><i class="fa fa-dashboard"></i> <?= $data['page_name'] ?></h1>
          </div>
          <form class="d-flex">
               <div class="input-group">
                    <input type="date" id="txtFecha" step="1" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" class="form-control form-control-light">
               </div>
          </form>
     </div>

     <div class="container-fluid mt-2">
          <div class="row">
               <div class="col-md-6 col-lg-3">
                    <div class="widget-small info shadow coloured-icon">
                         <a href="<?= base_url(); ?>facturacion/facturas"><i class="icon fas fa-file-invoice-dollar"></i></a>
                         <div class="info">
                              <h4>Facturas</h4>
                              <p><b id="cantFacturas"></b></p>
                         </div>
                    </div>
               </div>
               <div class="col-md-6 col-lg-3">
                    <div class="widget-small shadow warning coloured-icon">
                         <a href="<?= base_url(); ?>clientes"><i class="icon fas fa-users"></i></a>
                         <div class="info">
                              <h4>Clientes</h4>
                              <p> <b id="cantClientes"></b> </p>
                         </div>
                    </div>
               </div>
               <div class="col-md-6 col-lg-3">
                    <div class="widget-small shadow danger coloured-icon">
                         <a href="<?= base_url(); ?>productos"><i class="icon fas fa-gifts fa-3x"></i></a>
                         <div class="info">
                              <h4>Productos</h4>
                              <p> <b id="cantProductos"></b> </p>
                         </div>
                    </div>
               </div>
               <div class="col-md-6 col-lg-3">
                    <div class="widget-small shadow primary coloured-icon">
                         <a href="<?= base_url(); ?>usuarios"><i class="icon fas fa-user-cog"></i></a>
                         <div class="info">
                              <h4>Usuarios</h4>
                              <p> <b id="cantUsers"></b> </p>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</main>

<?= footerAdmin($data); ?>