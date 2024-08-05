// ASSUMES CANVAS IS A SQUARE
export function createImageDataURL(resizedDimension, fileType) {
    const originalCanvas = document.getElementsByTagName('canvas')[0];

    const filledCanvas = document.createElement('canvas');
    const filledContext = filledCanvas.getContext('2d');
    filledCanvas.width = originalCanvas.width;
    filledCanvas.height = originalCanvas.height;

    filledContext.fillStyle = '#FFFFFF';
    filledContext.fillRect(0, 0, filledCanvas.width, filledCanvas.height);

    if (resizedDimension == originalCanvas.height) {
        filledContext.drawImage(originalCanvas, 0, 0);
        return filledCanvas.toDataURL(`image/${fileType}`);
    } else {
        const sigma = 1 / (2 * (resizedDimension / originalCanvas.height));
        filledContext.filter = `blur(${sigma}px)`;
        filledContext.drawImage(originalCanvas, 0, 0);

        const resizedCanvas = document.createElement('canvas');
        const resizedContext = resizedCanvas.getContext('2d');
        resizedCanvas.width = resizedDimension.toString();
        resizedCanvas.height = resizedDimension.toString();

        resizedContext.drawImage(
            filledCanvas,
            0,
            0,
            resizedDimension,
            resizedDimension
        );

        return resizedCanvas.toDataURL(`image/${fileType}`);
    }
}
