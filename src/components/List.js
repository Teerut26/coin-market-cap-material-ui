import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItemC from "./ListItemC";
import InfiniteScroll from "react-infinite-scroll-component";

const baseUrl = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency";

export default function AlignItemsList(props) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState(data);
  const [nStart, setNStart] = useState(1);
  const [listFev, setListFev] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = (value) => {
    // console.log("🚀 ~ file: List.js ~ line 16 ~ handleSearch ~ value", value)
    let result = [];
    // console.log(value);
    result = data.filter((item) => {
      return item.name.search(value) !== -1;
    });
    // console.log("🚀 ~ file: List.js ~ line 22 ~ result=data.filter ~ result", result)
    if (result.length != 0) {
      setData2(result);
    } else {
      getDataSymbol(value);
    }
  };

  const getDataSymbol = (symbol) => {
    fetch("https://api-vue.000webhostapp.com/api/coin.php?symbol=" + symbol)
      .then((res) => res.json())
      .then((data) => {
        for (let key in data.data) {
          // console.log(data.data[key])
          setData2([data.data[key]]);
          console.log(listFev);
          break;
        }
      });
  };

  useEffect(() => {
    handleSearch(props.searchName);
  }, [props.searchName]);

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
    // console.log(newList)
    // if(newList){
    //   return true
    // }else{
    //   return false
    // }
  };

  const getMore = () => {
    fetch(
      baseUrl +
        "/listing?start=" +
        nStart +
        "&limit=20&sortBy=market_cap&sortType=desc&convert=THB"
    )
      .then((res) => res.json())
      .then((data_res) => {
        var newData = data.concat(data_res.data.cryptoCurrencyList);
        setData(newData);
        setData2(newData);
        setNStart((nStart) => nStart + 20);
      });
  };

  // useEffect(() => {
  //   console.log(listFev)
  // }, [listFev])

  useEffect(() => {
    props.list_data(data);
  }, [data]);

  useEffect(() => {
    var from_local = JSON.parse(localStorage.getItem("dataFev"));
    setListFev(from_local);
    if (localStorage.getItem("dataFev") === null) {
      localStorage.setItem("dataFev", JSON.stringify([]));
    } else {
    }
  }, []);

  useEffect(() => {
    fetch(
      baseUrl +
        "/listing?start=1&limit=20&sortBy=market_cap&sortType=desc&convert=THB"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.cryptoCurrencyList);
        setData2(data.data.cryptoCurrencyList);
        setNStart((nStart) => nStart + 20);
      });
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={getMore}
      hasMore={hasMore}
      loader={
        <center>
          <h4>Loading...</h4>
        </center>
      }
    >
      <List>
        {data2.map((item) => (
          <ListItemC
            removeFev={(id) => removeFev(id)}
            addFev={(id) => addFev(id)}
            obj={item}
            fev={listFev}
          />
        ))}
      </List>
    </InfiniteScroll>
  );
}
