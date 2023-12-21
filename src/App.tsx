import Form from "./component/Form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className=" m-8 p-4">
        <h1 className="mb-4 text-center font-medium leading-tight text-neutral-800 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Please enter your name and pick the Sectors you are currently involved
          in
        </h1>
        <Form />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
