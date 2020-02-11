import React, { useEffect, useState } from "react";
import instance from "../../../../instance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  TablePagination
} from "@material-ui/core";

const User = ({ socket, handleClick }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const useStyles = makeStyles({
    root: {
      width: "100%"
    },
    table: {
      height: 663,
      maxHeight: 663,
      overflow: "auto"
    }
  });
  const classes = useStyles();
  const columns = [
    {
      label: "User Id",
      minWidth: 50,
      width: 30,
      align: "center",
      maxWidth: "none"
    },
    {
      label: "Full Name",
      minWidth: 100,
      width: 110,
      align: "center",
      maxWidth: "none"
    },
    {
      label: "Email",
      minWidth: 100,
      width: 110,
      align: "center",
      maxWidth: "none"
    },
    {
      label: "Password",
      minWidth: 100,
      width: 110,
      align: "center",
      maxWidth: 150
    },
    {
      label: "Birthday",
      minWidth: 100,
      width: 110,
      align: "center",
      maxWidth: "none"
    },
    {
      label: "Phone Number",
      minWidth: 100,
      width: 110,
      align: "center",
      maxWidth: "none"
    },
    { label: "", minWidth: 10, width: 20, align: "right", maxWidth: "none" }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  socket.on("LOAD_USERS", function(data) {
    fetchData();
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { user }
      } = await instance.get("/api/user/auth/get");
      setUsers(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async target => {
    const id = target.user_id;
    const response = await instance
      .post("/api/user/auth/delete", { id })
      .catch(err => console.log(err));
    if (response.status === 200) {
      handleClick("Deleted");
    }
    setUsers(users.filter(c => c.users_id !== target.users_id));
    RenderUser();
  };

  function RenderUser() {
    return (
      <Paper className={classes.root}>
        <div className={classes.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      maxWidth: column.maxWidth
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(data => (
                  <TableRow key={data.user_id}>
                    <TableCell className="middle" component="th" scope="row">
                      {data.user_id}
                    </TableCell>
                    <TableCell className="middle">{data.full_name}</TableCell>
                    <TableCell className="middle">{data.email}</TableCell>
                    <TableCell className="middle">{data.password}</TableCell>
                    <TableCell className="middle">{data.birthday}</TableCell>
                    <TableCell className="middle">
                      {data.phone_number}
                    </TableCell>
                    <TableCell>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDelete(data)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[
            8,
            16,
            24,
            { label: "All", value: users.length }
          ]}
          component="div"
          colSpan={3}
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

  return <RenderUser></RenderUser>;
};

export default User;

// useInterval(() => {
//   fetchData();
// }, 5000);

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }
