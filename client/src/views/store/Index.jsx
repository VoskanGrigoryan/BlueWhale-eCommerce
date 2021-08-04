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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

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
            <Paper elevation={5} className="col-12 w-25 p-3 row text-center">
                <div className="bg-dark p-1">
                    <Typography variant="h3" color="primary">
                        Catalog
                    </Typography>
                </div>
                <Paper elevation={3} className=" mt-2">
                    <InputBase placeholder="Search products" />
                    <IconButton type="submit" aria-label="search">
                        <Search />
                    </IconButton>
                </Paper>
            </Paper>
            <Paper elevation={5} className="col-12">
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
    );
};

export default Store;
