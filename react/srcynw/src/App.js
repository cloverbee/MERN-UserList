import React from "react";
import { connect } from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { getList, getDetail } from "./redux/actions";

import './App.css';
import Home from './Components/Home';
import Creat from './Components/Creat';
import Edit from './Components/Edit';
import axios from "axios";

import * as actions from "./redux/actions";


class App extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = { input: "" }; 
    }
    componentDidMount() {
      this.props.getUserList();
      /*
        axios.get("http://localhost:5000/api/list")
          .then(res => {
            console.log(res.data)
            this.setState({
              userList: res.data
            });
          })
          .catch(err => {
            console.log(err);
        });
      console.log('initial get list',this.props.userList);
      /*this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err)); */
    }

    render() {
      const { userList, userDetail, getUserDetail } = this.props;
      return (
        <div>
        <BrowserRouter>
            <Switch>
              <Route exact = {true} path="/" component={Home} />
              <Route exact = {true} path="/creat" component={Creat} />
              <Route exact = {true} path="/edit" component={Edit} />
            </Switch>
        </BrowserRouter>
        <Home userList = {userList}/>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.list,
    userDetail: state.detail,
    matchedData: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserList: () => {
      dispatch(getList());
    },
    getUserDetail: (id) => {
      dispatch(getDetail(id));
    },
    getResult: searchText => dispatch(actions.getMatchedData(searchText))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);