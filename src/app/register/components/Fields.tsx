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
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useRouter } from "next/navigation";

const Fields = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const passwordUpdated = (pass: string) => {
    setPassword(pass);
  };

  const usernameUpdated = (name: string) => {
    setUsername(name);
  };

  const emailUpdated = (name: string) => {
    setEmail(name);
  };

  const passwordAgainUpdated = (passAgain: string) => {
    setPasswordAgain(passAgain);
  };

  const checkboxClicked = (click: boolean) => {
    setCheckbox(click);
  };

  const signUpClicked = () => {
    //Check if email and username are valid
    let emailValid = true;
    let userNameValid = true;
    if (emailValid && userNameValid && isValid && checkbox) {
      router.push("/");
    } else {
      alert("Error");
    }
  };

  return (
    <div className="text-center bg-contentDiv rounded-lg px-20 py-10">
      <p className="text-4xl pb-6">Sign up</p>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-96">
          <div className="flex flex-col justify-center gap-4 w-full mb-4">
            <UsernameField usernameUpdated={usernameUpdated} />
            <EmailField emailUpdated={emailUpdated} />
            <div className="flex flex-row gap-6">
              <PasswordField passwordUpdated={passwordUpdated} />
              <PasswordAgainField passwordAgainUpdated={passwordAgainUpdated} />
            </div>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={passwordAgain}
              onChange={(isValid) => {
                setIsValid(isValid);
              }}
            />
          </div>
          <CheckboxField checkboxClicked={checkboxClicked} />
        </div>

        <SignUpButton signUpClicked={signUpClicked} />
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
