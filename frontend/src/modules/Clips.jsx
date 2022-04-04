import React from "react";
import '../styles/Clips.css'

// eslint-disable-next-line react/prop-types
export function Clip({title, link_enabled, link, color_idx}){
    const colors=['green','yellow', 'deep-green',  'beige']
    const name = "clip "+colors[color_idx]
    var clip_text = <div />
    if (link_enabled)
        clip_text = <a className="clip-text" href={link}> {title}</a>
    else 
        clip_text = <div className="clip-text"> {title}</div>
        

    return (
        <div className={name}>
            {clip_text}
        </div>
    )

}

// eslint-disable-next-line react/prop-types
export function ClipTray({clips}){

    return (
        <div className="clip-tray">
            {
            // eslint-disable-next-line react/prop-types
            clips.map((clip)=>(
                <Clip key = {clip} title={clip.title} link_enabled={clip.link_enabled} link = {clip.link} color_idx ={clip.color_idx} />
            ))}
        </div>
    )

}