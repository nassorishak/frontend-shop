import React, { useEffect, useState } from 'react'
import Navigation from '../navigation/Navigation'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewProducts = () => {

    const [data , setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:8080/api/product/get/product')
        .then((response)=>{
            setData(response.data);
        })
        .catch((error) => {
            setError(error.message);
        })
    }, [])

  return (
    <><Navigation />
    <div className='main'>
     <h1 style={{marginTop:"14px"}}>Customer View Product</h1>
     {error ? (
       <p>Error: {error}</p>
     ) : (
       <table>
            <thead>
                <tr>
                    <th>ProductId</th>
                   <th>productImage</th>
                   <th>productName</th>
                    <th>productDescription</th>
                    <th>price</th>
                    <th>Category</th>
                    <th>action</th>

                </tr>
            </thead>
            <tbody>

                
                {data.map((item, index)=>(
                <tr key={index}>
                <td>{item.productId}</td>
                <td>  <img src={`data:image/png;base64, ${item.image}`} alt="image2" style={{ width: '100px', height: 'auto' }} /></td>
                <td>{item.productName}</td>
                <td>{item.productDescription}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td> <Link to={`/makeorder/${item.productId}`}> <button class="edit-btn">order</button></Link></td>
            </tr>
                ))}

               
         
                {/* <!-- Add more rows as needed --> */}
            </tbody>
        </table>
     )}
     {data.length === 0 && !error ? (
       <p>No products found</p>
     ) : null}
        </div>

      </>
  )
}

export default ViewProducts