import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import {ContactProvider} from "./context/ContactContext";

//Components
import Main from "./components/Main";
import Login from "./components/Login";
import Chat from "./components/Chat/ChatWrapper";
import ErrorPage from "./components/ErrorPage";
import ChatRight from "./components/Chat/Right/ChatRight";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Main/>}>
          <Route path="login" element={<Login/>} />
          <Route path="user" element={<Chat/>} >
            <Route path=":chatId" element={<ChatRight />} />
          </Route>
          <Route path="*" element={<ErrorPage/>} />
        </Route>
    )
)

const App = () => {

  return (
      <ContactProvider>
        <RouterProvider router={router} />
      </ContactProvider>
  )
};

export default App;