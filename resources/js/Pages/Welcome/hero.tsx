import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Mountains from "./mountain";
import { useRef, useMemo, useEffect, useState } from "react";
import { Cloud } from "lucide-react";
import { GhibliCloud } from "./cloud";

export default function HeroParallax() {
    const ref = useRef(null);
    const [viewportHeight, setViewportHeight] = useState(2000);

    // Handle viewport height safely for SSR
    useEffect(() => {
        setViewportHeight(window.innerHeight);
    }, []);

    // Track scroll dari top window
    const { scrollY } = useScroll();

    // Constants untuk maintainability
    const SCROLL_RANGE = viewportHeight * 2;
    const SUN_TRAVEL_DISTANCE = { x: 200, y: 800 };
    const MOON_TRAVEL_DISTANCE = { x: -200, y: 200 };
    const MOUNTAIN_PARALLAX = { front: -10, mid: 2, back: 7 };

    // Buat progress manual dari 0 sampai tinggi section
    const scrollProgress = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1]);

    // Spring config untuk smooth animation
    const springConfig = { stiffness: 80, damping: 30 };
    const strongSpringConfig = { stiffness: 100, damping: 30 };

    // Matahari - bergerak dalam arc
    const progress = useSpring(scrollProgress, springConfig);
    const sunX = useTransform(
        progress,
        (p) => Math.cos(p * Math.PI) * SUN_TRAVEL_DISTANCE.x
    );
    const sunY = useTransform(
        progress,
        (p) => Math.sin(p * Math.PI) * SUN_TRAVEL_DISTANCE.y
    );

    // Shadow matahari dengan scale dan movement
    const sunShadowY = useSpring(
        useTransform(scrollProgress, [0, 0.7], [0, 2000]),
        { stiffness: 80, damping: 25 }
    );
    const scaleShadow = useSpring(
        useTransform(scrollProgress, [0, 0.5, 1], [1, 2, 3])
    );

    // Bulan muncul dari kanan atas ke kiri bawah
    const moonX = useSpring(
        useTransform(scrollProgress, [0, 0.7], [0, MOON_TRAVEL_DISTANCE.x]),
        springConfig
    );
    const moonY = useSpring(
        useTransform(scrollProgress, [0, 0.7], [0, MOON_TRAVEL_DISTANCE.y]),
        springConfig
    );

    // Mountain parallax layers
    const frontY = useSpring(
        useTransform(scrollProgress, [0, 0.7], [0, MOUNTAIN_PARALLAX.front]),
        strongSpringConfig
    );
    const midY = useSpring(
        useTransform(scrollProgress, [0, 0.7], [0, MOUNTAIN_PARALLAX.mid]),
        strongSpringConfig
    );
    const backY = useSpring(
        useTransform(scrollProgress, [0, 0.7], [0, MOUNTAIN_PARALLAX.back]),
        strongSpringConfig
    );

    // Opacity transitions
    const starsOpacity = useTransform(
        scrollProgress,
        [0, 0.4, 0.6, 1],
        [0, 0, 0.3, 1]
    );
    const senjaOpacity = useTransform(
        scrollProgress,
        [0, 0.4, 0.6, 1],
        [1, 0.3, 0, 0]
    );
    const sunOpacity = useTransform(scrollProgress, [0, 0.3, 0.6], [1, 0.5, 0]);
    const moonOpacity = useTransform(scrollProgress, [0, 0.7, 1], [0, 0.8, 1]);
    const logoScale = useTransform(scrollProgress, [0, 0.5, 1], [0.6, 0.8, 1]);
    const skyAScale = useTransform(scrollProgress, [0, 0.5, 1], [2, 1.5, 1]);
    const logoOpacity = useTransform(
        scrollProgress,
        [0, 0.5, 0.8],
        [0, 0.8, 1]
    );
    const skyBOpacity = useTransform(
        scrollProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [0, 0.5, 1, 0.5, 0]
    );

    // Sky gradient movement
    const skyX = useSpring(
        useTransform(scrollProgress, [0, 1], [-100, 0]),
        springConfig
    );
    const skyY = useSpring(
        useTransform(scrollProgress, [0, 1], [-10, 0]),
        springConfig
    );

    // Cloud parallax
    const cloud1X = useSpring(
        useTransform(scrollProgress, [0, 1], [0, -150]),
        springConfig
    );
    const cloud2X = useSpring(
        useTransform(scrollProgress, [0, 1], [0, -80]),
        springConfig
    );
    const cloud3X = useSpring(
        useTransform(scrollProgress, [0, 1], [0, -200]),
        springConfig
    );
    const dayCloudOpacity = useTransform(
        scrollProgress,
        [0, 0.3, 0.5],
        [1, 0.5, 0]
    );
    const nghtCloudOpacity = useTransform(
        scrollProgress,
        [0, 0.3, 0.5],
        [0, 0.5, 1]
    );

    // Fireflies opacity and animation
    const firefliesOpacity = useTransform(
        scrollProgress,
        [0.6, 0.8, 1],
        [0, 0.5, 1]
    );

    // Memoize stars untuk performance
    const stars = useMemo(
        () =>
            Array.from({ length: 50 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 60,
                opacity: Math.random() * 0.7 + 0.3,
                size: Math.random() > 0.7 ? 2 : 1,
                duration: 15 + Math.random() * 25, // 15-40 detik
                delay: Math.random() * 10,
                xOffset: (Math.random() - 0.5) * 3, // -1.5 sampai +1.5
                yOffset: (Math.random() - 0.5) * 2, // -1 sampai +1
            })),
        []
    );

    // Memoize fireflies
    const fireflies = useMemo(
        () =>
            Array.from({ length: 15 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: 40 + Math.random() * 40,
                delay: Math.random() * 2,
            })),
        []
    );

    return (
        <section
            ref={ref}
            className="relative h-screen overflow-hidden will-change-transform"
        >
            {/* SPLIT DARK OVERLAY */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-150%" }}
                    transition={{
                        delay: 3.6,
                        duration: 2.4,
                        ease: "easeInOut",
                    }}
                    className="absolute left-50% top-0 w-full h-full "
                    style={{
                        background:
                            "linear-gradient(to right, rgba(2,6,23) 80%, rgba(2,6,23,0.6) 90%, rgba(2,6,23,0) 100%)",
                    }}
                />

                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "150%" }}
                    transition={{
                        delay: 3.6,
                        duration: 2.4,
                        ease: "easeInOut",
                    }}
                    className="absolute -right-50% top-0 w-full h-full pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to left, rgba(2,6,23) 80%, rgba(2,6,23,0.6) 90%, rgba(2,6,23,0) 100%)",
                    }}
                />
            </div>

            <motion.div
                className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
                animate={{ opacity: 0 }}
                transition={{ delay: 3.8, duration: 0.6, ease: "easeOut" }}
            >
                <div className="w-full max-w-5xl px-8">
                    {/* LEFT TEXT */}
                    <motion.h1
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-semibold text-white"
                    >
                        Selamat datang
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.9,
                            ease: "easeOut",
                        }}
                        className="mt-2 text-4xl md:text-6xl font-semibold text-white/90"
                    >
                        di ruang kecil
                    </motion.h1>

                    {/* RIGHT TEXT */}
                    <motion.h2
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 1,
                            duration: 0.9,
                            ease: "easeOut",
                        }}
                        className="mt-12 text-xl md:text-2xl text-white/80 text-right"
                    >
                        Saya Aji Santoso
                    </motion.h2>

                    <motion.h2
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 1.4,
                            duration: 0.9,
                            ease: "easeOut",
                        }}
                        className="mt-2 text-xl md:text-2xl text-white/60 text-right"
                    >
                        tempat ide bertemu kode.
                    </motion.h2>
                </div>
            </motion.div>

            {/* SKY - MALAM (Dark Purple) */}
            <motion.div
                style={{ opacity: starsOpacity }}
                className="absolute inset-0 -left-44 h-screen w-[180vw]"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1d0431] via-[#270540] to-[#4f0984]" />
            </motion.div>

            {/* SKY - SIANG/SENJA (Blue) */}
            <motion.div
                style={{
                    x: skyX,
                    y: skyY,
                    scale: skyAScale,
                    opacity: senjaOpacity,
                }}
                className="absolute inset-0 h-screen w-[130vw]"
            >
                <div className="absolute w-full h-full bg-gradient-to-br from-white via-blue-400 to-blue-500" />
            </motion.div>

            {/* SHADOW MATAHARI SENJA (Orange Glow) */}
            <motion.div
                style={{
                    y: sunShadowY,
                    scale: scaleShadow,
                    opacity: skyBOpacity,
                }}
                className="absolute -left-12 top-5 h-[30rem] w-[30rem] pointer-events-none"
            >
                <div
                    className="absolute inset-[-20%] rounded-full blur-[70px] shadow-[0_0_0_200px_rgba(255,152,0,0.35)]"
                    style={{
                        background: `radial-gradient(
                            circle at center,
                            rgba(255,191,36,0.55) 0%,
                            rgba(255,152,0,0.25) 50%,
                            rgba(255,191,36,0.35) 100%
                        )`,
                    }}
                />
            </motion.div>

            {/* CLOUDS */}
            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ opacity: dayCloudOpacity }}
            >
                <motion.div
                    style={{ x: cloud1X }}
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 24,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[10%] top-[20%] w-[420px]"
                >
                    <GhibliCloud id="cloud-1" isNight={false} opacity={0.45} />
                </motion.div>

                <motion.div
                    style={{ x: cloud2X }}
                    animate={{ y: [0, 4, 0] }}
                    transition={{
                        duration: 32,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[50%] top-[14%] w-[520px]"
                >
                    <GhibliCloud id="cloud-2" isNight={false} opacity={0.35} />
                </motion.div>

                <motion.div
                    style={{ x: cloud3X }}
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[72%] top-[40%] w-[360px] opacity-70"
                >
                    <GhibliCloud id="cloud-3" isNight={false} opacity={0.25} />
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ opacity: nghtCloudOpacity }}
            >
                <motion.div
                    style={{ x: cloud1X }}
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 24,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[10%] top-[20%] w-[420px]"
                >
                    <GhibliCloud id="cloud-4" isNight={true} opacity={0.45} />
                </motion.div>

                <motion.div
                    style={{ x: cloud2X }}
                    animate={{ y: [0, 4, 0] }}
                    transition={{
                        duration: 32,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[50%] top-[14%] w-[520px]"
                >
                    <GhibliCloud id="cloud-5" isNight={true} opacity={0.35} />
                </motion.div>

                <motion.div
                    style={{ x: cloud3X }}
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[72%] top-[40%] w-[360px] opacity-70"
                >
                    <GhibliCloud id="cloud-6" isNight={true} opacity={0.25} />
                </motion.div>
                <motion.div
                    style={{ x: cloud3X }}
                    animate={{ y: [0, 3, 0] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[82%] top-[10%] w-[600px] z-50 "
                >
                    <GhibliCloud id="cloud-7" isNight={true} opacity={0.8} />
                </motion.div>
            </motion.div>

            {/* STARS */}
            <motion.div
                style={{ opacity: starsOpacity }}
                className="absolute inset-0 pointer-events-none"
            >
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                            opacity: star.opacity,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                        }}
                        animate={{
                            x: [0, star.xOffset, 0],
                            y: [0, star.yOffset, 0],
                            opacity: [
                                star.opacity,
                                star.opacity * 0.4,
                                star.opacity,
                            ],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>

            {/* FIREFLIES / KUNANG-KUNANG */}
            <motion.div
                style={{ opacity: firefliesOpacity }}
                className="absolute inset-0 pointer-events-none"
            >
                {fireflies.map((firefly) => (
                    <motion.div
                        key={firefly.id}
                        className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full"
                        style={{
                            left: `${firefly.left}%`,
                            top: `${firefly.top}%`,
                            boxShadow: "0 0 8px 2px rgba(253, 224, 71, 0.6)",
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: firefly.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>

            {/* SUN */}
            <motion.div
                style={{ y: sunY, x: sunX, opacity: sunOpacity }}
                className="absolute left-[5%] md:left-20 top-20 z-10"
            >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 shadow-[0_0_100px_40px_rgba(251,191,36,0.6)]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-transparent opacity-50" />
                </div>
            </motion.div>

            {/* MOON */}
            <motion.div
                style={{ y: moonY, x: moonX, opacity: moonOpacity }}
                className="absolute right-[5%] md:right-20 -top-20 z-10"
            >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-[0_0_80px_30px_rgba(203,213,225,0.5)]">
                    <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-slate-400 rounded-full top-4 left-6 opacity-30" />
                    <div className="absolute w-4 h-4 md:w-5 md:h-5 bg-slate-400 rounded-full top-12 left-14 opacity-25" />
                    <div className="absolute w-2 h-2 md:w-3 md:h-3 bg-slate-400 rounded-full top-8 left-10 opacity-35" />
                    <div className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-400 rounded-full top-5 left-12 opacity-40" />
                </div>
            </motion.div>

            {/* LOGO KALONG */}
            <motion.div
                style={{ scale: logoScale, opacity: logoOpacity }}
                className="absolute inset-0 flex items-center justify-center z-20 px-4"
            >
                <svg
                    className="w-64 md:w-80 drop-shadow-2xl"
                    viewBox="0 0 600 300"
                >
                    {/* Wing kiri */}
                    <path
                        d="M70 150 C120 60, 200 60, 260 130
                           C220 120, 200 150, 180 180
                           C160 210, 130 230, 90 240
                           C130 200, 120 170, 70 150 Z"
                        fill="#18181b"
                        className="drop-shadow-lg"
                    />
                    {/* Wing kanan */}
                    <path
                        d="M530 150 C480 60, 400 60, 340 130
                           C380 120, 400 150, 420 180
                           C440 210, 470 230, 510 240
                           C470 200, 480 170, 530 150 Z"
                        fill="#18181b"
                        className="drop-shadow-lg"
                    />
                    {/* Text */}
                    <text
                        x="300"
                        y="170"
                        textAnchor="middle"
                        fill="white"
                        fontSize="42"
                        fontWeight="bold"
                        fontFamily="system-ui"
                        className="drop-shadow-md"
                    >
                        KALONG
                    </text>
                </svg>
            </motion.div>
            <Mountains backY={backY} midY={midY} frontY={frontY} />
        </section>
    );
}
