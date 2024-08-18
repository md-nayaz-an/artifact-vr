import { useSpring, a } from "@react-spring/three";
import { Edges, Outlines, PresentationControls, Select, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Ui from "./ui/Ui";
import { useAtomValue, useSetAtom } from "jotai";
import { nodeDetailsAtom, presentationAtom, rotateAtom, scalingAtom, selectedNodeAtom, selectedNodeRefAtom } from "./jotai/atoms";
import columnData from "./data";

const columns = 1;
const parts = 5;

export function Model1() {

	const { nodes, materials } = useGLTF("/greek_column_1.glb");

    const selectedNode = useAtomValue(selectedNodeAtom);

	const scaling = useAtomValue(scalingAtom)

	const { scale } = useSpring({
		scale: scaling ? 0.5 : 1,
		config: { duration: 200 },
	});

	return (
		<>
			<a.mesh scale={scale}>
				{Array.from({ length: columns }, (_, colIndex) =>
					Array.from({ length: parts }, (_, partIndex) => {
					const nodeName = `column_${colIndex + 1}_part_${partIndex + 1}`;
					const node = nodes[nodeName];
					return (
						node && node.type === 'Mesh' && (
							<Singular
								key={nodeName}
								selectedNode={selectedNode}
								nodeName={nodeName}
								material={materials.textureMap}
								node={node}
							/>
						)
					);
					})
				)}
			</a.mesh>
		</>
	)
}

const Singular = ({ node, nodeName, material, selectedNode }) => {

	const { position } = useSpring({
		position:
			selectedNode == nodeName
				? [0, 1, 0]
				//: [node.position.x - 2, 3, 1],
				: [node.position.x, node.position.y, node.position.z - 2],
		config: { duration: 500 },
	});

	const [rotateY, setRotateY] = useState(node.rotation.y)

	const rotate = useAtomValue(rotateAtom);
	const setSelectedNodeRef = useSetAtom(selectedNodeRefAtom);

	useFrame(({ clock }) => {
		const a = clock.getElapsedTime() % (2 * Math.PI);
		if(rotate && selectedNode == nodeName)
			setRotateY(a)
	});

	const ref =	useRef();

	useEffect(() => {
		if(selectedNode === nodeName)
			setSelectedNodeRef(ref.current)

		if(selectedNode !== nodeName)
			setRotateY(node.rotation.y);
	}, [selectedNode])

	return(
		<a.mesh
			castShadow
			receiveShadow
			geometry={node.geometry}
			material={material}
			position={position}
			rotation={[node.rotation.x, rotateY, node.rotation.z]}
			scale={node.scale}
			onClick={() => console.log()}
			ref={ref}
		/>
	)
}