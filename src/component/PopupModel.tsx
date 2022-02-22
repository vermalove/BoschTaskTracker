import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { useGlobalState } from '../library/state';
import "./index.css";
import { v4 as uuid } from 'uuid';

const options = [
    'Project1', 'Project2', 'Project3','Project4'
  ];
const PopupModel=()=> {

    const[showModel,setshowModel]=useGlobalState("showModel");
    const[dataStore,setdataStore]=useGlobalState("dataStore");
    const[editDataStore,seteditDataStore]=useGlobalState("editDataStore");
    const unique_id = uuid();
    const [inputs, setInputs] = useState({
        TaskName: "",
        Comments: "",
        SelectProject:""
            });
    const { TaskName, Comments } = inputs;
    const reset=()=>{
        setInputs({
            TaskName: "",
            Comments: "",
            SelectProject:""
        })
    }

    const clearEdit=()=>{
        seteditDataStore({
        TaskName: null,
        Comments: null,
        SelectProject:null,
        ID:null
             })
        }
    function handleChange(e: any) {
        if(editDataStore.ID===null)
        {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
        }else{
        const { name, value } = e.target;
        seteditDataStore({...editDataStore,[name]:value})
            }
        }

    function handleSubmit(e: React.MouseEvent<HTMLElement, MouseEvent>) {
          e.preventDefault();
        if(inputs.TaskName==="" || inputs.Comments==="" || inputs.SelectProject===""){
            alert("Fill all details")
        }else{
            setshowModel(false)
            let addID={...inputs,ID:unique_id}
            setdataStore([...dataStore,addID])
            }
        reset()
        } 
    function handleEdit(e:any) {
        if(editDataStore.TaskName==="" || editDataStore.Comments==="" || editDataStore.SelectProject===""){
          alert("Fill all details")
        }else{
        setshowModel(false)
    const newData = dataStore.filter((MatchID: { ID: any; })=>{
        if(MatchID.ID===editDataStore.ID){
       }
        else
     return MatchID
    })
    setdataStore([...newData,editDataStore]) 
    }
    clearEdit()
    } 
  
    const renderItems = () => {
   if (options && options.length > 0) {
      return options.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ));
    }
    return null;
  };

  const renderSelect = () => (
    <option key={'default-1'} value={' '}>
     Select Project
    </option>
  );

  const handleCancel=()=>{
    setshowModel(false)
    reset()
    clearEdit()
    if(editDataStore.ID===null){
    }
}

  const taskFeild = (
    <form className='overForm' >
   
            <Modal.Dialog>
                <Modal.Header  >
                   {editDataStore?.ID===null? <Modal.Title>Create Task</Modal.Title>:
                   <Modal.Title>Edit Task</Modal.Title>
 } </Modal.Header>
                <Form >
                <Modal.Body>
                   
                        <Form.Group className="mb-3" controlId="formBasicTaskName">
                            <Form.Label>*Task Name</Form.Label>
                            <input
                                className="loginInput width100 "
                                type="text"
                                name="TaskName"
                                placeholder="Task Name"
                                value={TaskName||editDataStore?.TaskName}
                                onChange={(e)=>handleChange(e)}
                                data-cy="SmartId"
                                />

                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="formBasicProjectName">
                            <Form.Label>Project Name</Form.Label>
                            <select
                            name="SelectProject"
                            className="bg-light border width100 dropdown"
                            value={inputs.SelectProject||editDataStore?.SelectProject}
                            onChange={(e)=>handleChange(e)}
                            >
                            {renderSelect()}
                            {renderItems()}
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTaskName">
                            <Form.Label>Comments</Form.Label>
                          

                        </Form.Group>
                        <input
                            type="text"
                            name="Comments"
                            value={Comments||editDataStore?.Comments}
                            placeholder="Enter Comments"
                            onChange={(e)=>handleChange(e)}
                            className="loginInput width100 "
                            data-cy="Comments"
                            />
                </Modal.Body>

                <Modal.Footer>
                    <Badge pill bg="light" className='text-dark' onClick={handleCancel} >
                        Cancel
                    </Badge>{' '}
                    {editDataStore.ID===null?<Badge pill bg="secondary"   onClick={(e)=>handleSubmit(e)} >
                        Create
                    </Badge>:<Badge pill bg="secondary"   onClick={(e)=>handleEdit(e)} >
                        Edit
                    </Badge>}{' '}
                </Modal.Footer>
                </Form>
            </Modal.Dialog>
    </form>
  );

    return (
        <div className='container'>
             
           {showModel&& taskFeild
}
        </div>
    )
}

export default PopupModel