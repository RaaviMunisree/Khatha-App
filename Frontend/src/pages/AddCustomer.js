import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import '../styles/AddCustomer.css';
const AddCustomer=()=>{
  const navigate=useNavigate();
  const [name,setName]=useState('');
  const [mobile,setMobile]=useState('');
  const [password,setPassword]=useState('');
  const shopName=JSON.parse(localStorage.getItem("userShopName"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(name);
      console.log(password);
      console.log(mobile);
      
      console.log(shopName);
      const res = await api.post('/customers/addCustomer', {"name":name,"mobile":mobile,"password":password,"role":"customer","shopName":shopName});
      console.log(res.data);
      alert("User added successfully");
    } catch (error) {
      console.error(error.response);
      alert("User already exist with same credentials");
    }
  };
    
    return(
       <>
      <form onSubmit={handleSubmit}>
      <h2>Add Customer</h2>
      <input type="text" name="name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} required/>
      <input type="tel" name="mobile" placeholder="Mobile" onChange={(e)=>{setMobile(e.target.value)}} required/>
      <input type="password" name="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required/>
      <button type="submit">Register</button>
      </form>
      <button onClick={(e)=>{navigate('/owner')}}>Home</button>
       </>
    );
}
export default AddCustomer;