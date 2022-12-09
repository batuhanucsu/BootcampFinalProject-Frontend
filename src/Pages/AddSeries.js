import React, { Component } from 'react'
import AddSeriesCard from '../components/AddSeriesCard'
import axios from 'axios'

class AddSeries extends Component {


  render() {


    const addSeries = (url='https://localhost:5001/api/series/add')=>{

      return{

        fetchAll: () => axios.get(url),
        create: newRecord =>axios.post(url,newRecord),
        upadate: (id,updatedRecord)=>axios.put(url + id,updatedRecord),
        delete: id => axios.delete(url+id)
      }
    }

      const addOrEdit = (formData,onSuccess)=>{

        addSeries().create(formData)
        .then(res => {
          onSuccess();
        }).catch(err =>console.log(err));

      }

    return (
      <div>

      <div className="row">
        <div className="col-md-12">
        <div className="mt-4 p-5 bg-secondary bg-gradient text-white rounded text-center">
          <h1>Dizi Ekle</h1>
        </div>
        </div>
      </div>


      <div className="col-md-4">

      <AddSeriesCard  addOrEdit = {addOrEdit}/>
      </div>


      </div>
    )
  }
}

export default AddSeries
