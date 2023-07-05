import { makeStyles } from '@mui/styles';
import { PALLETE } from '../../config/config';

const useStyles = makeStyles({
    btnSignUp: {
        background: `${PALLETE.YELLOW} !important`,
        width: '30%',
        color: `${PALLETE.WHITE} !important`,
        left: "sssss",
        position: "absolute"
    },
    btnGlobalModel: {
        background: '#dd8b5c !important',
        width: '10%',
        color: '#FFFFFF !important',
        left: "sssss",
        position: "absolute"
    },
    txtField: {
        width: '90% !important'
    },
    msdError: {
        color: `${PALLETE.RED} !important `,
        fontSize: "10px"
    },
    dialog: {
        maxHeight: '3000px !important',
        maxWidth: '3000px !important',
        borderRadius: '30%  !important',
        height: "100% !important",
        width: "100% !important",
        position: "absolute"
    },
    dialogContent: {
        padding: "{none}",
    },
    openSignUp: {
        cursor: "pointer !important"
    },
    sideBackImg: {
        background: `${PALLETE.GRAY}`,
        height: "100% !important",
        width: "30% !important",
        position: "absolute"
    },
    giftImg: {
        width: "100% ",
        marginBottom: "25%",
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


});
export default useStyles;