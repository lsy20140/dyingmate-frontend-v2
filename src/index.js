import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts/Font.css'
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PlayProvider } from './contexts/Play';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Splash from './pages/Splash';
import App from './App';
import LoginSignup from './pages/LoginSignup';
import Onboarding from './pages/Onboarding';
import PlayerRoom from './pages/PlayerRoom';
import Auth from './pages/Auth';
import GrandmaRoom from './pages/GrandmaRoom';
import ManRoom from './pages/ManRoom';
import WomanRoom from './pages/WomanRoom';
import Final from './pages/Final';
import { RoomFocusProvider } from './contexts/RoomFocus';
import { AuthContextProvider } from './contexts/AuthContext';
import { DiaryContextProvider } from './contexts/DiaryContext';
import { StageContextProvider } from './contexts/StageContext';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement : <NotFound/>,
    children: [
      {index: true, element: <Splash/>},
      {path: '/splash', element: <Splash/>},
      {path: '/main', element: <Main/>},
      {path: '/login', element: <LoginSignup/>},
      {path: '/onboarding', element: <Onboarding/>},
      {path: '/playerroom', element: <PlayerRoom/>},
      {path: '/gmroom', element: <GrandmaRoom/>},
      {path: '/manroom', element: <ManRoom/>},
      {path: '/womanroom', element: <WomanRoom/>},
      {path: '/final', element: <Final/>},
      {path: '/auth', element: <Auth/>},

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <PlayProvider>
        <StageContextProvider>
          <DiaryContextProvider>
            <RoomFocusProvider>
              <RouterProvider router={router} />
            </RoomFocusProvider>
          </DiaryContextProvider>
        </StageContextProvider>
      </PlayProvider>
    </AuthContextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
