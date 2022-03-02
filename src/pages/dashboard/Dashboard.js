import "./Dashboard.css"

function Dashboard(props) {
    return (
        <div className="dashboard">
            {props.params.Breadcrumb}
            <h3>Dashboard content</h3>
            
        </div>
    )
}

export default Dashboard
