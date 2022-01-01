import * as React from 'react';
import Dialog from '@mui/material/Dialog';



function Showdialogueimage({open, setOpen}) {
    return (
        <Dialog maxWidth={'lg'} open={open.status} onClose={()=> setOpen({status: false, image: null})}>
            <img src={open.image} alt="" />
        </Dialog>
    );
}

export default Showdialogueimage;
