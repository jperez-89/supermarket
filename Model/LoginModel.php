<?php

class LoginModel extends Crud
{
     public function __construct()
     {
          parent::__construct();
     }

     public static function loginUser(string $Username, string $Password)
     {
          $crud = new Crud();

          $sql = "SELECT u.username, u.name, u.surnames, u.password, r.nombreRol FROM user u INNER JOIN rol r ON r.Id = u.idRol WHERE u.username = '$Username' AND u.password = '$Password' AND u.status != 0";
          $request = $crud->get_OneRegister($sql);

          return $request;
     }

}