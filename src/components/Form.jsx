import React, { useReducer } from "react";

// declaring the data of select menu
const dataLists = {
  carBrands: [
    { carName: "AUDI" },
    { carName: "BMW" },
    { carName: "VAUXHAL" },
    { carName: "MERCEDES" },
    { carName: "PEUGEOT" },
    { carName: "RENAULT" },
  ],
  colors: [
    { colName: "BLUE" },
    { colName: "RED" },
    { colName: "BLACK" },
    { colName: "ORANGE" },
  ],
};

// declaring the initial state of our data
const initialState = {
  car: "",
  color: "",
  code: "",
  error: "",
  curStep: 1,
};

// reducer function for state handling
const reducer = (state, action) => {
  switch (action.type) {
    case "setValue":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "next":
      return {
        ...state,
        curStep: state.curStep < 4 ? state.curStep + 1 : state.curStep,
      };
    case "previous":
      return {
        ...state,
        curStep: state.curStep > 1 ? state.curStep - 1 : state.curStep,
      };
    case "setError":
      return { ...state, error: action.error };

    default:
      return state;
  }
};

const Form = () => {
  // using useReducer instead of useState, personally I like to use useReducer in my react applications to tackle the numerous useState hell and  it provides a more structured approach to managing complex state logic in React components.
  // Even though this application is small I just wanted to make this code more stronger and wanted to showcase my skills.

  const [states, setStates] = useReducer(reducer, initialState);

  //handling the values change of our data
  const handleValuesChange = (e) => {
    const { name, value } = e.target;

    // set the state of values to the respective data
    setStates({
      type: "setValue",
      field: name,
      value,
    });

    // set error to null
    setStates({
      type: "setError",
      error: "",
    });
  };

  //   function to handle the steps of the form
  const handleStepsChange = (step) => {
    // handling next button operation with error handling in this same statement
    if (step === 1) {
      let error = "";

      //   checking the current step and the required values of the states, if the user has not selected any value show user an error
      if (states.curStep === 1) {
        if (states.car === "") error = "Please select a car brand";
      } else if (states.curStep === 2) {
        if (states.color === "") error = "Please select a color";
      } else if (states.curStep === 3) {
        if (states.code === "") error = "Please enter a code";
      }

      //   set the states of error is occurs or proceed to next step
      if (error) {
        setStates({ type: "setError", error });
      } else {
        setStates({ type: "next" });
      }
    } else {
      // switch to the previous step
      setStates({ type: "previous" });
    }
  };

  //   console log the data for reference
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(states);
  };

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="w-2/5 h-72 mx-auto p-4 bg-white rounded-lg border-2 border-gray-100 shadow-lg shadow-indigo-50">
        <h1 className="text-2xl font-bold mb-4 text-center">Multi-Step Form</h1>

        <form onSubmit={handleSubmit}>
          {states.curStep === 1 && (
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Make</label>
                <select
                  name="car"
                  value={states.car}
                  onChange={handleValuesChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">Select a car</option>
                  {dataLists.carBrands.map((car) => (
                    <option value={car.carName}>{car.carName}</option>
                  ))}
                </select>
              </div>
              {states.error && <p className="text-red-500">{states.error}</p>}
            </div>
          )}
          {states.curStep === 2 && (
            <div>
              {" "}
              <div className="mb-4">
                <label className="block mb-2 font-bold">Color</label>
                <select
                  name="color"
                  value={states.color}
                  onChange={handleValuesChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">Select a color</option>
                  {dataLists.colors.map((col) => (
                    <option value={col.colName}>{col.colName}</option>
                  ))}
                </select>
              </div>
              {states.error && <p className="text-red-500">{states.error}</p>}
            </div>
          )}
          {states.curStep === 3 && (
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Code</label>
                <input
                  type="text"
                  name="code"
                  value={states.code}
                  onChange={handleValuesChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              {states.error && <p className="text-red-500">{states.error}</p>}
            </div>
          )}
          {states.curStep === 4 && (
            <div className="font-medium space-y-2">
              {" "}
              <h2>Generated Text</h2>
              <p>{`I have a ${states.car} and the colour is ${states.color}.`}</p>
              {states.color === "RED" && (
                <p>{`THE CAR IS ${states.color}! NICE!!`}</p>
              )}
              <p className="">{`REF: ${states.code}`}</p>
            </div>
          )}
          <div className=" flex flex-row justify-between items-center mt-20">
            {states.curStep > 1 && (
              <button
                className="bg-indigo-500 px-2 py-2 text-white font-semibold rounded-md  w-40"
                onClick={() => handleStepsChange(0)}
              >
                Previous
              </button>
            )}
            {states.curStep < 4 && (
              <button
                className="bg-indigo-500 px-2 py-2 text-white font-semibold rounded-md w-40"
                onClick={() => handleStepsChange(1)}
              >
                {states.curStep === 3 ? "Done" : "Next"}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
