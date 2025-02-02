interface UsernameFieldProps {
  usernameUpdated: (name: string) => void;
}

const UsernameField: React.FC<UsernameFieldProps> = ({ usernameUpdated }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        className="custom-input-field"
        onChange={(event) => usernameUpdated(event.target.value)}
      />
    </div>
  );
};

export default UsernameField;
