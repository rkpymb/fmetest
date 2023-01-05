import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function BookingDetails({ Data }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
 
    return (
        <div>
            <Button variant="contained" size="small" onClick={handleClickOpen('paper')}>View Details</Button>
           
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Booking ID <b>#{Data.BookingID}</b></DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <TableContainer component={Paper}>
                        <Table  aria-label="caption table">
                           
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                       Booking Title
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.Title}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                       Booking Status
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.StatusText}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Booking For Name
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.BookingForName}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Booking For Date
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.BookingDateTime}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Booking Address
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.BookingAddress}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Booking by
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.BookingByName}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                     Created Date
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.date}, {Data.time}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Created Time
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.date}, {Data.time}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Payment Status
                                    </TableCell>
                                    <TableCell align="right">
                                        {Data.PaymentStatus}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Price
                                    </TableCell>
                                    <TableCell align="right">
                                       ₹ {Data.MainPrice}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Discount
                                    </TableCell>
                                    <TableCell align="right">
                                        -₹ {Data.Discount}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Total
                                    </TableCell>
                                    <TableCell align="right">
                                        ₹ {Data.SalePrice}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>  
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" onClick={handleClose}>close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
