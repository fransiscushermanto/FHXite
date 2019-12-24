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
  TableFooter,
  TablePagination
} from "@material-ui/core";

const Subscribe = ({ socket, handleClick }) => {
  const [subs, setSubs] = useState([]);
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
    { id: "subid", label: "Sub Id", minWidth: 50, width: 30, align: "center" },
    { id: "email", label: "Email", minWidth: 100, width: 110, align: "center" },
    { id: "action", label: "", minWidth: 10, width: 20, align: "right" }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    socket.on("LOAD_SUBS", function(data) {
      fetchData();
    });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { sub: user }
      } = await instance.get("users/get");
      setSubs(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async target => {
    const id = target.subs_id;
    const response = await instance
      .post("users/delete", { id })
      .catch(err => console.log(err));
    console.log(response);
    if (response.status === 200) {
      handleClick("Deleted");
    }
    setSubs(subs.filter(c => c.subs_id !== target.subs_id));
    RenderUser();
  };

  function RenderUser() {
    return (
      <Paper className={classes.root}>
        <div className={classes.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, width: column.width }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {subs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(data => (
                  <TableRow key={data.subs_id}>
                    <TableCell className="middle" component="th" scope="row">
                      {data.subs_id}
                    </TableCell>
                    <TableCell className="middle">{data.email}</TableCell>
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
          rowsPerPageOptions={[8, 16, 24, { label: "All", value: subs.length }]}
          component="div"
          colSpan={3}
          count={subs.length}
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

export default Subscribe;

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
