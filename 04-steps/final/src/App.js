import { useState } from "react";

// A collection of messages that mirrors a learning roadmap. Index stays in sync with the current step.
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      {/* The App component itself stays stateless; it’s the stage where we mount the practice components. */}
      <Steps />
      {/* The two StepMessage instances show how a component can receive arbitrary JSX via the children prop. */}
      <StepMessage step={1}>
        <p>Pass in content</p>
        <p>✌️</p>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read children prop</p>
        <p>😎</p>
      </StepMessage>
      {/* <Steps /> */}
    </div>
  );
}

function Steps() {
  // step stores the current step (1 -> 3). useState returns the current value plus the setter function.
  const [step, setStep] = useState(1);
  // isOpen toggles whether the step content is visible.
  const [isOpen, setIsOpen] = useState(true);

  // const [test, setTest] = useState({ name: "Jonas" });

  // Go back one step unless we are already at the first step. Callback form ensures we always read the latest state.
  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  // Move forward while guarding against overshooting the total step count (3 in this example).
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      // setStep((s) => s + 1);
    }

    // BAD PRACTICE
    // test.name = "Fred";
    // setTest({ name: "Fred" });
  }

  return (
    <div>
      {/* Close button toggles the entire Steps component by inverting the current boolean. */}
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {/* Apply the active class to every step the user has reached (including the current one). */}
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>
            {/* StepMessage accepts text, JSX, or entire blocks as children; here we read from messages based on the step index. */}
            {messages[step - 1]}
            <div className="buttons">
              {/* Reusable Button: caller supplies colors, click handler, and child content. */}
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>

            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
              <span>🤓</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  // StepMessage is a presentational wrapper: it receives the step number and renders whatever children it was given.
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  // Button is a tiny reusable component; inline styles let callers inject dynamic colors without bespoke CSS classes.
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
