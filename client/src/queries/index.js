import { gql } from "apollo-boost";

// Recipes Query
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      name
      description
      category
      instructions
      likes
      username
    }
  }
`;

// Recipe Mutation

// User Query

// User Mutation
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`;
