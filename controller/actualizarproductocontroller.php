<?php
// Incluir el archivo de configuración de la base de datos
include "../models/ProductoDAO.php"; 


// Verifica si se recibieron datos válidos para actualizar el producto
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id']) && isset($_POST['nombre']) && isset($_POST['descripcion'])) {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];

    // Crea una instancia de ProductoDAO
    $productoDAO = new ProductoDAO();

    // Actualiza el producto en la base de datos
    $resultado = $productoDAO->actualizarNombreYDescripcionProducto($id, $nombre, $descripcion);

    if ($resultado === true) {
        // Éxito al actualizar el producto
        echo "¡La actualización se realizó correctamente!";
    } else {
        // Error al actualizar el producto
        echo "Error al actualizar el producto: " . $resultado;
    }
} else {
    // No se han recibido datos válidos para actualizar el producto
    echo "Error: No se han recibido datos válidos para actualizar el producto.";
}

?>



    






