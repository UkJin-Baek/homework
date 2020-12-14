export function escapeHtml (str) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  if (!str) return str
  
  if (Object.prototype.toString.call(str) === '[object Date]') {
    return str
  }

  if (typeof str === 'string') {
    return str.replace(/[&<>"']/g, m => map[m])
  } else if (Object.prototype.toString.call(str) === '[object Array]') {
    let obj = [ ...str ]
    for (let key in obj) {
      obj[key] = escapeHtml(obj[key])
    }
    return obj
  } else if (typeof str === 'object') {
    let obj = { ...str }
    for (let key in obj) {
      if (!!obj[key]) {
        obj[key] = escapeHtml(obj[key])
      }
    }
    return obj
  }
  return str
}

export function unescapeHtml (str) {
  if (!str) return str
  if (Object.prototype.toString.call(str) === '[object Date]') {
    return str
  }
  if (typeof str === 'string') {
    return str.replaceAll('&amp;', '&')
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#039;', "'")
  } else if (Object.prototype.toString.call(str) === '[object Array]') {
    let obj = [ ...str ]
    for (let key in obj) {
      obj[key] = unescapeHtml(obj[key])
    }
    return obj
  } else if (typeof str === 'object') {
    let obj = { ...str }
    for (let key in obj) {
      if (!!obj[key]) {
        obj[key] = unescapeHtml(obj[key])
      }
    }
    return obj
  }
  return str
}
