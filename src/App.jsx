import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);

  const getList = async (query) => {
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
  };

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
