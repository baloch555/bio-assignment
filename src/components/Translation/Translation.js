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
} from "react-bootstrap";
import { getTranslation, clearError } from "../../redux/action/translate";
import { saveAs } from "file-saver";

const Translation = () => {
  const dispatch = useDispatch();
  const [fromFileIsVissible, setIsFromFileIsVissible] = useState("none");
  const [fromInputIsVissible, setIsFromInputIsVissible] = useState("block");
  const [dnaSequence, setDnaSequence] = useState("");
  const [transcripionResult, setTranscription] = useState("");
  const [translationResult, setTranslation] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [loader, setLoader] = useState("");
  const [empty, setIsEmpty] = useState(false);
  const [errorFromApi, setErrorFromAPi] = useState(null);
  const { transcription, translation, loading, error } = useSelector(
    (state) => state.translationReducer
  );
  useEffect(() => {
    setTranscription(transcription);
    setTranslation(translation);
    const interval = setInterval(function () {
      setLoader(loading);
    }, 2000);
    return () => clearInterval(interval);
  }, [transcription, translation]);
  useEffect(() => {
    if (setErrorFromAPi !== null) {
      setErrorFromAPi(error);
      const intertval = setInterval(function () {
        dispatch(clearError());
      }, 3000);
      return () => clearInterval(intertval);
    }
  }, [error, setErrorFromAPi]);
  useEffect(() => {
    setDnaSequence("");
    setSelectedFile("");
    setTranscription("");
    setTranslation("");
  }, [empty]);
  const handleFetechTranscription = (e) => {
    setLoader(true);
    e.preventDefault();
    if (dnaSequence !== "") {
      dispatch(getTranslation(dnaSequence));
    }
    if (selectedFile !== "") {
      var text = selectedFile;
      text = text.split("\n");
      text.splice(0, 1);
      text = text.toString();
      text = text.replaceAll(",", "");
      console.log(text);
      dispatch(getTranslation(text));
    }
  };
  const changeHandler = (event) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setSelectedFile(reader.result);
    };
    reader.readAsText(event.target.files[0]);
  };
  const saveStaticDataToFile = () => {
    if (transcripionResult !== "") {
      const transcripionResultToFile = transcripionResult.replaceAll("*", "\n");
      var blob = new Blob([transcripionResultToFile], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "translate.txt");
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
      <h1 className="text-center mt-3">DNA TRANSLATION</h1>
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
            <div>
              <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>DNA TRANSCRIPTION</Form.Label>
                <Form.Control
                  style={{ textTransform: "uppercase" }}
                  type="text"
                  placeholder="MESSANGER RNA"
                  className=""
                  value={transcripionResult.toUpperCase()}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>RESULT: PROTEIN PEPTIDE</Form.Label>
                <Form.Control
                  style={{ textTransform: "uppercase" }}
                  as="textarea"
                  placeholder="PROTEIN PEPTIDE"
                  style={{ height: "100px", fontWeight: "bold" }}
                  // className="bg-light"
                  value={translationResult.toUpperCase()}
                  readOnly={true}
                />
              </Form.Group>
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
          {loader === true && error === null ? (
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
            <div>
              <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>DNA TRANSCRIPTION</Form.Label>
                <Form.Control
                  style={{ textTransform: "uppercase" }}
                  type="text"
                  placeholder="Enter your dna sequence"
                  className=""
                  value={transcripionResult.toUpperCase()}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>RESULT: PROTEIN PEPTIDE</Form.Label>
                <Form.Control
                  style={{ textTransform: "uppercase" }}
                  as="textarea"
                  placeholder="PROTEIN PEPTIDE"
                  style={{ height: "100px", fontWeight: "bold" }}
                  // className="bg-light"
                  value={translationResult.toUpperCase()}
                  readOnly={true}
                />
              </Form.Group>
            </div>
          )}
        </Form>
      </div>
      <div>
        <Button
          variant="danger"
          style={{ marginLeft: "7px", position: "absolute", left: "75px" }}
        >
          Learn About Translation <i className="fas fa-book-open"></i>
        </Button>
        <Button
          variant="danger"
          style={{ marginLeft: "7px", position: "absolute", right: "90px" }}
          onClick={saveStaticDataToFile}
        >
          SAVE RESULT TO FILE
          <i className="fas fa-folder" style={{ marginLeft: "6px" }}></i>
        </Button>
      </div>
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
          className="mt-3"
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
          className="mt-3"
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

export default Translation;
