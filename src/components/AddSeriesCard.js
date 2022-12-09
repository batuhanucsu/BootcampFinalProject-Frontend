import React, {useState,useEffect} from "react";
import GenreCheckBox from "./GenreCheckBox";
import axios from "axios";

const defaultImageSrc = "/SeriesImage/image_placeholder.jpg"
const initialFieldValues = {
    seriesId: 0,
    seriesName: '',
    description: '',
    seriesYear: 0,
    seriesIMDb: 0.0,
    seriesImage: '',
    seriesImageSrc:defaultImageSrc,
    seriesImageFile:null,
    isDeleted:false,
    stringifyJsonData: ''

}
export default function (props) {
    const {addOrEdit} = props
    const [values,setValues] = useState(initialFieldValues)
    const [errors,setErrors] = useState({})
    const [genre,setGenre] = useState([]);
    const [checkedValues,setValue]= useState([]);
    useEffect(() =>{
      axios.get("https://localhost:5001/api/Genre/getAllGenre")
      .then(response =>setGenre(response.data.data))
      .catch(err=> console.log({err}));
       
    },[]);
    


    const handleInputChange = e=>{
        const {name,value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }
    const showPreview = e => {

        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload  = x =>{
                setValues({
                    ...values,
                    seriesImageFile:imageFile,
                    seriesImageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }else{
            setValues({
                ...values,
                seriesImageFile:null,
                seriesImageSrc: defaultImageSrc
            })
        }
    }
    const validate =()=>{
        let temp = {}
        temp.seriesName = values.seriesName == ""? false:true;
        temp.seriesImageSrc = values.seriesImageSrc==defaultImageSrc?false:true;
        setErrors(temp)
        return Object.values(temp).every(x=>x==true)
    }
    const resetForm = () =>{
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }
    const handleForSubmit = e=> {
        e.preventDefault()
        if(validate()){
            const formData = new FormData();
            formData.append('seriesId',values.seriesId)
            formData.append('seriesName',values.seriesName)
            formData.append('description',values.description)
            formData.append('seriesYear',values.seriesYear)
            formData.append('seriesIMDb',values.seriesIMDb)
            formData.append('seriesImage',values.seriesImage)
            formData.append('seriesImageFile',values.seriesImageFile)
            formData.append('isDeleted',values.isDeleted)

            let array = [];          
            for(let i=0;i < checkedValues.length;i++)
            {
                let object = {
                    
                    GenreId: checkedValues[i]
                }

                array.push(object)

            }

            formData.append('stringifyJsonData',JSON.stringify(array))

            console.log("genreSeries",array)

            addOrEdit(formData,resetForm)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field]==false) ? 'invalid-field':'')
  
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


  return (
    <>
      <form autoComplete="off" noValidate className="mt-4" onSubmit={handleForSubmit}>

      <div className="card">
      <img src={values.seriesImageSrc} className="card-img-top"  />
        <div className="card-body">

        <div className="form-group">
            <input type="file" className={"form-control-file"+applyErrorClass('seriesName')} accept="image/*" onChange={showPreview} id="image-uploader" />
        </div>
        <div className="form-group mt-2">
            <label htmlFor="seriesName" className="form-label">Series Name</label>
            <input  className="form-control" placeholder="Series Name" name="seriesName" value={values.seriesName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <input  className="form-control" placeholder="Description" name="description" value={values.description} onChange={handleInputChange} />
        </div>
        <div className="form-group">
            <label htmlFor="seriesYear" className="form-label">Series Year</label>
            <input  className="form-control" placeholder="Series Year" name="seriesYear" value={values.seriesYear} onChange={handleInputChange}  />
        </div>
        <div className="form-group">
            <label htmlFor="seriesIMDb" className="form-label">Series IMDb</label>
            <input  className="form-control" placeholder="Series IMDb" name="seriesIMDb" value={values.seriesIMDb} onChange={handleInputChange} />
        </div>
        <div className="dropdown mt-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Dizi Türü
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                         genre.map((item) => (
                            <li  key = {item.genreId}>
                                <div className="form-check">
                                    <input className="form-check-input" name="genreSeries" type="checkbox" value={item.genreId} id="flexCheckDefault" onChange={handleChange}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                {item.genreName}
                                    </label>
                                </div>
                            </li>                   
                ))}  

            </ul>
            </div>
        <div className="form-group text-center mt-4">
            <button type="submit" className="btn btn-success">Ekle</button>
        </div>

        </div>
      </div>
      </form>
    </>
  );
}
