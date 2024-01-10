import React from 'react';
import styles from "./placeHeaderPhoto.module.css";
import {Zone} from "../../../../store/zoneSlice";


export default function PlaceHeaderPhoto({props}: any) {

    const needZoneId = props.tempActivitiesByLocation[0].zoneId
    const zone = props.zones.find((zone: Zone) => zone.id === needZoneId)

    return (
        <>
            <div className={styles.wrapper}>
                <>
                    <div className={styles.zone}>
                        Зона {zone?.number}
                    </div>
                    <div className={styles.place}>
                        {props.address}
                    </div>
                </>
            </div>
        </>
    );
}
