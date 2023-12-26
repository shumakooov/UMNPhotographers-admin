import React from 'react';
import styles from "./placeHeader.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {Zone} from "../../../../store/zoneSlice";


export default function PlaceHeader({props}: any) {
    const zones: Zone[] = useSelector((state: RootState) => state.zones.zone);

    const needZoneId = props.tempActivitiesByLocation[0].zoneId
    const zone = zones.find((zone) => zone.id === needZoneId)

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
