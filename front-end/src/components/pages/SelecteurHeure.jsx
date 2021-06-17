import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import "date-fns";

const SelecteurHeure = () => {
  const [heure, setHeure] = useState(new Date());

  const handleHeureChange = (heure) => {
    setHeure(heure);
    // alert(selectedDate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        ampm={false}
        value={heure}
        onChange={handleHeureChange}
        KeyboardButtonProps={{
          "aria-label": "change time",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default SelecteurHeure;
