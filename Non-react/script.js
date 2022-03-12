let displayedExams = [];
let examTable = document.querySelector(".table");
let examNum = document.querySelector("#exam-num");
let displayModal = document.querySelector('#exam-modal');
let searchInput = document.querySelector('#search-input')



// Fetching Static Json Data & making them into variables
let patients = fetch('./Patient_Data.json')
.then(response => response.json())
.then( data => patientArray(data))

let exams = fetch('./exams.json')
.then(response => response.json())
.then( data => examArray(data))

function examArray(data) {
    exams = data
    displayExams(exams)
}

function patientArray(data) {
    patients = data
}

// function that ties Patient IDs to matching Exams
function examPatientMatch(exam) {
    for (let i = 0; i < patients.length; i++) {
        if ( exam === patients[i].PATIENT_ID  ) {
            return patients[i];
        } 
    }
}

// Saves Exam to API




// Displays Exams to site
function displayExams(examData) {
    let examHTML = '';
    examData.forEach((exam, index) => {
        let patientId = exam.patient_Id;
        // let imgStudyDays = exam.Diag_to_img_study_days;
        // let imgStudyHrs = exam.Diagnosis_to_imaging_time_hrs;
        // let imgDesc = exam.Image_study_description;
        let studyMod = exam.study_modality;
        let keyFind = exam.key_findings;
        let img = exam.png_filename;
        let examId = exam.exam_Id;
        let patientInfo = examPatientMatch(exam.patient_Id)

        examHTML += `
        <div class="exam-row text-center align-middle" data-exam="${index}" data-patient="${patientInfo}">
        <div class="cell align-middle xray-img" data-title="Xray"><img src="https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${img}" alt="Xray"></div>

        <div class="cell align-middle patId" data-title="Patient ID"><button onClick="patientSearch(${index})" type="button" class="btn btn-primary">${patientId}</button></div>

        <div class="cell align-middle" data-title="Exam ID">
            <button onClick="showModal(${index},'examModal')" type="button" class="btn btn-primary">${examId} Details</button>
        </div>

        <div id="admin-btns" class="cell align-middle d-none" data-title="Admin">
            <button onClick="updateModal(${index},'update')" type="button" class="btn bg-info">Update</button>
            <button onClick="showModal(${index},'delete')" type="button" class="btn bg-danger">Delete</button>
        </div>

        <div class="cell align-middle keyFind" data-title="Key FIndings">${keyFind}</div>
        <div class="cell align-middle" data-title="Study Modality">${studyMod}</div>
        <div class="cell align-middle" data-title="Age">${patientInfo.AGE}</div>
        <div class="cell align-middle" data-title="Gender">${patientInfo.SEX}</div>
        <div class="cell align-middle" data-title="BMI">${patientInfo.LATEST_BMI}</div>
        <div class="cell align-middle" data-title="Zip Code">${patientInfo.ZIP}</div>
        </div>`
    });
    examTable.innerHTML += examHTML;
}

// Exam search function
function runSearch() {

    let searchTotal = document.querySelector('.exam-total');
    let total = ''


    
    if (document.querySelector('#search-input')) {
        input = document.querySelector('#search-input');
        const search = searchInput.value.toLowerCase();
        const patIds = document.querySelectorAll('.patId');
        const keyFinds = document.querySelectorAll('.keyFind');

        patIds.forEach( person => {
            let patId = person.innerHTML;
            let parent = person.parentElement;
            if (patId.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                parent.classList.remove('hideExam');
            } else {
                parent.classList.add('hideExam');
            }
        })

        total = document.querySelectorAll('.hideExam').length
        if (total == 232 ) {
            keyFinds.forEach( find => {
                let keyFind = find.innerHTML
                let keyParent= find.parentElement
                if (keyFind.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                    keyParent.classList.remove('hideExam');
                } else {
                    keyParent.classList.add('hideExam');
                }
            })
        }

    }
    total = document.querySelectorAll('.hideExam').length

    if (total === 0 ) {
        searchTotal.innerHTML = `Total Exams:232`
    } else {
        searchTotal.innerHTML = `Total Exams:${ 232 - total}`
    }
    
}

// Search Input event Listener
searchInput.addEventListener('keyup', function(e) {
    runSearch() 
})

// Patient search function 
function patientSearch(index) {
    let patSearch = document.querySelector("#search-input")
    let patientSearch = exams[index].patient_Id
    patSearch.value = patientSearch
    runSearch() 
}

// Update Modal animations

function updateModal(index,button) {

    showModal(index,button)
    
    let labels = document.querySelectorAll('.label')
    labels.forEach(label => {
        label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
    })    
}


// Modal
const showModal = (index,button) => {
    let examInfo = exams[index]
    let patientInfo = examPatientMatch(exams[index].patient_Id)
    // Exam details modal
    if ( button == 'examModal') { 
        displayModal.innerHTML = `
        <div class="modal fade" id="exam-modal"  tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${examInfo.exam_Id} / ${examInfo.patient_Id}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="examInfo-top">
                    <div class="modal-item" data-title="Xray">
                        <img src="https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${examInfo.png_filename}" alt="Xray">
                    </div>
                    <h4>EXAM INFO</h4>
                    <div class="modal-item" data-title="Diagnosis imaging time (days)">
                        <p>${examInfo.Diag_to_img_study_days}</p>
                    </div>
                    <div class="modal-item" data-title="Diangnosis imaging time (hours)">
                        <p>${examInfo.Diagnosis_to_imaging_time_hrs}</p>
                    </div>
                    <div class="modal-item" data-title="Image Study Description">
                        <p>${examInfo.Image_study_description}</p>
                    </div>
                    <div class="modal-item" data-title="Study Modality">
                        <p>${examInfo.study_modality}</p>
                    </div>
                    <div class="modal-item keyFind" data-title="Key FIndings">
                        <p>${examInfo.key_findings}</p>
                    </div>
                </div>
                    <div class="examInfo-bottom">
                        <h4>PATIENT INFO</h4>
                        <div class="modal-item m-3" data-title="Patient ID">
                            <h5>${patientInfo.PATIENT_ID}</h5>
                        </div>
                    <div class="examInfo-bottom-container">
                        <div class="examInfo-bottom-left me-5">
                            <div class="modal-item" data-title="Age">
                                <p>${patientInfo.AGE}</p>
                            </div>
                            <div class="modal-item" data-title="Gender">
                                <p>${patientInfo.SEX}</p>
                            </div>
                            <div class="modal-item" data-title="Latest BMI">
                                <p>${patientInfo.LATEST_BMI}</p>
                            </div>
                            <div class="modal-item" data-title="Zip">
                                <p>${patientInfo.ZIP}</p>
                            </div>
                            <div class="modal-item" data-title="Test name">
                                <p>${patientInfo.test}</p>
                            </div>
                        </div>
                        <div class="examInfo-bottom-right">                        
                            <div class="modal-item" data-title="Latest weight">
                                <p>${patientInfo.latest_weight}</p>
                            </div>
                            <div class="modal-item" data-title="Height">
                                <p>${patientInfo.height}</p>
                            </div>
                            <div class="modal-item" data-title="Diabetes Type I">
                                <p>${patientInfo.DIABETES_TYPE_I}</p>
                            </div>
                            <div class="modal-item" data-title="Diabetes Type II">
                                <p>${patientInfo.DIABETES_TYPE_II}</p>
                            </div>
                            <div class="modal-item" data-title="ICU Admit">
                            <p>${patientInfo.icu_admit}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `
    } 
    // Update details modal    
    else if ( button == 'update') { 
        displayModal.innerHTML =`
        <div class="modal fade" id="exam-modal"  tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-info" id="exampleModalLabel">${examInfo.exam_Id} / ${examInfo.patient_Id}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cancel"></button>
            </div>

            <div class="modal-body update-info">
                <div class="update-container">
                    <h1>UPDATE</h1>
                    <form>
                        <div class="update-form-info container">
                            <h2>EXAM INFO</h2>
                            <div class="update-form-control">
                                <input id="exam_Id" type="text" value="${examInfo.exam_Id}" required>
                                <label for="exam_Id" class="label">Exam ID</label>
                            </div>
                            <div class="update-form-control">
                                <input id="Diag_to_img_study_days" type="text" value="${examInfo.Diag_to_img_study_days}" required>
                                <label for="Diag_to_img_study_days" class="label">Imaging time (days)</label>
                            </div>
                            <div class="update-form-control">
                                <input id="Diagnosis_to_imaging_time_hrs" type="text" value="${examInfo.Diagnosis_to_imaging_time_hrs}" required>
                                <label for="Diagnosis_to_imaging_time_hrs" class="label">Imaging time (hours)</label>
                            </div>
                            <div class="update-form-control">
                                <input id="Image_study_description" type="text" value="${examInfo.Image_study_description}" required>
                                <label for="Image_study_description" class="label">Image Study Description</label>
                            </div>
                            <div class="update-form-control">
                                <input id="study_modality" type="text" value="${examInfo.study_modality}" required>
                                <label for="study_modality" class="label">Study Modality</label>
                            </div>
                            <div class="update-form-control">
                                <p>Key Findings</p>
                                <textarea id="key_findings" class="update-textarea">${examInfo.key_findings}</textarea>
                            </div>
                        </div>
                        <div class="update-form-info container">
                        <h2>Patient INFO</h2>
                            <div class="update-form-control">
                                <input id="patient_Id" type="text" value="${examInfo.patient_Id}" required>
                                <label for="patient_Id" class="label">Patient ID</label>
                            </div>
                            <div class="update-form-control">
                                <input id="test" type="text" value="${patientInfo.test}" required>
                                <label for="test" class="label">Test Name</label>
                            </div>
                            <div class="update-form-control">
                                <input id="AGE" type="text" value="${patientInfo.AGE}" required>
                                <label for="AGE" class="label">Age</label>
                            </div>
                            <div class="update-form-control">
                                <input id="SEX" type="text" value="${patientInfo.SEX}" required>
                                <label for="SEX" class="label">Gender</label>
                            </div>
                            <div class="update-form-control">
                                <input id="LATEST_BMI" type="text" value="${patientInfo.LATEST_BMI}" required>
                                <label for="LATEST_BMI" class="label">Latest BMI</label>
                            </div>
                            <div class="update-form-control">
                                <input id="ZIP" type="text" value="${patientInfo.ZIP}" required>
                                <label for="ZIP" class="label">Zip Code</label>
                            </div>
                            <div class="update-form-control">
                                <input id="latest_weight" type="text" value="${patientInfo.latest_weight}" required>
                                <label for="latest_weight" class="label">Latest Weight</label>
                            </div>
                            <div class="update-form-control">
                                <input id="height" type="text" required value="${patientInfo.height}">
                                <label for="height" class="label">Latest Height</label>
                            </div>
                            <div class="update-form-control">
                                <input id="DIABETES_TYPE_I" type="text" required value="${patientInfo.DIABETES_TYPE_I}">
                                <label for="DIABETES_TYPE_I" class="label">Diabetes Type I</label>
                            </div>
                            <div class="update-form-control">
                                <input id="DIABETES_TYPE_II" type="text" required value="${patientInfo.DIABETES_TYPE_II}">
                                <label for="DIABETES_TYPE_II" class="label">Diabetes Type II</label>
                            </div>
                            <div class="update-form-control">
                                <input id="icu_admit" type="text" required value="${patientInfo.icu_admit}">
                                <label for="icu_admit" class="label">ICU Admit</label>
                            </div>
                        </div>    
                    </form>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button  data-bs-dismiss="modal" onClick="showModal(${index},'updateCompl')" type="button" class="btn btn-info">UPDATE</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `
    } else if ( button == 'create') {
        displayModal.innerHTML =`
        <div class="modal fade" id="exam-modal"  tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-success"  id="exampleModalLabel">New Exam</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body update-info">
                <div class="update-container">
                    <h1>CREATE EXAM</h1>
                    <form>
                        <div class="update-form-info container">
                            <h2>EXAM INFO</h2>
                            <div class="update-form-control">
                                <input id="exam_Id" type="text" required>
                                <label for="exam_Id" class="label">Exam ID</label>
                            </div>
                            <div class="update-form-control">
                                <input id="Diag_to_img_study_days" type="text" required>
                                <label for="Diag_to_img_study_days" class="label">Imaging time (days)</label>
                            </div>
                            <div class="update-form-control">
                                <input id="Diagnosis_to_imaging_time_hrs" type="text" required>
                                <label for="Diagnosis_to_imaging_time_hrs" class="label">Imaging time (hours)</label>
                            </div>
                            <div class="update-form-control">
                                <input id="Image_study_description" type="text" required>
                                <label for="Image_study_description" class="label">Image Study Description</label>
                            </div>
                            <div class="update-form-control">
                                <input id="study_modality" type="text" required>
                                <label for="study_modality" class="label">Study Modality</label>
                            </div>
                            <div class="update-form-control">
                                <p>Key Findings</p>
                                <textarea id="key_findings" class="update-textarea"></textarea>
                            </div>
                        </div>
                        <div class="update-form-info container">
                        <h2>Patient INFO</h2>
                            <div class="update-form-control">
                                <input id="patient_Id" type="text" required>
                                <label for="patient_Id" class="label">Patient ID</label>
                            </div>
                            <div class="update-form-control">
                                <input id="test" type="text"  required>
                                <label for="test" class="label">Test Name</label>
                            </div>
                            <div class="update-form-control">
                                <input id="AGE" type="text"  required>
                                <label for="AGE" class="label">Age</label>
                            </div>
                            <div class="update-form-control">
                                <input id="SEX" type="text" required>
                                <label for="SEX" class="label">Gender</label>
                            </div>
                            <div class="update-form-control">
                                <input id="LATEST_BMI" type="text"  required>
                                <label for="LATEST_BMI" class="label">Latest BMI</label>
                            </div>
                            <div class="update-form-control">
                                <input id="ZIP" type="text"  required>
                                <label for="ZIP" class="label">Zip Code</label>
                            </div>
                            <div class="update-form-control">
                                <input id="latest_weight" type="text" " required>
                                <label for="latest_weight" class="label">Latest Weight</label>
                            </div>
                            <div class="update-form-control">
                                <input id="height" type="text" required >
                                <label for="height" class="label">Latest Height</label>
                            </div>
                            <div class="update-form-control">
                                <input id="DIABETES_TYPE_I" type="text" required >
                                <label for="DIABETES_TYPE_I" class="label">Diabetes Type I</label>
                            </div>
                            <div class="update-form-control">
                                <input id="DIABETES_TYPE_II" type="text" required >
                                <label for="DIABETES_TYPE_II" class="label">Diabetes Type II</label>
                            </div>
                            <div class="update-form-control">
                                <input id="icu_admit" type="text" required >
                                <label for="icu_admit" class="label">ICU Admit</label>
                            </div>
                        </div>   
                    </form>
                </div>   
            </div>
            <div class="modal-footer">
                <button  data-bs-dismiss="modal" onClick="showModal(${index},'createCompl')" type="button" class="btn bg-success">CREATE EXAM</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        `
    } else if ( button == 'delete') {
        displayModal.innerHTML =`
        <div class="modal fade" id="exam-modal"  tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-danger" id="exampleModalLabel">Delete Exam</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body update-info">
             <h5> Are you sure you want to delete <span class='text-danger fs-2'>${exams[index].exam_Id}</span> for <span class="text-danger fs-2">${examInfo.patient_Id}</span></h5>
            </div>
            <div class="modal-footer">
                <button  data-bs-dismiss="modal" onClick="showModal(${index},'deleteCompl')" type="button" class="form-btn btn btn-danger">DELETE EXAM</button>
                <button type="button" class="btn btn-info" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div> `
    }

    else if ( button == 'updateCompl') {
         
        displayModal.innerHTML =`
        <div class="modal fade" id="exam-modal"  tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-info" id="exampleModalLabel">Update Exam</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body update-info">
             <h5><span class='text-info fs-2'>${exams[index].exam_Id}</span> for <span class="text-info fs-2">${examInfo.patient_Id}</span> has been updated</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> `
    }

    else if ( button == 'createCompl') {
         
        displayModal.innerHTML =`
        <div class="modal fade" id="exam-modal"  tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-success" id="exampleModalLabel">Created Exam</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body update-info">
             <h5><span class='text-success fs-2'>${exams[index].exam_Id}</span> for <span class="text-success fs-2">${examInfo.patient_Id}</span> has been created</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> `
    }  else if ( button == 'deleteCompl') {
        displayModal.innerHTML =`
        <div class="modal fade" id="exam-modal"  tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title text-danger" id="exampleModalLabel">Deleted Exam</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body update-info">
             <h5><span class='text-danger fs-2'>${exams[index].exam_Id}</span> for <span class="text-danger fs-2">${examInfo.patient_Id}</span> has been deleted</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> `
    }
    

    var selectedRow=null;
    function onFormSubmit (e){
        event.preventDefault();
        var formData = readFormData();
        if(selectedRow==NULL){
            insertNewRecord(formData);
        }
        else {
            updateRecord(formData);
        }
        resetForm();
    }
    function readFormData(){
        var formData = {};
        formData["patient_Id"] = document.getElementById("patient_Id").value;
        formData["AGE"] = document.getElementById("AGE").value;
        formData["SEX"] = document.getElementById("SEX").value;
        formData["LATEST_BMI"] = document.getElementById("LATEST_BMI").value;
        formData["ZIP"] = document.getElementById("ZIP").value;
        return formData;
    }
    function insertNewRecord(data){
        var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        
        var cell1= newRow.insertCell(0);
            cell1.insertHTML = data.PATIENT_ID;
        
        var call2= newRow.insertCell(1);
            cell2.innerHTML = data.AGE;
       
        var call3= newRow.insertCell(2);
            cell3.innerHTML = data.SEX;
        
        var call4= newRow.insertCell(3);
            cell4.innerHTML = data.LATEST_BMI;

        var call5= newRow.insertCell(4);
            cell5.innerHTML = data.ZIP;
            
        var call6= newRow.insertCell(5);
            cell6.innerHTML = `<button onClick= 'onEdit(this)'>Update</button> <button onClick= 'onDelete(this)'>Delete</button>`
    }

    function onUpdate(){
        selectedRow = td.parentElement.parentElement
        document.getElementById("patient_Id").value =selectedRow.cells[0].innerHTML
        document.getElementById("AGE").value =selectedRow.cells[1].innerHTML
        document.getElementById("SEX").value =selectedRow.cells[2].innerHTML
        document.getElementById("LATEST_BMI").value =selectedRow.cells[3].innerHTML
        document.getElementById("ZIP").value =selectedRow.cells[4].innerHTML
    }
    //update data
    function updateRecord(formData){
        selectedRow.cells[0].innerHTML = formData.PATIENT_ID;
        selectedRow.cells[1].innerHTML = formData.AGE;
        selectedRow.cells[2].innerHTML = formData.SEX;
        selectedRow.cells[3].innerHTML = formData.LATEST_BMI;
        selectedRow.cells[4].innerHTML = formData.ZIP;
    }
    //delete data
    function onDelete(id){
        if (confirm("Do you want to delete this record? ")){
            row= td.parentElement.parentElement;
            document.getElementById('myTable').deleteRow(row.rowIndex);
        }
        resetForm();
    }
    function resetForm (){
        document.getElementById('patient_Id').value= ' ';
        document.getElementById('AGE').value= ' ';
        document.getElementById('SEX').value= ' ';
        document.getElementById('LATEST_BMI').value= ' ';
        document.getElementById('ZIP').value= ' ';

    }
    function onEdit(id){
        selectedRow =td.parentElement.parentElement;
        document.getElementById("patient_Id").value =selectedRow.cells[0].innerHTML
        document.getElementById("AGE").value =selectedRow.cells[1].innerHTML
        document.getElementById("SEX").value =selectedRow.cells[2].innerHTML
        document.getElementById("LATEST_BMI").value =selectedRow.cells[3].innerHTML
        document.getElementById("ZIP").value =selectedRow.cells[4].innerHTML
    }
    // document.body.append(examModal);
    let modal = new bootstrap.Modal(displayModal.querySelector('.modal'));
    modal.show();
}
// document.getElementById('elementID').click();
// 