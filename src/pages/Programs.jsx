import { useEffect } from "react";
import { getPrograms } from "../services/apiPrograms";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Programs() {
  useEffect(function () {
    getPrograms().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All programs</Heading>
      <p>TEST</p>
      <img src="https://kgmtpxeccxdasvbmmgny.supabase.co/storage/v1/object/public/program-images/program-001.jpg" />
    </Row>
  );
}

export default Programs;
