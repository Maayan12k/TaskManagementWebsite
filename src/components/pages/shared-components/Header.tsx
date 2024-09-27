import { Box } from "@cloudscape-design/components";
import React from "react";

interface HeaderProps {
    title: string;
}

export const Header = ({ title }: HeaderProps): JSX.Element => (
    <Box>
        <h1>{title}</h1>
    </Box>
);