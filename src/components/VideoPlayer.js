import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayer = () => {
	const videoRef = useRef(null);
	const [downloadVid, setDownloadVid] = useState('');
	const src =
		'https://stream.mux.com/ATRoeaX01q3aUMXw51tvnjCY77800d37LBFulxVsKKmbo.m3u8';
	useEffect(() => {
		let hls;

		if (videoRef.current) {
			const video = videoRef.current;

			if (video.canPlayType('application/vnd.apple.mpegurl')) {
				// Some browers (safari and ie edge) support HLS natively
				video.src = src;
			} else if (Hls.isSupported()) {
				// This will run in all other modern browsers
				hls = new Hls();
				hls.loadSource(src);
				hls.attachMedia(video);
			} else {
				console.error("This is a legacy browser that doesn't support MSE");
			}
		}
		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, [videoRef]);

	const getDownload = async () => {
		const res = await fetch(`https://api.mux.com/video/v1/assets`);
		// const data = await res.json();
		console.log(res);
	};
	return (
		<>
			<video
				controls
				ref={videoRef}
				style={{ width: '100%', maxWidth: '500px', marginTop: '3rem' }}
			/>
			<button onClick={getDownload}>Get Id</button>
		</>
	);
};

export default VideoPlayer;
