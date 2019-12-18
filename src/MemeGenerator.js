import React from "react";

class MemeGenerator extends React.Component{

    constructor() {

        super();
        this.state = {

            topText: null,
            bottomText: null,
            randomImg: null,
            allMemeImgs: null,

        };

        this.handleChange = this.handleChange.bind(this);
        this.randomImgFunc = this.randomImgFunc.bind(this);

    }

    componentDidMount() {

        fetch("https://api.imgflip.com/get_memes").
            then(response => response.json()).
            then(response => {

                const {memes} = response.data;
                return this.setState({allMemeImgs: memes});

        })

    }

    handleChange(event){

        const {name, value} = event.target;
        this.setState({[name]: value})

    }

    randomImgFunc(e){

        e.preventDefault();

        let randomElem = this.state.allMemeImgs[Math.floor(Math.random()*this.state.allMemeImgs.length)];
        let randomUrl = randomElem.url;

        this.setState({randomImg: randomUrl});

    }

    render() {

        return(

            <div>

                <form className="meme-form" onsubmit="return false;">

                    <input  type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange} />
                    <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handleChange} />

                    <button onClick={this.randomImgFunc} >Gen</button>

                </form>

                <div className="meme">

                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>

                </div>

            </div>

        )

    }

}

export default MemeGenerator;