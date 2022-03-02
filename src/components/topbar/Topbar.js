import React from 'react'
import "./Topbar.css";
import {NotificationsNone, Language, Settings} from '@material-ui/icons'


function Topbar() {
    return (
        <div>

            <div className="topbar">
                <div className="topbarWrapper">
                    <div className="topbarleft"> <span className="logo">Sonet Info</span> </div>
                    <div className="topbarright">
                        <div className="topbarIconcontainer">
                            <NotificationsNone />
                            <span className="topIconBag">2</span>

                        </div>
                        <div className="topbarIconcontainer">
                            <Settings />

                        </div>
                        <div className="topbarIconcontainer">
                            <Language />

                        </div>

                        <img src="../../images/profilePic.jpg" className="AvatarImg" />
                        
                    </div>
                    
                </div>

            </div>
            
            

            
        </div>
    )
}

export default Topbar
