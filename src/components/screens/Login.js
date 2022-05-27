import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userContext } from "../../App";
import querystring from "query-string";
import Helmet from "react-helmet";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [messege, setMessege] = useState("");
	const [path, setPath] = useState();
	const navigate = useNavigate();
	const { updateUserData } = useContext(userContext);
	const location = useLocation();

	useState(() => {
		const { search } = location;
		const value = querystring.parse(search);
		const { next } = value;
		setPath(next);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setMessege("");
		axios
			.post("https://traveller.talrop.works/api/v1/auth/token/", {
				username,
				password,
			})
			.then((res) => {
				let data = res.data;
				localStorage.setItem("userdata", JSON.stringify(data));
				path ? navigate(path) : navigate("/");
				updateUserData({ type: "LOGIN", payload: data });
			})
			.catch((error) => {
				console.log(error.response);
				if (error.response.status === 401) {
					setMessege(error.response.data.detail);
				} else {
					setMessege(error.response.data.password);
				}
			});
	};

	return (
		<>
			<Helmet>
				<title>Travel app | Login</title>
			</Helmet>
			<div className="login">
				<section className="left">
					<h2>Travel to the best beautiful place</h2>
				</section>
				<section className="right">
					<div className="container">
						<h3>Login to your Account</h3>
						<span className="small">
							Enter email and password to login
						</span>
						<form onSubmit={handleSubmit}>
							<input
								type="email"
								placeholder="Enter email"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
							<input
								type="password"
								placeholder="Enter Password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<Link to="/auth/create">
								<span className="signButton">signup Now</span>
							</Link>
							<p>{messege}</p>
							<input type="submit" value="Login" />
						</form>
					</div>
				</section>
			</div>
		</>
	);
}

export default Login;
