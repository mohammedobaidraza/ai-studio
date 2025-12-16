import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { Agent } from "@/data/agents";

interface AgentPanel3DProps {
  agent: Agent;
  position: [number, number, number];
  onClick: () => void;
}

const AgentPanel3D = ({ agent, position, onClick }: AgentPanel3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetY = useRef(position[1]);
  const targetScale = useRef(1);

  useFrame((state) => {
    if (!meshRef.current) return;
    const floatOffset = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
    targetY.current = hovered ? position[1] + 0.15 : position[1];
    targetScale.current = hovered ? 1.05 : 1;

    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY.current + floatOffset, 0.1);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale.current, 0.1));
  });

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      Conversational: "#A7C4A0", Writing: "#E8C4C4", Research: "#C4D4E8",
      Analysis: "#E8D4C4", Multimodal: "#D4C4E8", Search: "#C4E8D4",
      Coding: "#E8E4C4", default: "#D4C4B8",
    };
    return colors[tag] || colors.default;
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <RoundedBox args={[2.4, 1.4, 0.08]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color={hovered ? "#FFFDF8" : "#FDF8F0"} roughness={0.3} metalness={0.05} />
      </RoundedBox>

      {hovered && (
        <RoundedBox args={[2.5, 1.5, 0.02]} radius={0.1} smoothness={4} position={[0, 0, -0.05]}>
          <meshBasicMaterial color="#A7C4A0" transparent opacity={0.4} />
        </RoundedBox>
      )}

      <Html center transform scale={0.15} position={[0, 0, 0.05]}>
        <div className="w-[320px] text-center pointer-events-none select-none">
          <h3 className="text-lg font-semibold text-[#3D2B1F] mb-1">{agent.name}</h3>
          <p className="text-xs text-[#6B5344] mb-2 line-clamp-2">{agent.description}</p>
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs text-[#3D2B1F]"
            style={{ backgroundColor: getTagColor(agent.tags[0]) }}
          >
            {agent.tags[0]}
          </span>
        </div>
      </Html>
    </group>
  );
};

export default AgentPanel3D;
