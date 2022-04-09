import Mantra from './Mantra'
import Quote from './Quote'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from "react";

// should the tile hold the contents and be passed down as a prop?
// also tile will decied the content
class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: {}
        };
    }
    async componentDidMount() {
        const res = await fetch('https://inspirational-content-api.herokuapp.com/quotes/quote');
        //const res = await fetch('https://inspirational-content-api.herokuapp.com/mantras/mantra');
        const json = await res.json();
        this.setState({
            content: json,
        });
    }
    render() {
        const content = this.state.content;
        return (
            <Container fluid className="tile">
                <Row>
                    <Col className="d-flex justify-content-between">
                        <i className="mi mi-Remove" title="Remove Inspiration"/>
                        <span className="mt-3">
                            <i className="mi mi-Add" title="Add Inspiration"/>
                            <i className="mi mi-Settings" title="Configure Inspiration"/>
                        </span>
                    </Col>
                </Row>
                <Row className="content">
                    <Col className="d-flex justify-content-center">
                        <Quote content={content}/>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <i className="mi mi-Refresh" title="Refresh Inspiration"/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Tile;
