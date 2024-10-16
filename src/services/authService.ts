import axios from 'axios';

const apiUrl = 'https://reqres.in/api';

export const signinService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/signin`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    return null;
  }
};

export const signupService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/signup`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Signup failed', error);
    return null;
  }
};
