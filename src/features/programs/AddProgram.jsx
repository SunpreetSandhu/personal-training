import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProgramForm from "./CreateProgramForm";
import ProgramTable from "./ProgramTable";
function AddProgram() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="program-form">
          <Button>Add new program</Button>
        </Modal.Open>
        <Modal.Window name="program-form">
          <CreateProgramForm />
        </Modal.Window>
      </Modal>
    </div>
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
