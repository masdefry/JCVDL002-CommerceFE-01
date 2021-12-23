import {
    ADD_ADDRESS_FAIL,
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    ADDRESS_SET_DEFAULT_FAIL,
    ADDRESS_SET_DEFAULT_REQUEST,
    ADDRESS_SET_DEFAULT_SUCCESS,
    ADDRESS_LIST_REQUEST,
    ADDRESS_LIST_SUCCESS,
    ADDRESS_LIST_FAIL,
  } from "../constants/addressConstant";
  
  export const addAddressReducer = (state = {addresses: []}, action) => {
    switch (action.type) {
      case ADD_ADDRESS_REQUEST:
        return { loading: true };
      case ADD_ADDRESS_SUCCESS:
        console.log("address Reducer : " + JSON.stringify(action.payload ))
        return { loading: false, addresses: action.payload };
      case ADD_ADDRESS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const listAddressReducer = (state = { addresses: [] }, action) => {
    switch (action.type) {
      case ADDRESS_LIST_REQUEST:
        return { loading: true };
      case ADDRESS_LIST_SUCCESS:
        return { loading: false, addresses: action.payload };
      case ADDRESS_LIST_FAIL:
        return { loading: false, error: action.payload };
      case ADD_ADDRESS_REQUEST:
        return { loading: true };
      case ADD_ADDRESS_SUCCESS:
        return { loading: false, addresses: action.payload };
      case ADD_ADDRESS_FAIL:
        return { loading: false, error: action.payload };
      case ADDRESS_SET_DEFAULT_REQUEST:
        return { loading: true };
      case ADDRESS_SET_DEFAULT_SUCCESS:
        return { loading: false, addresses: action.payload };
      case ADDRESS_SET_DEFAULT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const setDefaultAddressReducer = (state = {}, action) => {
    switch (action.type) {
      case ADDRESS_SET_DEFAULT_REQUEST:
        return { loading: true };
      case ADDRESS_SET_DEFAULT_SUCCESS:
        return { loading: false, listAddress: action.payload };
      case ADDRESS_SET_DEFAULT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  