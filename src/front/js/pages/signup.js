import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userActive, setUserActive] = useState(false);
  const navigate = useNavigate();

  console.log(userActive);

  const handleClick = (e) => {
		e.preventDefault();
		actions.createUser(email, password, userActive)
    navigate("/")		
	};

  return (
    <div className="container mt-5">
        <h1 className="text-center">Formulario Resgistrarse</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={(e) => setUserActive(e.target.checked)}
            value={userActive}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Active
          </label>
        </div>
        <button type="submit" className="btn btn-primary" 
          onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};