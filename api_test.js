const axios = require('axios');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

const HOST = 'localhost';
const PORT = 8000;
const BASE_URL = `http://${HOST}:${PORT}/api`;
const OUTPUT_FILE = 'api_endpoints_output.txt';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const loginCredentials = {
  username: 'abhi',
  password: 'password',
};

const endpoints = [
  { endpoint: `/course/list/`, method: 'GET' },
  { endpoint: `/course/detail/1/`, method: 'GET' },
  { endpoint: `/course/create/`, method: 'POST', data: { name: 'New Course', price: 100 } },
  { endpoint: `/course/update/1/`, method: 'PUT', data: { name: 'Updated Course', price: 200 } },
  { endpoint: `/course/delete/1/`, method: 'DELETE' },
  { endpoint: `/course/subscribed/`, method: 'GET' },
  { endpoint: `/weeks/1/`, method: 'GET' },
  { endpoint: `/week/create/`, method: 'POST', data: { course: 1, week_number: 2 } },
  { endpoint: `/week/1/update/`, method: 'PUT', data: { week_number: 3 } },
  { endpoint: `/week/1/delete/`, method: 'DELETE' },
  { endpoint: `/weeks/1/days/`, method: 'GET' },
  { endpoint: `/days/1/`, method: 'GET' },
  { endpoint: `/days/create/`, method: 'POST', data: { week: 1, description: 'New Day' } },
  { endpoint: `/days/1/update/`, method: 'PUT', data: { description: 'Updated Day' } },
  { endpoint: `/days/1/delete/`, method: 'DELETE' },
  { endpoint: `/days/1/exercises/`, method: 'GET' },
  { endpoint: `/exercise/1/`, method: 'GET' },
  { endpoint: `/exercise/create/`, method: 'POST', data: { day: 1, title: 'New Exercise' } },
  { endpoint: `/exercise/1/update/`, method: 'PUT', data: { title: 'Updated Exercise' } },
  { endpoint: `/exercise/1/delete/`, method: 'DELETE' },
  { endpoint: `/payment/create-payment-intent/`, method: 'POST', data: { courseId: 1 } },
  { endpoint: `/payment/stripe-webhook/`, method: 'POST', data: { some: 'payload' } },
  { endpoint: `/user/register/`, method: 'POST', data: { username: 'newuser', password: 'password' } },
  { endpoint: `/user/create_admin_user/`, method: 'POST', data: { username: 'adminuser', password: 'password' } },
  { endpoint: `/user/current_user_detail/`, method: 'GET' },
  { endpoint: `/user/update/1/`, method: 'PUT', data: { username: 'updateduser', password: 'updatedpass' } },
  { endpoint: `/user/delete/1/`, method: 'DELETE' },
  { endpoint: `/token/`, method: 'POST', data: { username: 'abhi', password: 'password' } },
];

const getToken = async () => {
  try {
    const response = await api.post('/token/', loginCredentials);
    return response.data.access;
  } catch (error) {
    console.error('Error fetching token:', error.response ? error.response.data : error.message);
    process.exit(1);
  }
};

const makeRequest = async (endpoint, method, data, token) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (method === 'POST' || method === 'PUT') {
      config.data = data;
    }
    const response = await api(config);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error.message;
  }
};

const testEndpoints = async () => {
  await writeFile(OUTPUT_FILE, '');

  const token = await getToken();

  for (const { endpoint, method, data } of endpoints) {
    const result = await makeRequest(endpoint, method, data, token);

    await appendFile(OUTPUT_FILE, `Endpoint: ${BASE_URL}${endpoint}\n`);
    await appendFile(OUTPUT_FILE, `Method: ${method}\n`);
    if (data) {
      await appendFile(OUTPUT_FILE, `Data: ${JSON.stringify(data)}\n`);
    }
    await appendFile(OUTPUT_FILE, `Response: ${JSON.stringify(result, null, 2)}\n`);
    await appendFile(OUTPUT_FILE, `\n`);
  }

  console.log('API testing completed. Check the output file for details.');
};

testEndpoints();
