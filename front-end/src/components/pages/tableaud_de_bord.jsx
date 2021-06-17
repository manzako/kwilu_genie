import React, { useState } from "react";
import { Grid, Container, Responsive } from "semantic-ui-react";
import HeaderExampleFloating from "./header";
import "./css/tableauDebord.css";
import Section1 from "../pages/sous_composants_tableauDeBord/section1";
import Section2 from "./sous_composants_tableauDeBord/section2";
import Section3 from "./sous_composants_tableauDeBord/section3";
import Section4 from "./sous_composants_tableauDeBord/section4";
import Section5 from "./sous_composants_tableauDeBord/section5";
import Section6 from "./sous_composants_tableauDeBord/section6";
import Section7 from "./sous_composants_tableauDeBord/section7";
import MainTitle from "./sous_composants_tableauDeBord/mainTitle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { Spring } from "react-spring/renderprops";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const TableauDeBord = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
  };

  return (
    <>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => {
          return (
            <div style={props}>
              <HeaderExampleFloating />
            </div>
          );
        }}
      </Spring>

      <Container style={{ marginTop: "100px" }}>
        <MainTitle />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <Responsive minWidth={992}>
          <Grid relaxed columns={4}>
            <Section1 startDate={selectedDate} />
            <Section2 startDate={selectedDate} />
            <Section3 startDate={selectedDate} />
            <Section4 startDate={selectedDate} />
          </Grid>
        </Responsive>
        <Responsive maxWidth={990}>
          <Grid relaxed columns={2}>
            <Section1 startDate={selectedDate} />
            <Section2 startDate={selectedDate} />
            <Section3 startDate={selectedDate} />
            <Section4 startDate={selectedDate} />
          </Grid>
        </Responsive>
        <Responsive minWidth={992}>
          <Grid relaxed columns={4}>
            <Grid.Row>
              <Section5 />
              <Section6 />
              <Section7 />
            </Grid.Row>
          </Grid>
        </Responsive>
      </Container>
    </>
  );
};

export default TableauDeBord;
