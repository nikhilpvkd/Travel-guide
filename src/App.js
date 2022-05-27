import Nav from "./components/includes/Nav";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import View from "./components/screens/View";
import NotFound from "./components/screens/NotFound";
import Login from "./components/screens/Login";
import Signin from "./components/screens/Signin";
import React, { useState, useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
export const userContext = React.createContext();
function App() {
	const [loading, setLoading] = useState(true);
	const [userdata, setUserdata] = useState({});

	const updateUserData = (action) => {
		switch (action.type) {
			case "LOGOUT":
				setUserdata(null);
				localStorage.clear();
				break;
			case "LOGIN":
				setUserdata(action.payload);
				break;
			default:
				break;
		}
	};
	useEffect(() => {
		setUserdata(JSON.parse(localStorage.getItem("userdata")));
		setLoading(false);
	}, []);
	return loading ? (
		<h1>loading</h1>
	) : (
		<userContext.Provider value={{ userdata, updateUserData }}>
			<Router>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="view/:id"
						element={
							<PrivateRoute>
								<View />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<NotFound />} required />
					<Route path="auth/login" index element={<Login />} />
					<Route path="auth/create" element={<Signin />} />
				</Routes>
			</Router>
		</userContext.Provider>
	);
}

export default App;
