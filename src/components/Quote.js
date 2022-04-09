function Quote(props) {
    return (
        <div className="quote">
            <span className="content"> "{props.content.quote}" </span>
            <br/>
            <span className="source"> {props.content.source} </span>
        </div>
    );
}

export default Quote;
