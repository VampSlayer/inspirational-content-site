import React from "react";

class Mantra extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            mantra: [],
        };
    }
    componentDidMount() {
        fetch('https://inspirational-content-api.herokuapp.com/mantras/mantra')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    mantra: json,
                });
            })
    }
    render() {
        const { mantra } = this.state;
        return (
        <div className = "App">
            <h1> {mantra.mantra} </h1>
        </div>
    );
}
}

export default Mantra;
