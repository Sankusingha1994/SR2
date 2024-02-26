import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

const DialogComponent = ({branch_logo, name, email, address, propOpen, propsHandleDialop}) => {
    const [open, setOpen] = useState<boolean>(propOpen)
    const handleDialog = () => {
        setOpen(!open)
    }
    
  return (
    <Box>
        <Dialog open={open} onClose={propsHandleDialop}>
            <DialogTitle>Branch Details</DialogTitle>
            <DialogContent>
                <div>
                    <img src={branch_logo} alt="" style={{width:"30px", height:"30px"}} />
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>{address}</p>
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={propsHandleDialop}>Close</Button>
            </DialogActions>
        </Dialog>
    </Box>
  )
}

export default DialogComponent
