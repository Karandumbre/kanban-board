import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOARD_BY_ID } from "queries";

export const Header = () => {
  const { boardId } = useParams();

  const { data } = useQuery(GET_BOARD_BY_ID, {
    variables: { id: boardId },
    skip: !boardId,
  });

  return (
    <div className="app_nav">
      <h1>{data?.getBoard.name}</h1>
    </div>
  );
};
