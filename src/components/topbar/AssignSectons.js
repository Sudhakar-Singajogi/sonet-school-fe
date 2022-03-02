import React from 'react';
import {forwardRef, useImperativeHandle} from 'react'

import {
    Grid,
    List,
    CardHeader,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    Card,    
    CardContent,
    Typography,
    Button,
    Paper,
    Divider,
    Backdrop,
    Modal,
    Fade,
    
} from "@mui/material"

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }


function AssignSections(props) {
  var Sections = props.params.Sections
  var schoolSectionsObj = props.params.Sections;
  var assignSectionsMethod = props.params.assignSections;
  var createClassMethod = props.params.createClassMethod;
  var alreadyAddedSections = [];

    var assignedsections = [];
    var unassignedSections = [];
    var allSections = [];

    var assigned_sections = [];

    Sections.map((sectionObj) => {
        allSections.push(sectionObj.sectionName)
    });   
    
    unassignedSections = allSections;
    
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(assignedsections);
    const [right, setRight] = React.useState(unassignedSections);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const [classAssignedSections, setClassAssignedSections] = React.useState([]); 

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
        } else {
        setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = async(e) => {
      
        
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));

        var reqBody = prepareReqBody(leftChecked);
        assigned_sections.push(reqBody);
        console.log('assigned_sections', assigned_sections)
    };

    const handleCheckedLeft = async(e) => {
      
      //prepare the assign sections to a class object
      var reqBody = prepareReqBody(rightChecked);
      //const resp = await assignSectionsMethod(reqBody);

      // do the post call to assign sections to the class

        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        // console.log('assigned_sections are: ', classAssignedSections);
        // console.log('total assigned_sections are: ', classAssignedSections.length);

        if(assigned_sections.length === 0) {
          setClassAssignedSections(reqBody.assignedSections)
        } else {          
          alreadyAddedSections.push(classAssignedSections);
          alreadyAddedSections.push(reqBody.assignedSections);
          setClassAssignedSections(alreadyAddedSections);
        }

        var parentSetFun = props.params.setReqObj;

        parentSetFun(classAssignedSections);
        
        // console.log('assigned_sections are: ', classAssignedSections);
    };
    
    const prepareReqBody = (checked) => {
      var assignedSections = [];
      checked.map((sectionName) => {
        var section = schoolSectionsObj.filter(function (item) {
          return (item.sectionName === sectionName);
      });
      section = section[0];
      var sectionId = section.sectionId;

      assignedSections.push({
          sectionId,
          sectionName
        })

      })

      // console.log('req body is', assignedSections)
      //prepare the assign sections to a class object
      return  {
        assignedSections
      }
    }


    const customList = (title, items) => (
        <Card id="add-section-card">
          <CardHeader
            sx={{ px: 2, py: 1, fontWeight:'600' }}
            avatar={
              <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={
                  numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                }
                disabled={items.length === 0}
                inputProps={{
                  'aria-label': 'all items selected',
                }}
              />
            }
            title={title}
            subheader={`${numberOfChecked(items)}/${items.length} selected`}
          />
          <Divider />
          <List
            sx={{
              width: 200,
              height: 230,
              bgcolor: 'background.paper',
              overflow: 'auto',
            }}
            dense
            component="div"
            role="list"
          >
            {items.map((value) => {
              const labelId = `transfer-list-all-item-${value}-label`;
    
              return (
                <ListItem
                  key={value}
                  role="listitem"
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        </Card>
      );
  
    return (
        <Grid container spacing={3} justifyContent="left" alignItems="center" sx={{ my: 0.5, mx:0.5 }}>
        <Grid item>{customList('Assigned Sections', left)}</Grid>
        <Grid item>
            <Grid container direction="column" alignItems="center">
            <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
                title="Unassign"
            >
                &gt;
            </Button>
            <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
                title="Assign"
            >
                &lt;
            </Button>
            </Grid>
        </Grid>
        <Grid item>{customList('Available Sections', right)}</Grid>
    </Grid>
    )
};

export default AssignSections
