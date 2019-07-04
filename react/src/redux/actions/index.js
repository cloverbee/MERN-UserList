import axios from "axios";

const saveUserRequest = (user) => {
  return {
    type: "SAVE_USER_REQUEST",
    data: user
  };
};
const saveUserSuccess = (res) => {
  return {
    type: "SAVE_USER_SUCCESS",
    res: res
  };
};
const saveUserFail = (err) => {
  return {
    type: "SAVE_USER_FAIL",
    err: err
  };
};

//===================================================
const deleteUserRequest = (user_id) => {
  return {
    type: "DEL_USER_REQUEST",
    user_id: user_id
  };
};
const deleteUserSuccess = (res) => {
  return {
    type: "DEL_USER_SUCCESS",
    //data: listdata
    res: res
  };
};
const deleteUserFail = (err) => {
  return {
    type: "DEL_USER_FAIL",
    err: err
  };
}; 
//=====================================================

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
//======================================================
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
//================================================
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

//=======================================================
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

export const delUser = (user_id) => {
  return (dispatch) => {
    console.log('action got userid',user_id)
    dispatch(deleteUserRequest());
    axios.delete(`http://localhost:5000/api/users/:${user_id}`, {params: {user_id}})
      .then(res => {
        console.log('del res', res);
        dispatch(deleteUserSuccess(res));
        dispatch(getList());
      })
      .catch(err => {
        console.log('del err', err);
        dispatch(deleteUserFail(err));
      });
  };
};

export const saveToUserList = (user, history) => {
  return (dispatch) => {
    console.log('save_action got New user',user);
    dispatch(saveUserRequest(user));///what will happen if set user to null
    axios
      .post('http://localhost:5000/api/users', user)
      .then(res => {
        console.log('new user created!');
        dispatch(saveUserSuccess(res));
        dispatch(getList());////////////////////////////////////////////
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        dispatch(saveUserFail(err));
      });
  };
};

//=======================================================
export const getDetail = (user_id) => {
  return (dispatch) => {
    dispatch(getDetailRequest());
    axios.get(`http://localhost:5000/api/users/:${user_id}`, {params: {user_id}})
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

