import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Layout/Home";
import Header from "./components/Layout/Navbar";
import Transcribe from "./components/Transcription/Transcribe";
import Translation from "./components/Translation/Translation";
import Fasta from "./components/Fasta/Fasta";
import Complement from "./components/Complement/Complement";
import Blast from "./components/Blast/Blast";
import BlastView from "./components/Blast/BlastView";
import Sidebar from "./components/Layout/Sidebar";
import Editor from "./components/Editor/Editor";
const App = () => {
  return (
    <div className="" style={{ minHeight: "100vh" }}>
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          {/* <Route exact path="/" element={<Home></Home>} /> */}
          <Route exact path="/editor" element={<Editor></Editor>} />
          <Route
            exact
            path="/translate"
            element={<Translation></Translation>}
          />
          <Route exact path="/complement" element={<Complement></Complement>} />
          <Route exact path="/fasta" element={<Fasta></Fasta>} />
          <Route exact path="/blast" element={<Blast></Blast>} />
          <Route exact path="/blast/:id" element={<BlastView></BlastView>} />
        </Routes>
        {/* <footer
          className="container p-2 text-center"
          style={{ backgroundColor: "#0A81AB", opacity: "0.8" }}
        >
          <p>
            Design and developed by Durrah Khan @email -{" "}
            <a href="#" className="text-light">
              durrahkhan555@gmail.com
            </a>
          </p>
          <p>Copy Right&copy; 2021</p>
        </footer> */}
      </Router>
    </div>
  );
};

export default App;
