import {
    axiosLoginData,
    axiosPostData,
    axiosGetData,
    clearSession,
    axiosPatchData
} from "../../utils/services/Services";

const baseURL = "http://localhost:8080";
// const baseURL = "https://sig-school-app.azurewebsites.net"

async function getClassesWithAssignedSections() {
    const getClasses = await axiosGetData(baseURL + "/api/sections/assigned/");
    return getClasses;
}

async function getSections() {
    const sections = await axiosGetData(baseURL + "/api/sections/");
    return sections;
}

async function assignSections(reqBody) {
    const assignedSections = await axiosPostData(baseURL + '/api/sections/assign', reqBody);
}

async function unAssignSections(reqBody) {
    const assignedSections = await axiosPostData(baseURL + '/api/sections/unassign', reqBody);
}

async function editClass(reqBody) {
    var classId = reqBody.classId;
    var reqObj = {
        className:reqBody.className
    }
    const updatedClass = await axiosPatchData(baseURL + '/api/classes/update/' + classId, reqObj);
    return updatedClass;
}

async function createClass(reqBody) {

}


export {
    getClassesWithAssignedSections,
    getSections,
    assignSections,
    unAssignSections,
    editClass,
    createClass    
  };
