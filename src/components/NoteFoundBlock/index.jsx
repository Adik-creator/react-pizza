import React from 'react';
import styles from './NotFoundBlock.module.scss'

export const NoteFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>🤔</span>
                <p>Ничего не найдено</p>
            </h1>
            <p className={styles.description}>Нет такого страница Sorry baby 😑 </p>
        </div>
    );
};
