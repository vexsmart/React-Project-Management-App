import { useRef } from "react";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

export default function NewProject(props) {
  const modal = useRef();
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const dateRef = useRef("");

  function handleSave() {
    const enteredTitle = titleRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDueDate = dateRef.current.value;

    //validation
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    const projectData = {
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    };

    props.onProjectData(projectData);
  }

  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 my-4">
          Invalid Input!
        </h2>
        <p className="text-stone-600 mb-4">
          Ops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={props.cancel}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type={"text"} ref={titleRef} label={"Title"} />
          <Input ref={descriptionRef} label={"Description"} textarea />
          <Input type={"date"} ref={dateRef} label={"Due Date"} />
        </div>
      </div>
    </>
  );
}
