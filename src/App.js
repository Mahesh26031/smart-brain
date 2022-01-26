import './App.css';
import Navigation from './components/Navigator/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Face from './components/Face/Face';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import { Component } from 'react';
import Signin from './components/SIgnin/Signin';
import Register from './components/Register/Register';



const particlesInit = (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
  console.log(container);
};

const intialstate={
    input : '',
    imageurl :'',
    box: [],
    route: 'signin',
    issignedin: false,
    user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
    }
  }



class App extends Component {

  constructor(){
    super();
    
    this.state=intialstate
  }

  loadUser=(data)=>{
    this.setState({user: {
      id: data.id,
      name: data.firstname,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
    console.log(this.state.user);
    
  }
  

 Facelocation = (data) =>{
    const a=data.outputs[0].data.regions;
    const image= document.getElementById('inputimage');
    const b = Number(image.width);
    const c = Number(image.height);
    const box = a.map(region => {

  
    return({
      leftCol : region.region_info.bounding_box.left_col * b,
      topRow : region.region_info.bounding_box.top_row*c,
      rightCol : b -(region.region_info.bounding_box.right_col*b),
      bottomRow : c-(region.region_info.bounding_box.bottom_row* c)
      

    })
 });
 return box;
}

 displayFaceBOx =(box)=>{
   this.setState({box: box});
 }




  onInputChange =(event)=>{
   this.setState({input : event.target.value});

  }

  onSubmit =()=>{
    this.setState({imageurl : this.state.input});
    fetch('https://floating-caverns-78427.herokuapp.com/imageURL',{
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        input : this.state.input

    })
  }).then(response=>response.json())
    .then(response=> {
      if(response)
      {
        fetch('https://floating-caverns-78427.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            id : this.state.user.id
    
        })

      }).then(response=>response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user,{entries: count}))
      })
    }
      this.displayFaceBOx (this.Facelocation(response))
    })
    .catch(err=>console.log(err))

  }

  onRouteChange =(route)=>{
    if(route==='signout'){
      this.setState(intialstate)
    }
    else if(route==='home')
    {
      this.setState({issignedin: true})
    }
    this.setState({route : route})
  }




  render() {
  return (
    <div className="App">
     <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 1,
              opacity: 0.3,
              size: 10,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#fff",
          },
          links: {
            color: "#fff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1.1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 130,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 1.5,
          },
        },
        detectRetina: true,
      }}
    />
    

<Navigation issignedin={this.state.issignedin} onRouteChange={this.onRouteChange} />
{ this.state.route === 'home'
  ? <div>
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLink
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
      />
      <Face box={this.state.box} imageurl={this.state.imageurl} />
    </div>
  : (
     this.state.route === 'signin'
     ? <Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
     : <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>
    )
}
</div>
);
}
}

export default App;
