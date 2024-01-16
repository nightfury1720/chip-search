// Importing the styles for the Chip component
import "./Chip.css";

// Functional component for rendering a chip
function Chip({ user, onDelete, onClick, highlighted }) {
  return (
    // Container for the chip with optional highlighting
    <div onClick={onClick} className={`chip ${highlighted ? "highlighted" : ""}`}>
      {/* Displaying the user's name */}
      {user.name}

      {/* Delete icon for removing the chip */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: "pointer" }}
        onClick={() => onDelete(user.name)}
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
  );
}

// Exporting the Chip component as the default export
export default Chip;
