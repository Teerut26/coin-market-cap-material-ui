import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { ListItemIcon } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

export default function ListItemC(props) {
  const [fev, setFev] = useState(false);

  const setAdd = () => {
    setFev(true);
    props.addFev(props.obj.id);
  };

  const setRemove = () => {
    setFev(false);
    props.removeFev(props.obj.id);
  };

  useEffect(() => {
    if (props.fev) {
      for (let index = 0; index < props.fev.length; index++) {
        if (props.fev[index].id === props.obj.id) {
          setFev(true);
          break;
        }
      }
    }
  }, [props.fev]);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt="Cindy Baker"
          src={
            "https://s2.coinmarketcap.com/static/img/coins/200x200/" +
            props.obj.id +
            ".png"
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={props.obj.symbol}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {props.obj.name}
            </Typography>
          </React.Fragment>
        }
      />
      <ListItemIcon>
        {fev ? (
          <StarIcon onClick={setRemove} style={{ color: "#ffe000" }} />
        ) : (
          <StarIcon onClick={setAdd} />
        )}
      </ListItemIcon>
    </ListItem>
  );
}
