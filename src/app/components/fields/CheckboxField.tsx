const CheckboxField = () => {
  return (
    <div className="flex flex-row items-center gap-4 mb-2">
      <input type="checkbox" className="h-6 w-6" />
      <p className="text-xl">I agree to terms of service</p>
    </div>
  );
};

export default CheckboxField;
