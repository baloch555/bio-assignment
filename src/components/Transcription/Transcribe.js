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
  Modal,
} from "react-bootstrap";
import { getTranscription, clearError } from "../../redux/action/transcribe";
import { saveAs } from "file-saver";

const Transcribe = () => {
  const dispatch = useDispatch();
  const [fromFileIsVissible, setIsFromFileIsVissible] = useState("none");
  const [fromInputIsVissible, setIsFromInputIsVissible] = useState("block");
  const [dnaSequence, setDnaSequence] = useState("");
  const [transcripionResult, setTranscription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [loader, setLoader] = useState(false);
  const [empty, setIsEmpty] = useState(false);
  const [errorFromApi, setErrorFromAPi] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const { transcription, loading, error } = useSelector(
    (state) => state.transcriptionReducer
  );
  useEffect(() => {
    setTranscription(transcription);
    const interval = setInterval(function () {
      setLoader(loading);
    }, 2000);
    return () => clearInterval(interval);
  }, [transcription]);
  // useEffect(() => {
  //   setErrorFromAPi(error);
  //   const intertval = setInterval(function () {
  //     dispatch(clearError());
  //   }, 5000);
  //   return () => clearInterval(intertval);
  // }, []);
  useEffect(() => {
    setDnaSequence("");
    setSelectedFile("");
    setTranscription("");
  }, [empty]);
  const handleFetechTranscription = (e) => {
    setLoader(true);
    e.preventDefault();
    if (dnaSequence !== "") {
      dispatch(getTranscription(dnaSequence));
    }
    if (selectedFile !== "") {
      var text = selectedFile;
      text = text.split("\n");
      text.splice(0, 1);
      text = text.toString();
      dispatch(getTranscription(text));
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
      const transcripionResultToFile = transcripionResult.replaceAll(",", "\n");
      var blob = new Blob([transcripionResultToFile], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "static.txt");
    }
  };
  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable={true}
      >
        <Modal.Header closeButton style={{ msOverflowY: "scroll" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            DNA Transcription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto" }}>
          <h4 className="text-bold">Overview of Transcription</h4>
          <p>
            Transcription is the first step in gene expression, in which
            information from a gene is used to construct a functional product
            such as a protein. The goal of transcription is to make a RNA copy
            of a gene's DNA sequence. For a protein-coding gene, the RNA copy,
            or transcript, carries the information needed to build a polypeptide
            (protein or protein subunit). Eukaryotic transcripts need to go
            through some processing steps before translation into proteins.
          </p>
          <br></br>
          <img
            className="text-center"
            src="https://cdn.kastatic.org/ka-perseus-images/20ce29384b2e7ff0cdea72acaa5b1dbd7287ab00.png"
            style={{ width: "750px", height: "300px" }}
          />
          <h4 className="text-bold">RNA polymerase</h4>
          <p>
            The main enzyme involved in transcription is RNA polymerase, which
            uses a single-stranded DNA template to synthesize a complementary
            strand of RNA. Specifically, RNA polymerase builds an RNA strand in
            the 5' to 3' direction, adding each new nucleotide to the 3' end of
            the strand.
          </p>
          <img
            src="https://cdn.kastatic.org/ka-perseus-images/1e40590670cfdc967a5fe54d2e204df30e761232.png"
            style={{ width: "750px", height: "300px" }}
          />
          <br />
          <h4 className="text-bold">Stages of transcription</h4>
          <p>
            Transcription of a gene takes place in three stages: initiation,
            elongation, and termination. Here, we will briefly see how these
            steps happen in bacteria. You can learn more about the details of
            each stage (and about how eukaryotic transcription is different) in
            the stages of transcription article.
          </p>
          <ol style={{}}>
            <li>
              <b>.Initiation:</b>
              RNA polymerase binds to a sequence of DNA called the promoter,
              found near the beginning of a gene. Each gene (or group of
              co-transcribed genes, in bacteria) has its own promoter. Once
              bound, RNA polymerase separates the DNA strands, providing the
              single-stranded template needed for transcription.
              <img
                src="https://cdn.kastatic.org/ka-perseus-images/22a15818999b09a1ba58a9abaadfe1045c93d2f4.png"
                style={{ width: "700px", height: "350px" }}
              />
              <br />
            </li>

            <li>
              <b>.Elongation: </b>
              One strand of DNA, the template strand, acts as a template for RNA
              polymerase. As it "reads" this template one base at a time, the
              polymerase builds an RNA molecule out of complementary
              nucleotides, making a chain that grows from 5' to 3'. The RNA
              transcript carries the same information as the non-template
              (coding) strand of DNA, but it contains the base uracil (U)
              instead of thymine (T).
              <img
                src="https://cdn.kastatic.org/ka-perseus-images/1da89713b9aa8067742244d916749e72561bb3cc.png"
                style={{ width: "700px", height: "350px" }}
              />
            </li>

            <li>
              <b>.Termination: </b>
              Sequences called terminators signal that the RNA transcript is
              complete. Once they are transcribed, they cause the transcript to
              be released from the RNA polymerase. An example of a termination
              mechanism involving formation of a hairpin in the RNA is shown
              below.
              <img
                src="https://cdn.kastatic.org/ka-perseus-images/4ffa46e26f38c8f8f1cbeccfec11781840f5a58d.png"
                style={{ width: "700px", height: "350px" }}
              />
              <br />
            </li>
          </ol>
          <h4 className="text-bold">
            Transcription happens for individual genes
          </h4>
          <p>
            Not all genes are transcribed all the time. Instead, transcription
            is controlled individually for each gene (or, in bacteria, for small
            groups of genes that are transcribed together). Cells carefully
            regulate transcription, transcribing just the genes whose products
            are needed at a particular moment. For example, the diagram below
            shows a "snapshot" of an imaginary cell's RNAs at a given moment in
            time. In this cell, genes 1, 2 and 3, are transcribed, while gene 4
            is not. Also, genes 1, 2, and 3 are transcribed at different levels,
            meaning that different numbers of RNA molecules are made for each.
          </p>
          <img
            src="https://cdn.kastatic.org/ka-perseus-images/6e36d06efd0ea6d9a0e9c4596f91f2e539be2425.png"
            style={{ width: "700px", height: "350px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
      <h1 className="text-center mt-3">DNA TRANSCRIPTION</h1>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>RESULT: MESSANGER RNA</Form.Label>
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
              <Form.Control
                as="textarea"
                placeholder="MESSANGER RNA"
                style={{ height: "100px", fontWeight: "bold" }}
                // className="bg-light"
                value={transcripionResult.toUpperCase()}
                readOnly={true}
              />
            )}
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>RESULT</Form.Label>
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
              <Form.Control
                as="textarea"
                placeholder="MESSANGER RNA"
                style={{ height: "100px", fontWeight: "bold" }}
                // className="bg-light"
                value={transcripionResult.toUpperCase()}
                readOnly={true}
              />
            )}
          </Form.Group>
        </Form>
      </div>
      <div>
        <Button
          variant="danger"
          style={{ marginLeft: "7px", position: "absolute", left: "75px" }}
          onClick={() => setModalShow(true)}
        >
          Learn About Transcription <i className="fas fa-book-open"></i>
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

export default Transcribe;
