import { useState } from "react";
import { TextField, Box, Button, Chip, Grow } from "@mui/material";
import "./App.css";

export default function App() {
  const [inputNum, setInputNum] = useState("");
  const [targetNum, setTargetNum] = useState("");
  const [listNum, setListNum] = useState([]);
  const [highlightRange, setHighlightRange] = useState(null);

  const handleInputNum = (e) => {
    let val = e.target.value;
    val = val.replace(/[^0-9,]/g, "");
    val = val.replace(/,{2,}/g, ",");
    if (val.startsWith(",")) {
      val = val.slice(1);
    }
    setInputNum(val);

    const arr = val
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "" && !isNaN(num)) 
      .map(Number)
      .filter((n) => n > 0); 

    setListNum(arr);
    setHighlightRange(null);
  };

  // Sliding Window: Find shortest subarray = target sum
  const handleFindShortestSum = () => {
    const target = Number(targetNum);
    if (!target) return;

    let left = 0;
    let sum = 0;
    let best = null;
    let minLen = Infinity;

    for (let right = 0; right < listNum.length; right++) {
      sum += listNum[right];

      while (sum >= target) {
        if (sum === target) {
          const len = right - left + 1;
          if (len < minLen) {
            minLen = len;
            best = { start: left, end: right };
          }
        }
        sum -= listNum[left];
        left++;
      }
    }

    setHighlightRange(best);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 10,
      }}
    >
      <Box textAlign="center">
        <h1>Shortest Sum Finder</h1>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
        <TextField
          type="text"
          placeholder="3,4,2,1,3,6,5,7"
          sx={{ width: "350px" }}
          value={inputNum}
          onChange={handleInputNum}
        />

        <TextField
          type="number"
          value={targetNum}
          onChange={(e) => setTargetNum(e.target.value)}
          sx={{ width: "120px" }}
        />

        <Button
          variant="contained"
          sx={{ width: "120px" }}
          onClick={handleFindShortestSum}
        >
          Find
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
        {listNum.map((num, index) => {
          const isHighlighted =
            highlightRange &&
            index >= highlightRange.start &&
            index <= highlightRange.end;

          return (
            <Grow in={true} timeout={400} key={index}>
              <Chip
                label={num}
                sx={{
                  fontSize: "20px",
                  padding: "25px 15px",
                  background: isHighlighted ? "#ff9800" : "#e8e8e8",
                  color: isHighlighted ? "white" : "black",
                  borderRadius: "10px",
                  transition: "0.3s ease-in-out",
                  boxShadow: isHighlighted ? "0 0 12px #ff9800" : "none",
                }}
              />
            </Grow>
          );
        })}
      </Box>
    </Box>
  );
}
