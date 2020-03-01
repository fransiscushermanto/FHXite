import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "../../../../../node_modules/@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
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

import CustomInput from "./CustomInput";
import * as actions from "../../../../actions";

let Register = props => {
  const {
    widths,
    inputTransition,
    changeLayout,
    displayRegister,
    socket,
    handleSubmit
  } = props;

  const errorMessage = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDate] = useState("");
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    document.getElementById("date-picker-dialog").disabled = true;
  }, []);

  // const register = async e => {
  //   e.preventDefault();
  //   const user = {
  //     full_name: full_name,
  //     email: email,
  //     password: password,
  //     birthday: dates,
  //     phone_number: phone,
  //     country: country
  //   };
  //   try {
  //     const response = await instance.post("/api/users/auth/register", user);
  //     socket.emit("ADD_USERS");
  //     if (response.status === 200) {
  //       document.querySelector("input").value = "";
  //       history.push("/login");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async formData => {
    formData.birthday = dates;
    formData.country = country;
    formData.phone_number = phone;
    console.log("Form Data", formData);
    await dispatch(actions.signUp(formData));
    // if (!errorMessage) {
    //   history.push("/");
    // }
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
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <div id="title">
            <h5>SIGN IN</h5>
          </div> */}
      <div id="input-area">
        <Field
          idWrapper="name-wrapper"
          idInput="fullnameRegis"
          type="text"
          name="full_name"
          label="Full Name"
          inputTransition={inputTransition}
          component={CustomInput}
        />

        <Field
          idWrapper="email-wrapper"
          idInput="emailRegis"
          type="email"
          name="email"
          label="Email"
          inputTransition={inputTransition}
          component={CustomInput}
          errorMessage={errorMessage}
        />

        <Field
          idWrapper="password-wrapper"
          idInput="passwordRegis"
          type="password"
          name="password"
          label="Password"
          inputTransition={inputTransition}
          component={CustomInput}
        />

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

Register = reduxForm({ form: "signup" })(Register);

export default Register;
