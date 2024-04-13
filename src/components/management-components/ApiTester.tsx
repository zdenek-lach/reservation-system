import axios from 'axios';
import { Button } from 'react-bootstrap';
import { authHeader, refreshCheck } from 'security/AuthService';
import config from '../../../config/config.json';

const ApiTester = () => {
	const apiUrls = {
		doctorsApi: config.api.doctorsApi.list,
		clinicsApi: config.api.clinicsApi.list,
		reservationsApi: config.api.reservationsApi.list,
		shiftApi: config.api.shiftApi.list,
		presetsApi: config.api.presetsApi.list,
		authApi: config.api.authApi.getToken,
		authRefresh: config.api.authApi.refreshToken,
	};

	const testApi = async (apiName: string, apiUrl: string) => {
		try {
			const response = await axios.get(apiUrl, {
				headers: {
					...authHeader(),
				},
			});
			console.log(`Response from ${apiName}:`, response.data);
		} catch (error) {
			console.error(`Error fetching data from ${apiName}:`, error);
		}
	};

	return (
		<div>
			<h1>API Tester</h1>
			{Object.entries(apiUrls).map(([apiName, apiUrl]) => (
				<Button
					variant='dark'
					className='m-1'
					key={apiName}
					onClick={() => testApi(apiName, apiUrl)}>
					Test {apiName}
				</Button>
			))}
			<Button
				variant='dark'
				onClick={refreshCheck}>
				Manual Token Refresh
			</Button>
		</div>
	);
};

export default ApiTester;
