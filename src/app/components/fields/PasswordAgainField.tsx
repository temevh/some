import React from "react";

interface PasswordAgainFieldProps {
  passwordAgainUpdated: (password: string) => void;
}

const PasswordAgainField: React.FC<PasswordAgainFieldProps> = ({
  passwordAgainUpdated,
}) => {
  return (
    <div>
      <input
        type="password"
        placeholder="Password"
        className="custom-input-field"
        onChange={(event) => passwordAgainUpdated(event.target.value)}
      />
    </div>
  );
};

export default PasswordAgainField;
