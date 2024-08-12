import React from 'react'
import { Card } from '../components/apfel/card'
import { Container, Text } from '@react-three/uikit'
import { useAtomValue } from 'jotai'
import { nodeDetailsAtom } from '../jotai/atoms'

const MainView = () => {
	const { title, description } = useAtomValue(nodeDetailsAtom)

    return (
        <Card
            width="60%"
            height="100%"
            backgroundOpacity={0.7}
            flexDirection="column"
            alignItems="stretch"
            padding={32}
            gap={2}
        >
            <Container height="20%">
                <Text fontSize={52} fontWeight="bold">{ title || "title" }</Text>
            </Container>
            <Container flexGrow={1} minHeight={40} height="auto" flexDirection="row">
                <Text fontSize={48} textAlign="left" verticalAlign="top">
                    { description || "description" }
                </Text>
            </Container>
        </Card>
    )
}

export default MainView