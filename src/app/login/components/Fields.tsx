import { UserNameField, PasswordField } from "./fields/index";

const Fields = () => {
  return (
    <div className="text-center mt-28 bg-contentDiv rounded-lg">
      <p className="text-3xl mb-10">Log in</p>
      <p className="text-xl">
        Dont have an account?{" "}
        <span className="text-blue-700 hover:cursor-pointer">Sign up</span>
      </p>
      <div className="flex flex-row gap-8 justify-center mt-8">
        <UserNameField />
        <PasswordField />
      </div>
    </div>
  );
};

export default Fields;
