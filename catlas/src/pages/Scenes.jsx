import React, { useState, useEffect } from 'react';
import { Grid, Icon } from 'semantic-ui-react';

const style = {
	transition: 'all .2s cubic-bezier(0.39, 0.1, 0.26, 0.92)',
};

function Article(params) {
	const [images, setImages] = useState([]);
	const [imgIdx, setImgIdx] = useState(0);

	useEffect(() => {
		const imgs = require.context('../assets/img', false, /\.(png|jpe?g)$/);
		(async () => {
			const arrImg = new Array();
			await imgs.keys().forEach((element) => {
				arrImg.push(imgs(element));
			});
			setImages(arrImg);
		})();
		console.log(imgIdx);
		return;
	}, [imgIdx]);

	function handleSilde(event) {
		console.log(event.target.id);
		event.target.id === 'next' ? setImgIdx(imgIdx + 1) : setImgIdx(imgIdx - 1);
	}

	return (
		<div
			style={{
				marginBottom: '3.5rem',
				width: '100%',
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
					width: '100%',
					height: '50px',
					fontWeight: 'bold',
					borderBottom: '1px solid #E9E9E9',
				}}
			>
				제목
			</div>
			<div
				className='article-contents'
				style={{
					position: 'relative',
				}}
			>
				<Icon
					style={{
						margin: '0 0 0 .25rem',
						position: 'absolute',
						top: '50%',
						transform: 'translateY(-50%)',
						display: `${imgIdx ? 'block' : 'none'}`,
						zIndex: '100',
					}}
					color='grey'
					size='big'
					name='arrow alternate circle left'
					id='previous'
					onClick={(e) => handleSilde(e)}
				/>
				<div
					className='images-wrapper'
					style={{
						width: `${100 * images.length}%`,
						display: 'flex',
						transform: `translateX(-${imgIdx * (100 / images.length)}%)`,
						transition: `transform ease-in-out 0.4s`,
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
				<Icon
					style={{
						position: 'absolute',
						top: '50%',
						right: '0',
						transform: 'translateY(-50%)',
						display: `${imgIdx === images.length - 1 ? 'none' : 'block'}`,
						zIndex: '100',
					}}
					color='grey'
					size='big'
					name='arrow alternate circle right'
					id='next'
					onClick={(e) => handleSilde(e)}
				/>
			</div>
			<div
				className='discription'
				style={{
					width: '100%',
					borderTop: '1px solid #E9E9E9',
				}}
			></div>
		</div>
	);
}

function Scenes() {
	return (
		<Grid container columns={1} verticalAlign='middle' padded='vertically'>
			<Grid.Column>
				<Grid container verticalAlign='middle' padded='vertically'>
					<Grid.Column width={3}>
						<div
							style={{
								position: 'fixed',
								top: '280px',
							}}
						>
							<ul>
								<li>n년</li>
								<li>n-1년</li>
								<li>n-2년</li>
							</ul>
						</div>
					</Grid.Column>
					<Grid.Column width={8}>
						<Article />
						<Article />
						<Article />
						<Article />
					</Grid.Column>
				</Grid>
			</Grid.Column>
		</Grid>
	);
}

export default Scenes;
