import { useState } from "react";
import { IoInformationOutline } from "react-icons/io5";
import { Modal } from "../ui/Modal";
import { Instructions } from "../Sidebar/Instructions";

export const ShowInfoButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        aria-label="show game information"
        onClick={() => setModalOpen(true)}
        className="w-full py-4 flex justify-center text-slate-900 rounded font-semibold text-lg uppercase tracking-widest hover:text-cyan-100 hover:bg-slate-900 duration-150 bg-cyan-100"
      >
        <IoInformationOutline className="text-3xl" />
      </button>
      {modalOpen && (
        <Modal {...{ setModalOpen }}>
          <div>
            <Instructions />
            <button
              onClick={() => setModalOpen(false)}
              className="px-8 py-4 flex justify-center text-cyan-100 rounded font-semibold text-lg uppercase tracking-widest duration-150 bg-slate-900 hover:bg-cyan-100 hover:text-slate-900"
            >
              Thanks, got it!
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
