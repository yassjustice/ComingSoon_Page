import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Countdown from "./Pages/CountdownTimer";

function App() {
    const [count, setCount] = useState(0);

    return <Countdown />;
}

export default App;
