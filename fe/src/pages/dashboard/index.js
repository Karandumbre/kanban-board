import React from "react";
import { useState } from "react";
import { Editable, Column } from "UI";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOARD_BY_ID, ADD_COLUMN, REMOVE_COLUMN } from "queries";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Modal from "react-modal";

export const Dashboard = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { boardId } = useParams();
  const { loading, error, data } = useQuery(GET_BOARD_BY_ID, {
    variables: { id: boardId },
    skip: !boardId,
  });
  const [columns, setColumns] = useState([]);
  const [addColumnMutationHandler] = useMutation(ADD_COLUMN);
  const [deleteColumnMutationHandler] = useMutation(REMOVE_COLUMN);

  useEffect(() => {
    if (data?.getBoard.columns) {
      setColumns(data?.getBoard.columns || []);
    }
  }, [data?.getBoard.columns]);

  const addColumnHandler = async (name) => {
    const { data, error } = await addColumnMutationHandler({
      variables: { name, boardId },
    });
    if (error) {
      return false;
    }
    setColumns([...columns, data?.createColumn]);
  };

  const removeColumn = async (id) => {
    const selectedColumn = columns.find((item) => item.id === id);

    if (selectedColumn.tasks.length > 0) {
      alert("Please delete all tasks in the column");
      return;
    }

    const { error } = await deleteColumnMutationHandler({
      variables: {
        deleteColumnId: id,
      },
    });

    if (error) {
      return false;
    }

    const index = columns.findIndex((item) => item.id === id);
    if (index < 0) {
      return;
    }

    const tempColumns = [...columns];
    tempColumns.splice(index, 1);
    setColumns(tempColumns);
  };

  if (!boardId) {
    return <p>No board selected.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="app_boards_container">
      <div className="app_boards">
        {columns.map((item) => {
          return (
            <Column
              key={item.id}
              item={item}
              removeColumn={() => removeColumn(item.id)}
            />
          );
        })}
        <div className="app_boards_last" onClick={() => setIsOpen(true)}>
          <div>+ New Column</div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className="popup-modal"
        overlayClassName="modal-overlay"
      >
        <Editable
          state={true}
          displayClass="app_boards_add-board"
          editClass="app_boards_add-board_edit"
          placeholder="Enter Column Name"
          text="Add Column"
          buttonText="Add Column"
          onSubmit={addColumnHandler}
          closeButton={
            <button
              type="button"
              className="cancel"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          }
        />
      </Modal>
    </div>
  );
};
