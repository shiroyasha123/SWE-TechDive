// rfc to get import
import React from 'react'



export default function CreateExam() {

  return (
    
    <>
    <form id="createExam">
      <h1 id="createExamTitle">Create Exam</h1>


      <div id="createExamButtons">
        <button id="addExam" className="exam-btn btn-space">Add Exam</button>
        <button id="randomExam" className="exam-btn btn-space">Random Exam</button>
        <button id="cancel" className="exam-btn btn-space">Cancel</button>
      </div>

      <div className="info">
        <div id="patienInfo" className="createExamInfo">
          <label for="patientID">Patient ID:</label>
          <input type="text" id="patientID" name="patientID"/>

          <label for="age">Age:</label>
          <input type="text" id="age" name="age"/>

          <label for="sex">Sex:</label>
          <input type="text" id="sex" name="sex"/>

          <label for="bmi">BMI:</label>
          <input type="text" id="bmi" name="bmi"/>

          <label for="zipCode">Zip Code:</label>
          <input type="text" id="zipCode" name="zipCode"/>
        </div>

        <div id="examInfo" className="createExamInfo">
          <label for="examID">Exam ID:</label>
          <input type="text" id="examID" name="examID"/>

          <label for="imgUrl">Image URL:</label>
          <input type="text" id="imgUrl" name="imgUrl"/>

          <label for="date">Date:</label>
          <input type="text" id="date" name="date"/>

          <label for="keyFindings">Key Findings:</label>
          <input type="text" id="keyFindings" name="keyFindings"/>

          <label for="brixiaScore">Brixia Score (seperated by comma):</label>
          <input type="text" id="brixiaScore" name="brixiaScore"/>
        </div>
      </div>
    </form>
    </>
  )
}
