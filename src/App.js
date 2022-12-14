import './App.css';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [textDisplay, setTextDisplay] = useState('Click on a node!');
  const [posX, setPosX] = useState(undefined);
  const [posY, setPosY] = useState(undefined);

  // Create ref to graph
  // All graph interactions are done imperatively
  const graphEl = useRef(null);

  useEffect(() => {
    // taken from https://visjs.github.io/vis-network/examples/network/basic_usage/standalone.html
    // create an array with nodes
    const nodes = new DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" }
    ]);

    // create an array with edges
    const edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 }
    ]);

    const data = {
      nodes: nodes,
      edges: edges
    };
    const options = {};

    const network = new Network(graphEl.current, data, options);
    network.on('click', (params) => {
      console.log(params);
      // Create React state change on click
      if (params.nodes[0]) {
        setTextDisplay(`Node ${params.nodes[0]} selected`);
      } else {
        setTextDisplay('No node selected');        
      }
      setPosX(params.pointer.canvas.x);
      setPosY(params.pointer.canvas.y);
    });

    // Destroy network instance to prevent memory leak
    return () => {
      network.destroy();
    };
  }, []);  

  return (
    <div className="App">
      <div ref={graphEl} className="graphContainer">
      </div>
      <p>{textDisplay}</p>
      <p>Mouse position X: {posX}</p>
      <p>Mouse position Y: {posY}</p>
      
    </div>
  );
}

export default App;
