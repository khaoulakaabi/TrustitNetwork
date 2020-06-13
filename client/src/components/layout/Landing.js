import React from 'react';
import { Jumbotron ,Container ,Button} from 'reactstrap';
import innovation2 from './images/innovation2.jpg'
import background from './images/background.jpg'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import content from './content'
import BackgroundImage from 'react-background-image-loader';

 class Landing extends React.Component {
  render() {
  return (
      <div>
      <BackgroundImage className="bg" src={innovation2} width= "1000" height="900" >
        <div className="page pt-4 pb-4">
  
        <Container>
        <Jumbotron style={{ marginTop: "100px" }} >
        <Container fluid>
          <h1 className="title">TrustiT Network</h1>
        <p className="lead">Nous rapprochons les entrepreneurs et investisseurs</p>
        <p> est une plateforme de mise en relation entre des bailleurs des fonds et investisseurs locaux et internationaux et de porteurs de projets.
            Cette plateforme offre un espace de formation d’entrepreneuriat et d’offert des outils des startups.</p>
       <Button className="bouton2" href="/Home/investors" >
          Espace Investisseurs
      </Button> 
      </Container>
      </Jumbotron>
      </Container>
</div>
<br></br><br></br><br></br><br></br><br></br>
</BackgroundImage>
<div className="container features">
  <div className="row">
    <div className="col-md-6 col-sm-6 col-xs-12">
      <h2>Projets</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
      <Button className="bouton" href="/projects" >
           Consulter
      </Button> 
    </div>
    <div className="col-md-6 col-sm-6 col-xs-12">
      <h2>Clubs</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
      <Button className="bouton" href="/clubs" >
           Consulter
      </Button> 
    </div>
  </div>
</div>

<Slider autoplay={1000} >

	{content.map((item, index) => (
		<div key={index}>
  <BackgroundImage src={background} >
   <Container>
			<div className="slide-item">
				<h2>{item.head}</h2>
        <h4>{item.title}</h4>
				<p>{item.description}</p>
				<button className= "bouton" href>{item.button}</button>
			</div>
      </Container>
    </BackgroundImage>
		</div>
  ))}
</Slider>
</div>);
} }
export default Landing; 