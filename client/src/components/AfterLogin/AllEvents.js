import React, { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  Button,
  Grid,
  Typography,
  containerClasses,
} from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import getBaseUrl from "../../config";

const AllEvents = () => {
  const { redux_auth } = useSelector((state) => ({ ...state }));
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .post(`${getBaseUrl()}/api/event/get-events`, {
        isAdmin: true,
      })
      .then((response) => {
        // console.log(response.data.data.events);
        setEvents(response.data.data.events);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const registerUser = (e) => {
    const key = Number(e.target.name);
    // console.log({ key });
    // console.log({ redux_auth });
    axios
      .post(
        `${getBaseUrl()}/api/event/register-for-event`,
        {
          event_id: key,
        },
        { headers: { Authorization: `Bearer ${redux_auth.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Registered Successfully!!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Grid sx={{ mt: 5 }} className="section">
      <Typography variant="h2" textAlign={"center"}>
        All Events
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        {events.map((e, key) => {
          const scheduledAt = Date(e.scheduledAt); // This would be the timestamp you want to format
          const formatDate = (dateString) => {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options);
          };
          return (
            <Card
              key={key}
              item
              sx={{
                width: "100%",
                mb: 5,
                boxShadow: 5,
                p: 4,
                position: "relative",
                gap: "20px",
              }}
            >
              <Typography variant="h4" sx={{ color: "#776bf6" }}>
                {e.title}
              </Typography>
              <Typography
                variant="subtitle"
                sx={{ color: "#002ab0", fontWeight: "bolder", opacity: "0.8" }}
              >
                {e.organizedBy}
              </Typography>
              <Typography>{formatDate(scheduledAt)}</Typography>
              <Typography
                variant="subtilte"
                sx={{ opacity: "0.8", fontSize: "1.1rem" }}
              >
                {e.description}
              </Typography>
              <Typography>
                {e.approval.general_committee
                  ? "Approved By Student Committee"
                  : "Yet to be Approved By Student Committee"}
              </Typography>
              <Typography>
                {e.approval.faculty
                  ? "Approved By Facalties"
                  : "Yet to be Approved By Faclties"}
              </Typography>{" "}
              <Typography>
                {e.approval.dean
                  ? "Approved By Dean"
                  : "Yet to be Approved By Dean"}
              </Typography>
              {/* <Button
                sx={{
                  position: "absolute",
                  bottom: "30px",
                  right: "30px",
                  fontSize: "17px",
                }}
                variant="outlined"
                name={key}
                onClick={registerUser}
              >
                Register Now
              </Button> */}
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default AllEvents;
