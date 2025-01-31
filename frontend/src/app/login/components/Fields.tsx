"use client";
import { UsernameField, PasswordField } from "../../components/fields/index";
import {
  GoogleButton,
  AppleButton,
  LogInButton,
} from "../../components/buttons/index";
import { useState } from "react";
import Link from "next/link";

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
    <div className="custom-content-div">
      <p className="text-4xl pb-6">Log in</p>
      <p className="text-xl pb-10 text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-blue-700 hover:cursor-pointer underline"
        >
          Sign up
        </Link>
      </p>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-96">
          <div className="flex flex-col justify-center gap-4 w-full mb-8">
            <UsernameField usernameUpdated={usernameUpdated} />
            <PasswordField passwordUpdated={passwordUpdated} />
          </div>
          <LogInButton />
        </div>
      </div>
      <div className="flex flex-row items-center w-full mt-10">
        <hr className="flex-grow border-gray-300" />
        <p className="text-gray-400 mx-4">Or log in with</p>
        <hr className="flex-grow border-gray-300" />
      </div>
      <div className="flex flex-row justify-between gap-6 mt-4">
        <GoogleButton />
        <AppleButton />
      </div>
    </div>
  );
};

export default Fields;
