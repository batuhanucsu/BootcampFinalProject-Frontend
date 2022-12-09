import React,{useEffect,useState} from 'react'
import axios from 'axios';


export default function GenreCheckBox(props) {
  const [genre,setGenre] = useState([]);
  const [checkedValues,setValue]= useState([]);
  useEffect(() =>{
    axios.get("https://localhost:5001/api/Genre/getAllGenre")
    .then(response =>setGenre(response.data.data))
    .catch(err=> console.log({err}));
     
  },[]);

  function handleChange (e){

    const {value,checked} = e.target;

    if(checked)
    {
      setValue(pre => [...pre,value])
    }else{


      setValue(pre => {
        return  [...pre.filter(skill => skill !== value)]

      })      
    }

  }

  console.log(checkedValues);

  return (
            <div>
            <div className="dropdown mt-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Dizi Türü
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                         genre.map((item) => (
                            <li  key = {item.genreId}>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value={item.genreName} id="flexCheckDefault" onChange={handleChange}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                {item.genreName}
                                    </label>
                                </div>
                            </li>                   
                ))}  

            </ul>
            </div>
        </div>
  )
}
