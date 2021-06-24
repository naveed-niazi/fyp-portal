import React, { useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import { TableRow } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import PageLayout from "../components/PageLayout"
import { Box, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiTableCell from "@material-ui/core/TableCell";
import TableHead from '@material-ui/core/TableHead';
import NewBatchForm from '../components/NewBatchForm';
import NewDegreeForm from '../components/NewDegreeForm';
import NewChairmanForm from '../components/NewChairmanForm';
import FormDialog from '../components/FormDialog';


import { getSettings } from "../apiCalls/settingCalls"


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const TableCell = withStyles({
    root: {
        //borderBottom: "none",
        padding: ".8rem"
    }
})(MuiTableCell);
const TableCellWithoutBorder = withStyles({
    root: {
        borderBottom: "none",
        padding: ".8rem"
    }
})(MuiTableCell);
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    table: {
        minWidth: 650,
    },
    cardActions: {
        display: "flex",
        padding: "8px",
        alignItems: "center",
        justifyContent: "space-around"
    }
});

function Row(props) {
    const { data, name, subTitle } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell >{data.length} {subTitle}</TableCell>
                <TableCell align="right">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Total {name}
                            </Typography>

                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {data.map((value, key) => (
                                        <TableCell key={key} component="th" scope="row">
                                            {value}
                                        </TableCell>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const SystemSetting = ({ Data }) => {
    const classes = useStyles();
    const [openDetail, setOpenDetail] = React.useState(false);
    const [setting, setSetting] = useState({ data: {}, dataLoaded: false })
    const [error, setError] = useState("");

    useEffect(() => {
        getSettings().then(data => {
            if (data) {
                if (data.error) {
                    setError(data.error)
                } else {
                    setSetting({ data: data, dataLoaded: true })
                }
            } else {
                setError("Unable to retrieve settings")
            }
        })
    }, [])
    return (
        <PageLayout Title={Data.name} Icon={Data.icon}>
            <Card className={classes.root} variant="outlined">
                {error !== ""
                    ?
                    <Box className={classes.root} m={5}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                    :
                    !(setting.dataLoaded)
                        ?
                        <Box className={classes.container} m={5}>
                            <CircularProgress color="primary" />
                        </Box>
                        :
                        <>
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableBody>
                                            <TableRow className={classes.root}>
                                                <TableCell component="th" scope="row">Chairman</TableCell>
                                                <TableCell>{setting.data.Chairman.name}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton aria-label="expand row" size="small"
                                                        onClick={() => setOpenDetail(!openDetail)}>
                                                        {openDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Collapse in={openDetail} timeout="auto" unmountOnExit>
                                                        <Box margin={1}>
                                                            <Typography variant="h6" gutterBottom component="div">
                                                                Chairman Detail
                                                            </Typography>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableBody>
                                                                    <TableRow component="th" scope="row">
                                                                        <TableCell>Date Appointed</TableCell>
                                                                        <TableCell> {new Date(setting.data.Chairman.Appointed).toDateString()}</TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>

                                            <Row data={setting.data.Degrees} name={"Programs Offered"} subTitle={"Program"} />

                                            <Row data={setting.data.Batches} name={"Batches"} subTitle={"Batches"} />


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <FormDialog Form={<NewBatchForm />} Title={"Add New Batch"} Heading={"Batch Form"} />
                                <FormDialog Form={<NewDegreeForm />} Title={"Add New Degree"} Heading={"Program Form"} />
                                <FormDialog Form={<NewChairmanForm />} Title={"Update Chairman"} Heading={"Chairman Form"} />

                            </CardActions>
                        </>
                }
            </Card>
        </PageLayout>
    );

};

export default SystemSetting;