import { routeActions } from 'react-router-redux';

export const LOAD_YELP_DATA = 'LOAD_YELP_DATA';
export const SEND_POLL_REQUEST = 'SEND_POLL_REQUEST';
export const SEND_POLL_SUCCESS = 'SEND_POLL_SUCCESS';
export const SEND_POLL_ERROR = 'SEND_POLL_ERROR';
export const UPDATE_POLL = 'UPDATE_POLL';
export const SYNC_POLL = 'SYNC_POLL';
export const END_POLL = 'END_POLL';
export const CLEAR_POLL = 'CLEAR_POLL';
export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';

export const fetchYelpData = () => {
  return dispatch => {

    return fetch('http://localhost:5679/poll', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch(loadYelpData(response));
    })
  }
}

const loadYelpData = (info) => {
  return {
    type: LOAD_YELP_DATA,
    info
  }
}

export const sendPollChoices = (choices) => {
  return dispatch => {
    dispatch(sendPollRequest(choices));

    return fetch('http://localhost:5679/preference', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: choices.username,
        selected: choices.selected,
        unselected: choices.unselected
      })
    })
  }
}

const sendPollRequest = (info) => {
  return {
    type: SEND_POLL_REQUEST,
    info
  }
}

const sendPollSuccess = (info) => {
  return {
    type: SEND_POLL_SUCCESS,
    info
  }
}

const sendPollError = (err) => {
  return {
    type: SEND_POLL_ERROR,
    err
  }
}

export const updatePoll = (info, username) => {
  let results = shortenPoll(info, username);
  return {
    type: UPDATE_POLL,
    results
  }
}

const shortenPoll = (info) => {
  let results = info.slice(2);

  return results;
}

export const syncPoll = (info, username) => {
  return {
    type: SYNC_POLL,
    info,
    username
  }
}

export const endPoll = (userInfo) => {
  return {
    type: END_POLL,
    userInfo
  }
}

export const clearPoll = () => {
  return {
    type: CLEAR_POLL
  }
}

export const resetPoll = (credentials) => {
  return dispatch => {
    return fetch('http://localhost:5679/preference', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.username,
      })
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch(resetSuccess());
    })
    .catch(err => console.error('Error in Register User:', err));
  }
}

export const resetRequest = () => {
  return {
    type: RESET_REQUEST
  }
}

const resetSuccess = () => {
  return {
    type: RESET_SUCCESS
  }
}
