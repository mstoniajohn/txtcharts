import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase';

const useFirestore = (collection) => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		const unsub = projectFirestore
			.collection(collection)
			.orderBy('createdAt', 'desc')
			.onSnapshot((snap) => {
				//  resltime updt with snapshot snapshot
				let documents = [];
				snap.forEach((doc) => {
					// doc.data() gets data doc.id gets id
					documents.push({ ...doc.data(), id: doc.id });
				});
				setDocs(documents);
			});

		return () => unsub();
	}, [collection]);

	return { docs };
};

export default useFirestore;
