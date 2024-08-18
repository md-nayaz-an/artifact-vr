import { Container } from "@react-three/uikit"
import { Card } from "../components/apfel/card"
import { Button } from "../components/apfel/button"
import { RotateCcw, Scaling, Torus } from "@react-three/uikit-lucide"
import { useAtom } from "jotai"
import { rotateAtom, presentationAtom, scalingAtom } from "../jotai/atoms"
import { useEffect } from "react"

const RightBar = () => {

    const [rotate, setRotate] = useAtom(rotateAtom)
	const [presentation, setPresentation] = useAtom(presentationAtom)
	const [scaling, setScaling] = useAtom(scalingAtom)

    return(
        <Container
            width="15%"
            height="100%"
            flexDirection="column"
            justifyContent="space-between"
            paddingX={5}
            gap={2}
        >
            <Card
                width="100%"
                height="33%"
                backgroundOpacity={presentation ? 0.3 : 0.7}
            >
                <Button
                    onClick={() => {
                        setPresentation(!presentation)
                        setRotate(!rotate)
                    }}
                    width="100%"
                    height="100%"
                    backgroundColor="#000"
                    padding={32}
                    platter
                >
                    <Torus height="50%" width="50%" color="white"/>
                </Button>
            </Card>

            <Card
                width="100%"
                height="33%"
                backgroundOpacity={rotate ? 0.3 : 0.7}
            >
                <Button
                    onClick={() => {
                        setRotate(!rotate)
                        setPresentation(!presentation)
                    }}
                    width="100%"
                    height="100%"
                    backgroundColor="#000"
                    padding={32}
                    platter
                >
                    <RotateCcw height="50%" width="50%" color="white"/>
                </Button>
            </Card>

            <Card
                width="100%"
                height="33%"
                backgroundOpacity={scaling ? 0.3 : 0.7}
            >
                <Button
                    onClick={() => setScaling(!scaling)}
                    width="100%"
                    height="100%"
                    backgroundColor="#000"
                    padding={32}
                    platter
                >
                    <Scaling height="50%" width="50%" color="white"/>
                </Button>
            </Card>

        </Container>
    )
}

export default RightBar;