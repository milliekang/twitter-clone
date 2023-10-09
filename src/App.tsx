import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"

const router = createBrowserRouter([
  {path: "/",
  element:<Layout />,
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    setIsLoading(false);
    // setTimeout(() => setIsLoading(false), 2000)
  }
  useEffect(()=>{init()}, [])
  return <>
  <GolbalStyles />
  {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </>
}

export default App
