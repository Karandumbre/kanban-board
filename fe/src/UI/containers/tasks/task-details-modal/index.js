import React from "react";
import { SubtaskManager } from "./sub-task-manager";

export const TaskDetailsModal = ({ task, closeModal, updateSubTask }) => {
  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Task: {task.title}</h2>
      <SubtaskManager
        taskId={task.id}
        subtasks={task.subtasks}
        updateSubTaskHandler={updateSubTask}
      />
      <button
        onClick={closeModal}
        className="cancel"
        style={{
          marginTop: "20px",
        }}
      >
        Close
      </button>
    </div>
  );
};
