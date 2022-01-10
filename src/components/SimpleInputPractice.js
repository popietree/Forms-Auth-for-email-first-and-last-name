import { useRef, useState, useEffect } from "react";
import useInput from "../hooks/use-input";

const SimpleInputPractice = (props) => {
  // const validateValue = (value) => {
  //   value.trim() !== "";
  // };
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  // const [enteredName, setEnteredName] = useState("");
  // // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  // const [enteredEmail, setEnteredEmail] = useState("");

  //INFERRED VALIDITY

  // const enteredEmailIsValid = enteredEmail.includes("@");
  // INFEERED IN - VALIIDITY
  // const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // const enteredNameIsValid = enteredName.trim() !== "";
  // //INFERRED VALUE
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;
  if (enteredEmailIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };
  // const emailInputBlurHandler = () => {
  //   setEnteredEmailTouched(true);
  // };
  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };
  // const nameInputBlurHandler = () => {
  //   setEnteredNameTouched(true);
  // };
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // setEnteredNameTouched(true); // form cant be submit if input invalis anyways
    // setEnteredEmailTouched(true);

    //will get updated value becuase when submited the compment reevvalutes
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    resetNameInput();

    // setEnteredName("");
    // setEnteredNameTouched(false);
    resetEmailInput();
    // setEnteredEmail("");
    // setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : " form-control ";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : " form-control ";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          // ref={nameInputRef}
        />
        {nameInputHasError && (
          <p className="error-text">Name entered is invalid</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          // ref={nameInputRef}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInputPractice;
