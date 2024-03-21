<?php
include "../models/productoDAO.php";
$pro=new ProductoDAO();
if(is_array($pro->traerDatosProducto())){
    echo json_encode($pro->traerDatosProducto());
    $pro->cerrarconexion();
}else{
    echo $pro->traerDatosProducto();
};