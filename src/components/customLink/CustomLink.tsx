import { FC, LinkHTMLAttributes, ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";
import { classNames } from "src/shared/utils/ClassName";

interface CustomLinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className: string;
  children: ReactNode;
}

export const CustomLink: FC<CustomLinkProps> = ({
  to,
  className,
  children,
  ...props
}) => {
  const match = useMatch(to);
  const names = classNames(className, { active: !!match });

  return (
    <Link to={to} className={names} {...props}>
      {children}
    </Link>
  );
};
