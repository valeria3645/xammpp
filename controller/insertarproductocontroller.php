<?php
include "../models/productoDAO.php";
if(isset($_POST['nombre'])){
    $pro=new ProductoDAO();
    $pro->insertarDatosProducto($_POST['nombre'],$_POST['descripcion']);
    header("location:../view/index.html");
}else{
    echo "variables indefinidas";
}