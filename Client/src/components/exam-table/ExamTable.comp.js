import React from 'react'
import {Table} from 'react-bootstrap'
import PropTypes from 'prop-types'

export const ExamTable = ({exams}) => {
    // if(exams)
  return <Table striped bordered hover responsive>
        <thead className="table-head text-center">
            <tr>
                <th>Patient ID</th>
                <th>Exam ID</th>
                <th>Study Modality</th>
                {/* <th>Key Findings</th> */}
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
        {exams.length ? (
            

        exams.map(( (row, index) =>        
            <tr className="table-row text-center" key={index}>
                <td>{row.patient_Id}</td>
                <td>{row.exam_Id}</td>
                <td>{row.study_modality}</td>
                {/* <td>{row.key_findings}</td> */}
                <td><button className='table-button'>Details</button></td>
            </tr>
            ))
            ) : (
            <tr>
                <td colSpan="5" className="text-center">
                No Exam to show{" "}</td>
            </tr>
            )
        }

        </tbody>
    </Table>
};

ExamTable.propTypes = {
   exams: PropTypes.array.isRequired
};

