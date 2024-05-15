import React from "react";
import { Accordion } from "react-bootstrap";
import DayAccordionItem from "./DayAccordionItem";
import { DAYS } from "../../constants";

const DaysAccordion = ({
  handleCheck,
  workingHours,
  handleTimeChange,
  handleDeleteCurrentHours,
  handleAddNewHoursRow
}) => {
  return (
    <Accordion>
      {DAYS.map((day, index) => (
        <DayAccordionItem
          key={index}
          day={day}
          index={index}
          workingHours={workingHours}
          handleCheck={handleCheck}
          handleTimeChange={handleTimeChange}
          handleDeleteCurrentHours={handleDeleteCurrentHours}
          handleAddNewHoursRow={handleAddNewHoursRow}
        />
      ))}
    </Accordion>
  );
};

export default DaysAccordion;
