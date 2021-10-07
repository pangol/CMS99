function makeSigDoc(makingNum) {
  const result = myFunction(makingNum)

  if (result.error) {
    throw result.type
  }

  return {
    'success': 'success',
    'type': 'make'
  }
}

