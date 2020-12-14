import _ from 'lodash'

class List {
  constructor(props = {}) {
    this.component = props.component || {}
    this.watchs = props.watchs || []
    this.sortOptions = props.sortOptions || {}
    this.filterOptions = props.filterOptions || {}

    this.focus = this.focus.bind(this)
    this.mergeQuery = this.mergeQuery.bind(this)
    this.combination = this.combination.bind(this)
    this.takeFilter = this.takeFilter.bind(this)
    this.takeSort = this.takeSort.bind(this)
  }

  focus(component) {
    this.component = component
    return this
  }

  mergeQuery(query = {}) {
    const merged = {}
    merged.props = { ...this.component.props, ...(query.props || {})  }
    merged.state = { ...this.component.state, ...(query.state || {})  }
    merged.filterOptions = { ...this.component.filterOptions, ...(query.filterOptions || {})  }
    merged.sortOptions = { ...this.component.sortOptions, ...(query.sortOptions || {})  }
    return merged
  }

  combination(_items, query = {}, options = { sorted: true }) {
    const { props, state, filterOptions, sortOptions } = this.mergeQuery(query)
    const { filters, sorts } = state
    const items = (_items || state.items).filter(item => {
      return !(Object.keys(filters)
        .filter(key => filterOptions[key])
        .map(key => {
          if (!filters[key] || filters[key] === 'all') { return true }

          const Filter = filterOptions[key]
          const conditions = Filter.conditions || []
          
          return conditions
            .filter(condition => condition.name === _.get(state, Filter.state))
            .filter(condition => !condition.is || condition.is(props, state, filterOptions, sortOptions))
            .map(condition => {
              if (condition.has && condition.has(item, props, state, filterOptions, sortOptions)) { return true }
              const current = _.get(item, Filter.item)
              return current && condition.name === current
            })
            .includes(true)
        }).includes(false))
    })
    if (!options.sorted) { return items }
  
    sorts.forEach(key => {
      const direction = key.charAt(0) === '-' ? 'desc' : 'asc'
      const name = (direction === 'desc') ? `${key}`.slice(1) : key
      if (!Object.keys(sortOptions).includes(name) || !sortOptions[name][direction]) { return }
      if (!sortOptions[name][direction].compare) { return }
      items.sort(sortOptions[name][direction].compare(props, state, filterOptions, sortOptions))
    })

    return items
  }

  takeFilter(key, query = {}, options = { all: true, count: true, items: {}, text: '전체' }) {
    const { props, state, filterOptions, sortOptions } = this.mergeQuery(query)
    const { filters, sorts } = state

    const Filter = filterOptions[key]
    if (!Filter) { return {} }

    const current = filters[key] || (options.all ? 'all' : null)
    const conditions = (options.all ?[{ name: 'all', text: options.text }, ...Filter.conditions] : Filter.conditions)
      .filter(condition => !condition.is || condition.is(props, state, filterOptions, sortOptions))
      .map(condition => ({ ...condition, active: current && current === condition.name }))
      .map(condition => {
        if (!options.count) { return condition }
        const condQuery = { state: { filters: { ...filters } } }
        _.set(condQuery.state, Filter.state, condition.name)
        const items = this.combination(condQuery.state.items, condQuery, options.items)
        return { ...condition, count: items.length, items }
      })

    return { ...Filter, conditions }
  }

  takeSort(key, query = {}, options = {}) {
    const { props, state, filterOptions, sortOptions } = this.mergeQuery(query)
    const { filters, sorts } = state

    if (sortOptions[key].is && !sortOptions[key].is(props, state, filterOptions, sortOptions)) { return null }

    const keys = [key, `-${key}`]
    const active = sorts.includes(keys[0]) ? `asc` : (sorts.includes(keys[1]) ? `desc` : false)

    return { ...sortOptions[key], active }
  }
}

export default List
