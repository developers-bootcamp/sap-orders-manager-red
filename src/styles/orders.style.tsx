import { makeStyles } from '@mui/styles';
import { PALLETE } from '../config/config';

const useStylesForOrders = makeStyles((theme) => ({
    btnAdd: {
        background: `${PALLETE.BLUE} !important`,
        color: `${PALLETE.WHITE} !important`,
    },
    txtField: {
        width: '90% !important'
    },
    spalltxtField: {
        width: '30% !important'
    },
    msdError: {
        color: `${PALLETE.RED} !important`,
        fontSize: "10px"
    },
    arrowIcon: {
        color: 'red !important',
    },
    openSignUp: {
        cursor: "pointer !important"
    },
    sideBackImg: {
        background: `${PALLETE.GRAY} !important`,
        height: "96% !important",
        width: "30% !important",
        position: "absolute"
    },
    giftImg: {
        width: "100% ",
        marginBottom: "50%",
        marginTop: "70%"
    },

    detailsDiv: {
        width: "70% !important",
    },
    txtSide: {
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "center",
    },
    fieldContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    halfField: {
        marginLeft: '8px',
        width: '80% !important'
    },
    helperText: {
        marginLeft: '8px',
    },
    btnBuyNow: {
        background: `${PALLETE.YELLOW} !important`,
        width: '30%',
        color: `${PALLETE.WHITE} !important`,
        right: "0%",
        position: "absolute"
    },
    productList: {
        top: '50%'
    },
}));
export default useStylesForOrders;