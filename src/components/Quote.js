import React from "react";

class Quote extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            quote: [],
        };
    }
    componentDidMount() {
        fetch('https://inspirational-content-api.herokuapp.com/quotes/quote')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    quote: json,
                });
            })
    }
    render() {
        const { quote } = this.state;
        return (
        <div className = "App">
            <h1> {quote.quote} </h1>
            <span> {quote.source} </span>
        </div>
    );
}
}

export default Quote;
