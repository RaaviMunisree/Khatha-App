import { Navigate } from "react-router-dom";
const ProtectedRoute=({children})=>{
    const user=localStorage.getItem("userId");
    return user?children:<Navigate to="/" replace />
}
export default ProtectedRoute;