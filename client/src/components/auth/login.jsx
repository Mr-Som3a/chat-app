import { TextField, Button, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
});

const LoginForm = ({ btn}) => {
const navigate=useNavigate()
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async(values) => {
        try {
          await login(values)
          navigate("/")
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="email"
            as={TextField}
            fullWidth
            label="Email"
            margin="normal"
            error={!!errors.email && touched.email}
            helperText={touched.email && errors.email}
          />
          <Field
            name="password"
            as={TextField}
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            error={!!errors.password && touched.password}
            helperText={touched.password && errors.password}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              {btn}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
