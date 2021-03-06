import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { NavLink, Route } from "react-router-dom";
import styled from "styled-components";
import { parse } from "url";
import ProjectModal from "./ProjectPopup";
import MessagesModal from "./MessagesPopup";

const StyledDiv = styled.div`
  background-color: #00abff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.33vw;
`;

const StyledH2 = styled.h2`
  color: white;
  font-size: 1.3em;
  margin: 0;
`;
const StyledH3 = styled.h1`
  color: white;
  font-size: 1em;
`;

const StyledH4 = styled.h4`
  color: white;
  font-size: 0.8em;
`;

const StyledImg = styled.img`
  width: 50%;
`;
const StyledGoBack = styled.div`
  background-color: #00abff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

class Student extends React.Component {
  state = {
    student: {}
  };

  componentDidMount() {
    this.findStudent();
    this.getProjects();
    this.getMessages();
  }
  componentDidUpdate(prvProps) {
    if (
      prvProps.match.params.id != this.props.match.params.id ||
      prvProps.studentsList != this.props.studentsList
    )
      this.findStudent();
    if (prvProps.match.params.id != this.props.match.params.id) {
      this.getProjects();
      this.getMessages();
    }
  }

  findStudent = () => {
    const student = this.props.studentsList.find(student => {
      return student.id === parseInt(this.props.match.params.id);
    });
    this.setState({ student });
  };

  getProjects = () => {
    axiosWithAuth()
      .get(
        `https://better-professor-backend.herokuapp.com/projects/students/${this.props.match.params.id}`
      )
      .then(res => {
        this.props.setProjectsList(res.data);
      })
      .catch(error => {
        console.log("error from Student component", error.message);
        this.props.setProjectsList([]);
      });
  };

  getMessages = () => {
    axiosWithAuth()
      .get(
        `https://better-professor-backend.herokuapp.com/messages/students/${this.props.match.params.id}`
      )
      .then(res => {
        this.props.setGetMessage(res.data);
      })
      .catch(error => {
        console.log("error from Student component", error.message);
        this.props.setGetMessage([]);
      });
  };

  render() {
    return (
      <StyledDiv>
        <div class="scrollbar" id="style-default">
          <div class="force-overflow">
            <StyledGoBack>
              <NavLink className="go-back" to="/protected">{`<`}</NavLink>
            </StyledGoBack>
            <ul>
              <StyledH2>
                You are currently viewing records
                <br />
                for student id number:
                {this.state.student && this.state.student.id}
              </StyledH2>
              <StyledImg src="https://img.pngio.com/registration-for-under-graduate-student-icon-png-free-student-icon-png-820_731.png"></StyledImg>
              <StyledH3>
                Student Name: {this.state.student && this.state.student.student}
              </StyledH3>
              <StyledH3>
                Student Major: {this.state.student && this.state.student.major}
              </StyledH3>
            </ul>
            <>
              <Route
                render={props => (
                  <ProjectModal
                    projectsList={this.props.projectsList}
                    {...props}
                  />
                )}
              />
            </>
            <>
              <Route
                render={props => (
                  <MessagesModal
                    getMessage={this.props.getMessage}
                    {...props}
                  />
                )}
              />
            </>
            <div class="student-buttons">
              <NavLink
                to={`/protected/Student/${this.props.match.params.id}/MessagingForm`}
                className="send-msg-button"
              >
                Send a Message
              </NavLink>
              <NavLink
                to={`/protected/Student/${this.props.match.params.id}/AddProject`}
                className="send-msg-button"
              >
                Add a new Project
              </NavLink>
            </div>
          </div>
        </div>
      </StyledDiv>
    );
  }
}
export default Student;
