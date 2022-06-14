import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



// initiate the api and create an object of it
const app = new Clarifai.App({apiKey: YOUR CLARIFAI API KEY GOES HERE});



class App extends Component {
    constructor() {
      super();
      this.state = {
        input: '',
        imageUrl: '',
        // this box is a JS object which will contain the values 
        // we receive for the face detection model
        box: {},
        route: 'signin',
        isSignedIn: false
      }
    }

    calculateFaceLocation = (data) => {
      // face inputs here
      const clarifaiFace = data.outputs[0].data.regions[0].region_info_bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.leftCol * width,
        topRow: clarifaiFace.topRow * height,
        rightCol: width - (clarifaiFace.rightCol * width),
        bottomRow: height - (clarifaiFace.bottomRow * height)
      }
    }

    displayFaceBox = (box) => {
      this.setState({box: box})
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value})
    };

    onButtonSubmit =() => {
      this.setState({imageUrl: this.state.input})
      app.models
        .predict
          (Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err))
    }

    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }


    render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn = {isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'
        ?  <div>
            <Logo />
            <Rank />
            <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit = {this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
