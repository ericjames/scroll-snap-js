import './PaneContent.css';

function PaneContent({
  children,
  style
}) {

  return (
    <div className="PaneContent" style={style}>
      {children}
    </div>
  );
}

export default PaneContent;
