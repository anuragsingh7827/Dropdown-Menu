import React, { useState } from "react";
import styles from '../css/Option.module.css';
import whiteArrow from '../imgs/whiteArrow.png';
import blackArrow from '../imgs/blackArrow.png';

function ClickableOption(props){
    const [arrowIcon, setArrowIcon] = useState(true);

    return (
        <li onMouseEnter={() => setArrowIcon(false)} 
            onMouseLeave={() => setArrowIcon(true)} 
            className={styles.dropdownItem} 
            onClick={() => props.openHandle(props.childrenData,props.currData)}>
            {props.option}
            <div className={styles.arrowContainer}>
                {arrowIcon ?    <img src={blackArrow} className={styles.arrow}/>: 
                                <img src={whiteArrow} className={styles.arrow}/>}
            </div>
            
        </li>
    )
}

export default ClickableOption;