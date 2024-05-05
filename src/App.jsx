import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";
import Row from "./ui/Row";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  padding: 20px;
`;
function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">Personal Training</Heading>
            <div>
              <Heading as="h2">Enroll/Leave Program</Heading>
              <Button
                variation="primary"
                size="medium"
                onClick={() => alert("enroll")}
              >
                Enroll
              </Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("leave")}
              >
                Leave
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of clients" />
              <Input type="number" placeholder="Number of clients" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
