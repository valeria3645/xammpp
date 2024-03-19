<?php
/*require_once '../config/config.php'*/;
$conn=new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
if($conn->connect_error){
    echo "error de conexion";
}else{
    echo "conexion exitosa"; 
   
}; 
