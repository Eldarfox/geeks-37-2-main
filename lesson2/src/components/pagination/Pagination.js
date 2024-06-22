import React from 'react';
import Button from "../Button";
import classes from "./Pagination.module.css";

const Pagination = ({prev, next , page}) => {
    return (
        <div className={classes.all}>
            <Button className={classes.btn} text={"prev"} action={prev}/>
            <p>{page}</p>
            <Button className={classes.btn} text={"next"} action={next}/>
        </div>
    );
};

export default Pagination;