interface EmailfieldProps {
  emailUpdated: (name: string) => void;
  emailValid: boolean;
}

const EmailField: React.FC<EmailfieldProps> = ({
  emailUpdated,
  emailValid,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        className={`custom-input-field ${!emailValid ? "border-red-500" : ""}`}
        onChange={(event) => emailUpdated(event.target.value)}
      />
    </div>
  );
};

export default EmailField;
