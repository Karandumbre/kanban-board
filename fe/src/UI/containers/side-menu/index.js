import React from "react";
import { BarChart2, Columns } from "react-feather";
import { Link, useParams } from "react-router-dom";

import "./style.css";

export const SideMenu = ({ data, handleOpenBoardModalState }) => {
  const { boardId } = useParams();

  return (
    <div className="app-side-menu_block">
      <div className="app-side-menu_heading">
        <BarChart2 alt="kanban" className="kanban-header-icon_style" />
        <h1>kanban</h1>
      </div>

      <div className="side-menu-board-list_block_style">
        <p className="side-menu-board-list_para">
          All boards ({data?.length || 0})
        </p>
        {data?.length &&
          data.map((board, index) => {
            const isActive = index === boardId;
            return (
              <Link
                to={`/${board.id}`}
                className={`side-menu-board-list_style ${
                  isActive ? "active" : ""
                }`}
                key={`board-${board.name}-${index}`}
              >
                <Columns className="side-menu-board-list-icon_style" />
                {board.name}
              </Link>
            );
          })}
        <div className="side-menu-board-list-button_block">
          <Columns className="side-menu-board-list-icon_style" />
          <button
            className="side-menu-board-list-button_style"
            onClick={handleOpenBoardModalState}
          >
            + Create new board
          </button>
        </div>
      </div>
    </div>
  );
};
