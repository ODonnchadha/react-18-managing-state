import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";
import { useCart } from "./cartContext";

// Has the form been submitted? Is a submission in progress? Is the form completed?
// These are discrete states. Declare a single status variable.
// AKA: State Enumeration Pattern.
const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout() {
  const { dispatch } = useCart();
  // We could declare seperate useState calls for each field.
  // Prefer a single useState call when the data is related.
  // Tradeoff: Setting state is more complex with an object.
  const [address, setAddress] = useState(emptyAddress);
  // State declared to hold status.
  const [status, setStatus] = useState(STATUS.IDLE);
  // State that can hold a failure, like shippingService failure.
  const [saveError, setSaveError] = useState(null);
  // Tracking `touched` fields.
  const [touched, setTouched] = useState({});

  // Derived state benefits:
  // 1. Reduced the amount of state we had to store.
  // 2. Assures error state is valid because it recalculates on each render.
  // We are not going to store errors in state.
  // Instead, we'll calculate errors on each render.
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  // Both inputs leverage this.
  function handleChange(e) {
    // PROBLEM: With functional set state, React deletes the event before we can access it.
    // SOLUTION: Persist the event.
    e.persist();
    // NOTE: This isn't necessary in React 17 or newer since React 17 no longer pools events.
    setAddress((curAddress) => {
      // id corresponds to associated property.
      // 1. Set the address to a copy of the current addrerss.
      // 2. Use the input's id to determine which property to set.
      // Using computed property syntax.
      return {
        ...curAddress,
        // Using JavaScript's computed property to reference a property using a variable.
        [e.target.id]: e.target.value,
      };
    });
  }

  // GOAL: Display inline error of form has been touched or the form has been submitted.
  function handleBlur(event) {
    event.persist();
    setTouched((cur) => {
      return { ...cur, [event.target.id]: true };
    });
  }

  async function handleSubmit(event) {
    // Keep the form from posting back so that we can run validation.
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        dispatch({ type: "empty" });
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  // Validating an address.
  // Store errors in an object and not an array. Easier to reference.
  function getErrors(address) {
    const result = {};
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  }
  // Throw error and the ErrorBoundary will catch it.
  if (saveError) throw saveError;
  // Return early upon completion.
  if (status === STATUS.COMPLETED) {
    return <h1>Thanks for shopping!</h1>;
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>

          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
