import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Table, Button } from "react-bootstrap";
const BlastView = (props) => {
  const search = useLocation();
  const id = search.pathname.split("/")[2];
  const { result, alignments, loading, error } = useSelector(
    (state) => state.blastReducer
  );
  let data = {};
  result.map((re) => {
    if (re.alignment === id) data = re;
  });
  console.log(data);
  return (
    <Container className="p-3">
      <h4 className="text-center text-danger bg-danger text-white p-2">
        TITLE: {data.title.toUpperCase()}
      </h4>
      <h4 className="text-center bg-light p-2 text-dark">
        Detail Description of {data.alignment}
      </h4>
      <Table style={{ border: "none" }} hover variant="dark" className="">
        <tbody
          style={{
            borderColor: "rgba(0,0,0,.5",
          }}
        >
          {/* <tr>
            <td className="col-24">****Alignment****</td>
          </tr> */}
          <tr>
            <td className="col-2 bg-success">Title</td>
            <td className="col-8 bg-danger">{data.title}</td>
          </tr>
          <tr>
            <td className="col-4 bg-success">DNA Length</td>
            <td className="col-8 bg-danger">{data.length}</td>
          </tr>
          <tr>
            <td className="col-4 bg-success">Expect Value</td>
            <td className="col-8 bg-danger">{data.e_value}</td>
          </tr>
          <tr>
            <td className="col-4 bg-success">Query</td>
            <td className="col-8 bg-danger">{data.query}</td>
          </tr>
          <tr>
            <td className="col-4 bg-success" style={{}}>
              Match
            </td>
            <td className="col-8 bg-danger">
              <span
                className="text-center"
                style={{ marginLeft: "100px", wordSpacing: "80px" }}
              >
                {data.match}
              </span>
            </td>
          </tr>
          <tr>
            <td className="col-4 bg-success">Subject</td>
            <td className="col-8 bg-danger">{data.subject}</td>
          </tr>
          <tr>
            <td className="col-4 bg-success">Score</td>
            <td className="col-8 bg-danger">{data.score}</td>
          </tr>
          <tr>
            <td className="col-4 bg-success">Subject Start</td>
            <td className="col-8 bg-danger">{data.subject_str}</td>
          </tr>
          {/* <tr>
            <td className="col-4">Subject End</td>
            <td className="col-8">{data.subject_end}</td>
          </tr>
          <tr>
            <td className="col-4">Query Start</td>
            <td className="col-8">{data.query_str}</td>
          </tr> */}
          <tr className="mb-3">
            <td className="col-4 bg-success">Query End</td>
            <td className="col-8 bg-danger">{data.query_end}</td>
          </tr>
          {/* <tr> */}
          <td className="col-3">
            <Button
              className="bg-success"
              style={{ marginTop: "10px", border: "none" }}
            >
              <i className="fas fa-arrow-left"></i> Previous
            </Button>
          </td>
          <td className="col-6">
            <Button
              //   style={{ float: "right" }}
              className="bg-danger"
              style={{ float: "right", border: "none", marginTop: "10px" }}
            >
              Next <i className="fas fa-arrow-right"></i>
            </Button>
          </td>
          {/* </tr> */}
        </tbody>
      </Table>
    </Container>
  );
};

export default BlastView;
