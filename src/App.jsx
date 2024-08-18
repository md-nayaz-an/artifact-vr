import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { SoftShadows, Float, CameraControls, Sky, PerformanceMonitor } from '@react-three/drei'
import { easing } from 'maath'
import { Model1 } from './Model.jsx'
import { XR, XROrigin, createXRStore } from '@react-three/xr'
import Ui from './ui/Ui.jsx'
import { useAtomValue } from 'jotai'
import { presentationAtom } from './jotai/atoms.js'
import Controls from './joyStick.jsx'
import JoyStick from './joyStick.jsx'

function Light() {
	const ref = useRef()
	useFrame((state, delta) => {
		easing.dampE(
			ref.current.rotation,
			[(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0],
			0.2,
			delta,
		)
	})
	return (
		<group ref={ref}>
			<directionalLight position={[5, 5, -8]} castShadow intensity={5} shadow-mapSize={2048} shadow-bias={-0.001}>
				<orthographicCamera attach="shadow-camera" args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} />
			</directionalLight>
		</group>
	)
}

const store = createXRStore()

export default function App() {

	const presentation = useAtomValue(presentationAtom);

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '1rem',
					position: 'absolute',
					zIndex: 10000,
					bottom: '1rem',
					left: '50%',
					transform: 'translate(-50%, 0)',
				}}
			>
				<button
					style={{
						background: 'black',
						borderRadius: '0.5rem',
						border: 'none',
						fontWeight: 'bold',
						color: 'white',
						padding: '1rem 2rem',
						cursor: 'pointer',
						fontSize: '1.5rem',
						boxShadow: '0px 0px 20px rgba(0,0,0,1)',
					}}
					onClick={() => store.enterAR()}
				>
					Enter AR
				</button>
				<button
					style={{
						background: 'black',
						borderRadius: '0.5rem',
						border: 'none',
						fontWeight: 'bold',
						color: 'white',
						padding: '1rem 2rem',
						cursor: 'pointer',
						fontSize: '1.5rem',
						boxShadow: '0px 0px 20px rgba(0,0,0,1)',
					}}
					onClick={() => store.enterVR()}
				>
					Enter VR
				</button>
			</div>
			<Canvas shadows>
				<XR store={store}>
					<axesHelper />
					<SoftShadows />
					<CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
					<JoyStick />
					<color attach="background" args={['#d0d0d0']} />
					<ambientLight intensity={0.5} />
					<Model1/>
					<Ui />
				</XR>
			</Canvas>
		</>
	)
}

//<Sky inclination={0.52} scale={20} />