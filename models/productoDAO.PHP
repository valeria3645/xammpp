<?php
include "../models/conexion/conexion.php";
include "../config/config.php";

class ProductoDAO{
  private $conn;
  public function __construct(){
    $this->conn=new Conexion(DB_HOST,port,DB_NAME,DB_USER,DB_PASS);
  }

  public  function traerDatosProducto(){
    $conexion=$this->conn->abrir_conexion();
    if(is_object($conexion)){
      $consulta=$conexion->prepare("SELECT * FROM producto");
          $consulta->execute();
          $resultado=$consulta->fetchALL(PDO::FETCH_ASSOC);
      return $resultado;
    }else{
      return $conexion;
    };
  }
  
  public  function insertarDatosProducto($nombre,$descripcion){
    $conexion=$this->conn->abrir_conexion();
   $conexion=$conexion->prepare("INSERT INTO producto(nombre,descripcion)VALUES(:nombre,:descripcion) ");
   $ar=array(":nombre"=>$nombre,
              ":descripcion" => $descripcion);
   $conexion->execute($ar);
    
  }


  public  function cerrarconexion(){
   $this->conn=null;
  }





}
  


?>
