import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faDroplet,
	faLocationArrow,
	faLocationDot,
	faPerson,
	faArrowUp,
	faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

function App() {
	const [data, setData] = useState("");
	const [location, setLocation] = useState("");

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

	const getLocation = (e) => {
		if (e.key === "Enter") {
			axios.get(url).then((response) => {
				setData(response.data);
				console.log(response.data);
			});
			setLocation("");
		}
	};

	return (
		<div className="container mx-auto p-9 w-full">
			<div className="flex-auto bg-sky-900 rounded-xl p-9 text-zinc-50">
				<div className="pt-6 md:p-8 space-y-4">
					<input
						value={location}
						type="text"
						className="border-2 rounded p-9 border-black w-full text-black text-center"
						placeholder="Enter location"
						onChange={(e) => setLocation(e.target.value)}
						onKeyDown={getLocation}
					/>

					<div className="container w-full text-center p-5">
						{data === "" ? (
							<h1 className="text-5xl">Enter your location</h1>
						) : (
							<div>
								<h1 className="text-9xl">{Math.round(data.main.temp)}°C</h1>
								<p className="location text-5xl p-9">
									{data.name} {data.sys.country}{" "}
									<FontAwesomeIcon icon={faLocationDot} />
								</p>
								<div className="flex justify-center">
									<p className="text-xl">
										{data.weather[0].description.toUpperCase()}
									</p>{" "}
									{/* <img
										src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
										alt="Weather Icon"
										className="icon"
									/> */}
								</div>
								<div className="container columns-2 p-9">
									<div className="high">
										<p className="text-3xl">
											{Math.round(data.main.temp_max)}°C
										</p>
										<p className="text-xl">
											High <FontAwesomeIcon icon={faArrowUp} />
										</p>
									</div>
									<div className="low">
										<p className="text-3xl">
											{Math.round(data.main.temp_min)}°C
										</p>
										<p className="text-xl">
											Low <FontAwesomeIcon icon={faArrowDown} />
										</p>
									</div>
								</div>
								<div className="container columns-3 p-9">
									<div className="temperature">
										<p className="text-3xl">
											{Math.round(data.main.feels_like)}°C
										</p>
										<p className="text-xl">
											Feels Like <FontAwesomeIcon icon={faPerson} />
										</p>
									</div>
									<div className="humidity">
										<p className="text-3xl">
											{Math.round(data.main.humidity)}%
										</p>
										<p className="text-xl">
											Humidity <FontAwesomeIcon icon={faDroplet} />
										</p>
									</div>
									<div className="wind">
										<p className="text-3xl">{data.wind.speed} MPH</p>
										<p className="text-xl">
											Wind Speed <FontAwesomeIcon icon={faLocationArrow} />
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
