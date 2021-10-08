class DocSetup {
  constructor(){
    this.rangeA = {
      startRow: 2,
      numOfRow: 1,
      startCol: 1,
      numOfCol:4
    }
    this.sheetName = '설정'
    this.fields = ['templateFolderId', 'templateId', 'sigFolderId', 'outputFolderId']
    this.errorText = '설정 시트가 존재하지 않습니다'
    this.sheetValues = {}
  }

  setValues(makingNum){
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadSheet.getSheetByName(this.sheetName)
    if(sheet == null){
      throw new SettingException(this.errorText)
    }
    const range = sheet.getRange(this.rangeA.startRow, this.rangeA.numOfRow,this.rangeA.startCol,this.rangeA.numOfCol)
    const values = range.getValues()
    
    for(let i= 0; i < values[0].length; i++){
      this.sheetValues[this.fields[i]] = values[0][i]
    }
    this.startRow = makingNum
  }
}

class OrgSetup{
  constructor(){
     if (this.obj == null){
      this.obj = {}
      const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadSheet.getSheetByName('단체정보')
      if(sheet == null){
        throw new SettingException('단체정보 시트가 존재하지 않습니다')
      }
      const range = sheet.getRange(2,1,1,4)
      const values = range.getValues()

      this.obj.fileEnvironment = {
        orgName : values[0][0],
        representName :values[0][1],
        officeAddress : values[0][2],
        orgNumber : values[0][3],
      }
    }
    return this.obj 
  }
}

