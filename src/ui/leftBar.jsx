import { Container, Text } from '@react-three/uikit'
import React from 'react'
import { Card } from '../components/apfel/card'
import { Button } from '../components/apfel/button'
import { Torus } from '@react-three/drei'
import columnData from '../data'
import { useAtom, useSetAtom } from 'jotai'
import { nodeDetailsAtom, selectedNodeAtom } from '../jotai/atoms'

const LeftBar = () => {

    const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);

	const setNodeDetails = useSetAtom(nodeDetailsAtom);

    const handleClick = (nodeName) => {
		setSelectedNode(prev => {
			if(prev == nodeName) {
				setNodeDetails({
					title: "",
					description: "",
				})
				return ""
			} else {
				setNodeDetails({
					title: columnData[nodeName]?.title,
					description: columnData[nodeName]?.description,
				})
				return nodeName
			}
		});
	}
    return (
        <Container
            width="20%"
            height="100%"
            flexDirection="column"
            paddingX={5}
            gap={5}
        >
        {
            Object.keys(columnData).map((columnName, index) => (
                <Card
                    key={index}
                    width="100%"
                    height="15%"
                    backgroundOpacity={selectedNode === columnName ? 0.3 : 0.7}
                >
                    <Button
                        onClick={() => handleClick(columnName)}
                        width="100%"
                        height="100%"
                        backgroundColor="#000"
                        padding={32}
                        platter
                    >
                        <Text fontSize={28} fontWeight="bold">{columnName}</Text>
                    </Button>
                </Card>
            ))
        }
            
        </Container>
    )
}

export default LeftBar