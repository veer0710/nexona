import React from 'react'
import { Star } from '@mui/icons-material';
import { StarHalf } from '@mui/icons-material';
import { StarOutline } from '@mui/icons-material';

function StarRating(props) {

    const averageRating = props.Rating;
    const stars = []
    const Fontsize = props.Fontsize
    
    for(let i = 1; i<=5; i++){
        if(i <= Math.floor(averageRating)){
            stars.push(<Star key={i} id={Fontsize} />)
        }
        else if(i === Math.ceil(averageRating) && averageRating % 1 === !0){
            stars.push(<StarHalf key={i} id={Fontsize}/>)
        }
        else{
            stars.push(<StarOutline key={i} id={Fontsize}/>)
        }
    }

  return (
    <>
    <p id={props.ID}>{stars}</p>
    </>
  )
}

export default StarRating