import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
function Signin() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [messege, setMessege] = useState("");
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		setMessege("");
		axios
			.post("https://traveller.talrop.works/api/v1/auth/register/", {
				first_name: name,
				password,
				email,
			})
			.then((res) => {
				if (res.data.StatusCode === 6000) {
					let data = res.data;
					localStorage.setItem("userdata", JSON.stringify(data));
					navigate("/auth/login");
				} else {
					setMessege(res.data.message);
				}
			})
			.catch((error) => {
				console.log(error.response);
				if (error.response.status === 401) {
					setMessege(error.response.data.detail);
				}
			});
	};

	return (
		<>
			<Helmet>
				<title>Travel app | create an account</title>
			</Helmet>
			<div className="signin">
				<section className="left">
					<h2>Travel to the best beautiful place</h2>
				</section>
				<section className="right">
					<div className="container">
						<h3>signUp to your Account</h3>
						<span className="small">
							Crate an account to access all the features
						</span>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Enter Name"
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
							<input
								type="email"
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
							<input
								type="password"
								placeholder="Enter Password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<Link to="/auth/login">
								<span className="signButton">Login Now</span>
							</Link>
							<p>{messege}</p>
							<input type="submit" value="Signup" />
						</form>
					</div>
				</section>
			</div>
		</>
	);
}

export default Signin;
