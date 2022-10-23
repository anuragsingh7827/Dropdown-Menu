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

const getData = (token,setMenu) => {
    axios.get('https://interview-questions-dbs.herokuapp.com/welcome',
          { headers: { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Bearer ${token}`} })
          .then(res => setMenu(res.data.data))
          .catch(err => console.log(err));
};

function AllOptions(){
    const [token, setToken] = useState("");
    const [menu, setMenu] = useState([]);
    const [folderLevels,setFolderLevels] = useState([]);

    useEffect(() => {
        getToken(setToken);
        getData(token,setMenu);
    }, [token]);
    
    function openHandle(childrenData,currData){
      //old state pushed in the stack
      setFolderLevels(prevFolderLevels => [...prevFolderLevels,currData]);

      setMenu(childrenData);
    }

    function backHandle(){
      //accessing the current state 
      //from the top
      setMenu(folderLevels[folderLevels.length - 1]);

      setFolderLevels(prevFolderLevels => {
        const newFolderLevels = [...prevFolderLevels];
        //popping the current state 
        //from the top
        newFolderLevels.pop();
        return newFolderLevels;
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


    return (
      <ul className={styles1.dropdownList}>
        {folderLevels.length > 0 && <li className={styles2.backItem} onClick={backHandle} >
                                        Back
                                    </li>}
        {options}
      </ul>
    )
}

export default AllOptions;