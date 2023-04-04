import React from "react";
import { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default function QrScanner() {
  const [id, setId] = useState("");

  const handleScan = (data) => {
    if (data) {
      setId(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const [selectedValue, setSelectedValue] = useState("no");

  const handleOptionChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    // Here you can make a PUT or POST request to your server to update the database with the new value
    axios.put(`/api/status/${id}`, { id: newValue })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/data/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div>
      <div className="text-center mt-2 mt-sm-4 mt-md-5">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "25%" }}
        />
      </div>

      <br />
      <br />
      <div>
        <form>
          <div className="form-group row">
            <label htmlFor="inputId" className="col-sm-2 col-form-label">
              Phone Number :
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputId"
                placeholder="Phone Number"
                defaultValue={id ? id.text : ""}
                onChange={(e) => setId(e.target.value)}
                readOnly
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name :
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                value={data.name}
                readOnly
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <label htmlFor="branch" className="col-sm-2 col-form-label">
              Branch :
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="branch"
                placeholder="Branch"
                value={data.branch}
                readOnly
              />
            </div>
          </div>
          <br />
          <div className="form-group row">
            <label htmlFor="itemCollected" className="col-sm-2 col-form-label">
              Item Collected :
            </label>
            <div className="col-sm-10">
              <div>
                <label>
                  <input
                    type="radio"
                    name="yesNoRadioButtons"
                    value="yes"
                    checked={selectedValue === "yes"}
                    onChange={handleOptionChange}
                  />
                  Yes
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="yesNoRadioButtons"
                    value="no"
                    checked={selectedValue === "no"}
                    onChange={handleOptionChange}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Attendance :
              </label>
              <div className="col-sm-10">
                <div>
                  <label>
                    <input
                      type="radio"
                      name="yesNoRadioButtons"
                      value="yes"
                      checked={selectedValue === "yes"}
                      onChange={handleOptionChange}
                    />
                    Yes
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="yesNoRadioButtons"
                      value="no"
                      checked={selectedValue === "no"}
                      onChange={handleOptionChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primary ">
                UPDATE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
