import axios from "axios";

const getMatchedRequest = () => {
  return {
    type: "GET_MATCHED_DATA_REQUEST"
  };
};
const getMatchedSuccess = (matchdata) => {
  return {
    type: "GET_MATCHED_DATA_SUCCESS",
    data: matchdata
  };
};
const getMatchedFail = (matcherr) => {
  return {
    type: "GET_MATCHED_DATA_FAIL",
    error: matcherr
  }
};
//====================================================
const getListRequest = () => {
  return {
    type: "GET_LIST_REQUEST"
  };
};
const getListSuccess = (listdata) => {
  return {
    type: "GET_LIST_SUCCESS",
    data: listdata
  };
};
const getListFail = (listerr) => {
  return {
    type: "GET_LIST_FAIL",
    err: listerr
  };
};

const getDetailRequest = () => {
  return {
    type: "GET_DETAIL_REQUEST"
  };
};
const getDetailSuccess = (detaildata) => {
  return {
    type: "GET_DETAIL_SUCCESS",
    data: detaildata
  };
};
const getDetailFail = (detailerr) => {
  return {
    type: "GET_DETAIL_FAIL",
    err: detailerr
  };
};

export const getList = () => {
  return (dispatch) => {
    dispatch(getListRequest());
    axios.get("http://localhost:5000/api/list")
      .then(res => {
        dispatch(getListSuccess(res.data));
      })
      .catch(err => {
        dispatch(getListFail(err));
      });
  };
};

export const getDetail = (id) => {
  return (dispatch) => {
    dispatch(getDetailRequest());
    axios.get(`https://api.github.com/users/${id}`)
      .then(res => {
        dispatch(getDetailSuccess(res.data));
      })
      .catch(err => {
        dispatch(getDetailFail(err));
      });
  };
};
//====================================================
export const getMatchedData = (matchedText) => {
  return (dispatch) => {
    dispatch(getMatchedRequest());
    axios.post(`http://localhost:5000/api/search`, {
      "seachText": matchedText
    })
      .then(res => {
        dispatch(getMatchedSuccess(res.data.matchedText));
      })
      .catch(err => {
        dispatch(getMatchedFail(err));
      });
  }
};