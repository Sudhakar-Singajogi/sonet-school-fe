import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";

import "../src/app.css"
import Dashboard from "./pages/dashboard/Dashboard";
import ManageStudents from "./pages/ManageStudents/ManageStudents";
import ManageClasses from "./pages/ManageClasses/ManageClasses";
import Login from "./pages/Login";

function App() {
  function loadDashboard() {
    window.location.href='/';
  }

  function loadLoginPage() {
    window.location.href='/login';
  }
  const pathname = window.location.pathname;
  console.log('Hey pathname is:', pathname)
  if ( pathname !== '/login' && !(sessionStorage.getItem("accessToken")) && !(sessionStorage.getItem("refreshToken"))) {
    loadLoginPage();
  } else {
    if(pathname === '/login') {
      if(!(sessionStorage.getItem("accessToken")) && !(sessionStorage.getItem("refreshToken"))) {
       return (<Login />);
      }else {
        loadDashboard();
      }
    }
    
    return (
    
      <Router>
        <div>          
          <Topbar />
          <div className="container">
            <Sidebar />            
              <Switch>
                    <Route exact path="/login"><Login /></Route>
                    <Route exact path="/"><Dashboard params={{Breadcrumb:<Breadcrumb params={{"currentPath":"Dashboard"}} />}}/></Route>
                    <Route path="/manage-classes"><ManageClasses params={ {Breadcrumb:<Breadcrumb params={{"currentPath":"Manage Classes"}} />} } /></Route>
                    <Route path="/manage-students" ><ManageStudents params={ {Breadcrumb:<Breadcrumb params={{"currentPath":"Manage Students"}} />} } /></Route>
                  
              </Switch>
          </div>
        </div>
      </Router>
    );
   }
  
}

export default App;
