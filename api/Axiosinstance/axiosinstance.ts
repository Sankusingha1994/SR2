import axios from "axios";
import { BaseURL } from "../Endpoints/endpoints";



const Axiosinstance = axios.create({
    baseURL: BaseURL
})


export default Axiosinstance