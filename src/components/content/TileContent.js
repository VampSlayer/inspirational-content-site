import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import React from "react"

import { connect } from "react-redux"
import { add, remove, update } from "../../slices/tileSlice"

import Mantra from "./Mantra"
import Quote from "./Quote"
import Empty from "./Empty"

class TileContent extends React.Component {
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
		const type = this.props.tile?.type
		if (!type) return
		let feed = this.props.tile?.feed ? `?feeds=${this.props.tile?.feed}` : ""
		const url = `https://inspirational-content-api.herokuapp.com/${type}/${type.substring(
			0,
			type.length - 1
		)}${feed}`
		const res = await fetch(url)
		const json = await res.json()
		this.setState({
			content: json,
		})
	}
	settings() {
		this.props.update({
			id: this.props.tile.id,
			setting: true,
		})
	}
	getContentComponent(content) {
		switch (this.props.tile.type) {
			case "quotes":
				return <Quote content={content} />
			case "mantras":
				return <Mantra content={content} />
			default:
				return <Empty />
		}
	}
	render() {
		const showRemove = !(
			this.props.tiles[this.props.tiles?.length - 1] === this.props.tile &&
			this.props.tiles.length === 1
		)
		const id = this.props.tile?.id
		const remove = this.props.remove
		const type = this.props.tile?.type

		const last =
			this.props.tiles[this.props.tiles.length - 1] === this.props.tile
		const allCount = this.props.tiles?.length
		const showAdd = last && allCount !== 18
		const add = this.props.add

		const content = this.state.content

		return (
			<Container className="tile">
				<Row>
					<Col>
						<span className="left-top-button">
							{showRemove && (
								<i
									className="mi mi-Remove"
									title="Remove Inspiration"
									onClick={() => remove(id)}
								/>
							)}
							{showAdd && (
								<i
									className="mi mi-Add"
									title="Add Inspiration"
									onClick={() => add()}
								/>
							)}
						</span>
						<span className="right-top-button">
							<i
								className="mi mi-Settings"
								title="Configure Inspiration"
								onClick={() => this.settings()}
							/>
						</span>
					</Col>
				</Row>
				<Row className="content">
					<Col>
						<span onClick={() => this.settings()}>
							{this.getContentComponent(content)}
						</span>
					</Col>
				</Row>
				{type && (
					<Row>
						<Col className="bottom-button" onClick={() => this.get()}>
							<i className="mi mi-Refresh" title="Refresh Inspiration" />
						</Col>
					</Row>
				)}
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({ tiles: state.tile.value })

const mapDispatchToProps = (dispatch) => {
	return {
		add: () => dispatch(add()),
		remove: (id) => dispatch(remove({ id })),
		update: (tile) => dispatch(update({ tile })),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TileContent)
