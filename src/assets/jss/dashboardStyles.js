import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: "80vh",
        marginTop: "-60px",
        marginLeft: "40px",
        marginRight: "40px",

        "@media screen and (max-width: 600px)": {
            marginTop: "-30px",
        },
    },

    title: {
        textAlign: "center",
        marginBottom: "-20px",
    },
    icon: {
        color: "white",
        fontSize: "160%",
        padding: "20px",
        borderRadius: "3px",
        backgroundColor: "green",
        boxShadow: "0px 2px 7px 0px rgb(0 0 0 / 16%)",
        marginTop: "-10px",
        marginLeft: "60px",
        "@media screen and (max-width: 600px)": {
            fontSize: "160%",
            padding: "2%",
            marginTop: "-20px",
            marginLeft: "50px",
        },
    },
});

export default useStyles;