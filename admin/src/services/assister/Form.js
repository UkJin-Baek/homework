import _ from 'lodash'
import moment from 'src/services/moment'

class Form {
  constructor(props = {}) {
    this.component = props.component || {}
    this.fieldOptions = props.fieldOptions || {}
    this.validationOptions = props.validationOptions || {}

    this.focus = this.focus.bind(this)
    this.mergeQuery = this.mergeQuery.bind(this)
    this.validate = this.validate.bind(this)
    this.takeField = this.takeField.bind(this)
    this.takeVaild = this.takeVaild.bind(this)
  }

  focus(component) {
    this.component = component
    return this
  }

  mergeQuery(query = {}) {
    const merged = {}
    merged.props = { ...this.component.props, ...(query.props || {})  }
    merged.state = { ...this.component.state, ...(query.state || {})  }
    merged.fieldOptions = { ...this.component.fieldOptions, ...(query.fieldOptions || {})  }
    merged.validationOptions = { ...this.component.validationOptions, ...(query.validationOptions || {})  }
    return merged
  }

  validate(item = {}, query = {}, user = {}, options = {}) {
    const { props, state, fieldOptions, validationOptions } = this.mergeQuery(query)
    
    const reasons = Object.values(validationOptions)
      .filter(option => !option.is || option.is(props, state, options))
      .filter(option => option.check && !option.check(item))
    
    return reasons
  }

  takeField(key, query = {}, options = {}) {
    const { props, state, fieldOptions, validationOptions } = this.mergeQuery(query)
    const filedOption = fieldOptions[key]
    return filedOption
  }

  takeVaild(key, query = {}, options = {}) {
    const { props, state, fieldOptions, validationOptions } = this.mergeQuery(query)
    const validationOption = validationOptions[key]
    return {
      name: validationOption.name,
      message: validationOption.message,
      is: validationOption.is ? () => validationOption.is(props, state, options) : null,
      check: validationOption.check ? (item) => validationOption.check(item) : null,
    }
  }
}

export default Form
