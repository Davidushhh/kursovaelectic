import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import Cookies from 'js-cookie';
import Header from '../../components/header';
import './MainPage.css'

const UnLogView = () => {
  return (
    <div className='maincontainer'>
          <div className='container1'>
      <h1>
        You need to log in
        </h1>
        <Header page='main' />
      </div>
      
      </div>
  )
}

const MainPage = () => {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [searchHistory, setSearchHistory] = useState([]); 
  const userId = Cookies.get('userId');

  const handleSearch = async () => {
    if (address.trim() === '') {
      setMessage('Please enter an address');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/search', { address }, { withCredentials: true });
      console.log(response.data);

      const data = response.data;
      const timeRange = data[0];
      const hasLight = data[1];

      let result;
      if (hasLight === 1) {
        result = `Світло є з ${timeRange[0]}:00 до ${timeRange[1]}:00`;
      } else {
        result = `Світла нема з ${timeRange[0]}:00 до ${timeRange[1]}:00`;
      }

      setMessage(result);
    } catch (error) {
      console.error(error);

    }
  };


  const handlePlaceSelect = (selectedPlace) => {
    setAddress(selectedPlace);
  };

  const API_KEY = 'AIzaSyBTbu0rMoO7yVwAUTP3GT6Td0rS4WJqSgo';
  const loadGoogleMapsAPI = () => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.body.appendChild(googleMapsScript);
    googleMapsScript.onload = initAutocomplete;
  };

  const initAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('address-input'), {
      types: ['geocode'],
      componentRestrictions: { country: 'ua' },
    });
    autocomplete.addListener('place_changed', () => {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.formatted_address) {
        handlePlaceSelect(selectedPlace.formatted_address);
      }
    });
  };

  const handleHistoryClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/allsearch', { withCredentials: true });
      console.log(response.data);

      setSearchHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchFromHistory = (searchAddress) => {
    setAddress(searchAddress);
    handleSearch();
  };

  useEffect(() => {
    loadGoogleMapsAPI();
  }, []);

  return (
    (userId ?
    <>
    <div className='searchcnt'>
      < Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <TextField
              id="address-input"
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin="normal"
              fullWidth
              required
              InputProps={{
                autoComplete: 'off',
              }}
            />
            <Button style={{marginLeft:"20px"}} variant="contained" onClick={handleSearch}>
              Search
            </Button>
            {message && <p>{message}</p>}

            <Button style={{marginLeft:"120px"}} variant="contained" onClick={handleHistoryClick}>
              Get Search History
            </Button>
            {searchHistory.length > 0 && (
              
              <ul>
                {searchHistory.map((item) => (
              
                  <li className='lishka' key={item._id} onClick={() => handleSearchFromHistory(item.searchAddress)}>

                    {item.searchAddress}
                  </li>
                ))}
              </ul>

            )}
          </div>
        </div>
      </div>
      </div>
    </>
    
    : <UnLogView />)
  );

};

export default MainPage;