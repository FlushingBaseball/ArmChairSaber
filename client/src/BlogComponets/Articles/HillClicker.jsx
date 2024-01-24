import React, { useState } from 'react';

export default function HillClicker () {

  const [imageIndex, setImageIndex] = useState(0);
  // const [teamIndex, setTeamIndex] = useState(0)
  const [jump, setJump] = useState(false);

  const images = [
    "./Images/RichHill/hill1.jpg",
    "./Images/RichHill/hill2.jpg",
    "./Images/RichHill/hill3.jpg",
    "./Images/RichHill/hill4.jpg",
    "./Images/RichHill/hill5.jpg",
    "./Images/RichHill/hill6.jpg",
    "./Images/RichHill/hill7.jpg",
    "./Images/RichHill/hill8.jpg",
    "./Images/RichHill/hill9.jpg",
    "./Images/RichHill/hill10.jpg",
    "./Images/RichHill/hill11.jpg",
    "./Images/RichHill/hill12.jpg",
    "./Images/RichHill/hill13.jpg",
    "./Images/RichHill/hill14.jpg",
    "./Images/RichHill/hill15.jpg",
    "./Images/RichHill/hill16.jpg",
    "./Images/RichHill/hill17.jpg",
  ];


//   const teams = {
//     "Athletics" :
//     "Ducks":
//     "Dodgers":
//     "Pirates":
//     "PawSox":
//     "Twins":
//     "Cleveland":
//     "Padres":
//     "Cubs":
//     "Yankees":
//     "Sox's again":
    
// }

  const changeImage = () => {
    // Update the imageIndex to the next one in the array, or go back to the first image if it reaches the end
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setJump(true);
    setTimeout(() => setJump(false), 500);
  };

  return (
    <div className='Wrapper-hill'>
      <h2 className='hill-header' >Has Rich been on your team?</h2>
      <h3 className='hill-header'>Keep clicking to find out!</h3>
      <img
        className={jump ? "jump" : null}
        id='hill'
        src={images[imageIndex]}
        alt={`Image ${imageIndex + 1}`}
        onClick={changeImage}
      />
      {/* <span>{team}</span> */}
    </div>
  );
};


