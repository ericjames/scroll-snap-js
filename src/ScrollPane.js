import './ScrollPane.css';

function ScrollPane({

  children,
  width,
  height

}) {


  return (
    <div className="ScrollPane" style={{ width, height }}>

      {children}

    </div>
  );
}

export default ScrollPane;
