interface SignUpButtonProps {
  signUpClicked: () => void;
  fieldsValid: boolean;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({
  signUpClicked,
  fieldsValid,
}) => {
  return (
    <div className="w-full shadow-xl">
      <button
        className={`w-full bg-buttonPrimary py-2 rounded-lg hover:bg-buttonSecondary hover:cursor-pointer ${
          fieldsValid ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={signUpClicked}
        disabled={fieldsValid}
      >
        <p className="text-xl">Sign up</p>
      </button>
    </div>
  );
};

export default SignUpButton;
