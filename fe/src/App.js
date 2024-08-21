import React, { useEffect, useState } from "react";

import { SideMenu, Header, Editable } from "UI";
import { useQuery, useMutation } from "@apollo/client";
import { getAllBoards, ADD_NEW_BOARD } from "queries";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const App = () => {
  const { loading, error, data } = useQuery(getAllBoards);
  const [boards, setBoards] = useState([]);
  const [openAddBoardModal, setOpenAddBoardModal] = useState(false);
  const [addBoardMutationHandler] = useMutation(ADD_NEW_BOARD);
  const navigate = useNavigate();

  const addBoardHandler = async (name) => {
    const { data, error } = await addBoardMutationHandler({
      variables: { name },
    });

    if (error) {
      return false;
    }

    setOpenAddBoardModal(false);
    setBoards([...boards, data.createBoard]);
  };

  useEffect(() => {
    setBoards(data?.getBoards || []);

    if (data?.getBoards) {
      return navigate(`/${data?.getBoards[0].id}`);
    }
  }, [data?.getBoards]);

  return (
    <div className="app">
      <SideMenu
        error={error}
        data={boards || []}
        isLoading={loading}
        handleOpenBoardModalState={setOpenAddBoardModal}
      />
      <div className="app-header-content_block">
        <Routes>
          <Route
            path="/:boardId"
            element={
              <>
                <Header />
                <main className="app-main-content-block">
                  <Dashboard />
                </main>
              </>
            }
          />
        </Routes>
      </div>

      <Modal
        isOpen={openAddBoardModal}
        onRequestClose={() => setOpenAddBoardModal(false)}
        className="popup-modal"
        overlayClassName="modal-overlay"
      >
        <Editable
          closeButton={
            <button
              type="button"
              className="cancel"
              onClick={() => setOpenAddBoardModal(false)}
            >
              Close
            </button>
          }
          state={true}
          displayClass="app_boards_add-board"
          editClass="app_boards_add-board_edit"
          placeholder="Enter Board Name"
          text="Add board"
          buttonText="Add board"
          onSubmit={addBoardHandler}
        />
      </Modal>
    </div>
  );
};
