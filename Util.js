function convertDateBirthAndDate(docProperties){
  let birth_date = new Date(docProperties.birth)
  let current_date = new Date(docProperties.date)

  let result_birth = birth_date.getFullYear() + "년 " + (birth_date.getMonth() + 1) + "월 " + birth_date.getDate() + "일" 
  let result_current = current_date.getFullYear() + "년 " + (current_date.getMonth() + 1) + "월 " + current_date.getDate() + "일" 

  docProperties.birth = result_birth
  docProperties.date = result_current
}

function convertObj(rowValues) {
  const docKeys = ['name', 'birth', 'bank', 'account', 'email', 'phone', 'date', 'sig']
  let result = {}
  rowValues.map((value, index) => {
    let realIndex = docKeys[index]
    result[realIndex] = value
  })
  return result
}

function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}
