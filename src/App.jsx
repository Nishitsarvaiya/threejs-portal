import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { Text } from "@react-three/drei";

function App() {
	return (
		<div className="site-wrapper">
			<Suspense fallback={<Loader />}>
				<Canvas shadows camera={{ fov: 50, position: [10, 8, 12], near: 0.1, far: 1000 }}>
					<Experience />
				</Canvas>
			</Suspense>
			<p>Double tap on the door to enter the portal</p>
		</div>
	);
}

export default App;
