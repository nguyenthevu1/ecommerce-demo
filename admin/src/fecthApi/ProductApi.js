import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api/products',
});
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';

const ProductApi = {
  getAll() {
    const url = ``;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
  add(product) {
    const url = ``;
    return axiosClient.post(url, product, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
  delete(id) {
    const url = `/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
  get(id) {
    const url = `/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
  update(id, data) {
    const url = `/${id}`;
    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
  },
};
export default ProductApi;
