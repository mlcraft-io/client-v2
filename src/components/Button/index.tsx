import { Button as BasicButton } from "antd";
import cn from "classnames";

import styles from "./index.module.less";

import type { ButtonProps } from "antd";
import type { FC } from "react";

const Button: FC<ButtonProps> = (props) => {
  return (
    <BasicButton
      {...props}
      className={cn(
        styles.btn,
        { [styles.link]: props.type === "link" },
        props.className
      )}
    />
  );
};

export default Button;
