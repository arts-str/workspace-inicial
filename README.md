# ESTE PROYECTO DEPENDE DEL USO DEL BACKEND
Es necesario ejecutar el backend del proyecto para que este funcione correctamente.

# Cómo ejecutar el backend:
1. Instalar MariaDB en el sistema.
2. Abrir HeidiSQL (Instalado automáticamente con MariaDB).
3. Ingresar el usuario y contraseña definidos a la hora de instalar MariaDB y apretar “Abrir”.
4. En Archivo  > Cargar archivo SQL, cargar el archivo ecommerce.sql, encontrado en la carpeta backend dentro de la carpeta raíz del proyecto.
5. Comprobar que la carga haya sido exitosa, las tablas deberían tener datos precargados en ellas.
6. Abrir la carpeta raíz del proyecto en VS Code.
7. Dentro de backend > db.js, modificar los campos de user y password dependiendo de tu configuración de MariaDB. Si por alguna razón la base de datos en HeidiSQL tiene otro nombre que no sea ecommerce, también se deberá modificar este campo en el archivo.
8. Chequear puertos, HeidiSQL, el archivo app.js encontrado en la carpeta backend y el frontend deben utilizar todos puertos distintos.
9. En la terminal, ejecutar `cd backend`, esto abre la carpeta de backend en la terminal.
10. Ejecutar `npm i`, esto instalará todas las dependencias necesarias en el sistema.
11. Ejecutar `npm run dev`, esto pondrá en marcha el proyecto de node.js y será capaz de dialogar con la base de datos.
12. Ejecutar el frontend, el carrito está implementado por completo para dialogar con el backend, por lo tanto, al agregar un artículo, modificar su cantidad, quitarlo o realizar la compra se deberían realizar las modificaciones pertinentes en la tabla cart de la base de datos. En caso de no ocurrir, alguno de los pasos anteriores fue realizado incorrectamente.