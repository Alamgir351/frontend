import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const StyledDiv = styled.div`
  background-color:white;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  /* height: 100vh; */
  width: 33vw;
  border-left:1px solid grey;
`;

const StyledForm = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 1em;
  color: #00abff;
  width: 60%;
  height: 80vh;
  border-radius: 1em;
  -moz-box-shadow: 3px 3px 5px 6px #115e9c;
  -webkit-box-shadow: 3px 3px 5px 6px #115e9c;
  box-shadow: 3px 3px 5px 6px #115e9c;
`;

const StyledInput = styled.input`
  margin: 0.5em;
  padding: 0.5em;
  width: 80%;
`;

const StyledButton = styled.button`
  background-color: #00abff;
  color: white;
  margin: 1em;
  padding: 1em;
  width: 50%;
  border: none;
  border-radius: 1em;
`;

const StyledLabel = styled.label`
  margin: 1em;
`;

const StyledH2 = styled.h2`
  color: white;
  font-size: 1.3em;
  margin: 0;
`;
const StyledH1 = styled.h1`
  color:#00abff;
  font-size: 1.8em;
`;

const StyledImg = styled.img`
  width: 30%;
`;
const StyledGoBack = styled.div`
  background-color: white;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  /* height: 100vh; */
  width: 33vw;
`;

class AddProject extends React.Component {
    state = {
        credentials: {
          student_id: "",
          first_name: "",
          last_name: "",
          major: "",
          projects_type: "",
          projects_date: "",
        }
      };

  AddAProject = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(
        "https://better-professor-backend.herokuapp.com/projects",
        this.state.credentials
      )
      .then(res => {
        console.log("hello from POST project", res.data);
        alert("Project added successfully")
      })
      .catch(err => alert(err.message));
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
    console.log("values from add project form",this.state.credentials)
  };

  render() {
    return (
      <StyledDiv>
          <StyledGoBack>
        <NavLink className="back-go" to="/protected/Student">{`<`}</NavLink>
        </StyledGoBack>
        <StyledH1>Add a new project</StyledH1>
        <StyledImg src="https://cdn4.iconfinder.com/data/icons/project-management-1-11/65/32-512.png"></StyledImg>
        <StyledForm onSubmit={this.AddAProject}>
          <StyledLabel>Student ID</StyledLabel>
          <StyledInput
            type="text"
            name="student_id"
            value={this.state.credentials.student_id}
            onChange={this.handleChange}
          />
          <label>First name</label>
          <StyledInput
            type="text"
            name="first_name"
            value={this.state.credentials.first_name}
            onChange={this.handleChange}
          />
          <label>Last name</label>
          <StyledInput
            type="text"
            name="last_name"
            value={this.state.credentials.last_name}
            onChange={this.handleChange}
          />
          <label>Major</label>
          <StyledInput
            type="text"
            name="major"
            value={this.state.credentials.major}
            onChange={this.handleChange}
          />
          <label>Project type</label>
          <StyledInput
            type="text"
            name="projects_type"
            value={this.state.credentials.projects_type}
            onChange={this.handleChange}
          />
           <label>Project date</label>
          <StyledInput
            type="text"
            name="projects_date"
            value={this.state.credentials.projects_date}
            onChange={this.handleChange}
          />
          <StyledButton>Add project</StyledButton>
        </StyledForm>
      </StyledDiv>
    );
  }
}

export default AddProject;
