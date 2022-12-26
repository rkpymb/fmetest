
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
const Backdropitem = (props) => {
    
  return (
      <>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
              open={props.BackDropData}

              >
              <CircularProgress color="inherit" />
              <span>Please wait..</span>
          </Backdrop>
      </>
  )
}

export default Backdropitem