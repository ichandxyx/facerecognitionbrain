import React , {Component} from 'react';
import Particles from 'react-particles-js';import Navigation from './components/Navigation/Navigation.js';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
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
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }
  }

loadUser=(data)=>{
  this.setState({user:{
    id:data.id,
    name:data.name,
    emai:data.email,
    entries:data.entries,
    joined:data.joined
  }})
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
    .then(response => {
      console.log(this.state.user.id);
      if(response){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id

          })
        })
        .then(response=>response.json())
        .then(count=>{
             this.setState(Object.assign(this.state.user, { entries: count}))
        })
      }
      this.displayFaceBox(this.FaceLocation(response))
    })
    .catch(err=> console.log(err));
  
}
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn:false})
    }
    else if(route==='home'){
    this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  render(){
    const {isSignedIn, imageUrl, route, box,name,entries}= this.state;
  return (
    <div className="App">
        {/*<Particles className='particles'
                    params={particlesOptions} 
        />*/}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        { route==='home'
          ? <div>
              <Logo/>
              <Rank name={name} entries={entries}/>
              <ImageLinkForm 
               onInputChange={this.onInputChange}
               onButtonSubmit={this.onButtonSubmit}
              /> 
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
            route==='signin'
            ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
          
          
      }
    </div>
  );
}
}

export default App;
