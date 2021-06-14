import React, { useState } from "react";
import QuizTable from "./QuizTable";
import { getQuizData } from "./hooks/useApplicationData";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./Component_Style/NavBar";
import Container from "@material-ui/core/Container";
import Score from "./Score";
import Playlist from "./Playlist";
import Create from "./Create";
import Notes from "./Notes";
// import { mainListItems, secondaryListItems } from "./UserAccountMenuBarList";  //TODO

//Note: QuizTable + Score + Playlist --> UserAccount --> NavBar --> App.js

export default function UserAccount() {
  const { questions, answers, score, setScore } = getQuizData(); ///
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [notes, setNotes] = useState([]);

  const notesSubmit = (input) => setNotes([...notes, input]);

  const onDestroy = (index) => {
    setNotes([...notes.filter((element, i) => {
      if (i !== index ) {
        return element
      }
    })]);
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* QuizTable */}
        <Grid item xs={12} md={8} lg={9}>
          {/* <Paper className={fixedHeightPaper}> */}
          {questions && answers && (
            <QuizTable questions={questions} answers={answers} score={score} setScore={setScore}/>
          )}
          {/* </Paper> */}
        </Grid>
        {/* Score */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Score score={score} questions={questions} />
          </Paper>
        </Grid>
        {/* Playlist */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Playlist />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Notes notes={notes} onDestroy={onDestroy}/>
            <Create setNotes={notesSubmit}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
