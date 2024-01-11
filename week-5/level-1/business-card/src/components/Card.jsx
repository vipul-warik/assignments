import React from 'react'

const Card = ({fullName, description, socialHandles, interests}) => {
    
    const nameForProfile = fullName.split(" ").join("+");

  return (
    <div>
        <img src={`https://ui-avatars.com/api/?name=${nameForProfile}`} alt="profile-pic" className='profile-pic' />
        <h1>{fullName}</h1>
        <p>{description}</p>
        <h3>Interests</h3>
        <ul className='no-bullets'>
        {
            interests?.map((interest,index) => (
                <li key={index}>
                    {interest}
                </li>
            ))
        }
        </ul>
        <span>      
        {
            Object.keys(socialHandles).map((socailHadle,index) => (
                <a key={index} href={socialHandles?.socailHadle} target="_blank">
                        <button>{socailHadle}</button>
                    </a>
            ))

        }

        </span>
    </div>
  )
}

export default Card