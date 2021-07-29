import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

export default function Login({ handleGivEmail }) {
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  function handleClickLogIn() {
    history.push("/films");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:w-1/3 bg-white rounded-lg"
      >
        <div className="flex font-bold justify-center mt-6">
          <img
            className="h-20 w-20"
            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
          />
        </div>
        <h2 className="text-3xl text-center text-gray-700 mb-4">Login</h2>

        <div className="w-full mb-2">
          <div className="flex items-center">
            <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email"
              className="-mx-6 px-8  w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {formik.errors.email}
            </span>
          ) : null}
        </div>

        <div className="w-full mb-2">
          <div className="flex items-center">
            <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
              className="-mx-6 px-8  w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {formik.errors.password}
            </span>
          ) : null}
        </div>
        <button
          onClick={handleClickLogIn}
          type="submit"
          className="w-full py-2 rounded-full bg-green-600 text-gray-100  focus:outline-none"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
