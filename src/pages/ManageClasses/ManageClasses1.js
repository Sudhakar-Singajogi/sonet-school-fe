import React from 'react'
import "./ManageClasses.css";
import Classes from "./ClassesSections"

import {
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    Paper,
    Divider,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    Backdrop,
    Modal,
    Fade,
    FormGroup,
    FormControlLabel
} from "@mui/material"
import {Delete, Edit, AddCircle} from '@material-ui/icons'

const ListStyle = {
    maxWidth: 360,
    bgcolor: 'background.paper',
    fontSize:12
  };
  const cardBoxcontent ={
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
    m: 0,
    width: 280,
    height: "auto",
    },
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ManageClasses(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="manageStudents">
            {props.params.Breadcrumb}
            <div class="fullWidth"> 
                <div className="left50">
                     <h3 className="pl10"> Manage classes </h3>
                </div>
                <div className="right50">
                    <Button onClick={handleOpen} > <AddCircle /> New Class</Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                        <Box sx={modalStyle}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                            Text in a modal
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                        </Fade>
                    </Modal>
                </div>
            </div>
            
            
            <div className="boxcard">
                
                <div className="card">
                    {
                        Classes.map((Currentclass, index)=> {

                            return (
                                <>
                                <Card class="cardBox" >
                            <CardContent>
                            <Box
                                sx={cardBoxcontent}
                                >
                                    
                                <Paper>
                                    <div className="labelControls">
                                        <div className='controlButtonsDiv'>
                                            <div className="featHeading">
                                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                                Class-I
                                            </Typography>
                                                </div>
                                            <div className="manageClass"> 
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'right',
                                                        width: 'fit-content',
                                                        
                                                        borderRadius: 1,
                                                        bgcolor: '#f6f5f5',
                                                        color: 'text.secondary',
                                                        '& svg': {
                                                            m: 0.7,
                                                        },
                                                        '& hr': {
                                                            mx: 0.7,
                                                        },
                                                    }}
                                                    >
                                                    <Edit className="controlButtons" />
                                                    <Divider orientation="vertical" variant="middle" flexItem />
                                                    <Delete className="controlButtons"/>
                                                        
                                                </Box>
                                                
                                            </div>
                                        </div>
                                        

                                    </div>

                                    <div className="sectionLabel">
                                            <Divider textAlign="left" >
                                                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                                    Sections
                                                </Typography>                        
                                            </Divider>
                                        </div>

                                    <List sx={ListStyle} component="nav" aria-label="mailbox folders">
                                        <ListItem button>
                                        <Checkbox />
                                        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                        </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'right',
                                                        width: 'fit-content',
                                                        
                                                        borderRadius: 1,
                                                        color: 'text.secondary',
                                                        '& svg': {
                                                            m: 0.7,
                                                        },
                                                        '& hr': {
                                                            mx: 0.7,
                                                        },
                                                    }}
                                                    >
                                                    <div className="sectionName">
                                                        <ListItemText  primary="Section-A" />
                                                    </div>
                                                    

                                                        <Edit className="controlButtons" />
                                                        <Divider orientation="vertical" variant="middle" flexItem />
                                                        <Delete className="controlButtons"/>
                                                        
                                                </Box>
                                                
                                        
                                        </ListItem>
                                        <Divider />
                                        
                                        <ListItem button>
                                        <Checkbox />
                                        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                        </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'right',
                                                        width: 'fit-content',
                                                        
                                                        borderRadius: 1,
                                                        color: 'text.secondary',
                                                        '& svg': {
                                                            m: 0.7,
                                                        },
                                                        '& hr': {
                                                            mx: 0.7,
                                                        },
                                                    }}
                                                    >
                                                    <div className="sectionName">
                                                        <ListItemText  primary="Section-B" />
                                                    </div>
                                                    

                                                        <Edit className="controlButtons" />
                                                        <Divider orientation="vertical" variant="middle" flexItem />
                                                        <Delete className="controlButtons"/>
                                                        
                                                </Box>
                                                
                                        
                                        </ListItem>
                                        <Divider />
                                        <ListItem button>
                                        <Checkbox />
                                        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                        </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'right',
                                                        width: 'fit-content',
                                                        
                                                        borderRadius: 1,
                                                        color: 'text.secondary',
                                                        '& svg': {
                                                            m: 0.7,
                                                        },
                                                        '& hr': {
                                                            mx: 0.7,
                                                        },
                                                    }}
                                                    >
                                                    <div className="sectionName">
                                                        <ListItemText  primary="Section-C" />
                                                    </div>
                                                    

                                                        <Edit className="controlButtons" />
                                                        <Divider orientation="vertical" variant="middle" flexItem />
                                                        <Delete className="controlButtons"/>
                                                        
                                                </Box>
                                                
                                        
                                        </ListItem>
                                        <Divider />
                                        <ListItem button>
                                        <Checkbox />
                                        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                        </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'right',
                                                        width: 'fit-content',
                                                        
                                                        borderRadius: 1,
                                                        color: 'text.secondary',
                                                        '& svg': {
                                                            m: 0.7,
                                                        },
                                                        '& hr': {
                                                            mx: 0.7,
                                                        },
                                                    }}
                                                    >
                                                    <div className="sectionName">
                                                        <ListItemText  primary="Section-D" />
                                                    </div>
                                                    

                                                        <Edit className="controlButtons" />
                                                        <Divider orientation="vertical" variant="middle" flexItem />
                                                        <Delete className="controlButtons"/>
                                                        
                                                </Box>
                                                
                                        
                                        </ListItem>
                                    </List>
                                    <Divider />
                                    <div className="cardFooter">
                                        <div className="cardFooterLeft">
                                                <Box
                                                    sx={{
                                                        color: 'text.secondary',
                                                        '& svg': {
                                                            m: 0.7,
                                                        },
                                                        '& hr': {
                                                            mx: 0.7,
                                                        },
                                                    }}
                                                    >
                                                        
                                                    <FormGroup sx={{marginLeft:"22px"}}>
                                                        <FormControlLabel control={<Checkbox />} label="" />  
                                                    </FormGroup>
                                                </Box>

                                        </div>
                                        <div className="cardFooterCenter">
                                            <Edit fontSize={"small"} className="controlButtons" sx={{"marginTop":'15'}} />
                                            <Delete fontSize={"small"} className="controlButtons" />                                            

                                        </div>
                                        <div className="cardFooterRight">    
                                        <Box 
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'left',
                                                width: 'fit-content',
                                                bgcolor: 'background.paper',
                                                color: 'text.secondary',
                                                '& svg': {
                                                m: 1.5,
                                                },
                                                '& hr': {
                                                mx: 2,
                                                },
                                            }}
                                        >       
                                            <Divider orientation="vertical" flexItem />  
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Assign Sections
                                                </Typography>
                                        </Box>                      
                                                
                                                
                                        </div>

                                        <div className="clearBoth"></div>

                                    
                                    </div>
                                </Paper>
                            </Box>
                        </CardContent>
                        
                                 </Card>
                                </>
                            )

                        })
                    }
                
                  
                    
                </div>

               
                
               
            </div>
            
        </div>
    )
}

export default ManageClasses
