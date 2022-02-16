import React from 'react'
import { Form, Button } from "react-bootstrap"
import Exams from "../data/exams.json";
import PropTypes from 'prop-types';

export const SearchForm = ({handleOnChange, str}) => {
  console.log(str)
  return (

  <div className="dash-form">
    <Form className='center'>
      <input 
        type="text"
        placeholder="SEARCH Patient ID"
        name="searchStr"
        onChange={handleOnChange}
        value={str}
      />
      <Button className="add-button">
        Add Exam +
      </Button>  
    </Form>
    <div className="search-info text-center">Total Exams: {Exams.length} </div>
    </div>
  
  );
}

SearchForm.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  str: PropTypes.string.isRequired
}