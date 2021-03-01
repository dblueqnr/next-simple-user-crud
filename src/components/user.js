import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { createUser, updateUserById } from "../services/apiRequest";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  formContainer: {
    display: "flex",
    width: "250px",
    border: "1px solid black",
    borderRadius: "5px",
    flexDirection: "column",
    margin: "50px 0px",
    padding: "10px 0px",
    alignItems: "center",
    rowGap: "10px",
  },
}));

function user({ data, handlerSaved }) {
  const classes = useStyles();
  const [userData, setUserData] = useState({ name: "", email: "" });
  useEffect(() => {
    if (!data) {
      data = { name: "", email: "" };
    }
    setUserData(data);
  }, [data]);
  const save = async () => {
    if (!userData.id) {
      await createUser(userData);
    } else {
      await updateUserById(userData.id, userData);
    }
    if (handlerSaved) handlerSaved(userData);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <label>Cadastrar Usuário</label>
          <TextField
            id="name"
            label="Nome"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <TextField
            id="email"
            label="E-Mail"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={save} style={{ width: "50px" }}>
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
}

export default user;
