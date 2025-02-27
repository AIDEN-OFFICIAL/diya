import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Tom from "./Tom";
import useSound from 'use-sound';
import song from "./public/audio/aiden-firstPage.mp3" 
const FallingHearts = () => {
  const hearts = new Array(15).fill(0); // Generate 20 hearts
  const kisses = new Array(5).fill(0);
  const [yes,setYes] = useState(false);
  const [sizeOfButton,setSizeOfButton] = useState(30);
  const [noOfClicks,setNoOfClicks] = useState(0)


   const [play,{stop}] = useSound(song);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await play(); // Attempt autoplay
        console.log("Autoplay successful!");
      } catch (err) {
        console.warn("Autoplay blocked. Retrying in 3 seconds...", err);
        setTimeout(play, 3000); // Retry after 3 seconds
      }
    };

    playAudio();

    return ()=> stop()
  }, [play]);
 

  const rejection=()=>{
    let click = noOfClicks;

    setSizeOfButton(prev=>{
        if(rejectionContent[click]==="Last chance!"){
            return prev*5
        }
        else if(!rejectionContent[click]){
          setYes(true)
        }
        else{
            return prev*1.5
        }
    })
    setNoOfClicks(prev=>prev+1)
  } 

  const rejectionContent={
    0:"NO",
    1:"Are you sure?",
    2:"Think again...",
    3:"Last chance!",
  }   
  
  return (
    <div style={{width:"100%",height:"100vh"}} className="outer-div">


        {!yes
        ?
        <div>
            <div className="text">
                Happy BirthDay Diyaamuuu...
            </div>

            <div className="question">
                <span className="question-span">Wil you</span> <span className="question-span">Let Me</span> <span className="question-span">Make</span> <span className="question-span">Your Birthday</span> <span className="question-span">Magical ?</span>
            </div>

            <div className="button-container">
                <button onClick={rejection} style={noOfClicks ? {padding:`${sizeOfButton}px`}:{}} className="button">
                    Yes
                </button>
                <button  onClick={rejection} className="button">
                   NO <br/>
                    {noOfClicks ? `(${rejectionContent[noOfClicks]})`:""}
                </button>
            </div>
        </div>
        :
        <Tom/>
        }



      

      {hearts.map((_, index) => {
        const randomX = Math.random() * 100; // Random percentage for positioning
        const randomDelay = Math.random() * 3; // Random delay for staggered effect
        return (
          <motion.div
            key={index}
            className="heart"
            style={{ left: `${randomX}%` }} // Ensures hearts stay inside container
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: "100vh", opacity: 1 }}
            transition={{
              duration: Math.random() * 2 + 3, // Random fall speed
              delay: randomDelay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        );
    })}

{kisses.map((_, index) => {
        const randomX = Math.random() * 100;
        const randomDelayKiss =  Math.random() * 10;
        const randomY = Math.random() * 100;
       
        return (
            <motion.div
              key={index}
              className="kiss"
              style={{
                position: "absolute",
                left: `${randomX}%`,
                top: `${randomY}%`,
              }}
              initial={{ scale: 0, opacity: 0 }} // Start small and invisible
              animate={{ scale: [1, 2, 1], opacity: [0, 1, 0] }} // Scaling & fading effect
              transition={{
                duration: Math.random() * 2 + 2, // Random animation duration
                delay: randomDelayKiss,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💋
            </motion.div>
        )})}

    </div>
  );
};

export default FallingHearts;
