import { useEffect, useState } from "react";
import QuestionCard, { QuestionType } from "../components/QuestionCard";
import questions from "../questions.json";
import { Box, Button, Typography, CircularProgress, Pagination} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { style } from "@mui/system";

const TOTAL_QUESTIONS = questions.length;


const useStyles = makeStyles((props) => ({
  "unanswered": {
    "& .MuiPaginationItem-root": {
      backgroundColor: "grey",
      color: "black"
    }
  },
  "answered": {
    "& .MuiPaginationItem-root": {
      backgroundColor: "greenyellow",
      color: "black"
    }
  },
  "current": {
    "& .MuiPaginationItem-root": {
      backgroundColor: "#e6c300",
      color: "black"
    }
  }
}));

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); 
  }, []);

  function handleNextButtonClick(index: number) {
    if (index === TOTAL_QUESTIONS - 1) {
      navigate("/results");
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  function handleQuestionNumber(index: number) {
    if(index) {
      setCurrentQuestion(index);
    }
  }

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        questions.map(
          (question, index) =>
            currentQuestion === question.id && (
              <Box key={question.id}>
                <Typography variant="h3">Question: {index + 1}</Typography>
                <Box
                  height="500px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <QuestionCard
                    id={question.id}
                    question={question.question}
                    questionType={question.questionType as QuestionType}
                    answers={question.answerOptions}
                    Pagination = {<Pagination count={TOTAL_QUESTIONS} classes={{ ul: classes["unanswered"] }} page={question.id} onChange={(event, index) => handleQuestionNumber(index)} />}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      disabled={index === 0}
                      onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    >
                      Previous
                    </Button>

                    <Button onClick={() => handleNextButtonClick(index)}>
                      {index === TOTAL_QUESTIONS - 1 ? "Submit" : "Next"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
        )
      )}
    </Box>
  );
};

export default Questions;
