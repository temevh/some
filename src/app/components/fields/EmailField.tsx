interface EmailfieldProps {
  emailUpdated: (name: string) => void;
}

const EmailField: React.FC<EmailfieldProps> = ({ emailUpdated }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        className="custom-input-field"
        onChange={(event) => emailUpdated(event.target.value)}
      />
    </div>
  );
};

export default EmailField;
