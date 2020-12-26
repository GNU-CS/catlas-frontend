import React, { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react';

const style = {
	transition: 'all .2s cubic-bezier(0.39, 0.1, 0.26, 0.92)',
};

function Article(params) {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const imgs = require.context('../assets/img', false, /\.(png|jpe?g)$/);
		(async () => {
			const arrImg = new Array();
			await imgs.keys().forEach((element) => {
				arrImg.push(imgs(element));
			});
			setImages(arrImg);
		})();
		return;
	}, []);

	return (
		<div
			style={{
				marginBottom: '3.5rem',
				width: '560px',
				height: '800px',
				overflowX: 'hidden',
				border: '1px solid #E9E9E9',
				borderRadius: '5px',
			}}
		>
			<div
				className='title'
				style={{
					display: 'flex',
					alignItems: 'center',
					padding: '1rem',
					width: '560px',
					height: '50px',
					fontWeight: 'bold',
				}}
			>
				제목
			</div>
			<div
				className='images-wrapper'
				style={{
					width: `${560 * 5}px`,
					display: 'flex',
				}}
			>
				{images.map((element, idx) => (
					<div
						key={`img${idx}`}
						style={{
							width: '560px',
							height: '560px',
							backgroundImage: `url(${element.default})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
					/>
				))}
			</div>
		</div>
	);
}

function Scenes() {
	return (
		<Grid container columns={1} verticalAlign='middle' padded='vertically'>
			<Grid.Column>
				<Article />
			</Grid.Column>
		</Grid>
	);
}

export default Scenes;
