
import React, {useState, useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp"
import { ExamTable } from '../../components/exam-table/ExamTable.comp'
import {SearchForm} from "../../components/SearchForm"
import exams from "../../data/exams.json";

export const ExamList = () => {
  
  const [str,setStr] = useState('');
  const [displayExams,setDisplayExam] = useState('')

  useEffect(() => {
    setDisplayExam(exams)
  },[str, displayExams]);
  
  const handleOnChange = (e) => {
    const {value} = e.target;
    setStr(value);
    searchExam(value);
  };

  const searchExam = sttr => {
    const displayExams = exams.filter(row=> 
      row.patient_Id.toLowerCase().includes(sttr.toLowerCase())
    )
    setDisplayExam(displayExams)
  };

  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Exam list"/>
        </Col>
      </Row>
      <SearchForm className="text-center" handleOnChange={handleOnChange} str={str} />
      <Row>
        <Col>
          <ExamTable exams={displayExams}/>
        </Col>
      </Row>
    </Container>
  )
}
