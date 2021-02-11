import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { fetchUserData } from "../../reducers/reusable";

import Diagram from "./Diagram";
import NavigationButton from "../buttons/NavigationButton";

import { StyledTitle, StyledSection, StyledText } from "../../lib/Styling";

const Dashboard = ({ USERDATA_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const localToken = localStorage.getItem("localToken");
  const localId = localStorage.getItem("localId");
  const storedId = useSelector((store) => store.user.profile.userId);
  const isLoading = useSelector((store) => store.ui.isLoading)

  useEffect(() => {
    if (!localId) {
      history.push("/");
    }
    if (!storedId && localId) {
      dispatch(fetchUserData(USERDATA_URL, localToken, localId));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!isLoading &&
        <StyledSection>
          <StyledTitle>Dashboard</StyledTitle>
          <StyledText>This is your epileptic activity during the last 7 days.</StyledText>
          <Diagram />
          <NavigationButton route="" label="Back" />
        </StyledSection>
      }
    </>
  );
};

export default Dashboard;