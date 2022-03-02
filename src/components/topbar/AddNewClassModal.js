import React from 'react'
import AssignSections from "./AssignSectons"
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useRef} from 'react'


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

function AddNewClassModal(props) {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 650,
        boxShadow: 24,
        borderRadius: 1,
        p:2
      };
      const [classReqObj, setClassReqObj] = React.useState([]);

      const setClassRequestObject = (reqBody) => {
        console.log('ReqBody: ', reqBody );
        setClassReqObj(reqBody)
      }

      
    return (
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.params.open}
      onClose={props.params.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      id="add-new-class"
    >
      <Fade in={props.params.open}>
      <Card className="cardBox"  sx={modalStyle}>
          <CardContent id="assignsection-card" >
            
          <Typography sx={{position:"relative", color:"#716b6b", marginBottom:"10px"}}
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                > Add a new class <span className="customClose_modal"><CancelIcon onClick={props.params.handleClose} /></span>
          </Typography> 

            <Paper>
                  <div className="labelControls">
                      <div className="controlButtonsDiv">
                        
                        <div className="featHeading" >
                          <TextField placeholder="Enter class name" />
                        </div>
                        <div className="manageClass" >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "right",
                              width: "fit-content",

                              borderRadius: 1,
                              color: "text.secondary",
                              "& svg": {
                                m: 0.7,
                              },
                              "& hr": {
                                mx: 0.7,
                              },
                            }}
                          >
                          </Box>
                        </div>
                    </div>
                  </div>
                  <div className="sectionLabel">
                  <AssignSections
                        params={{
                          Sections: props.params.Sections,
                          assignSectionsMethod:props.params.assignSectionsMethod,
                          createClassMethod:props.params.createClassMethod,
                          setReqObj:{setClassRequestObject}
                        }}
                    />

                  </div>

                  
                    </Paper>
                    <div className='assign-footer'>
                  <Button  variant="outlined" className="mrt5 cancelBtn" onClick={props.params.handleClose}>
                    <CancelIcon /> <span className="spanAddbtnLabel"> Cancel </span>
                  </Button>
                  <Button  variant="contained" onClick="createClass()">
                      <CheckBoxIcon /> <span className="spanAddbtnLabel"> Submit </span>
                    </Button>
                </div>
            </CardContent>
      </Card>
      </Fade>
    </Modal>

    )
}


export default AddNewClassModal

