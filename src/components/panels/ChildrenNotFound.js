import React from 'react';

const ChildrenNotFound = (props) => {
    return (
        <div style={styles.mainDiv}> 
            <div style={{textAlign: "center"}}>{props.text}</div>
            <div style={{textAlign: "center"}}><a href="https://youtu.be/68z3oOXLfIw?t=51" target={"blank"}>{props.tutorial}</a></div> 
        </div>);
}

const styles = {
    mainDiv: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    }
};

export default ChildrenNotFound;