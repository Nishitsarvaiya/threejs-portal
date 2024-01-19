import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
	return (
		<Canvas shadows camera={{ fov: 50, position: [8, 8, 15], near: 0.1, far: 1000 }}>
			<Experience />
		</Canvas>
	);
}

export default App;
