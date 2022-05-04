import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Vector from "./Vector.png";

const InternList = () => {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await fetch("http://localhost:3001/interns");
      const interns = await response.json();
      setInterns(interns);
    };
    fetchInterns();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Participants</h1>
      {interns.map((u) => (
        <li className="intern" key={u.id}>
          <div className="interName">{u.name}</div>
          <NavLink className="btnEdit" to={`/interns/${u.id}`}>
            <img className="btnEditImage" src={Vector} alt='error'/> Edit
          </NavLink>
        </li>
      ))}
    </div>
  );
};

export default InternList;