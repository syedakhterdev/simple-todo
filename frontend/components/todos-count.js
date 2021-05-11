import React, { useMemo } from "react";
import { Box } from "@material-ui/core";

export const TodosCount = ({ todos }) => {
  const completedTodos = useMemo(() => {
    return todos.filter((item) => item.isCompleted);
  }, [todos]);
  return (
    <Box display="flex" justifyContent="space-around" width="230px">
      <span style={{ fontSize: "18px", fontWeight: 700 }}>
        Completed: {completedTodos.length}
      </span>
      <span style={{ fontSize: "18px", fontWeight: 700 }}>
        Pending: {todos.length - completedTodos.length}
      </span>
    </Box>
  );
};
