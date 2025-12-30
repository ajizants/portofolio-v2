import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const changeTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("system");
        } else {
            setTheme("light");
        }
    };

    return (
        <Button
            className="border-0 bg-transparent hover:bg-transparent focus:bg-transparent focus:outline-none"
            variant="outline"
            size="icon"
            onClick={changeTheme}
        >
            {/* LIGHT */}
            <Sun
                className={`h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === "light"
                        ? "scale-100 rotate-0"
                        : "scale-0 rotate-90"
                }`}
            />

            {/* DARK */}
            <Moon
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === "dark"
                        ? "scale-100 rotate-0"
                        : "scale-0 rotate-90"
                }`}
            />

            {/* SYSTEM */}
            <Laptop
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === "system"
                        ? "scale-100 rotate-0"
                        : "scale-0 rotate-90"
                }`}
            />

            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
