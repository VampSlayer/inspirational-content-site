import { useSelector } from "react-redux"

import Tile from "../components/Tile"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function App() {
	const allTiles = useSelector((state) => state.tile.value)
	const rows = [allTiles.slice(0, 6)]

	const secondRow = allTiles.slice(6, 12)
	if (secondRow.length) rows.push(secondRow)

	const thirdRow = allTiles.slice(12, 18)
	if (thirdRow.length) rows.push(thirdRow)

	const getTiles = (tiles) =>
		tiles.map((tile) => (
			<Col
				key={`col-${tiles.length - 1}-${tile.id}`}
				className={`tile-${tiles.length - 1}`}
			>
				<Tile key={`tile-${tile.id}`} tile={tile} />
			</Col>
		))

	const getRows = (rows) =>
		rows.map(
			(row, index) =>
				row.length && (
					<Row
						key={`row-${rows.length}-${index}`}
						className={`row-${rows.length}`}
					>
						{getTiles(row)}
					</Row>
				)
		)

	return (
		<Container fluid>
			<Row>
				<Col className="d-flex justify-content-center">
					<span className="heading">
						Inspire <i className="mi mi-Lightbulb" /> Me{" "}
						<span className="by-me">by VampSlayer aka Sayam Hussain</span>
					</span>
				</Col>
			</Row>
			{getRows(rows)}
			<Row>
				<Col className="d-flex justify-content-center">
					<span className="by-me">
						<a href="https://github.com/VampSlayer/inspirational-content-site">
							Check it out on GitHub
						</a>
					</span>
				</Col>
			</Row>
		</Container>
	)
}

export default App
