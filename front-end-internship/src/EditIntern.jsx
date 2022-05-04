import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Arrow from "./Arrow.png";


const EditIntern = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [internshipStart, setInternshipStart] = useState("");
  const [internshipEnd, setInternshipEnd] = useState("");

  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [internshipStartMsg, setInternshipStartMsg] = useState("");
  const [internshipEndMsg, setInternshipEndMsg] = useState("");

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await fetch(`http://localhost:3001/interns/${id}`);
      const intern = await response.json();
      setName(intern.name);
      setEmail(intern.email);
      setInternshipStart(intern.internshipStart.substring(0, 10));
      setInternshipEnd(intern.internshipEnd.substring(0, 10));
    };

    fetchInterns();
  }, [id, email, name]);

  const emailValidator = (email) => {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return pattern.test(email);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setNameMsg("");
    setEmailMsg("");
    setInternshipStartMsg("");
    setInternshipEndMsg("");

    if (event.target[0].value === "") {
      setNameMsg("This field is required");
    }
    if (event.target[1].value === "") {
      setEmailMsg("This field is required");
    } else {
      if (!emailValidator(event.target[1].value)) {
        setEmailMsg("Email is not correct");
      }
    }

    if (event.target[2].value !== "" && event.target[3].value !== "") {
      if (
        Date.parse(event.target[2].value) > Date.parse(event.target[3].value)
      ) {
        setInternshipEndMsg("This date is not correct");
      }
    } else {
      if (event.target[2].value === "") {
        setInternshipStartMsg("Filed is required");
      }
      if (event.target[3].value === "") {
        setInternshipEndMsg("Filed is required");
      }
    }

    if (
      event.target[0].value !== "" &&
      event.target[1].value !== "" &&
      event.target[2].value !== "" &&
      event.target[3].value !== "" &&
      Date.parse(event.target[2].value) < Date.parse(event.target[3].value)
    ) {
      const data = {
        name: event.target[0].value,
        email: event.target[1].value,
        internshipStart: new Date(event.target[2].value),
        internshipEnd: new Date(event.target[3].value),
      };

      axios.put(`http://localhost:3001/interns/${id}`, data);
    }
  };

  return (
    <div className="mainContainer">
      <NavLink className="btnBack" to="/">
        <img className="arrow" src={Arrow} alt='error'/>
        Back to list
      </NavLink>
      <form className="formContainer" onSubmit={submitHandler}>
        <div className="editTitle">Edit</div>
        <label className="label">Name*</label>
        <input
          className={nameMsg ? "inputText inputAlert" : "inputText"}
          type="text"
          name="name"
          defaultValue={name}
        />

        <div className="required">{nameMsg ? nameMsg : null}</div>

        <label className="label">Email*</label>
        <input
          className={emailMsg ? "inputText inputAlert" : "inputText"}
          type="text"
          name="email"
          defaultValue={email}
        />
        <div className="required">{emailMsg ? emailMsg : null}</div>

        <div>
          <div className="column">
            <label className="label">Internship start*</label>
            <input
              type="date"
              className={internshipStartMsg ? "dates dateAlert" : "dates"}
              name="internshipStart"
              defaultValue={internshipStart}
            />
            <div className="required">
              {internshipStartMsg ? internshipStartMsg : null}
            </div>
          </div>

          <div className="column">
            <label className="label">Internship end*</label>
            <input
              className={internshipEndMsg ? "dates dateAlert" : "dates"}
              type="date"
              name="internshipEnd"
              defaultValue={internshipEnd}
            />
            <div className="required">
              {internshipEndMsg ? internshipEndMsg : null}
            </div>
          </div>
        </div>
        <input className="btnSubmit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditIntern;