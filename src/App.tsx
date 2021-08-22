import React from 'react';
import Row from './Components/Row'
import Banner from './Components/Banner'
import Nav from './Components/Nav'
import {requests} from './utils/request'
import './App.css';


const App = () => {
  return (
    <div className="App">
      <Nav/>
      <Banner/>
      <Row 
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.feactTopRated}
        isLargeRow
      />
      <Row title="Top Rated" fetchUrl={requests.feactTopRated} />
      <Row title="Action Movies" fetchUrl={requests.feactActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.feactComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.feactHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.feactRomanceMovies} />
      <Row title="DOcumentaries" fetchUrl={requests.feactDocumentMovies} />
    </div>
  );
}

export default App;
