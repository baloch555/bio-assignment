import { Button } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { count_occur } from "../../utils/editor.utils";
// import count_occur from '../../'
import "./editor.css";
const Editor = () => {
  const inputFile = useRef(null);
  const [sequenceData, setSequenceData] = useState([]);
  const [result, setResult] = useState({});
  const [identifier, setIdentifier] = useState(null);
  useEffect(() => {
    if (sequenceData.length > 0) {
      let sequence = sequenceData.join("").split("");
      let sequenceLength = sequence.length;
      let occourence = count_occur(sequence);
      let CG = 0;
      let AT = 0;
      occourence.forEach((doc) => {
        if (doc.str === "C") CG += doc.count;
        if (doc.str === "G") CG += doc.count;
        if (doc.str === "A") AT += doc.count;
        if (doc.str === "T") AT += doc.count;
      });
      let CG_PERC = (CG / sequenceLength) * 100;
      let AT_PERC = (AT / sequenceLength) * 100;
      setResult({
        identifier,
        sequence: sequenceData,
        sequenceLength,
        occourence,
        CG_PERC,
        AT_PERC,
      });
    }
  }, [sequenceData]);
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    const reader = new FileReader();
    let sequence = "";
    reader.onload = async (e) => {
      sequence = reader.result;
      // console.log(sequence);
      sequence = String(sequence).split("\n");
      let identifier = sequence.shift();
      setIdentifier(identifier);
      setSequenceData(sequence);
    };
    reader.readAsText(file);
  };
  const handleSelection = () => {
    let text = document.getSelection().anchorNode;
    console.log(text);
    let sequence = result.sequence.join("");
    console.log(sequence.indexOf(text));
  };
  return (
    <div className="editor-wrapper">
      <div>
        <h2 className="m-3">Editor</h2>
      </div>
      <Row>
        <Col className="col-lg-10">
          <Card className="text-editor">
            <Card.Header className="text-white">Editor</Card.Header>
            <Card.Body className="editor-body">
              <div
                style={{
                  maxHeight: "70vh",
                  overflowY: "scroll",
                }}
                onClickCapture={handleSelection}
              >
                <span
                  style={{
                    overflowY: "scroll",
                  }}
                >
                  {result?.sequence?.map((seq) => (
                    <span>{seq}</span>
                  ))}
                </span>
              </div>
            </Card.Body>
            <Card.Footer className="text-white">Edited By</Card.Footer>
          </Card>
        </Col>
        <Col>
          {/* <ul className="editor-menu"> */}
          {/* <li> */}
          <div
            className="bg-primary btn btn-medium text-white"
            style={{ border: "none", width: "100%", marginBottom: "10px" }}
            onClick={onButtonClick}
          >
            <input
              type="file"
              id="file"
              accept=".fasta, .fa"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(e) => onChangeFile(e)}
            />{" "}
            Open File
          </div>
          {/* </li> */}
          {/* </ul> */}
          <Card>
            <Card.Body
              className="bg-secondary"
              style={{ minHeight: "74vh", width: "260px" }}
            >
              <h3 className="text-white">File Output</h3>
              <div>
                <div className="mb-1 mt-1">
                  {result?.identifier && (
                    <>
                      <h5 className="text-white bg-primary p-1">IDENTIFIER</h5>
                      <span className="text-white">{result?.identifier}</span>
                    </>
                  )}
                </div>
                <div className="mb-1 mt-1">
                  {result?.sequenceLength && (
                    <>
                      <h5 className="text-white bg-primary p-1">
                        SEQUENCE LENGTH
                      </h5>
                      <span className="text-white">
                        {result?.sequenceLength}
                      </span>
                    </>
                  )}
                </div>
                <div className="mb-1 mt-1">
                  {result?.occourence && (
                    <>
                      <h5 className="text-white bg-primary p-1">
                        BASE OCCUERENCE
                      </h5>
                      <table className="table">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th>Base</th>
                            <th>Count</th>
                          </tr>
                        </thead>
                        <tbody className="text-white">
                          {result?.occourence?.map((doc) => (
                            <tr className="bg-dark">
                              <td>{doc.str}</td>
                              <td>{doc.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
                <div className="mb-1 mt-1">
                  {result?.CG_PERC && (
                    <>
                      <h5 className="text-white bg-primary p-1">
                        CG PERCENTAGE
                      </h5>
                      <span className="text-white">
                        {result?.CG_PERC?.toFixed(2) + "%"}
                      </span>
                    </>
                  )}
                </div>
                <div className="mb-1 mt-1">
                  {result?.AT_PERC && (
                    <>
                      <h5 className="text-white bg-primary p-1">
                        AT PERCENTAGE
                      </h5>
                      <span className="text-white">
                        {result?.AT_PERC?.toFixed(2) + "%"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Editor;
