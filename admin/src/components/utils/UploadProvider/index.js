import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import api from 'src/services/api'
import { UploadProvider } from './utils'
import * as actions from 'src/store/actions'
import { fromUser, fromUpload } from 'src/store/selectors'

class UploadProviderContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.form = React.createRef()
    this.ctrl = React.createRef()

    this.doUpload = this.doUpload.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate() {
    const curProps = this.props
    if (curProps.ready) { this.ctrl.current.click() }
  }

  doUpload(files) {
    const { progressUpload, endUpload, settings } = this.props
    const formData = new FormData()
    Array.from({ length: files.length }).forEach((blank, key) => formData.append('files', files[key]))
    return api.upload('/files', formData, {
        onUploadProgress: (event) => {
          const { loaded, total } = event
          const rate = loaded && total ? Math.round(loaded / total * 100) / 100 : 0
          if (settings.onProgress) { settings.onProgress({ rate, loaded, total }) }
          progressUpload(rate)
        }
      })
      .then((data) => {
        if (settings.onEnd) { settings.onEnd(data) }
        endUpload(() => this.form.current.reset())
      })
      .catch(e => {
        if (settings.onEnd) { settings.onEnd() }
        endUpload(() => this.form.current.reset())
      })
  }

  onChange(e) {
    const { startUpload } = this.props
    startUpload(() => this.doUpload(this.ctrl.current.files))
  }

  render() {
    const { progress, rate, settings } = this.props
    return (
      <UploadProvider>
        <UploadProvider.App>{this.props.children}</UploadProvider.App>
        <form ref={this.form}><input ref={this.ctrl} type="file" multiple={settings.multiple} onChange={this.onChange} accept={settings.accept || null} /></form>
        <UploadProvider.Progress show={!settings.hidden && progress}>
          <UploadProvider.Progress.Overlay />
          <UploadProvider.Progress.Bar rate={rate} />
        </UploadProvider.Progress>
      </UploadProvider>
    )
  }
}

UploadProviderContainer.propTypes = {
  user: PropTypes.object,
  ready: PropTypes.bool,
  progress: PropTypes.bool,
  rate: PropTypes.number,
  settings: PropTypes.object,
}

UploadProviderContainer.defaultProps = {
  user: {},
  ready: false,
  progress: false,
  rate: 0,
  settings: {},
}

const mapStateToProps = (state) => ({
  user: fromUser.getInfo(state),
  ready: fromUpload.isReady(state),
  progress: fromUpload.isProgress(state),
  rate: fromUpload.getRate(state),
  settings: fromUpload.getSettings(state),
})

const mapDispatchToProps = (dispatch) => ({
  startUpload: (callback) => dispatch(actions.startUpload(callback)),
  progressUpload: (rate) => dispatch(actions.progressUpload(rate)),
  endUpload: (callback) => dispatch(actions.endUpload(callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadProviderContainer)
