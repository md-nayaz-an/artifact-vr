import { useSpring, a } from "@react-spring/three";
import { Edges, Outlines, Select, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Ui from "./Ui";

const columns = 1;
const parts = 5;

const columnData = {
	"column_1_part_1": {
		title: "column_1_part_1",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	"column_1_part_2": {
		title: "column_1_part_2",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	"column_1_part_3": {
		title: "column_1_part_3",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	"column_1_part_4": {
		title: "column_1_part_4",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	"column_1_part_5": {
		title: "column_1_part_5",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	}
};


export function Model1() {

	const { nodes, materials } = useGLTF("/greek_column_1.glb");

	const [hover, setHover] = useState("");
	const [click, setClick] = useState("");
	
	const handleClick = (nodeName) => {
		setClick(prev => prev == nodeName ? "" : nodeName);
	}

	return (
		<>
			<group scale={1}>
				{Array.from({ length: columns }, (_, colIndex) =>
					Array.from({ length: parts }, (_, partIndex) => {
					const nodeName = `column_${colIndex + 1}_part_${partIndex + 1}`;
					const node = nodes[nodeName];
					return (
						node && node.type === 'Mesh' && (
							<Singular
								key={nodeName}
								hover={hover}
								click={click}
								nodeName={nodeName}
								material={materials.textureMap}
								setHover={setHover}
								setClick={setClick}
								node={node}
								handleClick={handleClick}
							/>
						)
					);
					})
				)}
			</group>
			{
//				click !== "" &&
				<Ui
					//title={columnData[click].title}
					//description={columnData[click].description}
				/>
			}
		</>
	)
}

const Singular = ({ node, nodeName, material, hover ,setHover, click, setClick, handleClick }) => {

	const { position } = useSpring({
		position:
			click == nodeName
				? [0, 1, 0]
				//: [node.position.x - 2, 3, 1],
				: [node.position.x, node.position.y, node.position.z - 1],
		config: { duration: 500 },
	});

	const [rotateY, setRotateY] = useState(node.rotation.y)

	useFrame(({ clock }) => {
		const a = clock.getElapsedTime();
		if(hover == nodeName && click == nodeName)
			setRotateY(a)
	});

	const ref =	useRef();
	return(
		<a.mesh
			castShadow
			receiveShadow
			geometry={node.geometry}
			material={material}
			position={position}
			rotation={[node.rotation.x, rotateY, node.rotation.z]}
			scale={node.scale}
			onClick={() => handleClick(nodeName)}
			onPointerOver={() => setHover(nodeName)}
			onPointerOut={() => {
				setHover("")
				setRotateY(node.rotation.y)
			}}
			ref={ref}
		>
		</a.mesh>
	)
}