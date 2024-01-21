import React from "react";
import styles from "./placeHeaderPhoto.module.css";
import { Zone } from "../../../../store/zoneSlice";
import axios from "axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton } from "@mui/material";

export default function PlaceHeaderPhoto({ props }: any) {
  let responseZone: Zone | null = null;
  if (props.zoneId != null) {
    // @ts-ignore
    responseZone = axios(
      `https://photographersekb.ru:8080/admin/zone/${props?.zoneId}`,
      { withCredentials: true },
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <div className={styles.zone}>Зона {responseZone?.number}</div>
            <div className={styles.name}>
              {props?.surname +
                " " +
                props?.firstname +
                " " +
                props?.middleName}
            </div>
          </div>
          <IconButton className={styles.btnInfo}>
            <InfoOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
