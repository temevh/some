import React from "react";

interface PasswordFieldProps {
  passwordUpdated: (password: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ passwordUpdated }) => {
  return (
    <div>
      <input
        type="password"
        placeholder="Password"
        className="custom-input-field"
        onChange={(event) => passwordUpdated(event.target.value)}
      />
    </div>
  );
};

export default PasswordField;
