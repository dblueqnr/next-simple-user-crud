import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
}));

export default function Users({ users }) {
  const [userData, setUserData] = useState(null);
  const [userList, setUserList] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    setUserList(users);
  }, []);
  const load = async () => {
    let users = await loadUsers();
    setUserList(users);
  };
  const removeUser = async (userId) => {
    await deleteUserById(userId);
    setUserData(null);
    load();
  };
  const editUser = async (userId) => {
    let user = await loadUsersById(userId);
    setUserData(user);
  };
  const handlerSaved = async () => {
    await load();
    setUserData(null);
  };

  return (
    <>
      <User data={userData} handlerSaved={handlerSaved} />
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
Users.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return [];
  }

  return { users: await loadUsers() };
};
