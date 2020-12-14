import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromUser } from 'src/store/selectors'
import { Switch, Route } from 'react-router-dom'

import Index from '../../Home'
import Page from '../../layouts/Page'
import Construction from 'src/components/Construction'
import Board from 'src/components/Board'
import Partner from 'src/components/Partner'
import { fromTemplates } from 'src/services/render'
import ConstructionDetail from 'src/components/ConstructionDetail'
import BoardDetail from 'src/components/BoardDetail'

class IndexPageContainer extends Component {
	render () {
		const { history, location, user } = this.props;
		const commonProps = { history, location }

		return (
			<Page {...commonProps}>
				<Switch>
					<Route path={'/partners'} render={props => <Partner {...props} />} />
					<Route 
						path={`/construction/:id?/:mode?`} 
						render={props => fromTemplates({
								List: (props) => <Construction {...props} />,
								Form: (props) => <ConstructionDetail {...props} />
						}).glvf(props)}
					/>
					<Route 
						path={`/board/:id?/:mode?`} 
						render={props => fromTemplates({
								List: (props) => <Board {...props} />,
								Form: (props) => <BoardDetail {...props} />
						}).glvf(props)}
					/>
				</Switch>
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

export default IndexPageContainer
  