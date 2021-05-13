import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItemC from "./ListItemC";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const baseUrl = "https://web-api.coinmarketcap.com/v1/cryptocurrency/quotes";

export default function AlignItemsList() {
  const [data, setData] = useState([]);
  const [nStart, setNStart] = useState(1);
  const [listFev, setListFev] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const addFev = (id) => {
    var from_local = JSON.parse(localStorage.getItem("dataFev"));
    const newList = from_local.concat({ id });
    setListFev(newList);
    localStorage.setItem("dataFev", JSON.stringify(newList));
  };

  const removeFev = (id) => {
    var from_local = JSON.parse(localStorage.getItem("dataFev"));
    const newList = from_local.concat({ id }).filter((item) => item.id !== id);
    setListFev(newList);
    localStorage.setItem("dataFev", JSON.stringify(newList));
  };

  const checkDu = (id) => {
    var from_local = JSON.parse(localStorage.getItem("dataFev"));
    const newList = from_local.filter((item) => item.id === id);
    console.log(newList);
    // if(newList){
    //   return true
    // }else{
    //   return false
    // }
  };

  const getData = (id) => {
    var config = {
      method: "get",
      url: "https://api-vue.000webhostapp.com/api/coin.php?id=" + id.join(),
    };

    axios(config)
      .then(function (response) {
        var obj = []
        for (let key in response.data.data) {
            obj.push(response.data.data[key])
        }
        setData(obj)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    var from_local = JSON.parse(localStorage.getItem("dataFev"));
    setListFev(from_local);
    var obj = [];
    for (let index = 0; index < from_local.length; index++) {
      obj.push(from_local[index].id);
    }
    getData(obj);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("dataFev") === null) {
      localStorage.setItem("dataFev", JSON.stringify([]));
    } else {
    }
  }, []);

  return (
    <List>
      {data.map((item) => (
        <ListItemC
          removeFev={(id) => removeFev(id)}
          addFev={(id) => addFev(id)}
          obj={item}
          fev={listFev}
        />
      ))}
    </List>
  );
}
