<?php
include "../models/conexion/conexion.php";
include "../config/config.php";

class ProductoDAO{
    private $conn;

    public function __construct(){
        $this->conn = new Conexion(DB_HOST, port, DB_NAME, DB_USER, DB_PASS);
    }

    public function traerDatosProducto(){
        $conexion = $this->conn->abrir_conexion();
        if(is_object($conexion)){
            $consulta = $conexion->prepare("SELECT * FROM producto");
            $consulta->execute();
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        } else {
            return $conexion;
        }
    }

    public function insertarDatosProducto($nombre, $descripcion){
        $conexion = $this->conn->abrir_conexion();
        $conexion = $conexion->prepare("INSERT INTO producto(nombre, descripcion) VALUES(:nombre, :descripcion)");
        $ar = array(":nombre" => $nombre, ":descripcion" => $descripcion);
        $conexion->execute($ar);
    }

    public function actualizarNombreYDescripcionProducto($Id, $nombre, $descripcion) {
      try {
          $conexion = $this->conn->abrir_conexion();
          $consulta = $conexion->prepare("UPDATE producto SET nombre = :nombre, descripcion = :descripcion WHERE id = :id");
          $consulta->bindParam(":nombre", $nombre);
          $consulta->bindParam(":descripcion", $descripcion);
          $consulta->bindParam(":id", $id);
          $consulta->execute();
          
          return true; // Retorna verdadero si la actualización se realiza correctamente
      } catch (PDOException $e) {
          return "Error al ejecutar la consulta: " . $e->getMessage(); // Retorna el mensaje de error si ocurre un problema
      }
  }
  
  
  
  


      public function cerrarconexion() {
              $this->conn = null;
          }
      
        }

?>
