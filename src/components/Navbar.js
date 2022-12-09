import {Link} from "react-router-dom"
import React from 'react'

 function Navbar({token}) {

  const logout = () =>{
    sessionStorage.removeItem('token');
  }
 

  let menu;

  if(token == undefined){

    menu = (
      <div className="navbar-nav ml-auto action-buttons">
      <div className="nav-item dropdown">
          <Link to={"/login"} className="nav-link mr-4" aria-expanded="false">Giriş Yap</Link>
      </div>
      <div className="nav-item dropdown">
          <Link to={"/register"}  className="btn btn-success  sign-up-btn" aria-expanded="false">Kayıt Ol</Link>
      </div>
      </div>
    )
  }
  else{

    menu = (
      <div className="navbar-nav ml-auto action-buttons">
      <div className="nav-item dropdown">
          <Link to={"/"} className="nav-link mr-4" aria-expanded="false" onClick={logout}>Çıkış Yap</Link>
      </div>
      </div>
    )
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link to={"/"} className="navbar-brand" ><b>Dizi</b>kolik</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" >Arşiv</a>
                </li>
            </ul>
            <form className="d-flex ">
                <input className="form-control me-2" type="search" placeholder="Arama Yapın" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Ara</button>
            </form>

                {menu}
           
            </div>
        </div>
</nav>  
      </div>
  )
}

export default Navbar;

