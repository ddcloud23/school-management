import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title,onAddUser }) => {
  const [file, setFile] = useState("");
  const navigate =useNavigate()

  const initialState= inputs.reduce((acc,input)=>{
    acc[input.name]="";
    return acc
  },{})
  const [newUser,setNewUser]=useState(initialState)

const handleInputChange=(e)=>{

  const {name,value}= e.target;

  setNewUser(prev=>({...prev,[name]:value}))


}

const handleFileChange=(e)=>{

  const file=e.target.files[0];
  if(file){
    const reader= new FileReader();
    reader.onloadend=()=>{
      setFile(reader.result)   
    }
    reader.readAsDataURL(file);

  }

}

const handleSubmit=(e)=>{
  e.preventDefault();
  const usetToAdd={
    ...newUser,status:"pending",img:file
  }

  onAddUser(usetToAdd);

  navigate("/users")

}
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? file
                  // ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} value={newUser[input.name]} onChange={handleInputChange} name={input.name} placeholder={input.placeholder} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
