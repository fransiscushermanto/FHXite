import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "../../../../../node_modules/@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PhoneInput from "react-phone-input-2";
import {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  getCountries
} from "react-phone-number-input";
import "react-phone-input-2/lib/style.css";
import en from "react-phone-number-input/locale/en.json";

const Register = ({
  widths,
  inputTransition,
  changeLayout,
  displayRegister
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [phone, setPhone] = useState();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    document.getElementById("date-picker-dialog").disabled = true;
  }, []);

  const phoneSetting = phone => {
    setPhone(phone && formatPhoneNumberIntl(phone));
    console.log(isValidPhoneNumber(phone));
  };
  return (
    <form
      id="register-form"
      className="form"
      style={{
        zIndex: widths === 100 ? "3" : "0",
        display: displayRegister === true ? "flex" : "none"
      }}
    >
      {/* <div id="title">
            <h5>SIGN IN</h5>
          </div> */}
      <div id="input-area">
        <div id="email-wrapper" className="wrapper">
          <label className="registerLabel">Email</label>
          <input
            type="email"
            id="emailRegis"
            className="input"
            name="email"
            onChange={inputTransition}
          />
        </div>
        <div id="password-wrapper" className="wrapper">
          <label className="registerLabel">Password</label>
          <input
            type="password"
            id="passwordRegis"
            className="input"
            name="password"
            onChange={inputTransition}
          />
        </div>
        <div id="date-wrapper">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Birthday"
              format="dd-MMMM-yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              maxDate={new Date()}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div id="phone-wrapper" className="wrapper">
          <PhoneInput
            country={"id"}
            value={phone}
            onChange={phone => phoneSetting(phone)}
            masks={{ id: "+.. ... .... ...." }}
          />
        </div>
        <div id="signin-btn">
          <a className="btn btn-primary" id="signin" href="/">
            SUBMIT
          </a>
        </div>
        <div className="wrapper" id="login-wrapper">
          <h5 className="registertext">
            Have an account? <span onClick={changeLayout}>Login</span>
          </h5>
        </div>
      </div>
    </form>
  );
};

export default Register;
