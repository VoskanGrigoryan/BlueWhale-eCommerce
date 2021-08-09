import React, { useState } from 'react';
import drinks2 from '../assets/images/drinks-02.jpg';
import ProductDialog from '../dialogs/ProductDialog';
import { makeStyles } from '@material-ui/core/styles';

import {
    Typography,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
} from '@material-ui/core';

const useStyles = makeStyles({
    media: {
        height: 180,
    },
});

const ProdCard = ({ item }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card
                onClick={(event) => console.log(event)}
                className="col-2"
                style={{ maxWidth: 280, margin: 10 }}
            >
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={drinks2}
                        title={item.name}
                    />
                    <CardContent className="pb-0">
                        <Typography gutterBottom variant="h5">
                            {item.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleOpen}>
                        Learn More
                    </Button>
                    <Button size="small" color="primary">
                        Add
                    </Button>
                </CardActions>
            </Card>
            <ProductDialog item={item} open={open} handleClose={handleClose} />
        </>
    );
};

export default ProdCard;
