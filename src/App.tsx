import Form from "./component/Form";

function App() {
  return (
    <>
      <div className=" m-8 p-4">
        <h1 className="mb-4 text-3xl text-center font-medium leading-tight text-neutral-800">
          Please inter your name and pick the Sectors you are curently involved
          in
        </h1>
        <Form />
      </div>
    </>
  );
}

export default App;
