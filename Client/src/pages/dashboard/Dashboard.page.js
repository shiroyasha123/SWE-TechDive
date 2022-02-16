import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { ExamTable } from "../../components/exam-table/ExamTable.comp";
// import SearchForm from "../../components/SearchForm"
import Exams from "../../data/exams.json";



export const  Dashboard = (exams) => {
  return (
    <Container>
        <Row>
           <Col className="text-center mt-5 mb-2">
            {/* <SearchForm/> */}
            <Button style={{'fontSize':'2rem', padding: '10px 30px'}}>
                  Add New Exam
            </Button>
           </Col> 
        </Row>
        <Row>
           <Col className="text-center mt-5 mb-2">
                <div>Total Tickets:{Exams.length}</div>
           </Col> 
        </Row>
        <Row>
           <Col className="mt-2">
                <div>Recently Added Exams</div>
           </Col> 
        </Row>
        <hr />
        <Row>
           <Col className="recent-exam">
                <ExamTable exams={Exams}/>
           </Col> 
        </Row>
    </Container>
  )
}

export default Dashboard