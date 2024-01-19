import { CameraControls, CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import AK47 from "./AK47";
import AR15 from "./AR15";
import Door from "./Door";
import Ground from "./Ground";
import SMG from "./SMG";
import Soldier from "./Soldier";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export const Experience = () => {
	const [active, setActive] = useState(null);
	const controlsRef = useRef(null);
	const scene = useThree((state) => state.scene);

	useEffect(() => {
		if (active) {
			const targetPos = new Vector3();
			scene.getObjectByName(active).getWorldPosition(targetPos);
			controlsRef.current.fitToBox(scene.getObjectByName(active), true, { cover: true });
			controlsRef.current.setPosition(0, targetPos.y, (targetPos.z / Math.PI) * 1.5, true);
			controlsRef.current.maxPolarAngle = Math.PI;
			controlsRef.current.minPolarAngle = 0;
		} else {
			controlsRef.current.setLookAt(10, 8, 15, 0, 0, 0, true);
			controlsRef.current.maxPolarAngle = Math.PI / 2;
			controlsRef.current.minPolarAngle = 0;
		}
	}, [active]);

	return (
		<>
			<CameraControls maxPolarAngle={1.45} ref={controlsRef} dollyDragInverted smoothTime={0.36} />
			<color args={["#000"]} attach="background" />
			{/* <ambientLight intensity={0.2} /> */}
			<spotLight
				color={"#f6f6f6"}
				intensity={3}
				angle={1}
				penumbra={0.5}
				position={[0, 10, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>
			<Ground />

			<ambientLight intensity={0.3} />
			<Door
				args={[4, 6, 0.1]}
				position={[0, 3, 7]}
				rotation-y={Math.PI}
				env="city"
				texture="world2"
				name="AR-15"
				active={active}
				setActive={setActive}>
				{/* <AR15 scale={0.5} rotation-y={Math.PI / 2} /> */}
			</Door>
			<Door
				args={[4, 6, 0.1]}
				position={[6, 3, -4]}
				rotation-y={Math.PI / -3}
				env="dawn"
				texture="world3"
				name="AK-47s"
				active={active}
				setActive={setActive}>
				{/* <AK47 scale={0.3} rotation-y={Math.PI / 2} /> */}
			</Door>
			<Door
				args={[4, 6, 0.1]}
				position={[-6, 3, -4]}
				rotation-y={Math.PI / 3}
				env="apartment"
				texture="world4"
				name="SMG"
				active={active}
				setActive={setActive}>
				{/* <SMG scale={0.7} rotation-y={Math.PI / 2} position-x={-0.2} /> */}
			</Door>
			<Soldier scale={2} />
		</>
	);
};
