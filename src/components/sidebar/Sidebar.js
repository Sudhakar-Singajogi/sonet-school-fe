import React from 'react'
import "./Sidebar.css"
import {LineStyle, GroupOutlined, Accessibility, Accessible, AllOut} from "@material-ui/icons";
import {
    Link
  } from "react-router-dom";

function Sidebar() {
    return (
        <div className='sidebar'>
           <div className="sidebarWrapper">
               <div className="sidebarMenu">
                   <h3 className="sidebarTitle">
                   <Link to="/" className="sideBarLink active"> 
                        Dashboard 
                    </Link>
                   </h3>
                   <ul className="sidebarList">
                       <li className="sidebarListitem">
                       <Link to="/manage-classes" className="sideBarLink"> 
                        <LineStyle className="leftMenuIcon" /> Manage Classes
                       </Link>
                       </li>

                       <li className="sidebarListitem">
                          
                       <Link to="/manage-students" className="sideBarLink">
                            <GroupOutlined className="leftMenuIcon" /> Manage Students
                        </Link>
                       </li>
                       <li className="sidebarListitem">
                       <Link to="/manage-subjects" className="sideBarLink" >
                           <AllOut className="leftMenuIcon" />   Manage Subjects
                        </Link>
                       </li>
                       <li className="sidebarListitem">
                        <Link to="/manage-permissions" className="sideBarLink">
                           <Accessibility className="leftMenuIcon" />   Manage Permissions
                        </Link>
                       </li>
                       <li className="sidebarListitem">
                        <Link to="/manage-roles" className="sideBarLink">
                           <Accessible className="leftMenuIcon" />  Manage Roles
                        </Link>
                       </li>
                   </ul>
                   
               </div>

           </div>
        </div>
    )
}

export default Sidebar
