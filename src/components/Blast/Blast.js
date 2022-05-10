import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
  Table,
} from "react-bootstrap";
import { getBlastData, clearError } from "../../redux/action/blast";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

const Blast = () => {
  const dispatch = useDispatch();
  const [fromFileIsVissible, setIsFromFileIsVissible] = useState("none");
  const [fromInputIsVissible, setIsFromInputIsVissible] = useState("block");
  const [dnaSequence, setDnaSequence] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [loader, setLoader] = useState(false);
  const [empty, setIsEmpty] = useState(false);
  const [errorFromApi, setErrorFromAPi] = useState(null);
  const { result, alignments, loading, error } = useSelector(
    (state) => state.blastReducer
  );
  const [blastResult, setBlastResult] = useState([result]);
  const [alignmentResult, setAlignmentResult] = useState(alignments);
  console.log("Loader => ", loader);
  useEffect(() => {
    console.log("Blast Changed => ", alignments);
    setAlignmentResult(alignments);
    setBlastResult(result);
    setLoader(loading);
  }, [alignments, loading]);
  console.log("Al => ", alignmentResult);
  // useEffect(() => {
  //   setErrorFromAPi(error);
  //   const intertval = setInterval(function () {
  //     // dispatch(clearError());
  //   }, 5000);
  //   return () => clearInterval(intertval);
  // }, [error]);
  // useEffect(() => {
  //   setDnaSequence("");
  //   setSelectedFile("");
  //   setAlignmentResult("");
  // }, [empty]);
  const handleFetechTranscription = (e) => {
    setLoader(true);
    e.preventDefault();
    if (dnaSequence !== "") {
      dispatch(getBlastData(dnaSequence));
    }
    // else if (selectedFile !== "") {
    //   var text = selectedFile;
    //   text = text.split("\n");
    //   text.splice(0, 1);
    //   text = text.toString();
    //   dispatch(getBlastData(text));
    // }
  };
  const changeHandler = (event) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setSelectedFile(reader.result);
    };
    reader.readAsText(event.target.files[0]);
  };
  const saveStaticDataToFile = () => {
    if (alignmentResult !== "") {
      const alignmentResultToFile = alignmentResult.replaceAll(",", "\n");
      var blob = new Blob([alignmentResultToFile], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "static.txt");
    }
  };
  return (
    <Container>
      {errorFromApi !== null ? (
        <div>
          <Alert type="danger" variant="danger" headline="Optional Headline">
            {errorFromApi}
            <i
              onClick={() => {
                // error = null;
              }}
              className="fas fa-times"
              style={{
                position: "absolute",
                right: "20px",
                padding: "5px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            ></i>
          </Alert>
        </div>
      ) : (
        <></>
      )}
      <h1 className="text-center mt-3">SEARCH BLAST</h1>
      <div className="fromInput">
        <Form
          onSubmit={(e) => handleFetechTranscription(e)}
          className=""
          style={{
            width: "100%",
            //   backgroundColor: "#171717",
            display: fromInputIsVissible,
          }}
        >
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label>DNA SEQUENCE</Form.Label>
            <Col sm="10">
              <Form.Control
                style={{ textTransform: "uppercase" }}
                type="text"
                placeholder="Enter your dna sequence"
                className="bg-dark text-light"
                onChange={(e) => {
                  setDnaSequence(e.target.value.toUpperCase());
                }}
              />
            </Col>
            <Col>
              <Button
                type="submit"
                variant="primary"
                sm="1"
                style={{ padding: "6px 15px", fontWeight: "bold" }}
                // onClick={handleFetechTranscription}
              >
                PROCESS DNA
                <i className="fas fa-cog" style={{ marginLeft: "7px" }}></i>
              </Button>
            </Col>
          </Form.Group>
          {loader === true ? (
            <div
              style={{
                flex: "1",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "45%",
                marginTop: "80px",
              }}
            >
              <Spinner
                animation="border"
                role="status"
                style={{
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <br />
              <span style={{ marginLeft: "-80px" }}>
                Please wait 2 to 3 Minutes
              </span>
            </div>
          ) : (
            <div>
              <h2 className="text-center">Predicted Result</h2>
              <Table striped bordered hover variant="light">
                <thead>
                  <tr>
                    <th className="col-2">ID</th>
                    <th className="col-8">TITLE</th>
                    <th className="col-2">DNA LENGTH</th>
                  </tr>
                </thead>
                <tbody>
                  {alignmentResult.length > 0 &&
                    alignmentResult.map((al) => {
                      return (
                        <tr
                        // onClick={(window.location.href = `/blast/${al.id}`)}
                        >
                          <td className="col-2">{al.id}</td>
                          <td
                            className="col-8"
                            style={{
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            <Link
                              to={`/blast/${al.id}`}
                              className="text-primary"
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                            >
                              {al.title}{" "}
                            </Link>
                          </td>
                          <td className="col-8">{al.length}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          )}
        </Form>
      </div>
      <div
        className="fromFile"
        style={{
          display: fromFileIsVissible,
        }}
      >
        <Form
          className=""
          style={{
            width: "100%",
            //   backgroundColor: "#171717",
          }}
          onSubmit={(e) => handleFetechTranscription(e)}
        >
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choose File</Form.Label>
            <Row>
              <Col sm="10">
                <Form.Control type="file" onChange={changeHandler} />
              </Col>
              <Col sm="2">
                <Button
                  type="submit"
                  variant="primary"
                  sm="1"
                  style={{ padding: "6px 15px", fontWeight: "bold" }}
                  // onClick={handleFetechTranscription}
                >
                  PROCESS DNA
                  <i className="fas fa-cog" style={{ marginLeft: "7px" }}></i>
                </Button>
              </Col>
            </Row>
          </Form.Group>
          {loader === true ? (
            <div
              style={{
                flex: "1",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "45%",
              }}
            >
              <Spinner
                animation="border"
                role="status"
                style={{
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <></>
          )}
        </Form>
      </div>
      {/* <div>
        <Button
          variant="danger"
          style={{ marginLeft: "7px", position: "absolute", right: "90px" }}
          onClick={saveStaticDataToFile}
        >
          SAVE RESULT TO FILE
          <i className="fas fa-folder" style={{ marginLeft: "6px" }}></i>
        </Button>
      </div> */}
      <Button variant="danger" style={{ float: "right" }}>
        Learn About Blast <i className="fas fa-book-open"></i>
      </Button>
      <div
        style={{
          //   width: "100%",
          margin: "auto",
          width: "20%",
          padding: "10px",
          display: fromFileIsVissible,
        }}
      >
        <h5
          className="mt-5"
          style={{
            marginLeft: "-20px",
          }}
        >
          Choose from Input Box
        </h5>
        <Button
          onClick={() => {
            setIsFromInputIsVissible("block");
            setIsFromFileIsVissible("none");
            setIsEmpty(true);
          }}
          className="btn-danger"
          style={{
            display: "block",
            height: "80px",
            width: "80px",
            borderRadius: "50%",
            marginLeft: "35px",
          }}
        >
          <i className="fas fa-refresh"></i>
        </Button>
      </div>
      <div
        style={{
          //   width: "100%",
          margin: "auto",
          width: "20%",
          padding: "10px",
          display: fromInputIsVissible,
        }}
      >
        <h5
          className="mt-5"
          style={{
            marginLeft: "10px",
          }}
        >
          Choose from file
        </h5>
        <Button
          onClick={() => {
            setIsFromInputIsVissible("none");
            setIsFromFileIsVissible("block");
          }}
          className="btn-danger"
          style={{
            display: "block",
            height: "80px",
            width: "80px",
            borderRadius: "50%",
            marginLeft: "35px",
          }}
        >
          <i className="fas fa-refresh"></i>
        </Button>
      </div>
    </Container>
  );
};

export default Blast;
