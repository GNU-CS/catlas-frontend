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
					<Card.Meta>{club.chairman}</Card.Meta>
					<Card.Description>{club.description}</Card.Description>
				</Card.Content>
			</Card>
		</>
	);
}

function ClubCardGruop() {
	const [isClubCall, setClubCall] = React.useState(false);
	const [clubs, setClubs] = React.useState([
		{
			name: '구석방',
			chairman: '고영민',
			description: '여타 잡무',
		},
		{
			name: '런앤건',
			chairman: '아무개',
			description: '농구',
		},
	]);

	const initialRender = React.useRef(true);
	//동아리 객체의 내용 변화 파악
	const prevClubs = usePrevious(clubs);

	React.useEffect(() => {
		//초기 랜더링 넘어가기
		if (initialRender.current) {
			initialRender.current = false;
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
