import { routes } from "src/utils/constant/route";
import styles from "./Header.module.scss";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <div className={cn("flexAlignCenter", styles.wrapper)}>
      <div className={cn(styles.titleBox, "fw-600 fs-24 flexAlignCenter")}>
        TOMOTOMO
      </div>
      <div className={cn("flexAlignCenter gap-8", styles.routeBox)}>
        {Object.entries(routes).map((route) => {
          const [key, obj] = route;
          const { path, title } = obj;
          return (
            <Link
              key={key}
              href={path}
              className={cn(styles.route, pathname === path && styles.active)}
            >
              <span>{title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
