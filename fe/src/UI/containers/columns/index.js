import React, { useEffect, useState } from "react";

import { Task, Dropdown, Editable } from "UI";

import { useMutation } from "@apollo/client";
import { DELETE_TASK, ADD_TASK, UPDATE_TASK } from "queries";

import "./style.css";

export const Column = ({ item, removeColumn }) => {
  const [deleteTaskMutationHandler] = useMutation(DELETE_TASK);
  const [tasks, setTasks] = useState([]);
  const [addTaskMutationHandler] = useMutation(ADD_TASK);
  const [updateTaskMutationHandler] = useMutation(UPDATE_TASK);

  useEffect(() => {
    setTasks(item.tasks);
  }, [item.tasks]);

  const addTaskHandler = async (name) => {
    const { data, error } = await addTaskMutationHandler({
      variables: { title: name, columnId: item.id },
    });

    if (error) {
      return false;
    }
    const updatedTasks = [...tasks, data.createTask];
    setTasks([...updatedTasks]);
  };

  const removeTask = async (taskId) => {
    const { error } = await deleteTaskMutationHandler({
      variables: { deleteTaskId: taskId },
    });

    if (error) {
      return false;
    }

    const updatedTasks = [...tasks];
    const cardIndex = tasks.findIndex((item) => {
      return item.id === taskId;
    });
    updatedTasks.splice(cardIndex, 1);
    setTasks(updatedTasks);
  };

  const updateTask = (card) => {
    const { error } = updateTaskMutationHandler({
      variables: { id: card.id, title: card.title },
    });

    if (error) {
      return;
    }

    const cardIndex = tasks.findIndex((item) => item.id === card.id);
    if (cardIndex < 0) return;

    tasks[cardIndex] = card;
    setTasks(tasks);
  };

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {item?.name}
          <span>{item?.tasks?.length || 0}</span>
        </p>
        <div className="board_header_title_more">
          <Dropdown
            className="board_dropdown"
            onClick={() => removeColumn(item.id)}
            options={[
              {
                label: "Delete column",
              },
            ]}
          />
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {tasks?.map((task) => (
          <Task
            key={task.id}
            card={task}
            boardId={item.id}
            removeCard={removeTask}
            updateCard={updateTask}
          />
        ))}
        <Editable
          text="+ Add Task"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => addTaskHandler(value)}
        />
      </div>
    </div>
  );
};
