import React from 'react'
import "./Breadcrumb.css";

import {
    Typography,
    Breadcrumbs
} from "@mui/material"


import {
    Link
  } from "react-router-dom";


function Breadcrumb(props) {
    return (
        <div>
            <div className="breadCrumb">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                    Dashboard
                    </Link>
                    <Typography color="text.primary">{props.params.currentPath}</Typography>
                </Breadcrumbs>
            </div>
        </div>
    )
}

export default Breadcrumb
