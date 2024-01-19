import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import * as React from "react";

export default function CustomTableToolbar() {
  const apiRef = useGridApiContext();

  return (
    <GridToolbarContainer
      style={{
        flexDirection: "column",
        position: "absolute",
        left: "-58px",
        borderRadius: 10,
        backgroundColor: "#FFF",
      }}
      className="shadow-container"
    >
      <GridToolbarColumnsButton
        component={(props) => (
          <IconButton
            aria-label="share"
            color="primary"
            onClick={props.onClick}
          >
            <ViewColumnIcon />
          </IconButton>
        )}
      />

      <IconButton
        aria-label="reset"
        color="primary"
        onClick={() => apiRef.current.showFilterPanel()}
      >
        <FilterListIcon />
      </IconButton>
      <IconButton
        aria-label="save"
        color="primary"
        onClick={() => apiRef.current.exportDataAsCsv()}
      >
        <SaveAltIcon />
      </IconButton>
    </GridToolbarContainer>
  );
}
