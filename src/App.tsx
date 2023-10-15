import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./routes/firebase"
import ProtectedRoute from "./components/protected-route"

const router = createBrowserRouter([
  {path: "/",
  element:<ProtectedRoute><Layout /></ProtectedRoute>,
  children:[
    {
      path:"",
      element: <Home />
    },
    {
      path:"profile",
      element:<Profile/>
    }
  ]
},
{
  path:"/login",
  element:<Login />
},
{
  path:"/account",
  element:<CreateAccount/>
}
])

const GolbalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color: black;
  color: white;
}
`


const Wrapper = styled.div`
height: 100vh;
display: flex;
justify-content: center;
`

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
    // setTimeout(() => setIsLoading(false), 2000)
  }
  useEffect(()=>{init()}, [])
  return <Wrapper>
  <GolbalStyles />
  {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </Wrapper>
}

export default App
