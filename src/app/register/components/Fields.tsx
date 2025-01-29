"use client";
import { UsernameField, PasswordField } from "../../components/fields/index";
import { useState } from "react";

const Fields = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const passwordUpdated = (pass: string) => {
    setPassword(pass);
  };

  const usernameUpdated = (name: string) => {
    setUsername(name);
  };

  return (
    <div className="text-center bg-contentDiv rounded-lg p-20">
      <p className="text-4xl pb-6">Create account</p>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-96">
          <div className="flex flex-col justify-center gap-4 w-full mb-8">
            <UsernameField usernameUpdated={usernameUpdated} />
            <PasswordField passwordUpdated={passwordUpdated} />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full mt-10">
        <hr className="flex-grow border-gray-300" />
        <p className="text-gray-400 mx-4">Or log in with</p>
        <hr className="flex-grow border-gray-300" />
      </div>
    </div>
  );
};

export default Fields;
