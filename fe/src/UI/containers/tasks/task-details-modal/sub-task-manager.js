import React, { useState, useCallback } from "react";
import { debounce } from "lodash";

import { useMutation } from "@apollo/client";
import { CREATE_SUBTASK, UPDATE_SUBTASK, DELETE_SUBTASK } from "queries";
import { Trash2 } from "react-feather";

export const SubtaskManager = ({ taskId, subtasks, updateSubTaskHandler }) => {
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [editingSubtask, setEditingSubtask] = useState(null);

  const [createSubtask] = useMutation(CREATE_SUBTASK);

  const [updateSubtask] = useMutation(UPDATE_SUBTASK);

  const [deleteSubtask] = useMutation(DELETE_SUBTASK);

  const handleCreateSubtask = async () => {
    try {
      const { data } = await createSubtask({
        variables: { title: subtaskTitle, taskId },
      });
      const updatedSubtasks = [...subtasks, data.createSubtask];
      updateSubTaskHandler(updatedSubtasks);
      setSubtaskTitle("");
    } catch (error) {
      console.error("Error creating subtask:", error);
    }
  };

  const handleUpdateSubtask = useCallback(
    debounce(async (id, title, completed) => {
      try {
        const { data } = await updateSubtask({
          variables: { id, title, completed },
        });

        const updatedSubtasks = subtasks.map((subtask) =>
          subtask.id === id
            ? {
                ...subtask,
                title: data.updateSubtask.title,
                completed: data.updateSubtask.completed,
              }
            : subtask
        );
        updateSubTaskHandler(updatedSubtasks);
        setEditingSubtask(null);
      } catch (error) {
        console.error("Error updating subtask:", error);
      }
    }, 1000),
    [subtasks]
  );

  const handleDeleteSubtask = async (id) => {
    try {
      await deleteSubtask({
        variables: { id },
      });

      const updatedSubtasks = subtasks.filter((subtask) => subtask.id !== id);
      updateSubTaskHandler(updatedSubtasks);
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  return (
    <div>
      {subtasks?.length > 0 ? (
        <>
          <h3>Subtasks</h3>
          <hr style={{ margin: 10 }} />
          <ul>
            {subtasks.map((subtask) => (
              <>
                <div
                  key={subtask.id}
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {editingSubtask === subtask.id ? (
                      <input
                        type="text"
                        className="text-editable-input"
                        defaultValue={subtask.title}
                        onChange={(e) =>
                          handleUpdateSubtask(
                            subtask.id,
                            e.target.value,
                            subtask.completed
                          )
                        }
                        onBlur={() => setEditingSubtask(null)}
                      />
                    ) : (
                      <span onClick={() => setEditingSubtask(subtask.id)}>
                        Title: {subtask.title}
                      </span>
                    )}

                    <div>
                      <label htmlFor="check-completed">Completed: </label>
                      <input
                        name="check-completed"
                        id="check-completed"
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() =>
                          handleUpdateSubtask(
                            subtask.id,
                            subtask.title,
                            !subtask.completed
                          )
                        }
                      />
                    </div>

                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <label htmlFor="delete-subtask">Delete</label>
                      <Trash2
                        id="delete-subtask"
                        name="delete-subtask"
                        onClick={() => handleDeleteSubtask(subtask.id)}
                        style={{
                          width: 14,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <hr style={{ margin: 10 }} />
              </>
            ))}
          </ul>
        </>
      ) : null}

      <section style={{ marginTop: 20 }}>
        <p>Add new sub task</p>
        <input
          type="text"
          value={subtaskTitle}
          onChange={(e) => setSubtaskTitle(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleCreateSubtask}>Add Subtask</button>
      </section>
    </div>
  );
};
