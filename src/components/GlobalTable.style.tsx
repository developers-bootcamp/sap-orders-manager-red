import { makeStyles } from '@mui/styles';
import { PALLETE } from '../config/config';

const useStylesForTable = makeStyles((color) => ({
    sideColor: { 
        borderLeft: " 5px",
        borderLeftStyle: "solid",
        borderLeftColor: `${PALLETE.RED} !important`,
        borderBottom:'8px solid rgba (224, 224, 224, 1)!important'
    }

}));
export default useStylesForTable;