import React, { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase';

const LinkItem = ({ id, doc }) => {
	const collectionRef = projectFirestore.collection('links');
	const [current, setCurrent] = useState(null);
	const [charts, setCharts] = useState({
		chart: '',
		time: '',
		url: '',
	});
	const update = async () => {
		// Set the 'capital' field of the city
		const res = await collectionRef.doc(id).update({});
	};
	const deleteDoc = async () => {
		const res = await collectionRef.doc(id).delete();
		console.log(res);
	};
	useEffect(() => {
		if (current !== null) {
			setCharts(current);
		} else {
			setCharts({
				chart: '',
				time: '',
				url: '',
			});
		}
	}, [current]);

	return (
		<div className="card">
			<p>
				<a href={doc.charts.url}>{doc.charts.chart}</a> | Time:{' '}
				{doc.charts.time}
			</p>

			<p>
				<small>
					<i className="fas fa-link"></i>{' '}
					<a href={doc.charts.url}>{doc.charts.url}</a>
				</small>
			</p>

			<button className="btn btn-sm" onClick={deleteDoc}>
				delete
			</button>
			<button>updated</button>
		</div>
	);
};

export default LinkItem;
