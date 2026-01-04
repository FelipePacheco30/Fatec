import { LotteryProvider } from "./contexts/LotteryContext";
import Megasena from "./pages/Megasena";

function App() {
  return (
    <LotteryProvider>
      <Megasena />
    </LotteryProvider>
  );
}

export default App;
