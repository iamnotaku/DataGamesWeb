import React, {useState, useEffect} from 'react'
import axios from 'axios';




function ReservedArea() {

  const [giochi, setGiochi] = useState([]);
  const [generi, setGeneri] = useState([]);
  const [autori, setAutori] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/reserved_area")
    .then(res => {
      setGeneri(res.data);
    })
    .catch((error) => console.error("Error", error));
  }, []);

  const handleEntries = (event) => {
      event.preventDefault();
  }


  return (
    <div className='d-flex container-fluid justify-content-left bg-dark vh-100'>
      <h1 className=''></h1>
      <form onSubmit={handleEntries}>
        <div className='mb-3 w-25 mt-5 ms-5'>
          <label className='text-light'>Select Genres for the Videogame:</label>
          <select className='form-control-sm rounded mt-2 p-1'>
              <option value="0"></option>
              {generi.map((genere) => (
                <option key={genere.id_genere} value={genere.id_genere}>{genere.genere}
                </option>
              ))}
          </select>
          <select className='form-control-sm rounded mt-2 p-1'>
              <option value="0"></option>
              {generi.map((genere) => (
                <option key={genere.id_genere} value={genere.id_genere}>{genere.genere}
                </option>
              ))}
          </select>
          <select className='form-control-sm rounded mt-2 p-1'>
              <option value="0"></option>
              {generi.map((genere) => (
                <option key={genere.id_genere} value={genere.id_genere}>{genere.genere}
                </option>
              ))}
          </select>
          <select className='form-control-sm rounded mt-2 p-1'>
              <option value="0"></option>
              {generi.map((genere) => (
                <option key={genere.id_genere} value={genere.id_genere}>{genere.genere}
                </option>
              ))}
          </select>
          <select className='form-control-sm rounded mt-2 p-1'>
              <option value="0"></option>
              {generi.map((genere) => (
                <option key={genere.id_genere} value={genere.id_genere}>{genere.genere}
                </option>
              ))}
          </select>
        </div>
        
          
      </form>
      
    </div>
  )
}

export default ReservedArea