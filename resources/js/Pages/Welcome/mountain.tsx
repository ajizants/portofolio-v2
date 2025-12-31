import { motion, MotionValue } from "framer-motion";

type MountainsProps = {
    backY: MotionValue<number>;
    midY: MotionValue<number>;
    frontY: MotionValue<number>;
};

export default function Mountains({ backY, midY, frontY }: MountainsProps) {
    return (
        <>
            {/* MOUNTAIN BACK - Layer paling jauh */}
            <motion.svg
                style={{ y: backY }}
                viewBox="0 0 1440 320"
                className="absolute -bottom-20 md:-bottom-10 w-full h-72 z-10"
                preserveAspectRatio="none"
            >
                <path
                    fill="#1e293b"
                    fillOpacity="0.9"
                    d="M0,180 Q120,140 240,160 T480,120 Q600,100 720,140 T960,110 Q1080,100 1200,130 T1440,150 L1440,320 L0,320 Z"
                />
            </motion.svg>

            {/* MOUNTAIN MID - Layer tengah */}
            <motion.svg
                style={{ y: midY }}
                viewBox="0 0 1440 320"
                className="absolute bottom-0 w-full h-36 z-20"
                preserveAspectRatio="none"
            >
                <path
                    fill="#0f172a"
                    fillOpacity="0.95"
                    d="M0,240 Q100,200 200,220 Q300,240 400,210 Q500,180 600,200 Q700,220 800,190 Q900,160 1000,180 Q1100,200 1200,170 Q1300,140 1440,160 L1440,320 L0,320 Z"
                />
            </motion.svg>

            {/* MOUNTAIN FRONT - Layer depan dengan puncak tajam */}
            <motion.svg
                style={{ y: frontY }}
                viewBox="0 0 1440 320"
                className="absolute -bottom-10 w-full h-72 z-30"
                preserveAspectRatio="none"
            >
                <path
                    fill="#020617"
                    d="M0,280 L180,240 Q240,200 280,140 L320,100 Q360,120 400,160 Q480,220 560,240 L640,250 Q720,240 800,200 L880,150 Q960,140 1040,180 Q1120,220 1200,230 L1280,240 Q1360,250 1440,260 L1440,320 L0,320 Z"
                />
            </motion.svg>
        </>
    );
}
