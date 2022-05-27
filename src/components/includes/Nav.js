import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import logo from "../Assets/images/logo.svg";
function Nav() {
	const { userdata, updateUserData } = useContext(userContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		updateUserData({ type: "LOGOUT" });
	};
	return (
		<div>
			<header>
				<div className="logo" onClick={() => navigate("/")}>
					<img src={logo} alt="logo"></img>
				</div>
				<div className="button">
					{userdata ? (
						<Link to="/auth/login" onClick={() => handleLogout()}>
							log out
						</Link>
					) : (
						<Link to="/auth/login">log in</Link>
					)}
				</div>
			</header>
		</div>
	);
}
export default Nav;
