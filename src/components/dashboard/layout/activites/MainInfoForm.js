import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { S3Config } from "../../../../constants";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "./../../../ui/form-elements/CustomFileUpload";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import CustomSelectField from "./../../../ui/form-elements/CustomSelectField";
import CommentField from "../../../ui/form-elements/CommentField";
import Vat from "../shared/Vat";
import axios from "./../../../../util/axios";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import WhatIncluded from "./WhatIncluded";

const MainInfoForm = ({ setForm }) => {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;
  const [videoLink, setVideoLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [hasParentYacht, setHasParentYacht] = useState(false);
  const [yachts, setYachts] = useState([]);

  const [formData, setFormData] = useState({
    images: Array(3).fill(""),
    name: "",
    category: "",
    description: "",
    capacity: "",
    quantity: "",
    restrictions: "",
    yacht: "",
    vat: null,
  });

  useEffect(() => {
    axios
      .get(`/yachts/?page_size=1000/&sub_user=${subUser}`)
      .then((res) => {
        setYachts(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subUser]);

  // ========= media ========== //
  const handleUploadMedia = async (file) => {
    if (fileLoading) {
      return "";
    }
    setFileLoading(true);
    try {
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File([blob], `${Date.now()}${file.name.slice(-3)}`, {
        type: file.type,
      });
      const data = await uploadFile(newFile, S3Config);
      return data.location;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setFileLoading(false);
    }
  };
  const handleImagesChange = async (e, i) => {
    if (e?.length === 0) {
      setFormData((prev) => {
        const images = [...prev.images];
        images[i] = "";
        return {
          ...prev,
          images: images,
        };
      });
      return;
    }
    if (fileLoading) {
      return;
    }
    try {
      const file = e[0].file;
      const link = await handleUploadMedia(file);
      setFormData((prev) => {
        const images = [...prev.images];
        images[i] = link;
        return {
          ...prev,
          images: images,
        };
      });
    } catch (error) {
      console.error("Error handling image upload:", error);
      toast.error("Error uploading image");
    } finally {
      setFileLoading(false);
    }
  };
  const handleVideoChange = async (e) => {
    if (e?.length === 0) {
      setVideoLink("");
      return;
    }
    if (fileLoading) {
      return;
    }
    try {
      const file = e[0].file;
      const link = await handleUploadMedia(file);
      setVideoLink(link);
    } catch (error) {
      console.error("Error handling video upload:", error);
      setFileLoading(false);
      toast.error("Error uploading video");
    }
  };
  // ========= end of media ========= //

  const handleNext = (e) => {
    setForm("Location");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reponse = await axios.post("/activities/", formData);
      if (reponse.status === 201 || reponse.status === 200) {
        toast.success("Activity Created Successfully");
        setForm("Location & Working hours");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Package Info</h6>
        </div>
        {/* photo upload */}
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="photos">
              Upload Photos <span>( Maximum 3 Pictures )</span>
            </label>
            <div className="photos">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <CustomFileUpload
                    key={i}
                    labelIdle={`${
                      i === 0 ? '<label class="mainImg">Main Image</label>' : ""
                    } <img src=${fav} alt="fav"/>`}
                    pannelRatio=".88"
                    files={formData.images[i] ? [formData.images[i]] : null}
                    value
                    allowMultiple={false}
                    onUpdateFiles={(e) => handleImagesChange(e, i)}
                  />
                ))}
            </div>
          </div>
        </div>
        {/* video upload */}
        <div className="col-lg-6 col-12 p-2">
          <CustomFileUpload
            label="Upload Video"
            hint="( Max Size 20MB )"
            labelIdle="Drag & Drop your files or Browse"
            pannelRatio=".283"
            accept={["video/*"]}
            allowMultiple={false}
            files={videoLink ? [videoLink] : null}
            onUpdateFiles={(e) => handleVideoChange(e)}
          />
        </div>
        {/* package name */}
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            label="Activity Name"
            value={formData.name}
            placeholder="Write here"
            name="name"
            id="name"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              })
            }
          />
        </div>
        {/* category */}
        <div className="col-lg-6 col-12 p-2">
          <CustomSelectField
            label="Catagory"
            value={formData.category}
            name="category"
            id="category"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  category: e.target.value,
                };
              })
            }
            options={[
              {
                name: "Shore activities",
                value: "shore",
              },
              {
                name: "Water activities",
                value: "water",
              },
            ]}
          />
        </div>
        {/* description */}
        <div className="col-12 p-2">
          <CommentField
            htmlFor="description"
            label="Description"
            id="description"
            placeholder="Write here"
            value={formData.description}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* capacity */}
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            label="Capacity"
            value={formData.capacity}
            placeholder="00"
            type="number"
            name="capacity"
            id="capacity"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  capacity: e.target.value,
                };
              })
            }
          />
        </div>
        {/* quantity */}
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            label="Quantity"
            value={formData.quantity}
            placeHolder="00"
            type="number"
            name="quantity"
            id="quantity"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  quantity: e.target.value,
                };
              })
            }
          />
        </div>
        {/* whats included */}
        <div className="col-12 p-2">
          <WhatIncluded />
        </div>
        {/* Need to know & restrictions about activity */}
        <div className="col-12 p-2">
          <CommentField
            htmlFor="restrictions"
            label="Need to know & restrictions about activity"
            id="description"
            placeholder="Write here"
            value={formData.restrictions}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <label htmlFor="parent_yacht" className="parent_yacht_label">
            Parent Yacht
            <Form.Check
              name="parent_yacht"
              id="parent_yacht"
              type="switch"
              checked={hasParentYacht}
              onChange={() => setHasParentYacht(!hasParentYacht)}
            />
          </label>
          <CustomSelectField
            className={hasParentYacht ? "" : "disable"}
            id="yacht"
            value={formData.yacht}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, yacht: e.target.value }));
            }}
            options={yachts?.map((yacht) => ({
              name: yacht.name_en,
              value: yacht.id,
            }))}
          />
        </div>
        {/* vat */}
        {!hasParentYacht && (
          <div className="col-12 p-2">
            <Vat />
          </div>
        )}
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            fileLoading={fileLoading}
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
