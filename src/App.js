
import { useState, useCallback,useRef} from 'react';
import './App.css';
import Grid from './components/Grid';
import produce from 'immer';
import pic1 from './images/conways.jpg'

const rows = 24;
const cols = 62;

// Generates a Random grid
const randomGrid = () => {
  const grid = []
  for (let i=0;i<rows;i++){
    const row = []
    for(let j=0;j<cols;j++){
      row.push(Math.floor(Math.random()*2))
    }
    grid.push(row)
  }
  return grid
}

// Generates a empty grid
const generateEmptyGrid = () => {
  const grid = []
  for (let i=0;i<rows;i++){
    const row = []
    for(let j=0;j<cols;j++){
      row.push(0)
    }
    grid.push(row)
  }
  return grid
};

// Counting neighbours
function countNeighbours(grid, x, y){
  let sum = 0;
  for(let a =-1;a<2;a++){
    for(let b =-1;b<2;b++){
      let row = (x+rows+a)%rows;
      let col = (y+cols+b)%cols;
      sum += grid[row][col];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function App() {
  const [grid, setGrid] = useState(randomGrid(rows,cols));
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  // Simulation function
  const runSimulation = useCallback(
    () => {
      if(!runningRef.current){
        return;
      }
      // Using produce to aboid mutating original Data
      setGrid(g =>{
        return produce(g, gridCopy =>{
          for(let i=0; i<rows;i++){
            for(let k=0;k<cols;k++){
              let neighbours = countNeighbours(g, i, k);
              if(neighbours<2 || neighbours>3){
                gridCopy[i][k] = 0;
              }else if(g[i][k] ===0 && neighbours === 3){
                gridCopy[i][k] = 1;
              }
            }
          }
        });
      }
    );
    // waiting 0.1s to complete the process and passing a next call
    setTimeout(runSimulation, 100);
  }, []);
  

  // can't pass a setter function directly
  const newGrid = (arr) => {
    setGrid(arr);
  }

  return (
    <div className='App'>
      <div >
        {/* The Icon */}
        <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>
        <img src ={pic1} alt="Wiki" height={100} width={100} className="pic"/>
        </a>
        {/* Header */}
        <h1 className='h1'>Game of Life</h1> 
      </div>
      {/* Start Stop Button */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous"></link>
       <button type="button" className="btn btn-primary but" onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
          }
          runSimulation(grid);
        }}>
           {running ? "Stop" : "Start"}
        </button>
        {/* Clear Button */}
        <button type="button" className="btn btn-danger but"
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}>
        Clear board
      </button>
      {/* Random Grid */}
      <button type="button" className="btn btn-warning but"
        onClick={() => {
          setGrid(randomGrid());
        }}>
        Random
      </button>
      {/* The Grid Component */}
      <Grid arr={grid} setGrid={newGrid}/>
    </div>
  );
}

export default App;
