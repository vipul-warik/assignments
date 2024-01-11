import { useState } from 'react';
import './App.css'
import Card from './components/Card'

function App() {
  
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    "fullName": "",
    "description": "",
    "interests": [],
    "socialHandles": {"twitter": "", "linkedin": "", "github": ""},
    "id": 0,
  })

  function handleAddInterst(event) {
    if(event.key === "Enter" && event.target.value) {
      event.preventDefault();
      setFormData({...formData, interests: [...formData.interests, event.target.value]});
      event.target.value = "";
      console.log(formData);
    }
    
  }

  function handleDeleteInterest(deleteIndex) {
    const newInterests = formData.interests.filter((interest,index) => index!==deleteIndex);
    setFormData({...formData, interests: newInterests});
  }

  function handleOnChange(event) {
    setFormData({...formData, [event.target.name]:event.target.value});
  }

  function handleOnChangeSocialHandles(event) {
    setFormData({...formData, "socialHandles": {...formData.socialHandles, [event.target.name]: event.target.value}});
    console.log(formData);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit form called");
    setCards([...cards, formData]);
    setFormData({
      "fullName": "",
      "description": "",
      "interests": [],
      "socialHandles": {"twitter": "", "linkedin": "", "github": ""},
      "id": ++formData.id,
    });
    console.log(cards);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="fullName">
            Full Name: <input type="text" name="fullName" value={formData.fullName} onChange={(e) => handleOnChange(e)}/>
        </label><br/>
        <label htmlFor="description">
            Description: <input type="text" name="description" value={formData.description} onChange={(e) => handleOnChange(e)}/>
        </label><br/>
          <div>
          {formData?.interests.map((interest,index) => <span className='interest-list' key={index}>{interest} <span className='interest-list-delete-button' onClick={() => handleDeleteInterest(index)}>X</span></span>)}
          </div>
        <label htmlFor="interests">
            Interests: <input type="text" name="interests" onKeyDown={(e) => handleAddInterst(e)} />
        </label><br/>
        <label htmlFor="socialHandles">
            Social Links:
            
            Twitter <input type="text" name='twitter' value={formData.socialHandles.twitter} onChange={(e) => handleOnChangeSocialHandles(e)} ></input>
            LinkedIn <input type="text" name='linkedin' value={formData.socialHandles.linkedin} onChange={(e) => handleOnChangeSocialHandles(e)}></input>
            GitHub <input type="text" name='github' value={formData.socialHandles.github} onChange={(e) => handleOnChangeSocialHandles(e)}></input>
      
        </label><br/>
        <button type='submit'>Create</button>
      </form>


      <div>
        {
          cards?.map(card => (
            <Card key={card.id} fullName={card.fullName} description={card.description} interests={card.interests} socialHandles={card.socialHandles}/>
          ))
        }
      </div>

      
    </div>
  )
}

export default App
