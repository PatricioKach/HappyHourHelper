import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
  DashboardInfoContainer,
  DataOutput,
  FilterInput,
  HeaderContainer,
  SearchBarContainer,
  SearchBarInput,
  SearchButton,
} from "./UserDashboard.styles";
import { getUsers } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
//  ---IMPORTANTE---
//  Despues reemplazar el estado "UserInfo" por los usuarios traidos desde el back en el UseEffect.
//  Eliminar la variable "users"
//  Si despues es necesario modificar algun estilo, se encuentran todos en el archivo "./AdminDashboard.styles.js"

function UsersDashboard() {
  const dispatch = useDispatch();

  const [UserInfo, setUserInfo] = useState([]);
  const [searchValues, setSearchValues] = useState({
    value: "",
    filter: "first_name",
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const allUsers = useSelector((state) => state.user.users);

  useEffect(() => {
    setUserInfo(allUsers);
  }, [allUsers]);

  const HandleFilter = (searchname) => {
    setSearchValues({ ...searchValues, value: searchname });
  };

  const SearchData = (value) => {
    if (value) {
      if (searchValues.filter === "first_name") {
        let filteredData = UserInfo.filter((user) =>
          user.name.toUpperCase().includes(searchValues.value.toUpperCase())
        );
        setIsActive(true);
        return setUserInfo(filteredData);
      }
      if (searchValues.filter === "last_name") {
        let filteredData = UserInfo.filter((user) =>
          user.lastname.toUpperCase().includes(searchValues.value.toUpperCase())
        );
        setIsActive(true);
        return setUserInfo(filteredData);
      }
      if (searchValues.filter === "email") {
        let filteredData = UserInfo.filter((user) =>
          user.mail.toUpperCase().includes(searchValues.value.toUpperCase())
        );
        setIsActive(true);
        return setUserInfo(filteredData);
      }
      if (searchValues.filter === "id") {
        let filteredData = UserInfo.filter((user) =>
          user.id.toUpperCase().includes(searchValues.value.toUpperCase())
        );
        setIsActive(true);
        return setUserInfo(filteredData);
      }
    }
  };

  const ClearData = () => {
    setUserInfo(allUsers);
    setSearchValues({ ...searchValues, value: "" });
    setIsActive(false);
  };

  const HandleSelect = (e) => {
    setSearchValues({ ...searchValues, filter: e.currentTarget.value });
  };

  return (
    <DashboardInfoContainer>
      <HeaderContainer>
        <label>Filtrar por:</label>
        <FilterInput defaultValue={searchValues.filter} onChange={HandleSelect}>
          <option value="first_name">Nombre</option>
          <option value="last_name">Apellido</option>
          <option value="email">E-mail</option>
          <option value="id">ID</option>
        </FilterInput>
        <SearchBarContainer>
          <SearchBarInput
            value={searchValues.value}
            onChange={(e) => HandleFilter(e.currentTarget.value)}
          />
          <SearchButton
            onClick={() =>
              isActive ? ClearData() : SearchData(searchValues.value)
            }
          >
            {isActive ? <ClearIcon /> : <SearchIcon />}
          </SearchButton>
        </SearchBarContainer>
      </HeaderContainer>
      <DataOutput>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>ID</b>
                </TableCell>
                <TableCell align="center">
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="center">
                  <b>Apellido</b>
                </TableCell>
                <TableCell align="center">
                  <b>E-Mail</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {UserInfo.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.lastname}</TableCell>
                  <TableCell align="center">{row.mail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DataOutput>
    </DashboardInfoContainer>
  );
}

export default UsersDashboard;
