import React from 'react'
import '../App.css';

const Grid = ({arr, setGrid}) => {
    let g = []; 
    for (let i=0;i<arr.length;i++){
        const row = []
        for(let j=0;j<arr[i].length;j++){
            row.push(
            <div 
            key={i+'-'+j} 
            onClick={() => {
                let new_arr = [...arr];
                new_arr[i][j] = arr[i][j]  === 0 ? 1 : 0;
                setGrid(new_arr);
            }} 
            className='tile'
            style={{
                backgroundColor: arr[i][j] ? 'black': 'white',
                transition: "all .01s ease",      
            }}
            />)     
        }
        g.push(row)
      }
   
  return (
    <div id='grid' className='grid' style={{gridTemplateColumns : `repeat(${arr[0].length}, 20px)`, gridTemplateRows : `repeat(${arr.length}, 20px)`}}>
        {g}
    </div>
  )
}

export default Grid