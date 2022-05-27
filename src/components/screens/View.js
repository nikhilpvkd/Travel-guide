import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import locIcon from "../Assets/images/place.svg";
import { userContext } from "../../App";
import Helmet from "react-helmet";

export default function View() {
	const { userdata } = useContext(userContext);
	const params = useParams();
	const [place, setplace] = useState({});
	const [imgArray, setImgs] = useState([]);

	axios.defaults.baseURL =
		"https://traveller.talrop.works/api/v1/places/protected";
	useEffect(() => {
		axios
			.get(params.id, {
				headers: {
					Authorization: `Bearer ${userdata?.access}`,
				},
			})
			.then(function (response) {
				// console.log(response.data.data);
				setplace(response.data.data);
				setImgs(response.data.data.gallery);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [params]);
	let renderImage = () => {
		return imgArray.map((img) => (
			<li key={img.id}>
				<img src={img.image} alt={place.name} />
			</li>
		));
	};

	// place.gallery.map((images) => console.log(images.image));
	// // place.gallery.map((images) => console.log(images.id));

	return (
		<>
			<Helmet>
				<title>Travel App | {`${place.name}`}</title>
			</Helmet>
			<div className="view wrapper">
				<h2>{place.name}</h2>
				<span className="category">{place.category_name}</span>
				<span className="location">
					<img src={locIcon} alt="Icon" />
					{place.location}
				</span>
				<div className="images">
					<div className="left">
						<img src={place.image} alt={place.name} />
					</div>
					<ul className="right">{renderImage()}</ul>
				</div>
				<div className="details">
					<h4>Place Details</h4>
					<p>{place.description}</p>
				</div>
			</div>
		</>
	);
}
