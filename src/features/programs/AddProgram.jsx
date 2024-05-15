import { set } from "date-fns";
import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProgramForm from "./CreateProgramForm";

function AddProgram() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add New Program
      </Button>
      {isOpenModal && (
        <Modal>
          <CreateProgramForm />
        </Modal>
      )}
    </div>
  );
}

export default AddProgram;
