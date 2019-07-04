import React from 'react';

import {Link, withRouter} from 'react-router-dom';

import Button from 'antd/lib/button';
import Table  from 'antd/lib/table';
import {connect} from 'react-redux';
import { getList, delUser, getMatchedData, getDetail} from "../../redux/actions";
import Highlighter from 'react-highlight-words';

import Divider from 'antd/lib/divider';
import Popconfirm from 'antd/lib/popconfirm';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
            ...this.getColumnSearchProps('sex'),
            
            //render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            ...this.getColumnSearchProps('age'),
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a, b) => {
                if (a.firstName > b.firstName){
                    return 1;
                }
                else if (a.firstName === b.firstName)
                {
                    return 0;
                }
                else{
                    return -1;
                }
            }, //.charCodeAt(0) 
            ...this.getColumnSearchProps('firstName'),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            ...this.getColumnSearchProps('lastName'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
            <span>

                <Link style = {{margin: 10}} to="/edit">
                    <a  onClick = {()=> this.handleEdit(record._id)}> Edit </a>
                </Link>

                <Divider type="vertical" />

                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
                    <a href="javascript:;">Delete</a>
                </Popconfirm>

            </span>
            ),
        },
        ];
        this.state = { input: "" }; 
    };

    getColumnSearchProps = dataIndex => ({
        //////////////////////////////////////////
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.input]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    handleInput = e => {
        if (e.target.value !== undefined)
        {
            this.setState({ input: e.target.value });
            this.props.getSearchResult(this.state.input);
        }
        else{
            this.setState({ input: ''});
            this.props.getSearchResult(this.state.input);
            
        }
        //console.log('input', this.state.input)
    };
    
    handleSearch = () => {
        console.log(this.props.input)
        this.props.getSearchResult(this.state.input);
        //this.setState({ input: '' });
    }
    /*handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
          key: count,
          name: `Edward King ${count}`,
          age: 32,
          address: `London, Park Lane no. ${count}`,
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
    };*/
    handleDelete = user_id => {
        console.log('user_id', user_id);
        this.props.deleteUser(user_id);
      };
    handleEdit = user_id => {
        console.log('user_id', user_id);
        this.props.editUser(user_id);
    };

    render(){
        const { input } = this.state;
        var userList = [];
        //const { userList, matchedData } = this.props;
        //console.log('matchedData',this.props.matchedData)
        //console.log('ListData',this.props.userList)
        if (this.props.matchedData.data === undefined || this.props.matchedData.data.length === 0 )
        {
            userList = this.props.userList;
        }
        else
        {
            userList = this.props.matchedData;
        }
            return (
            <div>
            <h2>Home</h2>
                <input style = {{margin: 10}} value={input} onChange={this.handleInput} />
                    
                <Button style = {{margin: 10}} type="primary" onClick = {this.handleSearch} >Search</Button>

                <Link style = {{margin: 10}} to="/create">Create new user</Link>
                
                <Table columns={this.columns} dataSource = {userList.data} rowKey={record => record._id} ></Table>{/*tabledemo.data} ></Table>*/}
            </div>
        );
    }
 
}


const mapStateToProps = state => {
    return {
      userList: state.list,
      deleteUser: state.deleteUser,
      matchedData: state.search
    };
  };
const mapDispatchToProps = dispatch => {
    return {
        getUserList: () => {
            dispatch(getList());
        },
        deleteUser: (id) => {
            dispatch(delUser(id));
        },
        editUser: (id) =>{
            dispatch(getDetail(id));
        }
        ,
        getSearchResult: (searchText) => {
            dispatch(getMatchedData(searchText))
        }
    };
};
//store.subscribe(Home.render);///////////////////////////////////
//const HomeWithRouter = withRouter(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);