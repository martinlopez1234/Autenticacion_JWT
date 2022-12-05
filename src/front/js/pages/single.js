import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	// const params = useParams();

	return (
		<div className="jumbotron">
		{store.token && store.token!="" && store.token!=undefined ? (
				<h1 className="text-center">Te Logeaste</h1>			
				):(
					navigate("/")
		)}
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
