import { useRef, useState, useEffect } from "react";
import useInput from "../hooks/use-input";
const SimpleInput = (props) => {
  //KEY STROKE
  //update a state variable with the input value
  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");

  // const [formIsValid, setFormIsValid] = useState(false); remove because is DERVIED
  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredNameIsValid = enteredName.trim() !== "";
  //INFERRED VALUE

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;
  if (enteredEmailIsValid && nameInputIsInvalid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  //dont need useeffect to derive form validity
  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid]);

  //make enteredNameIsValid a constant whihc will also get new value as comp rerenders and creates new state
  //then get rid of setEnteredNameIsValid
  //INFERRED STATE

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    //use event.target because setting is scheduled so use same state data source
    // if (event.target.value.trim() !== "") {
    //   setEnteredNameIsValid(true);
    // }
  };
  // const formSubmissionHandler = (event) => {
  //   event.preventDefault();
  //   console.log(enteredName);
  // };
  //USE REF
  // const nameInputRef = useRef();
  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
    // if (enteredName.trim() === "") {
    //   setEnteredNameIsValid(false);
    // }
  };
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    //will get updated value becuase when submited the compment reevvalutes
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    // if (enteredName.trim() === "") {
    // setEnteredNameIsValid(false);  dont need to SET VALIDITY
    //   return;
    // }

    // setEnteredNameIsValid(true);
    console.log(enteredName);

    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);
    //Directly manipulating DOM
    // nameInputRef.current.value = "";

    //WILL make form invalid
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : " form-control ";
  return (
    <form onSubmit={formSubmissionHandler}>
      {/* <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
          // ref={nameInputRef}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name entered is invalid</p>
        )}
      </div> */}

      <div className={nameInputClasses}>
        <label htmlFor="name">Your Email Address</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
          // ref={nameInputRef}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email entered is invalid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
