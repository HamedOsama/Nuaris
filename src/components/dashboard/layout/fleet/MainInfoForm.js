import React, { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import SelectField from "./../../../ui/form-elements/SelectField";
import CommentField from "./../../../ui/form-elements/CommentField";
import InputWithUnit from "../../../ui/form-elements/InputWithUnit";
import FilesUpload from "../../../ui/form-elements/FilesUpload";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { toast } from "react-toastify";
import axios from "./../../../../util/axios";

const MainInfoForm = ({ setForm }) => {
  const [formData, setFormData] = useState({
    type: "select",
    brand: "select",
    name_en: "",
    name_ar: "",
    number: "",
    license_number: "",
    license_file: "",
    license_expire_date: "",
    preparation_time: "",
    description_en: "",
    description_ar: ""
  });
  const [loading, setLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Location");
  };

  const headersList = {
    Accept: "*/*",
    "Content-Type": "multipart/form-data"
  };
  const requestOptions = {
    method: "POST",
    url: "/yachts/",
    headers: headersList,
    data: formData
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.request(requestOptions);
      console.log("response =>", response);
      setForm("Location");
    } catch (error) {
      console.log("error =>", error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Main Info</h6>
        </div>
        {/* boat type */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            htmlFor="type"
            label="Boat Type"
            id="boatType"
            value={formData.type}
            formData={formData}
            setFormData={setFormData}
            options={["Motor", "Sailing", "Catamaran"]}
          />
        </div>
        {/* vessel brand */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            htmlFor="brand"
            label="Vessel Brand"
            id="vesselBrand"
            value={formData.brand}
            formData={formData}
            setFormData={setFormData}
            options={["brand1", "brand2", "brand3"]}
          />
        </div>
        {/* vessel name english */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            htmlFor="name_en"
            label="Vessel Name"
            hint="( English )"
            id="vesselName"
            placeholder="Write here"
            value={formData.name_en}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel name arabic */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            htmlFor="name_ar"
            label="Vessel Name"
            hint="( عربى )"
            id="vesselName"
            placeholder="Write here"
            value={formData.name_ar}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel number */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            htmlFor="number"
            label="Vessel Number"
            placeholder="Write here"
            id="vesselNumber"
            value={formData.number}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel license number */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            htmlFor="license_number"
            label="Vessel license Number"
            value={formData.license_number}
            placeholder="Write here"
            id="vesselLicenseNumber"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* Vessel License and registration */}
        <div className="col-12 p-2">
          <FilesUpload
            htmlFor="files"
            label="Vessel License and registration"
            labelIdle="Drag & Drop your files or Browse"
            pannelRatio=".075"
            accept=""
            allowMultiple={true}
            setFormData={setFormData}
          />
        </div>
        {/* license expiration date */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="date"
            htmlFor="licenseExpireDate"
            label="License expiration date"
            id="licenseExpireDate"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* preparation time */}
        <div className="col-lg-6 col-12 p-2">
          <InputWithUnit
            htmlFor="preparation_time"
            label="Preparation Time"
            hint="(Time Between trips needed)"
            id="preparationTime"
            units={["Minutes", "Houres"]}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* description english */}
        <div className="col-lg-6 col-12 p-2">
          <CommentField
            htmlFor="description_en"
            hint="( English )"
            label="Description"
            placeholder="Write here"
            id="description"
            formData={formData}
            setFormData={setFormData}
            value={formData.description_en}
          />
        </div>
        {/* description arabic */}
        <div className="col-lg-6 col-12 p-2">
          <CommentField
            htmlFor="description_ar"
            hint="( عربى )"
            label="Description"
            placeholder="Write here"
            id="description"
            formData={formData}
            setFormData={setFormData}
            value={formData.description_ar}
          />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default MainInfoForm;
