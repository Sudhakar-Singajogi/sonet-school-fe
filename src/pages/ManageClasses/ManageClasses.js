import React from "react";

import { useState, useEffect } from "react";
import "./ManageClasses.css";


import {
  getClassesWithAssignedSections,
  getSections,
  assignSections,
  unAssignSections,
  editClass,
  createClass
} from "./Services";

import AssignedSectionsClass from "../../components/topbar/AssignedSectionsClass";
import AddNewClassModal from "../../components/topbar/AddNewClassModal";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Divider,
  Backdrop,
  Modal,
  Fade,
  TextField,
} from "@mui/material";
import { Delete, Edit, AddCircle, CheckCircle } from "@material-ui/icons";
import EditOffIcon from "@mui/icons-material/EditOff";

const ListStyle = {
  maxWidth: 360,
  bgcolor: "background.paper",
  fontSize: 12,
};

const cardBoxcontent = {
  display: "flex",
  flexWrap: "wrap",
  border: "none",
  "& > :not(style)": {
    m: 0,
    width: 570,
    height: "auto",
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ManageClasses(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [allClasses, setClasses] = React.useState(null);
  const [AllSections, setAllSections] = React.useState(null);

  useEffect(() => {
    getAllClasses();
    // getAllSections();

    // we will use async/await to fetch this data
    async function getAllClasses() {
      const allClasses = await getClassesWithAssignedSections();
      const Classes = await allClasses.data.resultSet;
      console.log("getClasses", Classes);
      // store the data into our allClasses variable
      await getAllSections();
      setClasses(Classes);
    }
  }, []);
  async function getAllSections() {
    // get all sections
    const allSections = await getSections();

    const Sections = await allSections.data;
    console.log("getSections", Sections);
    setAllSections(Sections);
  }

  const handleEdit = (e) => {
    var currentElmParent = e.currentTarget.parentNode;
    var currentElmParentChildren = currentElmParent.children;
    var ide = e.currentTarget.parentNode.parentNode.getAttribute("classID");
    var children = document.getElementById("labelval_" + ide).children;
    var className = children[0].innerHTML;

    children[0].style.cssText = "display:none";
    children[1].style.cssText = "display:block";

    var curElemChild = currentElmParentChildren[0].children;
    curElemChild[0].style.cssText = "display:block";
    curElemChild[1].style.cssText = "display:none";

    currentElmParentChildren[2].style.cssText = "display:none";
    currentElmParentChildren[3].style.cssText = "display:block";

    document.getElementById("editClass_" + ide).value = className;
  };

  const handleEditOff = (e) => {
    console.log("2");
    var currentElmParent = e.currentTarget.parentNode;
    var currentElmParentChildren = currentElmParent.children;
    var ide = e.currentTarget.parentNode.parentNode.getAttribute("classID");
    document.getElementById("editClass_" + ide).value = "";

    var children = document.getElementById("labelval_" + ide).children;

    // console.log('children', children);

    children[1].style.cssText = "display:none";
    children[0].style.cssText = "display:block";

    var curElemChild = currentElmParentChildren[0].children;
    curElemChild[1].style.cssText = "display:block";
    curElemChild[0].style.cssText = "display:none";

    // currentElmParentChildren[0].style.cssText='display:none';
    currentElmParentChildren[3].style.cssText = "display:none";
    currentElmParentChildren[2].style.cssText = "display:block";

    var errMsg = "";
    var x = document.getElementsByClassName("error_" + ide);
    x[0].innerText = errMsg;
  };

  const updateclassName = async (e) => {
    console.log("classId", e.currentTarget.getAttribute("id"));
    var classId = e.currentTarget.getAttribute("id");

    var className = document.getElementById("editClass_" + classId).value;

    //prepare the request body and send to update class
    var reqBody = {
      classId,
      className,
    };

    const resp = await editClass(reqBody);

    var errMsg = "class updated successfully";
    if (resp.message === "Validation Errors") {
      console.log("1");
      errMsg = resp.ValidationErrors[0];
      var x = document.getElementsByClassName("error_" + classId);
      x[0].innerHTML = "<span class='error'>" + errMsg + "</span>";
    } else if (resp.hasOwnProperty("error") && resp.error !== "") {
      console.log("2");
      errMsg = resp.error;
      var x = document.getElementsByClassName("error_" + classId);
      x[0].innerHTML = "<span class='error'>" + errMsg + "</span>";
    } else {
      var x = document.getElementsByClassName("error_" + classId);
      x[0].innerHTML = "<span class='success'>" + errMsg + "</span>";
      var children = document.getElementById("labelval_" + classId).children
      children[0].innerHTML = className;
    }
  };

  return (
    <div className="manageStudents">
      {props.params.Breadcrumb}
      <div className="fullWidth">
        <div className="left50">
          <h3 className="pl10"> Manage classes </h3>
        </div>
        <div className="right50">
          <Typography sx={{ fontSize: 14 }}>
            <Button onClick={handleOpen} variant="contained">
              {" "}
              <AddCircle /> <span className="spanAddbtnLabel"> Class </span>
            </Button>
          </Typography>
          
          <div className="addmodalpopup">
              <AddNewClassModal
                params={{
                  open,
                  handleClose,
                  Sections: AllSections,
                  assignSectionsMethod:assignSections,
                  createClassMethod:createClass
                }}
              />
          </div>
        </div>
      </div>
      {allClasses && (
        <div className="boxcard" id="test">
          {allClasses.map((Currentclass, index) => {
            return (
              <>
                <Card key={index} className="outer-card">
                  <CardContent>
                    <Box sx={cardBoxcontent}>
                      <Paper>
                        <div className="labelControls">
                          <div className="controlButtonsDiv">
                            <div
                              className="featHeading"
                              id={"labelval_" + Currentclass.classId}
                            >
                              <Typography
                                sx={{
                                  fontSize: 18,
                                  textTransform: "uppercase",
                                }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {Currentclass.className}
                              </Typography>
                              <TextField
                                id={"editClass_" + Currentclass.classId}
                                variant="standard"
                                sx={{ display: "none" }}
                              />
                              <div className={"error_" + Currentclass.classId}>
                                {" "}
                              </div>
                            </div>
                            <div
                              className="manageClass"
                              classID={Currentclass.classId}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "right",
                                  width: "fit-content",

                                  borderRadius: 1,
                                  bgcolor: "#f6f5f5",
                                  color: "text.secondary",
                                  "& svg": {
                                    m: 0.7,
                                  },
                                  "& hr": {
                                    mx: 0.7,
                                  },
                                }}
                              >
                                <span id="checkControls">
                                  <span className="displayNone">
                                    {" "}
                                    <CheckCircle
                                      className="controlButtonCheck"
                                      onClick={updateclassName}
                                      id={Currentclass.classId}
                                      classvalue={Currentclass.className}
                                    />
                                  </span>
                                  <span className="displayBlock">
                                    {" "}
                                    <CheckCircle
                                      className="controlButtonCheckDisable"
                                      id={Currentclass.classId}
                                      classvalue={Currentclass.className}
                                    />
                                  </span>
                                </span>
                                <Divider
                                  orientation="vertical"
                                  variant="middle"
                                  flexItem
                                />
                                <Edit
                                  className="controlButtonEdit"
                                  onClick={handleEdit}
                                />
                                <EditOffIcon
                                  className="controlButtonOff"
                                  onClick={handleEditOff}
                                  sx={{ display: "none" }}
                                />
                                <Divider
                                  orientation="vertical"
                                  variant="middle"
                                  flexItem
                                />
                                <Delete className="controlButtons" />
                              </Box>
                            </div>
                          </div>
                        </div>

                        <div className="sectionLabel">
                          <AssignedSectionsClass
                            params={{
                              Currentclass: Currentclass,
                              Sections: AllSections,
                              assignSections,
                              unAssignSections,
                            }}
                          />
                        </div>
                        <Divider />
                        {/* <div className="cardFooter">
                                                    <Typography sx={{ fontSize: 14, marginRight:5, paddingTop:"5px" }} color="text.secondary" gutterBottom>
                                                            <Button variant="contained">Submit</Button>
                                                    </Typography>                                    
                                                </div> */}
                      </Paper>
                    </Box>
                  </CardContent>
                </Card>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ManageClasses;
