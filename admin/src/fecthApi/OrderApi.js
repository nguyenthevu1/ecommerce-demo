import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api/orders',
});
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';

const OrderApi = {
  getAll() {
    const url = `/all`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },

  turnover() {
    const url = `/turnover`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
  delivered(id) {
    const url = `/update/${id}`;
    return axiosClient.put(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
  detailOrder(id) {
    const url = `/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
};
export default OrderApi;
