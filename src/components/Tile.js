import Mantra from './Mantra'
import Quote from './Quote'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'

function Tile() {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Mantra />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Quote />
                </Col>
            </Row>
        </Container>
    )
}

export default Tile;
