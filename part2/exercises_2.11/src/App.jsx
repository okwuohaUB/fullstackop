import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  //
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=> {

    axios
    .get("http://localhost:3001/persons")
    .then(
      (response) => {
        setData(response.data);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <div>Loading ....</div>;
  if (error) return <div>{error}</div>
  return (     
      <div>
      <h1>Data from db.json</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App