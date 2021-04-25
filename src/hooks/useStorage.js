import { useState, useEffect } from 'react';

import {
	projectStorage,
	projectFirestore,
	timestamp,
} from '../firebase/config';

const useStorage = (file) => {
	// this hook is just a function

	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	// all login will go in useEffect depends on file changeHandler

	useEffect(() => {
		// references
		const storageRef = projectStorage.ref(file.name);
		const collectionRef = projectFirestore.collection('images');

		storageRef.put(file).on(
			'state_changed',
			(snap) => {
				// add a listener to fire func, progross comp?
				// snap obj in time of the obj curr
				const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage);
			},
			(err) => {
				setError(err);
			},
			async () => {
				const url = await storageRef.getDownloadURL();

				const createdAt = timestamp();
				collectionRef.add({ url, createdAt });
				setUrl(url);
			}
		);
	}, [file]);

	return { url, progress, error };
};

export default useStorage;
