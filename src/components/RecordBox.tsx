import React, { useState, useEffect, useRef, useCallback, RefObject, SetStateAction, Dispatch } from 'react'
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import Sprite from 'assets/img/sprite.svg';
import { colors } from 'utils/colors';
import Button from './utils/Button';
import { SetState } from 'immer/dist/internal';

const Timer = styled.div`
  height: 140px;
  width: 140px;
  border-radius: 100%;
  background-color: ${colors.pink};
  margin-top: 30px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  color: #444;
  letter-spacing: .5px;
`

const MicIcon = styled.svg`
  width: 150px;
  padding-left: 10px;
  fill: ${colors.pink}
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

interface RecordBoxProps {
  audioRef: RefObject<HTMLAudioElement>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  setShowAudio: Dispatch<SetStateAction<boolean>>;
}

function RecordBox({ audioRef, setShowForm, setFile, setShowAudio }: RecordBoxProps) {
  const [time, setTime] = useState(90);
  const [mediaRecorder, setMediaRecorder]: [MediaRecorder | undefined, Function] = useState();
  const [permission, setPermission] = useState(false);
  const [changePermission, setChangePermission] = useState(false);
  const [permissionErrorType, setPermissionErrorType] = useState(null);
  const [status, setStatus] = useState('ready');
  const [permissionError, setPermissionError] = useState(false);

  let intervalRef = useRef(0);

  const formatTime = useCallback((time: number) => {
    return `0${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
  }, [])

  const setTimerInterval = useCallback((mediaRecorder: MediaRecorder) => {
    return window.setInterval(() => {
      setTime(time => {
        if (time === 90) {
          clearInterval(intervalRef.current);
          mediaRecorder.stop();
          setTime(0);
          return time;
        }
        return time + 1
      });
    }, 1000)
  }, [])

  useEffect(() => {
    (async function createMediaRecorder() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })
        setPermission(true);
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);

        let audioChunks: any = [];

        mediaRecorder.addEventListener('start', () => {
          setTime(0);
          intervalRef.current = setTimerInterval(mediaRecorder);
          setFile(null);
        })

        mediaRecorder.addEventListener('pause', () => {
          clearInterval(intervalRef.current);
        })

        mediaRecorder.addEventListener('resume', () => {
          intervalRef.current = setTimerInterval(mediaRecorder);
        })

        mediaRecorder.addEventListener('dataavailable', (e) => {
          audioChunks.push(e.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob: Blob = new Blob(audioChunks);
          var file = new File([audioBlob], `${new Date().getTime()}.mp3`, { type: 'audio/aac; codecs=0', lastModified: new Date().getTime() })

          const audioURL = URL.createObjectURL(audioBlob);
          if (audioRef && audioRef.current) {
            audioRef.current.src = audioURL;
          }
          audioChunks = [];
          setFile(file);
          setShowAudio(true);
          setStatus('recorded');
          clearInterval(intervalRef.current);
        });

      } catch (err: any) {
        setPermissionError(true);
        setPermissionErrorType(err.message);
      }
    })();
  }, [setMediaRecorder, setPermission, setTime, setPermissionErrorType, changePermission, setShowForm]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    }
  }, [])

  return (
    <Box>
      {
        permission ?
          <>
            <MicIcon className="pr-2">
              <use xlinkHref={`${Sprite}#icon-mic`} />
            </MicIcon>
            <Timer>{formatTime(time)}</Timer>
            <Buttons>
              {
                status === 'ready' &&
                <Button onClick={() => {
                  if (mediaRecorder) {
                    setStatus('recording');
                    mediaRecorder.start();
                  }
                }}>Record</Button>
              }
              {
                status === 'recording' &&
                <>
                  <Button onClick={() => {
                    if (mediaRecorder) {
                      mediaRecorder.pause();
                      setStatus('paused')
                    }
                  }
                  }
                    className="mr-2"
                  >Pause</Button>
                  <Button onClick={() => {
                    if (mediaRecorder) {
                      mediaRecorder.stop();
                      setShowAudio(true);
                    }
                  }}>Stop</Button>
                </>
              }
              {
                status === 'paused' &&
                <Button onClick={() => {
                  if (mediaRecorder) {
                    setStatus('recording');
                    mediaRecorder.resume();
                  }
                }}>Resume</Button>
              }
              {
                status === 'recorded' &&
                <>
                  <Button className="mr-2" onClick={() => {
                    if (mediaRecorder) {
                      setStatus('recording');
                      mediaRecorder.start();
                    }
                  }}>Record Again</Button>
                  <Button onClick={() => {
                    if (mediaRecorder) {
                      setShowForm(true);
                    }
                  }}>Done</Button>
                </>
              }
            </Buttons>
          </>
          :
          <>
            {
              !permissionError && !permissionErrorType ?
                <Spinner size="sm" className="me-2" animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner> : null
            }
            {
              permissionError &&
              <>
                <h6 className="text-center">Microphone Access Permission Not Granted Or Blocked</h6>
                <p className="text-secondary mt-1 text-center" style={{ fontSize: '12px' }}>Check your browser microphone settings for this website</p>
                <p className="text-secondary mt-1 text-center" style={{ fontSize: '12px' }}>Refresh the page if already allowed the access to microphone</p>
              </>
            }
            {
              permissionErrorType === 'Permission dismissed'
                ?
                <Button className="mt-3" onClick={() => {
                  setChangePermission(!changePermission);
                }}>Give Permission</Button>
                : null
            }
          </>
      }
    </Box>
  )
}

export default RecordBox