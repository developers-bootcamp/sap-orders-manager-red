import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Define the sorting options
const sortingOptions = ["Creation Date", "Status", "Price"];

interface TableSortProps {
  onSort: (sortOption: string) => void;
}

function TableSort({ onSort }: TableSortProps) {
  return (
    <div>
      <Typography variant="h6">Sort By:</Typography>
      {sortingOptions.map((option) => (
        <Button
          key={option}
          onClick={() => onSort(option)}
          style={{ textTransform: "capitalize" }}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

export default function GlobalPopOver(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { name, Pop, image, filterTables } = props;
  const [selectedSortOption, setSelectedSortOption] = React.useState<string>(
    ""
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (sortOption: string) => {
    setSelectedSortOption(sortOption);
    handleClose();
    // You can perform sorting logic here based on the selected sortOption
    // For example, you can pass it to your filterTables function.
    filterTables(sortOption);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        style={{ background: "transparent", color: "black" }}
      >
        <img src={image} style={{ height: "5vh" }} /> {name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {open && (
          <TableSort onSort={handleSort} />
        )}
      </Popover>
    </div>
  );
}
