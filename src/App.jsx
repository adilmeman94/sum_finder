import { useState } from "react";
import "./App.css";
import { TextField, Box, Button } from "@mui/material";

function App() {
  const [inputNum, setInputNum] = useState("");
  const [targetNum, setTargetNum] = useState();
  const [listNum, setListNum] = useState([]);

  const handleInputNum = (e) => {
    const inputValues = e.target.value.split(",");
    setListNum(inputValues);
    setInputNum(e.target.value);
  };

  const handleFindSortestSum = () => {
    if (targetNum > 0) {
      let matchNumber = [];
      for (let i = 0; i < listNum.length; i++) {
        for (let j = i + 1; j < listNum.length; j++) {
          if (targetNum === listNum[i] + listNum[j]) {
            matchNumber.push([listNum[i], listNum[j]]);
          }
        }
      }
      console.log(matchNumber, "matchNumber");
    }
  };

  return (
    <>
      <h1>Shortest Sum Finder</h1>
      <Box sx={{ display: "flex", direction: "row", gap: 2 }}>
        <TextField
          placeholder="Add coma separated numbers"
          sx={{ width: "50%" }}
          value={inputNum}
          onChange={(e) => handleInputNum(e)}
        ></TextField>
        <TextField
          type="number"
          value={targetNum}
          onChange={(e) => {
            setTargetNum(e.target.value);
          }}
          sx={{ width: "20%" }}
        ></TextField>
        <Button
          variant="contained"
          sx={{ width: "15%" }}
          onClick={handleFindSortestSum}
        >
          Find
        </Button>
      </Box>
      <Box mt={3}>{listNum.join(",")}</Box>
    </>
  );
}

export default App;
