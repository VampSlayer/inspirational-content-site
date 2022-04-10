import { useSelector } from "react-redux"

import Tile from "../components/Tile"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function App() {
	const allTiles = useSelector((state) => state.tile.value)
	const rows = [
		allTiles.slice(0, 6),
		allTiles.slice(6, 12),
		allTiles.slice(12, 18),
	]

	const getTiles = (tiles) =>
		tiles.map((tile) => (
			<Col key={`col-${tile.id}`}>
				<Tile key={`tile-${tile.id}`} tile={tile} />
			</Col>
		))

	const getRows = (rows) =>
		rows.map(
			(row, index) =>
				row.length > 0 && <Row key={`row-${index}`}>{getTiles(row)}</Row>
		)

	return <Container fluid>{getRows(rows)}</Container>
}

export default App
