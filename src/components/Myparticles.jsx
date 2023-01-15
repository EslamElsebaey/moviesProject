
import React from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


export default function Myparticles() {

    const particlesInit = async (main) => {
        
        await loadFull(main);
      };
    
      const particlesLoaded = (container) => {
        // console.log(container);
    }

    return (
      <>
        <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        "fullScreen": {
            "enable": true,
            "zIndex": -1
        },
        "fpsLimit": 120,
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fff",
                "animation": {
                    "enable": true,
                    "speed": 10,
                    "sync": true
                }
            },
            "opacity": {
                "value": 0.5
            },
            "size": {
                "value": {
                    "min": 0.1,
                    "max": 3
                }
            },
            "links": {
                "enable": true,
                "distance": 100,
                "color": "#ffffff",
                "opacity": 0.8,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "outModes": {
                    "default": "out"
                }
            }
        },
        "interactivity": {
            "events": {
                "onHover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onClick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "quantity": 4
                }
            }
        },
        "detectRetina": true,
        "background": {
            "color": "#0C2738"
        }
    }}
    />
   
   
      </>
      
    )
}