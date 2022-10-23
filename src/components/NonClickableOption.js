import React from "react";
import styles from '../css/Option.module.css';

function NonClickableOption(props){
    return (
        <li className={styles.dropdownItem}>
            {props.option}
        </li>
    )
}

export default NonClickableOption;