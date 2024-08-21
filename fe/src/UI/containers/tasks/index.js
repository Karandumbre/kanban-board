import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Dropdown } from "UI";
import { TaskDetailsModal } from "./task-details-modal";
import "./style.css";

export const Task = ({ card, removeCard }) => {
  const [task, setTasks] = useState({});

  useEffect(() => {
    setTasks(card || {});
  }, [card]);

  const updateSubTask = (subtasks) => {
    const updatedTask = { ...task, subtasks };
    setTasks(updatedTask);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const { id, title, subtasks } = task;

  return (
    <>
      <div onClick={openModal} className="card">
        <div className="card_top">
          <div className="card_top_more">
            <Dropdown
              className="board_dropdown"
              onClick={() => removeCard(id)}
              options={[
                {
                  label: "Delete Card",
                  data: id,
                },
              ]}
            />
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {subtasks && subtasks?.length > 0 ? (
            <p className="card_footer_item">
              {subtasks?.filter((item) => item.completed)?.length} of{" "}
              {subtasks?.length} subtasks
            </p>
          ) : (
            <p className="card_footer_item">0 of 0 subtasks</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="popup-modal subtask-card-pop"
      >
        <TaskDetailsModal
          updateSubTask={updateSubTask}
          task={task}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};
