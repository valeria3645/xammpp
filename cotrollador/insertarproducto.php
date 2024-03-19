<?php
include "../model/proDAO.php";
if(isset($_POST['nombre'])){
    $pro=new ProductoDAO();
    $pro->insertar($_POST['nombre'],$_POST['descripcion']);
    header("location:../view/index.html");
}else{
    echo "variables indefinidas";
}
