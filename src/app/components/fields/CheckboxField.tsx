import React from "react";

interface CheckboxFieldProps {
  checkboxClicked: (click: boolean) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ checkboxClicked }) => {
  return (
    <div className="flex flex-row items-center gap-4 mb-6">
      <input
        type="checkbox"
        className="h-6 w-6"
        onChange={(click) => checkboxClicked(click.target.checked)}
      />
      <p className="text-xl">I agree to terms of service</p>
    </div>
  );
};

export default CheckboxField;
