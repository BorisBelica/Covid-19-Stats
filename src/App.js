// Imports
import React from 'react';
import axios from 'axios'

import { useState, useEffect } from 'react'
import { debounce } from 'lodash-es'

// SASS 
import './App.scss';



// FUNCTION REACT APP
function App() {

  // STATES
  const [searchTerm, setSearchTerm] = useState('')
  const [covidData, setCovidData] = useState({})

  // USE EFFECTS
  //ON START
  useEffect( () => {
    HandleSearch('Global')
  }, [])

  function capitalize(s) {
  if (s) { return s[0].toUpperCase() + s.slice(1); }
  else {return s}
  }

  

  // CONST
  const searchInput = React.createRef();

  // HANDLE INPUT
  const handleInput = debounce((e) => {
        e.preventDefault()  // zabrani refreshu stranky
        let searchString = capitalize(searchInput.current?.value)
        searchForCountry(searchString)     
  }, 500)

  // SEARCH COUNTRY BY INPUT
  const searchForCountry = (props) => {
      if (props) {
        setSearchTerm(props)
        HandleSearch(props)
        console.log(props) 
      }    
  }

  // HANDLE SEARCH BY INPUT
  const HandleSearch = (searchTerm) => {

    const options = {
      method: 'GET',
      url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total',
      params: {country: searchTerm},
      headers: {
        'x-rapidapi-key': '5887708be4mshe394273298482adp1f8338jsn7935c6be724e',
        'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
      }
    };

    axios.request(options)
            .then(function (response) {
                console.log(response.data.data)
                setCovidData(response.data.data)
            })
            .catch(function (error) {
            console.error(error);
            });
  }

  // ON CHANGE IN INPUT
  useEffect( () => {
    searchForCountry()
  }, [searchTerm])





  // Template
  return (
    <div className="App">
      <header className="App-header">
      <h1>COVID-19 STATS</h1>
      </header>

      <main className="App-body">

      <div className="search-box">
      <p>Search your country</p>
      <form>
                <input 
                    autoFocus
                    type="text"
                    ref={searchInput}
                    className="search-bar"
                    onChange={handleInput}
                    placeholder="Country?"
                >
                </input>
            </form>
      </div>

            <div className="stats-list">
              <h2>{covidData.location}</h2>
              <p>Confirmed: <span className="confirmed">{covidData.confirmed} </span></p>
              <p>Recovered: <span className="recovered">{covidData.recovered}</span></p> 
              <p>Deaths: <span className="deaths">{covidData.deaths}</span></p>
              <p><span className="time">{covidData.lastReported}</span></p>  
          </div>
     </main>

     <footer className="App-footer">
        <p>Created by: Boris Belica</p>
       <p className="who">Official statistics from <a href="https://covid19.who.int/" rel="noreferrer" target="_blank">WHO</a></p>  
       </footer>
    </div>
  );
}

export default App;
