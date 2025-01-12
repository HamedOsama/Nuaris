// PriceRow.js

import React from "react";
import InputField from "../../../ui/form-elements/InputField";
import deleteIcon from "../../../../assets/images/delete.svg";
import { useSelector } from "react-redux";

const PriceRow = ({
  formData,
  index,
  handleChange,
  options,
  onDelete,
  length
}) => {
  const currency = useSelector((state) => state.user?.user?.currency);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(index);
  };

  return (
    <div className={`addon_prices_row ${index === length - 1 ? "last" : ""}`}>
      <div className="input-field">
        <label htmlFor={`price-${index}`}>Price</label>
        <div className="time-units">
          <input
            type="number"
            placeholder="00"
            name={`price-${index}`}
            id={`price-${index}`}
            value={formData.price}
            onChange={(e) => handleChange(index, "price", e.target.value)}
          />
          <select
            className="units"
            name={`units-${index}`}
            id={`units-${index}`}
            value={formData.price_type}
            onChange={(e) => handleChange(index, "price_type", e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="inner_wrap">
        <InputField
          formData={formData}
          setFormData={handleChange}
          label="Minimum Price"
          htmlFor={`min_price-${index}`}
          hint={`( ${currency} )`}
          type="number"
          placeholder="00"
          id={`minPrice-${index}`}
        />
        <button
          onClick={(e) => handleDelete(e)}
          className={`${length === 1 ? "disabled" : ""}`}
        >
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default PriceRow;
