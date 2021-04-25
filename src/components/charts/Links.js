import React, { useState } from 'react';
import useFirestore from '../../hooks/useFirestore';
import { useAuth } from '../../contexts/AuthContext';
import { projectFirestore, timestamp } from '../../firebase';
const Links = () => {
	const [error, setError] = useState('');
	const [charts, setCharts] = useState({
		chart: '',
		time: '',
		url: '',
	});
	const { chart, time, url } = charts;
	const collectionRef = projectFirestore.collection('links');

	const { docs } = useFirestore('links');
	const { currentUser } = useAuth();
	console.log(docs);
	const onChange = (e) => {
		setCharts({ ...charts, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		try {
			const createdAt = timestamp();

			collectionRef.add({ charts, createdAt });
			setCharts({
				chart: '',
				time: '',
				url: '',
			});
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
	};

	return (
		<div className="p-1">
			<h1 className="mt-1 text-center p-1">
				{' '}
				Charts links {currentUser.email}
			</h1>

			<div className="grid-2">
				{/* <h1>{currentUser}</h1> */}

				<form onSubmit={onSubmit} className="form">
					<input
						type="text"
						name="chart"
						placeholder="Chart/Website Name"
						value={chart}
						onChange={onChange}
					/>
					<input
						type="text"
						name="time"
						placeholder="Time of update"
						value={time}
						onChange={onChange}
					/>
					<input
						type="url"
						name="url"
						placeholder="Enter Url"
						value={url}
						onChange={onChange}
					/>
					<button className="btn btn-primary" type="submit">
						Add Links
					</button>
					<p>{error}</p>
				</form>
				<div>
					{docs &&
						docs.map((doc) => (
							<div className="card" key={doc.id}>
								<p>
									<a href={doc.charts.url}>{doc.charts.chart}</a> | Time:{' '}
									{doc.charts.time}
								</p>

								<small>
									{' '}
									URL:
									<a href={doc.charts.url}>{doc.charts.url}</a>
								</small>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Links;
