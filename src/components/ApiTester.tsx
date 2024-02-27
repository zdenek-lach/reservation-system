import axios from "axios";
import config from '../../config/config.json'

const ApiTester = () => {
  const apiUrls = {
    doctorsApi: 'http://127.0.0.1:8000/api/doctors',
    clinicsApi: 'http://127.0.0.1:8000/api/clinics',
    reservationsApi: 'http://127.0.0.1:8000/api/reservations',
    authApi: config.api.authApi.getToken,
    authRefresh: config.api.authApi.refreshToken,
  };

  const testApi = async (apiName: string, apiUrl: string) => {
    try {
      const response = await axios.get(apiUrl);
      console.log(`Response from ${apiName}:`, response.data);
    } catch (error) {
      console.error(`Error fetching data from ${apiName}:`, error);
    }
  };

  return (
    <div>
      <h1>API Tester</h1>
      {Object.entries(apiUrls).map(([apiName, apiUrl]) => (
        <button key={apiName} onClick={() => testApi(apiName, apiUrl)}>
          Test {apiName}
        </button>
      ))}
    </div>
  );
};

export default ApiTester;
