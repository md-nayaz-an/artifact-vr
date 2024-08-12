import { useAtomValue } from 'jotai'
import React, { useEffect } from 'react'
import { presentationAtom, selectedNodeRefAtom } from './jotai/atoms'
import { CameraControls, TransformControls } from '@react-three/drei';

const Controls = () => {
    const presentation = useAtomValue(presentationAtom);

    const selectedNodeRef = useAtomValue(selectedNodeRefAtom);

    useEffect(() => {
        console.log(selectedNodeRef);
        
    }, [selectedNodeRef])


    return (
        <>
            {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
            {presentation && <TransformControls object={selectedNodeRef} mode={"rotate"} />}
            {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
            <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        </>
    )
}

export default Controls