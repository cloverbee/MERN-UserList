const initialState = {
  data: {},
  err: null,
  isLoading: false
};

const userDetail = (state = initialState, action) => {
  switch(action.type) {
    case "GET_DETAIL_REQUEST":
      return {
        isLoading: true,
        ...state
      };
    case "GET_DETAIL_SUCCESS":
      return {
        isLoading: false,
        data: action.data,
        err: null
      };
    case "GET_DETAIL_FAIL":
      return {
        isLoading: false,
        err: action.err,
        ...state
      };
    default:
      return state; 
  }
};

export default userDetail;