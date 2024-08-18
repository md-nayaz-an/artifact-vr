import { useAtomValue } from 'jotai'
import React, { useEffect } from 'react'
import { presentationAtom, selectedNodeRefAtom } from './jotai/atoms'
import { CameraControls, PresentationControls, TransformControls } from '@react-three/drei';
import { useXRControllerState, XROrigin } from '@react-three/xr';
import { useFrame } from '@react-three/fiber';

const JoyStick = () => {
    const presentation = useAtomValue(presentationAtom);

    const selectedNodeRef = useAtomValue(selectedNodeRefAtom);

    const controller = useXRControllerState("right")
    const thumbStick = controller?.gamepad['xr-standard-thumbstick'];

    let timeAccumulator = 0;

    useFrame((_, delta) => {
        if (
            controller == null 
            || thumbStick == null
            || selectedNodeRef == null
            || !presentation
        ) return

        const rotationSpeed = 2; // Adjust the rotation speed if needed

        if (Math.abs(thumbStick.xAxis) > Math.abs(thumbStick.yAxis)) {
            // Rotate around the y-axis when x-axis input is stronger and wrap it
            selectedNodeRef.rotation.y = (selectedNodeRef.rotation.y + thumbStick.xAxis * rotationSpeed * delta) % (2 * Math.PI);
        } else {
            // Rotate around the x-axis when y-axis input is stronger and wrap it
            selectedNodeRef.rotation.x = (selectedNodeRef.rotation.x + thumbStick.yAxis * rotationSpeed * delta) % (2 * Math.PI);
        }

        /* timeAccumulator += delta;
        if (timeAccumulator >= 1) {
            console.log('Rotation:', selectedNodeRef.rotation);
            timeAccumulator = 0; // Reset the accumulator
        } */
    })

    return (
        <>
    		<XROrigin position={[0, 0, 1.5]} />
        </>
    )
}

export default JoyStick;