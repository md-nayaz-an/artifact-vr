import { Container, Root, Text } from "@react-three/uikit"
import { Card } from "./components/apfel/card.tsx"
import { Button } from "./components/apfel/button"
import { RotateCcw } from "@react-three/uikit-lucide"
import { useState } from "react"


const Ui = ({ title, description }) => {

	const [state, setState] = useState(false)

    return (
		<group
			position={[1, 1, 0]}
		>
			<Root
				anchorX={"left"}
				anchorY={"center"}
				sizeX={2}
				sizeY={1}
			>
				<Card
					width="90%" 
					height="100%"
					backgroundOpacity={0.7}
					flexDirection="column"
					alignItems="stretch"
					padding={5}
					gap={2}
				>
					<Container height="20%">
						<Text fontSize={8} fontWeight="bold">{ title || "title" }</Text>
					</Container>
					<Container flexGrow={1} minHeight={40} height="auto" flexDirection="row">
						<Text fontSize={6} textAlign="left" verticalAlign="top">
							{ description || "description" }
						</Text>
					</Container>
				</Card>
				<Container
					width="20%"
					flexDirection="column"
					paddingX={2}
					gap={2}
				>
					<Button
						onClick={() => setState(!state)}
						{...buttonStyle}
					>
						<RotateCcw color="white"/>
					</Button>

					<Button
						{...buttonStyle}
					>
						<RotateCcw />
					</Button>

					<Button
						{...buttonStyle}
					>
						<RotateCcw />
					</Button>

				</Container>
			</Root>
		</group>
    )
}

export default Ui