import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setCompanies } from "../redux/companySlice";
import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";


const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async() => {
             try{
const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials: true});
console.log(res);
if(res.data.success){
    dispatch(setCompanies(res.data.companies));
}
        } catch(error){
            console.log(error);
        }
        }
       fetchCompanies();
    }, [])
}

export default useGetAllCompanies;