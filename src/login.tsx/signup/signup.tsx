import React from "react";
import "./signup.css";
import { Formik } from "formik";
import * as Yup from "yup";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom'

// Creating schema
const schema = Yup.object().shape({
  fullName:Yup.string()
  .required("Name is a required field"),
  companyName:Yup.string()    
  .required("Company name is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
});


const signUp = (values:any)=>{
  // const formData = new FormData();
  // formData.append("email", values.email);
  // formData.append("password", values.password);
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // };

  // axios.post("http://localhost:3600/api/signup", formData, config).then(() => {
  //   if (res.status) {
  //     navigate("/")

  //   }
  // }).catch(err => {
  //   console.log("error");
  // });
}

function SignUpComp() {
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{fullName:"", companyName: "",  password: "", email: ""}}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="signUp">
            <div className="form">
           {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Set up your account</span>
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
              <input
                  type="string"
                  name="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  placeholder="Enter your name"
                  className="form-control inp_text"
                  id="fullName"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.fullName && touched.fullName && errors.fullName}
                </p><input
                  type="string"
                  name="companyName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyName}
                  placeholder="Enter companyName"
                  className="form-control inp_text"
                  id="companyName"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.companyName && touched.companyName && errors.companyName}
                </p>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                 {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                 {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit" onClick={()=>signUp(values)}>signUp</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default SignUpComp;
