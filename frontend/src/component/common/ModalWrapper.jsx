import { Box, Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 1.5,
};

const ModalWrapper = ({ children, ...others }) => {
  return (
    <Modal {...others}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalWrapper;
