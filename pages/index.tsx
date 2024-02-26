import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
// import { useThemeContext } from "@/muitheme/ThemeContextProvider";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PrecriptionInputs } from "../datainterface";
import { useRouter } from "next/router";
import Axiosinstance from "@/api/Axiosinstance/axiosinstance";
import { Validationfatch, fatch, pharmacyId } from "@/api/Functions/functions";
// import Axiosinstance from "@/api/axiosinstance/Axiosinstance";
// import { fetchid } from "@/api/functions/Fetchprescriptionid";
// import { toast } from "react-toastify";
// import { Idvalidate } from "@/api/functions/VallidateId";
// import { FadeLoader, PulseLoader } from "react-spinners";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  const [pidloading, setPidloading] = useState(false)
  const [dobloading, setDobloading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<PrecriptionInputs>();
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(true);
  const [showDobForm, setShowDobForm] = useState(false);
  const [presid, setpresid] = useState("");

  const onSubmitPrescriptionId = async (data:any) => {
    setPidloading(true)
    try {
      // console.log("prescription id:-", data);
      const response = await fatch(data.prescriptionId)
      console.log(response, "test response");
      if (response?.status === "success") {
        setpresid(data.prescriptionId);
        setShowPrescriptionForm(false);
        setShowDobForm(true);
        console.log("Varified");
        
        
      } else {
        console.log("Not Valid");
        
        
      }
    } catch (error) {
      console.log("Prescription ID is invalid",error);

      
    } finally {
      setPidloading(false)
    }
  };


  const onSubmitDob = async (data: any) => {
    const formatToDayMonthYear = (date: any) => {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    };
    data.dateOfBirth = formatToDayMonthYear(data.dateOfBirth);
    console.log("Prescription Id and dob:-", data);
    setDobloading(true)
    try {
      const response = await Validationfatch(data)
      console.log("validate Dob:-", response?.data);
      if (response?.data) {
        console.log(`DoB For Prescription Id: - ${data.prescriptionId} Verified`);
        
        router.push(`/pharmacypage/${data.prescriptionId}`)
      }else{
        console.log("Date of birth is incorrect");
        
        
      }
    } catch (error) {
      console.log("Error Found for Dob:-", error);
      
    } finally {
      setDobloading(false)
    }
  };
  return (
    <>
        <Paper sx={{height:"300px", width:"35%", textAlign:"center", margin:"auto"}}>
      {
        showPrescriptionForm && (
          <form onSubmit={handleSubmit(onSubmitPrescriptionId)}>
            <Box  sx={{ marginTop: "100px" }}>
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-prescription-1901763-1607962.png" alt="" style={{width:"100px",height:"100px", marginTop:"10px"}}/>
              {/* <Image
                src=""
                width={100}
                height={100}
                alt="Picture of the author"
                style={{ marginTop: "10px" }}
              /> */}
              <Typography variant="h5" gutterBottom className="phead">
                Enter Precription Id
              </Typography>
              <Box>
                <TextField
                  placeholder="Enter prescription Id"
                  style={{ width: "90%", borderRadius: "20px" }}
                  {...register("prescriptionId")}
                />
                {
                  pidloading ? (
                    <><Button sx={{marginTop:"20px"}}type="submit" variant="contained" size="small" disabled>
                      Loading... 
                    </Button></>
                  ) : (
                    <><Button sx={{marginTop:"20px"}} type="submit" variant="contained" size="small" >
                      Submit
                    </Button></>
                  )
                }
              </Box>
            </Box>
          </form>
        )
      }
      {
        showDobForm && (
          <form onSubmit={handleSubmit(onSubmitDob)}>
            <Box sx={{ marginTop: "100px" }}>
              <img src="https://www.clipartmax.com/png/middle/179-1795475_patient-free-icon-patient-icon-png.png" alt="" style={{width:"100px",height:"100px",marginTop:"10px"}}/>
              {/* <Image
                src=""
                width={100}
                height={100}
                alt="Picture of the author"
                style={{ marginTop: "10px" }}
              /> */}
              <Typography variant="h5">
                Hi, Test Patient 👋
              </Typography>
              <Typography variant="body2">
                Please confirm your date of birth to continue
              </Typography>
              <Box>
                <TextField
                  type="date"
                  placeholder="Enter prescription"
                  style={{ width: "90%", borderRadius: "20px" }}
                  {...register("dateOfBirth", { required: true })}
                />
                {
                  dobloading ? (
                    <><Button sx={{marginTop:"20px"}} type="submit" variant="contained" size="large" disabled>
                      Loading... 
                    </Button></>
                  ) : (
                    <><Button sx={{marginTop:"20px"}} type="submit" variant="contained" size="large">
                      Enter DoB
                    </Button></>
                  )
                }
              </Box>
            </Box>
          </form>
        )
      }
      </Paper>
    </>
  );
}





