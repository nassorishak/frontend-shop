import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';


const AManageProducts = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/product/get/product');
                setData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    const handleUpdateStart = (item) => {
        setCurrentProduct(item);
        setImage(null);
        setIsEditing(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const { productId, productName, productDescription, price, category } = currentProduct;

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('price', price);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/product/update/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setData(data.map(item => (item.productId === productId ? response.data : item)));
            setCurrentProduct({});
            setIsEditing(false);
            setImage(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/product/delete/${productId}`);
            setData(data.filter(item => item.productId !== productId));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Navigation />
            <div className='main'>
                <h1>Manage Products</h1>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        {isEditing ? (
                            <form className='edit-form' onSubmit={handleUpdateSubmit}>
                                <h2>Edit Product</h2>
                                <input
                                    type="text"
                                    value={currentProduct.productName}
                                    onChange={e => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
                                    placeholder="Product Name"
                                    required
                                />
                                <textarea
                                    value={currentProduct.productDescription}
                                    onChange={e => setCurrentProduct({ ...currentProduct, productDescription: e.target.value })}
                                    placeholder="Product Description"
                                    required
                                />
                                <input
                                    type="number"
                                    value={currentProduct.price}
                                    onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                    placeholder="Price"
                                    required
                                />
                                <input
                                    type="text"
                                    value={currentProduct.category}
                                    onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                    placeholder="Category"
                                    required
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImage(e.target.files[0])}
                                />
                                {image && <p>Selected Image: {image.name}</p>}
                                <div className='button-group'>
                                    <button type="submit">Update Product</button>
                                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ProductId</th>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Product Description</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        data.map((item) => (
                                            <tr key={item.productId}>
                                                <td>{item.productId}</td>
                                                <td>
                                                    <img
                                                        src={`data:image/png;base64, ${item.image}`}
                                                        alt={item.productName}
                                                        style={{ width: '100px', height: 'auto' }}
                                                    />
                                                </td>
                                                <td>{item.productName}</td>
                                                <td>{item.productDescription}</td>
                                                <td>{item.price}</td>
                                                <td>{item.category}</td>
                                                <td>
                                                    <button type="button" onClick={() => handleUpdateStart(item)}>
                                                        Update
                                                    </button>
                                                    
                                                </td>
                                                <td><button style={{ background: "red" }} onClick={() => handleCancel(item.productId)}>
                                                        Delete
                                                    </button></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7}>No products found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default AManageProducts;