import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProductApi from '../fecthApi/ProductApi';
import Page from '../components/Page';

const Edit = () => {
    const [product, setProduct] = useState({});
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await ProductApi.get(id);
            setProduct(data.product);
            reset(data)
            console.log(data);
        }
        getProducts();
    }, [])

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

    const onHandleEditProduct = async (id, product) => {
        await ProductApi.update(id, product);
    }
    const onHandleSubmit = async (data) => {
        const uploads = new FormData();

        uploads.set('name', data.name);
        uploads.set('price', data.price);
        uploads.set('description', data.description);
        uploads.set('countInStock', data.countInStock);
        uploads.set('file', image);

        await onHandleEditProduct(id, uploads)
        navigate(-1)
    }

    return (
        <Page title="Dashboard: Edit">
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="form-floating mb-3">
                    <p htmlFor="product-name">Name</p>
                    <input type="text"
                        className="form-control"
                        id="product-name"
                        placeholder="Name..."
                        defaultValue={product.name}
                        {...register('name', { required: true })}
                    />
                </div>
                <div className="mb-3">
                    <p htmlFor="photo" className="form-label">Image</p>
                    <input type="file" className="form-control"
                        id="photo"
                        placeholder="Image..."
                        {...register('file', { required: true })}
                        onChange={handleUploadImage}
                    />
                    <img src={product.image} height={320} alt="true" />
                </div>
                <div className="form-floating mb-3">
                    <p htmlFor="product-price">Price</p>
                    <input type="number"
                        className="form-control"
                        id="product-price"
                        placeholder="Price..."
                        defaultValue={product.price}
                        {...register('price', { required: true })}
                    />

                </div>
                <div className="form-floating mb-3">
                    <p htmlFor="detail">Description</p>
                    <input type="text"
                        className="form-control"
                        id="detail"
                        placeholder="Description..."
                        defaultValue={product.description}
                        {...register('description', { required: true })}
                    />
                    <div className="form-floating mb-3">
                        <p htmlFor="countInStock" >count In Stock</p>
                        <input type="text"
                            className="form-control"
                            id="countInStock"
                            placeholder="Count In Stock..."
                            defaultValue={product.countInStock}
                            {...register('countInStock', { required: true })}
                        />

                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Page>
    )
}

export default Edit