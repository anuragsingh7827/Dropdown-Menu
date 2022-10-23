import React from "react";
import AllOptions from "./AllOptions";
import styles from '../css/Main.module.css';

function Main(){
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Dropdown Menu</h1>
            <AllOptions/>
        </main>
    )
}

export default Main;