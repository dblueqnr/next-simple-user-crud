import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { createUser, updateUserById } from "../services/apiRequest";

function user({ data, handlerSaved }) {
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
      <form noValidate autoComplete="off">
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
        <Button variant="contained" color="primary" onClick={save}>
          Salvar
        </Button>
      </form>
    </>
  );
}

export default user;
