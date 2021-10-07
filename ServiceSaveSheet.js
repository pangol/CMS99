class SaveSheet {
  constructor() {
    this.spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
    this.sheetName = '설정'
    this.sheetItemA = ['templateFolderId', 'templateFileId', 'imgFolderId', 'outputFolderId']
    this.sheet = {}
    this.rangeNum = {
      head_start_row : 1,
      data_start_row : 2,
      num_of_row : 1,
      start_of_col : 1,
      num_of_col : 4
    }
  }
  saveSheet(settingValues) {
    this.sheet = this.spreadSheet.getSheetByName(this.sheetName)
    if (this.sheet == null) {
      this.sheet = this.spreadSheet.insertSheet()
      this.sheet.setName(this.sheetName)
      this.createHead()
    }
    this.insertSettingValue(settingValues)
  }
  insertSettingValue(settingValues) {
    const range = this.sheet.getRange(this.rangeNum.data_start_row, this.rangeNum.num_of_row, 
      this.rangeNum.start_of_col, this.rangeNum.num_of_col);
    let arraySettingValues = []
    const arrayValues = []
    arraySettingValues.push(settingValues[this.sheetItemA[0]])
    arraySettingValues.push(settingValues[this.sheetItemA[1]])
    arraySettingValues.push(settingValues[this.sheetItemA[2]])
    arraySettingValues.push(settingValues[this.sheetItemA[3]])
    arrayValues.push(arraySettingValues)
    range.setValues(arrayValues)
  }
  createHead() {
    const range = this.sheet.getRange(this.rangeNum.head_start_row, this.rangeNum.num_of_row, 
      this.rangeNum.start_of_col, this.rangeNum.num_of_col);
    const tempDataA = []
    tempDataA.push(this.sheetItemA)
    range.setValues(tempDataA)
  }
}

class OrgSaveSheet extends SaveSheet{
  constructor(){
    super()
    this.sheetName = '단체정보'
    this.sheetItemA = ['orgName', 'representName', 'officeAddress', 'orgNumber']
    this.sheet = {}
    this.rangeNum = {
      head_start_row : 1,
      data_start_row : 2,
      num_of_row : 1,
      start_of_col : 1,
      num_of_col : 4
    }
  }
}