import { TextField, Button, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useUserStore from "../../store/user";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
});

const SignupForm = ({ onSuccess,btn }) => {
  const {signUp} =useUserStore()
  return (
    <Formik
      initialValues={{ fullName: "", email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={async(values) => {
        console.log("Signup:", values)
      
        try {
          const data = await signUp(values)
        console.log(data)
        } catch (error) {
          console.log(error)

        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="fullName"
            as={TextField}
            fullWidth
            label="Full Name"
            margin="normal"
            error={!!errors.fullName && touched.name}
            helperText={touched.fullName && errors.fullName}
          />
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

export default SignupForm;
