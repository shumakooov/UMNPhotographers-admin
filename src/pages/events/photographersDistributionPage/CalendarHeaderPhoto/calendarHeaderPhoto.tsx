import React from 'react';
import styles from './calendarHeaderPhoto.module.css'

export default function CalendarHeaderPhoto() {
    return (
        <div className={styles.wrapperHeader}>
            <div className={styles.eventDays}>
                <p className={styles.eventDaysText}>1 день. 25.11.2023</p>
            </div>
        </div>
    );
}
