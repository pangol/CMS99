function doGet() {
    return HtmlService.createTemplateFromFile('ViewWebIndex')
        .evaluate();
}

function receiveSig(values) {
    return saveToSheet(values)
}

function saveToSheet(values) {
    let finalValue = []
    const sigFileName = saveImg(values[7], values[0], values[1])
    values[7] = sigFileName

    finalValue.push(values)

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('후원리스트')
    const lastRow = sheet.getLastRow()
    sheet.getRange(lastRow + 1, 1, 1, 8).setValues(finalValue)
    return true
}

function saveImg(data_uri, name, birth) {
    const sigImgFolder = "1N7KFmU7ZgSYbbPmCmSGFzys6XwVP9vrj"
    const encoded_image = data_uri.split(",")[1]
    const decoded_image = Utilities.base64Decode(encoded_image)
    const sigImg = Utilities.newBlob(decoded_image).setName(name + birth + "Sig.png")
    DriveApp.getFolderById(sigImgFolder).createFile(sigImg)
    return name + birth + "Sig.png"
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}