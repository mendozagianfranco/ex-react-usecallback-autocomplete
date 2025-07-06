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

  const getList = useCallback(debounce(async (query) => {
    if (!query.trim()) {
      setList([]);
      return;
    };
    try {
      const response = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await response.json();
      setList(data);
      console.log('chiamata API');
    } catch (error) {
      console.error(error);
    }
  }, 300), []);

  // Altro metodo 
  // const debouncedGetList = useCallback(
  //   debounce(getList, 500)
  //   , []);

  function viewDetailsProduct() {
    console.log('dettagli');

  }


  useEffect(() => {
    getList(query);
  }, [query]);

  return (
    <>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {list.length > 0 && list.map(l => (
          <li key={l.id}>
            <p>{l.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
