<!DOCTYPE html>
<html lang="es">

<head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <meta name="author" content="Jairo Pérez Rodríguez">
     <meta name="theme-color" content="#35b8e0">
     <link rel="shortcut icon" href="<?= media(); ?>images/favicon2.ico" type="image/x-icon">
     <title><?php echo $data["page_title"] ?></title>
     <!-- Main CSS-->
     <link rel="stylesheet" type="text/css" href="<?php echo media; ?>css/main.css">

     <!-- Animate CSS-->
     <link rel="stylesheet" type="text/css" href="<?php echo media() ?>css/animate-4.1.1.min.css">
</head>

<body>
     <section class="material-half-bg">
          <section class="login-content animate__animated animate__bounce">
               <div class="logo">
                    <h1 style="font-family: sans-serif;"><?php echo $data["page_name"] ?></h1>
               </div>
               <div class="login-box">
                    <!-- FORM RESET LOGIN -->
                    <form id="frmLogin" name="frmLogin" class="login-form" action="">
                         <div class="form-group">
                              <label for="txtUsername" class="control-label">USUARIO</label>
                              <input class="form-control" id="txtUsername" name="txtUsername" type="text" placeholder="Usuario" autocomplete="off">
                         </div>
                         <div class="form-group">
                              <label for="txtPassword" class="control-label">CONTRASEÑA</label>
                              <input class="form-control" id="txtPassword" name="txtPassword" type="password" placeholder="Contraseña" autocomplete="off">
                              <i class="fa fa-eye" style="position: relative;top: -26px;right: 10px;float: right;font-size: 16px;" onclick="if($('#txtPassword').attr('type')=='text'){$('#txtPassword').attr('type','password');$(this).attr('class','fa fa-eye');}else{$('#txtPassword').attr('type','text');$(this).attr('class','fa fa-eye-slash');}"></i>
                         </div>
                         <div class="form-group">
                              <div class="utility">
                                   <p class="semibold-text mb-2"><a href="#" data-toggle="flip">Olvidó su contraseña?</a></p>
                              </div>
                         </div>
                         <div id="alertLogin" class="text-center"></div>
                         <div class="form-group btn-container">
                              <button type="submit" class="btn btn-primary2 btn-block"><i class="fa fa-sign-in fa-lg fa-fw"></i>Iniciar sesión</button>
                         </div>
                    </form>

                    <!-- FORM RESET PASSWORD -->
                    <form class="forget-form" action="#">
                         <h3 class="login-head"><i class="fa fa-lg fa-fw fa-lock"></i>Olvidó su contraseña?</h3>
                         <div class="form-group">
                              <label for="txtEmailReset" class="control-label">EMAIL</label>
                              <input id="txtEmailReset" name="txtEmailReset" class="form-control" type="email" placeholder="Correo electrónico">
                         </div>
                         <div class="form-group btn-container">
                              <button type="submit" class="btn btn-primary btn-block"><i class="fa fa-unlock fa-lg fa-fw"></i>RESETEAR</button>
                         </div>
                         <div class="form-group mt-3">
                              <p class="semibold-text mb-0"><a href="#" data-toggle="flip"><i class="fa fa-angle-left fa-fw"></i> INICIAR SESIÓN</a></p>
                         </div>
                    </form>
               </div>
          </section>
     </section>

     <!-- Jquery 3.5.1 -->
     <script type="text/javascript" src="<?php echo media() ?>js/plugins/jquery-3.5.1.js"></script>

     <!-- Bootstrap min 4.3 -->
     <script type="text/javascript" src="<?php echo media() ?>js/plugins/popper.min.js"></script>
     <script type="text/javascript" src="<?php echo media() ?>js/plugins/bootstrap.min.js"></script>

     <!-- JS DataTable -->
     <script type="text/javascript" src="<?php echo media() ?>js/plugins/jquery.dataTables.min.js"></script>
     <script type="text/javascript" src="<?php echo media() ?>js/plugins/dataTables.bootstrap5.min.js"></script>

     <script type="text/javascript" src="<?php echo media(); ?>js/plugins/select2.min.js"></script>
     <script type="text/javascript" src="<?php echo media(); ?>js/plugins/sweetalert.min.js"></script>
     <script type="text/javascript" src="<?php echo media(); ?>js/plugins/fontawesome-kit_3be261b745.js"></script>
     <script type="text/javascript" src="<?php echo media(); ?>js/plugins/main.js"></script>
     <script type="text/javascript" src="<?php echo media() . $data['page_functions'] ?>"></script>
     <script>
          const base_url = "<?= base_url(); ?>";
     </script>
</body>

</html>