const ErrorMessage = (props) => {
    return (
        <div className="ui error message">
            <div className="header">Action Forbidden</div>
            <p>{props.message}</p>
        </div>
    );
};

export default ErrorMessage;
