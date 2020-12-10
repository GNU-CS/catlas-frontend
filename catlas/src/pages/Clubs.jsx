import React from 'react';
import { Container, Card } from 'semantic-ui-react';

function usePrevious(value) {
	const ref = React.useRef();

	React.useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}

function ClubCard({ club }) {
	console.log(club);
	return (
		<>
			<Card fluid>
				<Card.Content>
					<Card.Header>{club.name}</Card.Header>
					<Card.Meta>
						{club.chairman}/{club.phone}
					</Card.Meta>
					<Card.Description>{club.description}</Card.Description>
				</Card.Content>
			</Card>
		</>
	);
}

function ClubCardGruop() {
	const [clubs, setClubs] = React.useState([]);

	const initialRender = React.useRef(true);
	//동아리 객체의 내용 변화 파악
	const prevClubs = usePrevious(clubs);

	const __URL = 'test_url';
	React.useEffect(() => {
		//초기 랜더링 넘어가기
		if (initialRender.current) {
			initialRender.current = false;

			fetch(__URL, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then((data) => {
					setClubs(data);
				})
				.catch((err) => {
					setClubs([
						{
							name: '구석방',
							chairman: '고영민',
							phone: '010-0000-0001',
							description: '여타 잡무',
						},
						{
							name: '런앤건',
							chairman: '아무개',
							phone: '010-0000-0002',
							description: '농구',
						},
					]);
				});
			return;
		}
	}, [clubs, prevClubs]);

	return (
		<Card.Group>
			{clubs.map((value, index) => (
				<ClubCard club={value} key={index} />
			))}
		</Card.Group>
	);
}

function Clubs() {
	return (
		<Container padded='very'>
			<ClubCardGruop />
		</Container>
	);
}

export default Clubs;
