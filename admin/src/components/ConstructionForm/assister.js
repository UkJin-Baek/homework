const fieldOptions = {}

const validationOptions = {}

validationOptions.name = { name: 'name', message: '기업명을 기재해주셔야합니다.', is: (props, state, options) => true, check: (item) => item.name }

const assister = { fieldOptions, validationOptions }

export default assister
