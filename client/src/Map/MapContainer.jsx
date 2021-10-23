/** @format */

import { GoogleMap, LoadScript , Marker} from "@react-google-maps/api";
import { useState, useEffect } from "react";


export function MapContainer() {
	const [currentPosition, setCurrentPosition] = useState({});

	const success = (position) => {
		const currentPosition = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		};
		setCurrentPosition(currentPosition);
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			success,
			function (p) {
				console.log("bug");
			},
			{ enableHighAccuracy: true },
		);
	});
	const mapStyles = {
		height: "100vh",
		width: "100%",
	};


	return (
		<LoadScript googleMapsApiKey="AIzaSyDZ8oFXmBuqyvfhvxBKKdOQfeo3y0Oj5Zs">
		<GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
		  >
			{
				currentPosition.lat &&
				(
				<Marker position={currentPosition}/>
				)
			}
        </GoogleMap>
		</LoadScript>
	);
}
export default MapContainer;
