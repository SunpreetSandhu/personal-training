import { useEffect, useState } from "react";
import AddProgram from "../features/programs/AddProgram";
import ProgramTable from "../features/programs/ProgramTable";
import ProgramTableOperations from "../features/programs/ProgramTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
function Programs() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All programs</Heading>
        <ProgramTableOperations />
      </Row>
      <Row>
        <ProgramTable />
        <AddProgram />
      </Row>
    </>
  );
}

export default Programs;
