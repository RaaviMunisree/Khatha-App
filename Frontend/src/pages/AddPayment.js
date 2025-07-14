import { useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/AddPayment.css';
const AddPayment=()=>{
    const {customerId}=useParams()||{};
    const navigate=useNavigate();
    const _id=customerId;
    const [date,setDate]=useState("");
    const [cost,setCost]=useState("");
    const handleSubmit=async (e)=>{
       e.preventDefault();
       try{
          const res=await api.post('payments/addPayment',{'_id':_id,'date':date,'cost':cost});
          console.log(res);
          alert("Payment added successfully");
       }catch(err){
          alert("Error in adding payment");
       }
    }
    return(
        <>
          <form onSubmit={handleSubmit}>
            <input type="date" value={date} placeholder="date" onChange={(e)=>setDate(e.target.value)}/>
            <input type="number" value={cost} placeholder="cost" onChange={(e)=>setCost(e.target.value)}/>
            <button type="submit">Submit</button>
          </form>
          <button onClick={(e)=>navigate('/owner')}>Dashboard</button>
        </>
    );
}
export default AddPayment;