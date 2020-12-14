import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import FormSet from 'src/components/utils/FormSet'
import Exception from 'src/components/utils/Exception'
import MultipleUploader from 'src/components/utils/MultipleUploader'
import { Field, InputControl, SelectControl, TextareaControl, CheckControl, TagControl } from 'src/components/utils/Field'

export { 
  Field, InputControl, SelectControl, TextareaControl, CheckControl, MultipleUploader,
  Exception, FormSet
}

export const Item = styled.form`
  position: relative; box-sizing: border-box; z-index: 1;
  max-width: 1000px; margin: 0 auto; padding: 1rem 0;
`

export const Header = styled.header`
  position: relative; box-sizing: border-box; z-index: 2; padding: 0.5rem 0;
  display: flex; justify-content: space-between; align-items: center;
`

Header.Title = styled.div`
  position: relative; box-sizing: border-box;
  flex: 1 1 auto;
  padding: 1rem; font-size: 1.5em; font-weight: 700; color: ${palette('darkblue', 3)};
`

Header.Buttons = styled.div`
  position: relative; box-sizing: border-box;
  display: flex; align-items: center; min-width: max-content;
  padding: 0 1rem;
`

Header.Button = styled.a`
  position: relative; box-sizing: border-box;
  min-width: max-content; text-decoration: none;
  padding: 1rem 0.65rem; color: ${palette('muted', 3)};
  &:hover { color: ${palette('muted', 1)}; font-weight: 700; }
`
export const StyledButton = styled.a`
  position: relative; box-sizing: border-box; padding: 0.5rem; transition: all 0.3s;
  text-align: center; text-decoration: none; color: ${palette('muted', 20)};
  background: ${palette('info', 7)};
  width: 100%; min-width: max-content;
  padding: 1rem;
  margin-top: 1rem;
  font-weight: 700;
  float: right;
  border-radius: 5px;
  &:hover { background: ${palette('info', 4)}; }
  text-decoration: none;
`