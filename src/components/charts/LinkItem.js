import React from 'react';
import { projectFirestore } from '../../firebase';

const LinkItem = ({ id, doc }) => {
	const collectionRef = projectFirestore.collection('links');
	const deleteDoc = async () => {
		const res = await collectionRef.doc(id).delete();
		console.log(res);
	};

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
		</div>
	);
};

export default LinkItem;
