import "./ManageStudents.css"

function ManageStudents(props) {
    return (
        <div className='manageStudents'>
            {props.params.Breadcrumb}
            <h3>Manage Students</h3>
        </div>
    )
}

export default ManageStudents
