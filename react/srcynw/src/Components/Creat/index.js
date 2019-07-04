import React from 'react';
import Form from "antd/lib/form";
import RegistrationForm from '../formdemo';

export default class Creat extends React.Component {
    
    render() {
      //const { input } = this.state;
      //const { matchedData } = this.props;
      const WrappedRegistrationForm = Form.create({ name: "register" })(
        RegistrationForm
      );
    
      //Home component 
      return(
        <div>
          <h2>Creat</h2>
          <WrappedRegistrationForm />
        </div>
      );
    }
}