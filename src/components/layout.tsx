import { Outlet } from "react-router-dom"

export default function Layout(){
  return(
    <>
    <h2>hello its just layout</h2>
    <Outlet />
    </>
  )
}