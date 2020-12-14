import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromUser } from 'src/store/selectors'
import { Switch, Route } from 'react-router-dom'

import Index from '../../Home'
import Page from '../../layouts/Page'
import Construction from 'src/components/Construction'
import ConstructionForm from 'src/components/ConstructionForm'
import Board from 'src/components/Board'
import BoardForm from 'src/components/BoardForm'
import Partner from 'src/components/Partner'
import Exception from 'src/components/utils/Exception'
import { fromTemplates } from 'src/services/render'

class IndexPageContainer extends Component {
	render () {
		const { history, location, user } = this.props;
		const commonProps = { history, location }

		return (
			<Page {...commonProps}>
				{user.id ? (
					<Switch>
						<Route path={'/partners'} render={props => <Partner {...props} />} />
						<Route 
							path={`/construction/:id?/:mode?`} 
							render={props => fromTemplates({
									List: (props) => <Construction {...props} />,
									Form: (props) => <ConstructionForm {...props} />
							}).glvf(props)}
						/>
						<Route 
							path={`/board/:id?/:mode?`} 
							render={props => fromTemplates({
									List: (props) => <Board {...props} />,
									Form: (props) => <BoardForm {...props} />
							}).glvf(props)}
						/>
						<Route path={'/home'} render={props => <Index {...props} />} />
					</Switch>
				) : <Exception message={<>로그인이 반드시<br/>필요한 서비스입니다</>} {...commonProps} />}
			</Page>
		)
	}
}

IndexPageContainer.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  }
  
IndexPageContainer.defaultProps = {
    history: {},
    location: {},
  }

const mapStateToProps = (state) => ({
    user: fromUser.getInfo(state),
  })
  
  export default connect(mapStateToProps, null)(IndexPageContainer)
  