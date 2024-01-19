import "./App.css";
import Header from "./components/Header";
// import NotesForm from "./components/NotesForm";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes />
    </div>
  );
}

export default App;
