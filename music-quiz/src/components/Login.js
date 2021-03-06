import React, { useContext } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Center from "./Center";
import useForm from "../useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const getNewModel = () => ({
    name: '',
    email: ''
  })

  const navigate = useNavigate();

  const {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange
  } = useForm(getNewModel);

  const login = e => {
    e.preventDefault();
    if(validate())
      createAPIEndpoint(ENDPOINTS.quizTaker)
        .post(values)
        .then(res => {
          navigate('/quiz')
    })
        .catch(err => console.log(err))
  }

  const validate = () => {
    let temp ={}
    temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
    temp.name = values.name !== "" ? "" : "This field is required."
    setErrors(temp)
    return Object.values(temp).every(x => x === "")
  }

  return (
    <Center>
      <Card variant="outlined" sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: 'center' }} >
          <Typography variant="h3" sx={{ my: 3, color:'#1DB954' }} >
            Music Quiz
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",

              },
            }}
          >
            <form noValidate onSubmit={login}>
              <TextField
                autoComplete="off"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variation="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
              label="Name"
              name="name"
              variation="outlined"
              value={values.name}
              onChange={handleInputChange}
              {...(errors.name && { error: true, helperText: errors.name })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%", backgroundColor:'#1DB954' }}
              >
                Start
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}

