

import React, { useEffect } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { ListGroup } from 'react-bootstrap';
import TaskList from './TaskList';
import PopupModel from './PopupModel';
import { useGlobalState } from '../library/state';

const MainBody: React.FC=()=> {


const[,setshowModel]=useGlobalState("showModel");
useEffect(()=>{
    setshowModel(false);
},[])
    const addTask = ()=>{
      setshowModel({show:true})
    }

  return (
    <div className='container'>
        <ListGroup className='my-4' >
            <ListGroup.Item ><span onClick={addTask}><FiPlusCircle className='mx-4'  onClick={addTask} />AddTasks </span></ListGroup.Item>
        </ListGroup>
        <TaskList/>
        <PopupModel />
    </div>
     );
}

export default MainBody;
