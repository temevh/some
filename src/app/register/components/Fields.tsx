"use client";
import {
  UsernameField,
  PasswordField,
  PasswordAgainField,
  EmailField,
} from "../../components/fields/index";
import { SignUpButton } from "@/app/components/buttons";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";

const Fields = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

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

  return (
    <div className="text-center bg-contentDiv rounded-lg p-20">
      <p className="text-4xl pb-6">Create account</p>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-96">
          <div className="flex flex-col justify-center gap-4 w-full mb-8">
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
              onChange={(isValid) => {}}
            />
          </div>
        </div>
        <SignUpButton />
      </div>
    </div>
  );
};

export default Fields;
