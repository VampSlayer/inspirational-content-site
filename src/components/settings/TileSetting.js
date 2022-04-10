import FeedSelect from './FeedSelect'
import TypeSelect from './TypeSelect'

function TileSetting(props) {
	return props.tile.type ? <FeedSelect tile={props.tile} /> : <TypeSelect tile={props.tile} />
}

export default TileSetting
