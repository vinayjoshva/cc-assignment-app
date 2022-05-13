import React, { useContext } from "react";
import { AppContext } from "../App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, TextField, Paper, Typography, Grow} from "@mui/material";
import './Results.css';
import questions from "../questions.json";

const Results = () => {
  const [appData] = useContext(AppContext);
  const inputOne=appData.answers["1"].value;
  const inputTwo=appData.answers["2"].value[0]+appData.answers["2"].value[0];
  const inputThree=appData.answers["3"].value;
  const inputFour=appData.answers["4"].value;
  const inputFive=appData.answers["5"].value;

  const firstAnswer = questions[0].answerOptions[0].option;
  const secondAnswer = questions[1].answerOptions[0].option + questions[1].answerOptions[1].option;
  const thirdAnswer = questions[2].answerOptions[0].option;
  const forthAnswer = questions[3].answerOptions[2].option;
  const fifthAnswer = questions[4].answerOptions[0].option;
  
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <div className="container">
        <h1>RESULTS</h1>
        <h4>Correct Answers</h4>
        {Object.entries(appData.answers).map(([currentIndex, answer]: any) => (
        <p key={currentIndex}>{answer.value}</p>
        ))}
      </div>
    </Box>
  );
};

export default Results;
