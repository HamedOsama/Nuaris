import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

// filepond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const HostForm = ({ setFormSelection }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const handleSelectCountry = countryCode => {
    setSelectedCountry(countryCode);
  };

  const handleBackButtonClick = e => {
    e.preventDefault();
    setFormSelection("");
  };

  return (
    <div className="regiesteration-form">
      <div className="container p-0">
        <div className="row m-0">
          {/* First Name , Last Name */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field mb-3">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="Ex: mahmoud"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Family Name</label>
              <input
                type="text"
                placeholder="Ex: mahmoud"
                id="lastName"
                name="lastName"
              />
            </div>
          </div>
          {/* Logo */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="logo">Upload Your Logo</label>
              <FilePond
                stylePanelLayout="compact"
                acceptedFileTypes={["image/*"]}
                labelIdle="LOGO"
                stylePanelAspectRatio="0.5"
              />
            </div>
          </div>
          {/* email */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="email">Email Address</label>
              <input
                placeholder="EX: mail@mail.com"
                type="email"
                id="email"
                name="email"
              />
            </div>
          </div>
          {/* mobile number */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="phone">Mobile Number</label>
              <input
                placeholder="EX: mail@mail.com"
                type="tel"
                id="email"
                name="email"
              />
            </div>
          </div>
          {/* user Name */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="userName">Username</label>
              <input
                placeholder="EX: mahmoudgmal"
                type="text"
                id="userName"
                name="userName"
              />
            </div>
          </div>
          {/* password */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <div className="pass-group">
                <input
                  placeholder="************"
                  type={showPass ? "text" : "password"} // Corrected the type based on showPass state
                  id="password"
                  name="password"
                />
                <button onClick={() => setShowPass(!showPass)}>
                  <i
                    className={`fa-regular ${!showPass
                      ? "fa-eye-slash"
                      : "fa-eye"}`}
                  />
                </button>
              </div>
            </div>
          </div>
          {/* Commercial Name */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="commercialName">Commercial Name</label>
              <input
                placeholder="EX: luxury "
                type="text"
                id="commercialName"
                name="commercialName"
              />
            </div>
          </div>
          {/* Commercial registration Type */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="commercialRegistrationType">
                Commercial registration Type
              </label>
              <select
                name="commercialRegistrationType"
                id="commercialRegistrationType"
              >
                <option value="freelancer">freelancer</option>
              </select>
            </div>
          </div>
          {/*Commercial registration Number*/}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="commercialName">
                Commercial registration Number
              </label>
              <input
                placeholder="XXXX XXXX XXXX XXXX"
                type="text"
                id="commercialName"
                name="commercialName"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="commercialName">Commercial Name</label>
              <input
                placeholder="EX: luxury "
                type="text"
                id="commercialName"
                name="commercialName"
              />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="buttons">
              <button className="back" onClick={handleBackButtonClick}>
                <i className="fa-light fa-arrow-left" />
              </button>
              <button type="submit" className="log">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostForm;
