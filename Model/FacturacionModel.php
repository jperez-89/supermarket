<?php

class FacturacionModel extends Crud
{
     public $dato, $nameProduct, $nFactura, $tipoFactura, $tipoPago, $idCliente, $totalFactura, $codigo, $cantidad, $preUnitario, $subTotal, $iva, $total;

     public function __construct()
     {
          parent::__construct();
     }

     public static function selectCliente(string $dato, string $op)
     {
          $crud = new Crud();

          if ($op == 'i') {
               $sql = "SELECT cli.Id as id, cli.Identificacion
               FROM cliente as cli 
               INNER JOIN distrito as dis on dis.Id = cli.idDistrito 
               INNER JOIN canton as can on can.Id = dis.idCanton 
               INNER JOIN provincia as pro on pro.Id = can.IdProvincia 
               WHERE cli.Identificacion LIKE '$dato%' LIMIT 0, 2";
          } else if ($op == 'n') {
               $sql = "SELECT cli.Id as id, cli.Nombre
               FROM cliente as cli 
               INNER JOIN distrito as dis on dis.Id = cli.idDistrito 
               INNER JOIN canton as can on can.Id = dis.idCanton 
               INNER JOIN provincia as pro on pro.Id = can.IdProvincia 
               WHERE cli.Nombre LIKE '$dato%' LIMIT 0, 2";
          } else if ($op == 'data') {
               $sql = "SELECT cli.Id as id, cli.Identificacion, cli.Nombre, cli.Telefono, cli.Email, CONCAT(pro.NombreProvincia,', ', can.NombreCanton,', ', dis.nombreDistrito,', ', UPPER(cli.Direccion)) as Direccion 
               FROM cliente as cli 
               INNER JOIN distrito as dis on dis.Id = cli.idDistrito 
               INNER JOIN canton as can on can.Id = dis.idCanton 
               INNER JOIN provincia as pro on pro.Id = can.IdProvincia 
               WHERE cli.Id = $dato";
          }

          $request = $crud->get_AllRegister($sql);
          return $request;
     }

     public static function selectProducto(string $op, string $dato)
     {
          $crud = new Crud();

          if ($op == 'n') {
               $sql = "SELECT p.codigo, p.name FROM producto p INNER JOIN inventario i ON i.idProducto = p.id WHERE name LIKE '%$dato%' AND i.cantidad > 0 AND state = 1";
          } elseif ($op == 'data') {
               $sql = "SELECT p.codigo, p.name, p.price, i.cantidad FROM producto p INNER JOIN inventario i ON i.idProducto = p.id WHERE p.codigo = $dato AND i.cantidad > 0 AND p.state = 1";
          }

          $request = $crud->get_AllRegister($sql);

          return $request;
     }

     public static function selectProductoByCode(string $code)
     {
          $crud = new Crud();
          $sql = "SELECT id, codigo, name FROM producto WHERE codigo = $code";

          $request = $crud->get_OneRegister($sql);

          return $request;
     }

     public function selectProducts()
     {
          $sql = "SELECT id, name FROM producto";
          $request = $this->get_AllRegister($sql);

          return $request;
     }

     public static function setEncaFactura(int $tipoFactura, string $tipoPago, int $idCliente, float $subTotal, float $iva, float $totalFactura)
     {
          $crud = new Crud();
          $query_insert = "INSERT INTO factura (tipo_factura, tipo_pago, idCliente, m_subtotal, m_iva, m_total) VALUES(?,?,?,?,?,?)";
          $arrData = array($tipoFactura, $tipoPago, $idCliente, $subTotal, $iva, $totalFactura);

          $return = $crud->Insert_Register($query_insert, $arrData);

          return $return;
     }

     public static function setDetaFactura(string $idFactura, int $idProducto, float $cantidad, float $preUnitario, float $subTotal, float $iva, float $total)
     {
          $crud = new Crud();

          $sql = "SELECT id FROM factura WHERE id = '$idFactura'";
          $request = $crud->get_OneRegister($sql);

          if (!empty($request)) {
               $query_insert = "INSERT INTO factura_detalle (idFactura, idProducto, cantidad, preUnitario, subTotal, iva, total, estado) VALUES(?,?,?,?,?,?,?,?)";
               $arrData = array($idFactura, $idProducto, $cantidad, $preUnitario, $subTotal, $iva, $total, 1);

               $request = $crud->Insert_Register($query_insert, $arrData);
          } else {
               $request = 0;
          }

          return $request;
     }

     public static function updateNumeroFactura(int $idFactura, string $result)
     {
          $crud = new Crud();

          $sql = "UPDATE factura SET nfactura = ?, estado = ? WHERE id = $idFactura";
          $arrData = array($result, 1);

          $request = $crud->update_Register($sql, $arrData);

          return $request;
     }

     public static function selectFacturaById(int $idFactura)
     {
          $crud = new Crud();

          $sql = "SELECT f.id, td.codigo FROM factura f INNER JOIN tipo_documento td ON td.id = f.tipo_factura WHERE f.id = $idFactura";
          $request = $crud->get_OneRegister($sql);

          return $request;
     }

     public function selectTipoDocumento()
     {
          $sql = "SELECT id, nombre FROM tipo_documento";
          $request = $this->get_AllRegister($sql);

          return $request;
     }

     public static function selectCantFacturas()
     {
          $crud = new Crud();

          $sql = "SELECT COUNT(id) AS Cantidad FROM factura";
          $request = $crud->get_CountRegister($sql);

          return $request;
     }

     public static function SelectFacturas()
     {
          $crud = new Crud();

          $sql = "SELECT f.id, f.fecha, f.nfactura, td.nombre AS tipo_factura, f.tipo_pago, f.m_total, f.estado FROM factura f
          INNER JOIN tipo_documento td ON td.id = f.tipo_factura";
          $request = $crud->get_AllRegister($sql);

          return $request;
     }

     public static function generarPDF($idFactura)
     {
          $crud = new Crud();

          $sql = "SELECT c.Identificacion, c.Nombre AS NombreCliente, c.Email, c.Telefono, f.id, f.fecha, f.nfactura, f.tipo_pago, f.estado, td.nombre AS TipoDocumento, f.m_subtotal, f.m_iva, f.m_total 
          FROM factura f 
          INNER JOIN cliente c ON c.Id = f.idCliente
          INNER JOIN tipo_documento td ON td.id = f.tipo_factura
          WHERE f.id = $idFactura OR f.nfactura = '$idFactura'";

          $request = $crud->get_OneRegister($sql);

          switch ($request['tipo_pago']) {
               case 'E':
                    $tipo_pago = 'EFECTIVO';
                    break;

               case 'T':
                    $tipo_pago = 'TARJETA';
                    break;

               case 'S':
                    $tipo_pago = 'SINPE';
                    break;

               case 'C':
                    $tipo_pago = 'CREDITO';
                    break;
          }

          if ($request['estado']) {
               $condicion = 'CANCELADO';
          } else {
               $condicion = 'PENDIENTE';
          }

          $sql = "SELECT p.name, fd.cantidad, fd.preUnitario, fd.total
          FROM factura_detalle fd
          INNER JOIN producto p ON p.id = fd.idProducto
          INNER JOIN factura f ON f.id = fd.idFactura
          WHERE f.id = " . $request['id'];

          $dFactura = $crud->get_AllRegister($sql);

          require_once 'vendor/fpdf/fpdf.php';
          $pdf = new FPDF('P', 'mm', array(80, 200));
          $pdf->AddPage();
          $pdf->SetMargins(1, 0, 0);
          $pdf->SetTitle("SuperMarket - POS");
          $pdf->SetFont('Arial', 'B', 9);
          $pdf->Cell(60, 5, 'SUPERMARKET - POS', 0, 1, 'C');

          $pdf->SetFont('Arial', '', 7);
          $pdf->Cell(30, 5, "IDENTIFICACION:", 0, 0, 'R');
          $pdf->Cell(15, 5, '603820149', 0, 0, 'L');
          $pdf->Cell(6, 5, 'TEL:', 0, 0, 'L');
          $pdf->Cell(15, 5, '+506 83182537', 0, 1, 'L');

          $pdf->SetFont('Arial', '', 7);
          $pdf->Cell(30, 5, "EMAIL:", 0, 0, 'R');
          $pdf->SetFont('Arial', '', 7);
          $pdf->Cell(20, 5, 'JRWC1989@GMAIL.COM', 0, 1, 'L');

          $pdf->Cell(24, 5, mb_convert_encoding($request['TipoDocumento'] . ' v4.3', 'UTF-8'), 0, 1, 'L');
          $pdf->SetFont('Arial', '', 7);
          $pdf->Cell(8, 5, "Clave", 0, 0, 'L');
          $pdf->Cell(24, 5, '506-DMA-603820149' . $request['nfactura'] . '-SCE-CS', 0, 1, 'L');
          $pdf->Cell(15, 5, "Consecutivo", 0, 0, 'L');
          $pdf->Cell(24, 5, $request['nfactura'], 0, 1, 'L');
          $pdf->Cell(8, 5, "Fecha", 0, 0, 'L');
          $pdf->Cell(2, 5, $request['fecha'], 0, 1, 'L');
          // $pdf->Ln();
          $pdf->SetFont('Arial', 'B', 7);
          $pdf->Cell(1, 5, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 0, 1, 'L');
          $pdf->Cell(40, 5, "CLIENTE", 0, 0, 'L');
          $pdf->Cell(16, 5, "TELEFONO", 0, 0, 'L');
          $pdf->Cell(25, 5, "CORREO", 0, 1, 'L');
          $pdf->SetFont('Arial', '', 7);
          $pdf->Cell(40, 5, mb_convert_encoding($request['NombreCliente'], "UTF-8"), 0, 0, 'L');
          $pdf->Cell(13, 5, mb_convert_encoding($request['Telefono'], "UTF-8"), 0, 0, 'L');
          $pdf->Cell(23, 5, mb_convert_encoding($request['Email'], "UTF-8"), 0, 0, 'L');
          $pdf->Ln();

          $pdf->SetFont('Arial', 'B', 7);
          $pdf->Cell(1, 5, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 0, 1, 'L');
          $pdf->Cell(4, 5, ' ', 0, 0, 'L');
          $pdf->Cell(46, 5, 'CANT', 0, 0, 'L');
          $pdf->Cell(15, 5, 'P.UNIT', 0, 0, 'L');
          $pdf->Cell(15, 5, 'TOTAL', 0, 1, 'L');
          $pdf->SetFont('Arial', '', 7);
          for ($i = 0; $i < count($dFactura); $i++) {
               $pdf->Cell(8, 5, number_format($dFactura[$i]['cantidad'], 2, '.', ','), 0, 0, 'L');
               $pdf->Cell(42, 5, mb_convert_encoding($dFactura[$i]['name'], 'UTF-8', 'ISO-8859-1'), 0, 0, 'L');
               $pdf->Cell(11, 5, number_format($dFactura[$i]['preUnitario'], 2, '.', ','), 0, 0, 'R');
               $pdf->Cell(16, 5, number_format($dFactura[$i]['total'], 2, '.', ','), 0, 1, 'R');
          }

          $pdf->Ln();
          $pdf->SetFont('Arial', '', 8);
          $pdf->Cell(55, 5, 'Subtotal:', 0, 0, 'R');
          $pdf->Cell(22, 5, number_format($request['m_subtotal'], 2, '.', ','), 0, 1, 'R');

          $pdf->Cell(55, 5, 'IVA:', 0, 0, 'R');
          $pdf->Cell(22, 5, number_format($request['m_iva'], 2, '.', ','), 0, 1, 'R');

          $pdf->SetFont('Arial', 'B', 10);
          $pdf->Cell(55, 5, 'Total CRC:', 0, 0, 'R');
          $pdf->Cell(22, 5, number_format($request['m_total'], 2, '.', ','), 0, 1, 'R');
          $pdf->Ln();

          $pdf->SetFont('Arial', '', 7);
          $pdf->Cell(1, 5, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 0, 1, 'L');
          $pdf->Cell(22, 5, 'FORMA PAGO:', 0, 0, 'R');
          $pdf->Cell(20, 5, mb_convert_encoding($tipo_pago, "UTF-8"), 0, 0, 'L');
          $pdf->Cell(16, 5, 'CONDICION:', 0, 0, 'L');
          $pdf->Cell(5, 5, mb_convert_encoding($condicion, "UTF-8"), 0, 1, 'L');
          $pdf->Cell(1, 5, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 0, 1, 'L');
          $pdf->Ln();

          $pdf->SetFont('Arial', '', 8);
          $pdf->Cell(80, 5, mb_convert_encoding('*** GRACIAS POR SU VISITA ***', "UTF-8"), 0, 1, 'C');
          $pdf->Cell(80, 5, mb_convert_encoding('*** RESOLUCION DGT-R-033-2019 ***', "UTF-8"), 0, 1, 'C');

          if ($pdf->Output('assets/facturas/', 'factura-' . $request["nfactura"] . '.pdf', 'F')) {
               $pdf->Output('assets/facturas/', 'factura-' . $request["nfactura"] . '.pdf', 'I');
          }
     }

     // public static function verPDF($idFactura)
     // {
     //      $crud = new Crud();

     //      $sql = "SELECT c.Identificacion, c.Nombre AS NombreCliente, c.Email, c.Telefono, f.id, f.fecha, f.nfactura, f.tipo_pago, f.estado, td.nombre AS TipoDocumento, f.m_subtotal, f.m_iva, f.m_total 
     //      FROM factura f 
     //      INNER JOIN cliente c ON c.Id = f.idCliente
     //      INNER JOIN tipo_documento td ON td.id = f.tipo_factura
     //      WHERE f.id = $idFactura OR f.nfactura = '$idFactura'";

     //      $request = $crud->get_OneRegister($sql);

     //      switch ($request['tipo_pago']) {
     //           case 'E':
     //                $tipo_pago = 'EFECTIVO';
     //                break;

     //           case 'T':
     //                $tipo_pago = 'TARJETA';
     //                break;

     //           case 'S':
     //                $tipo_pago = 'SINPE';
     //                break;

     //           case 'C':
     //                $tipo_pago = 'CREDITO';
     //                break;
     //      }

     //      if ($request['estado']) {
     //           $condicion = 'CANCELADO';
     //      } else {
     //           $condicion = 'PENDIENTE';
     //      }

     //      $sql = "SELECT p.name, fd.cantidad, fd.preUnitario, fd.total
     //      FROM factura_detalle fd
     //      INNER JOIN producto p ON p.id = fd.idProducto
     //      INNER JOIN factura f ON f.id = fd.idFactura
     //      WHERE f.id = " . $request['id'];

     //      $dFactura = $crud->get_AllRegister($sql);

     //      require_once 'vendor/fpdf/fpdf.php';
     //      $pdf = new FPDF('P', 'mm', array(80, 200));
     //      $pdf->AddPage();
     //      $pdf->SetMargins(1, 0, 0);
     //      $pdf->SetTitle("SuperMarket - POS");
     //      $pdf->SetFont('Arial', 'B', 9);
     //      $pdf->Cell(60, 5, 'SUPERMARKET - POS', 0, 1, 'C');

     //      $pdf->SetFont('Arial', '', 7);
     //      $pdf->Cell(30, 5, "IDENTIFICACION:", 0, 0, 'R');
     //      $pdf->Cell(15, 5, '603820149', 0, 0, 'L');
     //      $pdf->Cell(6, 5, 'TEL:', 0, 0, 'L');
     //      $pdf->Cell(15, 5, '+506 83182537', 0, 1, 'L');

     //      $pdf->SetFont('Arial', '', 7);
     //      $pdf->Cell(30, 5, "EMAIL:", 0, 0, 'R');
     //      $pdf->SetFont('Arial', '', 7);
     //      $pdf->Cell(20, 5, 'JRWC1989@GMAIL.COM', 0, 1, 'L');

     //      $pdf->Cell(24, 5, mb_convert_encoding($request['TipoDocumento'] . ' v4.3', 'UTF-8'), 0, 1, 'L');
     //      $pdf->SetFont('Arial', '', 7);
     //      $pdf->Cell(8, 5, "Clave", 0, 0, 'L');
     //      $pdf->Cell(24, 5, '506-DMA-603820149' . $request['nfactura'] . '-SCE-CS', 0, 1, 'L');
     //      $pdf->Cell(15, 5, "Consecutivo", 0, 0, 'L');
     //      $pdf->Cell(24, 5, $request['nfactura'], 0, 1, 'L');
     //      $pdf->Cell(8, 5, "Fecha", 0, 0, 'L');
     //      $pdf->Cell(2, 5, $request['fecha'], 0, 1, 'L');
     //      // $pdf->Ln();
     //      $pdf->SetFont('Arial', 'B', 7);
     //      $pdf->Cell(1, 5, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 0, 1, 'L');
     //      $pdf->Cell(40, 5, "CLIENTE", 0, 0, 'L');
     //      $pdf->Cell(16, 5, "TELEFONO", 0, 0, 'L');
     //      $pdf->Cell(25, 5, "CORREO", 0, 1, 'L');
     //      $pdf->SetFont('Arial', '', 7);
     //      $pdf->Cell(40, 5, mb_convert_encoding($request['NombreCliente'], "UTF-8"), 0, 0, 'L');
     //      $pdf->Cell(13, 5, mb_convert_encoding($request['Telefono'], "UTF-8"), 0, 0, 'L');
     //      $pdf->Cell(23, 5, mb_convert_encoding($request['Email'], "UTF-8"), 0, 0, 'L');
     //      $pdf->Ln();

     //      $pdf->SetFont('Arial', 'B', 7);
     //      $pdf->Cell(1, 5, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 0, 1, 'L');
     //      $pdf->Cell(4, 5, ' ', 0, 0, 'L');
     //      $pdf->Cell(46, 5, 'CANT', 0, 0, 'L');
     //      $pdf->Cell(15, 5, 'P.UNIT', 0, 0, 'L');
     //      $pdf->Cell(15, 5, 'TOTAL', 0, 1, 'L');
     //      $pdf->SetFont('Arial', '', 7);
     //      for ($i = 0; $i < count($dFactura); $i++) {
     //           $pdf->Cell(8, 5, number_format($dFactura[$i]['cantidad'], 1, '.', ','), 0, 0, 'L');
     //           $pdf->Cell(42, 5, mb_convert_encoding($dFactura[$i]['name'], 'UTF-8', 'ISO-8859-1'), 0, 0, 'L');
     //           $pdf->Cell(11, 5, number_format($dFactura[$i]['preUnitario'], 2, '.', ','), 0, 0, 'R');
     //           $pdf->Cell(16, 5, number_format($dFactura[$i]['total'], 2, '.', ','), 0, 1, 'R');
     //      }

     //      $pdf->Ln();
     //      $pdf->SetFont('Arial', '', 8);
     //      $pdf->Cell(55, 5, 'Subtotal:', 0, 0, 'R');
     //      $pdf->Cell(22, 5, number_format($request['m_subtotal'], 2, '.', ','), 0, 1, 'R');

     //      $pdf->Cell(55, 5, 'IVA:', 0, 0, 'R');
     //      $pdf->Cell(22, 5, number_format($request['m_iva'], 2, '.', ','), 0, 1, 'R');

     //      $pdf->SetFont('Arial', 'B', 10);
     //      $pdf->Cell(55, 5, 'Total CRC:', 0, 0, 'R');
     //      $pdf->Cell(22, 5, number_format($request['m_total'], 2, '.', ','), 0, 1, 'R');
     //      $pdf->Ln();

     //      $pdf->SetFont('Arial', '', 7);
     //      $pdf->Cell(1, 5, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 0, 1, 'L');
     //      $pdf->Cell(22, 5, 'FORMA PAGO:', 0, 0, 'R');
     //      $pdf->Cell(20, 5, mb_convert_encoding($tipo_pago, "UTF-8"), 0, 0, 'L');
     //      $pdf->Cell(16, 5, 'CONDICION:', 0, 0, 'L');
     //      $pdf->Cell(5, 5, mb_convert_encoding($condicion, "UTF-8"), 0, 1, 'L');
     //      $pdf->Cell(1, 5, "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 0, 1, 'L');
     //      $pdf->Ln();

     //      $pdf->SetFont('Arial', '', 8);
     //      $pdf->Cell(80, 5, mb_convert_encoding('*** GRACIAS POR SU VISITA ***', "UTF-8"), 0, 1, 'C');
     //      $pdf->Cell(80, 5, mb_convert_encoding('*** RESOLUCION DGT-R-033-2019 ***', "UTF-8"), 0, 1, 'C');

     //      $pdf->Output('assets/facturas/', 'factura-' . $request["nfactura"] . '.pdf', 'I');
     // }
}
