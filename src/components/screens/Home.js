import React, { useEffect, useState } from "react";
import locIcon from "../Assets/images/place.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
	const [places, setPlaces] = useState([]);
	useEffect(() => {
		axios
			.get("https://traveller.talrop.works/api/v1/places/")
			.then(function (response) {
				setPlaces(response.data.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);
	let renderList = () => {
		return places.map((place) => (
			<li key={place.id}>
				<Link to={`view/${place.id}`}>
					<div className="image">
						<img src={place.image} alt={place.name} />
					</div>
					<span className="name">{place.name}</span>
					<span className="location">
						<img src={locIcon} alt="Icon" />
						{place.location}
					</span>
				</Link>
			</li>
		));
	};
	return (
		<>
			<Helmet>
				<title>Travel App | Home</title>
			</Helmet>
			<div className="home wrapper">
				<h2>Welcome</h2>
				<p>Explore the world around you</p>
				<ul>{renderList()}</ul>
			</div>
		</>
	);
}
