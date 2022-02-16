import React, {PureComponent} from 'react'
// import PropTypes from 'prop-types';


class Exam extends PureComponent {

  render() {
    const { 
      patient,
      examId,
      image,
      keyFind,
      age,
      zip,
      // sex,
      // brixia,
      // bmi,

    } = this.props;

    return (
        <div className="exam">
          <div className='exam-info-top'>
            <img src={image} alt="xray"/>
            <div className='exam-info-right'>
              <span>
                Exam: { examId }
              </span>
              <span>
                Age: { age }
              </span>
              <span>
                zip: { zip }
              </span>
            </div>
          </div>
            <div className='exam-info-bottom'>
              <span className="exam-name">
                { patient }
              </span>
              <span className="exam-find">
                { keyFind }
              </span>
      </div>
        <button className="exam-btn">DETAILS</button>
      </div>
    );
  }
}

export default Exam




