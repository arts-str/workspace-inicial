/**
 * Llamada desde la input de imagen.
 * Mide el tamaño del archivo y si no excede el límite del localStorage lo guarda en el mismo como una string base64.
 */

inputProfileImage.onchange = () => {
    encodeImage();
}

let prevImg;
let editedImage = false;
function encodeImage() {
    prevImg = profPic.src;
    let filesSelected = inputProfileImage.files;
    
    const fileToLoad = filesSelected[0];
    if (!fileToLoad) return;

    const fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result; // <--- data: base64

        let y = (srcData[srcData.length-2] === '=') ? 2 : 1 ;
        let sizeB = (srcData.length * (3/4)) - y;
        
        if (sizeB < 4000000) {
            editedImage = true;
            profPic.src = srcData;
        }else{
            alert("Tu imagen debe ser menor a 4MB");
        }
    }
      fileReader.readAsDataURL(fileToLoad);
}


function deleteImg() {
    if (editedImage) {
        profPic.src = prevImg;
    }
}