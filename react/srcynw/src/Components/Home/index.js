import React from 'react';
import Button from 'antd/lib/button';
import Table  from 'antd/lib/table';

//import * as tabledemo from '../tabledemo';
//import React from 'react';
import Divider from 'antd/lib/divider';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.age - b.age,
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Edit </a>{/*</span>{record.name}</a>*/}
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  },
];

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { input: "" }; 
        console.log(this.props.userList)
      }
    handleInput = e => {
        this.setState({ input: e.target.value });
        this.props.getResult(e.target.value);
    };
    render(){
        const { input } = this.state;
        //const { userList, matchedData } = this.props;
        console.log(this.props.userList)
        console.log(typeof(this.props.userList))
        const userList = this.props.userList;
        return (
            <div>
            <h2>Home</h2>
                <input value={input} onChange={this.handleInput}/>
                    {/*     {matchedData && matchedData.length > 0 && 
                        <ul>
                        {matchedData.map((data, index) => {
                            return <li key={index}>{data}</li>
                        })}
                        </ul>
                    }     */}
                <Button type="primary">Search</Button>
                
                <Table columns={columns} dataSource = {userList.data} ></Table>{/*tabledemo.data} ></Table>*/}
            </div>
        );
    }   
}