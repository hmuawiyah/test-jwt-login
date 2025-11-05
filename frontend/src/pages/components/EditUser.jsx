import React, { useEffect, useState } from 'react'
import { getUser, register, updateUserById, deleteUserById } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import toast, { Toaster } from 'react-hot-toast'

import useViewStore from "../../../store/store"

export default function EditUser({ userAll, setUserAll }) {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  
  const [userId, setUserId] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userRole, setUserRole] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [updatedAt, setUpdatedAt] = useState("")

  const [search, setSearch] = useState("")

  const [filterRole, setFilterRole] = useState("All")
  const listRole = ["All" ,"Admin", "Member"]

  const { view, setView } = useViewStore()

  const successNotif = (action) => toast.success(`Success ${action} a new user!`)
  const failNotif = () => toast('Failed to create a new user!', { icon: <FontAwesomeIcon className="text-[#00bafe]" icon={faCircleInfo} /> })


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }


    getUser(token)
      .then(res => {
        setUser(res.data.user)
      })
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })

  }, [navigate])

  // --------------------------------------------------- USER

  const handleRegisterUser = async (e) => {
    e.preventDefault()
    try {
      const result = await register(userName, email, password, role)
      successNotif("create")
      setUserAll(result.data.userAll)

      setUserName("")
      setEmail("")
      setPassword("")
      setRole("")

    } catch (err) {
      failNotif()
      console.log(err.message)
    }
  }

  const handleUpdateUserById = async (e, id, userName, email, password, role) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const updatedData = {
      userName,
      email,
      password,
      role
    }

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const result = await updateUserById(token, id, updatedData)
      successNotif("update")
      setUserAll(result.data.userAll)

      setUserName("")
      setEmail("")
      setPassword("")
      setRole("")

    } catch (err) {
      console.error('Failed to update user:', err)
    }
  }

  const handleDeleteUserById = async (e, id) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      await deleteUserById(token, id)
      successNotif("delete")
      setUserAll(prev => prev.filter(user => user._id !== id))
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }
  
  const tempValues = ({
    id = "", 
    userName = "", 
    email = "", 
    role = "",
    createdAt = "",
    updatedAt = ""
  } = {}) => {
    setUserId(id)
    setUserName(userName)
    setUserEmail(email)
    setUserRole(role)
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

  const getInitials = (name) => { 
    const words = name.trim().split(/\s+/);
    
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  const truncateText = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }


  // if (!user) return <div>Loading...</div>

// --------------------------------------------------- RENDER LIST USER (TABLE)
  const RenderTableUser = ({ filteredUserAll }) => {
    return(
    <div className="w-full overflow-x-auto rounded-box border-2 border-[#ebebdd] bg-base-100 max-w-full">
      <table className="table w-full min-w-max">
        <thead className="bg-[#f8f8f8]">
          <tr>
            <th className="hidden md:table-cell">User ID</th>
            <th>Name</th>
            <th className="hidden md:table-cell">Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUserAll && filteredUserAll.length > 0 ? (
            filteredUserAll.map((val, i) => (
            <tr key={val._id}>
                <td className="hidden md:table-cell">{val._id}</td>
                <td>{truncateText(val.userName, 18)}</td>
                <td className="hidden md:table-cell">{truncateText(val.email, 18)}</td>
                <td>
                  <span className={
                    val.role == "admin" ? "badge bg-[#bde9ff] text-[#1291cf]" :
                    "badge bg-[#fef8c8] text-[#877800]"
                  }>
                  {val.role}
                  </span>
                </td>
                <td className="flex justify-center gap-2">

                  <button className="btn btn-soft btn-info btn-sm rounded-lg" onClick={() => {
                    tempValues({
                      id:val._id, userName:val.userName, email:val.email, role:val.role,
                      createdAt:val.createdAt, updatedAt:val.updatedAt})
                    setTimeout(() => {
                      document.getElementById("modal_user_detail").checked = true
                    }, 0)
                  }}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                  <button className="btn font-medium btn-sm rounded-lg" onClick={() => {
                    tempValues({
                      id:val._id, userName:val.userName, email:val.email, role:val.role})
                    setTimeout(() => {
                      document.getElementById("modal_u_user").checked = true
                    }, 0)
                  }}>Update</button>
                  <button className="btn btn-soft btn-error btn-sm rounded-lg" onClick={(e) => {
                    tempValues({
                        id:val._id
                    })
                    setTimeout(() => {
                        document.getElementById("modal_d_user").checked = true
                    }, 0)
                  }}><FontAwesomeIcon icon={faTrashCan} /></button>
                </td>
            </tr>
            ))
          ):(
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Please create a new user
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    )
  }

// --------------------------------------------------- RENDER LIST USER (GRID)
  const RenderGridUser = ({ filteredUserAll }) => { 
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden pb-20">
      {
        filteredUserAll && filteredUserAll.length > 0 ? (
          filteredUserAll?.map((val, i) => (
          <div className="card rounded-xl border-2 border-[#ebebdd] bg-base-100 card-md">
            <div className="card-body">

              <div className="flex justify-between items-center font-medium text-lg leading-5 mb-4">
                
                <div className="flex items-center">
                  <div className="avatar avatar-placeholder">
                    <div class="bg-gray-100 text-gray-600 w-10 text-md font-light rounded-full">
                      <span>{getInitials(val.userName)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col ml-2">
                    <span className=""> {truncateText(val.userName, 18)} </span>
                    <span className="text-gray-400 text-xs"><FontAwesomeIcon icon={faEnvelope} /> {truncateText(val.email, 18)} </span>
                  </div>
                </div>

                <div className="dropdown dropdown-bottom dropdown-end -mr-5">
                  <div tabIndex="0" role="button" className="btn btn-ghost m-1 "><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 border-1 border-[#ebebdd] rounded-xl font-medium w-52 p-2">
                    <li className="bg-blue-50 text-[#00bafe]" onClick={() => {
                      tempValues({
                        id:val._id, userName:val.userName, email:val.email, role:val.role,
                        createdAt:val.createdAt, updatedAt:val.updatedAt
                      })
                      setTimeout(() => {
                        document.getElementById("modal_user_detail").checked = true
                      }, 0)
                    }}><a><FontAwesomeIcon icon={faMagnifyingGlass} /> Detail</a></li>
                    <li className="" onClick={() => {
                      tempValues({
                        id:val._id, userName:val.userName, email:val.email, role:val.role
                      })
                      setTimeout(() => {
                        document.getElementById("modal_u_user").checked = true
                      }, 0)
                    }}><a><FontAwesomeIcon icon={faPenToSquare} /> Update</a></li>
                    <li className="bg-rose-50 text-[#f43098]" onClick={(e) => {
                      tempValues({
                        id:val._id
                      })
                      setTimeout(() => {
                        document.getElementById("modal_d_user").checked = true
                      }, 0)
                    }}><a><FontAwesomeIcon icon={faTrashCan} /> Delete</a></li>
                  </ul>
                </div>
                
              </div>
              
              <div className="flex flex-between items-center text-gray-500 text-xs">
                <span className={
                    val.role == "admin" ? "badge bg-[#bde9ff] text-[#1291cf]" :
                    "badge bg-[#fef8c8] text-[#877800]"
                  }>
                  {val.role}
                </span>
                <p className="text-end">Joined {dateFormat(val.createdAt.split(" ")[0])}</p>
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

  return (
  // --------------------------------------------------- USER
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 lg:mt-15 overflow-hidden">

      <Toaster />

      <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-1">
        <div className="col-span-12 lg:col-span-8 flex flex-col lg:flex-row ">
          <div className="join rounded-lg border-[#ebebdd]">
            {listRole.map((val, i) => (
              <input
                key={i}
                type="radio"
                name="filterRole"
                aria-label={val}
                className="join-item btn checked:bg-[#f8f34c] checked:text-[#394040] border-none shadow-none font-medium"
                checked={filterRole === val}
                onChange={() => setFilterRole(val)}
              />
            ))}
          </div>

          <label className="input rounded-lg flex items-center w-auto ml-0 lg:ml-3 mt-3 lg:mt-0">
            <FontAwesomeIcon className="text-[#394040]" icon={faMagnifyingGlass} /> <input type="search" placeholder="Search by name..." onChange={e => setSearch(e.target.value)} />
          </label>
        </div>

        <div className="col-span-4 col-end-13 mt-5 lg:mt-0">
          <label htmlFor="modal_c_user" className="btn bg-[#394040] text-white font-medium rounded-lg"
          onClick={e=> tempValues()}><FontAwesomeIcon icon={faPlus} /> Create a new user</label>
        </div>
      </div>

{/* --------------------------------------------------- REGISTER USER */}
      <input type="checkbox" id="modal_c_user" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box w-[95vw] md:w-[30vw] max-w-full sm:max-w-lg md:max-w-3xl overflow-x-auto">
          <h3 className="text-lg font-semibold">User Registration Form</h3>
          <hr className="my-5 h-[0.05rem] bg-gray-400 border-0" />
          <div className="col-span-10 col-start-2">
            {user?.role == "admin" && (
              <form className="flex flex-col gap-3 flex-wrap w-full" onSubmit={(e) => {
                handleRegisterUser(e)
                document.getElementById("modal_c_user").checked = false
              }}>
                <label className="label text-sm">Name</label> 
                <input className="input w-full" type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Name" />
                <label className="label text-sm">Email</label> 
                <input className="input w-full" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <label className="label text-sm">Password</label> 
                <input className="input w-full" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
                <label className="label text-sm">Role</label> 
                <select className="select w-full" value={userRole} onChange={e => setUserRole(e.target.value)}>
                  <option value="">-- Select Status --</option>
                  <option value="admin"><span className="badge bg-[#bde9ff] text-[#1291cf] border-none">
                          Admin</span>
                  </option>
                  <option value="member"><span className="badge bg-[#fef8c8] text-[#877800] border-none">
                          Member</span>
                  </option>
                </select>

                <button className="btn rounded-lg w-full md:w-auto mt-5" type="submit">Register</button>
              </form>
            )}  
          </div>

          <div className="modal-action">
            <label htmlFor="modal_c_user" className="btn rounded-lg">Close!</label>
          </div>

        </div>
      </div>

{/* --------------------------------------------------- DETAIL USER */}

      <input type="checkbox" id="modal_user_detail" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-h-[90%] w-[95vw] md:w-[40vw] max-w-full sm:max-w-lg overflow-x-auto">
          <h3 className="text-lg font-semibold">Update User Form</h3>
          <hr className="my-5 h-[0.05rem] bg-gray-400 border-0" />
          
          <div className="flex flex-col gap-3" onSubmit={(e) => {
            document.getElementById("modal_user_detail").checked = false
          }}>
            <div className="overflow-x-auto">
              <table className="table flex flex-col ">
                <tbody className="[&_th]:font-semibold">
                  <tr>
                    <th>Name</th>
                    <td>{userName}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{userEmail}</td>
                  </tr>
                  <tr>
                    <th>Role</th>
                    <td>
                      <span className={
                        userRole == "admin" ? "badge bg-[#bde9ff] text-[#1291cf]" :
                        "badge bg-[#fef8c8] text-[#877800]"
                      }>
                      {userRole}
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
            <label htmlFor="modal_user_detail" className="btn rounded-lg">Close!</label>
          </div>
        </div>
      </div>

{/* --------------------------------------------------- UPDATE USER */}

      <input type="checkbox" id="modal_u_user" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-h-[90%] w-[95vw] md:w-[40vw] max-w-full sm:max-w-lg overflow-x-auto">
          <h3 className="text-lg font-semibold">Update User Form</h3>
          <hr className="my-5 h-[0.05rem] bg-gray-400 border-0" />
          
          <form className="flex flex-col gap-3" onSubmit={(e) => {
            handleUpdateUserById(e, userId, userName, userEmail, userPassword, userRole)
            document.getElementById("modal_u_user").checked = false
          }}>
            <label className="label text-sm">Name</label>
            <input className="input w-full" type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Name" />
            <label className="label text-sm">Email</label>
            <input className="input w-full" type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Email" />
            <label className="label text-sm">Password</label>
            <input className="input w-full" type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} placeholder="password" />
            <label className="label text-sm">Role</label>
            <select className="select w-full" value={userRole} onChange={e => setUserRole(e.target.value)}>
              <option value="">-- Select Status --</option>
              <option value="admin"><span className="badge bg-[#bde9ff] text-[#1291cf] border-none">
                      Admin</span>
              </option>
              <option value="member"><span className="badge bg-[#fef8c8] text-[#877800] border-none">
                      Member</span>
              </option>
            </select>

            <button className="btn rounded-lg mt-5" type="submit">Update</button>
          </form>
          
          <div className="modal-action">
            <label htmlFor="modal_u_user" className="btn rounded-lg">Close!</label>
          </div>
        </div>
      </div>

{/* --------------------------------------------------- DELETE TASK */}
      {/* MODAL DELETE TASK */}
      <input type="checkbox" id="modal_d_user" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-h-[90%] w-[95vw] md:w-[30vw] max-w-full sm:max-w-lg md:max-w-3xl overflow-x-auto">
          <h3 className="text-lg font-semibold">Are you sure to delete?</h3>
          
          <form className="flex flex-col gap-3" onSubmit={(e) => {
            handleDeleteUserById(e, userId)
            document.getElementById("modal_d_user").checked = false
          }}>
            <div className="modal-action w-full md:w-auto mt-5">
              <button className="btn btn-soft btn-error rounded-lg" type="submit"><FontAwesomeIcon icon={faTrashCan} />Delete</button>
              <label htmlFor="modal_d_user" className="btn rounded-lg">Close!</label>
            </div>
          </form>
          
        </div>
      </div>

{/* --------------------------------------------------- LIST USER */}
      <div className="col-span-12 w-full overflow-x-auto">

        { 
          view == "table"
          ? search !== "" 
                  ? filterRole.toLowerCase() == "all" 
                      ? (<RenderTableUser filteredUserAll={userAll.filter(item => item.userName === search)} />)
                      : (<RenderTableUser filteredUserAll={userAll.filter(item => item.role === filterRole.toLowerCase() && item.userName === search)} />)
                  : filterRole.toLowerCase() == "all" 
                      ? (<RenderTableUser filteredUserAll={userAll} />)
                      : (<RenderTableUser filteredUserAll={userAll.filter(item => item.role === filterRole.toLowerCase())} />)
          
          : search !== "" 
                  ? filterRole.toLowerCase() == "all" 
                      ? (<RenderGridUser filteredUserAll={userAll.filter(item => item.userName === search)} />)
                      : (<RenderGridUser filteredUserAll={userAll.filter(item => item.role === filterRole.toLowerCase() && item.userName === search)} />)
                  : filterRole.toLowerCase() == "all" 
                      ? (<RenderGridUser filteredUserAll={userAll} />)
                      : (<RenderGridUser filteredUserAll={userAll.filter(item => item.role === filterRole.toLowerCase())} />)
          
        }

      </div>


    </div>
  )
}
