<?php

class PermisosModel extends Crud
{
    public function __construct()
    {
        parent::__construct();
    }

    public static function selectPermisos()
    {
        $crud = new Crud();

        $sql = "SELECT id, nombre, estado FROM permiso";
        $request = $crud->get_AllRegister($sql);

        return $request;
    }

    public static function selecPermiso(int $idPermiso)
    {
        $crud = new Crud();

        $sql = "SELECT id, nombre, estado FROM permiso WHERE id = $idPermiso";
        $request = $crud->get_OneRegister($sql);

        return $request;
    }

    public static function insertPermiso(string $nombre)
    {
        $crud = new Crud();

        $request = self::searchPermisoNombre($nombre);

        if (empty($request)) {
            $query_insert = "INSERT INTO permiso (nombre, estado) VALUES(?,?)";
            $arrData = array($nombre, 1);

            $return = $crud->Insert_Register($query_insert, $arrData);
        } else {
            $return = false;
        }
        return $return;
    }

    public static function searchPermisoNombre($nombre)
    {
        $crud = new Crud();

        $sql = "SELECT id, nombre, estado FROM permiso WHERE nombre COLLATE utf8mb4_spanish_ci = '$nombre'";
        $request = $crud->get_OneRegister($sql);

        return $request;
    }

    // public function updateRol(int $idRol, string $nombreRol, string $descripcion)
    // {
    //     $this->idRol = $idRol;
    //     $this->nombreRol = $nombreRol;
    //     $this->descripcion = $descripcion;

    //     $sql = "SELECT * FROM rol WHERE nombreRol = '$this->nombreRol' AND Id != $this->idRol";
    //     $request = $this->get_AllRegister($sql);

    //     if (empty($request)) {
    //         $sql = "UPDATE rol SET nombreRol = ?, descripcion = ? WHERE Id = $this->idRol";
    //         $arrData = array($this->nombreRol, $this->descripcion);
    //         $request = $this->update_Register($sql, $arrData);
    //     } else {
    //         $request = "exist";
    //     }
    //     return $request;
    // }

    // public function deleteRol(int $id)
    // {
    //     $this->id = $id;
    //     $sql = "SELECT * FROM rol WHERE Id = $this->id";
    //     $request = $this->get_OneRegister($sql);

    //     if (!empty($request)) {
    //         $sql = "UPDATE rol SET status = ? WHERE id = $this->id";
    //         $arrData = array(0);
    //         $request = $this->update_Register($sql, $arrData);
    //         if ($request) {
    //             $request = "ok";
    //         } else {
    //             $request = "error";
    //         }
    //     } else {
    //         $request = "exist";
    //     }
    //     return $request;
    // }

    // public function enableRol(int $id)
    // {
    //     $this->id = $id;
    //     $sql = "SELECT * FROM rol WHERE Id = $this->id";
    //     $request = $this->get_OneRegister($sql);

    //     if (!empty($request)) {
    //         $sql = "UPDATE rol SET status = ? WHERE id = $this->id";
    //         $arrData = array(1);
    //         $request = $this->update_Register($sql, $arrData);
    //         if ($request) {
    //             $request = "ok";
    //         } else {
    //             $request = "error";
    //         }
    //     } else {
    //         $request = "exist";
    //     }
    //     return $request;
    // }
}
