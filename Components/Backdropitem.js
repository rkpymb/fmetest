
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Lottie from 'react-lottie';
import styles from '../styles/Home.module.css'
import * as animationData from '../Data/Lottie/9582-liquid-4-dot-loader.json'
const Backdropitem = (props) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

  return (
      <>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
              open={props.BackDropData}

          >
              
              <div className={styles.LoaderBoxNew}>
                  <Lottie options={defaultOptions}
                      height={200}
                      width={200}
                      isStopped={false}
                      isPaused={false} />
                  
              </div>
              
              
          </Backdrop>
      </>
  )
}

export default Backdropitem