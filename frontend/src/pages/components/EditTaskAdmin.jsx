import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../services/authService'
import { getTask, postTask, updateTaskById, deleteTaskById } from '../../services/taskService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faCircleInfo, faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import toast, { Toaster } from 'react-hot-toast'

import useViewStore from "../../../store/store"


export default function EditTaskAdmin({ user, setUser, userAll, setUserAll, taskAll, setTaskAll }) {
  
  const [showTaskForm, setShowTaskForm] = useState(false)
  const navigate = useNavigate()

  const [taskId, setTaskId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedBy, setAssignedBy] = useState("")
  const [staffId, setStaffId] = useState("")
  const [staffRole, setStaffRole] = useState("")
  const [status, setStatus] = useState("")
  const [level, setLevel] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [updatedAt, setUpdatedAt] = useState("")

  const [search, setSearch] = useState("")

  const [filterStatus, setFilterStatus] = useState("All")
  const listStatus = ["All", "Pending", "In progress", "Completed"]

  const { view, setView } = useViewStore()

  const successNotif = (action) => toast.success(`Success ${action} a new task!`)
  const failNotif = () => toast('Failed to create a new task!', { icon: <FontAwesomeIcon className="text-[#00bafe]" icon={faCircleInfo} /> })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
      
  }, [navigate])

  const handleRegisterTask = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const updatedData = {
      title,
      description,
      assignedBy: user._id,
      staffId,
      status,
      level
    }

    try {
      const result = await postTask(token, updatedData)
      successNotif("create")
      setTaskAll(result.data.taskAll)

      setTitle("")
      setDescription("")
      setStaffId("")
      setStatus("")
      setLevel("")

    } catch (err) {
      failNotif()
      console.log(err.message)
    }
  }

  const handleUpdateTaskById = async (e, id, title, description, staffId, status, level) => {
    e.preventDefault()
    
    const token = localStorage.getItem('token')
    const updatedData = {
      title,
      description,
      assignedBy: user._id,
      staffId,
      status,
      level
    }

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const result = await updateTaskById(token, id, updatedData)
      successNotif("update")
      setTaskAll(result.data.taskAll)
      
      setTitle("")
      setDescription("")
      setStaffId("")
      setStatus("")
      setLevel("")

    } catch (err) {
      console.error('Failed to update user:', err)
    }
  }

  const handleDeleteTaskById = async (e, id) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      await deleteTaskById(token, id)
      successNotif("delete")
      setTaskAll(prev => prev.filter(user => user._id !== id))
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  const tempValues = ({
    id = "",
    title = "",
    description = "",
    assignedBy = "",
    staffId = "",
    staffRole = "",
    status = "",
    level = "",
    createdAt = "",
    updatedAt = ""
  } = {})  => {

    setTaskId(id)
    setTitle(title)
    setDescription(description)
    setAssignedBy(assignedBy)
    setStaffId(staffId)
    setStaffRole(staffRole)
    setStatus(status)
    setLevel(level)
    setCreatedAt(createdAt)
    setUpdatedAt(updatedAt)
  }

  const dateFormat = (value) => {
      const date = new Date(value)
      const newDate = date.toLocaleDateString("en-US", {
        month: "short", 
        day: "numeric", 
        year: "numeric", 
      })
      return newDate
  }

  const truncateText = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }

// --------------------------------------------------- RENDER LIST TASK (TABLE)
  const RenderTableTask = ({ filteredTaskAll }) => {
    return(
      <div className="w-full overflow-x-auto rounded-box border-2 border-[#ebebdd] bg-base-100 max-w-full">
        <table className="table w-full min-w-max">
          <thead className="bg-[#f8f8f8]">
            <tr>
              <th>Name</th>
              <th>Staff's Name</th>
              <th className="hidden md:table-cell">Status</th>
              <th className="hidden md:table-cell">Level</th>
              <th className="hidden md:table-cell">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
            filteredTaskAll && filteredTaskAll.length > 0 ? (
              filteredTaskAll?.map((val, i) => (
              <tr key={val._id}>
                  <td>{truncateText(val.title, 24)}</td>
                  <td>{truncateText(val.staffId?.userName, 18)}</td>
                  <td className="hidden md:table-cell">
                    <span className={
                      val.status == "completed" ? "badge badge-soft badge-success" : 
                      val.status == "in progress" ? "badge badge-soft badge-warning" : 
                      "badge badge-ghost"
                    }>
                    {val.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell"> 
                    <span className={
                      val.level == "high" ? "badge badge-soft badge-secondary" : 
                      val.level == "medium" ? "badge badge-soft badge-warning" : 
                      "badge badge-ghost"
                    }>
                    {val.level}
                    </span>
                  </td>
                  <td className="hidden md:table-cell">{dateFormat(val.createdAt.split(" ")[0])}</td>
                  <td className="flex justify-center gap-2">
                    <button className="btn btn-soft btn-info btn-sm rounded-lg" onClick={() => {
                      tempValues({
                        id:val._id, title:val.title, description:val.description, assignedBy:val.assignedBy.userName,
                        staffId:val.staffId.userName, staffRole:val.staffId.role, status:val.status, level:val.level, createdAt:val.createdAt, updatedAt:val.updatedAt
                      })
                      setTimeout(() => {
                        document.getElementById("modal_task_detail").checked = true
                      }, 0)
                    }}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    <button className="btn font-medium btn-sm rounded-lg" onClick={() => {
                      tempValues({
                        id:val._id, title:val.title, description:val.description,
                        staffId:val.staffId._id, status:val.status, level:val.level
                      })
                      setTimeout(() => {
                        document.getElementById("modal_u_task").checked = true
                      }, 0)
                    }}>Update</button>
                    <button className="btn btn-soft btn-error btn-sm rounded-lg" onClick={(e) => {
                      tempValues({
                        id:val._id
                      })
                      setTimeout(() => {
                        document.getElementById("modal_d_task").checked = true
                      }, 0)
                    }}><FontAwesomeIcon icon={faTrashCan} /></button>
                  </td>
              </tr>
              ))
            ):(
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Please create a new task
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

// --------------------------------------------------- RENDER LIST TASK (GRID)
  const RenderGridTask = ({ filteredTaskAll }) => { 

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-hidden pb-20">
      {
        filteredTaskAll && filteredTaskAll.length > 0 ? (
          filteredTaskAll?.map((val, i) => (
          <div className="card rounded-xl border-2 border-[#ebebdd] bg-base-100 card-md">
            <div className="card-body">

              <div className="flex justify-between items-center font-medium text-lg leading-6 mb-2">
                <div>
                  {truncateText(val.title, 35)}
                </div>
                <div className="dropdown dropdown-bottom dropdown-end -mr-5">
                  <div tabIndex="0" role="button" className="btn btn-ghost m-1"><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 border-1 border-[#ebebdd] rounded-xl font-medium w-52 p-2">
                    <li className="bg-blue-50 text-[#00bafe]" onClick={() => {
                      tempValues({
                        id:val._id, title:val.title, description:val.description, assignedBy:val.assignedBy.userName,
                        staffId:val.staffId.userName, staffRole:val.staffId.role, status:val.status, level:val.level, createdAt:val.createdAt, updatedAt:val.updatedAt
                      })
                      setTimeout(() => {
                        document.getElementById("modal_task_detail").checked = true
                      }, 0)
                    }}><a><FontAwesomeIcon icon={faMagnifyingGlass} /> Detail</a></li>
                    <li className="" onClick={() => {
                      tempValues({
                        id:val._id, title:val.title, description:val.description,
                        staffId:val.staffId._id, status:val.status, level:val.level
                      })
                      setTimeout(() => {
                        document.getElementById("modal_u_task").checked = true
                      }, 0)
                    }}><a><FontAwesomeIcon icon={faPenToSquare} /> Update</a></li>
                    <li className="bg-rose-50 text-[#f43098]" onClick={(e) => {
                      tempValues({
                        id:val._id
                      })
                      setTimeout(() => {
                        document.getElementById("modal_d_task").checked = true
                      }, 0)
                    }}><a><FontAwesomeIcon icon={faTrashCan} /> Delete</a></li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-500 mb-2">{truncateText(val.description, 70)}</p>

              <div className="flex text-gray-500 text-xs gap-2 mb-2">
                <span className={
                  val.status == "completed" ? "badge badge-sm badge-soft badge-success" : 
                  val.status == "in progress" ? "badge badge-sm badge-soft badge-warning" : 
                  "badge badge-sm badge-ghost"
                }>
                {val.status}
                </span>

                <span className={
                    val.level == "high" ? "badge badge-sm badge-soft badge-secondary" : 
                    val.level == "medium" ? "badge badge-sm badge-soft badge-warning" : 
                    "badge badge-sm badge-ghost"
                  }>
                  {val.level}
                </span>
              </div>
              
              <div className="flex justify-between text-gray-500 text-xs">
                <p className=""><FontAwesomeIcon icon={faUser} /> {val.staffId.userName}</p>
                <p className="text-end">{dateFormat(val.createdAt.split(" ")[0])}</p>
              </div>

            </div>
          </div>
          ))
        ):( 
          <div></div> 
        )
      }
      </div>
    )
  }

  if (!user) return <div></div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 lg:mt-15 overflow-hidden">

      <Toaster />

{/* --------------------------------------------------- BUTTON FOR FILTER, SEARCH, AND CREATE */}
      <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-1">
        <div className="col-span-12 lg:col-span-8 flex flex-col lg:flex-row ">
          <div className="join rounded-lg border-[#ebebdd]">
            {listStatus.map((val, i) => (
              <input
                key={i}
                type="radio"
                name="filterStatus"
                aria-label={val}
                className="join-item btn checked:bg-[#f8f34c] checked:text-[#394040] border-none shadow-none font-medium"
                checked={filterStatus === val}
                onChange={() => setFilterStatus(val)}
              />
            ))}
          </div>

          <label className="input rounded-lg flex items-center w-auto ml-0 lg:ml-3 mt-3 lg:mt-0">
            <FontAwesomeIcon className="text-[#394040]" icon={faMagnifyingGlass} /> <input type="search" placeholder="Search by name..." onChange={e => setSearch(e.target.value)} />
          </label>
        </div>

        <div className="col-span-4 col-end-13 mt-5 lg:mt-0">
          <label htmlFor="modal_c_task" className="btn bg-[#394040] text-white font-medium rounded-lg"
          onClick={e=> tempValues()}><FontAwesomeIcon icon={faPlus} /> Create a new task</label>
        </div>
      </div>

{/* --------------------------------------------------- CREATE TASK */}
      {/* MODAL CREATE TASK */}
      <input type="checkbox" id="modal_c_task" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-h-[90%] w-[95vw] md:w-[40vw] max-w-full sm:max-w-lg md:max-w-3xl overflow-x-auto">
        <h3 className="text-lg font-semibold">New Task Form</h3>
        <hr className="my-5 h-[0.05rem] bg-gray-400 border-0" />
        {user?.role == "admin" && (
            <form className="flex flex-col gap-3 flex-wrap w-full" onSubmit={(e) => {
              handleRegisterTask(e, title, description, staffId, status, level)
              document.getElementById("modal_c_task").checked = false
            }}>
                <label className="label text-sm">Title</label> 
                <input className="input w-full" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
                <label className="label text-sm">Description</label> 
                <textarea className="textarea w-full" type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" ></textarea>
                <label className="label text-sm">Staff's Name</label> 
                <select className="select w-full" value={staffId} onChange={e => setStaffId(e.target.value)}>
                  <option value="">-- Select Staff --</option>
                  {
                    userAll.map((val, i) => (
                      <option key={val._id} value={val._id}>{val.userName}</option>
                    ))
                  }
                </select>
                <label className="label text-sm">Status</label>
                <select className="select w-full" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="">-- Select Status --</option>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <label className="label text-sm">Level</label>
                <select className="select w-full" value={level} onChange={e => setLevel(e.target.value)}>
                  <option value="">-- Select Level --</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <button className="btn rounded-lg w-full md:w-auto mt-5" type="submit">Create</button>
            </form>
        )}

        <div className="modal-action">
          <label htmlFor="modal_c_task" className="btn rounded-lg">Close!</label>
        </div>

        </div>
      </div>

{/* --------------------------------------------------- DETAIL TASK */}
      {/* MODAL DETAIL TASK */}
      <input type="checkbox" id="modal_task_detail" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-h-[90%] w-[95vw] md:w-[40vw] max-w-full sm:max-w-lg md:max-w-3xl overflow-x-auto">
          <h3 className="text-lg font-semibold">Detail Task Form</h3>
          <hr className="my-5 h-[0.05rem] bg-gray-400 border-0" />
          
          <div className="flex flex-col gap-3" onSubmit={(e) => {
            document.getElementById("modal_task_detail").checked = false
          }}>
            <div className="overflow-x-auto">
              <table className="table flex flex-col ">
                <tbody className="[&_th]:font-semibold">
                  <tr>
                    <th>Title</th>
                    <td>{title}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{description}</td>
                  </tr>
                  <tr>
                    <th>Assigned By</th>
                    <td>{assignedBy}</td>
                  </tr>
                  <tr>
                    <th>Staff's Name</th>
                    <td>{staffId}</td>
                  </tr>
                  <tr>
                    <th>Staff's Role</th>
                    <td>
                      <span className={
                        staffRole == "admin" ? "badge bg-[#bde9ff] text-[#394040]" :
                        "badge bg-[#fef8c8] text-[#394040]"
                      }>
                        {staffRole}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <span className={
                        status == "completed" ? "badge badge-soft badge-success" : 
                        status == "in progress" ? "badge badge-soft badge-warning" : 
                        "badge badge-ghost"
                      }>
                        {status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Level</th>
                    <td>
                      <span className={
                        level == "high" ? "badge badge-soft badge-secondary" : 
                        level == "medium" ? "badge badge-soft badge-warning" : 
                        "badge badge-ghost"
                      }>
                        {level}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Created at</th>
                    <td>{createdAt}</td>
                  </tr>
                  <tr>
                    <th>Updated at</th>
                    <td>{updatedAt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        
        <div className="modal-action">
          <label htmlFor="modal_task_detail" className="btn rounded-lg">Close!</label>
        </div>
        </div>
      </div>

{/* --------------------------------------------------- UPDATE TASK */}
      {/* MODAL UPDATE TASK */}
      <input type="checkbox" id="modal_u_task" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-h-[90%] w-[95vw] md:w-[40vw] max-w-full sm:max-w-lg md:max-w-3xl overflow-x-auto">
          <h3 className="text-lg font-semibold">Update Task Form</h3>
          <hr className="my-5 h-[0.05rem] bg-gray-400 border-0" />

          <form className="flex flex-col gap-3" onSubmit={(e) => {
            handleUpdateTaskById(e, taskId, title, description, staffId, status, level)
            document.getElementById("modal_u_task").checked = false
          }}>
            <label className="label text-sm">Title</label>
            <input className="input w-full" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <label className="label text-sm">Description</label>
            <textarea className="textarea w-full" type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
            <label className="label text-sm">Staff's Name</label>
            <select className="select w-full" value={staffId} onChange={e => setStaffId(e.target.value)}>
              <option value="">-- Select Staff --</option>
              {
                userAll.map((val, i) => (
                  <option key={val._id} value={val._id}>{val.userName}</option>
                ))
              }
            </select>
            <label className="label text-sm">Status</label>
            <select className="select w-full" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">-- Select Status --</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <label className="label text-sm">Level</label>
            <select className="select w-full" value={level} onChange={e => setLevel(e.target.value)}>
              <option value="">-- Select Level --</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button className="btn rounded-lg w-full md:w-auto mt-5" type="submit">Update</button>
          </form>
          
        <div className="modal-action">
          <label htmlFor="modal_u_task" className="btn rounded-lg">Close!</label>
        </div>
        </div>
      </div>

{/* --------------------------------------------------- DELETE TASK */}
      {/* MODAL DELETE TASK */}
      <input type="checkbox" id="modal_d_task" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-h-[90%] w-[95vw] md:w-[30vw] max-w-full sm:max-w-lg md:max-w-3xl overflow-x-auto">
          <h3 className="text-lg font-semibold">Are you sure to delete?</h3>
          
          <form className="flex flex-col gap-3" onSubmit={(e) => {
            handleDeleteTaskById(e, taskId)
            document.getElementById("modal_d_task").checked = false
          }}>
            <div className="modal-action w-full md:w-auto mt-5">
              <button className="btn btn-soft btn-error rounded-lg" type="submit"><FontAwesomeIcon icon={faTrashCan} />Delete</button>
              <label htmlFor="modal_d_task" className="btn rounded-lg">Close!</label>
            </div>
          </form>
          
        </div>
      </div>

{/* --------------------------------------------------- LIST TASK */}
      <div className="col-span-12 w-full overflow-x-auto">
      
        { 
          view == "table"
          ? search !== "" 
                  ? filterStatus.toLowerCase() == "all" 
                      ? (<RenderTableTask filteredTaskAll={taskAll.filter(item => item.staffId.userName === search)} />)
                      : (<RenderTableTask filteredTaskAll={taskAll.filter(item => item.status === filterStatus.toLowerCase() && item.staffId.userName === search)} />)
                  : filterStatus.toLowerCase() == "all" 
                      ? (<RenderTableTask filteredTaskAll={taskAll} />)
                      : (<RenderTableTask filteredTaskAll={taskAll.filter(item => item.status === filterStatus.toLowerCase())} />)
          
          : search !== "" 
                  ? filterStatus.toLowerCase() == "all" 
                      ? (<RenderGridTask filteredTaskAll={taskAll.filter(item => item.staffId.userName === search)} />)
                      : (<RenderGridTask filteredTaskAll={taskAll.filter(item => item.status === filterStatus.toLowerCase() && item.staffId.userName === search)} />)
                  : filterStatus.toLowerCase() == "all" 
                      ? (<RenderGridTask filteredTaskAll={taskAll} />)
                      : (<RenderGridTask filteredTaskAll={taskAll.filter(item => item.status === filterStatus.toLowerCase())} />)
          
        }

      </div>

    </div>
  )
}
