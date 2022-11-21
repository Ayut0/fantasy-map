import { Button, SxProps, Theme } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
    children?: ReactNode;
    type?: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    sx?: SxProps<Theme> | undefined;
    variant?: "text" | "outlined" | "contained" | undefined
}

const ActionButton = ({children, type, disabled, onClick, sx, variant}:Props) => {
  return (
      <Button variant={variant} disabled={disabled} sx={sx} onClick={onClick}>{ children }</Button>
  )
}

export default ActionButton