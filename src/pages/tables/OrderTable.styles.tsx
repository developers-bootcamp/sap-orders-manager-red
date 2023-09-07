import { DataGrid } from "@mui/x-data-grid";
import { PALLETE } from "../../config/config";
import { styled } from '@mui/system';

export const StyledDataGrid = styled(DataGrid)`

  .MuiDataGrid-header {
    border: 3px solid ${PALLETE.WHITE};
  }
  
  .MuiDataGrid-cell {
    background-color: ${PALLETE.GRAY};
    border: 3px solid ${PALLETE.WHITE};
  }

  .MuiDataGrid-footerContainer {
    border: 3px solid ${PALLETE.WHITE};
    background-color: ${PALLETE.GRAY};
  }

  .blue {
    background-color: ${PALLETE.BLUE};
  }

  .green {
    background-color: ${PALLETE.GREEN};
  }

  .yellow {
    background-color: ${PALLETE.YELLOW};
  }

  .orang {
    background-color: ${PALLETE.ORANGE};
  }

  .red {
    background-color: ${PALLETE.RED};
  }

  .orang-border {
    border-left: 6px solid ${PALLETE.ORANGE};
  }
  
  .red-border {
    border-left: 6px solid ${PALLETE.RED};
  }

  .yellow-border {
    border-left: 6px solid ${PALLETE.YELLOW};
  }

  .blue-border {
    border-left: 6px solid ${PALLETE.BLUE};
  }

  .green-border {
    border-left: 6px solid ${PALLETE.GREEN};
  }
`;