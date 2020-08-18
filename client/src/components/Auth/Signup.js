import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { SIGNUP_USER } from "../../queries";
import Error from "../Error";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const Signup = (props) => {
  const [state, setState] = React.useState({ ...initialState });

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser()
      .then(({ data }) => {
        clearState();
        // localStorage.setItem("token", data.signinUser.token);
        console.log(data);
        props.history.push("/signin");
      })
      .catch((error) => console.log("error", error));
  };

  const { username, email, password, passwordConfirmation } = state;

  const validateForm = () => {
    const { username, email, password, passwordConfirmation } = state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    console.log("isInvalid", isInvalid);
    return isInvalid;
  };

  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <Mutation
        mutation={SIGNUP_USER}
        variables={{ username, email, password }}
      >
        {(signupUser, { data, loading, error }) => {
          return (
            <form
              className="form"
              onSubmit={(event) => handleSubmit(event, signupUser)}
            >
              <input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="email address"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={handleChange}
              />
              <input
                onChange={handleChange}
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                placeholder="Confirm Password"
              />
              <button
                type="submit"
                className="button-primary"
                disabled={loading || validateForm()}
              >
                Submit
              </button>
              {error && <Error error={error} />}
            </form>
          );
        }}
      </Mutation>
    </div>
  );
};

export default withRouter(Signup);
