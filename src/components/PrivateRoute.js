import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
	const location = useLocation();
	const isLoggedin = JSON.parse(localStorage.getItem("userdata"));
	return isLoggedin?.access ? (
		children
	) : (
		<Navigate
			to={{
				pathname: "/auth/login",
				search: `?next=${location.pathname}`,
			}}
		/>
	);
}

export default PrivateRoute;
