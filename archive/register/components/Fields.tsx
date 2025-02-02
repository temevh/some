"use client";
import {
  UsernameField,
  PasswordField,
  PasswordAgainField,
  EmailField,
  CheckboxField,
} from "../../components/fields/index";
import {
  SignUpButton,
  GoogleButton,
  AppleButton,
} from "@/app/components/buttons";
import { useEffect } from "react";
import PasswordChecklist from "react-password-checklist";

interface FieldsProps {
  user: {
    username: string;
    email: string;
    password: string;
  };
  updateUser: (field: string, value: any) => void;
  passwordAgain: string;
  setPasswordAgain: (passwordAgain: string) => void;
  isValid: boolean;
  setIsValid: (isValid: boolean) => void;
  emailValid: boolean;
  setEmailValid: (emailValid: boolean) => void;
  checkbox: boolean;
  setCheckbox: (checkbox: boolean) => void;
  fieldsValid: boolean;
  setFieldsValid: (fieldsValid: boolean) => void;
  signUpClicked: () => void;
}

const Fields: React.FC<FieldsProps> = ({
  user,
  updateUser,
  passwordAgain,
  setPasswordAgain,
  isValid,
  setIsValid,
  emailValid,
  setEmailValid,
  checkbox,
  setCheckbox,
  fieldsValid,
  setFieldsValid,
  signUpClicked,
}) => {
  const validateEmail = (email: string) => {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    const emailIsValid = validateEmail(user.email);
    if (emailValid !== emailIsValid) {
      setEmailValid(emailIsValid);
    }
    const fieldsAreValid =
      emailIsValid && user.username !== "" && isValid && checkbox;
    if (fieldsValid !== fieldsAreValid) {
      setFieldsValid(fieldsAreValid);
    }
  }, [user.email, user.username, isValid, checkbox]);

  return (
    <div className="custom-content-div">
      <p className="text-4xl pb-6">Sign up</p>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-96">
          <div className="flex flex-col justify-center gap-4 w-full mb-4">
            <UsernameField
              usernameUpdated={(value) => updateUser("username", value)}
            />
            <EmailField
              emailUpdated={(value) => updateUser("email", value)}
              emailValid={emailValid}
            />
            <div className="flex flex-row gap-6">
              <PasswordField
                passwordUpdated={(value) => updateUser("password", value)}
              />
              <PasswordAgainField passwordAgainUpdated={setPasswordAgain} />
            </div>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "match"]}
              minLength={8}
              value={user.password}
              valueAgain={passwordAgain}
              onChange={setIsValid}
              validTextColor="white"
            />
          </div>
          <CheckboxField checkboxClicked={setCheckbox} />
        </div>

        <SignUpButton
          signUpClicked={signUpClicked}
          fieldsValid={!fieldsValid}
        />
        <div className="flex flex-row items-center w-full mt-10">
          <hr className="flex-grow border-gray-300" />
          <p className="text-gray-400 mx-4">Or sign up with</p>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex flex-row justify-between gap-6 mt-4">
          <GoogleButton />
          <AppleButton />
        </div>
      </div>
    </div>
  );
};

export default Fields;
