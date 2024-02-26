
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react'
const DynamicMap = dynamic(() => import("../../Components/Map/mapfatching"), {
    ssr: false,})

 const pharmacypage = () => {
  return (
    <Box  sx={{ marginTop: "30px" }}>
                <DynamicMap />
            </Box>
  )
}

export default pharmacypage

  

// import { Box } from '@mui/material'
// import dynamic from 'next/dynamic';
// import React from 'react'
// const DymanicMap = dynamic(() => import("../../Components/Map/FindPharmacy"), {
//     ssr: false,
// });
// const index = () => {
//     return (
//         <>
//             <Box className="prescriptioncard" style={{ marginTop: "30px" }}>
//                 <DymanicMap />
//             </Box>
//         </>
//     )
// }

// export default index
