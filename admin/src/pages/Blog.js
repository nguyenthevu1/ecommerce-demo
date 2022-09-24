import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// material
import { Container, Grid, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import ProductApi from '../fecthApi/ProductApi';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export default function Blog() {
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onHandleAdd = async (product) => {
    await ProductApi.add(product);
  };

  const handleUploadImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const onHandleSubmit = async (data) => {
    const uploads = new FormData();

    uploads.set('name', data.name);
    uploads.set('price', data.price);
    uploads.set('description', data.description);
    uploads.set('countInStock', data.countInStock);
    uploads.set('file', image);

    await onHandleAdd(uploads);
    navigate('/dashboard/products');
  };
  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Product
          </Typography>
        </Stack>

        <Grid>
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="form-floating mb-3 mt-3">
              <p htmlFor="product-name">Name</p>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Name..."
                {...register('name', { required: true })}
              />
              {errors.name && <span className="text-danger mt-2">This field is required</span>}
            </div>
            <div className="form-floating mb-3">
              <p htmlFor="price">Price</p>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Price..."
                {...register('price', { required: true })}
              />
              {errors.price && <span className="text-danger mt-2">This field is required</span>}
            </div>
            <div className="form-floating mb-3">
              <p htmlFor="countInStock">count In Stock</p>
              <input
                type="text"
                className="form-control"
                id="countInStock"
                placeholder="Count In Stock..."
                {...register('countInStock', { required: true })}
              />
              {errors.countInStock && <span className="text-danger mt-2">This field is required</span>}
            </div>
            <div className="form-floating mb-3">
              <p htmlFor="price">Description</p>
              <textarea
                type="text"
                className="form-control"
                id="detail"
                placeholder="Description..."
                {...register('description', { required: true })}
              />
              {errors.description && <span className="text-danger mt-2">This field is required</span>}
            </div>
            <div className="mb-3">
              <p htmlFor="photo">Photo</p>
              <input
                type="file"
                className="form-control"
                id="photo"
                {...register('file', { required: true })}
                onChange={handleUploadImage}
              />
              {errors.image && <span className="text-danger mt-2">This field is required</span>}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Grid>
      </Container>
    </Page>
  );
}
