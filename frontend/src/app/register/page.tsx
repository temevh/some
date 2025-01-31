"use client";
import { useState } from "react";
import Fields from "./components/Fields";

const RegisterPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [fieldsValid, setFieldsValid] = useState(false);

  const updateUser = (field: string, value: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Fields
        user={user}
        updateUser={updateUser}
        passwordAgain={passwordAgain}
        setPasswordAgain={setPasswordAgain}
        isValid={isValid}
        setIsValid={setIsValid}
        emailValid={emailValid}
        setEmailValid={setEmailValid}
        checkbox={checkbox}
        setCheckbox={setCheckbox}
        fieldsValid={fieldsValid}
        setFieldsValid={setFieldsValid}
      />
    </div>
  );
};

export default RegisterPage;
