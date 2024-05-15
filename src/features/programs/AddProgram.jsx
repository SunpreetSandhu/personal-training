import { set } from "date-fns";
import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProgramForm from "./CreateProgramForm";
import ProgramTable from "./ProgramTable";
function AddProgram() {
  return (
    <Modal>
      <Modal.Open opens="program-form">
        <Button>Add new program</Button>
      </Modal.Open>
      <Modal.Window name="program-form">
        <CreateProgramForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <ProgramTable />
      </Modal.Window>
    </Modal>
  );
}
// function AddProgram() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add New Program
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateProgramForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddProgram;
