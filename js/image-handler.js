



/**
 * Llamada desde la input de imagen.
 * Mide el tamaño del archivo y si no excede el límite del localStorage lo guarda en el mismo como una string base64.
 */

inputProfileImage.onchange = () => {
    encodeImage();
}


function encodeImage() {
    
    let filesSelected = inputProfileImage.files;

    const fileToLoad = filesSelected[0];
    if (!fileToLoad) return;

    const fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result; // <--- data: base64

        let y = (srcData[srcData.length-2] === '=') ? 2 : 1 ;
        let sizeB = (srcData.length * (3/4)) - y;

        if (sizeB < 4000000) {
            let userName = localStorage.getItem('usuario');
            let currentUser = getUser(userName);
            updateUser(currentUser.name, currentUser.apellido, currentUser.email, currentUser.telefono, currentUser.nombreUsuario, srcData);
            profPic.src = srcData;
        }else{
            alert("Tu imagen debe ser menor a 4MB");
        }
    }
      fileReader.readAsDataURL(fileToLoad);
}
