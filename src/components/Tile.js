import TileContent from "./content/TileContent"
import TileSetting from "./settings/TileSetting"

function Tile(props) {
	return props.tile.setting ? <TileSetting tile={props.tile} /> : <TileContent tile={props.tile} />
}

export default Tile
