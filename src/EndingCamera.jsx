  //Camera.tsx
  import { OrbitControls } from "@react-three/drei";
  import { useThree } from "@react-three/fiber";
  import { useEffect, useRef } from "react";
  import { Vector3 } from "three";
  import gsap from 'gsap'

  
   const CameraControls = ({position, target, handleShowText}) => {
     //Initialize camera controls
     const {
       camera,
       gl: { domElement },
     } = useThree();
     const ref = useRef(null);

     // Determines camera up Axis
     camera.up = new Vector3(0, 1, 0);

     function cameraAnimate() {
      if (ref.current) {
        gsap.timeline().to(
          camera.position, 
          {
            duration: 3,
            repeat: 0,
            delay: 3,
            x: position.x,
            y: position.y,
            z: position.z,
            ease: "power1.inOut",

            onComplete: () => {
              handleShowText && handleShowText()
            },
        });

        gsap.timeline().to(
          ref.current.target,
          {
            duration: 3,
            repeat: 0,
            delay: 3,
            x: target.x,
            y: target.y,
            z: target.z,
            ease: "power1.inOut",
          },
          "<"
        );
      }
    }

    useEffect(() => {
      cameraAnimate();
    }, [target, position]);

     // return the controls object   
     return (
       <OrbitControls
          ref={ref}
          args={[camera, domElement]}
          rotateSpeed={0.1}
          enableZoom={false}
          enablePan={false}
       />
     );
   };

  export { CameraControls };
