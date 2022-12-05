import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	
	console.log("This is your token", store.token)

	if (store.token != null){
			actions.getVerified();
	
	}

	useEffect(() => {
		if(store.verifieUser === true){
			navigate("/private")
		}				
	},[store.verifieUser])

	console.log("verifier User:", store.verifieUser)

	const handleClick = (e) => {
		e.preventDefault();		
		actions.getToken(email, password);		
	};
	

	return (
		<form className="container mt-4">
            <h1 className="text-center">Login</h1>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1"/>
  </div>
  <button type="submit" class="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
	);
};
