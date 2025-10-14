let profPic = document.getElementById('profilePicture');



/**
 * Llamada desde la input de imagen.
 * Mide el tamaño del archivo y si no excede el límite del localStorage lo guarda en el mismo como una string base64.
 */

let inputFile = document.getElementById("inputFileToLoad");
inputFile.onchange = () => {
    encodeImage();
}


function encodeImage() {
    
    let filesSelected = inputFile.files;

    const fileToLoad = filesSelected[0];
    if (!fileToLoad) return;

    const fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result; // <--- data: base64

        let y = (srcData[srcData.length-2] === '=') ? 2 : 1 ;
        let sizeB = (srcData.length * (3/4)) - y;

        if (sizeB < 4000000) {
            localStorage.setItem('imgB64', srcData);
            profPic.src = srcData;
        }else{
            alert("Tu imagen debe ser menor a 4MB");
        }
    }
      fileReader.readAsDataURL(fileToLoad);
}

decodeImage();
/**
 * Toma la string base64 del localStorage y la utiliza como src para el elemento de imagen de perfil.
 */
function decodeImage() {
    let srcData = localStorage.getItem('imgB64');
    if (srcData !== null && srcData !== undefined) {
        profPic.src = srcData;
    }
}