/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/header';
import BodyContainer from '../components/bodyContainer';
import Channels from '../components/channels';
import Messages from '../components/messages';

const MainPage = () => {
  const vdom = (
    <BodyContainer>
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
    </BodyContainer>
  );
  return vdom;
};

export default MainPage;
