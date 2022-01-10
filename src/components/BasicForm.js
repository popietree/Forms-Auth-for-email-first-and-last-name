import useInput from "../hooks/use-input-reducer";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    isValid: enteredFirstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    isValid: enteredLastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const determineInputClass = (inputHasError) =>
    inputHasError ? "form-control invalid" : "form-control";
  const firstNameInputClasses = determineInputClass(firstNameHasError);
  const lastNameInputClasses = determineInputClass(lastNameHasError);
  const emailInputClasses = determineInputClass(emailHasError);

  let formIsValid = false;
  if (
    enteredEmailIsValid &&
    enteredLastNameIsValid &&
    enteredFirstNameIsValid
  ) {
    formIsValid = true;
  }

  const FormSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={FormSubmitHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            onBlur={firstNameBlurHandler}
            onChange={firstNameChangeHandler}
            type="text"
            id="name"
            value={enteredFirstName}
          />

          {firstNameHasError && (
            <p className="error-text">Name entered is invalid</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            onBlur={lastNameBlurHandler}
            onChange={lastNameChangeHandler}
            type="text"
            id="name"
            value={enteredLastName}
          />

          {lastNameHasError && (
            <p className="error-text">Name entered is invalid</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          type="text"
          id="name"
          value={enteredEmail}
        />

        {emailHasError && (
          <p className="error-text">Please enter valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}> Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
