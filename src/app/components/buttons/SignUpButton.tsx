interface SignUpButtonProps {
  signUpClicked: () => void;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ signUpClicked }) => {
  return (
    <div className="w-full shadow-xl">
      <button
        className="w-full bg-buttonPrimary py-2 rounded-lg hover:bg-buttonSecondary hover:cursor-pointer"
        onClick={signUpClicked}
      >
        <p className="text-xl">Sign up</p>
      </button>
    </div>
  );
};

export default SignUpButton;
