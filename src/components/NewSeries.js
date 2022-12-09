import React, { Component } from "react";
import axios from "axios";

class NewSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
     const response = axios
      .get("https://localhost:5001/api/Series/GetThisYearSeries")
      .then((json) => {
        this.setState({
          array: json.data.data,
          isLoaded: true
        });
        console.log(json);
      });
  }
  render() {
    const { error, isLoaded, array } = this.state;

    return (
      <div className="mt-4">
        <h4>Yeni Diziler</h4>

        <div className="container mt-4">
        <div className="row">            
          {
          array.slice(0,4).map((item) => (
            <div className="col-md-3" key={item.seriesId}>
              <div className="card" style={{width: "18rem"}}>
              <img src={"SeriesImage/"+ item.seriesImage} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{item.seriesName}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{item.seriesYear}</li>
                <li className="list-group-item">{item.seriesIMDb}</li>
              </ul>
              </div>
            </div>
        ))}         
          </div>
        </div>          
      </div>
    );
  }
}

export default NewSeries;
