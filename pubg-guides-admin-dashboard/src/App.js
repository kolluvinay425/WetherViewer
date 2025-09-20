import "./App.css";
import AchievementsList from "./Components/Achievements";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#333"; // Set the background color

    return () => {
      document.body.style.backgroundColor = ""; // Reset to default when component unmounts
    };
  }, []);
  return <AchievementsList />;
}

export default App;
