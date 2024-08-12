import { Container, Root, Text } from "@react-three/uikit"
import { Card } from "../components/apfel/card.tsx"
import { Button } from "../components/apfel/button.tsx"
import { RotateCcw, Torus } from "@react-three/uikit-lucide"
import { useState } from "react"
import { useThree } from "@react-three/fiber"
import { nodeDetailsAtom, presentationAtom, rotateAtom } from "../jotai/atoms.js"
import { useAtom, useAtomValue } from "jotai"
import MainView from "./mainView.jsx"
import RightBar from "./rightBar.jsx"
import LeftBar from "./leftBar.jsx"


const Ui = () => {
	const aspectRatio = useThree(({ size }) => size.width / size.height);

    return (
		<group
			position={[1, 1, 0]}
			scale={Math.min(1, aspectRatio * 0.7) / 1200}
		>
			<Root
				anchorX={"left"}
				anchorY={"center"}
				sizeX={1824}
				sizeY={796}
				pixelSize={1}
			>
				<LeftBar />
				<MainView />
				<RightBar />
			</Root>
		</group>
    )
}

export default Ui