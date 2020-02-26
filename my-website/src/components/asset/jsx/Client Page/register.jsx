import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "../../../../../node_modules/@material-ui/pickers";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import PhoneInput from "react-phone-input-2";
import {
  formatPhoneNumberIntl,
  isValidPhoneNumber
} from "react-phone-number-input";
import "react-phone-input-2/lib/style.css";
import en from "react-phone-number-input/locale/en.json";
import instance from "../../../../instance";
import moment from "moment";

const Register = ({
  widths,
  inputTransition,
  changeLayout,
  displayRegister,
  socket
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [full_name, setFullname] = useState();
  const [email, setEmail] = useState();
  const [dates, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const history = useHistory();

  useEffect(() => {
    document.getElementById("date-picker-dialog").disabled = true;
  }, []);

  const register = async e => {
    e.preventDefault();
    const user = {
      full_name: full_name,
      email: email,
      password: password,
      birthday: dates,
      phone_number: phone,
      country: country
    };
    try {
      const response = await instance.post("/api/users/auth/register", user);
      socket.emit("ADD_USERS");
      if (response.status === 200) {
        document.querySelector("input").value = "";
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fullName = value => {
    const name = document.getElementById(value.target.id).value;
    setFullname(name);
    inputTransition(value);
  };

  const emails = value => {
    const mEmail = document.getElementById(value.target.id).value;
    setEmail(mEmail);
    inputTransition(value);
  };

  const passwords = value => {
    const mPAssword = document.getElementById(value.target.id).value;
    setPassword(mPAssword);
    inputTransition(value);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    const tgl = moment(date).format("YYYY-MMMM-DD");
    setDate(tgl);
  };

  const phoneSetting = phone => {
    setPhone(phone && formatPhoneNumberIntl(phone));
    console.log(isValidPhoneNumber(phone));
    const ele = document.getElementsByClassName("flag")[0];
    const strClass = ele.className.split(" ");
    setCountry(en[strClass[1].toUpperCase()]);
  };

  return (
    <form
      id="register-form"
      className="form"
      style={{
        zIndex: widths === 100 ? "3" : "0",
        display: displayRegister === true ? "flex" : "none"
      }}
      onSubmit={register}
    >
      {/* <div id="title">
            <h5>SIGN IN</h5>
          </div> */}
      <div id="input-area">
        <div id="name-wrapper" className="wrapper">
          <label className="registerLabel">Full Name</label>
          <input
            type="text"
            id="fullnameRegis"
            className="input"
            name="text"
            value={full_name || ""}
            onChange={value => fullName(value)}
          />
        </div>
        <div id="email-wrapper" className="wrapper">
          <label className="registerLabel">Email</label>
          <input
            type="email"
            id="emailRegis"
            className="input"
            name="email"
            value={email || ""}
            onChange={value => emails(value)}
          />
        </div>
        <div id="password-wrapper" className="wrapper">
          <label className="registerLabel">Password</label>
          <input
            type="password"
            id="passwordRegis"
            className="input"
            name="password"
            autoComplete="on"
            value={password || ""}
            onChange={value => passwords(value)}
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
          <button type="submit" className="btn btn-primary" id="signin">
            SUBMIT
          </button>
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
