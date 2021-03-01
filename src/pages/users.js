import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import User from "../components/user";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { loadUsers, loadUsersById, deleteUserById } from "../services/apiRequest";
import { useState, useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  editIcon: {
    color: "green",
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
  removeIcon: {
    color: "red",
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
  tableContainer: {
    width: "80%",
    display: "flex",
    padding: "5px",
    borderRadius: "5px",
    backgroundColor: "#cdcccc",
    flexDirection: "column",
    rowGap: "10px",
    boxShadow: "#ece5e5 2px 4px 1px 0px",
  },
  viewContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}));

export default function Users({ users }) {
  const [userData, setUserData] = useState(null);
  const [notification, setNotification] = useState(false);
  const [userList, setUserList] = useState(null);
  const classes = useStyles();
  useEffect(async () => {
    const loadData = async () => {
      console.log(users?.lenght);
      if (!users) {
        let userDataBase = await loadUsers();
        setUserList(userDataBase);
      } else {
        setUserList(users);
      }
    };

    loadData();
  }, []);
  const load = async () => {
    let users = await loadUsers();
    setUserList(users);
  };
  const removeUser = async (userId) => {
    await deleteUserById(userId);
    setUserData(null);
    load();
    setNotification(true);
  };
  const editUser = async (userId) => {
    let user = await loadUsersById(userId);
    setUserData(user);
  };
  const handlerSaved = async () => {
    await load();
    setUserData(null);
    setNotification(true);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={notification}
        autoHideDuration={1000}
        onClose={setNotification}
        message="Operação realizada com sucesso"
      />
      <User data={userData} handlerSaved={handlerSaved} />
      <div className={classes.viewContainer}>
        <div className={classes.tableContainer}>
          <span>Usuários Cadastrados</span>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">E-Mail</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="right">
                      <EditIcon className={classes.editIcon} onClick={() => editUser(user.id)} />
                      <RemoveIcon className={classes.removeIcon} onClick={() => removeUser(user.id)} />
                    </TableCell>
                  </TableRow>
                ))}
                {userList == null ||
                  (userList.length == 0 && (
                    <TableCell align="center" scope="row" colSpan="4">
                      Nenhum registro encontrado
                    </TableCell>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
Users.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return [];
  }

  return { users: await loadUsers() };
};
