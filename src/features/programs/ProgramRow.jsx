import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { deleteProgram } from "../../services/apiPrograms";
import { formatCurrency } from "../../utils/helpers";
import CreateProgramForm from "./CreateProgramForm";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Program = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function ProgramRow({ program }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: programId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = program;

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      toast.success("program successfully deleted");
      //invalidate so react query refetches data
      queryClient.invalidateQueries({
        queryKey: ["program"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Program>{name}</Program>
        <div>Space for up to {maxCapacity} clients</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button onClick={() => mutate(programId)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateProgramForm programToEdit={program} />}
    </>
  );
}

export default ProgramRow;
