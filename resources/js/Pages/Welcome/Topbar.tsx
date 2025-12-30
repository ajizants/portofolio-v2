import * as React from "react";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@inertiajs/react";

const components = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
];

export function MainNavigationMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex-wrap">
                {/* HOME */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 md:w-[400px] lg:w-[500px]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/"
                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline transition-all md:p-6"
                                    >
                                        <div className="mb-2 text-lg font-medium">
                                            shadcn/ui
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            Beautifully designed components.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            {/*
                            <ListItem href="/docs" title="Introduction">
                                Re-usable components built using Radix UI.
                            </ListItem>

                            <ListItem
                                href="/docs/installation"
                                title="Installation"
                            >
                                How to install dependencies.
                            </ListItem> */}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* COMPONENTS */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 md:w-[500px] md:grid-cols-2">
                            {components.map((c) => (
                                <ListItem
                                    key={c.title}
                                    href={c.href}
                                    title={c.title}
                                >
                                    {c.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* DOCS */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link href="/docs">Docs</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* WITH ICON */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-2"
                                    >
                                        <CircleHelpIcon /> Backlog
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-2"
                                    >
                                        <CircleIcon /> To Do
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-2"
                                    >
                                        <CircleCheckIcon /> Done
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function ListItem({
    title,
    children,
    href,
}: {
    title: string;
    children: React.ReactNode;
    href: string;
}) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm font-medium">{title}</div>
                    <p className="text-muted-foreground text-sm">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
