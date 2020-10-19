import {
	UPLOAD_READY,
	UPLOAD_START,
	UPLOAD_PROGRESS,
	UPLOAD_END
} from '../../action/Upload';

const initialState = {
	rate: 0,
	ready: false,
	progress: false,
	settings: {}
}

export const getState = (state = initialState) => {
  return state
}

export const isReady = (state = initialState) => {
  return state.ready
}

export const getSettings = (state = initialState) => {
  return state.settings
}

export const isProgress = (state = initialState) => {
  return state.progress
}

export const getRate = (state = initialState) => {
  return state.rate
}

export default (state = initialState, {
	type,
	payload = {}
}) => {
	// eslint-disable-next-line default-case
	switch (type) {
		case UPLOAD_READY:
			return {
				...initialState,
				ready: true,
					settings: payload.settings || {}
			}
		case UPLOAD_START:
			return {
				...state,
				rate: 0,
				ready: false,
				progress: true
			}
		case UPLOAD_PROGRESS:
			return {
				...state,
				rate: payload.rate
			}
		case UPLOAD_END:
			return {
				...initialState
			}
		default:
			return state;
	}
}