import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { styled } from "@mui/material";
import { TextField, FormControl, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { getInputState } from "../utils/getInputState";
import {
  required,
  validateCPassword,
  validatePassword
} from "../utils/validators";

const Wrapper = styled("form")`
  width: 400px;
  height: auto;
  border: 1px solid #c1c2c3;
  padding: 16px;
  border-radius: 4px;
  h4 {
    margin-top: 0;
  }
`;

export const LoginForm = ({ onAuthSubmit, className }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const { register, formState, handleSubmit } = useForm();

  const onSubmit = async (e) => {
    onAuthSubmit({
      email: username,
      password
    });
  };

  return (
    <Wrapper className={className} onSubmit={handleSubmit(onSubmit)}>
      <h1>Please Log In</h1>
      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="e-mail"
          variant="outlined"
          type="email"
          onChange={(e) => setUserName(e.target.value)}
          {...register("email", { required: required() })}
          {...getInputState(formState, "email")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          {...register("password", {
            required: required(),
            validate: validatePassword
          })}
          {...getInputState(formState, "password")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <Button type="submit" variant="outlined">
          Войти
        </Button>
      </FormControl>
    </Wrapper>
  );
};
LoginForm.propTypes = {
  onAuthSubmit: PropTypes.func.isRequired
};
