import React, { useState } from "react";
import { InputAdornment } from '@mui/material';

import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material/";

import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import ClosedCaptionDisabledIcon from "@mui/icons-material/ClosedCaptionDisabled";
import sentIcon from "./assets/images/sent.png"

import useSpeechToText, { ResultType } from "./Hooks";

import doctorAvatar from "./assets/images/doctorAvatar.png";
import patientAvatar from "./assets/images/patientImage.png";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import VideoCall from './components/VideoCall/VideoCall'
import Recommendations from "./components/Recommendations/Recommendations";
import Switches from './assets/images/Component 2.png'

export default function App() {
  let {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleApiKey: process.env.REACT_APP_API_KEY,
    speechRecognitionProperties: { interimResults: true },
    useLegacyResults: false,
  });

  const [chatMessage, setChatMessage] = useState();
  const [messagesArray, setMessagesArray] = useState([]);

  const handleInput = (e) => {
    setChatMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessagesArray((messagesArray) => [...messagesArray, chatMessage]);
  };

  if (error) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "100px auto",
          textAlign: "center",
        }}>
        <p>
          {error}
          <span style={{ fontSize: "3rem" }}>🤷‍</span>
        </p>
      </div>
    );
  }

  return (
      <main className="main">
        <section className="video-container">
          <VideoCall />
          <img className='switches' src={Switches} alt='call switches'/>
          <Recommendations />
        </section>
        <section className="chat__container">
          <Paper className="paper">
            <div className="chat__header">
              <Typography variant="h5">
                Transcription and In-Call Messages
              </Typography>
              <section className="button__container">
                <IconButton
                  onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                  {isRecording ? (
                    <ClosedCaptionIcon />
                  ) : (
                    <ClosedCaptionDisabledIcon />
                  )}
                </IconButton>
                <Typography className="transcription__text">
                  {isRecording ? (
                    'Transcription in progress'
                  ) : (
                    'Transcription off'
                  )}
                </Typography>
              </section>
            </div>
            <CardContent className="message__container">
              {(results as ResultType[]).map((result) => (
                <Card className="message">
                  <Avatar
                    src={doctorAvatar}
                    alt="Dr Lim avatar"
                    sx={{ width: 24, height: 24 }}
                  />
                  <div className="message__wrapper">
                    <div className="message__source">
                      <Typography sx={{ fontWeight: "large" }}>
                        Dr. Lem
                      </Typography>
                      <Typography>
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </Typography>
                    </div>
                    <Typography key={result.timestamp}>
                      {result.transcript}
                    </Typography>
                  </div>
                </Card>
              ))}
              {interimResult && (
                <Card className="message">
                  <Typography>Dr. Lem is speaking...</Typography>
                </Card>
              )}
              {messagesArray.map((message)=>(<Card className="message">
                <div className="message__wrapper message__wrapper--response">
                  <div className="message__text">
                    <Typography sx={{ fontWeight: "large" }}>
                      Valentina
                    </Typography>
                    <Typography>{message}</Typography>
                  </div>
                  <Avatar
                  src={patientAvatar}
                  alt="Patient Image"
                  sx={{ width: 24, height: 24 }}
                />
                </div>
              </Card>))}
            </CardContent>
            <form className="submit" onSubmit={handleSubmit}>
              <TextField
                className="chat__input"
                onChange={handleInput}
                placeholder="Send a message to everyone"
                ></TextField>
              <IconButton className="submit__button" onClick={handleSubmit}>
                <img src={sentIcon}/>
              </IconButton>
            </form>
          </Paper>
          <section className="download-panel">
            <div className="download-text">Download Recommendations</div>
            <div className="download-text">Download Transcriptions</div>
          </section>
        </section>
      </main>
  );
}
