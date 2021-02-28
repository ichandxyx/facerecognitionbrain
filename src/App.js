import React , {Component} from 'react';
import Particles from 'react-particles-js';import Navigation from './components/Navigation/Navigation.js';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
const app = new Clarifai.App({
  apiKey: '899fc8a19c7d4d1fb836f3bc96c53365'
});

const particlesOptions={
 /* particles: {
    value:60,
    density:{
      enable:true,
      value_area: 800

    }
  }*/
}

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box: {},
    }
  }

FaceLocation=(data)=>{
  const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
  const image=document.getElementById('inputimage');
  const width=Number(image.width);
  const height=Number(image.height);
  return {
    leftcol:clarifaiFace.left_col * width,
    topRow:clarifaiFace.top_row * height,
    rightcol:width-(clarifaiFace.right_col*width),
    bottomRow:height-(clarifaiFace.bottom_row*height)
  }

}
  displayFaceBox=(box)=>{
    console.log(box);
    this.setState({box:box});
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }


  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL ,
        this.state.input
      )
    .then(response => this.displayFaceBox(this.FaceLocation(response)))
    .catch(err=> console.log(err));
  }


  render(){
  return (
    <div className="App">
        {/*<Particles className='particles'
                    params={particlesOptions} 
        />*/}
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
         onInputChange={this.onInputChange}
         onButtonSubmit={this.onButtonSubmit}
        /> 
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
  );
}
}

export default App;
