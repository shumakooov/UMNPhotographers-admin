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
import { PropsWithChildren } from "react";

export default function CustomTableToolbar({
  onlySave = false,
  children,
}: PropsWithChildren<{ onlySave?: boolean }>) {
  const apiRef = useGridApiContext();

  return (
    <GridToolbarContainer
      style={{
        flexDirection: "column",
        position: "absolute",
        left: "-60px",
        borderRadius: 10,
        backgroundColor: "#FFF",
        padding: "8px",
      }}
      className="shadow-container"
    >
      {!onlySave && (
        <>
          <GridToolbarColumnsButton
            component={(props) => (
              <IconButton
                aria-label="share"
                color="primary"
                onClick={props.onClick}
              >
                <ViewColumnIcon fontSize="small" />
              </IconButton>
            )}
          />
          <IconButton
            aria-label="reset"
            color="primary"
            onClick={() => apiRef.current.showFilterPanel()}
          >
            <FilterListIcon fontSize="small" />
          </IconButton>
        </>
      )}
      <IconButton
        aria-label="save"
        color="primary"
        onClick={() => apiRef.current.exportDataAsCsv()}
      >
        <SaveAltIcon fontSize="small" />
      </IconButton>
      {children}
    </GridToolbarContainer>
  );
}
