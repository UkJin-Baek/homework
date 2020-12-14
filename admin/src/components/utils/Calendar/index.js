import React from 'react'
import PropTypes from 'prop-types'
import ReactCalendar from 'react-calendar'
import { StyledCalendar } from './utils'

const Calendar = ({ value, ...props }) => {
  return <StyledCalendar><ReactCalendar locale="ko-KR" value={value && typeof value === 'string' ? new Date(value) : value} {...props} /></StyledCalendar>
}

Calendar.propTypes = {
  value: PropTypes.any,
}

Calendar.defaultProps = {
  value: null,
}

export default Calendar
