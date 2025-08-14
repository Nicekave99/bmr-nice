import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import BMRCalculator from "./BMRCalculator";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      ) : (
        <BMRCalculator />
      )}
    </>
  );
}

export default App;
