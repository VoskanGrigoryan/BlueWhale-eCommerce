import React from 'react';
import {
    Paper,
    Typography,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    InputBase,
    IconButton,
    Button,
    Select,
    InputLabel,
    MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import drinks2 from '../../assets/images/drinks-02.jpg';

const useStyles = makeStyles({
    root: {
        maxWidth: 280,
        margin: 10,
    },
    media: {
        height: 180,
    },
});

const Store = () => {
    const classes = useStyles();

    return (
        <div className="min-vh-100 catalog row" style={{ paddingTop: '140px' }}>
            <Paper elevation={5} className="col-4 p-3 row text-center">
                <div className="bg-dark p-1">
                    <Typography variant="h3" color="primary">
                        Catalog
                    </Typography>
                </div>
                <Paper elevation={3} className=" mt-2">
                    <InputBase placeholder="Search products" />
                    <IconButton type="submit">
                        <Search />
                    </IconButton>
                </Paper>
            </Paper>
            <div className="col-12 row">
                <Paper elevation={5} className="col-2">
                    <div className="bg-dark mt-2 text-center">
                        <Typography variant="h4" color="primary">
                            Filters
                        </Typography>
                    </div>
                    <hr />
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox name="checkedB" color="primary" />
                            }
                            label="$100 - $499"
                        />
                    </FormGroup>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox name="checkedB" color="primary" />
                            }
                            label="$500 - $999"
                        />
                    </FormGroup>

                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox name="checkedB" color="primary" />
                            }
                            label="$1.000 - $2.000"
                        />
                    </FormGroup>

                    <hr />
                    <FormGroup>
                        <Select size="small">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>New</MenuItem>
                            <MenuItem value={20}>Old</MenuItem>
                            <MenuItem value={30}>Highest Rating</MenuItem>
                            <MenuItem value={30}>Lowest Rating</MenuItem>
                        </Select>
                    </FormGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mb-2 mt-3"
                    >
                        Apply
                    </Button>
                </Paper>
                <Paper
                    elevation={5}
                    className="col-9"
                    style={{ marginLeft: '70px' }}
                >
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={drinks2}
                                title="Contemplative Reptile"
                            />
                            <CardContent className="pb-0">
                                <Typography gutterBottom variant="h5">
                                    Lizard
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                            <Button size="small" color="primary">
                                Add
                            </Button>
                        </CardActions>
                    </Card>
                </Paper>
            </div>
        </div>
    );
};

export default Store;
