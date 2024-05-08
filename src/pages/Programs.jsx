import { useEffect } from "react";
import ProgramTable from "../features/programs/ProgramTable";
import { getPrograms } from "../services/apiPrograms";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
function Programs() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All programs</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <ProgramTable />
      </Row>
    </>
  );
}

export default Programs;
