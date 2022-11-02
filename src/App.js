import React, { Fragment, useState, useEffect } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'
import { use } from 'chai'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(null)
  const [ slideDuration ] = useState(3000);

  useEffect(()=>{
    let myInterval = null;
    if(slideTimer){
      myInterval = setInterval(()=>{
        if(activeIndex === catalogs.length -1){
          setActiveIndex(0);
        } else {
          setActiveIndex(activeIndex +1 );
        }
      }, 3000);
    } else{
      clearInterval(myInterval);
    }
    return () => clearInterval(myInterval);
  },[slideTimer, activeIndex]);

  const getIndex =(value) => {
    setActiveIndex(value);
  }

  const moveBackward =() => {
    console.log(catalogs, 'catalogs', activeIndex);
    if(activeIndex === 0){
      setActiveIndex(catalogs.length -1 );
    } else {
      setActiveIndex(activeIndex -1 );
    }
  }

  const moveForward =() => {
    if(activeIndex === catalogs.length -1){
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex +1 );
    }
  }

  const runSlider =(e) => {
    let isChecked = e.target.checked;
    setSlideTimer(isChecked);
  }

  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              className="icon-only outlined"
              data-testid="prev-slide-btn"
              onClick={() => moveBackward()}
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex } 
                getClickedThumbIndex={(value) => getIndex(value)}
              />
            <button 
              className="icon-only outlined"
              data-testid="next-slide-btn"
              onClick={() => moveForward()}
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onChange={(e) => runSlider(e)}
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

