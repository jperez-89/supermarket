<!DOCTYPE html>
<html lang="es">

<head>
     <meta charset="utf-8">
     <!-- Descripcion que se muestran en los resultados de la busqueda de google -->
     <meta name="description" content="Supermercado en Linea">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <meta name="author" content="Jairo RPR">
     <meta name="theme-color" content="#35b8e0">
     <link rel="shortcut icon" href="<?= media(); ?>images/favicon2.ico" type="image/x-icon">
     <title><?php echo $data["page_title"] ?></title>

     <!-- DataTables CSS -->
     <link rel="stylesheet" type="text/css" href="<?php echo media ?>css/dataTables.bootstrap5.min.css">

     <!-- Main CSS-->
     <link rel="stylesheet" type="text/css" href="<?php echo media(); ?>css/main.css">

     <script type="text/javascript" src="<?php echo media() ?>js/plugins/sweetalert-2011.min.js"></script>
</head>

<body class="app sidebar-mini ">
     <!-- Navbar-->
     <header class="app-header">
          <a class="app-header__logo" href="<?php echo base ?>">SuperMarket</a>

          <!-- Sidebar toggle button-->
          <a class="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>

          <!-- Navbar Right Menu-->
          <ul class="app-nav">
               <h3 style="color: white; font-family: 'Poppins',sans-serif;"> <?php echo $_SESSION['name'] ?> </h3>
               <li class="dropdown">
                    <img data-toggle="dropdown" aria-label="Open Profile Menu" class=" settings" src="<?= media(); ?>images/avatar.png" alt="User Image">
                    <ul class="dropdown-menu settings-menu dropdown-menu-right">
                         <li><a class="dropdown-item" href="<?= base ?>logout"><i class="fa fa-sign-out fa-lg"></i> Salir</a></li>
                    </ul>
               </li>
          </ul>
     </header>

     <?= navBarAdmin(); ?>