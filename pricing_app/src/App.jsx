import { useState } from "react";
import "./App.css";
import MotorForm from "./components/MotorForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      className="min-h-screen
      bg-radial-[at_50%_50%] from-white to-purple-950 to-75%
    bg-cover bg-no-repeat
    flex items-center justify-center p-2 overflow-y-auto"
    >
      <MotorForm />
    </div>
  );
}

export default App;
