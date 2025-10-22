import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo192x50.png';
import './Home.css';
import ShinyText from './ShinyText';

function Home() {

  const [auth, setAuth] = useState(false);
  const [username, setName] = useState('');
  const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8080')
    .then(res => {
      if(res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.username);
        navigate('/');
        if(res.data.permission === "administrator"){
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } else {
        setAuth(false);
      }
    })
    .then(err => console.log(err));
  }, [])

  const handleLogout = () => {
      axios.get('http://localhost:8080/logout')
      .then(res => {
          window.location.reload(true);
      }).catch(err => console.log(err));
  }

  return (
    <body>
        <nav className="navbar navbar-dark bg-dark text-light">
            <div className='container-xxl p-1'>
                <a href=""><img src={logo} class= "logo d-flex navbar-brand justify-content-center" href=''/></a>
                  {
                      auth 
                      ?
                      <div className='d-flex justify-content-end p-1'>
                          <h3 className='p-1'>{username}</h3>
                          {
                            admin 
                            ?
                            <div className='p-1'>
                              <Link to='/area_riservata' className='btn btn-outline-light ms-lg-3'><ShinyText text='Area Riservata' speed={3}></ShinyText></Link>
                            </div>
                            :
                            <div></div>
                          }
                          <div className='p-1'>
                            <button className='btn btn-outline-light ms-lg-2' onClick={handleLogout}><ShinyText text='Logout' speed={3}></ShinyText></button>
                          </div>
                          
                      </div>
                      :
                      <div className='d-flex justify-content-end'>
                          <div className='p-1'>
                              <Link to='/login' className='btn btn-outline-light ms-lg-2'><ShinyText text='Login' speed={3}></ShinyText></Link>
                          </div>
                          <div className='p-1'>
                              <Link to='/register' className='btn btn-outline-light ms-lg-2'><ShinyText text='Register' speed={3}></ShinyText></Link>
                          </div>
                      </div>
                  }
            </div>
        </nav>
    </body>
    
    
    )
}

export default Home