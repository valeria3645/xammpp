<?php
include "../model/proDAO.php";
// Decodificar el JSON recibido
$data = json_decode(file_get_contents('php://input'), true);

// Acceder a los datos
if (isset($data['id'])) {
    $pro=new ProductoDAO();
    $pro->eliminar($data['id']);
} else {
    echo "Datos no definidos";
}
