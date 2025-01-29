import { UserNameField, PasswordField } from "./fields/index";
import { LogInButton, GoogleButton, AppleButton } from "./buttons/";

const Fields = () => {
  return (
    <div className="text-center bg-contentDiv rounded-lg p-20">
      <p className="text-4xl pb-6">Log in</p>
      <p className="text-xl pb-10 text-gray-400">
        Don't have an account?{" "}
        <span className="text-blue-700 hover:cursor-pointer underline">
          Sign up
        </span>
      </p>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-96">
          <div className="flex flex-col justify-center gap-4 w-full mb-8">
            <UserNameField />
            <PasswordField />
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
