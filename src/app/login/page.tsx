import { Fields, Banner } from "./components";

const loginPage = () => {
  return (
    <div className="bg-red-500 m-auto flex flex-row justify-center items-center h-screen">
      <Banner />
      <Fields />
    </div>
  );
};

export default loginPage;
