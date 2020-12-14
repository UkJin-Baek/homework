import { font, palette } from 'styled-theme'
import styled, { css } from 'styled-components'

const _c = `react-calendar`
const customCSS = css`
  position: relative; box-sizing: border-box; padding: 1rem;
  .${_c} { width: auto; max-width: 100%; background: white; border: 0; font-family: ${font('primary')}; line-height: 1.125em; }

  .${_c}--doubleView { width: 700px; }
  .${_c}--doubleView .${_c}__viewContainer { display: flex; margin: -0.5em; }
  .${_c}--doubleView .${_c}__viewContainer > * { width: 50%; margin: 0.5em; }
  .${_c},.${_c} *,.${_c} *:before,
  .${_c} *:after { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }

  .${_c} button { margin: 0; border: 0; outline: none; }
  .${_c} button:enabled:hover { cursor: pointer; }

  .${_c}__navigation { height: 44px; margin-bottom: 1em; }
  .${_c}__navigation button { min-width: 44px; background: transparent; font-size: 1em; }
  .${_c}__navigation button:enabled:hover,
  .${_c}__navigation button:enabled:focus { background-color: #e6e6e6; font-size: 1em; }
  .${_c}__navigation button[disabled] { background-color: #f0f0f0; font-size: 1em; }

  .${_c}__month-view__weekdays { text-align: center; text-transform: uppercase; font-weight: 500; font-size: 1em; }
  .${_c}__month-view__weekdays__weekday { padding: 0.5em; }
  .${_c}__month-view__weekdays__weekday abbr { text-decoration: none; color: ${palette('muted', 1)}; }
  .${_c}__month-view__weekNumbers { font-weight: 300; font-size: 1em; }
  .${_c}__month-view__weekNumbers .${_c}__tile { display: flex; align-items: center; justify-content: center; font-size: 1em; padding: calc(0.75em / 0.75) calc(0.5em / 0.75); }
  .${_c}__month-view__days__day--weekend { color: ${palette('muted', 1)}; font-size: 1em; }
  .${_c}__month-view__days__day--neighboringMonth { color: ${palette('muted', 3)}; font-size: 1em;  }

  .${_c}__year-view .${_c}__tile,.${_c}__decade-view .${_c}__tile,.${_c}__century-view .${_c}__tile { padding: 2em 0.5em; }

  .${_c}__tile { max-width: 100%; text-align: center; padding: 0.75em 0.5em; background: transparent; font-size: 1em; color: ${palette('muted', 1)}; border-radius: 10px; }

  /* 선택불가능한 일자 */
  .${_c}__tile:disabled { color: ${palette('muted', 3)}; }

  /* 보통일자 */
  .${_c}__tile:enabled:hover, .${_c}__tile:enabled:focus { background: transparent; box-shadow: 0 0 5px ${palette('muted', 5)}; }

  /* 오늘 */
  .${_c}__tile--now { background: ${palette('muted', 15)}; color: ${palette('muted', 1)}; }
  .${_c}__tile--now:enabled:hover,
  .${_c}__tile--now:enabled:focus { background: ${palette('muted', 5)}; }
  
  /* 이미 선택한 날짜 */
  .${_c}__tile--hasActive { background: ${palette('muted', 1)}; color: ${palette('muted', 7)}; }
  .${_c}__tile--hasActive:enabled:hover,
  .${_c}__tile--hasActive:enabled:focus { background: #a9d4ff; }
  
  /* 지금선택한 날짜 */
  .${_c}__tile--active { background: ${palette('muted', 1)}; color: ${palette('muted', 21)}; }
  .${_c}__tile--active:enabled:hover,
  .${_c}__tile--active:enabled:focus { background: ${palette('primary', 0)}; }

  /* 범위형으로 날짜를 선택했을 경우 */
  .${_c}--selectRange .${_c}__tile--hover { background: ${palette('muted', 6)};  }
`

export const StyledCalendar = styled.div`
 position: relative; box-sizing: border-box;
 max-width: 380px; margin: auto;
 @media screen and (max-width: 980px) { min-width: 320px; max-width: auto; margin: auto; } 
 ${customCSS}
`
