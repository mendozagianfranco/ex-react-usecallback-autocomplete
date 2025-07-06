import { useCallback, useEffect, useState } from 'react';

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}


function App() {
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);
  const [detailsProduct, setDetailsProduct] = useState(null);

  const getList = useCallback(debounce(async (query) => {
    if (!query.trim()) {
      setList([]);
      return;
    };
    try {
      const response = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error(error);
    }
  }, 300), []);

  // Altro metodo 
  // const debouncedGetList = useCallback(
  //   debounce(getList, 500)
  //   , []);

  async function viewDetailsProduct(id) {
    setQuery('');
    setList([]);
    const response = await fetch(`http://localhost:3333/products/${id}`);
    const data = await response.json();
    setDetailsProduct(data);
  }


  useEffect(() => {
    if (detailsProduct) {
      setDetailsProduct(null);
    }
    getList(query);
  }, [query]);

  return (
    <>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {list.length > 0 && list.map(l => (
          <li key={l.id}>
            <p style={{ cursor: 'pointer' }} onClick={() => viewDetailsProduct(l.id)}>{l.name}</p>
          </li>
        ))}
      </ul>
      {detailsProduct &&
        (<div>
          <p>{detailsProduct.name}</p>
          <img src={detailsProduct.image} alt={detailsProduct.name} />
          <p>Price: {detailsProduct.price}</p>
          <p>{detailsProduct.description}</p>
        </div>)
      }
    </>
  );
}

export default App;
