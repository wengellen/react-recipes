import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { SIGNIN_USER } from "../../queries";
import Error from "../Error";

const initialState = {
  username: "",
  password: "",
};

const Signin = (props) => {
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

  const handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser()
      .then(async ({ data }) => {
        clearState();
        localStorage.setItem("token", data.signinUser.token);
        await props.refetch();
        props.history.push("/");
      })
      .catch((error) => console.log("error", error));
  };

  const { username, password } = state;

  const validateForm = () => {
    const { username, password } = state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  return (
    <div className="App">
      <h2 className="App">Signin</h2>
      <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
        {(signinUser, { data, loading, error }) => {
          return (
            <form
              className="form"
              onSubmit={(event) => handleSubmit(event, signinUser)}
            >
              <input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={handleChange}
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

export default withRouter(Signin);
