import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { useThree } from "@react-three/fiber";
import { RectAreaLight } from "three";

export default function RectArealightWithHelper({ position, rotation, color, intensity, width, height }) {
	// Besides the useThree hook, all of this is taken straight from one of the examples on threejs.org: https://threejs.org/examples/#webgl_lights_rectarealight.

	const { scene } = useThree();

	// This somehow changes the texture of the ground-plane and makes it more shiny? Very interesting
	RectAreaLightUniformsLib.init();

	const rectLight = new RectAreaLight(color, intensity, width, height);
	rectLight.position.set(position[0], position[1], position[2]);
	rectLight.rotation.set(rotation[0], rotation[1], rotation[2]);
	scene.add(rectLight);
	scene.add(new RectAreaLightHelper(rectLight));

	return null;

	// ### BUG REPORT for using RectAreaLightHelper through useHelper ###
	// This is the way the drei docs would suggest using the RectAreaLightHelper, as I understand:
	//
	//    const rectAreaLight = useRef();
	//    useHelper(rectAreaLight, RectAreaLightHelper);
	//    return (
	//    <rectAreaLight
	//     ref={rectAreaLight}
	//     position={[-5, 5, 15]}
	//     width={4}
	//     height={10}
	//     color={"red"}
	//     intensity={5}
	// />
	// );

	// If I do it like this, Chrome throws an error:
	// > useHelper.js:24 Uncaught TypeError: helper.current.update is not a function
	//
	// This makes sense, as the RectAreaLightHelper class as defined in
	// RectAreaLightHelper.js doesnt have a method called update. Instead, it has a method `updateMatrixWorld`.
	// If I change this method's name to `update`, it no longer crashes, and the helper appears on screen.
	// Unfortunately, it doesn't map on to the actual the rectAreLight object and instead
	// seems to be stuck at around [0, 0, 0] in space.
	// (I wish I could fix this, but I don't even know where to start.)
}
