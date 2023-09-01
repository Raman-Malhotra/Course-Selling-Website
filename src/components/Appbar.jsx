import { React } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userLoadingState } from "../store/selectors/isUserLoading";
import { userEmailStatus } from "../store/selectors/userEmail";
import { userState } from "../store/atoms/user";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const userLoading = useRecoilValue(userLoadingState);
  const userEmail = useRecoilValue(userEmailStatus);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return <h1>Loading</h1>;
  }
  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10, cursor: "pointer" }}>
          <Typography variant={"h6"}>Course App</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              {" "}
              <Button onClick={() => {}}>Add course</Button>
            </div>
            <div style={{ marginRight: 10 }}>
              {" "}
              <Button onClick={() => {}}> courses</Button>
            </div>
          </div>
          <Button
            onClick={() => {
              localStorage.setItem("token", null);
              setUser({ isLoading: false, userEmail: null });
            }}
            variant={"contained"}
          >
            logout
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => {}}>
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button variant={"contained"} onClick={() => {}}>
              Signup
            </Button>
          </div>
          <div>
            <Button variant={"contained"} onClick={() => {}}>
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
