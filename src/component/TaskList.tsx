import React from 'react'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useGlobalState } from '../library/state';




const TaskList: React.FC=()=> {
    const[dataStore,setdataStore]=useGlobalState("dataStore");
    const[,setshowModel]=useGlobalState("showModel");
    const[,seteditDataStore]=useGlobalState("editDataStore");


    function DeleteRow(ID: any) {      
        const newData=dataStore.filter((MatchID: { ID: any; })=>{
           if(MatchID.ID===ID){}
              else
                 return MatchID})
            setdataStore(newData)
            setshowModel(false)
            } 
    function EditRow(ID: any) {
        const newData=dataStore.filter((MatchID: { ID: any; })=>{if(MatchID.ID===ID){
           return MatchID
        }        
     })
     
        setshowModel({show:true})
        seteditDataStore(newData[0])
      } 
     const taskList= (
        dataStore?.map((item: any)=>{
        if(item.ID!==null)
            return(
                <Row className='my-4'>
                <Col className='text-truncate'>{item.ID?.slice(0,8)}</Col>
                <Col className='text-truncate'>{item.TaskName}</Col>
                <Col className='text-truncate'>{item.SelectProject}</Col>
                <Col className='text-truncate'>{item.Comments}</Col>
                <Col><Button variant="outline-dark"  onClick={()=>EditRow(item.ID)}>Edit</Button></Col>
                <Col><Button variant="outline-dark" onClick={()=>DeleteRow(item.ID)}>Delete</Button></Col>
                </Row>)
                })
                );
        return (
        <div className='container-fluid px-0'>
            <Card>
                <Card.Header>
                    <Container fluid="sm">
                        <Row>
                            <Col>Task ID</Col>
                            <Col>Task Name</Col>
                            <Col>Project</Col>
                            <Col>Comments</Col>
                            <Col>Task Edit</Col>
                            <Col>Task Delete</Col>

                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <Container fluid="sm">
                       {taskList}
                    </Container>
                </Card.Body>
            </Card>
         </div>
    )
}

export default TaskList