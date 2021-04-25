import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Mux from '@mux/mux-node';

const Video = () => {
	const { Video } = new Mux(
		`9f59c060-8544-4ba3-bfe2-f6e5bbf115dc`,
		`FrbmgKzzs93gOk3lvQ+acBHaj38HYoxg2YqNgE0mAc+LaDuAHLuHTsf/osy5qhXZHitKaNS3PlL`
	);
	const [videoId, setVideoId] = useState('');
	const [create, setCreate] = useState('');
	const [url, setUrl] = useState('');
	const upload = async () => {
		const video = await Video.Assets.create({
			input: url,
		});
		// ...then later, a playback ID for that asset
		const playbackId = await Video.Assets.createPlaybackId(video.id, {
			policy: 'public',
		});
		setVideoId(video.id);
		setCreate(video.createdAt);

		console.log(video, playbackId);
	};

	return (
		<div>
			<p></p>
			<button onClick={upload}>Upload</button>
			<input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
			{/* <video controls src={`https://stream.mux.com/${videoId}.m3u8`} /> */}
			<p>
				{create} {videoId}
			</p>
			<VideoPlayer />
		</div>
	);
};

export default Video;
