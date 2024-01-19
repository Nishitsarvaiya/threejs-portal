import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import Loader from "./components/Loader";

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<Canvas shadows camera={{ fov: 50, position: [10, 8, 15], near: 0.1, far: 1000 }}>
				<Experience />
			</Canvas>
		</Suspense>
	);
}

export default App;
