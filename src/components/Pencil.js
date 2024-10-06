import React, { useRef, useState, useEffect } from 'react';

// Inline styles for the component
const styles = {
  body: {
    background: '#384047',
    fontFamily: 'sans-serif',
  },
  canvas: {
    background: '#fff',
    width: '600px',
    height: '400px',
    display: 'block',
    margin: '50px auto 10px',
    borderRadius: '5px',
    boxShadow: '0 4px 0 0 #222',
    cursor: 'url(../img/cursor.png), crosshair',
  },
  controls: {
    minHeight: '60px',
    margin: '0 auto',
    width: '600px',
    borderRadius: '5px',
    overflow: 'hidden',
    textAlign: 'center',
  },
  ul: {
    listStyle: 'none',
    margin: '0',
    padding: '10px 0 20px',
    width: '100%',
    textAlign: 'center',
  },
  li: {
    display: 'inline-block',
    height: '54px',
    width: '54px',
    borderRadius: '60px',
    cursor: 'pointer',
    border: '0',
    boxShadow: '0 3px 0 0 #222',
    margin: '0 5px 10px',
  },
  selected: {
    border: '7px solid #fff',
    width: '40px',
    height: '40px',
  },
  button: {
    background: '#68B25B',
    boxShadow: '0 3px 0 0 #6A845F',
    color: '#fff',
    outline: 'none',
    cursor: 'pointer',
    textShadow: '0 1px #6A845F',
    display: 'inline-block',
    fontSize: '16px',
    lineHeight: '40px',
    margin: '0 5px',
  },
  revealColorSelect: {
    border: 'none',
    borderRadius: '5px',
    margin: '10px auto',
    padding: '5px 20px',
    width: '160px',
    display: 'inline-block',
  },
  colorSelect: {
    background: '#fff',
    borderRadius: '5px',
    clear: 'both',
    margin: '20px auto 0',
    padding: '10px',
    width: '305px',
    position: 'relative',
    display: 'none',
    textAlign: 'left',
  },
  newColor: {
    width: '80px',
    height: '80px',
    borderRadius: '3px',
    boxShadow: 'none',
    float: 'left',
    border: 'none',
    margin: '10px 20px 20px 10px',
  },
  sliders: {
    margin: '8px 0',
    verticalAlign: 'middle',
  },
  sliderLabel: {
    display: 'inline-block',
    margin: '0 10px 0 0',
    width: '35px',
    fontSize: '14px',
    color: '#6D574E',
  },
  sliderInput: {
    position: 'relative',
    top: '2px',
  },
  eraseButton: {
    background: '#ff4c4c',
    boxShadow: '0 3px 0 0 #cc0000',
    color: '#fff',
    outline: 'none',
    cursor: 'pointer',
    textShadow: '0 1px #cc0000',
    display: 'inline-block',
    fontSize: '16px',
    lineHeight: '40px',
    margin: '0 5px',
  },
};

const Pencil = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('rgb(255, 0, 0)'); // Default color
  const [mouseDown, setMouseDown] = useState(false);
  const [showColorSelect, setShowColorSelect] = useState(false);
  const [newColor, setNewColor] = useState('rgb(255, 0, 0)'); // Default new color
  const [colorList, setColorList] = useState([
    'rgb(252, 76, 79)',
    'rgb(79, 163, 252)',
    'rgb(236, 209, 63)',
  ]); // Default color list

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      setMouseDown(true);
    };

    const handleMouseMove = (e) => {
      if (mouseDown) {
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(currentX, currentY);
        context.strokeStyle = color;
        context.lineWidth = 2; // Adjust line width if needed
        context.stroke();

        lastX = currentX;
        lastY = currentY;
      }
    };

    const handleMouseUp = () => setMouseDown(false);
    const handleMouseLeave = () => setMouseDown(false);

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [color, mouseDown]);

  const handleColorChange = () => {
    const r = document.getElementById('red').value;
    const g = document.getElementById('green').value;
    const b = document.getElementById('blue').value;
    setNewColor(`rgb(${r}, ${g}, ${b})`);
  };

  const addNewColor = () => {
    setColorList([...colorList, newColor]);
    setColor(newColor); // Automatically select the new color
  };

  const toggleColorSelect = () => setShowColorSelect(!showColorSelect);

  const eraseCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={styles.body}>
      <canvas ref={canvasRef} width="600" height="400" style={styles.canvas}></canvas>
      <div style={styles.controls}>
        <ul style={styles.ul}>
          {colorList.map((c, index) => (
            <li
              key={index}
              style={{ ...styles.li, backgroundColor: c, ...(color === c ? styles.selected : {}) }}
              onClick={() => setColor(c)}
            ></li>
          ))}
        </ul>
        <button style={styles.revealColorSelect} onClick={toggleColorSelect}>
          New Color
        </button>
        <div style={{ ...styles.colorSelect, display: showColorSelect ? 'block' : 'none' }}>
          <span id="newColor" style={{ ...styles.newColor, backgroundColor: newColor }}></span>
          <div style={styles.sliders}>
            <p>
              <label htmlFor="red" style={styles.sliderLabel}>Red</label>
              <input
                id="red"
                name="red"
                type="range"
                min="0"
                max="255"
                defaultValue="0"
                style={styles.sliderInput}
                onChange={handleColorChange}
              />
            </p>
            <p>
              <label htmlFor="green" style={styles.sliderLabel}>Green</label>
              <input
                id="green"
                name="green"
                type="range"
                min="0"
                max="255"
                defaultValue="0"
                style={styles.sliderInput}
                onChange={handleColorChange}
              />
            </p>
            <p>
              <label htmlFor="blue" style={styles.sliderLabel}>Blue</label>
              <input
                id="blue"
                name="blue"
                type="range"
                min="0"
                max="255"
                defaultValue="0"
                style={styles.sliderInput}
                onChange={handleColorChange}
              />
            </p>
          </div>
          <div>
            <button style={styles.button} onClick={addNewColor}>Add Color</button>
            <button style={styles.eraseButton} onClick={eraseCanvas}>Erase</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pencil;
