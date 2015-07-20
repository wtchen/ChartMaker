var currentColorIndex = 0;
var colors = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"];
var highlights = ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"];

var Items = React.createClass({
   render: function() {
       var myItems = this.props.items;
       var myColors = this.props.colors;
       var myVals = this.props.vals;
       var listItems = function(text, index) {
           return <li key={index + text} style={{color: myColors[index]}}>{text} (value: {myVals[index]})</li>;
       };
       return <ul>{this.props.items.map(listItems)}</ul>
   }
});

var Input = React.createClass({
    getInitialState: function () {
        return {items: [], text: "", colors: [], val: 0, vals: []};
    },
    onChangeFieldName: function(e) {
        this.setState({text: e.target.value});
    },
    onChangeFieldVal: function(e) {
        this.setState({val: e.target.value});
    },
    onSubmit: function(e) {
        e.preventDefault();
        // remove myChart canvas to properly clear canvas (can't use clearRect with Chart JS)
        $("#myChart").remove();
        $("#canvasDiv").append("<canvas id=\"myChart\" width=\"300\" height=\"300\"></canvas>");
        var ctx = $("#myChart").get(0).getContext("2d");
        var newItems = this.state.items.concat([this.state.text]);
        var newText = "";
        var newColors = this.state.colors.concat(colors[currentColorIndex % 4]);
        var newVals = this.state.vals.concat([this.state.val]);
        this.setState({items: newItems, text: newText, colors: newColors, val: this.state.val, vals: newVals});
        var pieData = [];
        for (var i = 0; i < newVals.length; ++i) {
            pieData.push({
                value: parseFloat(newVals[i].replace(/,/g,'')),
                color: newColors[i],
                highlight: highlights[i%4],
                label: newItems[i]
            });
        }
        var myPieChart = new Chart(ctx).Pie(pieData);
        currentColorIndex++;
    },
    render: function() {
        var myItems = this.state.items;
        var myColors = this.state.colors;
        return (
            <div id="chartApp">
                <Items items={this.state.items} colors={this.state.colors} vals={this.state.vals}/>
                <form className="form-inline" role="form" id="chartForm" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="fieldname">Field: </label>
                        <input type="fieldname" className="form-control" id="fieldname" onChange={this.onChangeFieldName} value={this.state.text} />
                    </div>
                    <div className="form-group">
                        <label for="fieldval">Value: </label>
                        <input className="form-control" id="fieldval" onChange={this.onChangeFieldVal} value={this.state.value} />
                    </div>
                    <button type="submit" className="btn btn-default">{"Add"}</button>
                </form>
            </div>
        );
    }
});

React.render(<Input/>, $("#myInput")[0]);