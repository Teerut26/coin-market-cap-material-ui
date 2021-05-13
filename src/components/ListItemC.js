import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { ListItemIcon } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

import Progress from './Progress'

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

  const persen = (currentData, maxData) => {
    return ((currentData * 100) / maxData);
  }

  const nFormatter = (num, digits) => {
    var si = [
      {
        value: 1,
        symbol: "",
      },
      {
        value: 1e3,
        symbol: "k",
      },
      {
        value: 1e6,
        symbol: "M",
      },
      {
        value: 1e9,
        symbol: "B",
      },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    // .replace(rx, "$1") + si[i].symbol
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
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
        primary={props.obj.symbol + " @" + props.obj.name + ""}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {props.obj.circulatingSupply &&
                nFormatter(props.obj.circulatingSupply, 2)}
              {props.obj.circulating_supply &&
                nFormatter(props.obj.circulating_supply, 2)}{" "}
               / {props.obj.maxSupply && nFormatter(props.obj.maxSupply, 2)}
              {props.obj.max_supply && nFormatter(props.obj.max_supply, 2)}
              {props.obj.maxSupply || props.obj.max_supply ? "" : <i class="fas fa-infinity"></i>}
              <br/>
              {props.obj.circulatingSupply != 0 && props.obj.maxSupply   && <Progress value={persen(props.obj.circulatingSupply,props.obj.maxSupply)} />}
              {props.obj.circulating_supply != 0 &&  props.obj.max_supply && <Progress value={persen(props.obj.circulating_supply,props.obj.max_supply)} />}
              {props.obj.circulatingSupply != 0 && props.obj.maxSupply || props.obj.circulating_supply &&  props.obj.max_supply  ? "" : <Progress value={0} />}
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
