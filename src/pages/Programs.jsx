import { useEffect, useState } from "react";
import CreateProgramForm from "../features/programs/CreateProgramForm";
import ProgramTable from "../features/programs/ProgramTable";
import { getPrograms } from "../services/apiPrograms";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
function Programs() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All programs</Heading>
        <p>Filter</p>
      </Row>
      <Row>
        <ProgramTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add New Program
        </Button>
        {showForm && <CreateProgramForm />}
      </Row>
    </>
  );
}

export default Programs;
