import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import Student from "./Student";
import { Route } from "react-router-dom";
import Logout from "./Logout";

const initialStudents = [
  { user_id: 1, student_name: "James Jimmerson", major: "Geology" },
  { user_id: 2, student_name: "Mallory Jones", major: "History" },
  { user_id: 3, student_name: "Alice Wonderland", major: "History" },
  { user_id: 4, student_name: "Jennie Pullman", major: "History" },
  { user_id: 5, student_name: "Michael Johnson", major: "Computer Science" },
  { user_id: 6, student_name: "Usain Bolt", major: "Kineseology" }
];

const StyledDiv = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: flex-start;
  width: 33.33vw;
  /* height: 100vh; */
  border-right: 1px solid grey;
`;
const StyledStudentList = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between;  */
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const StyledList = styled.div`
  height: 10%;
`;

const StyledH2 = styled.h2`
  color: #00abff;
  font-size: 1.3em;
  margin-left: 1em;
  margin-right: 1em;
`;

const StyledH3 = styled.h3`
  color: #00abff;
  font-size: 0.8em;
  margin-left: 1em;
  margin-right: 1em;
`;

const StyledForm = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 2em;
  color: #00abff;
  width: 60%;
  border-radius: 1em;
  -moz-box-shadow: 3px 3px 5px 6px #115e9c;
  -webkit-box-shadow: 3px 3px 5px 6px #115e9c;
  box-shadow: 3px 3px 5px 6px #115e9c;
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
  margin: 1em;
`;
const StyledImg = styled.img`
  width: 50%;
`;

const StudentList = props => {
  console.log(props);
  const loginId = localStorage.getItem("id");
  const user_firstName = localStorage.getItem("first_name");
  const user_lastName = localStorage.getItem("last_name");

  useEffect(() => {
    const getStudents = () => {
      axiosWithAuth()
        .get(
          `https://better-professor-backend.herokuapp.com/students/user/${loginId}`
        )
        .then(res => {
          console.log(" response from server", res);
          props.setStudentsList(res.data);
        })
        .catch(error => {
          alert(error.message);
        });
    };
    getStudents();
  }, []);

  return (
    <StyledDiv>
      <Route to="/protected/Logout" component={Logout} />
      <StyledStudentList>
        <StyledH2>Hello, Professor {user_firstName} {user_lastName}</StyledH2>
        <StyledImg src="https://icon-library.net/images/teacher-icon-png/teacher-icon-png-16.jpg"></StyledImg>
        <StyledH2> Your user id is: {loginId}</StyledH2>
        <StyledH3> Total number of Messages sent: {props.getMessage.length}</StyledH3>
        <StyledH3> Total number of students: {props.studentsList.length}</StyledH3>
        <StyledH3> Total number of projects pending review: {props.projectsList.length}</StyledH3>
        <StyledH2>Your list of students</StyledH2>
        {props.studentsList.map(student => {
          return (
            <StyledList key={student.id}>
              <NavLink
                to={`/protected/Student/${student.id}`}
                className="studentsNav"
                activeStyle={{
                  fontWeight: "bold",
                  color: "blue",
                  margin: "1em"
                }}
              >
                {student.id}.{student.student}
              </NavLink>
            </StyledList>
          );
        })}
        <NavLink className="send-button" to="/protected/AddStudents"> Add students</NavLink>
      </StyledStudentList>
    </StyledDiv>
  );
};
export default StudentList;