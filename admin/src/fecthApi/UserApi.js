import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';

const UserApi = {
  getAll() {
    const url = ``;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
  post(data) {
    const url = `/login`;
    return axiosClient.post(url, data);
  },
};
export default UserApi;
