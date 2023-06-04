import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/VideoPlayer.module.css'
function VideoPlayer({ src, BackDropOpen, BackDropClose }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsPlaying(true);
                    } else {
                        setIsPlaying(false);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(video);

        return () => {
            observer.unobserve(video);
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <div>
            <video ref={videoRef}
                src={src}
                autoPlay
                type={'video/mp4'}
                loop className={styles.FeedBoxItem}
                height="700px"
                onLoadStart={() => {
                    console.log('...I am loading...' + src)
                    BackDropOpen()
                   
                }}
                onLoadEnd={() => {
                    console.log('Data is loaded!' + src)
                    BackDropClose()
                }}
            />
        </div>
       
    );
}

export default VideoPlayer;
