import { Suspense, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import AgentPanel3D from "./AgentPanel3D";
import { Agent } from "@/data/agents";

interface SceneContentProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

// Camera controller with ambient drift
const CameraController = () => {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const driftRef = useRef({ x: 0, y: 0, time: 0 });

  useFrame((state) => {
    driftRef.current.time += 0.003;
    
    // Ambient camera drift
    const driftX = Math.sin(driftRef.current.time) * 0.3;
    const driftY = Math.cos(driftRef.current.time * 0.7) * 0.15;
    
    // Smooth camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, driftX + mouseRef.current.x * 0.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1 + driftY + mouseRef.current.y * 0.3, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Floating particles for atmosphere
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D4C4B8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const SceneContent = ({ agents, onAgentClick }: SceneContentProps) => {
  // Arrange agents in a grid pattern
  const getPosition = useCallback((index: number): [number, number, number] => {
    const cols = 4;
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    const x = (col - (cols - 1) / 2) * 3;
    const y = -row * 1.8;
    const z = Math.sin(index * 0.5) * 0.5; // Slight depth variation
    
    return [x, y, z];
  }, []);

  return (
    <>
      <CameraController />
      
      {/* Warm ambient lighting */}
      <ambientLight intensity={0.6} color="#FDF8F0" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFFDF8" />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#E8D4C4" />
      
      {/* Soft point lights for warmth */}
      <pointLight position={[0, 2, 4]} intensity={0.5} color="#A7C4A0" distance={10} />
      <pointLight position={[-4, 0, 2]} intensity={0.3} color="#E8C4C4" distance={8} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={["#F5EDE3", 8, 25]} />
      
      {/* Background gradient plane */}
      <mesh position={[0, 0, -10]} scale={[50, 30, 1]}>
        <planeGeometry />
        <meshBasicMaterial color="#E8DDD0" />
      </mesh>

      {/* Floating particles */}
      <Particles />

      {/* Agent panels */}
      {agents.map((agent, index) => (
        <Float
          key={agent.id}
          speed={1.5}
          rotationIntensity={0.05}
          floatIntensity={0.1}
          floatingRange={[-0.02, 0.02]}
        >
          <AgentPanel3D
            agent={agent}
            position={getPosition(index)}
            onClick={() => onAgentClick(agent)}
          />
        </Float>
      ))}
    </>
  );
};

interface MarketplaceSceneProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

const MarketplaceScene = ({ agents, onAgentClick }: MarketplaceSceneProps) => {
  return (
    <div className="w-full h-[80vh] min-h-[600px] relative">
      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <Canvas
        camera={{ position: [0, 1, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent agents={agents} onAgentClick={onAgentClick} />
        </Suspense>
      </Canvas>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default MarketplaceScene;
