import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: #00abff;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  height: 100vh;
  margin: 1em;
`;

const StyledForm= styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 2em;
  color: #00abff;
  width: 60%;
  border-radius: 1em;
  -moz-box-shadow:    3px 3px 5px 6px #115E9C;
  -webkit-box-shadow: 3px 3px 5px 6px #115E9C;
  box-shadow:         3px 3px 5px 6px #115E9C;
`;

const StyledInput = styled.input`
    margin: 1em;
    padding: 1em;
    width: 80%;
`;

const StyledButton = styled.button`
  background-color: #00abff;
  color: white;
  margin: 1em;
  padding: 1em;
  width: 30%;
  border: none;
  border-radius: 1em;
`;

const StyledLabel = styled.label`
  margin:1em;
`;

const StyledH2 = styled.h2`
  color: white;
  font-size: 1.3em;
  margin:0;
`;
const StyledH1 = styled.h1`
  color: white;
  font-size: 1.8em;
 
`;

class MessagingForm extends React.Component {
  state = {
    message: {
      studentName: '',
      messageText: ''
    }
  };

  sendMessage = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/login', this.state.message)
      .then(res => {
        console.log(this.props.history)
      })
      .catch(err => console.log(err.response));
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <StyledDiv>
        <StyledH1>Send Message to Student</StyledH1>
        
        <StyledForm onSubmit={this.login}>
          <StyledLabel>Student Name</StyledLabel>
          <StyledInput
            type="text"
            name="studentname"
            value={this.state.message.studentName}
            onChange={this.handleChange}
          />
          <label>Message</label>
          <StyledInput
            type="text"
            name="messagetext"
            value={this.state.message.messageText}
            onChange={this.handleChange}
          />
          <StyledButton>Submit</StyledButton>
        </StyledForm>
      </StyledDiv>
    ); 
  }
};

export default MessagingForm;