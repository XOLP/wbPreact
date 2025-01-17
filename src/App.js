import React, { useState } from'react';
import axios from 'axios';

import './App.css';
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://wbcraper.onrender.com/wb/parse');
      const data = response.data;
      const productsList = [];

      data.forEach(item => {
        item.Ret.forEach(product => {
          productsList.push({
            id: product.Id,
            name: product.Name,
            price: product.Price,
            points: product.Points,
            url: product.Url,
            urlImg: product.UrlImg,
          });
        });
      });

      setProducts(productsList);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Список товаров</h1>
      <button onClick={fetchProducts} disabled={loading} className={loading? 'loading-button' : 'button'}>
        {loading? 'Загрузка...' : 'Загрузить товары'}
      </button>
      {loading? (
        <p>Загрузка...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}> 
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>Цена: {product.price}</p>
              <p>Балл: {product.points}</p>
              <img src={product.urlImg} alt={product.name} />
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <button className="btn">Перейти к товару</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;