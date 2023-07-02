import { makeStyles } from '@mui/styles';

const useStylesForOrders = makeStyles((theme) => ({
    btnAdd: {
        background: '#4a91e2 !important',
        width: '100%',
        color: 'white !important',
        left: "sssss",
        margin:"20px",
        position: "absolute"
    },
    txtField: {
        width: '90% !important'
    },
    spalltxtField:{
        width: '30% !important'
    },
    msdError: {
        color: '#EE696A !important ',
        fontSize: "10px"
    },

   arrowIcon: {
    color: 'red !important', 
  },
    openSignUp: {
        cursor: "pointer !important"
    },
    sideBackImg: {
        background: "#DDDAE0",
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
    //   cvcContainer:{
    //    // display: 'flex',
    //     // flexDirection: 'column',
    //     // alignItems: 'center',
    //   },
      halfField: {
        marginLeft: '8px',
        width:'80% !important'
      },
      helperText: {
        marginLeft: '8px',
      },
    btnBuyNow: {
        background: '#FAE282 !important',
        width: '30%',
        color: '#FFFFFF !important',
        left: "90%",
        position: "absolute"
    },
    //???
    productList:{
        top:'50%'
    }
}));
export default useStylesForOrders;