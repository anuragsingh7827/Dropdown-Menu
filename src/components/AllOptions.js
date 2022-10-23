import React, { useEffect, useState } from "react";
import axios from 'axios';
import { nanoid } from 'nanoid';
import ClickableOption from "./ClickableOption";
import NonClickableOption from "./NonClickableOption";
import styles1 from '../css/AllOptions.module.css';
import styles2 from '../css/Option.module.css';

const getToken = (setToken) =>
    axios.post("https://interview-questions-dbs.herokuapp.com/login")
          .then((res) => {
            setToken(res.data.token);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });

const getData = (token,setMenu,setIsLoading) => {
    axios.get('https://interview-questions-dbs.herokuapp.com/welcome',
          { headers: { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Bearer ${token}`} })
          .then(res => {
            setMenu(res.data.data);
            setIsLoading(false);
          })
          .catch(err => {
            console.log('Error: ',err);
            setIsLoading(false);
          });
};

function AllOptions(){
    const [token, setToken] = useState("");
    const [menu, setMenu] = useState([]);
    const [optionLevels,setOptionLevels] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        getToken(setToken);
        getData(token,setMenu,setIsLoading);
    }, [token]);
    
    function openHandle(childrenOptionsLevel,currOptionsLevel){
      //current options level pushed in the stack.
      setOptionLevels(prevOptionsLevels => [...prevOptionsLevels,currOptionsLevel]);
      //setting menu with children options level.
      setMenu(childrenOptionsLevel);
    }

    function backHandle(){
      //accessing the current options level from the top of the stack
      setMenu(optionLevels[optionLevels.length - 1]);

      setOptionLevels(prevOptionsLevels => {
        const newOptionsLevels = [...prevOptionsLevels];
        //popping the current options level from the top of the stack.
        newOptionsLevels.pop();
        return newOptionsLevels;
      });
    }

    let options = null;
    if(menu.length){
        options = menu.map(type => {
          if(type.children) return <ClickableOption key={nanoid()}
                                                    openHandle={openHandle}
                                                    option={type.name} 
                                                    childrenData={type.children.data}
                                                    currData={menu}
                                                  />
          else return <NonClickableOption 
                          key={nanoid()} 
                          option={type.name}
                      />
        });
    }

    let dropdown = null;
    if(isLoading){
      dropdown =  <div className={styles1.container}>
                      <div className={styles1.outerLoader}></div>
                      <div className={styles1.innerLoader}></div>
                  </div>
    }else{
      dropdown =  <ul className={styles1.dropdownList}>
                    {optionLevels.length > 0 && <li className={styles2.backItem} 
                                                    onClick={backHandle} >
                                                    Back
                                                </li>}
                    {options}
                  </ul>
    }

    return (
      dropdown
    )
}

export default AllOptions;