import { UserNameField, PasswordField } from "./fields/index";
import LogInButton from "./buttons/LogInButton";

const Fields = () => {
  return (
    <div className="text-center bg-contentDiv rounded-lg p-10">
      <p className="text-3xl pb-6">Log in</p>
      <p className="text-xl pb-10">
        Don't have an account?{" "}
        <span className="text-blue-700 hover:cursor-pointer">Sign up</span>
      </p>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-96">
          <div className="flex flex-row justify-center gap-4 w-full mb-8">
            <UserNameField />
            <PasswordField />
          </div>
          <LogInButton />
        </div>
      </div>
    </div>
  );
};

export default Fields;
