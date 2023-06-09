<?= headerAdmin($data); ?>

<!-- CONTENIDO PRICIPAL -->
<main class="app-content animate__animated animate__headShake ">
     <div class="app-title">
          <div class="flex-center">
               <h1><i class="fas fa-user-tag"></i> <?= $data['page_name'] ?>
               </h1>
               <button class="btn btn-primary2 ml-2" type="button" onclick="OpenModal()"><i class="fas fa-plus-circle" data-toggle="modal" data-target="#modalRoles"> </i> Nuevo Rol</button>

          </div>
          <ul class="app-breadcrumb breadcrumb">
               <li class="breadcrumb-item"><a href="<?= base_url(); ?>dashboard"><i class="fa fa-home fa-lg"></i></a></li>
               <li class="breadcrumb-item"><a href="<?= base_url(); ?>roles"> Roles</a></li>
          </ul>
     </div>
     <div class="row">
          <div class="col-md-12">
               <div class="tile">
                    <div class="table-responsive">
                         <table class="table table-centered table-sm" id="tblRoles" style="width: 100%;">
                              <thead>
                                   <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
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

<?= ShowModal('modalRoles');
footerAdmin($data); ?>