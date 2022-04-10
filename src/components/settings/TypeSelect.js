import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import React from "react"

import { connect } from "react-redux"
import { update } from "../../slices/tileSlice"

class TypeSelect extends React.Component {
	close() {
		this.props.update({
			id: this.props.tile.id,
			setting: false,
		})
	}
	set(type) {
		this.props.update({
			id: this.props.tile.id,
			type: type,
			setting: true,
		})
	}
	render() {
		return (
			<Container className="tile">
				<Row>
					<Col className="d-flex justify-content-end">
						<span className="mt-1">
							<i
								className="mi mi-ChromeClose"
								title="Close Choosing Inspiration"
								onClick={() => this.close()}
							/>
						</span>
					</Col>
				</Row>
				<Row className="content">
					<Col className="d-flex justify-content-center">
						<Button onClick={() => this.set("mantras")}>Mantra</Button>
						<Button onClick={() => this.set("quotes")}>Quote</Button>
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

export default connect(null, mapDispatchToProps)(TypeSelect)
