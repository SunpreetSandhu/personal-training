import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import ProgramRow from "./ProgramRow";
import { usePrograms } from "./usePrograms";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function ProgramTable() {
  const { isLoading, programs } = usePrograms();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";
  let filteredPrograms;
  if (filterValue === "all") {
    filteredPrograms = programs;
  }
  if (filterValue === "no-discount") {
    filteredPrograms = programs.filter((program) => program.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredPrograms = programs.filter((program) => program.discount > 0);
  }

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  function compare(a, b) {
    if (a["name"] < b["name"]) {
      return -1 * modifier;
    }
    if (a["name"] > b["name"]) {
      return 1 * modifier;
    }
    return 0;
  }
  const sortedPrograms =
    field === "name"
      ? filteredPrograms.sort(compare)
      : filteredPrograms.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Program</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedPrograms}
          render={(program) => (
            <ProgramRow program={program} key={program.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ProgramTable;
