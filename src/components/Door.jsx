import { Box, Environment, MeshPortalMaterial, PerspectiveCamera, Text } from "@react-three/drei";
import { BackSide, TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";

export default function Door({ env, texture, active, setActive, name, children, ...restProps }) {
	const map = useLoader(TextureLoader, `textures/${texture}.jpg`);
	const portalRef = useRef(null);

	useFrame((_state, delta) => {
		const isWorldOpen = active === name;
		easing.damp(portalRef.current, "blend", isWorldOpen ? 1 : 0, 0.16, delta);
	});

	return (
		<group>
			<Box {...restProps} onClick={() => setActive(active === name ? null : name)} name={name}>
				<MeshPortalMaterial side={BackSide} ref={portalRef}>
					<color args={["#000"]} attach="background" />
					<ambientLight intensity={3} />
					<Environment preset={env} />
					{children}
					<mesh>
						<sphereGeometry args={[6, 64, 64]} />
						<meshStandardMaterial map={map} side={BackSide} />
					</mesh>
				</MeshPortalMaterial>
			</Box>
		</group>
	);
}
