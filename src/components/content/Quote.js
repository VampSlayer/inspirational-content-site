function Quote(props) {
	return (
		<div className="quotes">
			<span className="quote"> "{props.content.quote}" </span>
			<br />
			<span className="source"> {props.content.source} </span>
		</div>
	)
}

export default Quote
