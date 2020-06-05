import React from 'react';
import Header from '../Header/Header';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <Header />

    <div className='techs'>
      <h2>Technologies</h2>
      <p>HTML |
      CSS |
      Node |
      Express |
      React |
      React-Redux |
      Redux-Sagas |
      PostgresSQL |
      Passport |
      Heroku |
      Material-UI |
      SweetAlert2
      </p>
    </div><br />
    <div className="attribution">
      <h2>Attribution</h2>

      Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      <div>Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icons made by <a href="https://www.flaticon.com/free-icon/box_685387" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></div>
  </div>

);

export default AboutPage;
