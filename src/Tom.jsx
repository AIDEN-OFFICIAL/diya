import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import giffy from "/images/giphy.gif"
const Tom = () => {

    const [popup,setPopup] = useState(false)
    const [value,setValue] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
       let timer= setTimeout(()=>{
            setPopup(true)
        },5000)

        return ()=>clearTimeout(timer)
    },[])

    const submit=()=>{
        if(value!=="june27"){
            setValue("try Once more...")
            setTimeout(()=>{
                setValue("")
            },2000)
        }

        if(value==="june27"){
            navigate('/home',{state:{isValueCorrect:true}})
        }
    }

  return (
    <div  className="fallingHeart-tom" style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center"}}>
     {!popup
        ?<p className="tom-waiting-message">Wait for it...</p>
        :<div className='question'>
            {
                value==="try Once more..."
                ?<img src={giffy} style={{width:"60px",marginBottom:"20px", borderRadius:"50%"}}/>
                :<p>Day of our first Kiss? (month&day)</p>
            }
            <input value={value} onChange={(e)=>setValue(e.target.value)} type="text" />
            <button onClick={submit}>submit</button>
        </div>
     }
      <img
      src="https://i.giphy.com/5dUllWbKVlaqmMTvHb.webp"
      width="100%"
      height="300px"
      style={{width:"100%",height:"100vh",objectFit:"cover"}}
      frameBorder="0"
      allowFullScreen
      title="Tom and Jerry GIF"
      />
  </div>
  )
}

export default Tom
