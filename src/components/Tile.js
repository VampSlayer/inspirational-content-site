import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import React from "react"

import { connect } from "react-redux"
import { decrement, increment } from "../slices/tileSlice"

import Mantra from "./Mantra"
import Quote from "./Quote"
import Empty from "./Empty"

class Tile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			content: {},
		}
	}
	componentDidMount() {
		this.get()
	}
	async get() {
		let url = "https://inspirational-content-api.herokuapp.com"
		let feed = this.props.tile?.feed ? `?feeds=${this.props.tile?.feed}` : ""
		switch (this.props.tile?.type) {
			case "quote":
				url = `${url}/quotes/quote${feed}`
				break
			case "mantra":
				url = `${url}/mantras/mantra${feed}`
				break
			default:
				return
		}
		const res = await fetch(url)
		const json = await res.json()
		this.setState({
			content: json,
		})
	}
	async settings() {
		console.log("settings")
	}
	getContentComponent(content, settings) {
		switch (this.props.type) {
			case "quote":
				return <Quote content={content} />
			case "mantra":
				return <Mantra content={content} />
			default:
				return <Empty onClick={settings} />
		}
	}
	render() {
		const firstAndOnly = this.props.firstAndOnly
		const remove = this.props.remove
		const id = this.props.tile?.id
		const last = this.props.last
		const add = this.props.add

		const getContentComponent = this.getContentComponent.bind(this)
		const content = this.state.content
		const settings = this.settings.bind(this)

		const get = this.get.bind(this)
		return (
			<Container fluid className="tile">
				<Row>
					<Col className="d-flex justify-content-between">
						<span className="mt-1">
							{!firstAndOnly && (
								<i
									className="mi mi-Remove"
									title="Remove Inspiration"
									onClick={() => remove(id)}
								/>
							)}
							{last && (
								<i
									className="mi mi-Add"
									title="Add Inspiration"
									onClick={() => add()}
								/>
							)}
						</span>
						<span className="mt-1">
							<i
								className="mi mi-Settings"
								title="Configure Inspiration"
								onClick={settings}
							/>
						</span>
					</Col>
				</Row>
				<Row className="content">
					<Col className="d-flex justify-content-center">
						{getContentComponent(content, settings)}
					</Col>
				</Row>
				<Row>
					<Col className="d-flex justify-content-center" onClick={get}>
						<i className="mi mi-Refresh" title="Refresh Inspiration" />
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		add: () => dispatch(increment()),
		remove: (id) => dispatch(decrement({ id })),
	}
}

export default connect(null, mapDispatchToProps)(Tile)
