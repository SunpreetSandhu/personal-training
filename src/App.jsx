import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">Personal Training</Heading>
        <Heading as="h2">Enroll/Leave Program</Heading>

        <Button onClick={() => alert("enroll")}>Enroll</Button>
        <Button onClick={() => alert("leave")}>Leave</Button>
        <Heading as="h3">Form</Heading>

        <Input type="number" placeholder="Number of clients" />
        <Input type="number" placeholder="Number of clients" />
      </StyledApp>
    </>
  );
}

export default App;
