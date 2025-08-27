
import Form from "./components/Form.tsx";
import List from "./components/List.tsx";
import { UserProvider } from "./contexts/Contexto";

function App() {
  return (
    <div>
      <UserProvider>
        <Form />
        <List />
      </UserProvider>
      <List />
    </div>
  );
}

export default App;
