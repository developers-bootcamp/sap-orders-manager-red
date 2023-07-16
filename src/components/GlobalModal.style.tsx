import { styled } from '@mui/system';
import { PALLETE } from '../config/config';

export const MyOpenDialog = styled('div')({
    cursor: "pointer !important"
})

export const MyDetailsDiv = styled('div')({
    width: "70% !important",
    display: 'inline-block',
    paddingBottom: "1rem",
})

export const MySideBackImg = styled('div')({
    background: `${PALLETE.GRAY}`,
    height: "100% !important",
    width: "30% !important",
    position: "absolute",
    display: 'inline-block',
})

export const MyGiftImg = styled('img')({
    width: "100% ",
    marginBottom: "25%",
    marginTop: "70%",
})

export const MyTxtSide = styled('div')({
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: "25px",
    paddingRight: "25px",
    marginTop: 0,
})

export const MyMsdError = styled('div')({
    color: `${PALLETE.RED} !important `,
    fontSize: "10px",
})