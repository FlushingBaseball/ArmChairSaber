import React, { useState } from 'react';

export default function HillClicker () {

  const [imageIndex, setImageIndex] = useState(0);
  // const [teamIndex, setTeamIndex] = useState(0)
  const [jump, setJump] = useState(false);

  const images = [
    "./Images/RichHill/hill1.png",
    "./Images/RichHill/hill2.webp",
    "./Images/RichHill/hill3.jpg",
    "./Images/RichHill/hill4.webp",
    "./Images/RichHill/hill5.webp",
    "./Images/RichHill/hill6.webp",
    "./Images/RichHill/hill7.webp",
    "./Images/RichHill/hill8.jpg",
    "./Images/RichHill/hill9.webp",
    "./Images/RichHill/hill10.webp",
    "./Images/RichHill/hill11.webp",
    "./Images/RichHill/hill12.webp",
    "./Images/RichHill/hill13.jpg",
    "./Images/RichHill/hill14.jpg",
    "./Images/RichHill/hill15.webp",
    "./Images/RichHill/hill16.jpg",
    "./Images/RichHill/hill17.webp",
    "./Images/RichHill/hill18.webp",
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


