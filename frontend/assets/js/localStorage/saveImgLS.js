export default function saveImgLS(img, id) {
    const imgData = getBase64Image(img);
    const imgStorageKey = `imgData${id}`;
    localStorage.setItem(imgStorageKey, imgData);
    return imgStorageKey;
}

// Source - https://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page
// Posted by Fizzix, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-26, License - CC BY-SA 4.0

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
