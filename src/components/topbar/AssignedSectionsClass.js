import React from 'react'

// import Sections from '../../pages/ManageClasses/Sections'

import {
    Grid,
    List,
    CardHeader,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
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


function AssignedSectionsClass(props) {

  var Sections = props.params.Sections
  var schoolSectionsObj = props.params.Sections;
  var assignSectionsMethod = props.params.assignSections;
  var unAssignSectionsMethod = props.params.unAssignSections;

    var assignedsections = [];
    var unassignedSections = [];
    var allSections = [];
    var classId = props.params.Currentclass.classId;

    Sections.map((sectionObj) => {
        allSections.push(sectionObj.sectionName)
    })

    props.params.Currentclass.assignedSections.map((secObj) => {
        assignedsections.push(secObj.sectionName)
    });
    
    unassignedSections = allSections.filter(val => !assignedsections.includes(val));
    
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(assignedsections);
    const [right, setRight] = React.useState(unassignedSections);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

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
      
      var currentElmParent = e.currentTarget.parentNode;
      var buttons = currentElmParent.children;
      var classId = buttons[0].getAttribute("id");
      
      //prepare the assign sections to a class object
      var reqBody = prepareReqBody(leftChecked);
      reqBody.classId = classId;
      
      const resp = await unAssignSectionsMethod(reqBody);      
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = async(e) => {
      var currentElmParent = e.currentTarget.parentNode;
      var buttons = currentElmParent.children;
      var classId = buttons[0].getAttribute("id");

      console.log('classId is', classId);

      //prepare the assign sections to a class object
      var reqBody = prepareReqBody(rightChecked);
      reqBody.classId = classId;
      const resp = await assignSectionsMethod(reqBody);

      // do the post call to assign sections to the class

        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
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
      //prepare the assign sections to a class object
      return  {
        assignedSections
      }
    }


    const customList = (title, items) => (
        <Card id="sections-card">
          <CardHeader
            sx={{ px: 2, py: 1 }}
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
            className="sectionItems"
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
        <Grid container spacing={2} justifyContent="center" alignItems="center" >
        <Grid item >{customList('Assigned Sections', left)}</Grid>
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
                id={classId}
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
                id={classId}
            >
                &lt;
            </Button>
            </Grid>
        </Grid>
        <Grid item>{customList('Available Sections', right)}</Grid>
    </Grid>
    )
}

export default AssignedSectionsClass
