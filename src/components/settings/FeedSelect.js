import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import React from "react"

import { connect } from "react-redux"
import { update } from "../../slices/tileSlice"

class FeedSelect extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			feeds: [],
		}
	}
	componentDidMount() {
		this.get()
	}
	async get() {
		const type = this.props.tile?.type
		const url = `https://inspirational-content-api.herokuapp.com/${type}/feeds`
		const res = await fetch(url)
		const json = await res.json()
		this.setState({
			feeds: json,
		})
	}
	back() {
		this.props.update({
			id: this.props.tile.id,
			type: null,
		})
	}
	close() {
		this.props.update({
			id: this.props.tile.id,
			setting: false,
		})
	}
	set(event) {
		const feed = event.target.value
		this.props.update({
			id: this.props.tile.id,
			feed: feed,
		})
	}
	getFeedOptions() {
		return this.state.feeds.map((feed) => {
			return (
				<option key={feed.id} value={feed.id}>
					{feed.name}
				</option>
			)
		})
	}
	render() {
		return (
			<Container fluid className="tile">
				<Row>
					<Col>
						<span className="left-top-button">
							<i
								className="mi mi-Back"
								title="Back To Inspiration Type"
								onClick={() => this.back()}
							/>
						</span>
						<span className="right-top-button">
							<i
								className="mi mi-ChromeClose"
								title="Close Choosing Inspiration"
								onClick={() => this.close()}
							/>
						</span>
					</Col>
				</Row>
				<Row className="content feed-select">
					<Col>
						<Row>
							<Col>
								<span className="sub-heading">Inspiration Source</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<select
									className="feeds"
									value={this.props.tile.feed}
									onChange={(e) => this.set(e)}
								>
									{this.getFeedOptions()}
								</select>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col className="bottom-button">
						<i
							className="mi mi-Save"
							title="Save Inspiration Source"
							onClick={() => this.close()}
						/>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		update: (tile) => dispatch(update({ tile })),
	}
}

export default connect(null, mapDispatchToProps)(FeedSelect)
