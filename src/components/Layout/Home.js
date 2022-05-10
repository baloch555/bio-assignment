import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Container className="mb-5">
      <h1 className="h1 text-center mt-4">
        Welcome to DNA Sequence Conversion App
      </h1>
      <div
        className=""
        style={{
          alignContent: "center",
          alignItems: "center",
          marginLeft: "",
          marginRight: "auto",
          width: "100%",
          marginBottom: "140px",
        }}
      >
        <div
          style={{
            // backgroundColor: "red",
            alignItems: "center",
            alignContent: "center",
            margin: "auto 21%",
            marginTop: "40px",
            padding: "10px",
          }}
        >
          <h2 className="h2 text-center mb-5">Please Choose Your Option</h2>
          <Link
            to="/transcribe"
            className="btn btn-primary"
            style={{
              width: "200px",
            }}
          >
            Transcribe
          </Link>
          {"  "}
          <Link
            to="/translate"
            className="btn btn-primary btn-block"
            style={{
              width: "200px",
            }}
          >
            Translate
          </Link>
          {"  "}
          <Link
            to="/complement"
            className="btn btn-primary btn-block"
            style={{
              width: "200px",
            }}
          >
            Complement
          </Link>
          {"  "}
          <br />
          <Link
            to="/fasta"
            className="btn btn-danger btn-block mt-3"
            style={{
              width: "300px",
            }}
          >
            Fasta
          </Link>
          {"  "}
          <Link
            to="/blast"
            className="btn btn-danger btn-block mt-3"
            style={{
              width: "305px",
            }}
          >
            Blast
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Home;
