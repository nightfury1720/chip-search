import "./App.css";
import mockData from "./utils/mockData";
import SearchChip from "./components/searchChip";
function App() {
  const data = mockData;
  return (
    <div className="App">
      Chip Component with search input
      <div>
        <SearchChip />
      </div>
    </div>
  );
}

export default App;
