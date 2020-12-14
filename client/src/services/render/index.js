import React from 'react'
import qs from 'query-string'

export const fromTemplates = (Components = {}) => ({
  glvf: (props) => {
    const { List, Form } = Components
    const { search } = props.location, { params } = props.match
    if (!params.id && !params.mode) { return <List group={params.group || null} {...props} {...qs.parse(search || {})} /> }
    return <Form itemId={params.id} {...props} />
  },

  // path : /:group or endpoints/:id?/:mode?
  lvf: (props) => {
    const { List, View, Form } = Components
    const { search } = props.location, { params } = props.match
    if (!params.id && !params.mode) { return <List {...props} {...qs.parse(search || {})} /> }
    return !['new'].includes(params.id) && (params.id && !['edit'].includes(params.mode))
      ? <View itemId={params.id} {...props} />
      : <Form itemId={params.id} {...props} />
  }
})