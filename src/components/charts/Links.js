import React, { useState } from 'react';
import useFirestore from '../../hooks/useFirestore';
import LinkForm from './LinkForm';
// import { useAuth } from '../../contexts/AuthContext';
// import { projectFirestore, timestamp } from '../../firebase';
import LinkItem from './LinkItem';
const Links = () => {
	// const { currentUser } = useAuth();

	const [error, setError] = useState('');
	const [charts, setCharts] = useState({
		chart: '',
		time: '',
		url: '',
	});
	const { chart, time, url } = charts;
	// const collectionRef = projectFirestore.collection('links');

	const { docs } = useFirestore('links');

	console.log(docs);
	// const onChange = (e) => {
	// 	setCharts({ ...charts, [e.target.name]: e.target.value });
	// };
	// const onSubmit = (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const createdAt = timestamp();

	// 		collectionRef.add({ charts, createdAt });
	// 		setCharts({
	// 			chart: '',
	// 			time: '',
	// 			url: '',
	// 		});
	// 	} catch (error) {
	// 		console.error(error);
	// 		setError(error.message);
	// 	}
	// };

	return (
		<div className="p-1">
			<h1 className="mt-1 text-center p-1"> Charts links</h1>

			<div className="grid-2">
				{/* <h1>{currentUser}</h1> */}
				<LinkForm />

				<div>
					{docs &&
						docs.map((doc) => <LinkItem key={doc.id} doc={doc} id={doc.id} />)}
				</div>
			</div>
		</div>
	);
};

export default Links;
