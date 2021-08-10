const SuccessMessage = (props) => {
    if (props.message) {
        return (
            <div className="ui positive message">
                <div className="header">{props.message}</div>
                <p></p>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default SuccessMessage;
